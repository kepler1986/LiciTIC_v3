<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenders', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('code')->nullable();
            $table->string('title')->nullable();
            $table->string('lot')->nullable();
            $table->string('client')->nullable();
            $table->string('deadline')->nullable();
            $table->string('status')->nullable();
            $table->string('budget')->nullable();
            $table->string('economic_offer')->nullable();
            $table->boolean('economic_offer_waived')->default(false);
            $table->string('owner')->nullable();
            $table->boolean('co_authored')->default(false);
            $table->string('co_author')->nullable();
            $table->string('adjudication_date')->nullable();
            $table->string('presented_at')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenders');
    }
};
