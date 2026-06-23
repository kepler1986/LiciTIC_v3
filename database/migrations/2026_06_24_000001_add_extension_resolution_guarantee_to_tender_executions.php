<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tender_executions', function (Blueprint $table) {
            // Prorrogas: JSON [{id, endDate, sameAmount, amount, planIndex}, ...].
            $table->longText('extensions')->nullable()->after('installment_plans');
            // Resolucion por cliente: anula pagos futuros y aplica penalizacion.
            $table->boolean('resolved_by_client')->default(false)->after('extensions');
            $table->string('resolution_date')->nullable()->after('resolved_by_client');
            $table->string('penalty_amount')->nullable()->after('resolution_date');
            // Garantia: importe y recordatorio automatico tras el fin total de ejecucion.
            $table->boolean('has_guarantee')->default(false)->after('penalty_amount');
            $table->string('guarantee_amount')->nullable()->after('has_guarantee');
        });
    }

    public function down(): void
    {
        Schema::table('tender_executions', function (Blueprint $table) {
            $table->dropColumn([
                'extensions',
                'resolved_by_client',
                'resolution_date',
                'penalty_amount',
                'has_guarantee',
                'guarantee_amount',
            ]);
        });
    }
};
