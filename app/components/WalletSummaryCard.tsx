'use client';

import { motion } from 'framer-motion';

export default function WalletSummaryCard() {
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
        <div className="text-4xl font-bold text-white">$12,345.67</div>
        <div className="text-sm text-gray-400">Total Balance</div>
      </motion.div>
    </div>
  );
}