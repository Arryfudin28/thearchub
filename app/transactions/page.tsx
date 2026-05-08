const transactions = [
  {
    hash: "0x7ab45d...f9c3",
    block: "3,124,720",
    age: "2m ago",
    from: "0x9cf...a1b2",
    to: "0x3f8...c4d1",
    value: "$14.90",
    status: "Success",
  },
  {
    hash: "0x4c1b22...8e7a",
    block: "3,124,715",
    age: "5m ago",
    from: "0xd28...e9f4",
    to: "0x1a2...b8c3",
    value: "$3.20",
    status: "Pending",
  },
  {
    hash: "0x9f8d55...0b4c",
    block: "3,124,702",
    age: "12m ago",
    from: "0xbe1...72f0",
    to: "0x7b6...a5d1",
    value: "$28.45",
    status: "Success",
  },
  {
    hash: "0x2e3c77...1a8d",
    block: "3,124,690",
    age: "18m ago",
    from: "0x5f2...e2d9",
    to: "0xa7c...d4b2",
    value: "$6.78",
    status: "Success",
  },
];

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(192,132,252,0.12),_transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-[0_24px_80px_-30px_rgba(168,85,247,0.45)] backdrop-blur-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300/80">
              Recent Transactions
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Transaction Explorer
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">
              Search and inspect recent ARC Testnet activity with a clean, neon-lit interface. This explorer surfaces the latest transaction history in a premium glass UI.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-6 shadow-[0_24px_60px_-30px_rgba(56,189,248,0.28)] backdrop-blur-xl sm:p-8">
            <label className="mb-3 block text-sm font-medium uppercase tracking-[0.3em] text-cyan-300/80">
              Search transactions
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="search"
                placeholder="Search by Txn Hash, Block, or Address"
                className="min-w-0 flex-1 rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              />
              <button className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 shadow-[0_18px_65px_-25px_rgba(168,85,247,0.7)] transition hover:-translate-y-0.5">
                Search
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-[0_24px_90px_-40px_rgba(59,130,246,0.35)] backdrop-blur-2xl">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/80 text-slate-300">
                    <th className="px-6 py-4 font-semibold">Tx Hash</th>
                    <th className="px-6 py-4 font-semibold">Block</th>
                    <th className="px-6 py-4 font-semibold">Age</th>
                    <th className="px-6 py-4 font-semibold">From</th>
                    <th className="px-6 py-4 font-semibold">To</th>
                    <th className="px-6 py-4 font-semibold">Value</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.hash}
                      className="border-t border-white/10 transition hover:bg-white/5"
                    >
                      <td className="px-6 py-5 font-medium text-white">{transaction.hash}</td>
                      <td className="px-6 py-5 text-slate-300">{transaction.block}</td>
                      <td className="px-6 py-5 text-slate-300">{transaction.age}</td>
                      <td className="px-6 py-5 text-slate-300">{transaction.from}</td>
                      <td className="px-6 py-5 text-slate-300">{transaction.to}</td>
                      <td className="px-6 py-5 text-slate-300">{transaction.value}</td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
                            transaction.status === "Success"
                              ? "bg-emerald-400/10 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                              : "bg-amber-400/10 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
