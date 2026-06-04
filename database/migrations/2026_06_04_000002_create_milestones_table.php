<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('milestones', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->text('title')->nullable();
            $table->text('tender')->nullable();
            $table->string('tender_id')->nullable();
            $table->string('type')->nullable();
            $table->boolean('preparation_other')->default(false);
            $table->string('reception_date')->nullable();
            $table->string('date')->nullable();
            $table->string('status')->nullable();
            $table->string('owner')->nullable();
            $table->boolean('auto_generated')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('milestones');
    }
};
