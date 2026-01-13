'use client';

import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useState } from 'react';

export function Transfer() {
    const { signAndSendTransaction, isConnected, wallet } = useWallet();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('0.01');
    const [loading, setLoading] = useState(false);
    const [signature, setSignature] = useState('');

    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isConnected || !wallet) {
            alert('Please connect your wallet first');
            return;
        }

        try {
            setLoading(true);
            setSignature('');

            console.log('Initiating transfer...');

            const sig = await signAndSendTransaction({
                instructions: [
                    SystemProgram.transfer({
                        fromPubkey: new PublicKey(wallet.smartWallet),
                        toPubkey: new PublicKey(recipient),
                        lamports: Number(amount) * LAMPORTS_PER_SOL,
                    })
                ],
                transactionOptions: {
                    // This enables gas payment in USDC (or other tokens supported by the Paymaster)
                    // If omitted, ensure your Paymaster policy allows free implementation.
                    feeToken: 'USDC'
                }
            });

            console.log("Transaction confirmed:", sig);
            setSignature(sig);
        } catch (error: any) {
            console.error('Transfer failed:', error);
            alert('Transfer failed: ' + (error.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    if (!isConnected) return null;

    return (
        <div className="w-full max-w-md p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Gasless Transfer
            </h2>

            <form onSubmit={handleTransfer} className="space-y-4">
                <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Recipient Address</label>
                    <input
                        type="text"
                        placeholder="Solana Address"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-sm transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Amount (SOL)</label>
                    <div className="relative">
                        <input
                            type="number"
                            step="0.000000001"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-sm transition-colors"
                            required
                        />
                        <span className="absolute right-4 top-2 text-xs text-gray-500">SOL</span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white shadow-lg transition-all hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                    {loading ? 'Processing...' : 'Send with Gasless'}
                </button>
            </form>

            {signature && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-xs text-green-400 font-medium mb-1">Success!</p>
                    <a
                        href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-300 hover:underline break-all"
                    >
                        View on Explorer ↗
                    </a>
                </div>
            )}
        </div>
    );
}
