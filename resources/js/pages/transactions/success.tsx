import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Transaction {
    id: number;
    transaction_id: string;
    type: string;
    item_name: string;
    amount: number;
    status: string;
    payment_method: string;
    paid_at: string;
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

export default function TransactionSuccess({ transaction }: Props) {
    const [showAnimation, setShowAnimation] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        // Trigger animation after component mounts
        const timer1 = setTimeout(() => setShowAnimation(true), 500);
        const timer2 = setTimeout(() => setShowDetails(true), 1500);
        
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <AppShell>
            <div className="space-y-8 max-w-4xl mx-auto">
                {/* Success Animation */}
                <div className="text-center py-12">
                    <div className="relative inline-block">
                        {/* Animated Circle Background */}
                        <div
                            className={`w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl transition-all duration-1000 ${
                                showAnimation 
                                    ? 'scale-100 opacity-100' 
                                    : 'scale-50 opacity-0'
                            }`}
                        >
                            {/* Checkmark Animation */}
                            <div
                                className={`transition-all duration-700 delay-500 ${
                                    showAnimation 
                                        ? 'scale-100 opacity-100 rotate-0' 
                                        : 'scale-50 opacity-0 rotate-45'
                                }`}
                            >
                                <svg
                                    className="w-16 h-16 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                        className={`transition-all duration-700 delay-700 ${
                                            showAnimation ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        style={{
                                            strokeDasharray: showAnimation ? 'none' : '24',
                                            strokeDashoffset: showAnimation ? '0' : '24',
                                        }}
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Ripple Effect */}
                        <div
                            className={`absolute inset-0 rounded-full border-4 border-green-400 transition-all duration-1000 ${
                                showAnimation 
                                    ? 'scale-150 opacity-0' 
                                    : 'scale-100 opacity-70'
                            }`}
                        />
                    </div>

                    {/* Success Message */}
                    <div
                        className={`mt-8 transition-all duration-700 delay-1000 ${
                            showAnimation 
                                ? 'translate-y-0 opacity-100' 
                                : 'translate-y-4 opacity-0'
                        }`}
                    >
                        <h1 className="text-4xl font-bold text-white mb-4">🎉 Payment Successful!</h1>
                        <p className="text-xl text-gray-300 mb-6">
                            Your {transaction.type === 'game_topup' ? 'top-up' : 'voucher'} has been processed successfully
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link
                                href="/"
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                🏠 Back to Home
                            </Link>
                            <Link
                                href="/transactions"
                                className="px-6 py-3 backdrop-blur-lg bg-white/10 text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
                            >
                                📊 View History
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Transaction Details */}
                <div
                    className={`transition-all duration-700 delay-1200 ${
                        showDetails 
                            ? 'translate-y-0 opacity-100' 
                            : 'translate-y-8 opacity-0'
                    }`}
                >
                    <div className="backdrop-blur-xl bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-8 border border-green-400/20">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">📋 Transaction Details</h2>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Order ID:</span>
                                    <span className="text-white font-mono bg-white/10 px-3 py-1 rounded-lg">
                                        {transaction.transaction_id}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Item:</span>
                                    <span className="text-white font-semibold">{transaction.item_name}</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Status:</span>
                                    <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-lg font-semibold">
                                        ✅ Success
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Payment Method:</span>
                                    <span className="text-white capitalize">
                                        {transaction.payment_method.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                {transaction.game_details && (
                                    <>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">User ID:</span>
                                            <span className="text-white font-mono">{transaction.game_details.user_id}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">Server:</span>
                                            <span className="text-white">{transaction.game_details.server}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">Amount:</span>
                                            <span className="text-purple-400 font-semibold">
                                                {transaction.game_details.amount.toLocaleString()} {transaction.game_details.unit}
                                            </span>
                                        </div>
                                    </>
                                )}
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Completed At:</span>
                                    <span className="text-white">
                                        {new Date(transaction.paid_at).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                    <span className="text-gray-300 text-lg font-semibold">Total Paid:</span>
                                    <span className="text-green-400 text-2xl font-bold">
                                        IDR {transaction.amount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Game Specific Success Message */}
                {transaction.type === 'game_topup' && transaction.game_details && (
                    <div
                        className={`transition-all duration-700 delay-1400 ${
                            showDetails 
                                ? 'translate-y-0 opacity-100' 
                                : 'translate-y-8 opacity-0'
                        }`}
                    >
                        <div className="backdrop-blur-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🎮</div>
                                <h3 className="text-xl font-bold text-white mb-2">Top-Up Delivered!</h3>
                                <p className="text-gray-300 mb-4">
                                    {transaction.game_details.amount.toLocaleString()} {transaction.game_details.unit} has been 
                                    added to your {transaction.transactionable.name} account
                                </p>
                                <div className="backdrop-blur-lg bg-white/10 rounded-xl p-4 border border-white/20">
                                    <p className="text-white">
                                        <span className="text-gray-400">User ID:</span> {transaction.game_details.user_id}
                                    </p>
                                    <p className="text-white">
                                        <span className="text-gray-400">Server:</span> {transaction.game_details.server}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Next Steps */}
                <div
                    className={`transition-all duration-700 delay-1600 ${
                        showDetails 
                            ? 'translate-y-0 opacity-100' 
                            : 'translate-y-8 opacity-0'
                    }`}
                >
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4">🚀 What's Next?</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10">
                                <div className="text-2xl mb-2">🎮</div>
                                <p className="text-white font-medium mb-1">Start Gaming</p>
                                <p className="text-gray-400 text-sm">Your credits are ready to use</p>
                            </div>
                            <div className="text-center p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10">
                                <div className="text-2xl mb-2">📊</div>
                                <p className="text-white font-medium mb-1">Track Orders</p>
                                <p className="text-gray-400 text-sm">View all your transactions</p>
                            </div>
                            <div className="text-center p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10">
                                <div className="text-2xl mb-2">💎</div>
                                <p className="text-white font-medium mb-1">More Top-Ups</p>
                                <p className="text-gray-400 text-sm">Explore other games</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Support */}
                <div
                    className={`transition-all duration-700 delay-1800 ${
                        showDetails 
                            ? 'translate-y-0 opacity-100' 
                            : 'translate-y-8 opacity-0'
                    }`}
                >
                    <div className="backdrop-blur-xl bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-2xl p-6 border border-white/10">
                        <div className="text-center">
                            <div className="text-3xl mb-3">🛟</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                            <p className="text-gray-300 text-sm mb-4">
                                If you have any issues with your order, our support team is here to help 24/7
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
                                    💬 Live Chat
                                </button>
                                <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
                                    📧 Email Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}