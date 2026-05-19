# CardFlow 배포 & 결제 연동 가이드

> 이 가이드를 순서대로 따라하면 CardFlow를 실제 서비스로 런칭할 수 있습니다.

---

## 목차

1. [아키텍처 결정](#1-아키텍처-결정)
2. [백엔드 API 서버 분리](#2-백엔드-api-서버-분리)
3. [Supabase 데이터베이스 설정](#3-supabase-데이터베이스-설정)
4. [Vercel 배포](#4-vercel-배포)
5. [도메인 연결](#5-도메인-연결)
6. [토스페이먼츠 결제 연동](#6-토스페이먼츠-결제-연동)
7. [구독 플랜 설계](#7-구독-플랜-설계)
8. [앱 배포 (선택)](#8-앱-배포-선택)
9. [런칭 체크리스트](#9-런칭-체크리스트)

---

## 1. 아키텍처 결정

현재 구조와 배포 후 구조를 먼저 이해하세요.

```
[현재 로컬]                    [배포 후]
────────────────               ────────────────────────────
React 앱 (5174)       →       Vercel (프론트엔드)
Express API (5175)    →       Vercel Serverless Functions
.env (로컬)           →       Vercel 환경변수
```

**핵심:** Express `api-server.mjs`의 각 라우트를 Vercel Serverless Function으로 변환해야 합니다.

---

## 2. 백엔드 API 서버 분리

### 2-1. Vercel Serverless Function 파일 구조 만들기

```
프로젝트 루트/
├── api/                          ← 이 폴더를 새로 만듦
│   ├── cardnews/
│   │   ├── generate.ts           ← /api/cardnews/generate
│   │   ├── generate-image.ts     ← /api/cardnews/generate-image
│   │   ├── from-url.ts           ← /api/cardnews/from-url
│   └── payments/
│       ├── confirm.ts            ← 결제 확인
│       └── webhook.ts            ← 토스 웹훅
```

### 2-2. 패키지 설치

```bash
npm install @vercel/node node-fetch cheerio
```

### 2-3. vercel.json 생성 (루트에)

```json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 60
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}
```

### 2-4. api/cardnews/generate.ts 예시

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  // ... api-server.mjs의 /api/cardnews/generate 로직 그대로 이동
}
```

> **팁:** `api-server.mjs`의 각 `app.post('/api/cardnews/...')` 핸들러 내용을
> 각 파일의 `handler` 함수 안으로 복사하면 됩니다.

---

## 3. Supabase 데이터베이스 설정

Supabase는 이미 `.env`에 키가 있습니다. 테이블만 만들면 됩니다.

### 3-1. Supabase 대시보드 접속

1. [supabase.com](https://supabase.com) 로그인
2. 프로젝트 선택 → **SQL Editor** 클릭

### 3-2. 필요한 테이블 생성 (SQL 복사 후 실행)

```sql
-- 사용자 플랜 관리
CREATE TABLE user_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free',          -- 'free' | 'starter' | 'pro'
  status TEXT NOT NULL DEFAULT 'active',      -- 'active' | 'cancelled' | 'expired'
  payment_key TEXT,                           -- 토스 결제키
  order_id TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 사용량 추적 (API 호출 횟수)
CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,    -- 'generate_copy' | 'generate_image' | 'from_url'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- 정책: 본인 데이터만 읽기
CREATE POLICY "본인 플랜 읽기" ON user_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "본인 사용량 읽기" ON usage_logs FOR SELECT USING (auth.uid() = user_id);
```

### 3-3. Supabase Auth 설정

1. Supabase 대시보드 → **Authentication** → **Providers**
2. **Email** 활성화 (기본 활성화되어 있음)
3. **Google** 활성화 → Google Cloud Console에서 OAuth 클라이언트 ID 발급 후 입력
4. **Site URL** 설정: `https://your-domain.com`

---

## 4. Vercel 배포

### 4-1. GitHub에 코드 올리기

```bash
git init
git add .
git commit -m "CardFlow 초기 배포"
git remote add origin https://github.com/YOUR_USERNAME/cardflow.git
git push -u origin main
```

### 4-2. Vercel 연결

1. [vercel.com](https://vercel.com) → **Add New Project**
2. GitHub 저장소 선택
3. **Framework Preset**: Vite 선택
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`

### 4-3. 환경변수 설정 (중요!)

Vercel 프로젝트 → **Settings** → **Environment Variables** 에서 추가:

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | Claude API |
| `OPENAI_API_KEY` | `sk-proj-...` | 이미지 생성 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL | DB |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | DB |
| `SUPABASE_SERVICE_KEY` | Supabase service key | 서버전용 |
| `TOSS_SECRET_KEY` | `test_sk_...` | 토스 결제 |
| `TOSS_CLIENT_KEY` | `test_ck_...` | 토스 결제 |

### 4-4. 배포 확인

- 환경변수 저장 후 **Redeploy**
- `https://your-project.vercel.app` 접속 확인

---

## 5. 도메인 연결

### 5-1. 도메인 구매

추천 레지스트라:
- **가비아** (한국): gabia.com — `.com` 약 15,000원/년
- **Namecheap** (해외): namecheap.com — `.com` 약 $10/년

### 5-2. Vercel에 도메인 추가

1. Vercel 프로젝트 → **Settings** → **Domains**
2. 구매한 도메인 입력 (예: `cardflow.kr`)
3. 표시되는 **DNS 레코드** 복사

### 5-3. 도메인 DNS 설정

가비아 기준:
1. 가비아 로그인 → **도메인 관리** → **DNS 설정**
2. Vercel이 알려준 값 입력:
   ```
   타입: A     호스트: @    값: 76.76.21.21
   타입: CNAME 호스트: www  값: cname.vercel-dns.com
   ```
3. 저장 후 최대 24시간 대기 (보통 30분~1시간)

---

## 6. 토스페이먼츠 결제 연동

### 6-1. 토스페이먼츠 가입

1. [토스페이먼츠 개발자센터](https://developers.tosspayments.com) 접속
2. 회원가입 → **내 개발정보** 에서 키 확인
   - `클라이언트 키`: `test_ck_...` (프론트엔드)
   - `시크릿 키`: `test_sk_...` (서버)

> **테스트 모드**로 시작해서 결제 흐름을 먼저 테스트하세요.

### 6-2. 패키지 설치

```bash
npm install @tosspayments/payment-sdk
```

### 6-3. 결제 흐름 이해

```
사용자 "결제하기" 클릭
        ↓
토스 결제창 팝업 (프론트)
        ↓
결제 성공 → 토스가 /success?paymentKey=...&orderId=...로 리다이렉트
        ↓
서버에서 결제 최종 확인 (POST /api/payments/confirm)
        ↓
Supabase user_plans 업데이트
        ↓
사용자에게 성공 화면
```

### 6-4. 프론트엔드 결제 버튼 (예시)

```typescript
// src/components/PaymentButton.tsx
import { loadTossPayments } from '@tosspayments/payment-sdk';

async function handlePayment(plan: 'starter' | 'pro') {
  const tossPayments = await loadTossPayments(import.meta.env.VITE_TOSS_CLIENT_KEY);
  
  const amount = plan === 'starter' ? 9900 : 29900;
  const orderId = `order_${Date.now()}`;
  
  await tossPayments.requestPayment('카드', {
    amount,
    orderId,
    orderName: `CardFlow ${plan === 'starter' ? '스타터' : '프로'} 월정기결제`,
    successUrl: `${window.location.origin}/payment/success`,
    failUrl: `${window.location.origin}/payment/fail`,
    customerEmail: userEmail,
    customerName: userName,
  });
}
```

### 6-5. 서버 결제 확인 (api/payments/confirm.ts)

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { paymentKey, orderId, amount } = req.body;

  // 1. 토스에 최종 승인 요청
  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });

  const payment = await response.json();
  if (!response.ok) return res.status(400).json({ error: payment.message });

  // 2. Supabase에 플랜 업데이트
  // supabaseAdmin.from('user_plans').upsert({ user_id, plan, payment_key: paymentKey, ... })

  res.json({ success: true });
}
```

### 6-6. 실제 결제 전환 (라이브)

1. 토스페이먼츠 대시보드 → **비즈니스 정보** 등록 (사업자 or 개인)
2. 심사 통과 후 **라이브 키** 발급
3. Vercel 환경변수에서 `test_sk_` → `live_sk_` 로 교체

---

## 7. 구독 플랜 설계

### 추천 플랜 구조

| 항목 | 무료 | 스타터 (9,900원/월) | 프로 (29,900원/월) |
|------|------|---------------------|---------------------|
| 카드뉴스 생성 | 월 3회 | 월 30회 | 무제한 |
| AI 카피 생성 | ✅ | ✅ | ✅ |
| AI 배경 이미지 | ❌ | ✅ | ✅ |
| 템플릿 수 | 4개 | 전체 | 전체 |
| URL → 카드뉴스 | ❌ | ✅ | ✅ |
| 폰트 업로드 | ❌ | ❌ | ✅ |
| ZIP 다운로드 | ❌ | ✅ | ✅ |

### 사용량 제한 구현 (간단 버전)

```typescript
// API 호출 전 사용량 확인
async function checkUsageLimit(userId: string, action: string) {
  const startOfMonth = new Date();
  startOfMonth.setDate(1); startOfMonth.setHours(0,0,0,0);
  
  const { count } = await supabase
    .from('usage_logs')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .eq('action', action)
    .gte('created_at', startOfMonth.toISOString());
  
  const plan = await getUserPlan(userId);
  const limit = { free: 3, starter: 30, pro: Infinity }[plan];
  
  if (count >= limit) throw new Error('월 사용량 초과. 플랜을 업그레이드하세요.');
}
```

---

## 8. 앱 배포 (선택)

웹앱을 모바일 앱으로 변환하는 두 가지 방법:

### 방법 A: Capacitor (웹 → 앱, 쉬움)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init CardFlow com.yourcompany.cardflow
npm run build
npx cap add ios      # Mac 필요
npx cap add android
npx cap sync
npx cap open android  # Android Studio 열림
npx cap open ios      # Xcode 열림
```

### 방법 B: PWA (앱처럼 설치, 가장 쉬움)

```bash
npm install vite-plugin-pwa
```

`vite.config.ts`에 추가:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

plugins: [
  VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'CardFlow',
      short_name: 'CardFlow',
      theme_color: '#6366f1',
      icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }]
    }
  })
]
```

→ 배포 후 모바일 브라우저에서 "홈 화면에 추가" 가능

### 앱스토어 등록 비용

| 스토어 | 비용 | 심사 기간 |
|--------|------|-----------|
| App Store (iOS) | $99/년 | 1~3일 |
| Google Play (Android) | $25 일회성 | 수시간 |

---

## 9. 런칭 체크리스트

### 기술

- [ ] Vercel 배포 완료 및 접속 확인
- [ ] 모든 API 엔드포인트 Vercel Function으로 변환
- [ ] 환경변수 전체 등록 확인
- [ ] Supabase Auth 작동 확인 (회원가입/로그인)
- [ ] 토스페이먼츠 테스트 결제 성공
- [ ] 토스페이먼츠 라이브 키로 전환
- [ ] 도메인 연결 및 HTTPS 확인

### 사업

- [ ] 개인정보처리방침 페이지 추가 (필수)
- [ ] 이용약관 페이지 추가 (필수)
- [ ] 사업자 등록 (연 매출 1,200만원 이상이면 필요)
- [ ] 토스페이먼츠 사업자 심사 통과
- [ ] 고객 문의 채널 (이메일 또는 카카오채널)

### 마케팅

- [ ] 인스타그램 계정 개설 (서비스 홍보)
- [ ] 랜딩 페이지 완성
- [ ] 무료 플랜으로 초기 사용자 확보
- [ ] 인플루언서/패션 브랜드 DM 영업

---

## 빠른 시작 순서 (최단 경로)

```
1일차: GitHub 업로드 + Vercel 배포 (무료)
2일차: Supabase 테이블 생성 + Auth 연동
3일차: API 서버 → Vercel Function 변환
4일차: 토스페이먼츠 테스트 결제
5일차: 도메인 연결 + 개인정보처리방침
6일차: 토스 라이브 키 전환 → 런칭!
```

---

*문의: 각 단계에서 막히는 부분이 있으면 Claude Code에게 바로 물어보세요.*
