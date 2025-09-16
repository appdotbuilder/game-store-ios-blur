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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type'); // 'game_topup', 'voucher'
            $table->morphs('transactionable'); // game or voucher
            $table->string('item_name');
            $table->decimal('amount', 10, 2);
            $table->enum('status', ['pending', 'success', 'failed', 'cancelled'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->string('payment_gateway_id')->nullable();
            $table->json('payment_details')->nullable();
            $table->json('game_details')->nullable(); // user_id, server, package info
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
            
            $table->index('transaction_id');
            $table->index(['user_id', 'status']);
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};