<?php

namespace App\Http\Controllers;

use App\Models\Tender;
use App\Services\TenderPresentationSync;
use App\Support\EntityFields;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TenderController extends Controller
{
    /** Columnas permitidas para ordenar (camel -> snake), evita inyeccion via ?sort=. */
    private const SORTABLE = EntityFields::TENDER;

    public function __construct(private TenderPresentationSync $presentationSync)
    {
    }

    public function index(Request $request)
    {
        $query = Tender::query();

        $this->applyScope($query, $request);
        $this->applySearch($query, $request);
        $this->applyFilters($query, $request);
        $this->applySort($query, $request);

        $perPage = (int) $request->integer('per_page', 50);
        $perPage = max(1, min($perPage, 200));

        $page = $query->paginate($perPage);

        return response()->json([
            'data' => EntityFields::collectionToCamel($page->items(), EntityFields::TENDER),
            'meta' => [
                'total' => $page->total(),
                'perPage' => $page->perPage(),
                'currentPage' => $page->currentPage(),
                'lastPage' => $page->lastPage(),
            ],
        ]);
    }

    public function store(Request $request, TenderPresentationSync $sync)
    {
        $attributes = EntityFields::toAttributes($request->all(), EntityFields::TENDER);
        unset($attributes['id']);
        $attributes['id'] = 'lic-'.strtolower((string) Str::ulid());

        $tender = Tender::create($attributes);
        $sync->sync($tender->fresh());

        return response()->json(EntityFields::toCamel($tender->fresh(), EntityFields::TENDER), 201);
    }

    public function show(Tender $tender)
    {
        return response()->json(EntityFields::toCamel($tender, EntityFields::TENDER));
    }

    public function update(Request $request, Tender $tender, TenderPresentationSync $sync)
    {
        // Bloqueo optimista: si el registro cambio desde que el cliente lo leyo, 409.
        $expected = $request->input('expectedUpdatedAt');
        if ($expected && optional($tender->updated_at)->toISOString() !== $expected) {
            return response()->json([
                'message' => 'El registro fue modificado por otro usuario.',
                'current' => EntityFields::toCamel($tender, EntityFields::TENDER),
            ], 409);
        }

        $previous = ['title' => $tender->title, 'deadline' => $tender->deadline];

        $attributes = EntityFields::toAttributes($request->all(), EntityFields::TENDER);
        unset($attributes['id']);
        $tender->update($attributes);

        $sync->sync($tender->fresh(), $previous);

        return response()->json(EntityFields::toCamel($tender->fresh(), EntityFields::TENDER));
    }

    public function destroy(Tender $tender, TenderPresentationSync $sync)
    {
        $sync->removeFor($tender);
        $tender->delete();

        return response()->noContent();
    }

    /** Scoping por usuario: los no-admin solo ven sus licitaciones (owner o coautor). */
    private function applyScope($query, Request $request): void
    {
        $scope = $request->input('scope');

        if ($scope) {
            $query->where(function ($q) use ($scope) {
                $q->where('owner', $scope)
                    ->orWhere(function ($inner) use ($scope) {
                        $inner->where('co_authored', true)->where('co_author', $scope);
                    });
            });
        }
    }

    private function applySearch($query, Request $request): void
    {
        $search = trim((string) $request->input('search', ''));

        if ($search !== '') {
            $like = '%'.$search.'%';
            $query->where(function ($q) use ($like) {
                $q->where('title', 'like', $like)
                    ->orWhere('code', 'like', $like)
                    ->orWhere('client', 'like', $like)
                    ->orWhere('owner', 'like', $like)
                    ->orWhere('co_author', 'like', $like)
                    ->orWhere('lot', 'like', $like);
            });
        }
    }

    private function applyFilters($query, Request $request): void
    {
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($owner = $request->input('owner')) {
            $query->where('owner', $owner);
        }

        if ($from = $request->input('deadline_from')) {
            $query->where('deadline', '>=', $from);
        }

        if ($to = $request->input('deadline_to')) {
            $query->where('deadline', '<=', $to);
        }

        // Filtros por columna (LIKE) que el frontend mandaba como tenderColumnFilters.
        $filters = $request->input('filters', []);
        if (is_array($filters)) {
            foreach ($filters as $camel => $value) {
                $value = trim((string) $value);
                $column = self::SORTABLE[$camel] ?? null;
                if ($column && $value !== '') {
                    $query->where($column, 'like', '%'.$value.'%');
                }
            }
        }
    }

    private function applySort($query, Request $request): void
    {
        $sortCamel = $request->input('sort', 'deadline');
        $column = self::SORTABLE[$sortCamel] ?? 'deadline';
        $direction = strtolower((string) $request->input('direction', 'asc')) === 'desc' ? 'desc' : 'asc';

        $query->orderBy($column, $direction)->orderBy('id', 'asc');
    }
}
