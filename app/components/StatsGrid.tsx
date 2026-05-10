"use client";

import { useState, useEffect } from "react";
import { getNetworkStats } from "@/lib/rpc";
import { StatSkeleton } from "./LoadingSkeleton";

export default function StatsGrid() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const networkStats = await getNetworkStats();
        setStats([
          {
            label: "Total Blocks",
            value: networkStats.blockHeight.toLocaleString(),
            meta: "ARC Testnet Live",
          },
          {
            label: "Block Time",
            value: `${networkStats.blockTime}s`,
            meta: "Latest block age",
          },
          {
            label: "Gas Price",
            value: `${networkStats.gasPrice.toFixed(2)} Gwei`,
            meta: "Current avg gas",
          },
          {
            label: "Network Status",
            value: "Active",
            meta: "Real-time sync",
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 12000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
        : stats.map((stat) => (
            <article
              key={stat.label}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_16px_60px_-30px_rgba(59,130,246,0.45)] transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900/70"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
                    {stat.label}
                  </p>
                  <p className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                    {stat.value}
                  </p>
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 shadow-[0_0_30px_rgba(56,189,248,0.18)]">
                  <span className="text-xl font-semibold">∑</span>
                </div>
              </div>
              <p className="mt-6 text-sm leading-6 text-slate-400 transition group-hover:text-slate-200">
                {stat.meta}
              </p>
            </article>
          ))}
    </section>
  );
}
