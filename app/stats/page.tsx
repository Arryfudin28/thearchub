"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getVolumeData } from "@/lib/rpc";
import { StatSkeleton } from "../components/LoadingSkeleton";

export default function StatsPage() {
  const [volumeData, setVolumeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        const data = await getVolumeData(100); // Fetch last 100 blocks for 30-day aggregation
        setVolumeData(data);
      } catch (error) {
        console.error("Error fetching volume data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolumeData();
    // Refresh data every 2 minutes
    const interval = setInterval(fetchVolumeData, 120000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: "Current TPS",
      value: "154.6",
      note: "Sustained high throughput",
    },
    {
      label: "Average Gas Price",
      value: "23.8 Gwei",
      note: "Optimized for low-cost transactions",
    },
    {
      label: "Active Validator Nodes",
      value: "48",
      note: "Secure validator mesh",
    },
    {
      label: "Total Value Locked",
      value: "$12.4M",
      note: "Staked across ARC smart contracts",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-[0_24px_80px_-30px_rgba(59,130,246,0.5)] backdrop-blur-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Network Telemetry &amp; Analytics
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Network Telemetry &amp; Analytics
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">
              Deep visibility into ARC Testnet performance, from transaction throughput to validator health. This page is designed for high-speed analysis with premium glassmorphism styling.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_80px_-35px_rgba(168,85,247,0.3)] transition hover:-translate-y-1 hover:border-cyan-400/30"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                  {metric.label}
                </p>
                <p className="mt-5 text-5xl font-semibold text-white">{metric.value}</p>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                  {metric.note}
                </p>
              </article>
            ))}
          </div>

          <section className="relative rounded-[2rem] border border-cyan-400/30 bg-slate-950/50 p-8 shadow-[0_24px_90px_-40px_rgba(56,189,248,0.5),inset_0_0_60px_rgba(56,189,248,0.08)] backdrop-blur-2xl">
            {/* Neon glow effect */}
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-r from-cyan-500/0 via-cyan-400/5 to-cyan-500/0" />
            
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-400/80">
                  Transaction Volume Trend
                </p>
                <h2 className="mt-3 bg-gradient-to-r from-cyan-300 to-cyan-100 bg-clip-text text-3xl font-semibold text-transparent">
                  {loading ? 'Loading...' : `${volumeData.length > 0 ? volumeData[volumeData.length - 1].volume.toFixed(2) : '0'} ARC`}
                </h2>
              </div>
              <motion.div 
                animate={{ boxShadow: ['0_0_20px_rgba(56,189,248,0.4)', '0_0_40px_rgba(56,189,248,0.8)', '0_0_20px_rgba(56,189,248,0.4)'] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 border border-cyan-400/50 shadow-[0_0_30px_rgba(56,189,248,0.3)]"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
                Live ARC Testnet
              </motion.div>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-cyan-400/20 bg-slate-900/40 p-8 shadow-[inset_0_0_80px_rgba(56,189,248,0.12),0_0_50px_rgba(56,189,248,0.15)]">
              {/* Chart background glow */}
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-b from-cyan-500/5 to-transparent opacity-50" />
              
              <div className="relative">
                {loading ? (
                  <div className="h-[320px] flex items-center justify-center">
                    <StatSkeleton />
                  </div>
                ) : volumeData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={320}>
                      <AreaChart data={volumeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6}/>
                            <stop offset="50%" stopColor="#06b6d4" stopOpacity={0.2}/>
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                          <filter id="neonGlow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                        <XAxis
                          dataKey="date"
                          stroke="#64748b"
                          fontSize={12}
                          style={{ textShadow: '0 0 8px rgba(6, 182, 212, 0.3)' }}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                          }}
                        />
                        <YAxis
                          stroke="#64748b"
                          fontSize={12}
                          tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.95)',
                            border: '1px solid rgba(56, 189, 248, 0.5)',
                            borderRadius: '0.75rem',
                            color: '#f1f5f9',
                            boxShadow: '0 0 30px rgba(56, 189, 248, 0.3)',
                            backdropFilter: 'blur(10px)'
                          }}
                          cursor={{ stroke: 'rgba(56, 189, 248, 0.3)', strokeWidth: 1 }}
                          labelFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('en-US', { 
                              weekday: 'short',
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            });
                          }}
                          formatter={(value: any) => [
                            `${parseFloat(value).toFixed(4)} ARC`, 
                            'Volume'
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="volume"
                          stroke="#06b6d4"
                          strokeWidth={3}
                          fill="url(#volumeGradient)"
                          filter="url(#neonGlow)"
                          isAnimationActive={true}
                          animationDuration={1000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2 text-xs">
                      <div className="text-cyan-300/70">Max: <span className="text-cyan-100 font-semibold">{Math.max(...volumeData.map(d => d.volume)).toFixed(4)} ARC</span></div>
                      <div className="text-cyan-300/70">Avg: <span className="text-cyan-100 font-semibold">{(volumeData.reduce((sum, d) => sum + d.volume, 0) / volumeData.length).toFixed(4)} ARC</span></div>
                    </div>
                  </>
                ) : (
                  <div className="h-[320px] flex items-center justify-center text-slate-400">
                    No transaction volume data available
                  </div>
                )}
              </div>
              
              <p className="relative mt-6 text-sm leading-7 text-slate-400">
                <span className="text-cyan-300/80">Real-time transaction volume</span> aggregated from the ARC Testnet blockchain. Data represents cumulative transaction values per day over the last 30 days, automatically updated every 2 minutes.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
