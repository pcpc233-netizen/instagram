import Link from "next/link";

export default function AboutPage() {
  const competitors = [
    { name: "VeChain (VET)", focus: "명품, 자동차, 식품", strength: "BMW, Walmart 파트너십", marketCap: "Top 50" },
    { name: "OriginTrail (TRAC)", focus: "식품, 의약품", strength: "Google, Oracle 협력", marketCap: "Mid-cap" },
    { name: "Waltonchain (WTC)", focus: "의류, RFID", strength: "중국 정부 지원", marketCap: "Small-cap" },
  ];

  const features = [
    {
      icon: "🔗",
      title: "QR/NFC 통합 인증",
      description: "각 상품에 고유한 블록체인 ID를 부여하여 위변조가 불가능한 정품 인증 시스템을 구축합니다.",
      tech: ["QR Code Generation", "NFC Chip Integration", "Blockchain Anchoring"]
    },
    {
      icon: "🤖",
      title: "AI 위조품 탐지",
      description: "머신러닝 이미지 분석으로 가짜 상품을 자동으로 탐지하고 차단합니다.",
      tech: ["Computer Vision", "Deep Learning", "Anomaly Detection"]
    },
    {
      icon: "🌐",
      title: "크로스체인 호환",
      description: "Ethereum, Polygon, BSC 등 여러 블록체인을 동시에 지원하여 확장성을 보장합니다.",
      tech: ["Multi-chain Bridge", "Layer 2 Solutions", "Interoperability"]
    },
    {
      icon: "📊",
      title: "실시간 유통 추적",
      description: "생산부터 소비까지 모든 단계를 실시간으로 모니터링하고 기록합니다.",
      tech: ["IoT Sensors", "GPS Tracking", "Smart Contracts"]
    },
    {
      icon: "💎",
      title: "NFT 소유권 증명",
      description: "희귀 상품과 한정판 아이템은 NFT로 발행하여 디지털 소유권을 보장합니다.",
      tech: ["ERC-721/1155", "IPFS Storage", "Metadata Standards"]
    },
    {
      icon: "🎁",
      title: "소비자 리워드",
      description: "QR 스캔, 리뷰 작성 등 참여 활동에 KAUS 토큰을 보상합니다.",
      tech: ["Token Economics", "Staking Rewards", "Referral Program"]
    }
  ];

  const useCases = [
    {
      category: "패션 & 럭셔리",
      emoji: "👗",
      items: ["명품 가방/지갑", "디자이너 의류", "화장품/향수", "시계/주얼리", "스니커즈"],
      benefit: "위조품 방지로 브랜드 가치 보호"
    },
    {
      category: "식품 & 건강",
      emoji: "🍎",
      items: ["유기농 농산물", "건강기능식품", "프리미엄 와인", "수입 식품", "건강 보조제"],
      benefit: "품질 보증과 식품 안전 강화"
    },
    {
      category: "전자제품",
      emoji: "📱",
      items: ["스마트폰", "노트북", "카메라", "이어폰", "게임기"],
      benefit: "정품 AS 보장 및 중고 거래 신뢰"
    },
    {
      category: "의약품",
      emoji: "💊",
      items: ["처방약", "일반의약품", "백신", "의료기기", "영양제"],
      benefit: "위조 의약품 차단으로 생명 보호"
    }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      {/* Neon background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute inset-x-0 bottom-[-20rem] mx-auto h-96 w-[40rem] rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Header */}
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
            <Link href="/about" className="text-sm text-purple-400 font-semibold">
              About
            </Link>
            <Link href="/roadmap" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Roadmap
            </Link>
            <Link href="/faq" className="text-sm text-slate-400 hover:text-purple-400 transition">
              FAQ
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 border border-indigo-500/40 px-4 py-2 text-xs font-semibold text-indigo-200 mb-6">
            <span>🌐</span>
            <span>About KAUS Coin</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            블록체인으로 세상의 모든 상품을<br />투명하게 추적합니다
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            KAUS Coin은 패션, 식품, 전자제품, 의약품 등 전 세계 모든 상품의 유통 과정을 블록체인에 기록하여
            정품을 보증하고 소비자를 보호하는 글로벌 플랫폼입니다.
          </p>
        </div>

        {/* Vision Statement */}
        <section className="mb-16 rounded-3xl border border-indigo-500/50 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-950 p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">우리의 비전</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              2030년까지 100개국 이상에서 10억 개 이상의 상품을 추적하는 글로벌 표준이 되겠습니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-400 mb-2">$0</div>
              <p className="text-sm text-slate-400">소비자 스캔 수수료<br />(완전 무료)</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">98%</div>
              <p className="text-sm text-slate-400">위조품 차단률<br />(AI 검증)</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-400 mb-2">24/7</div>
              <p className="text-sm text-slate-400">실시간 추적<br />(글로벌 네트워크)</p>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">핵심 기술</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6 hover:border-indigo-500/50 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.tech.map((tech, i) => (
                    <span key={i} className="rounded-full bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 text-xs text-indigo-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">적용 분야</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{useCase.emoji}</span>
                  <h3 className="text-xl font-semibold text-slate-100">{useCase.category}</h3>
                </div>
                <ul className="space-y-2 mb-4">
                  {useCase.items.map((item, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                      <span className="text-indigo-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-3">
                  <p className="text-xs text-indigo-200 font-medium">💡 {useCase.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Competitive Advantage */}
        <section className="mb-16 rounded-3xl border border-purple-500/50 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-12">
          <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">경쟁사 대비 우위</h2>
          
          <div className="mb-8 overflow-hidden rounded-2xl border border-slate-800/80">
            <table className="min-w-full">
              <thead className="bg-slate-950/95 border-b border-slate-800/80">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-100">프로젝트</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-100">주요 분야</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-100">강점</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-100">시가총액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {competitors.map((comp, idx) => (
                  <tr key={idx} className="bg-slate-950/50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-200">{comp.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{comp.focus}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{comp.strength}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{comp.marketCap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/70 p-6">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">✅ KAUS의 차별점</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">▸</span>
                  <span><strong>저렴한 수수료:</strong> VeChain보다 70% 낮은 트랜잭션 비용</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">▸</span>
                  <span><strong>소비자 우선:</strong> B2C 앱에 집중 (경쟁사는 B2B만)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">▸</span>
                  <span><strong>멀티체인:</strong> 3개 이상 블록체인 동시 지원</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">▸</span>
                  <span><strong>AI 통합:</strong> 이미지 분석 위조품 탐지 기술</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">▸</span>
                  <span><strong>NFT 통합:</strong> 한정판 상품 디지털 소유권</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-rose-500/30 bg-slate-950/70 p-6">
              <h3 className="text-lg font-semibold text-rose-400 mb-4">⚠️ 해결할 과제</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">▸</span>
                  <span><strong>브랜드 파트너십:</strong> 글로벌 기업들과의 협력 필요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">▸</span>
                  <span><strong>하드웨어 비용:</strong> NFC 태그 대량 생산 단가 절감</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">▸</span>
                  <span><strong>사용자 교육:</strong> QR 스캔 문화 확산 필요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">▸</span>
                  <span><strong>규제 대응:</strong> 각국 법규 준수 체계 구축</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">함께 만들어갈 미래</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            KAUS Coin은 위조품 없는 투명한 세상을 만들기 위해 노력합니다.<br />
            지금 바로 커뮤니티에 참여하세요.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/roadmap" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.6)] transition hover:shadow-[0_0_50px_rgba(99,102,241,0.8)]">
              <span>로드맵 보기</span>
              <span>→</span>
            </Link>
            <Link href="/faq" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/40 px-8 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-cyan-400/80 hover:bg-slate-900/80">
              <span>FAQ 확인</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
