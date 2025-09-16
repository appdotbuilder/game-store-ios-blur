<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameCategory;
use App\Models\Voucher;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $categories = GameCategory::active()->get();
        $popularGames = Game::active()->popular()->with(['category', 'packages' => function ($query) {
            $query->active()->orderBy('sort_order');
        }])->take(8)->get();
        
        $featuredVouchers = Voucher::active()
            ->where('stock', '>', 0)
            ->take(6)
            ->get();

        return Inertia::render('welcome', [
            'categories' => $categories,
            'popularGames' => $popularGames,
            'featuredVouchers' => $featuredVouchers,
        ]);
    }
}