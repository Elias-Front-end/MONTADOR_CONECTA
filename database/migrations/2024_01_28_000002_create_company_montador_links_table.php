<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('company_montador_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('users');
            $table->foreignId('montador_id')->constrained('users');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
            
            $table->unique(['company_id', 'montador_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('company_montador_links');
    }
};
