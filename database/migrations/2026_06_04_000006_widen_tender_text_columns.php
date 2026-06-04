<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // El "objeto" de un pliego puede superar 255 caracteres -> title pasa a TEXT.
        // client (organismo - suborganismo) se amplia por seguridad.
        // Se recrea el indice FULLTEXT alrededor del cambio de tipo.
        DB::statement('ALTER TABLE tenders DROP INDEX tenders_fulltext');
        DB::statement('ALTER TABLE tenders MODIFY title TEXT NULL');
        DB::statement('ALTER TABLE tenders MODIFY client VARCHAR(512) NULL');
        DB::statement('ALTER TABLE tenders MODIFY description TEXT NULL');
        DB::statement('ALTER TABLE tenders ADD FULLTEXT tenders_fulltext (title, code, client, owner)');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE tenders DROP INDEX tenders_fulltext');
        DB::statement('ALTER TABLE tenders MODIFY title VARCHAR(255) NULL');
        DB::statement('ALTER TABLE tenders MODIFY client VARCHAR(255) NULL');
        DB::statement('ALTER TABLE tenders ADD FULLTEXT tenders_fulltext (title, code, client, owner)');
    }
};
