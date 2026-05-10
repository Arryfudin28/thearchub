import HeroStats from "./components/HeroStats";
import NetworkPulseChart from "./components/NetworkPulseChart";
import GMSection from "./components/GMSection";
import LiveActivityFeed from "./components/LiveActivityFeed";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Enhanced Cyberpunk Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0">
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),_transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.12),_transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 overflow-y-auto">
        {/* Live Hero Stats */}
        <HeroStats />

        {/* Network Pulse Chart */}
        <NetworkPulseChart />

        {/* GM Terminal */}
        <GMSection />

        {/* Live Activity Feed */}
        <LiveActivityFeed />
      </div>
    </main>
  );
}
