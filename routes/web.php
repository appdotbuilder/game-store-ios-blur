<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\TransactionController;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/home', [HomeController::class, 'index'])->name('home.authenticated');

// Game routes
Route::get('/games', [GameController::class, 'index'])->name('games.index');
Route::get('/games/{game}', [GameController::class, 'show'])->name('games.show');

// Voucher routes
Route::get('/vouchers', [VoucherController::class, 'index'])->name('vouchers.index');
Route::get('/vouchers/{voucher}', [VoucherController::class, 'show'])->name('vouchers.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Transaction routes (requires authentication)
    Route::resource('transactions', TransactionController::class)->except(['edit', 'destroy']);
    
    // Convenience routes for creating transactions
    Route::get('/games/{game}/topup/{package}', function($gameId, $packageId) {
        return redirect()->route('transactions.create', [
            'type' => 'game_topup',
            'game_id' => $gameId,
            'package_id' => $packageId,
        ]);
    })->name('transactions.create.game');
    
    Route::post('/games/{game}/topup/{package}', function(\Illuminate\Http\Request $request, $gameId, $packageId) {
        $request->merge([
            'type' => 'game_topup',
            'game_id' => $gameId,
            'package_id' => $packageId,
        ]);
        return app(TransactionController::class)->store($request);
    })->name('transactions.store.game');
    
    Route::get('/vouchers/{voucher}/buy', function($voucherId) {
        return redirect()->route('transactions.create', [
            'type' => 'voucher',
            'voucher_id' => $voucherId,
        ]);
    })->name('transactions.create.voucher');
    
    Route::post('/vouchers/{voucher}/buy', function(\Illuminate\Http\Request $request, $voucherId) {
        $request->merge([
            'type' => 'voucher',
            'voucher_id' => $voucherId,
        ]);
        return app(TransactionController::class)->store($request);
    })->name('transactions.store.voucher');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
