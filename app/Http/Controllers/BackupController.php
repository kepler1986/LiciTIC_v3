<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Milestone;
use App\Models\Setting;
use App\Models\Tender;
use App\Models\TenderComment;
use App\Models\TenderExecution;
use App\Services\SettingsReader;
use App\Services\TenderPresentationSync;
use App\Support\DemoData;
use App\Support\EntityFields;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class BackupController extends Controller
{
    /** GET /api/admin/export — copia completa (datos + configuracion) en JSON. */
    public function export(SettingsReader $settings)
    {
        return response()->json([
            'meta' => ['app' => 'LiciTIC', 'version' => 1, 'exportedAt' => Carbon::now()->toISOString()],
            'tenders' => EntityFields::collectionToCamel(Tender::all(), EntityFields::TENDER),
            'events' => EntityFields::collectionToCamel(Milestone::all(), EntityFields::MILESTONE),
            'team' => EntityFields::collectionToCamel(Member::all(), EntityFields::MEMBER),
            'settings' => $settings->settings(),
            'stats' => $settings->stats(),
        ]);
    }

    /** POST /api/admin/import — restaura una copia, reemplazando TODOS los datos. */
    public function import(Request $request)
    {
        $data = $request->all();

        // Validacion minima: debe parecer una copia de LiciTIC.
        $hasAny = isset($data['tenders']) || isset($data['team']) || isset($data['events']) || isset($data['settings']);
        if (! $hasAny) {
            return response()->json(['message' => 'El archivo no parece una copia de LiciTIC valida.'], 422);
        }

        $now = Carbon::now();
        $counts = ['tenders' => 0, 'events' => 0, 'team' => 0];

        DB::transaction(function () use ($data, $now, &$counts) {
            // Borrado completo (datos asociados antes que licitaciones por la relacion).
            Milestone::query()->delete();
            TenderComment::query()->delete();
            TenderExecution::query()->delete();
            Tender::query()->delete();
            Member::query()->delete();
            Setting::query()->delete();

            $counts['team'] = $this->restore('members', $data['team'] ?? [], EntityFields::MEMBER, $now);
            $counts['tenders'] = $this->restore('tenders', $data['tenders'] ?? [], EntityFields::TENDER, $now);
            $counts['events'] = $this->restore('milestones', $data['events'] ?? [], EntityFields::MILESTONE, $now);

            if (isset($data['settings'])) {
                Setting::create(['key' => 'settings', 'value' => json_encode($data['settings'])]);
            }
            if (isset($data['stats'])) {
                Setting::create(['key' => 'stats', 'value' => json_encode($data['stats'])]);
            }
        });

        return response()->json($counts);
    }

    /**
     * POST /api/admin/reset — borra las licitaciones y sus datos asociados.
     * mode='empty': deja la base vacia de licitaciones (conserva equipo y configuracion).
     * mode='demo':  ademas repuebla las licitaciones e hitos de ejemplo (DemoData).
     */
    public function reset(Request $request, TenderPresentationSync $sync): JsonResponse
    {
        $mode = $request->input('mode') === 'demo' ? 'demo' : 'empty';
        $now = Carbon::now();
        $counts = ['mode' => $mode, 'tenders' => 0, 'events' => 0];

        DB::transaction(function () use ($mode, $now, $sync, &$counts) {
            // Borrado en orden por las relaciones (hijos antes que licitaciones).
            Milestone::query()->delete();
            TenderComment::query()->delete();
            TenderExecution::query()->delete();
            Tender::query()->delete();

            if ($mode === 'demo') {
                $counts['tenders'] = $this->restore('tenders', DemoData::tenders(), EntityFields::TENDER, $now);
                $counts['events'] = $this->restore('milestones', DemoData::events(), EntityFields::MILESTONE, $now);

                // Regenera los hitos de presentacion auto-generados de las licitaciones demo.
                Tender::all()->each(fn ($tender) => $sync->sync($tender));
            }
        });

        if ($mode === 'demo') {
            $counts['events'] = Milestone::query()->count();
        }

        return response()->json($counts);
    }

    /** Inserta por lotes filas (camelCase) mapeadas a la tabla; ignora filas sin id. */
    private function restore(string $table, array $rows, array $map, Carbon $now): int
    {
        $inserted = 0;

        foreach (array_chunk($rows, 500) as $chunk) {
            $batch = [];

            foreach ($chunk as $row) {
                if (! is_array($row) || empty($row['id'])) {
                    continue;
                }

                $attributes = EntityFields::toAttributes($row, $map);
                $attributes['created_at'] = $now;
                $attributes['updated_at'] = $now;
                $batch[] = $attributes;
            }

            if ($batch) {
                DB::table($table)->insert($batch);
                $inserted += count($batch);
            }
        }

        return $inserted;
    }
}
