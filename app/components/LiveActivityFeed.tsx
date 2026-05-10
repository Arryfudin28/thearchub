"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Transaction {
  hash: string;
  message: string;
  timestamp: Date;
}

export default function LiveActivityFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return Array.from({ length: 10 }, () => ({
      hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      message: ["GM ☀️", "Good morning ARC!", "Building on testnet", "Hello Web3"][Math.floor(Math.random() * 4)],
      timestamp: new Date(Date.now() - Math.random() * 3600000), // last hour
    }));
  });

  useEffect(() => {
    // Add new transactions periodically
    const interval = setInterval(() => {
      const newTxn: Transaction = {
        hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
        message: ["GM ☀️", "Good morning ARC!", "Building on testnet", "Hello Web3"][Math.floor(Math.random() * 4)],
        timestamp: new Date(),
      };
      setTransactions(prev => [newTxn, ...prev.slice(0, 9)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_16px_60px_-30px_rgba(59,130,246,0.45)] backdrop-blur-md"
    >
      {/* Scanning light effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 animate-pulse" />

      <div className="relative z-10">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Live Activity</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Recent Transactions</h2>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((txn, index) => (
            <motion.div
              key={`${txn.hash}-${txn.timestamp.getTime()}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-between rounded-lg bg-slate-900/50 p-3 font-mono text-sm"
            >
              <div className="flex-1">
                <div className="text-cyan-400 truncate">{txn.hash}</div>
                <div className="text-slate-300">{txn.message}</div>
              </div>
              <div className="text-xs text-slate-500 ml-4">
                {txn.timestamp.toLocaleTimeString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}