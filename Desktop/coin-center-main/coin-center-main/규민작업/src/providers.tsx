import Link from "next/link";

const featureCategories = [
    {
        key: "market",
        title: "Live Market",
        description:
            "Prices, volumes and volatility for every supported coin in one real‑time radar.",
        href: "/market",
        meta: "Charts · Order books",
    },
    {
        key: "wallets",
        title: "Wallet Overview",
        description:
            "Unify all wallets and accounts into a single, transparent balance sheet.",
        href: "/wallets",
        meta: "Multi‑chain · Segmented",
    },
    {
        key: "yield",
        title: "Yield & Staking",
        description:
            "See how staking, lending and farming positions are generating profits.",
        href: "/yield",
        meta: "APY · Rewards · Risk",
    },
    {
        key: "analytics",
        title: "Profit Analytics",
        description:
            "Break down PnL by wallet, strategy and coin to understand where gains come from.",
        href: "/analytics",
        meta: "PnL · Performance",
    },
    {
        key: "treasury",
        title: "Treasury & Reserves",
        description:
            "Monitor protocol treasuries, collateral and runway with full on‑chain visibility.",
        href: "/treasury",
        meta: "DAO · Team · Funds",
    },
    {
        key: "activity",
        title: "Network Activity",
        description:
            "Track large transfers, liquidations and whale moves as they happen.",
        href: "/activity",
        meta: "Whales · Flows",
    },
];

