import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Voucher {
    id: number;
    name: string;
    platform: string;
    price: number;
    description?: string;
    stock: number;
}

interface Props {
    voucher: Voucher;
    [key: string]: unknown;
}

export default function CreateVoucherTransaction({ voucher }: Props) {
    const [formData, setFormData] = useState({
        payment_method: 'bank_transfer',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post(
            `/vouchers/${voucher.id}/buy`,
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

    return (
        <AppShell>
            <div className="space-y-8 max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm">
                    <Link href="/vouchers" className="text-gray-400 hover:text-white transition-colors">
                        Vouchers
                    </Link>
                    <span className="text-gray-500">/</span>
                    <Link href={`/vouchers/${voucher.id}`} className="text-gray-400 hover:text-white transition-colors">
                        {voucher.name}
                    </Link>
                    <span className="text-gray-500">/</span>
                    <span className="text-white">Purchase</span>
                </nav>

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">🛒 Complete Your Purchase</h1>
                    <p className="text-gray-400">Choose your payment method to buy the voucher</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Payment Form */}
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                        <h2 className="text-xl font-semibold text-white mb-6">💳 Payment Details</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                                    ? 'bg-gradient-to-r from-green-600/20 to-teal-600/20 border-green-400'
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
                                                <div className="text-green-400">✓</div>
                                            )}
                                        </label>
                                    ))}
                                </div>
                                {errors.payment_method && (
                                    <p className="mt-1 text-sm text-red-400">{errors.payment_method}</p>
                                )}
                            </div>

                            {/* Terms */}
                            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-white/10">
                                <div className="flex items-start space-x-3">
                                    <span className="text-yellow-400 mt-1">⚠️</span>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Important Notes</h4>
                                        <ul className="text-gray-300 text-sm space-y-1">
                                            <li>• Voucher codes are delivered instantly after payment</li>
                                            <li>• Codes are non-refundable once delivered</li>
                                            <li>• Valid only for {voucher.platform} platform</li>
                                            <li>• Keep your code safe and secure</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing || voucher.stock === 0}
                                className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Processing...</span>
                                    </span>
                                ) : voucher.stock === 0 ? (
                                    '❌ Out of Stock'
                                ) : (
                                    '💳 Proceed to Payment'
                                )}
                            </button>

                            {errors.error && (
                                <p className="text-red-400 text-sm text-center">{errors.error}</p>
                            )}
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        {/* Voucher Info */}
                        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">🎫 Order Summary</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-xl flex items-center justify-center">
                                        <span className="text-xl">{getPlatformIcon(voucher.platform)}</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{voucher.name}</p>
                                        <p className="text-gray-400 text-sm">{voucher.platform}</p>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-300">Voucher:</span>
                                        <span className="text-white font-medium">{voucher.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-300">Platform:</span>
                                        <span className="text-green-400 font-medium">{voucher.platform}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-300">Stock:</span>
                                        <span className={`font-medium ${voucher.stock > 10 ? 'text-green-400' : voucher.stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                                            {voucher.stock > 0 ? `${voucher.stock} available` : 'Out of stock'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Price:</span>
                                        <span className="text-green-400 text-xl font-bold">
                                            IDR {voucher.price.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-xl p-4 border border-white/10">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-400">✅</span>
                                        <span className="text-white text-sm">Instant code delivery</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Info */}
                        <div className="backdrop-blur-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-white/10">
                            <h4 className="text-white font-semibold mb-3">🔒 Secure Purchase</h4>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-green-400">✓</span>
                                    <span className="text-gray-300">SSL encrypted payment</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-green-400">✓</span>
                                    <span className="text-gray-300">Instant code delivery</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-green-400">✓</span>
                                    <span className="text-gray-300">24/7 customer support</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-green-400">✓</span>
                                    <span className="text-gray-300">Valid codes guaranteed</span>
                                </div>
                            </div>
                        </div>

                        {/* Platform Info */}
                        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h4 className="text-white font-semibold mb-3">💡 How to Redeem</h4>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>1. Complete your payment</p>
                                <p>2. Receive your unique voucher code</p>
                                <p>3. Go to {voucher.platform} and sign in</p>
                                <p>4. Enter the code in "Redeem" section</p>
                                <p>5. Enjoy your credit!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}