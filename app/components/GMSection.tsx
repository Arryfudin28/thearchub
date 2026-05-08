export default function GMSection() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_24px_80px_-35px_rgba(236,72,153,0.35)] backdrop-blur-2xl sm:p-8">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-fuchsia-300/80">Send GM Onchain</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Share good vibes with ARC-native greetings.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Spark community engagement with beautifully designed on-chain greetings. The UI is ready — your next Web3 social feature is one click away.
          </p>
        </div>

        <div className="grid gap-5 rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 shadow-[inset_0_0_40px_rgba(168,85,247,0.12)] sm:grid-cols-2 sm:items-end">
          <div className="space-y-4">
            <div className="rounded-3xl bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 p-5 shadow-[0_0_30px_rgba(168,85,247,0.14)] backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Daily streak</p>
              <p className="mt-3 text-5xl font-semibold text-white">14</p>
              <p className="mt-1 text-sm text-slate-400">Days of GM energy across ARC Testnet</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-[0_20px_60px_-30px_rgba(99,102,241,0.4)]">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Latest status</p>
              <div className="flex items-center justify-between rounded-3xl bg-slate-900/80 px-4 py-4 text-sm text-slate-200 shadow-[0_0_20px_rgba(148,163,184,0.12)]">
                <span className="font-medium">TXN Status</span>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-200">Confirmed</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-900/80 px-4 py-4 text-sm text-slate-200 shadow-[0_0_20px_rgba(148,163,184,0.12)]">
                <span className="font-medium">Network</span>
                <span className="text-cyan-200">ARC Testnet</span>
              </div>
            </div>

            <button className="inline-flex items-center justify-center rounded-[1.5rem] bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 shadow-[0_18px_65px_-25px_rgba(168,85,247,0.75)] transition hover:-translate-y-1 hover:shadow-[0_22px_90px_-35px_rgba(168,85,247,0.9)]">
              GM ☀️
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-300 shadow-[0_0_40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          <p className="font-medium text-slate-100">Quick preview</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Last GM</p>
              <p className="mt-3 text-sm text-slate-200">0xA1...47d2 on ARC</p>
            </div>
            <div className="rounded-3xl bg-slate-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Throughput</p>
              <p className="mt-3 text-sm text-slate-200">7.2 tx/s</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
