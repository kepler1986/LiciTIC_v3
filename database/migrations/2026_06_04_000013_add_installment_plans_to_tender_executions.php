<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tender_executions', function (Blueprint $table) {
            // Planes de pago por cuotas (JSON). Cada plan:
            // {mode, startDate, endDate, frequencyMonths, amount, cuotas:[{date, amount}]}.
            $table->longText('installment_plans')->nullable()->after('installments');
        });
    }

    public function down(): void
    {
        Schema::table('tender_executions', function (Blueprint $table) {
            $table->dropColumn('installment_plans');
        });
    }
};
