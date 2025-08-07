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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'teacher'])->default('teacher')->after('email')->comment('User role');
            $table->string('employee_id')->nullable()->unique()->after('role')->comment('Employee identification number');
            $table->string('phone')->nullable()->after('employee_id')->comment('Phone number');
            $table->text('address')->nullable()->after('phone')->comment('Address');
            
            $table->index('role');
            $table->index('employee_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropIndex(['employee_id']);
            $table->dropColumn(['role', 'employee_id', 'phone', 'address']);
        });
    }
};