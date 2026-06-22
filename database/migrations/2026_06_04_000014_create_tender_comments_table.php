<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tender_comments', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('tender_id');
            $table->string('author')->nullable();
            $table->text('body');
            $table->timestamps();

            $table->index('tender_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tender_comments');
    }
};
