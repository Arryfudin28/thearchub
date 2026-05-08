export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 px-6 py-16 shadow-[0_0_40px_rgba(99,102,241,0.15)] backdrop-blur-2xl sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.16),_transparent_38%)] opacity-90" />
      <div className="pointer-events-none absolute right-[-10%] top-1/3 -z-10 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-[-10%] bottom-0 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="mx-auto flex max-w-5xl flex-col gap-8 text-center">
        <div className="inline-flex rounded-full border border-slate-400/10 bg-white/5 px-4 py-2 text-sm text-cyan-200 shadow-[0_0_30px_rgba(56,189,248,0.12)] backdrop-blur-xl">
          Live ARC Testnet monitoring · glassmorphism dashboard
        </div>

        <div className="space-y-6">
          <h1 className="relative text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
            <span className="relative isolate inline-flex items-center gap-3">
              <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-r from-cyan-400/30 via-violet-500/20 to-fuchsia-500/10 blur-3xl" />
              <span className="relative">Build on ARC,</span>
            </span>
            <br />
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-slate-100 to-fuchsia-300">
              Stay Ahead
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            ARCHub is your on-chain command center for ARC Testnet. Track block flow, transaction pulse, and send on-chain greetings with a premium glassmorphism experience designed for modern Web3 builders.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="rounded-3xl border border-slate-300/10 bg-slate-900/70 p-6 shadow-[0_20px_80px_-30px_rgba(59,130,246,0.55)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/30">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Network pulse</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">ARC live</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">Real-time telemetry from the ARC Testnet, optimized for active builders and DAO explorers.</p>
          </div>

          <div className="rounded-3xl border border-slate-300/10 bg-slate-900/70 p-6 shadow-[0_20px_80px_-30px_rgba(168,85,247,0.45)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-400/30">
            <p className="text-sm uppercase tracking-[0.24em] text-fuchsia-300/80">Experience</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Cyberpunk glass UI</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">Fluid motion, neon glow, and responsive layout built for the aesthetics of tomorrow.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
