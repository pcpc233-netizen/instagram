import Link from "next/link";

export default function RoadmapPage() {
  const roadmapData = [
    {
      phase: "Phase 1: Foundation",
      quarter: "Q4 2024",
      status: "completed",
      items: [
        { title: "스마트 컨트랙트 개발 완료", done: true },
        { title: "보안 감사 (CertiK, PeckShield)", done: true },
        { title: "테스트넷 배포 및 테스트", done: true },
        { title: "커뮤니티 구축 (Discord, Telegram)", done: true },
        { title: "웹사이트 및 문서 공개", done: true },
      ]
    },
    {
      phase: "Phase 2: Launch",
      quarter: "Q1 2025",
      status: "completed",
      items: [
        { title: "메인넷 출시", done: true },
        { title: "Uniswap 유동성 풀 생성", done: true },
        { title: "스테이킹 시스템 활성화", done: true },
        { title: "CoinGecko & CoinMarketCap 등록", done: true },
        { title: "첫 거버넌스 제안 통과", done: true },
      ]
    },
    {
      phase: "Phase 3: Expansion",
      quarter: "Q2 2026",
      status: "in-progress",
      items: [
        { title: "QR/NFC 정품인증 시스템 개발", done: true },
        { title: "공급망 추적 스마트 컨트랙트", done: true },
        { title: "모바일 앱 베타 출시 (상품 스캔)", done: false },
        { title: "패션 브랜드 파트너십 (5개)", done: false },
        { title: "AI 위조품 탐지 엔진 통합", done: false },
      ]
    },
    {
      phase: "Phase 4: Innovation",
      quarter: "Q3-Q4 2026",
      status: "upcoming",
      items: [
        { title: "식품 안전 추적 시스템 (IoT 센서)", done: false },
        { title: "전자제품 정품인증 확대", done: false },
        { title: "크로스체인 브릿지 출시", done: false },
        { title: "NFT 한정판 상품 발행", done: false },
        { title: "글로벌 거래소 상장 (3개)", done: false },
      ]
    },
    {
      phase: "Phase 5: Maturity",
      quarter: "2027",
      status: "upcoming",
      items: [
        { title: "의약품 유통 추적 시스템", done: false },
        { title: "100개 브랜드 파트너십", done: false },
        { title: "글로벌 물류업체 통합 (DHL, FedEx)", done: false },
        { title: "글로벌 규제 준수 (FDA, EU)", done: false },
        { title: "10억 개 상품 추적 달성", done: false },
      ]
    }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
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
            <Link href="/activity" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Activity
            </Link>
          </nav>
        </header>

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            로드맵
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            KAUS Coin의 과거 성과와 미래 계획을 확인하세요. 우리는 투명하게 진행 상황을 공유합니다.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-fuchsia-500 to-cyan-500 opacity-30 hidden md:block"></div>

          <div className="space-y-12">
            {roadmapData.map((phase, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] hidden md:block"></div>

                <div className="md:ml-20">
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 overflow-hidden hover:border-purple-500/50 transition">
                    <div className={`p-6 border-b border-slate-800/50 ${
                      phase.status === 'completed' ? 'bg-emerald-950/20' :
                      phase.status === 'in-progress' ? 'bg-cyan-950/20' :
                      'bg-slate-950/40'
                    }`}>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-100 mb-2">{phase.phase}</h3>
                          <p className="text-sm text-slate-400">{phase.quarter}</p>
                        </div>
                        <div>
                          <span className={`inline-block rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                            phase.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                            phase.status === 'in-progress' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                            'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          }`}>
                            {phase.status === 'completed' ? '✓ 완료' :
                             phase.status === 'in-progress' ? '⏳ 진행 중' :
                             '📅 예정'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <ul className="space-y-3">
                        {phase.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                              item.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                            }`}>
                              {item.done ? '✓' : '○'}
                            </span>
                            <span className={`text-sm ${item.done ? 'text-slate-300' : 'text-slate-400'}`}>
                              {item.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/80 p-6 text-center">
            <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">완료된 마일스톤</p>
            <p className="text-4xl font-bold text-emerald-400">14</p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-6 text-center">
            <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">진행 중</p>
            <p className="text-4xl font-bold text-cyan-400">3</p>
          </div>
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/80 p-6 text-center">
            <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">예정</p>
            <p className="text-4xl font-bold text-purple-400">12</p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mt-16 text-center rounded-2xl border border-purple-500/30 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-12">
          <h3 className="text-3xl font-bold text-slate-100 mb-4">우리의 비전</h3>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            KAUS Coin은 단순한 암호화폐를 넘어, 완전히 투명하고 탈중앙화된 금융 생태계를 구축하는 것을 목표로 합니다.
            모든 사용자가 동등한 기회를 갖고, 커뮤니티가 함께 성장하는 미래를 만들어가고 있습니다.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/governance"
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/60 bg-purple-500/20 px-6 py-3 text-sm font-semibold text-purple-50 hover:bg-purple-500/30 transition"
            >
              거버넌스 참여하기 →
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/60 bg-cyan-500/20 px-6 py-3 text-sm font-semibold text-cyan-50 hover:bg-cyan-500/30 transition"
            >
              FAQ 보기 →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
