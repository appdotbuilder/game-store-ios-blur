import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Props {
    categories: Array<{
        id: number;
        name: string;
        icon: string;
        description: string;
    }>;
    popularGames: Array<{
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
    }>;
    featuredVouchers: Array<{
        id: number;
        name: string;
        platform: string;
        price: number;
        image?: string;
    }>;
    [key: string]: unknown;
}

export default function Home({ categories, popularGames, featuredVouchers }: Props) {
    return (
        <AppShell>
            <div className="space-y-12">
                {/* Hero Banner */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-3xl p-8 border border-white/10">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            🎮 Welcome to GameStore
                        </h1>
                        <p className="text-xl text-gray-300 mb-6">
                            Top up your favorite games instantly with the best prices!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/games"
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                            >
                                Browse Games
                            </Link>
                            <Link
                                href="/vouchers"
                                className="px-6 py-3 backdrop-blur-lg bg-white/10 text-white rounded-xl font-medium border border-white/20 hover:bg-white/20 transition-all"
                            >
                                View Vouchers
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Categories</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <div key={category.id} className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                                <div className="text-center">
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                                    <p className="text-gray-400 text-sm">{category.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular Games */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">🔥 Popular Games</h2>
                        <Link href="/games" className="text-purple-400 hover:text-purple-300 font-medium">
                            View All →
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularGames.map((game) => (
                            <Link key={game.id} href={`/games/${game.id}`}>
                                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
                                    <div className="w-full h-24 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <span className="text-3xl">🎮</span>
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">{game.name}</h3>
                                    <p className="text-gray-400 text-sm mb-2">{game.publisher}</p>
                                    {game.packages.length > 0 && (
                                        <p className="text-purple-400 text-sm font-medium">
                                            From IDR {game.packages[0].price.toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Featured Vouchers */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">🎫 Featured Vouchers</h2>
                        <Link href="/vouchers" className="text-green-400 hover:text-green-300 font-medium">
                            View All →
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredVouchers.map((voucher) => (
                            <Link key={voucher.id} href={`/vouchers/${voucher.id}`}>
                                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
                                    <div className="w-full h-20 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-xl mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <span className="text-2xl">🎫</span>
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">{voucher.name}</h3>
                                    <p className="text-gray-400 text-sm mb-2">{voucher.platform}</p>
                                    <p className="text-green-400 font-medium">
                                        IDR {voucher.price.toLocaleString()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Promotional Banner */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-6 border border-white/10">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">🎉 Special Promo!</h3>
                        <p className="text-gray-300 mb-4">
                            Get extra bonus for every top-up above IDR 100,000
                        </p>
                        <span className="inline-block px-4 py-2 bg-orange-600 text-white rounded-lg font-medium">
                            Limited Time Offer
                        </span>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}