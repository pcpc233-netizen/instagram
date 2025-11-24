import Link from "next/link";

export default function GovernancePage() {
  const proposals = [
    { id: 1, title: "Increase Staking Rewards by 15%", status: "Active", votes: "2.4M KAUS", support: 78, endDate: "3 days" },
    { id: 2, title: "Launch on Arbitrum Network", status: "Active", votes: "1.8M KAUS", support: 92, endDate: "5 days" },
    { id: 3, title: "Allocate $500K for Marketing", status: "Passed", votes: "3.1M KAUS", support: 84, endDate: "Ended" },
    { id: 4, title: "Update Token Economics Model", status: "Discussion", votes: "0.5M KAUS", support: 45, endDate: "12 days" },
  ];

  const topVoters = [
    { address: "0xA3F9...9F21", power: "842,000 KAUS", votes: 24, participation: "96%" },
    { address: "0x7B02...C8D4", power: "620,000 KAUS", votes: 22, participation: "88%" },
    { address: "0x4C9E...11B7", power: "510,000 KAUS", votes: 20, participation: "80%" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-fuchsia-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl" />
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
            <Link href="/governance" className="text-sm text-purple-400 font-semibold">
              Governance
            </Link>
            <Link href="/activity" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Activity
            </Link>
          </nav>
        </header>

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-fuchsia-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Governance & Voting
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            커뮤니티 거버넌스 시스템을 준비 중입니다. 토큰 보유자가 미래를 결정합니다.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="mb-12 rounded-3xl border border-fuchsia-500/50 bg-gradient-to-br from-slate-950 via-fuchsia-950/20 to-slate-950 p-12 text-center">
          <div className="text-6xl mb-6">🗳️</div>
          <h2 className="text-3xl font-bold text-slate-100 mb-4">DAO 거버넌스 개발 중</h2>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
            온체인 투표 시스템, 제안 관리, 스마트 컨트랙트 자동 집행 기능을 구축하고 있습니다.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 px-6 py-3 text-sm font-semibold text-fuchsia-200">
            <span className="h-2 w-2 rounded-full bg-fuchsia-400 animate-pulse"></span>
            거버넌스 프레임워크 설계 중
          </div>
        </div>



        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-fuchsia-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">🗳️</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">온체인 투표</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              모든 투표는 스마트 컨트랙트로 처리되어 조작이 불가능합니다. 투명하고 공정한 의사결정 시스템.
            </p>
          </div>
          <div className="rounded-2xl border border-violet-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">토론 포럼</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              제안 전에 커뮤니티와 충분히 논의하세요. Discord, Forum, Snapshot 등 다양한 채널 지원.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">즉시 집행</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              통과된 제안은 자동으로 집행됩니다. Timelock과 멀티시그로 보안을 강화하여 안전하게 실행.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
