<?php

namespace App\Http\Controllers;

use App\Models\Tender;
use App\Services\TenderPresentationSync;
use App\Support\EntityFields;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TenderController extends Controller
{
    /** Columnas permitidas para ordenar (camel -> snake), evita inyeccion via ?sort=. */
    private const SORTABLE = EntityFields::TENDER;

    /** @var array<string, string> */
    private const EXPORT_COLUMNS = [
        'code' => 'Expediente',
        'title' => 'Objeto',
        'lot' => 'Lote',
        'client' => 'Organismo',
        'deadline' => 'Fecha fin ofertas',
        'status' => 'Estado',
        'budget' => 'PBL',
        'economicOffer' => 'Oferta economica',
        'economicOfferWaived' => 'Oferta anulada',
        'owner' => 'Responsable',
        'coAuthored' => 'Coautoria',
        'coAuthor' => 'Coautor',
        'adjudicationDate' => 'Fecha adjudicacion',
        'presentedAt' => 'Fecha presentacion',
        'description' => 'Descripcion',
    ];

    public function __construct(private TenderPresentationSync $presentationSync) {}

    public function index(Request $request): JsonResponse
    {
        $query = $this->filteredQuery($request);

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

    public function export(Request $request): StreamedResponse
    {
        $query = $this->filteredQuery($request, includeFilters: ! $request->boolean('all'));
        $filename = 'licitic-tenders-'.CarbonImmutable::now()->format('Y-m-d').'.xlsx';

        return response()->streamDownload(function () use ($query): void {
            $spreadsheet = $this->exportSpreadsheet($query);
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output');
            $spreadsheet->disconnectWorksheets();
        }, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
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

    /** Query base compartida por listado y exportacion. */
    private function filteredQuery(Request $request, bool $includeFilters = true): Builder
    {
        $query = Tender::query();

        $this->applyScope($query, $request);

        if ($includeFilters) {
            $this->applySearch($query, $request);
            $this->applyFilters($query, $request);
        }

        $this->applySort($query, $request);

        return $query;
    }

    /** Scoping por usuario: los no-admin solo ven sus licitaciones (owner o coautor). */
    private function applyScope(Builder $query, Request $request): void
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

    private function applySearch(Builder $query, Request $request): void
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

    private function applyFilters(Builder $query, Request $request): void
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

    private function applySort(Builder $query, Request $request): void
    {
        $sortCamel = $request->input('sort', 'deadline');
        $column = self::SORTABLE[$sortCamel] ?? 'deadline';
        $direction = strtolower((string) $request->input('direction', 'asc')) === 'desc' ? 'desc' : 'asc';

        if (in_array($column, ['deadline', 'adjudication_date', 'presented_at'], true)) {
            $query->orderByRaw("({$column} is null or {$column} = '') asc");
        }

        $query->orderBy($column, $direction)->orderBy('id', 'asc');
    }

    private function exportSpreadsheet(Builder $query): Spreadsheet
    {
        $spreadsheet = new Spreadsheet;
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Licitaciones');

        $headers = array_values(self::EXPORT_COLUMNS);
        $sheet->fromArray($headers, null, 'A1');

        $row = 2;
        $query->cursor()->each(function (Tender $tender) use ($sheet, &$row): void {
            $data = EntityFields::toCamel($tender, EntityFields::TENDER);
            $column = 1;

            foreach (array_keys(self::EXPORT_COLUMNS) as $field) {
                $this->writeExportCell($sheet, $row, $column, $field, $data[$field] ?? null);
                $column++;
            }

            $row++;
        });

        $lastColumn = $sheet->getHighestColumn();
        $lastRow = max(1, $row - 1);

        $sheet->freezePane('A2');
        $sheet->setAutoFilter("A1:{$lastColumn}{$lastRow}");
        $sheet->getStyle("A1:{$lastColumn}1")->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '1D4ED8']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        ]);
        $sheet->getStyle("A1:{$lastColumn}{$lastRow}")->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
        if ($lastRow >= 2) {
            $sheet->getStyle("G2:H{$lastRow}")->getNumberFormat()->setFormatCode('#,##0.00');
            $sheet->getStyle("E2:E{$lastRow}")->getNumberFormat()->setFormatCode('yyyy-mm-dd hh:mm');
            $sheet->getStyle("M2:N{$lastRow}")->getNumberFormat()->setFormatCode('yyyy-mm-dd');
        }

        foreach (range('A', $lastColumn) as $column) {
            $sheet->getColumnDimension($column)->setAutoSize(true);
        }

        return $spreadsheet;
    }

    private function writeExportCell(Worksheet $sheet, int $row, int $column, string $field, mixed $value): void
    {
        if (in_array($field, ['budget', 'economicOffer'], true)) {
            $sheet->setCellValue([$column, $row], $this->exportNumber($value));

            return;
        }

        if (in_array($field, ['deadline', 'adjudicationDate', 'presentedAt'], true)) {
            $sheet->setCellValue([$column, $row], $this->exportDate($value, $field === 'deadline'));

            return;
        }

        if (in_array($field, ['economicOfferWaived', 'coAuthored'], true)) {
            $sheet->setCellValue([$column, $row], $value ? 'Si' : 'No');

            return;
        }

        $sheet->setCellValueExplicit([$column, $row], (string) $value, DataType::TYPE_STRING);
    }

    private function exportNumber(mixed $value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (float) str_replace(',', '.', (string) $value);
    }

    private function exportDate(mixed $value, bool $withTime = false): float|string|null
    {
        if ($value === null || $value === '') {
            return null;
        }

        try {
            $date = CarbonImmutable::parse((string) $value);

            return ExcelDate::PHPToExcel($withTime ? $date : $date->startOfDay());
        } catch (\Throwable) {
            return (string) $value;
        }
    }
}
