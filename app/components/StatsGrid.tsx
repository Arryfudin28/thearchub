const stats = [
  {
    label: "Total Blocks",
    value: "1,248,402",
    meta: "+12.3% QoQ",
  },
  {
    label: "Block Time",
    value: "2.8s",
    meta: "Stable · low latency",
  },
  {
    label: "Total Txns",
    value: "9.6M",
    meta: "Today: 84K",
  },
  {
    label: "Daily Txns",
    value: "82,314",
    meta: "Peak: 105K",
  },
];

export default function StatsGrid() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_16px_60px_-30px_rgba(59,130,246,0.45)] transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900/70"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
                {stat.label}
              </p>
              <p className="mt-4 text-4xl font-semibold text-white sm:text-5xl">{stat.value}</p>
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
