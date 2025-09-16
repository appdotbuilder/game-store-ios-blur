import React from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

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

export default function Welcome({ categories, popularGames, featuredVouchers }: Props) {
    const { auth } = usePage<{ auth: { user: { id: number; name: string; email: string } | null } }>().props;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/20 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">🎮</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">GameStore</h1>
                                <p className="text-xs text-gray-300">Premium Gaming Hub</p>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="/games" className="text-gray-300 hover:text-white transition-colors">Games</Link>
                            <Link href="/vouchers" className="text-gray-300 hover:text-white transition-colors">Vouchers</Link>
                            {auth.user ? (
                                <div className="flex items-center space-x-4">
                                    <Link href="/transactions" className="text-gray-300 hover:text-white transition-colors">History</Link>
                                    <Link href="/dashboard" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                                        Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                                    <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 border border-white/10 shadow-2xl">
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            🎮 GameStore
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Your ultimate destination for game top-ups and digital vouchers. 
                            Fast, secure, and reliable transactions with instant delivery.
                        </p>
                        
                        {/* Key Features */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10">
                                <div className="text-3xl mb-3">⚡</div>
                                <h3 className="text-lg font-semibold text-white mb-2">Instant Delivery</h3>
                                <p className="text-gray-400 text-sm">Get your game credits and vouchers delivered instantly after payment</p>
                            </div>
                            <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10">
                                <div className="text-3xl mb-3">🔒</div>
                                <h3 className="text-lg font-semibold text-white mb-2">Secure Payments</h3>
                                <p className="text-gray-400 text-sm">Multiple payment methods with bank-level security protection</p>
                            </div>
                            <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10">
                                <div className="text-3xl mb-3">🎯</div>
                                <h3 className="text-lg font-semibold text-white mb-2">Best Prices</h3>
                                <p className="text-gray-400 text-sm">Competitive prices with frequent promotions and discounts</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/games"
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
                            >
                                🎮 Browse Games
                            </Link>
                            <Link
                                href="/vouchers"
                                className="px-8 py-4 backdrop-blur-lg bg-white/10 text-white rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
                            >
                                🎫 View Vouchers
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Categories</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <div key={category.id} className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                                <div className="text-center">
                                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                                    <p className="text-gray-400">{category.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Games Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">🔥 Popular Games</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularGames.slice(0, 4).map((game) => (
                            <Link key={game.id} href={`/games/${game.id}`}>
                                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
                                    <div className="w-full h-32 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <span className="text-4xl">🎮</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{game.name}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{game.publisher}</p>
                                    {game.packages.length > 0 && (
                                        <p className="text-purple-400 font-medium">
                                            From IDR {game.packages[0].price.toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            href="/games"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                        >
                            View All Games →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Vouchers Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">🎫 Featured Vouchers</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredVouchers.slice(0, 6).map((voucher) => (
                            <Link key={voucher.id} href={`/vouchers/${voucher.id}`}>
                                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
                                    <div className="w-full h-24 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-2xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <span className="text-3xl">🎫</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{voucher.name}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{voucher.platform}</p>
                                    <p className="text-green-400 font-medium">
                                        IDR {voucher.price.toLocaleString()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            href="/vouchers"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                        >
                            View All Vouchers →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="backdrop-blur-xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-3xl p-12 border border-white/10">
                        <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Gaming? 🚀</h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Join thousands of gamers who trust GameStore for their top-up needs. 
                            Fast, secure, and always available.
                        </p>
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/register"
                                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all"
                                >
                                    🎮 Create Account
                                </Link>
                                <Link
                                    href="/login"
                                    className="px-8 py-4 backdrop-blur-lg bg-white/10 text-white rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold">🎮</span>
                            </div>
                            <span className="text-xl font-bold text-white">GameStore</span>
                        </div>
                        <p className="text-gray-400 mb-4">Your trusted gaming partner since 2024</p>
                        <div className="flex justify-center space-x-6">
                            <span className="text-gray-500">24/7 Support</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-500">Instant Delivery</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-500">Secure Payments</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}