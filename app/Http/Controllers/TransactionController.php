<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Game;
use App\Models\GamePackage;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    /**
     * Display a listing of user's transactions.
     */
    public function index(Request $request)
    {
        $query = Transaction::with(['transactionable'])
            ->where('user_id', auth()->id())
            ->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $transactions = $query->paginate(10);

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Show the form for creating a new transaction.
     */
    public function create(Request $request)
    {
        $type = $request->get('type');
        
        if ($type === 'game_topup') {
            $game = Game::findOrFail($request->get('game_id'));
            $package = GamePackage::findOrFail($request->get('package_id'));
            
            $game->load(['category', 'packages' => function ($query) {
                $query->active()->orderBy('sort_order');
            }]);

            return Inertia::render('transactions/create-game-topup', [
                'game' => $game,
                'package' => $package,
            ]);
        }
        
        if ($type === 'voucher') {
            $voucher = Voucher::findOrFail($request->get('voucher_id'));
            
            return Inertia::render('transactions/create-voucher', [
                'voucher' => $voucher,
            ]);
        }

        abort(404);
    }

    /**
     * Store a newly created transaction.
     */
    public function store(Request $request)
    {
        $type = $request->get('type');
        
        if ($type === 'game_topup') {
            return $this->storeGameTopup($request);
        }
        
        if ($type === 'voucher') {
            return $this->storeVoucher($request);
        }

        abort(404);
    }

    /**
     * Display the specified transaction for payment.
     */
    public function show(Transaction $transaction)
    {
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        $transaction->load('transactionable');

        if ($transaction->status === 'success') {
            return Inertia::render('transactions/success', [
                'transaction' => $transaction,
            ]);
        }

        if ($transaction->status === 'failed') {
            return Inertia::render('transactions/failed', [
                'transaction' => $transaction,
            ]);
        }

        return Inertia::render('transactions/payment', [
            'transaction' => $transaction,
        ]);
    }

    /**
     * Update the specified transaction (process payment).
     */
    public function update(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        // Simulate payment processing (in real app, integrate with Midtrans)
        $success = random_int(1, 10) > 2; // 80% success rate for demo

        if ($success) {
            $transaction->update([
                'status' => 'success',
                'paid_at' => now(),
                'payment_gateway_id' => 'PAY-' . strtoupper(Str::random(12)),
            ]);
        } else {
            $transaction->update([
                'status' => 'failed',
            ]);
        }

        return redirect()->route('transactions.show', $transaction);
    }

    /**
     * Store a game topup transaction.
     */
    protected function storeGameTopup(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'game_id' => 'required|exists:games,id',
            'package_id' => 'required|exists:game_packages,id',
            'user_id' => 'required|string',
            'server' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        $game = Game::findOrFail($validated['game_id']);
        $package = GamePackage::findOrFail($validated['package_id']);

        $transaction = Transaction::create([
            'transaction_id' => 'TXN-' . strtoupper(Str::random(10)),
            'user_id' => auth()->id(),
            'type' => 'game_topup',
            'transactionable_type' => Game::class,
            'transactionable_id' => $game->id,
            'item_name' => $game->name . ' - ' . $package->name,
            'amount' => $package->price,
            'status' => 'pending',
            'payment_method' => $validated['payment_method'],
            'game_details' => [
                'user_id' => $validated['user_id'],
                'server' => $validated['server'],
                'package' => $package->name,
                'amount' => $package->amount,
                'unit' => $package->unit,
            ],
        ]);

        return redirect()->route('transactions.show', $transaction);
    }

    /**
     * Store a voucher transaction.
     */
    protected function storeVoucher(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'voucher_id' => 'required|exists:vouchers,id',
            'payment_method' => 'required|string',
        ]);

        $voucher = Voucher::findOrFail($validated['voucher_id']);

        if ($voucher->stock <= 0) {
            return back()->withErrors(['error' => 'Voucher is out of stock']);
        }

        $transaction = Transaction::create([
            'transaction_id' => 'TXN-' . strtoupper(Str::random(10)),
            'user_id' => auth()->id(),
            'type' => 'voucher',
            'transactionable_type' => Voucher::class,
            'transactionable_id' => $voucher->id,
            'item_name' => $voucher->name,
            'amount' => $voucher->price,
            'status' => 'pending',
            'payment_method' => $validated['payment_method'],
        ]);

        // Decrease voucher stock
        $voucher->decrement('stock');

        return redirect()->route('transactions.show', $transaction);
    }
}