import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Voucher {
    id: number;
    name: string;
    platform: string;
    price: number;
    description?: string;
    image?: string;
    stock: number;
}

interface Props {
    vouchers: {
        data: Voucher[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    platforms: string[];
    [key: string]: unknown;
}

export default function VouchersIndex({ vouchers, platforms }: Props) {
    const getPlatformIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'steam':
                return '🎮';
            case 'google play':
                return '📱';
            case 'playstation':
                return '🎯';
            case 'itunes':
                return '🍎';
            default:
                return '🎫';
        }
    };

    const getPlatformColor = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'steam':
                return 'from-blue-600/20 to-cyan-600/20';
            case 'google play':
                return 'from-green-600/20 to-teal-600/20';
            case 'playstation':
                return 'from-purple-600/20 to-blue-600/20';
            case 'itunes':
                return 'from-pink-600/20 to-purple-600/20';
            default:
                return 'from-gray-600/20 to-slate-600/20';
        }
    };

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">🎫 Digital Vouchers</h1>
                        <p className="text-gray-400 mt-1">Get instant digital vouchers for your favorite platforms</p>
                    </div>
                </div>

                {/* Platform Filter */}
                <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-medium">
                        All Platforms
                    </button>
                    {platforms.map((platform) => (
                        <button
                            key={platform}
                            className="px-4 py-2 backdrop-blur-lg bg-white/10 text-white rounded-xl font-medium border border-white/20 hover:bg-white/20 transition-all"
                        >
                            {getPlatformIcon(platform)} {platform}
                        </button>
                    ))}
                </div>

                {/* Vouchers Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {vouchers.data.map((voucher) => (
                        <Link key={voucher.id} href={`/vouchers/${voucher.id}`}>
                            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
                                {/* Voucher Image Placeholder */}
                                <div className={`w-full h-32 bg-gradient-to-r ${getPlatformColor(voucher.platform)} rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform relative overflow-hidden`}>
                                    <span className="text-4xl">{getPlatformIcon(voucher.platform)}</span>
                                    
                                    {/* Stock indicator */}
                                    <div className="absolute top-2 right-2">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                            voucher.stock > 10 
                                                ? 'bg-green-500/80 text-white' 
                                                : voucher.stock > 0 
                                                ? 'bg-yellow-500/80 text-white' 
                                                : 'bg-red-500/80 text-white'
                                        }`}>
                                            {voucher.stock > 10 ? '✅ In Stock' : voucher.stock > 0 ? '⚠️ Low Stock' : '❌ Out of Stock'}
                                        </span>
                                    </div>
                                </div>

                                {/* Voucher Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{voucher.name}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{voucher.platform}</p>
                                    
                                    {/* Price and Buy Button */}
                                    <div className="flex justify-between items-center">
                                        <p className="text-green-400 font-bold text-lg">
                                            IDR {voucher.price.toLocaleString()}
                                        </p>
                                        <button
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                                                voucher.stock > 0
                                                    ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:shadow-lg'
                                                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                            }`}
                                            disabled={voucher.stock === 0}
                                        >
                                            {voucher.stock > 0 ? 'Buy Now' : 'Sold Out'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {vouchers.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎫</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No vouchers found</h3>
                        <p className="text-gray-400">Try adjusting your filters or check back later.</p>
                    </div>
                )}

                {/* Pagination */}
                {vouchers.last_page > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-8">
                        <div className="flex space-x-2">
                            {Array.from({ length: vouchers.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`px-3 py-2 rounded-lg font-medium transition-all ${
                                        page === vouchers.current_page
                                            ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                                            : 'backdrop-blur-lg bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Platform Benefits */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="backdrop-blur-xl bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl p-4 border border-white/10">
                        <div className="text-center">
                            <div className="text-3xl mb-2">🎮</div>
                            <h4 className="text-white font-semibold mb-1">Steam</h4>
                            <p className="text-gray-300 text-sm">Access thousands of PC games</p>
                        </div>
                    </div>
                    <div className="backdrop-blur-xl bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl p-4 border border-white/10">
                        <div className="text-center">
                            <div className="text-3xl mb-2">📱</div>
                            <h4 className="text-white font-semibold mb-1">Google Play</h4>
                            <p className="text-gray-300 text-sm">Apps, games & premium content</p>
                        </div>
                    </div>
                    <div className="backdrop-blur-xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-4 border border-white/10">
                        <div className="text-center">
                            <div className="text-3xl mb-2">🎯</div>
                            <h4 className="text-white font-semibold mb-1">PlayStation</h4>
                            <p className="text-gray-300 text-sm">PS4 & PS5 games and content</p>
                        </div>
                    </div>
                    <div className="backdrop-blur-xl bg-gradient-to-r from-pink-900/30 to-purple-900/30 rounded-2xl p-4 border border-white/10">
                        <div className="text-center">
                            <div className="text-3xl mb-2">🍎</div>
                            <h4 className="text-white font-semibold mb-1">iTunes</h4>
                            <p className="text-gray-300 text-sm">Music, movies & iOS apps</p>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center space-x-4">
                        <div className="text-4xl">🎁</div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">Digital Voucher Benefits</h3>
                            <p className="text-gray-300 text-sm">
                                ⚡ Instant delivery • 🔒 Secure codes • 💳 Multiple payment methods • 🎯 Best prices guaranteed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}