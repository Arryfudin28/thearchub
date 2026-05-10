'use client';

import { motion } from 'framer-motion';

interface Token {
  name: string;
  symbol: string;
  balance: string;
}

export default function TokenAssetCard({ token }: { token: Token }) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4 hover:border-cyan-400/50 transition-colors"
      whileHover={{ borderColor: 'rgba(34, 211, 238, 0.5)' }}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-white">{token.name}</div>
          <div className="text-sm text-gray-400">{token.symbol}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-cyan-400">{token.balance}</div>
        </div>
      </div>
    </motion.div>
  );
}