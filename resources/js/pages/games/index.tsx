import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Game {
    id: number;
    name: string;
    publisher: string;
    description: string;
    image?: string;
    is_popular: boolean;
    packages: Array<{
        id: number;
        name: string;
        price: number;
    }>;
}

interface Category {
    id: number;
    name: string;
    icon: string;
}

interface Props {
    games: {
        data: Game[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
    [key: string]: unknown;
}

export default function GamesIndex({ games, categories }: Props) {
    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">🎮 Games</h1>
                        <p className="text-gray-400 mt-1">Choose your favorite games and top up instantly</p>
                    </div>
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium">
                        All Games
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className="px-4 py-2 backdrop-blur-lg bg-white/10 text-white rounded-xl font-medium border border-white/20 hover:bg-white/20 transition-all"
                        >
                            {category.icon} {category.name}
                        </button>
                    ))}
                </div>

                {/* Games Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {games.data.map((game) => (
                        <Link key={game.id} href={`/games/${game.id}`}>
                            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
                                {/* Game Image Placeholder */}
                                <div className="w-full h-32 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform relative overflow-hidden">
                                    <span className="text-4xl">🎮</span>
                                    {game.is_popular && (
                                        <div className="absolute top-2 right-2">
                                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                🔥 Popular
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Game Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{game.name}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{game.publisher}</p>
                                    
                                    {/* Price Info */}
                                    {game.packages.length > 0 && (
                                        <div className="flex justify-between items-center">
                                            <p className="text-purple-400 font-medium">
                                                From IDR {game.packages[0].price.toLocaleString()}
                                            </p>
                                            <span className="text-xs text-gray-500">
                                                {game.packages.length} packages
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {games.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎮</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No games found</h3>
                        <p className="text-gray-400">Try adjusting your filters or check back later.</p>
                    </div>
                )}

                {/* Pagination */}
                {games.last_page > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-8">
                        <div className="flex space-x-2">
                            {Array.from({ length: games.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`px-3 py-2 rounded-lg font-medium transition-all ${
                                        page === games.current_page
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                            : 'backdrop-blur-lg bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Info Card */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-4">
                        <div className="text-4xl">💎</div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">Why Choose GameStore?</h3>
                            <p className="text-gray-300 text-sm">
                                ⚡ Instant delivery • 🔒 Secure payments • 💰 Best prices • 🎯 24/7 support
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}