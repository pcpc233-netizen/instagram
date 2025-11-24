import Link from "next/link";

export default function TreasuryPage() {
  const treasuryAssets = [
    { asset: "KAUS Tokens", amount: "15,420,000", value: "$21,888,000", allocation: "45%", type: "Native Token" },
    { asset: "USDC", amount: "8,250,000", value: "$8,250,000", allocation: "17%", type: "Stablecoin" },
    { asset: "ETH", amount: "2,840", value: "$6,475,200", allocation: "13%", type: "Blue Chip" },
    { asset: "BTC", amount: "145", value: "$6,271,250", allocation: "13%", type: "Blue Chip" },
    { asset: "LP Tokens", amount: "Various", value: "$5,815,550", allocation: "12%", type: "Liquidity" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <header className="flex items-center justify-between border-b border-purple-500/20 pb-6 mb-12">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all group-hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]">
              <span className="text-lg font-bold text-white">KC</span>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                KAUS
              </h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Control Center</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/market" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Market
            </Link>
            <Link href="/wallets" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Wallets
            </Link>
            <Link href="/yield" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Yield
            </Link>
            <Link href="/treasury" className="text-sm text-purple-400 font-semibold">
              Treasury
            </Link>
            <Link href="/governance" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Governance
            </Link>
            <Link href="/activity" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Activity
            </Link>
          </nav>
        </header>

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
            Treasury & Reserves
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            DAO Treasury 시스템을 구축 중입니다. 완전한 투명성을 보장합니다.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="mb-12 rounded-3xl border border-indigo-500/50 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-950 p-12 text-center">
          <div className="text-6xl mb-6">🏛️</div>
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Treasury 구축 중</h2>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
            멀티시그 지갑, 자산 배분, 비용 관리 시스템을 개발하고 있습니다. 모든 자금 흐름은 블록체인에 기록됩니다.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 border border-indigo-500/40 px-6 py-3 text-sm font-semibold text-indigo-200">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            멀티시그 지갑 설정 중
          </div>
        </div>



        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">🏦</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">DAO 거버넌스</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              커뮤니티가 Treasury 사용에 대해 투표하고 결정합니다. 모든 제안과 집행은 투명하게 공개됩니다.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">실시간 감사</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              모든 자금 흐름은 블록체인에 기록되어 누구나 검증할 수 있습니다. 멀티시그 지갑으로 보안 강화.
            </p>
          </div>
          <div className="rounded-2xl border border-fuchsia-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">💎</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">자산 다각화</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              스테이블코인, 블루칩 암호화폐, LP 토큰 등 다양한 자산으로 포트폴리오를 구성하여 리스크 분산.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
