<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tender_executions', function (Blueprint $table) {
            // Meses marcados como cobrados (JSON: ["2026-06", ...]) para el GANTT de pagos.
            $table->longText('collected_months')->nullable()->after('milestone_payments');
        });
    }

    public function down(): void
    {
        Schema::table('tender_executions', function (Blueprint $table) {
            $table->dropColumn('collected_months');
        });
    }
};
