<?php

namespace App\Http\Controllers;

use App\Models\Milestone;
use App\Models\Tender;
use App\Models\TenderComment;
use App\Models\TenderExecution;
use App\Services\TenderPresentationSync;
use App\Support\EntityFields;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MergeController extends Controller
{
    public function __construct(private TenderPresentationSync $presentationSync) {}

    /**
     * Detecta posibles licitaciones duplicadas agrupando por expediente (code) normalizado.
     * Devuelve solo los grupos con 2 o mas licitaciones, con conteos para que el usuario decida.
     */
    public function duplicates()
    {
        $tenders = Tender::query()->orderBy('code')->get();

        $milestoneCounts = Milestone::query()
            ->selectRaw('tender_id, count(*) as total')
            ->groupBy('tender_id')
            ->pluck('total', 'tender_id');

        $commentCounts = TenderComment::query()
            ->selectRaw('tender_id, count(*) as total')
            ->groupBy('tender_id')
            ->pluck('total', 'tender_id');

        $executionIds = TenderExecution::query()->pluck('tender_id')->flip();

        $groups = $tenders
            // Agrupa por expediente Y lote: mismo codigo con lote distinto son licitaciones
            // diferentes, no duplicados.
            ->groupBy(fn (Tender $tender) => $this->normalizeCode($tender->code).'||'.$this->normalizeCode($tender->lot))
            // Ignora licitaciones sin codigo y grupos de un solo elemento.
            ->filter(fn ($group) => $this->normalizeCode($group->first()->code) !== '' && $group->count() > 1)
            ->map(function ($group, $key) use ($milestoneCounts, $commentCounts, $executionIds) {
                $items = $group->map(function (Tender $tender) use ($milestoneCounts, $commentCounts, $executionIds) {
                    $row = EntityFields::toCamel($tender, EntityFields::TENDER);
                    $row['milestoneCount'] = (int) ($milestoneCounts[$tender->id] ?? 0);
                    $row['commentCount'] = (int) ($commentCounts[$tender->id] ?? 0);
                    $row['hasExecution'] = $executionIds->has($tender->id);

                    return $row;
                })->values();

                return [
                    'key' => $key,
                    'code' => $group->first()->code,
                    'lot' => $group->first()->lot,
                    'tenders' => $items,
                ];
            })
            ->values();

        return response()->json(['data' => $groups]);
    }

    /**
     * Fusiona varias licitaciones en una principal.
     * Payload: { primaryId, duplicateIds:[...], fields:{campoCamel: idOrigen}, executionSourceId }
     */
    public function merge(Request $request, TenderPresentationSync $sync)
    {
        $validated = $request->validate([
            'primaryId' => ['required', 'string'],
            'duplicateIds' => ['required', 'array', 'min:1'],
            'duplicateIds.*' => ['string'],
            'fields' => ['array'],
            'executionSourceId' => ['nullable', 'string'],
        ]);

        $primaryId = $validated['primaryId'];
        $duplicateIds = array_values(array_diff($validated['duplicateIds'], [$primaryId]));
        $fieldChoices = $validated['fields'] ?? [];

        if (empty($duplicateIds)) {
            return response()->json(['message' => 'No hay licitaciones duplicadas que fusionar.'], 422);
        }

        $allIds = array_merge([$primaryId], $duplicateIds);
        $tenders = Tender::query()->whereIn('id', $allIds)->get()->keyBy('id');

        $primary = $tenders->get($primaryId);
        if (! $primary) {
            return response()->json(['message' => 'No se encontro la licitacion principal.'], 404);
        }

        if ($tenders->count() !== count($allIds)) {
            return response()->json(['message' => 'Alguna licitacion seleccionada ya no existe.'], 404);
        }

        DB::transaction(function () use ($primary, $tenders, $duplicateIds, $fieldChoices, $validated, $sync) {
            // 1. Campos: para cada campo elegido, copia el valor de la licitacion origen a la principal.
            $editable = array_diff(array_keys(EntityFields::TENDER), ['id']);
            $attributes = [];
            foreach ($fieldChoices as $camel => $sourceId) {
                if (! in_array($camel, $editable, true)) {
                    continue;
                }
                $source = $tenders->get($sourceId);
                if (! $source) {
                    continue;
                }
                $column = EntityFields::TENDER[$camel];
                $attributes[$column] = $source->getAttribute($column);
            }
            if (! empty($attributes)) {
                $primary->update($attributes);
                $primary->refresh();
            }

            // 2. Hitos: borra los auto-generados de presentacion de las duplicadas (se regeneran)
            //    y reasigna el resto a la principal.
            Milestone::query()
                ->whereIn('tender_id', $duplicateIds)
                ->where('auto_generated', true)
                ->delete();

            Milestone::query()
                ->whereIn('tender_id', $duplicateIds)
                ->update(['tender_id' => $primary->id, 'tender' => $primary->title]);

            // 3. Comentarios: reasigna a la principal.
            TenderComment::query()
                ->whereIn('tender_id', $duplicateIds)
                ->update(['tender_id' => $primary->id]);

            // 4. Ejecucion (1:1): conserva solo la elegida y la asigna a la principal.
            $this->mergeExecutions($primary->id, $duplicateIds, $validated['executionSourceId'] ?? null);

            // 5. Borra las licitaciones duplicadas.
            Tender::query()->whereIn('id', $duplicateIds)->delete();

            // 6. Reconcilia el evento de presentacion auto-generado de la principal.
            $sync->sync($primary->fresh());
        });

        return response()->json(EntityFields::toCamel($primary->fresh(), EntityFields::TENDER));
    }

    /** Conserva una unica ejecucion (la elegida, o la de la principal, o la primera disponible). */
    private function mergeExecutions(string $primaryId, array $duplicateIds, ?string $sourceId): void
    {
        $allIds = array_merge([$primaryId], $duplicateIds);
        $executions = TenderExecution::query()->whereIn('tender_id', $allIds)->get()->keyBy('tender_id');

        if ($executions->isEmpty()) {
            return;
        }

        // Determina el origen ganador.
        $survivorTenderId = $sourceId && $executions->has($sourceId)
            ? $sourceId
            : ($executions->has($primaryId) ? $primaryId : $executions->keys()->first());

        // Borra primero las no-supervivientes para liberar el tender_id (unico) de la principal.
        foreach ($executions as $tenderId => $execution) {
            if ($tenderId !== $survivorTenderId) {
                $execution->delete();
            }
        }

        // Luego mueve la superviviente a la principal si procede.
        $survivor = $executions->get($survivorTenderId);
        if ($survivor && $survivorTenderId !== $primaryId) {
            $survivor->update(['tender_id' => $primaryId]);
        }
    }

    /** Normaliza el expediente: sin espacios sobrantes y en mayusculas. */
    private function normalizeCode(?string $code): string
    {
        $code = trim((string) $code);
        $code = preg_replace('/\s+/', ' ', $code);

        return mb_strtoupper($code);
    }
}
