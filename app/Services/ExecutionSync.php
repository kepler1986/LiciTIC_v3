<?php

namespace App\Services;

use App\Models\Milestone;
use App\Models\Tender;
use App\Models\TenderExecution;
use Illuminate\Support\Carbon;

/**
 * Sincroniza efectos secundarios al guardar la ejecucion de una licitacion:
 *  - el estado de la licitacion cuando se marca/desmarca "Resuelta por cliente";
 *  - el recordatorio auto-generado para recoger la garantia, un mes despues
 *    del fin total de ejecucion (incluidas prorrogas).
 */
class ExecutionSync
{
    public function syncFor(TenderExecution $execution): void
    {
        $tender = Tender::find($execution->tender_id);

        if (! $tender) {
            return;
        }

        $this->syncResolutionStatus($tender, $execution);
        $this->syncGuaranteeReminder($tender, $execution);
    }

    private function syncResolutionStatus(Tender $tender, TenderExecution $execution): void
    {
        if ($execution->resolved_by_client) {
            if ($tender->status !== 'Resuelta por cliente') {
                $tender->status = 'Resuelta por cliente';
                $tender->save();
            }

            return;
        }

        // Al desmarcar, revertir el estado terminal a "Ganada".
        if ($tender->status === 'Resuelta por cliente') {
            $tender->status = 'Ganada';
            $tender->save();
        }
    }

    private function syncGuaranteeReminder(Tender $tender, TenderExecution $execution): void
    {
        $eventId = 'evt-guarantee-'.$tender->id;
        $existing = Milestone::query()->where('id', $eventId)->first();

        $end = $this->totalEndDate($execution);

        if (! $execution->has_guarantee || ! $end) {
            $existing?->delete();

            return;
        }

        $attributes = [
            'title' => 'Recoger garantia del banco - '.$tender->title,
            'tender' => $tender->title,
            'date' => Carbon::parse($end)->addMonth()->format('Y-m-d'),
            'type' => 'Recordatorio',
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

        Milestone::create(array_merge(['id' => $eventId], $attributes));
    }

    /** Fin total de ejecucion = ultima fecha entre end_date y las prorrogas. */
    private function totalEndDate(TenderExecution $execution): ?string
    {
        $dates = [];

        if (! empty($execution->end_date)) {
            $dates[] = $execution->end_date;
        }

        foreach ((array) ($execution->extensions ?? []) as $extension) {
            if (! empty($extension['endDate'])) {
                $dates[] = $extension['endDate'];
            }
        }

        if (! $dates) {
            return null;
        }

        // Fechas ISO (YYYY-MM-DD): el orden lexicografico coincide con el cronologico.
        return max($dates);
    }
}
