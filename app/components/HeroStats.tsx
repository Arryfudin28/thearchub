"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getBlockHeight, getGasPrice } from "@/lib/rpc";
import { StatSkeleton } from "./LoadingSkeleton";

export default function HeroStats() {
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [gasPrice, setGasPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [block, gas] = await Promise.all([getBlockHeight(), getGasPrice()]);
        setBlockHeight(block);
        setGasPrice(gas);
      } catch (error) {
        console.error("Error fetching network stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 12000); // Update every 12 seconds
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Current Block Height",
      value: blockHeight?.toLocaleString() || "—",
      color: "cyan",
    },
    {
      label: "Gas Price (Gwei)",
      value: gasPrice ? parseFloat(gasPrice).toFixed(2) : "—",
      color: "green",
      pulse: true,
    },
    {
      label: "Network",
      value: "ARC Testnet",
      color: "purple",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid gap-6 sm:grid-cols-3"
    >
      {loading
        ? Array.from({ length: 3 }).map((_, i) => <StatSkeleton key={i} />)
        : stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_16px_60px_-30px_rgba(59,130,246,0.45)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/30 hover:bg-slate-900/70 hover:shadow-[0_20px_80px_-40px_rgba(59,130,246,0.6)]"
            >
              {/* Scanning light effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />

              <div className="relative z-10">
                <p
                  className={`text-sm font-medium uppercase tracking-[0.24em] ${
                    stat.color === "cyan"
                      ? "text-cyan-300/80"
                      : stat.color === "green"
                        ? "text-green-300/80"
                        : "text-purple-300/80"
                  }`}
                >
                  {stat.label}
                </p>
                <p
                  className={`mt-4 text-4xl font-semibold ${
                    stat.pulse ? "text-green-400 animate-pulse" : "text-white"
                  } sm:text-5xl`}
                >
                  {stat.value}
                </p>
              </div>
            </motion.article>
          ))}
    </motion.section>
  );
}