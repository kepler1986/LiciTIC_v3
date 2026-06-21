<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tender_executions', function (Blueprint $table) {
            // Visible: solo los proyectos marcados aparecen en el GANTT de pagos.
            $table->boolean('visible')->default(false)->after('signed');
            // Cuotas del plan de pago editables (JSON: [{concept, date, amount}, ...]).
            $table->longText('installments')->nullable()->after('milestone_payments');
        });
    }

    public function down(): void
    {
        Schema::table('tender_executions', function (Blueprint $table) {
            $table->dropColumn(['visible', 'installments']);
        });
    }
};
