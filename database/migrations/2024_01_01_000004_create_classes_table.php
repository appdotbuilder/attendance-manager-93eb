<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Class name (e.g., Grade 10A)');
            $table->string('section')->nullable()->comment('Class section');
            $table->integer('grade_level')->comment('Grade level number');
            $table->text('description')->nullable()->comment('Class description');
            $table->timestamps();
            
            $table->index('name');
            $table->index('grade_level');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};