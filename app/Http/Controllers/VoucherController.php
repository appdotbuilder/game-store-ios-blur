<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Inertia\Inertia;

class VoucherController extends Controller
{
    /**
     * Display a listing of vouchers.
     */
    public function index()
    {
        $vouchers = Voucher::active()
            ->where('stock', '>', 0)
            ->paginate(12);

        $platforms = Voucher::active()
            ->select('platform')
            ->distinct()
            ->pluck('platform');

        return Inertia::render('vouchers/index', [
            'vouchers' => $vouchers,
            'platforms' => $platforms,
        ]);
    }

    /**
     * Display the specified voucher.
     */
    public function show(Voucher $voucher)
    {
        return Inertia::render('vouchers/show', [
            'voucher' => $voucher,
        ]);
    }
}