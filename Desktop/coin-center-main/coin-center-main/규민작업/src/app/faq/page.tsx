import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      category: "기본 정보",
      questions: [
        {
          q: "KAUS Coin은 무엇인가요?",
          a: "KAUS Coin은 블록체인 기반의 글로벌 상품 추적 및 정품인증 플랫폼입니다. 패션, 식품, 전자제품, 의약품 등 전 세계 모든 상품의 유통 과정을 투명하게 기록하고, QR/NFC 기술로 정품을 보증합니다."
        },
        {
          q: "어떻게 KAUS Coin을 구매할 수 있나요?",
          a: "KAUS Coin은 2026년 Q2에 주요 탈중앙화 거래소(DEX)인 Uniswap, PancakeSwap 등에 상장될 예정입니다. 메타마스크나 다른 Web3 지갑을 연결한 후 ETH 또는 USDT로 교환하실 수 있습니다."
        },
        {
          q: "어떤 상품들을 추적할 수 있나요?",
          a: "패션(의류, 화장품, 악세사리), 식품(유기농 농산물, 수입 식품), 전자제품(스마트폰, 노트북), 의약품(처방약, 건강기능식품) 등 거의 모든 물리적 상품을 추적할 수 있습니다."
        },
        {
          q: "KAUS Coin의 총 공급량은 얼마인가요?",
          a: "KAUS Coin의 총 공급량은 1억 개로 제한되어 있습니다. 이 중 40%는 유동성 풀에, 30%는 스테이킹 리워드에, 20%는 팀과 개발에, 10%는 마케팅에 할당됩니다."
        }
      ]
    },
    {
      category: "공급망 추적 & 정품인증",
      questions: [
        {
          q: "정품 인증은 어떻게 작동하나요?",
          a: "각 상품에는 고유한 QR 코드 또는 NFC 태그가 부착되며, 이는 블록체인에 저장된 상품 정보와 연결됩니다. 스마트폰으로 스캔하면 즉시 생산지, 유통 경로, 정품 여부를 확인할 수 있습니다."
        },
        {
          q: "위조품은 어떻게 차단하나요?",
          a: "AI 이미지 분석 기술로 상품 사진을 분석하여 가짜를 탐지하고, 블록체인의 위변조 불가능한 특성으로 정품 기록을 보호합니다. 98% 이상의 정확도를 자랑합니다."
        },
        {
          q: "QR 스캔하면 보상을 받나요?",
          a: "네! 정품 상품의 QR/NFC를 스캔하면 KAUS 토큰을 리워드로 받습니다. 또한 구매 후 리뷰를 작성하거나 친구를 추천하면 추가 보상이 제공됩니다."
        },
        {
          q: "브랜드/제조사는 어떻게 참여하나요?",
          a: "제조사는 KAUS 플랫폼에 등록하고 상품마다 블록체인 ID를 발급받습니다. 저렴한 수수료로 위조품 방지와 브랜드 가치 보호가 가능하며, VeChain 대비 70% 저렴합니다."
        },
        {
          q: "어떤 블록체인을 사용하나요?",
          a: "Ethereum, Polygon, BSC 등 여러 블록체인을 동시에 지원하는 크로스체인 솔루션입니다. 확장성과 저렴한 수수료를 동시에 확보했습니다."
        }
      ]
    },
    {
      category: "스테이킹 & 수익",
      questions: [
        {
          q: "스테이킹 APY는 얼마인가요?",
          a: "현재 KAUS 스테이킹 APY는 68.5%입니다. APY는 총 스테이킹량과 네트워크 활동에 따라 변동될 수 있으며, 실시간 정보는 Yield 페이지에서 확인하실 수 있습니다."
        },
        {
          q: "스테이킹 보상은 언제 받나요?",
          a: "스테이킹 보상은 매 블록마다 자동으로 계산되며, 실시간으로 누적됩니다. 언제든지 보상을 청구(claim)하거나 자동 재투자(auto-compound) 옵션을 활성화할 수 있습니다."
        },
        {
          q: "언스테이킹 시 락업 기간이 있나요?",
          a: "언스테이킹 요청 후 7일의 대기 기간이 있습니다. 이는 네트워크 보안을 강화하고 급격한 유동성 변동을 방지하기 위한 조치입니다."
        }
      ]
    },
    {
      category: "거버넌스",
      questions: [
        {
          q: "거버넌스 투표에 어떻게 참여하나요?",
          a: "KAUS 토큰을 보유하고 있다면 자동으로 투표권을 갖게 됩니다. Governance 페이지에서 활성 제안을 확인하고 투표할 수 있습니다. 1 KAUS = 1 투표권입니다."
        },
        {
          q: "제안을 직접 올릴 수 있나요?",
          a: "10,000 KAUS 이상을 보유한 사용자는 제안을 올릴 수 있습니다. 제안은 최소 3일간의 토론 기간을 거친 후 7일간 투표가 진행됩니다."
        },
        {
          q: "투표 결과는 어떻게 집행되나요?",
          a: "통과된 제안(찬성 60% 이상, 쿼럼 10% 이상)은 48시간 타임락 후 스마트 컨트랙트를 통해 자동으로 집행됩니다."
        }
      ]
    },
    {
      category: "보안 & 기술",
      questions: [
        {
          q: "KAUS Coin의 보안은 어떻게 보장되나요?",
          a: "모든 스마트 컨트랙트는 CertiK, PeckShield 등 업계 최고 수준의 보안 감사를 받았습니다. 또한 멀티시그 지갑, 타임락, 비상 정지 메커니즘 등 다층 보안 시스템을 갖추고 있습니다."
        },
        {
          q: "어떤 블록체인에서 작동하나요?",
          a: "KAUS Coin은 Ethereum 메인넷에서 시작하여, Polygon, Arbitrum, BSC 등 주요 EVM 호환 체인으로 확장되고 있습니다. 크로스체인 브릿지를 통해 여러 네트워크 간 자유롭게 이동할 수 있습니다."
        },
        {
          q: "스마트 컨트랙트 주소는 어디서 확인하나요?",
          a: "모든 공식 컨트랙트 주소는 웹사이트 하단과 공식 문서에 공개되어 있습니다. 반드시 공식 채널에서 확인한 주소만 사용하시기 바랍니다."
        }
      ]
    },
    {
      category: "지원 & 커뮤니티",
      questions: [
        {
          q: "문제가 발생했을 때 어디에 문의하나요?",
          a: "Discord, Telegram 공식 채널에서 24시간 커뮤니티 지원을 받으실 수 있습니다. 기술적 문제는 GitHub Issues에, 일반 문의는 support@kaus.io로 연락 주시기 바랍니다."
        },
        {
          q: "KAUS 커뮤니티는 어디서 참여할 수 있나요?",
          a: "Discord, Telegram, Twitter에서 활발한 커뮤니티가 운영되고 있습니다. 정기적인 AMA, 이벤트, 에어드랍 등 다양한 활동이 진행됩니다."
        },
        {
          q: "파트너십이나 협업 제안은 어떻게 하나요?",
          a: "partnerships@kaus.io로 제안서를 보내주시기 바랍니다. 검토 후 1주일 내에 회신 드리겠습니다."
        }
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
            자주 묻는 질문 (FAQ)
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            KAUS Coin에 대해 궁금하신 점들을 확인해보세요. 더 많은 정보가 필요하시면 언제든 문의해주세요.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
                <span className="h-1 w-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></span>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => (
                  <details
                    key={qIndex}
                    className="group rounded-2xl border border-slate-800/80 bg-slate-950/80 overflow-hidden hover:border-purple-500/50 transition"
                  >
                    <summary className="cursor-pointer px-6 py-5 font-semibold text-slate-100 flex items-center justify-between list-none">
                      <span className="flex-1 text-left">{faq.q}</span>
                      <svg
                        className="h-5 w-5 text-purple-400 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 pt-2 text-slate-300 leading-relaxed border-t border-slate-800/50">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center rounded-2xl border border-purple-500/30 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-4">답변을 찾지 못하셨나요?</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            커뮤니티에 질문하시거나 지원팀에 직접 문의해주세요. 언제나 도와드리겠습니다!
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/60 bg-purple-500/20 px-6 py-3 text-sm font-semibold text-purple-50 hover:bg-purple-500/30 transition"
            >
              <span>💬</span>
              Discord 참여하기
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/60 bg-cyan-500/20 px-6 py-3 text-sm font-semibold text-cyan-50 hover:bg-cyan-500/30 transition"
            >
              <span>✉️</span>
              이메일 문의
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
