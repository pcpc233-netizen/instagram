import { useState, useEffect } from 'react';
import {
  LayoutTemplate, Sparkles, ImagePlus, Share2,
  ArrowRight, Download, Zap, Globe, Check,
} from 'lucide-react';
import { CardNewsApp } from './cardnews/CardNewsApp';
import { TEMPLATE_MAP } from './cardnews/templates';

/* ─── demo data for template previews ─── */
const DEMO_SLIDE = {
  id: 'demo',
  type: 'cover' as const,
  title: '오늘의\n핵심 트렌드',
  body: '당신이 놓친 정보를\n한눈에 정리했어요',
};

const TEMPLATES: Array<{
  id: keyof typeof TEMPLATE_MAP;
  accent: string;
  label: string;
}> = [
  { id: 'minimal-white', accent: '#6366f1', label: '미니멀 화이트' },
  { id: 'dark-premium',  accent: '#a78bfa', label: '다크 프리미엄' },
  { id: 'pastel-soft',   accent: '#ec4899', label: '파스텔 소프트' },
  { id: 'bold-type',     accent: '#f97316', label: '볼드 타입'     },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI 카피 자동 생성',
    desc: '주제 한 줄로 전체 슬라이드 내용을\nClaude AI가 자동 작성합니다.',
    color: '#818cf8',
    bg: 'rgba(99,102,241,0.1)',
  },
  {
    icon: Globe,
    title: '블로그 URL 변환',
    desc: '티스토리·네이버·브런치 URL만\n붙여도 카드뉴스로 자동 변환됩니다.',
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.1)',
  },
  {
    icon: ImagePlus,
    title: 'AI 배경 이미지',
    desc: 'DALL-E 3로 슬라이드에 맞는\n고퀄 배경을 자동 생성합니다.',
    color: '#c084fc',
    bg: 'rgba(192,132,252,0.1)',
  },
  {
    icon: Download,
    title: '1080px 고화질 저장',
    desc: '인스타그램 최적화 사이즈로\n전체 슬라이드를 ZIP으로 저장합니다.',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
  },
  {
    icon: Share2,
    title: 'Buffer 원클릭 발행',
    desc: '완성된 카드뉴스를 Buffer로\n바로 예약·발행합니다.',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
  },
  {
    icon: Zap,
    title: '4종 프리미엄 템플릿',
    desc: '미니멀·다크·파스텔·볼드 등\n완성도 높은 디자인을 제공합니다.',
    color: '#fb7185',
    bg: 'rgba(251,113,133,0.1)',
  },
];

const STEPS = [
  {
    num: '01',
    title: '주제 or URL 입력',
    desc: '키워드를 입력하거나\n블로그 URL을 붙여넣으세요',
    color: '#6366f1',
  },
  {
    num: '02',
    title: 'AI 자동 완성',
    desc: 'Claude AI가 전체 슬라이드\n내용을 자동으로 작성합니다',
    color: '#8b5cf6',
  },
  {
    num: '03',
    title: '저장 & 발행',
    desc: '1080px PNG로 저장하거나\nBuffer로 바로 발행하세요',
    color: '#06b6d4',
  },
];

