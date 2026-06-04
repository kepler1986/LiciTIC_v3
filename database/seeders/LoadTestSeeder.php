<?php

namespace Database\Seeders;

use App\Support\DemoData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Genera ~30.000 licitaciones para pruebas de escala. Insercion masiva por
 * lotes. Ejecutar con: php artisan db:seed --class=LoadTestSeeder
 */
class LoadTestSeeder extends Seeder
{
    public function run(): void
    {
        $total = (int) (env('LOAD_TEST_ROWS', 30000));
        $owners = array_column(DemoData::team(), 'name');
        $clients = ['BBVA', 'Orange', 'ADIF', 'Ayuntamiento de Madrid', 'DGT', 'INE', 'Renfe', 'Correos', 'SEPE', 'AEAT'];
        $statuses = ['En analisis', 'En preparacion', 'En evaluacion', 'Descartada', 'Desistida', 'Perdida', 'Ganada'];
        $now = Carbon::now();

        $batch = [];
        for ($i = 0; $i < $total; $i++) {
            $status = $statuses[$i % count($statuses)];
            $deadline = $now->copy()->addDays(($i % 120) - 30)->format('Y-m-d\T').sprintf('%02d:00', 8 + ($i % 9));
            $owner = $owners[$i % count($owners)];

            $batch[] = [
                'id' => 'lic-load-'.strtolower((string) Str::ulid()),
                'code' => 'LOAD-'.str_pad((string) $i, 6, '0', STR_PAD_LEFT),
                'title' => 'Licitacion de carga '.$i,
                'lot' => (string) (($i % 3) + 1),
                'client' => $clients[$i % count($clients)],
                'deadline' => $deadline,
                'status' => $status,
                'budget' => (string) (100000 + ($i % 900) * 1000).'.00',
                'economic_offer' => $status === 'En evaluacion' && $i % 2 ? (string) (90000 + ($i % 800) * 1000).'.00' : '',
                'economic_offer_waived' => 0,
                'owner' => $owner,
                'co_authored' => 0,
                'co_author' => '',
                'adjudication_date' => in_array($status, ['Ganada', 'Perdida'], true) ? $now->copy()->subDays($i % 60)->format('Y-m-d') : null,
                'presented_at' => $status === 'En evaluacion' ? $deadline : '',
                'description' => 'Registro generado para prueba de carga.',
                'created_at' => $now,
                'updated_at' => $now,
            ];

            if (count($batch) >= 1000) {
                DB::table('tenders')->insert($batch);
                $batch = [];
                $this->command?->info('Insertadas '.($i + 1).' filas...');
            }
        }

        if ($batch) {
            DB::table('tenders')->insert($batch);
        }

        $this->command?->info("Listo: $total licitaciones de carga.");
    }
}
