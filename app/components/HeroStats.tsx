"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroStats() {
  const [blockHeight, setBlockHeight] = useState(1248402);
  const [tps, setTps] = useState(45.2);
  const [activeNodes, setActiveNodes] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight(prev => prev + 1);
      setTps(prev => prev + (Math.random() - 0.5) * 2); // fluctuate
      setActiveNodes(prev => prev + Math.floor(Math.random() * 3) - 1); // small changes
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Current Block Height",
      value: blockHeight.toLocaleString(),
      color: "cyan",
    },
    {
      label: "Avg TPS",
      value: tps.toFixed(1),
      color: "green",
      pulse: true,
    },
    {
      label: "Active Nodes",
      value: activeNodes.toString(),
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
      {stats.map((stat, index) => (
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
            <p className={`text-sm font-medium uppercase tracking-[0.24em] ${
              stat.color === 'cyan' ? 'text-cyan-300/80' :
              stat.color === 'green' ? 'text-green-300/80' :
              'text-purple-300/80'
            }`}>
              {stat.label}
            </p>
            <p className={`mt-4 text-4xl font-semibold ${
              stat.pulse ? 'text-green-400 animate-pulse' : 'text-white'
            } sm:text-5xl`}>
              {stat.value}
            </p>
          </div>
        </motion.article>
      ))}
    </motion.section>
  );
}