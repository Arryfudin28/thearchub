'use client';

import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { getBalance } from '@/lib/rpc';
import { CardSkeleton } from './LoadingSkeleton';

export default function WalletSummaryCard() {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address) return;
      setLoading(true);
      try {
        const bal = await getBalance(address);
        setBalance(parseFloat(bal).toFixed(4));
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [address]);

  if (loading) {
    return (
      <div className="mb-8">
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="mb-8">
      <motion.div
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-2xl"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-cyan-400">Wallet Summary</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-purple-400">Network:</span>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-mono animate-pulse">
              ARC Testnet
            </span>
          </div>
        </div>
        {isConnected ? (
          <>
            <div className="text-4xl font-bold text-white font-mono">{balance} USDC</div>
            <div className="text-sm text-gray-400">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold text-slate-400">—</div>
            <div className="text-sm text-gray-500">Connect wallet to view balance</div>
          </>
        )}
      </motion.div>
    </div>
  );
}