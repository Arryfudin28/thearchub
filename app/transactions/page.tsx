"use client";

import { useState, useEffect } from "react";
import { getLatestTransactions } from "@/lib/rpc";
import { motion } from "framer-motion";
import { StatSkeleton } from "../components/LoadingSkeleton";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  blockNumber: number;
  timestamp: number;
  gasPrice: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTxs = async () => {
      try {
        const txs = await getLatestTransactions(20);
        setTransactions(txs);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTxs();
    const interval = setInterval(fetchTxs, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(192,132,252,0.12),_transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-[0_24px_80px_-30px_rgba(168,85,247,0.45)] backdrop-blur-2xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300/80">
              Recent Transactions
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Transaction Explorer
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">
              Real-time ARC Testnet transactions. Monitor on-chain activity with live data from the
              network.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-6 shadow-[0_24px_60px_-30px_rgba(56,189,248,0.28)] backdrop-blur-xl sm:p-8"
          >
            <label className="mb-3 block text-sm font-medium uppercase tracking-[0.3em] text-cyan-300/80">
              Search transactions
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Txn Hash, or Address"
                className="min-w-0 flex-1 rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              />
              <button className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 shadow-[0_18px_65px_-25px_rgba(168,85,247,0.7)] transition hover:-translate-y-0.5">
                Search
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-[0_24px_90px_-40px_rgba(59,130,246,0.35)] backdrop-blur-2xl"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80 text-slate-300">
                    <th className="px-6 py-4 font-semibold">Tx Hash</th>
                    <th className="px-6 py-4 font-semibold">Block</th>
                    <th className="px-6 py-4 font-semibold">Age</th>
                    <th className="px-6 py-4 font-semibold">From</th>
                    <th className="px-6 py-4 font-semibold">To</th>
                    <th className="px-6 py-4 font-semibold">Value</th>
                    <th className="px-6 py-4 font-semibold">Gas Price</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 10 }).map((_, i) => (
                        <tr key={i} className="border-t border-white/10">
                          {Array.from({ length: 7 }).map((_, j) => (
                            <td key={j} className="px-6 py-5">
                              <div className="h-4 bg-slate-800/50 rounded animate-pulse" />
                            </td>
                          ))}
                        </tr>
                      ))
                    : filteredTransactions.map((transaction) => (
                        <motion.tr
                          key={transaction.hash}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-t border-white/10 transition hover:bg-white/5"
                        >
                          <td className="px-6 py-5 font-medium text-cyan-400 font-mono">
                            {transaction.hash.slice(0, 10)}...{transaction.hash.slice(-8)}
                          </td>
                          <td className="px-6 py-5 text-slate-300">
                            {transaction.blockNumber.toLocaleString()}
                          </td>
                          <td className="px-6 py-5 text-slate-300">{calculateAge(transaction.timestamp)}</td>
                          <td className="px-6 py-5 text-slate-300 font-mono text-xs">
                            {transaction.from.slice(0, 6)}...{transaction.from.slice(-4)}
                          </td>
                          <td className="px-6 py-5 text-slate-300 font-mono text-xs">
                            {transaction.to.slice(0, 6)}...{transaction.to.slice(-4)}
                          </td>
                          <td className="px-6 py-5 text-slate-300">
                            {parseFloat(transaction.value).toFixed(4)} USDC
                          </td>
                          <td className="px-6 py-5 text-green-400 font-semibold">
                            {parseFloat(transaction.gasPrice).toFixed(2)} Gwei
                          </td>
                        </motion.tr>
                      ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
