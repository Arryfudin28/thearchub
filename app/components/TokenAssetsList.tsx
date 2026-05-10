'use client';

import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { getTokenBalances } from '@/lib/rpc';
import TokenAssetCard from './TokenAssetCard';

interface Token {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  balance: string;
}

export default function TokenAssetsList() {
  const { address, isConnected } = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!address) return;
      setLoading(true);
      try {
        const tokenList = await getTokenBalances(address as `0x${string}`);
        setTokens(tokenList);
      } catch (error) {
        console.error('Error fetching token balances:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [address]);

  if (!isConnected) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold text-purple-400 mb-4">Token Assets</h3>
        <div className="bg-white/5 backdrop-blur-lg border border-purple-400/30 rounded-lg p-6 text-center">
          <p className="text-slate-300">Connect your wallet to view your token assets</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-purple-400 mb-4">Token Assets</h3>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-16 rounded-lg bg-white/5 border border-white/10"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {tokens.length > 0 ? (
            tokens.map((token, index) => (
              <motion.div
                key={token.symbol}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TokenAssetCard token={token} />
              </motion.div>
            ))
          ) : (
            <div className="text-center text-slate-400 py-8">No tokens found</div>
          )}
        </div>
      )}
    </div>
  );
}