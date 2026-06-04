<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tenders', function (Blueprint $table) {
            $table->index('status');
            $table->index('deadline');
            $table->index('client');
            $table->index('code');
            $table->index('owner');
            $table->index('co_author');
            $table->index('presented_at');
            $table->index('adjudication_date');
        });

        // Indice FULLTEXT para la busqueda (MySQL/InnoDB).
        DB::statement('ALTER TABLE tenders ADD FULLTEXT tenders_fulltext (title, code, client, owner)');

        Schema::table('milestones', function (Blueprint $table) {
            $table->index('tender_id');
            $table->index('date');
            $table->index('type');
            $table->index('status');
            $table->index('owner');
            // Sin FK dura: el ciclo de vida de los eventos auto-generados lo gestiona
            // el TenderObserver; los manuales pueden referenciar un tender por id o por titulo.
        });

        Schema::table('members', function (Blueprint $table) {
            $table->index('role');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::table('tenders', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['deadline']);
            $table->dropIndex(['client']);
            $table->dropIndex(['code']);
            $table->dropIndex(['owner']);
            $table->dropIndex(['co_author']);
            $table->dropIndex(['presented_at']);
            $table->dropIndex(['adjudication_date']);
        });

        DB::statement('ALTER TABLE tenders DROP INDEX tenders_fulltext');

        Schema::table('milestones', function (Blueprint $table) {
            $table->dropIndex(['tender_id']);
            $table->dropIndex(['date']);
            $table->dropIndex(['type']);
            $table->dropIndex(['status']);
            $table->dropIndex(['owner']);
        });

        Schema::table('members', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropIndex(['status']);
        });
    }
};
