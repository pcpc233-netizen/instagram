import Link from "next/link";

export default function ActivityPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-amber-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-rose-500/30 blur-3xl" />
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
            <Link href="/treasury" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Treasury
            </Link>
            <Link href="/governance" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Governance
            </Link>
            <Link href="/activity" className="text-sm text-purple-400 font-semibold">
              Activity
            </Link>
          </nav>
        </header>

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Live Activity Feed
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            실시간 네트워크 활동 추적 시스템입니다. KAUS 메인넷 출시와 함께 활성화됩니다.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="mb-12 rounded-3xl border border-amber-500/50 bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-950 p-12 text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold text-slate-100 mb-4">곧 출시 예정</h2>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
            KAUS Coin 메인넷 출시 후 실시간 거래 활동, 고래 움직임, 청산 등 모든 온체인 이벤트를 추적할 수 있습니다.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-500/40 px-6 py-3 text-sm font-semibold text-purple-200">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
            2026 Q2 출시 예정
          </div>
        </div>

        {/* Feature Preview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">출시 예정 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6 text-center">
              <div className="text-3xl mb-3">📊</div>
              <p className="text-sm font-semibold text-slate-100 mb-2">실시간 거래 추적</p>
              <p className="text-xs text-slate-400">모든 거래를 실시간으로 모니터링</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6 text-center">
              <div className="text-3xl mb-3">🐋</div>
              <p className="text-sm font-semibold text-slate-100 mb-2">고래 지갑 추적</p>
              <p className="text-xs text-slate-400">대량 보유자의 움직임 알림</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6 text-center">
              <div className="text-3xl mb-3">⚠️</div>
              <p className="text-sm font-semibold text-slate-100 mb-2">청산 알림</p>
              <p className="text-xs text-slate-400">DeFi 청산 이벤트 실시간 알림</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6 text-center">
              <div className="text-3xl mb-3">🔔</div>
              <p className="text-sm font-semibold text-slate-100 mb-2">커스텀 알림</p>
              <p className="text-xs text-slate-400">원하는 조건으로 알림 설정</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-amber-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">🔔</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">실시간 알림</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              메인넷 출시 후 고래 움직임, 대량 거래, 청산 등 중요한 이벤트 발생 시 즉시 알림을 받을 수 있습니다.
            </p>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">📡</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">고급 필터링</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              거래 유형, 금액, 시간대 등으로 활동을 필터링하여 관심있는 이벤트만 선택적으로 추적할 수 있습니다.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">패턴 분석</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI 기반 패턴 인식으로 비정상적인 활동을 감지하고 시장 움직임을 예측하는 기능이 제공됩니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
