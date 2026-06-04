<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // El titulo del evento auto-generado es "Presentacion " + objeto del pliego,
        // y la columna `tender` guarda ese mismo objeto: ambos pueden superar 255.
        DB::statement('ALTER TABLE milestones MODIFY title TEXT NULL');
        DB::statement('ALTER TABLE milestones MODIFY tender TEXT NULL');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE milestones MODIFY title VARCHAR(255) NULL');
        DB::statement('ALTER TABLE milestones MODIFY tender VARCHAR(255) NULL');
    }
};