const transparencyRows = [
    {
        address: "0xA3F9...9F21",
        label: "Market Maker Node",
        balance: 1284.42,
        coin: "ETH",
        pnl24h: 12.4,
        pnlTotal: 231.8,
    },
    {
        address: "0x7B02...C8D4",
        label: "Yield Vault Pool #1",
        balance: 982_340.12,
        coin: "USDC",
        pnl24h: 3.1,
        pnlTotal: 48.3,
    },
    {
        address: "0x4C9E...11B7",
        label: "Treasury Multisig",
        balance: 2_345_901.55,
        coin: "KAUS",
        pnl24h: 0.7,
        pnlTotal: 114.9,
    },
    {
        address: "0xD1AA...7E09",
        label: "Top Community Wallet",
        balance: 74_210.33,
        coin: "KAUS",
        pnl24h: -1.9,
        pnlTotal: 26.4,
    },
    {
        address: "0x89F0...AA3C",
        label: "Arb Bot Strategy",
        balance: 412.78,
        coin: "ETH",
        pnl24h: 8.6,
        pnlTotal: 163.2,
    },
];

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
            {/* Neon background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl" />
                <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-sky-500/30 blur-3xl" />
                <div className="absolute inset-x-0 bottom-[-18rem] mx-auto h-96 w-[40rem] rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent opacity-80" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-10 lg:px-8">
                {/* Top bar */}
                <header className="mb-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/80 ring-1 ring-purple-500/70 shadow-[0_0_30px_rgba(168,85,247,0.7)]">
                            <span className="text-xs font-semibold tracking-[0.25em] text-purple-200">
                                CC
                            </span>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                                Coin Center
                            </p>
                            <p className="text-[11px] text-slate-500">
                                Futuristic crypto control room
                            </p>
                        </div>
                    </div>

                    <nav className="hidden items-center gap-6 text-xs text-slate-400 sm:flex">
                        <a href="#modules" className="hover:text-slate-100">
                            Modules
                        </a>
                        <a href="#transparency" className="hover:text-slate-100">
                            Transparency
                        </a>
                        <a href="#about" className="hover:text-slate-100">
                            About
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            href="#"
                            className="hidden rounded-full border border-slate-700/80 bg-slate-900/60 px-4 py-1.5 text-xs font-medium text-slate-300 shadow-[0_0_18px_rgba(15,23,42,0.9)] hover:border-slate-500 hover:text-slate-100 sm:inline-flex"
                        >
                            Docs
                        </Link>
                        <Link
                            href="#"
                            className="rounded-full border border-purple-500/80 bg-purple-500/20 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-purple-50 shadow-[0_0_40px_rgba(168,85,247,0.9)] hover:bg-purple-500/30"
                        >
                            Connect Wallet
                        </Link>
                    </div>
                </header>

                {/* Hero + transparency preview */}
                <section className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                    {/* Hero */}
                    <div className="text-center lg:text-left">
                        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-800 bg-black/70 px-3 py-1 text-[11px] text-slate-400 lg:mx-0">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,1)]" />
                            Live, on‑chain & non‑custodial
                        </div>

                        <h1 className="mt-5 bg-gradient-to-br from-purple-400 via-fuchsia-500 to-sky-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                            Coin Center
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300/90 sm:text-base lg:mx-0">
                            A single, neon‑lit cockpit for your coins. Monitor markets, track
                            every wallet and see exactly how profits are generated — all with
                            full on‑chain transparency.
                        </p>

                        <p
                            id="about"
                            className="mx-auto mt-2 max-w-xl text-[12px] text-slate-400 lg:mx-0"
                        >
                            Watch how funds move between accounts, how yield streams are
                            paid, and how every token flows through the system.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                            <Link
                                href="#"
                                className="inline-flex items-center justify-center rounded-full border border-purple-400/80 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-sky-500 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_45px_rgba(129,140,248,1)] hover:shadow-[0_0_70px_rgba(56,189,248,0.95)]"
                            >
                                Connect Wallet
                            </Link>
                            <Link
                                href="/market"
                                className="inline-flex items-center justify-center rounded-full border border-sky-500/60 bg-slate-950/80 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-200 hover:border-sky-400 hover:bg-slate-900"
                            >
                                View Market
                            </Link>
                            <span className="text-[11px] text-slate-500">
                                No accounts held · Just transparent data
                            </span>
                        </div>
                    </div>

                    {/* Transparent accounts preview */}
                    <div id="transparency" className="relative">
                        <div className="absolute -top-10 right-0 h-28 w-28 rounded-full bg-sky-500/30 blur-3xl" />
                        <div className="absolute -bottom-14 left-4 h-24 w-24 rounded-full bg-purple-500/30 blur-3xl" />

                        <div className="relative overflow-hidden rounded-2xl border border-purple-500/70 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-4 shadow-[0_0_55px_rgba(56,189,248,0.75)]">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                                        Live sample view
                                    </p>
                                    <p className="mt-1 text-xs text-slate-200">
                                        Anonymized account & profit overview
                                    </p>
                                </div>
                                <div className="rounded-xl bg-emerald-500/15 px-3 py-1 text-right text-[11px] font-semibold text-emerald-300">
                                    <span className="block text-[9px] uppercase tracking-[0.22em]">
                                        24h PnL
                                    </span>
                                    <span>+18.3%</span>
                                </div>
                            </div>

                            <div className="mt-4 max-h-60 overflow-y-auto rounded-xl border border-slate-800/80 bg-black/40">
                                <table className="min-w-full border-separate border-spacing-y-1 text-left text-[11px]">
                                    <thead className="sticky top-0 z-10 bg-black/90 backdrop-blur">
                                        <tr className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                            <th className="px-3 py-2">Account</th>
                                            <th className="px-3 py-2 text-right">Coins</th>
                                            <th className="px-3 py-2 text-right">24h Profit</th>
                                            <th className="px-3 py-2 text-right">Total Profit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transparencyRows.map((row) => (
                                            <tr key={row.address} className="align-middle">
                                                <td className="px-3 py-2">
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="font-mono text-[11px] text-slate-200">
                                                            {row.address}
                                                        </span>
                                                        <span className="text-[10px] text-slate-500">
                                                            {row.label}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <span className="font-mono text-[11px] text-slate-100">
                                                        {row.balance.toLocaleString("en-US", {
                                                            maximumFractionDigits: 2,
                                                        })}{" "}
                                                        {row.coin}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <span
                                                        className={`font-mono text-[11px] ${row.pnl24h >= 0
                                                                ? "text-emerald-400"
                                                                : "text-rose-400"
                                                            }`}
                                                    >
                                                        {row.pnl24h >= 0 ? "+" : ""}
                                                        {row.pnl24h.toFixed(2)}%
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <span
                                                        className={`font-mono text-[11px] ${row.pnlTotal >= 0
                                                                ? "text-emerald-400"
                                                                : "text-rose-400"
                                                            }`}
                                                    >
                                                        {row.pnlTotal >= 0 ? "+" : ""}
                                                        {row.pnlTotal.toFixed(2)}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
                                This is how Coin Center shows what is happening inside the
                                platform: every account, coin amount and profit stream is
                                visible in real time — without exposing personal identities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Feature categories */}
                <section id="modules" className="mt-14">
                    <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                        Coin function categories
                    </h2>
                    <p className="mb-6 max-w-2xl text-[13px] text-slate-400">
                        Each category is a door into a focused part of the platform. Click
                        to enter and see exactly how coins move, where yield is produced and
                        how profits are built up across different accounts.
                    </p>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {featureCategories.map((feature) => (
                            <Link
                                key={feature.key}
                                href={feature.href}
                                className="group relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950/80 px-4 py-4 transition hover:-translate-y-1 hover:border-purple-500/80 hover:bg-slate-900/90 hover:shadow-[0_0_30px_rgba(129,140,248,0.8)]"
                            >
                                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/40 via-sky-500/40 to-transparent opacity-0 blur-2xl transition group-hover:opacity-100" />
                                <div className="relative flex items-center justify-between gap-2">
                                    <p className="text-sm font-semibold text-slate-100">
                                        {feature.title}
                                    </p>
                                    <span className="rounded-full border border-slate-700/80 bg-black/70 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                                        Enter
                                    </span>
                                </div>
                                <p className="relative mt-2 text-[12px] leading-relaxed text-slate-400">
                                    {feature.description}
                                </p>
                                <div className="relative mt-3 flex items-center justify-between text-[11px] text-slate-500">
                                    <span>{feature.meta}</span>
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-300">
                                        Open
                                        <svg
                                            aria-hidden
                                            viewBox="0 0 16 16"
                                            className="h-3.5 w-3.5"
                                        >
                                            <path
                                                d="M4 11.5 11.5 4M7 3.5h4.5V8"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-10 flex flex-col gap-2 border-t border-slate-900 pt-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Coin Center — Designed for dark mode,
                        powered by neon.
                    </p>
                    <p>Built with Next.js & Tailwind CSS.</p>
                </footer>
            </div>
        </main>
    );
}