/* ─── Landing page component ─── */
function LandingPage({ onStart }: { onStart: () => void }) {
  const THUMB = 260;
  const scale = THUMB / 1080;

  return (
    <div
      style={{ background: '#06060c' }}
      className="min-h-screen text-white overflow-x-hidden"
    >
      {/* ── NAV ── */}
      <nav
        style={{ background: 'rgba(6,6,12,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
            <LayoutTemplate size={17} className="text-white" />
          </div>
          <span className="font-black text-xl tracking-tight">CardFlow</span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full ml-1"
            style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)' }}
          >
            AI
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStart}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            에디터 열기
          </button>
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
            }}
          >
            무료로 시작
            <ArrowRight size={13} />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 px-8 flex flex-col items-center text-center overflow-hidden">
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{
            position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
            width: 900, height: 500,
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }} />
          <div style={{
            position: 'absolute', top: '30%', left: '20%',
            width: 400, height: 300,
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
        </div>

        {/* badge */}
        <div
          className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-8"
          style={{
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.28)',
            color: '#818cf8',
          }}
        >
          <Sparkles size={13} />
          Claude AI 기반 카드뉴스 자동화
        </div>

        {/* headline */}
        <h1 className="relative font-black tracking-tighter leading-[1.05] mb-6 max-w-4xl"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
          <span style={{
            background: 'linear-gradient(160deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            인스타 카드뉴스,
          </span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #fb7185 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            AI가 5분에 완성
          </span>
        </h1>

        <p className="relative text-xl leading-relaxed mb-10 max-w-2xl"
          style={{ color: 'rgba(255,255,255,0.45)' }}>
          주제 입력 하나로 Claude AI가 전체 슬라이드를 작성하고,<br />
          1080px 고화질 PNG 저장 또는 Buffer 자동 발행까지.
        </p>

        {/* CTA buttons */}
        <div className="relative flex flex-wrap items-center justify-center gap-4 mb-6">
          <button
            onClick={onStart}
            className="flex items-center gap-2.5 px-9 py-4 rounded-2xl text-white font-bold text-lg transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
            }}
          >
            <Sparkles size={18} />
            지금 무료로 시작
          </button>
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-9 py-4 rounded-2xl font-semibold text-lg transition-all hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            에디터 둘러보기
            <ArrowRight size={16} />
          </button>
        </div>

        {/* trust badges */}
        <div className="flex items-center gap-6" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
          {['설치 불필요', '회원가입 없음', '즉시 사용 가능'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check size={12} style={{ color: '#34d399' }} />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── TEMPLATE GALLERY ── */}
      <section className="px-8 pb-24 max-w-5xl mx-auto">
        <p className="text-center text-sm font-semibold tracking-widest uppercase mb-8"
          style={{ color: 'rgba(255,255,255,0.2)' }}>
          4가지 프리미엄 템플릿
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TEMPLATES.map(({ id, accent, label }) => {
            const Tpl = TEMPLATE_MAP[id];
            return (
              <button
                key={id}
                onClick={onStart}
                className="group relative rounded-2xl overflow-hidden transition-all hover:-translate-y-2 text-left"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* template thumbnail */}
                <div style={{ width: THUMB, height: THUMB, overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: 1080, height: 1080,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                  }}>
                    <Tpl
                      slide={DEMO_SLIDE}
                      index={0}
                      total={4}
                      brandName="@cardflow"
                      accentColor={accent}
                    />
                  </div>
                </div>
                {/* hover overlay */}
                <div
                  className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
                >
                  <span className="text-white text-xs font-semibold">{label}</span>
                </div>
                {/* glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${accent}66` }}
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-8 pb-24 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="font-black tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem,4vw,2.75rem)' }}
          >
            필요한 모든 기능이
            <span style={{
              background: 'linear-gradient(135deg,#818cf8,#c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}> 한 곳에</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 17 }}>
            기획부터 발행까지, 카드뉴스 제작의 전 과정을 자동화합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{
                background: bg,
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${color}22` }}
              >
                <Icon size={21} style={{ color }} />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
              <p className="text-sm leading-relaxed whitespace-pre-wrap"
                style={{ color: 'rgba(255,255,255,0.45)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-8 pb-24 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="font-black tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem,4vw,2.75rem)' }}
          >
            <span style={{
              background: 'linear-gradient(135deg,#22d3ee,#6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>3단계</span>로 끝나는 카드뉴스
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map(({ num, title, desc, color }, i) => (
            <div key={num} className="relative flex flex-col items-center text-center">
              {/* connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute top-10 left-[calc(50%+52px)] right-0 h-px"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                />
              )}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl mb-5"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                  color,
                }}
              >
                {num}
              </div>
              <h3 className="font-bold text-xl text-white mb-2">{title}</h3>
              <p className="text-sm leading-relaxed whitespace-pre-wrap"
                style={{ color: 'rgba(255,255,255,0.4)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-8 pb-32 max-w-3xl mx-auto">
        <div
          className="relative rounded-3xl p-16 text-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}
        >
          {/* glow */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 240, height: 240,
            background: 'radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)',
          }} />

          <h2
            className="relative font-black tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)' }}
          >
            지금 바로 시작하세요
          </h2>
          <p className="relative text-lg mb-10"
            style={{ color: 'rgba(255,255,255,0.45)' }}>
            설치 없이, 회원가입 없이.<br />브라우저에서 바로 사용 가능합니다.
          </p>
          <button
            onClick={onStart}
            className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold text-lg transition-all hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              boxShadow: '0 12px 40px rgba(99,102,241,0.4)',
            }}
          >
            <Sparkles size={20} />
            무료로 카드뉴스 만들기
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 px-8 text-center text-sm"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.18)' }}
      >
        CardFlow — AI 기반 인스타그램 카드뉴스 자동화 툴
      </footer>
    </div>
  );
}

/* ─── Root app with routing ─── */
function App() {
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    const handle = () => {
      setShowEditor(window.location.hash.slice(1) === 'cardnews');
    };
    handle();
    window.addEventListener('hashchange', handle);
    return () => window.removeEventListener('hashchange', handle);
  }, []);

  const openEditor = () => {
    window.location.hash = 'cardnews';
    setShowEditor(true);
  };

  if (showEditor) {
    return (
      <CardNewsApp
        onBack={() => {
          window.location.hash = '';
          setShowEditor(false);
        }}
      />
    );
  }

  return <LandingPage onStart={openEditor} />;
}

export default App;
