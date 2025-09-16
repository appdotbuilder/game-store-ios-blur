import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { usePage } from '@inertiajs/react';

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
    voucher: Voucher;
    [key: string]: unknown;
}

export default function VoucherShow({ voucher }: Props) {
    const { auth } = usePage<{ auth: { user: { id: number; name: string; email: string } | null } }>().props;

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
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm">
                    <Link href="/vouchers" className="text-gray-400 hover:text-white transition-colors">
                        Vouchers
                    </Link>
                    <span className="text-gray-500">/</span>
                    <span className="text-white">{voucher.name}</span>
                </nav>

                {/* Voucher Header */}
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Voucher Image */}
                        <div className={`w-full h-64 bg-gradient-to-r ${getPlatformColor(voucher.platform)} rounded-2xl flex items-center justify-center`}>
                            <span className="text-8xl">{getPlatformIcon(voucher.platform)}</span>
                        </div>

                        {/* Voucher Info */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="text-2xl">{getPlatformIcon(voucher.platform)}</span>
                                    <span className="text-green-400 font-medium">{voucher.platform}</span>
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-2">{voucher.name}</h1>
                                <p className="text-gray-400">{voucher.description}</p>
                            </div>

                            {/* Price */}
                            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-white/10">
                                <div className="text-center">
                                    <p className="text-gray-400 text-sm mb-1">Price</p>
                                    <p className="text-3xl font-bold text-green-400">
                                        IDR {voucher.price.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center justify-center">
                                <span className={`px-4 py-2 rounded-lg font-medium ${
                                    voucher.stock > 10 
                                        ? 'bg-green-600/20 text-green-400' 
                                        : voucher.stock > 0 
                                        ? 'bg-yellow-600/20 text-yellow-400' 
                                        : 'bg-red-600/20 text-red-400'
                                }`}>
                                    {voucher.stock > 10 ? '✅ In Stock' : voucher.stock > 0 ? '⚠️ Limited Stock' : '❌ Out of Stock'}
                                </span>
                            </div>

                            {/* Buy Button */}
                            <div className="pt-4">
                                {auth.user && voucher.stock > 0 ? (
                                    <Link
                                        href={`/vouchers/${voucher.id}/buy`}
                                        className="w-full block text-center px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                    >
                                        🛒 Buy Now
                                    </Link>
                                ) : voucher.stock === 0 ? (
                                    <button
                                        disabled
                                        className="w-full px-6 py-4 bg-gray-600 text-gray-300 rounded-xl font-semibold cursor-not-allowed"
                                    >
                                        ❌ Out of Stock
                                    </button>
                                ) : (
                                    <div className="space-y-3">
                                        <p className="text-center text-gray-400 text-sm">Please login to continue</p>
                                        <div className="flex space-x-3">
                                            <Link
                                                href="/login"
                                                className="flex-1 text-center px-4 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold"
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
                    </div>
                </div>

                {/* Platform Benefits */}
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">✨ Platform Benefits</h3>
                    
                    {voucher.platform.toLowerCase() === 'steam' && (
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start space-x-3">
                                <span className="text-blue-400">🎮</span>
                                <div>
                                    <h4 className="text-white font-medium">Huge Game Library</h4>
                                    <p className="text-gray-400 text-sm">Access thousands of PC games</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-blue-400">💰</span>
                                <div>
                                    <h4 className="text-white font-medium">Great Sales</h4>
                                    <p className="text-gray-400 text-sm">Regular discounts and promotions</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {voucher.platform.toLowerCase() === 'google play' && (
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start space-x-3">
                                <span className="text-green-400">📱</span>
                                <div>
                                    <h4 className="text-white font-medium">Mobile Apps & Games</h4>
                                    <p className="text-gray-400 text-sm">Millions of Android apps</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-green-400">🎵</span>
                                <div>
                                    <h4 className="text-white font-medium">Premium Content</h4>
                                    <p className="text-gray-400 text-sm">Music, movies, and books</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* How to Use */}
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">📋 How to Use</h3>
                    <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            <p className="text-gray-300">Purchase the voucher and receive your unique code</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            <p className="text-gray-300">Open your {voucher.platform} account or app</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            <p className="text-gray-300">Go to "Redeem Code" or "Add Funds" section</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                            <p className="text-gray-300">Enter your code and enjoy your credit!</p>
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
                                Having trouble redeeming your voucher? Our support team is here to help 24/7.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}