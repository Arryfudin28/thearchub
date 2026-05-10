"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function NetworkPulseChart() {
  const [data, setData] = useState(() => {
    const now = new Date();
    return Array.from({ length: 24 }, (_, i) => ({
      time: new Date(now.getTime() - (23 - i) * 60 * 60 * 1000).getHours(),
      transactions: Math.floor(Math.random() * 1000) + 500,
    }));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().getHours(),
          transactions: Math.floor(Math.random() * 1000) + 500,
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_16px_60px_-30px_rgba(59,130,246,0.45)] backdrop-blur-md"
    >
      {/* Scanning light effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 animate-pulse" />

      <div className="relative z-10">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Network Pulse</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">24-Hour Transaction Activity</h2>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => `${value}:00`}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="transactions"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#colorTransactions)"
                filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.section>
  );
}