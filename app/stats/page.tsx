export default function StatsPage() {
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
              <div className="h-[320px] rounded-[1.5rem] border border-dashed border-white/10 bg-slate-950/50" />
              <p className="mt-5 text-sm leading-7 text-slate-400">
                Chart placeholder for 30-day transaction volume. Integrate your chart library here to visualize volume spikes, trends, and daily transaction flow.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
