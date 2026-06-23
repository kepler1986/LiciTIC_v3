<?php

use App\Models\Tender;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use PhpOffice\PhpSpreadsheet\IOFactory;

beforeEach(function () {
    Schema::dropIfExists('tenders');
    Schema::create('tenders', function (Blueprint $table) {
        $table->string('id')->primary();
        $table->string('code')->nullable();
        $table->text('title')->nullable();
        $table->string('lot')->nullable();
        $table->string('client')->nullable();
        $table->string('deadline')->nullable();
        $table->string('status')->nullable();
        $table->string('budget')->nullable();
        $table->string('economic_offer')->nullable();
        $table->boolean('economic_offer_waived')->default(false);
        $table->string('owner')->nullable();
        $table->boolean('co_authored')->default(false);
        $table->string('co_author')->nullable();
        $table->string('adjudication_date')->nullable();
        $table->string('presented_at')->nullable();
        $table->text('description')->nullable();
        $table->timestamps();
    });
});

test('exports filtered tenders as an xlsx workbook', function () {
    Tender::create([
        'id' => 'lic-1',
        'code' => 'BBB-1',
        'title' => 'Licitacion incluida B',
        'client' => 'Cliente B',
        'deadline' => '2026-07-15T12:00',
        'status' => 'En preparacion',
        'budget' => '2000.50',
        'economic_offer' => '1500',
        'owner' => 'Laura Gomez',
    ]);
    Tender::create([
        'id' => 'lic-2',
        'code' => 'AAA-1',
        'title' => 'Licitacion incluida A',
        'client' => 'Cliente A',
        'deadline' => '2026-07-01T10:00',
        'status' => 'En preparacion',
        'budget' => '1000',
        'economic_offer' => '',
        'owner' => 'Marta Sanchez',
    ]);
    Tender::create([
        'id' => 'lic-3',
        'code' => 'CCC-1',
        'title' => 'Licitacion excluida',
        'client' => 'Cliente C',
        'deadline' => '2026-07-30T10:00',
        'status' => 'Ganada',
        'budget' => '3000',
        'owner' => 'Laura Gomez',
    ]);

    $query = http_build_query([
        'filters' => ['status' => 'En preparacion'],
        'sort' => 'code',
        'direction' => 'asc',
    ]);

    $response = $this->get('/api/tenders/export?'.$query);

    $response->assertSuccessful()
        ->assertDownload('licitic-tenders-'.now()->format('Y-m-d').'.xlsx');

    $path = tempnam(sys_get_temp_dir(), 'licitic-export-').'.xlsx';
    file_put_contents($path, $response->streamedContent());

    $spreadsheet = IOFactory::load($path);
    $sheet = $spreadsheet->getActiveSheet();

    expect($sheet->getCell('A1')->getValue())->toBe('Expediente')
        ->and($sheet->getCell('A2')->getValue())->toBe('AAA-1')
        ->and($sheet->getCell('A3')->getValue())->toBe('BBB-1')
        ->and($sheet->getCell('A4')->getValue())->toBeNull()
        ->and($sheet->getCell('F2')->getValue())->toBe('En preparacion')
        ->and($sheet->getCell('G2')->getValue())->toBe(1000.0);

    $spreadsheet->disconnectWorksheets();
    unlink($path);
});

test('exports all scoped tenders when all flag is present', function () {
    Tender::create([
        'id' => 'lic-1',
        'code' => 'AAA-1',
        'title' => 'Licitacion filtrable',
        'status' => 'En preparacion',
        'owner' => 'Laura Gomez',
    ]);
    Tender::create([
        'id' => 'lic-2',
        'code' => 'BBB-1',
        'title' => 'Licitacion completa',
        'status' => 'Ganada',
        'owner' => 'Laura Gomez',
    ]);

    $query = http_build_query([
        'all' => 1,
        'filters' => ['status' => 'En preparacion'],
        'sort' => 'code',
        'direction' => 'asc',
    ]);

    $response = $this->get('/api/tenders/export?'.$query);

    $path = tempnam(sys_get_temp_dir(), 'licitic-export-all-').'.xlsx';
    file_put_contents($path, $response->streamedContent());

    $spreadsheet = IOFactory::load($path);
    $sheet = $spreadsheet->getActiveSheet();

    $response->assertSuccessful()->assertDownload();

    expect($sheet->getCell('A2')->getValue())->toBe('AAA-1')
        ->and($sheet->getCell('A3')->getValue())->toBe('BBB-1');

    $spreadsheet->disconnectWorksheets();
    unlink($path);
});

test('orders tenders with missing deadlines last', function () {
    Tender::create([
        'id' => 'lic-without-deadline',
        'code' => 'SIN-FECHA',
        'title' => 'Licitacion sin fecha',
        'status' => 'En preparacion',
        'owner' => 'Laura Gomez',
    ]);
    Tender::create([
        'id' => 'lic-later',
        'code' => 'POSTERIOR',
        'title' => 'Licitacion posterior',
        'deadline' => '2026-07-15T12:00',
        'status' => 'En preparacion',
        'owner' => 'Laura Gomez',
    ]);
    Tender::create([
        'id' => 'lic-earlier',
        'code' => 'ANTERIOR',
        'title' => 'Licitacion anterior',
        'deadline' => '2026-07-01T10:00',
        'status' => 'En preparacion',
        'owner' => 'Laura Gomez',
    ]);

    $response = $this->getJson('/api/tenders?sort=deadline&direction=asc&per_page=10');

    $response->assertSuccessful();

    expect(collect($response->json('data'))->pluck('code')->all())->toBe([
        'ANTERIOR',
        'POSTERIOR',
        'SIN-FECHA',
    ]);
});
