import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Transaction {
    id: number;
    transaction_id: string;
    type: string;
    item_name: string;
    amount: number;
    status: 'pending' | 'success' | 'failed' | 'cancelled';
    payment_method: string;
    created_at: string;
    paid_at?: string;
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
    transactions: {
        data: Transaction[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        status?: string;
    };
    [key: string]: unknown;
}

export default function TransactionsIndex({ transactions, filters }: Props) {
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');

    const handleStatusFilter = (status: string) => {
        setSelectedStatus(status);
        const url = status === 'all' ? '/transactions' : `/transactions?status=${status}`;
        router.get(url, {}, { preserveState: true, preserveScroll: true });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success':
                return 'bg-green-600/20 text-green-400';
            case 'pending':
                return 'bg-yellow-600/20 text-yellow-400';
            case 'failed':
                return 'bg-red-600/20 text-red-400';
            case 'cancelled':
                return 'bg-gray-600/20 text-gray-400';
            default:
                return 'bg-gray-600/20 text-gray-400';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return '✅';
            case 'pending':
                return '⏳';
            case 'failed':
                return '❌';
            case 'cancelled':
                return '🚫';
            default:
                return '❓';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'game_topup':
                return '🎮';
            case 'voucher':
                return '🎫';
            default:
                return '💳';
        }
    };

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">📊 Transaction History</h1>
                        <p className="text-gray-400 mt-1">Track all your purchases and top-ups</p>
                    </div>
                </div>

                {/* Status Filter */}
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => handleStatusFilter('all')}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            selectedStatus === 'all'
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                : 'backdrop-blur-lg bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        }`}
                    >
                        All Status
                    </button>
                    <button
                        onClick={() => handleStatusFilter('success')}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            selectedStatus === 'success'
                                ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                                : 'backdrop-blur-lg bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        }`}
                    >
                        ✅ Success
                    </button>
                    <button
                        onClick={() => handleStatusFilter('pending')}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            selectedStatus === 'pending'
                                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white'
                                : 'backdrop-blur-lg bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        }`}
                    >
                        ⏳ Pending
                    </button>
                    <button
                        onClick={() => handleStatusFilter('failed')}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            selectedStatus === 'failed'
                                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
                                : 'backdrop-blur-lg bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        }`}
                    >
                        ❌ Failed
                    </button>
                </div>

                {/* Transactions List */}
                <div className="space-y-4">
                    {transactions.data.map((transaction) => (
                        <div key={transaction.id} className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/8 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                                {/* Left Side - Transaction Info */}
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                                        <span className="text-xl">{getTypeIcon(transaction.type)}</span>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-semibold mb-1">{transaction.item_name}</h3>
                                        <p className="text-gray-400 text-sm mb-2">{transaction.transactionable.name}</p>
                                        
                                        {/* Game Details */}
                                        {transaction.game_details && (
                                            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                                <span>ID: {transaction.game_details.user_id}</span>
                                                <span>Server: {transaction.game_details.server}</span>
                                                <span>
                                                    {transaction.game_details.amount.toLocaleString()} {transaction.game_details.unit}
                                                </span>
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center space-x-4 mt-2">
                                            <span className="text-xs text-gray-500 font-mono">
                                                {transaction.transaction_id}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(transaction.created_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Status and Amount */}
                                <div className="flex flex-col items-end space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(transaction.status)}`}>
                                            {getStatusIcon(transaction.status)} {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                        </span>
                                    </div>
                                    
                                    <div className="text-right">
                                        <p className="text-white font-bold text-lg">
                                            IDR {transaction.amount.toLocaleString()}
                                        </p>
                                        <p className="text-gray-400 text-sm capitalize">
                                            {transaction.payment_method.replace('_', ' ')}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        {transaction.status === 'pending' && (
                                            <Link
                                                href={`/transactions/${transaction.id}/payment`}
                                                className="px-3 py-1 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg text-sm hover:shadow-lg transition-all"
                                            >
                                                Complete Payment
                                            </Link>
                                        )}
                                        {transaction.status === 'success' && (
                                            <button className="px-3 py-1 bg-green-600/20 text-green-400 rounded-lg text-sm border border-green-400/20">
                                                Delivered
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {transactions.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No transactions found</h3>
                        <p className="text-gray-400 mb-6">
                            {selectedStatus !== 'all' 
                                ? `No ${selectedStatus} transactions found. Try changing the filter.`
                                : 'You haven\'t made any purchases yet. Start gaming now!'
                            }
                        </p>
                        {transactions.data.length === 0 && selectedStatus === 'all' && (
                            <div className="flex justify-center space-x-4">
                                <Link
                                    href="/games"
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    🎮 Browse Games
                                </Link>
                                <Link
                                    href="/vouchers"
                                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    🎫 Get Vouchers
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {transactions.last_page > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-8">
                        <div className="flex space-x-2">
                            {Array.from({ length: transactions.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`px-3 py-2 rounded-lg font-medium transition-all ${
                                        page === transactions.current_page
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

                {/* Summary Stats */}
                {transactions.data.length > 0 && (
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="backdrop-blur-xl bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl p-4 border border-white/10">
                            <div className="text-center">
                                <div className="text-2xl mb-2">✅</div>
                                <p className="text-green-400 font-bold text-lg">
                                    {transactions.data.filter(t => t.status === 'success').length}
                                </p>
                                <p className="text-gray-300 text-sm">Successful</p>
                            </div>
                        </div>
                        <div className="backdrop-blur-xl bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl p-4 border border-white/10">
                            <div className="text-center">
                                <div className="text-2xl mb-2">⏳</div>
                                <p className="text-yellow-400 font-bold text-lg">
                                    {transactions.data.filter(t => t.status === 'pending').length}
                                </p>
                                <p className="text-gray-300 text-sm">Pending</p>
                            </div>
                        </div>
                        <div className="backdrop-blur-xl bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-2xl p-4 border border-white/10">
                            <div className="text-center">
                                <div className="text-2xl mb-2">❌</div>
                                <p className="text-red-400 font-bold text-lg">
                                    {transactions.data.filter(t => t.status === 'failed').length}
                                </p>
                                <p className="text-gray-300 text-sm">Failed</p>
                            </div>
                        </div>
                        <div className="backdrop-blur-xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-4 border border-white/10">
                            <div className="text-center">
                                <div className="text-2xl mb-2">💰</div>
                                <p className="text-purple-400 font-bold text-lg">
                                    IDR {transactions.data.reduce((sum, t) => sum + (t.status === 'success' ? t.amount : 0), 0).toLocaleString()}
                                </p>
                                <p className="text-gray-300 text-sm">Total Spent</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}