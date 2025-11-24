import Link from "next/link";

export default function YieldPage() {
  const yieldPools = [
    { name: "KAUS-ETH LP", protocol: "Uniswap V3", apy: "142.8%", tvl: "$2.4M", rewards: "KAUS + Fees", risk: "Medium" },
    { name: "KAUS Staking", protocol: "Native", apy: "68.5%", tvl: "$8.1M", rewards: "KAUS", risk: "Low" },
    { name: "USDC Lending", protocol: "Aave", apy: "12.3%", tvl: "$5.2M", rewards: "USDC Interest", risk: "Low" },
    { name: "ETH-USDC LP", protocol: "Curve", apy: "24.7%", tvl: "$3.8M", rewards: "CRV + Fees", risk: "Medium" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-emerald-500/30 blur-3xl" />
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
            <Link href="/yield" className="text-sm text-purple-400 font-semibold">
              Yield
            </Link>
            <Link href="/treasury" className="text-sm text-slate-400 hover:text-purple-400 transition">
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Yield & Profit Dashboard
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            스테이킹 시스템을 준비 중입니다. 메인넷 출시 후 수익 창출이 가능합니다.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="mb-12 rounded-3xl border border-emerald-500/50 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 p-12 text-center">
          <div className="text-6xl mb-6">💰</div>
          <h2 className="text-3xl font-bold text-slate-100 mb-4">스테이킹 시스템 개발 중</h2>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
            KAUS 스테이킹, 유동성 채굴, 렌딩 프로토콜이 준비되고 있습니다. 예상 APY 60%+
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-6 py-3 text-sm font-semibold text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            스마트 컨트랙트 감사 진행 중
          </div>
        </div>



        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">자동 복리</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              리워드를 자동으로 재투자하여 복리 효과를 극대화합니다. 수수료 최적화로 최대 수익 보장.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">수익 분석</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              일별, 주별, 월별 수익을 상세히 분석합니다. 각 풀의 성과를 비교하고 최적의 전략을 수립하세요.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">리스크 관리</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              스마트 컨트랙트 감사, IL(Impermanent Loss) 계산, 프로토콜 리스크 평가 등 종합적인 리스크 관리.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
