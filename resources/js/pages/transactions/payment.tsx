import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Transaction {
    id: number;
    transaction_id: string;
    type: string;
    item_name: string;
    amount: number;
    status: string;
    payment_method: string;
    game_details?: {
        user_id: string;
        server: string;
        package: string;
        amount: number;
        unit: string;
    };
    transactionable: {
        id: number;
        name: string;
        publisher?: string;
        platform?: string;
    };
}

interface Props {
    transaction: Transaction;
    [key: string]: unknown;
}

export default function TransactionPayment({ transaction }: Props) {
    const [processing, setProcessing] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleProcessPayment = () => {
        setProcessing(true);
        
        router.post(
            `/transactions/${transaction.id}/process`,
            {},
            {
                onSuccess: () => {
                    // Will redirect to success/failed page
                },
                onError: () => {
                    setProcessing(false);
                },
                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    const getPaymentMethodInfo = (method: string) => {
        switch (method) {
            case 'bank_transfer':
                return {
                    name: 'Bank Transfer',
                    icon: '🏦',
                    instructions: 'Transfer to the bank account below',
                    details: {
                        bank: 'Bank Central Asia (BCA)',
                        account: '1234567890',
                        name: 'GameStore Indonesia',
                    },
                };
            case 'qris':
                return {
                    name: 'QRIS',
                    icon: '📱',
                    instructions: 'Scan the QR code with your mobile banking app',
                    details: {
                        merchant: 'GameStore',
                        reference: transaction.transaction_id,
                    },
                };
            case 'ewallet':
                return {
                    name: 'E-Wallet',
                    icon: '💳',
                    instructions: 'Use your e-wallet app to complete payment',
                    details: {
                        merchant: 'GameStore',
                        reference: transaction.transaction_id,
                    },
                };
            default:
                return {
                    name: 'Payment',
                    icon: '💳',
                    instructions: 'Complete your payment',
                    details: {},
                };
        }
    };

    const paymentInfo = getPaymentMethodInfo(transaction.payment_method);

    return (
        <AppShell>
            <div className="space-y-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">💳 Complete Payment</h1>
                    <p className="text-gray-400">Complete your payment within the time limit</p>
                </div>

                {/* Timer */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center justify-center space-x-3">
                        <span className="text-2xl">⏰</span>
                        <div className="text-center">
                            <p className="text-white font-semibold">Payment expires in</p>
                            <p className="text-orange-400 text-2xl font-bold font-mono">{formatTime(timeLeft)}</p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Payment Instructions */}
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                            <span>{paymentInfo.icon}</span>
                            <span>{paymentInfo.name}</span>
                        </h2>

                        <div className="space-y-6">
                            <p className="text-gray-300">{paymentInfo.instructions}</p>

                            {/* Bank Transfer Details */}
                            {transaction.payment_method === 'bank_transfer' && (
                                <div className="space-y-4">
                                    <div className="backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-400 text-sm">Bank</p>
                                                <p className="text-white font-semibold">{paymentInfo.details.bank}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Account Number</p>
                                                <p className="text-white font-semibold font-mono">{paymentInfo.details.account}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-gray-400 text-sm">Account Name</p>
                                                <p className="text-white font-semibold">{paymentInfo.details.name}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-gray-400 text-sm">Transfer Amount</p>
                                                <p className="text-green-400 text-xl font-bold">
                                                    IDR {transaction.amount.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* QRIS Code */}
                            {transaction.payment_method === 'qris' && (
                                <div className="text-center">
                                    <div className="w-64 h-64 mx-auto bg-white rounded-2xl flex items-center justify-center mb-4">
                                        <div className="text-6xl">📱</div>
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        Scan this QR code with your mobile banking app
                                    </p>
                                </div>
                            )}

                            {/* E-Wallet */}
                            {transaction.payment_method === 'ewallet' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                            <div className="text-center">
                                                <div className="text-2xl mb-2">📱</div>
                                                <p className="text-white text-sm">OVO</p>
                                            </div>
                                        </button>
                                        <button className="p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                            <div className="text-center">
                                                <div className="text-2xl mb-2">💰</div>
                                                <p className="text-white text-sm">Dana</p>
                                            </div>
                                        </button>
                                        <button className="p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                            <div className="text-center">
                                                <div className="text-2xl mb-2">🟢</div>
                                                <p className="text-white text-sm">GoPay</p>
                                            </div>
                                        </button>
                                        <button className="p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                            <div className="text-center">
                                                <div className="text-2xl mb-2">🛒</div>
                                                <p className="text-white text-sm">ShopeePay</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Simulate Payment Button */}
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-gray-400 text-sm mb-4">
                                    For demo purposes, click the button below to simulate payment processing
                                </p>
                                <button
                                    onClick={handleProcessPayment}
                                    disabled={processing}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center space-x-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Processing Payment...</span>
                                        </span>
                                    ) : (
                                        '🚀 Simulate Payment'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-6">
                        {/* Transaction Info */}
                        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">📋 Transaction Details</h3>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Transaction ID:</span>
                                    <span className="text-white font-mono">{transaction.transaction_id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Item:</span>
                                    <span className="text-white">{transaction.item_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Status:</span>
                                    <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded-lg text-sm">
                                        Pending Payment
                                    </span>
                                </div>
                                
                                {/* Game Details */}
                                {transaction.game_details && (
                                    <>
                                        <div className="border-t border-white/10 pt-3">
                                            <h4 className="text-white font-medium mb-2">Game Details:</h4>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">User ID:</span>
                                            <span className="text-white font-mono">{transaction.game_details.user_id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Server:</span>
                                            <span className="text-white">{transaction.game_details.server}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Package:</span>
                                            <span className="text-purple-400">
                                                {transaction.game_details.amount.toLocaleString()} {transaction.game_details.unit}
                                            </span>
                                        </div>
                                    </>
                                )}
                                
                                <div className="border-t border-white/10 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 font-medium">Total Amount:</span>
                                        <span className="text-green-400 text-xl font-bold">
                                            IDR {transaction.amount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Help */}
                        <div className="backdrop-blur-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-white/10">
                            <h4 className="text-white font-semibold mb-3">❓ Need Help?</h4>
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-300">Having trouble with payment?</p>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
                                        💬 Live Chat
                                    </button>
                                    <button className="px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
                                        📧 Email Support
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="backdrop-blur-xl bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-2xl p-6 border border-white/10">
                            <h4 className="text-white font-semibold mb-3">🔒 Secure Payment</h4>
                            <div className="space-y-2 text-sm text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-400">✓</span>
                                    <span>256-bit SSL encryption</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Instant automated processing</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Money back guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}