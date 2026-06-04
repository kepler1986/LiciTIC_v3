<?php

namespace App\Http\Controllers;

use App\Models\Milestone;
use App\Support\EntityFields;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MilestoneController extends Controller
{
    public function index(Request $request)
    {
        $query = Milestone::query();

        // Scoping por usuario (no-admin solo ve sus eventos).
        if ($scope = $request->input('scope')) {
            $query->where('owner', $scope);
        }

        // Rango de fechas para calendario/gantt.
        if ($from = $request->input('date_from')) {
            $query->where('date', '>=', $from);
        }
        if ($to = $request->input('date_to')) {
            $query->where('date', '<=', $to);
        }
        if ($month = $request->input('month')) {
            $query->where('date', 'like', $month.'%');
        }
        if ($type = $request->input('type')) {
            $query->where('type', $type);
        }

        $query->orderBy('date', 'asc')->orderBy('id', 'asc');

        // Si se pide rango/mes, devolvemos todo el rango (conjunto pequeno).
        // Si no, paginamos para el listado general.
        if ($request->has('date_from') || $request->has('date_to') || $request->has('month')) {
            return response()->json([
                'data' => EntityFields::collectionToCamel($query->get(), EntityFields::MILESTONE),
            ]);
        }

        $perPage = max(1, min((int) $request->integer('per_page', 50), 200));
        $page = $query->paginate($perPage);

        return response()->json([
            'data' => EntityFields::collectionToCamel($page->items(), EntityFields::MILESTONE),
            'meta' => [
                'total' => $page->total(),
                'perPage' => $page->perPage(),
                'currentPage' => $page->currentPage(),
                'lastPage' => $page->lastPage(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $attributes = EntityFields::toAttributes($request->all(), EntityFields::MILESTONE);
        unset($attributes['id']);
        $attributes['id'] = 'evt-'.strtolower((string) Str::ulid());
        $attributes['auto_generated'] = false;

        $milestone = Milestone::create($attributes);

        return response()->json(EntityFields::toCamel($milestone, EntityFields::MILESTONE), 201);
    }

    public function update(Request $request, Milestone $milestone)
    {
        $expected = $request->input('expectedUpdatedAt');
        if ($expected && optional($milestone->updated_at)->toISOString() !== $expected) {
            return response()->json([
                'message' => 'El registro fue modificado por otro usuario.',
                'current' => EntityFields::toCamel($milestone, EntityFields::MILESTONE),
            ], 409);
        }

        $attributes = EntityFields::toAttributes($request->all(), EntityFields::MILESTONE);
        unset($attributes['id']);
        $milestone->update($attributes);

        return response()->json(EntityFields::toCamel($milestone->fresh(), EntityFields::MILESTONE));
    }

    public function destroy(Milestone $milestone)
    {
        $milestone->delete();

        return response()->noContent();
    }
}
