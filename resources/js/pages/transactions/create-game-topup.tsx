import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

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
    package: GamePackage;
    [key: string]: unknown;
}

export default function CreateGameTopup({ game, package: selectedPackage }: Props) {
    const [formData, setFormData] = useState({
        user_id: '',
        server: game.server_options?.[0] || '',
        payment_method: 'bank_transfer',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post(
            `/games/${game.id}/topup/${selectedPackage.id}`,
            formData,
            {
                onSuccess: () => {
                    // Will redirect to payment page
                },
                onError: (errors) => {
                    setErrors(errors);
                    setProcessing(false);
                },
                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    const paymentMethods = [
        { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦', description: 'BCA, BNI, BRI, Mandiri' },
        { id: 'qris', name: 'QRIS', icon: '📱', description: 'Scan QR code to pay' },
        { id: 'ewallet', name: 'E-Wallet', icon: '💳', description: 'OVO, Dana, GoPay, ShopeePay' },
    ];

    return (
        <AppShell>
            <div className="space-y-8 max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm">
                    <Link href="/games" className="text-gray-400 hover:text-white transition-colors">
                        Games
                    </Link>
                    <span className="text-gray-500">/</span>
                    <Link href={`/games/${game.id}`} className="text-gray-400 hover:text-white transition-colors">
                        {game.name}
                    </Link>
                    <span className="text-gray-500">/</span>
                    <span className="text-white">Top Up</span>
                </nav>

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">🚀 Complete Your Top-Up</h1>
                    <p className="text-gray-400">Fill in the details below to proceed with your purchase</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                        <h2 className="text-xl font-semibold text-white mb-6">📝 Top-Up Details</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* User ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    {game.name} User ID *
                                </label>
                                <input
                                    type="text"
                                    value={formData.user_id}
                                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                                    className="w-full px-4 py-3 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Enter your User ID"
                                    required
                                />
                                {errors.user_id && (
                                    <p className="mt-1 text-sm text-red-400">{errors.user_id}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    Make sure your User ID is correct. We cannot refund wrong top-ups.
                                </p>
                            </div>

                            {/* Server Selection */}
                            {game.server_options && game.server_options.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Server *
                                    </label>
                                    <select
                                        value={formData.server}
                                        onChange={(e) => setFormData({ ...formData, server: e.target.value })}
                                        className="w-full px-4 py-3 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    >
                                        {game.server_options.map((server) => (
                                            <option key={server} value={server} className="bg-slate-800">
                                                {server}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.server && (
                                        <p className="mt-1 text-sm text-red-400">{errors.server}</p>
                                    )}
                                </div>
                            )}

                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Payment Method *
                                </label>
                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <label
                                            key={method.id}
                                            className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                                                formData.payment_method === method.id
                                                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-400'
                                                    : 'backdrop-blur-lg bg-white/5 border-white/20 hover:bg-white/10'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value={method.id}
                                                checked={formData.payment_method === method.id}
                                                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                                                className="sr-only"
                                            />
                                            <div className="flex items-center space-x-3 flex-1">
                                                <span className="text-2xl">{method.icon}</span>
                                                <div>
                                                    <div className="text-white font-medium">{method.name}</div>
                                                    <div className="text-gray-400 text-sm">{method.description}</div>
                                                </div>
                                            </div>
                                            {formData.payment_method === method.id && (
                                                <div className="text-purple-400">✓</div>
                                            )}
                                        </label>
                                    ))}
                                </div>
                                {errors.payment_method && (
                                    <p className="mt-1 text-sm text-red-400">{errors.payment_method}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Processing...</span>
                                    </span>
                                ) : (
                                    '💳 Proceed to Payment'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        {/* Game Info */}
                        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">🎮 Order Summary</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                                        <span className="text-xl">🎮</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{game.name}</p>
                                        <p className="text-gray-400 text-sm">{game.publisher}</p>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-300">Package:</span>
                                        <span className="text-white font-medium">{selectedPackage.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-300">Amount:</span>
                                        <span className="text-purple-400 font-medium">
                                            {selectedPackage.amount.toLocaleString()} {selectedPackage.unit}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Price:</span>
                                        <span className="text-green-400 text-xl font-bold">
                                            IDR {selectedPackage.price.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-4 border border-white/10">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-400">✅</span>
                                        <span className="text-white text-sm">Instant delivery after payment</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Info */}
                        <div className="backdrop-blur-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-white/10">
                            <h4 className="text-white font-semibold mb-3">🔒 Secure Transaction</h4>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-green-400">✓</span>
                                    <span className="text-gray-300">SSL encrypted payment</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-green-400">✓</span>
                                    <span className="text-gray-300">Instant automated delivery</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-green-400">✓</span>
                                    <span className="text-gray-300">24/7 customer support</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-green-400">✓</span>
                                    <span className="text-gray-300">Money back guarantee</span>
                                </div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h4 className="text-white font-semibold mb-3">💡 Tips</h4>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>• Double-check your User ID before submitting</p>
                                <p>• Make sure you select the correct server</p>
                                <p>• Keep your transaction ID for reference</p>
                                <p>• Contact support if you need help</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}