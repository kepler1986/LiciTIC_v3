<?php

namespace App\Services;

use App\Models\Member;
use App\Models\Tender;
use App\Support\EntityFields;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Importacion server-side: el cliente parsea el TSV pegado y envia filas
 * estructuradas (camelCase). Aqui se hace la deduplicacion contra las
 * licitaciones existentes (preview) y la aplicacion transaccional (commit),
 * replicando filterImportedTenders/commitImportTenders del frontend.
 */
class TenderImport
{
    public function __construct(private TenderPresentationSync $presentationSync)
    {
    }

    /** Clasifica cada fila como create o updateTender (o la descarta si es idéntica). */
    public function preview(array $rows): array
    {
        [$existingByExactKey, $statuslessMatches] = $this->buildExistingMaps();

        $accepted = [];
        $warnings = [];

        foreach ($rows as $row) {
            $exactKey = $this->exactKey($row);
            $statuslessKey = $this->statuslessKey($row);

            $matchesWithChanges = collect($statuslessMatches[$statuslessKey] ?? [])
                ->map(function ($match) use ($row) {
                    $match['importUpdateFields'] = $this->changedFields($match, $row, ($match['status'] ?? null) !== ($row['status'] ?? null));

                    return $match;
                })
                ->filter(fn ($match) => ! empty($match['id']) && ! empty($match['importUpdateFields']))
                ->values()
                ->all();

            $existing = $existingByExactKey[$exactKey] ?? null;

            if ($existing) {
                $fields = $this->changedFields($existing, $row, false);
                if ($fields) {
                    $accepted[] = array_merge($row, [
                        'importAction' => 'updateTender',
                        'importUpdateId' => $existing['id'],
                        'importUpdateFields' => $fields,
                    ]);
                    $warnings[] = 'Actualizacion: '.($row['code'] ?: $row['title']).' actualiza '.$this->fieldsLabel($fields).'.';
                }

                continue;
            }

            if ($matchesWithChanges) {
                $match = $matchesWithChanges[0];
                $accepted[] = array_merge($row, [
                    'importAction' => 'updateTender',
                    'importUpdateId' => $match['id'],
                    'importUpdateFields' => $match['importUpdateFields'],
                ]);
                $warnings[] = 'Actualizacion: '.($row['code'] ?: $row['title']).' coincide con una fila existente y actualiza '.$this->fieldsLabel($match['importUpdateFields']).'.';

                continue;
            }

            // Nueva: aceptar y registrar para deduplicar siguientes filas del mismo lote.
            $accepted[] = array_merge($row, ['importAction' => 'create']);
            $statuslessMatches[$statuslessKey][] = [
                'id' => null,
                'status' => $row['status'] ?? '',
                'economicOffer' => $row['economicOffer'] ?? '',
                'owner' => $row['owner'] ?? '',
            ];
        }

        return ['rows' => $accepted, 'warnings' => $warnings];
    }

    /** Aplica las filas seleccionadas en una transaccion. */
    public function commit(array $rows): array
    {
        $created = 0;
        $updated = 0;

        DB::transaction(function () use ($rows, &$created, &$updated) {
            foreach ($rows as $row) {
                if (($row['importAction'] ?? null) === 'updateTender' && ! empty($row['importUpdateId'])) {
                    if ($this->applyUpdate($row)) {
                        $updated++;
                    }

                    continue;
                }

                $this->ensureUser($row['owner'] ?? '');

                $attributes = EntityFields::toAttributes($row, EntityFields::TENDER);
                unset($attributes['id']);
                $attributes['id'] = 'lic-'.strtolower((string) Str::ulid());

                $tender = Tender::create($attributes);
                $this->presentationSync->sync($tender->fresh());
                $created++;
            }
        });

        return ['created' => $created, 'updated' => $updated];
    }

    private function applyUpdate(array $row): bool
    {
        $tender = Tender::find($row['importUpdateId']);
        if (! $tender) {
            return false;
        }

        $fields = $row['importUpdateFields'] ?? [];
        $previous = ['title' => $tender->title, 'deadline' => $tender->deadline];

        if (in_array('owner', $fields, true)) {
            $this->ensureUser($row['owner'] ?? '');
        }

        $becomesEvaluation = in_array('status', $fields, true)
            && ($row['status'] ?? null) === 'En evaluacion'
            && $tender->status !== 'En evaluacion';

        $tender->update([
            'status' => in_array('status', $fields, true) ? $row['status'] : $tender->status,
            'economic_offer' => in_array('economicOffer', $fields, true) ? $row['economicOffer'] : $tender->economic_offer,
            'economic_offer_waived' => in_array('economicOffer', $fields, true) ? false : $tender->economic_offer_waived,
            'owner' => in_array('owner', $fields, true) ? $row['owner'] : $tender->owner,
            'presented_at' => $becomesEvaluation ? Carbon::now()->toISOString() : ($tender->presented_at ?: ''),
        ]);

        $this->presentationSync->sync($tender->fresh(), $previous);

        return true;
    }

