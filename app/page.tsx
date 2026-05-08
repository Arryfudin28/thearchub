import GMSection from "./components/GMSection";
import HeroSection from "./components/HeroSection";
import StatsGrid from "./components/StatsGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.2),_transparent_40%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_40%)]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
          <HeroSection />

          <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
            <div className="space-y-8">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_80px_-40px_rgba(59,130,246,0.45)] backdrop-blur-2xl sm:p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Dashboard overview</p>
                <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  Insights, network health, and transaction momentum in one elegant view.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                  ARCHub combines modern glass UI, cyberpunk glow, and responsive data presentation to help you monitor the ARC Testnet like a pro.
                </p>
              </div>

              <StatsGrid />
            </div>

            <GMSection />
          </div>
        </div>
      </div>
    </main>
  );
}
