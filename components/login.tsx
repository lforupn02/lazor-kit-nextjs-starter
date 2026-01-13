'use client';

import { useWallet } from '@lazorkit/wallet';
import { useState } from 'react';

export function Login() {
    const { connect, disconnect, isConnected, wallet } = useWallet();
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        try {
            setLoading(true);
            await connect();
        } catch (error) {
            console.error('Failed to connect:', error);
            alert('Failed to connect wallet. See console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.error('Failed to disconnect:', error);
        }
    };

    if (isConnected && wallet) {
        return (
            <div className="flex flex-col items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-200">Connected</span>
                </div>
                <div className="text-xs font-mono bg-black/50 px-3 py-2 rounded-lg text-gray-400 break-all max-w-[200px] sm:max-w-xs text-center">
                    {wallet.smartWallet}
                </div>
                <button
                    onClick={handleDisconnect}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleConnect}
            disabled={loading}
            className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white shadow-lg transition-all hover:shadow-blue-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Connecting...
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    Make it Lazor ⚡
                </span>
            )}
        </button>
    );
}
