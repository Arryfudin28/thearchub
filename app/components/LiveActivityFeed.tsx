"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLatestTransactions } from "@/lib/rpc";
import { CardSkeleton } from "./LoadingSkeleton";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
}

export default function LiveActivityFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const txs = await getLatestTransactions(10);
        setTransactions(
          txs.map((tx) => ({
            hash: tx.hash,
            from: tx.from?.slice(0, 6) + "..." + tx.from?.slice(-4),
            to:
              typeof tx.to === "string"
                ? tx.to.slice(0, 6) + "..." + tx.to.slice(-4)
                : "Contract",
            value: parseFloat(tx.value).toFixed(4),
            timestamp: tx.timestamp,
          }))
        );
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 30000); // Update every 30 seconds
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
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-16 rounded-lg bg-white/5 border border-white/10"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              ))
            : transactions.map((txn, index) => (
                <motion.div
                  key={`${txn.hash}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between rounded-lg bg-slate-900/50 p-3 font-mono text-sm hover:bg-slate-800/50 transition"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-cyan-400 truncate">{txn.hash}</div>
                    <div className="text-slate-300 text-xs">
                      {txn.from} → {txn.to}
                    </div>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <div className="text-green-400 text-sm font-semibold">{txn.value}</div>
                    <div className="text-xs text-slate-500">USDC</div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </motion.section>
  );
}