    /** Carga las licitaciones existentes en mapas por clave (operacion puntual, no hot path). */
    private function buildExistingMaps(): array
    {
        $existingByExactKey = [];
        $statuslessMatches = [];

        Tender::query()
            ->select('id', 'code', 'title', 'lot', 'client', 'deadline', 'budget', 'status', 'economic_offer', 'owner')
            ->orderByDesc('created_at')
            ->chunk(2000, function ($chunk) use (&$existingByExactKey, &$statuslessMatches) {
                foreach ($chunk as $tender) {
                    $row = [
                        'id' => $tender->id,
                        'code' => $tender->code,
                        'title' => $tender->title,
                        'lot' => $tender->lot,
                        'client' => $tender->client,
                        'deadline' => $tender->deadline,
                        'budget' => $tender->budget,
                        'status' => $tender->status,
                        'economicOffer' => $tender->economic_offer,
                        'owner' => $tender->owner,
                    ];
                    $exactKey = $this->exactKey($row);
                    if (! isset($existingByExactKey[$exactKey])) {
                        $existingByExactKey[$exactKey] = $row;
                    }
                    $statuslessMatches[$this->statuslessKey($row)][] = [
                        'id' => $tender->id,
                        'status' => $tender->status,
                        'economicOffer' => $tender->economic_offer,
                        'owner' => $tender->owner,
                    ];
                }
            });

        return [$existingByExactKey, $statuslessMatches];
    }

    private function ensureUser(string $name): void
    {
        $name = trim($name);
        if ($name === '') {
            return;
        }

        $exists = Member::query()->whereRaw('LOWER(name) = ?', [mb_strtolower($name)])->exists();
        if ($exists) {
            return;
        }

        $username = Str::of($name)->lower()->ascii()->replaceMatches('/[^a-z0-9]+/', '.')->trim('.');

        Member::create([
            'id' => 'usr-'.strtolower((string) Str::ulid()),
            'name' => $name,
            'username' => (string) $username,
            'role' => 'user',
            'email' => '',
            'status' => 'Activo',
            'password' => '1234',
            'password_reset_at' => '',
        ]);
    }

    // ---------- claves de deduplicacion (espejo del frontend) ----------

    private function exactKey(array $row): string
    {
        return $this->statuslessKey($row).'|'.$this->norm($row['status'] ?? '');
    }

    private function statuslessKey(array $row): string
    {
        return collect([$row['code'] ?? '', $row['title'] ?? '', $row['lot'] ?? '', $row['client'] ?? '', $row['deadline'] ?? '', $row['budget'] ?? ''])
            ->map(fn ($v) => $this->norm($v))
            ->implode('|');
    }

    private function norm($value): string
    {
        return mb_strtolower(trim(preg_replace('/\s+/', ' ', (string) ($value ?? ''))));
    }

    private function changedFields(array $existing, array $imported, bool $allowStatusChange): array
    {
        $fields = [];

        if ($allowStatusChange && ($existing['status'] ?? null) !== ($imported['status'] ?? null)) {
            $fields[] = 'status';
        }

        $offerChanged = $this->norm($existing['economicOffer'] ?? '') !== $this->norm($imported['economicOffer'] ?? '')
            && ($imported['economicOffer'] ?? '') !== '';
        if ($offerChanged && ($allowStatusChange || (($existing['status'] ?? null) === 'En evaluacion' && ($imported['status'] ?? null) === 'En evaluacion'))) {
            $fields[] = 'economicOffer';
        }

        if ($this->norm($existing['owner'] ?? '') !== $this->norm($imported['owner'] ?? '')) {
            $fields[] = 'owner';
        }

        return $fields;
    }

    private function fieldsLabel(array $fields): string
    {
        $labels = ['status' => 'estado', 'economicOffer' => 'oferta', 'owner' => 'responsable'];
        $mapped = array_values(array_filter(array_map(fn ($f) => $labels[$f] ?? null, $fields)));

        if (count($mapped) > 1) {
            $last = array_pop($mapped);

            return implode(', ', $mapped).' y '.$last;
        }

        return $mapped[0] ?? 'datos';
    }
}
