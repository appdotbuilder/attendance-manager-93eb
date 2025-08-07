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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->unique()->comment('Student identification number');
            $table->string('first_name')->comment('Student first name');
            $table->string('last_name')->comment('Student last name');
            $table->string('email')->nullable()->comment('Student email address');
            $table->string('phone')->nullable()->comment('Student phone number');
            $table->date('date_of_birth')->nullable()->comment('Student date of birth');
            $table->text('address')->nullable()->comment('Student address');
            $table->foreignId('class_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['active', 'inactive', 'graduated'])->default('active')->comment('Student status');
            $table->timestamps();
            
            $table->index('student_id');
            $table->index(['first_name', 'last_name']);
            $table->index('class_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};