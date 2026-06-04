<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // settings.value guarda los parametros como JSON, incluyendo imagenes (favicon,
        // fondo de login) como data URL. TEXT (64KB) se queda corto -> LONGTEXT.
        DB::statement('ALTER TABLE settings MODIFY value LONGTEXT NULL');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE settings MODIFY value TEXT NULL');
    }
};
