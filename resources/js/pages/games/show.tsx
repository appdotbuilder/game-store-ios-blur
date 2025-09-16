import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { usePage } from '@inertiajs/react';

interface GamePackage {
    id: number;
    name: string;
    amount: number;
    unit: string;
    price: number;
}

interface Game {
    id: number;
    name: string;
    publisher: string;
    description: string;
    image?: string;
    server_options?: string[];
    packages: GamePackage[];
    category: {
        id: number;
        name: string;
        icon: string;
    };
}

interface Props {
    game: Game;
    [key: string]: unknown;
}

export default function GameShow({ game }: Props) {
    const { auth } = usePage<{ auth: { user: { id: number; name: string; email: string } | null } }>().props;
    const [selectedPackage, setSelectedPackage] = useState<GamePackage | null>(null);

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm">
                    <Link href="/games" className="text-gray-400 hover:text-white transition-colors">
                        Games
                    </Link>
                    <span className="text-gray-500">/</span>
                    <span className="text-white">{game.name}</span>
                </nav>

                {/* Game Header */}
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Game Image */}
                        <div className="w-full h-64 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl flex items-center justify-center">
                            <span className="text-8xl">🎮</span>
                        </div>

                        {/* Game Info */}
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="text-2xl">{game.category.icon}</span>
                                    <span className="text-purple-400 font-medium">{game.category.name}</span>
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-2">{game.name}</h1>
                                <p className="text-gray-400">{game.publisher}</p>
                            </div>
                            
                            <p className="text-gray-300">{game.description}</p>

                            {/* Server Options */}
                            {game.server_options && game.server_options.length > 0 && (
                                <div>
                                    <h3 className="text-white font-medium mb-2">Available Servers:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {game.server_options.map((server) => (
                                            <span
                                                key={server}
                                                className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-sm border border-white/20"
                                            >
                                                {server}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                                    <div className="text-2xl text-green-400 font-bold">{game.packages.length}</div>
                                    <div className="text-gray-400 text-sm">Packages</div>
                                </div>
                                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                                    <div className="text-2xl text-blue-400 font-bold">⚡</div>
                                    <div className="text-gray-400 text-sm">Instant</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Packages */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">💎 Available Packages</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {game.packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className={`backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all ${
                                    selectedPackage?.id === pkg.id
                                        ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-400'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                                onClick={() => setSelectedPackage(pkg)}
                            >
                                <div className="text-center">
                                    <div className="text-3xl mb-3">💎</div>
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {pkg.amount.toLocaleString()} {pkg.unit}
                                    </h3>
                                    <p className="text-2xl font-bold text-purple-400 mb-2">
                                        IDR {pkg.price.toLocaleString()}
                                    </p>
                                    <p className="text-gray-400 text-sm">{pkg.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Up Form Preview */}
                {selectedPackage && (
                    <div className="backdrop-blur-xl bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Selected Package</h3>
                            <button
                                onClick={() => setSelectedPackage(null)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-semibold">{selectedPackage.name}</p>
                                <p className="text-gray-400">{game.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-green-400">
                                    IDR {selectedPackage.price.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            {auth.user ? (
                                <Link
                                    href={`/games/${game.id}/topup/${selectedPackage.id}`}
                                    className="w-full block text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    🚀 Top Up Now
                                </Link>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-center text-gray-400 text-sm">Please login to continue</p>
                                    <div className="flex space-x-3">
                                        <Link
                                            href="/login"
                                            className="flex-1 text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="flex-1 text-center px-4 py-3 backdrop-blur-lg bg-white/10 text-white rounded-xl font-semibold border border-white/20"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Instructions */}
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">📋 How to Top Up</h3>
                    <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            <p className="text-gray-300">Choose your desired package from the options above</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            <p className="text-gray-300">Enter your {game.name} User ID and select your server</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            <p className="text-gray-300">Choose your preferred payment method and complete the transaction</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                            <p className="text-gray-300">Your {game.packages[0]?.unit || 'credits'} will be delivered instantly after successful payment</p>
                        </div>
                    </div>
                </div>

                {/* Support Info */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-4">
                        <div className="text-4xl">🛟</div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">Need Help?</h3>
                            <p className="text-gray-300 text-sm">
                                Our support team is available 24/7 to help you with any issues. 
                                Contact us if you encounter any problems with your top-up.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}