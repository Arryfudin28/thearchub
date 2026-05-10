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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 text-base font-bold text-white shadow-lg">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-white">ARCHub</p>
            <p className="text-xs text-slate-400">ARC Testnet dashboard</p>
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
                    ? "text-cyan-300 underline decoration-cyan-400/70 decoration-2 underline-offset-4 shadow-[0_0_20px_rgba(56,189,248,0.14)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-medium text-white shadow-[0_4px_20px_-4px_rgba(59,130,246,0.45)] backdrop-blur-md transition-all hover:border-cyan-400/30 hover:bg-slate-900/70 hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.6)]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity" />
                          <span className="relative z-10">Connect Wallet</span>
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button" className="text-red-400">
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div className="flex gap-2">
                        <button
                          onClick={openChainModal}
                          className="flex items-center gap-1 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm font-medium text-white shadow-[0_4px_20px_-4px_rgba(59,130,246,0.45)] backdrop-blur-md transition-all hover:border-cyan-400/30"
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div
                              className="h-4 w-4 rounded-full"
                              style={{
                                background: chain.iconBackground,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  className="h-4 w-4 rounded-full"
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>

                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm font-medium text-white shadow-[0_4px_20px_-4px_rgba(59,130,246,0.45)] backdrop-blur-md transition-all hover:border-cyan-400/30"
                        >
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                          {account.displayName}
                          {account.ensAvatar && (
                            <img
                              alt="ENS Avatar"
                              src={account.ensAvatar}
                              className="h-4 w-4 rounded-full"
                            />
                          )}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </header>
  );
}
