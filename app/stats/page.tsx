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
        const data = await getVolumeData(50);
        setVolumeData(data);
      } catch (error) {
        console.error("Error fetching volume data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolumeData();
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

          <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-[0_24px_90px_-40px_rgba(99,102,241,0.45)] backdrop-blur-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                  30-Day Transaction Volume
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Volume trend placeholder
                </h2>
              </div>
              <div className="inline-flex items-center rounded-full bg-slate-900/80 px-4 py-2 text-sm text-cyan-200 shadow-[0_0_30px_rgba(56,189,248,0.16)]">
                Live ARC Testnet data
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-cyan-400/10 bg-slate-900/70 p-8 shadow-[inset_0_0_70px_rgba(56,189,248,0.1)]">
              {loading ? (
                <div className="h-[320px] flex items-center justify-center">
                  <StatSkeleton />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={volumeData}>
                    <defs>
                      <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="date"
                      stroke="#9ca3af"
                      fontSize={12}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      fontSize={12}
                      tickFormatter={(value) => `${value.toFixed(2)} USDC`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem',
                        color: '#f1f5f9'
                      }}
                      labelFormatter={(value) => `Date: ${new Date(value).toLocaleDateString()}`}
                      formatter={(value: any) => [`${(value || 0).toFixed(4)} USDC`, 'Volume']}
                    />
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      fill="url(#volumeGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
              <p className="mt-5 text-sm leading-7 text-slate-400">
                Real-time transaction volume from the last 30 days on ARC Testnet. Data aggregated from blockchain blocks.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
