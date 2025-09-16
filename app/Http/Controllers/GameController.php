<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameCategory;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * Display a listing of games.
     */
    public function index()
    {
        $games = Game::active()
            ->with(['category', 'packages' => function ($query) {
                $query->active()->orderBy('sort_order');
            }])
            ->paginate(12);
        
        $categories = GameCategory::active()->get();

        return Inertia::render('games/index', [
            'games' => $games,
            'categories' => $categories,
        ]);
    }

    /**
     * Display the specified game.
     */
    public function show(Game $game)
    {
        $game->load(['category', 'packages' => function ($query) {
            $query->active()->orderBy('sort_order');
        }]);

        return Inertia::render('games/show', [
            'game' => $game,
        ]);
    }
}