<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tender_executions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('tender_id')->unique();
            $table->boolean('signed')->default(false);
            $table->string('start_date')->nullable();
            $table->string('end_date')->nullable();
            $table->string('frequency_months')->nullable();
            $table->longText('milestone_payments')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tender_executions');
    }
};
