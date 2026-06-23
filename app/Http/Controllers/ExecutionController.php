<?php

namespace App\Http\Controllers;

use App\Models\Tender;
use App\Models\TenderExecution;
use App\Services\ExecutionSync;
use App\Support\EntityFields;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ExecutionController extends Controller
{
    /** Valores por defecto de ejecucion para una licitacion aun sin registro. */
    private const EXECUTION_DEFAULTS = [
        'signed' => false,
        'visible' => false,
        'hidden' => false,
        'startDate' => null,
        'endDate' => null,
        'frequencyMonths' => null,
        'milestonePayments' => [],
        'installments' => [],
        'installmentPlans' => [],
        'collectedMonths' => [],
        'extensions' => [],
        'resolvedByClient' => false,
        'resolutionDate' => null,
        'penaltyAmount' => null,
        'hasGuarantee' => false,
        'guaranteeAmount' => null,
    ];

    /** Licitaciones ganadas (o resueltas por cliente) con sus datos de ejecucion fusionados. */
    public function index()
    {
        $tenders = Tender::whereIn('status', ['Ganada', 'Resuelta por cliente'])->orderBy('code')->get();

        $executions = TenderExecution::whereIn('tender_id', $tenders->pluck('id'))
            ->get()
            ->keyBy('tender_id');

        $data = $tenders->map(function (Tender $tender) use ($executions) {
            $base = EntityFields::toCamel($tender, EntityFields::TENDER);

            $model = $executions->get($tender->id);
            if ($model) {
                $exec = EntityFields::toCamel($model, EntityFields::EXECUTION);
                unset($exec['id'], $exec['updatedAt']);
                $exec['milestonePayments'] = $exec['milestonePayments'] ?? [];
                $exec['installments'] = $exec['installments'] ?? [];
                $exec['installmentPlans'] = $exec['installmentPlans'] ?? [];
                $exec['collectedMonths'] = $exec['collectedMonths'] ?? [];
                $exec['extensions'] = $exec['extensions'] ?? [];
                $exec['visible'] = (bool) ($exec['visible'] ?? false);
                $exec['hidden'] = (bool) ($exec['hidden'] ?? false);
                $exec['resolvedByClient'] = (bool) ($exec['resolvedByClient'] ?? false);
                $exec['hasGuarantee'] = (bool) ($exec['hasGuarantee'] ?? false);
            } else {
                $exec = self::EXECUTION_DEFAULTS;
            }

            $exec['tenderId'] = $tender->id;

            return array_merge($base, $exec);
        });

        return response()->json(['data' => $data->values()]);
    }

    /** Upsert por tender_id de la configuracion de ejecucion. */
    public function update(Request $request, string $tender, ExecutionSync $sync)
    {
        $attributes = EntityFields::toAttributes($request->all(), EntityFields::EXECUTION);
        unset($attributes['id'], $attributes['tender_id']);

        $execution = TenderExecution::firstOrNew(['tender_id' => $tender]);

        if (! $execution->exists) {
            $execution->id = 'exe-'.strtolower((string) Str::ulid());
            $execution->tender_id = $tender;
        }

        $execution->fill($attributes)->save();

        // Sincroniza el estado "Resuelta por cliente" y el recordatorio de garantia.
        $sync->syncFor($execution->refresh());

        return response()->json(EntityFields::toCamel($execution, EntityFields::EXECUTION));
    }
}
