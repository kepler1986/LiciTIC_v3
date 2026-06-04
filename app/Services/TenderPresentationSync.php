<?php

namespace App\Services;

use App\Models\Milestone;
use App\Models\Tender;

/**
 * Replica en servidor la logica de `syncTenderPresentationEvent` del frontend:
 * al guardar una licitacion crea/actualiza/borra su evento de "Presentacion"
 * auto-generado segun el estado. Garantiza consistencia para todos los clientes.
 */
class TenderPresentationSync
{
    public function sync(Tender $tender, ?array $previous = null): void
    {
        $eventId = 'evt-presentation-'.$tender->id;

        $existing = Milestone::query()
            ->where('id', $eventId)
            ->orWhere(function ($query) use ($tender) {
                $query->where('auto_generated', true)->where('tender_id', $tender->id);
            })
            ->first();

        if ($tender->status !== 'En preparacion') {
            $existing?->delete();

            return;
        }

        $attributes = [
            'title' => 'Presentacion '.$tender->title,
            'tender' => $tender->title,
            'date' => $tender->deadline,
            'type' => 'Presentacion',
            'owner' => $tender->owner,
            'status' => 'Pendiente',
            'preparation_other' => false,
            'reception_date' => null,
            'auto_generated' => true,
            'tender_id' => $tender->id,
        ];

        if ($existing) {
            $existing->update($attributes);

            return;
        }

        // Si la licitacion cambio de titulo/fecha, migrar el evento de presentacion previo.
        if ($previous && ! empty($previous['title'])) {
            $migrated = Milestone::query()
                ->where('type', 'Presentacion')
                ->where('tender', $previous['title'])
                ->where('date', $previous['deadline'] ?? null)
                ->first();

            if ($migrated) {
                $migrated->update($attributes);

                return;
            }
        }

        Milestone::create(array_merge(['id' => $eventId], $attributes));
    }

    /** Al borrar una licitacion, elimina su evento de presentacion auto-generado. */
    public function removeFor(Tender $tender): void
    {
        Milestone::query()
            ->where('auto_generated', true)
            ->where('tender_id', $tender->id)
            ->delete();
    }
}
