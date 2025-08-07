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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->foreignId('class_id')->constrained()->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->date('date')->comment('Date of attendance');
            $table->enum('status', ['present', 'absent', 'late', 'excused'])->default('present')->comment('Attendance status');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->timestamps();
            
            $table->unique(['student_id', 'subject_id', 'class_id', 'date']);
            $table->index('date');
            $table->index('status');
            $table->index(['student_id', 'date']);
            $table->index(['teacher_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};