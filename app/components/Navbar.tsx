"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Stats", href: "/stats" },
  { label: "Transactions", href: "/transactions" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-base font-bold text-white">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">ARCHub</p>
            <p className="text-xs text-slate-500">ARC Testnet dashboard</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${
                  isActive
                    ? "text-slate-950 underline decoration-cyan-400/70 decoration-2 underline-offset-4 shadow-[0_0_20px_rgba(56,189,248,0.14)]"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center">
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </header>
  );
}
