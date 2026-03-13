# NAMONEYGOAL Franchise OS Blueprint v1.0

> **글로벌 엘리트 프랜차이즈 전산 벤치마킹 → 12슬롯 부동산 길드 OS 개발 계획서**
> 작성일: 2026-03-13

---

## 1. 벤치마킹 요약: 글로벌 1위들은 뭘 하고 있나

### 1-1. Keller Williams — Command (오픈 플랫폼 전환)

| 항목 | 내용 |
|------|------|
| 규모 | 미국 1위, 161,000+ 에이전트, 1,000+ 오피스 |
| 핵심 플랫폼 | **KW Command** — CRM + 마케팅 + 자동화 올인원 |
| AI | **KWIQ** — 생성형 AI 어시스턴트 (콘텐츠, 인사이트, 프로세스 자동화) |
| 2026 전환 | Command를 **오픈 플랫폼**으로 전환. 서드파티 앱 마켓플레이스 (KW MarketPlace) 론칭 |
| 수치 | 월간 활성 유저 138,000명, 저장된 연락처 1.04억 건 |

**차용 포인트**: 자체 구축 → 오픈 플랫폼 전환 패턴. 우리도 core 모듈을 플러그인화해서 슬롯별 확장 가능하게.

### 1-2. eXp Realty — 가상 오피스 선구자

| 항목 | 내용 |
|------|------|
| 규모 | 81,000+ 에이전트, 27개국, **물리적 오피스 없음** |
| 핵심 플랫폼 | **eXp World** — 3D 메타버스 캠퍼스 (주간 40시간+ 라이브 교육) |
| CRM | 에이전트가 BoldTrail/Cloze/Lofty 중 선택 (월비에 포함) |
| 수익 모델 | 레비뉴 쉐어링 + 주식 인센티브 |

**차용 포인트**: "오피스 없는 브로커리지" = 우리의 "디지털 사무실" 컨셉과 정확히 일치. 슬롯 = 가상 오피스.

### 1-3. Compass + Anywhere ($10B 합병)

| 항목 | 내용 |
|------|------|
| 규모 | 합병 후 340,000 에이전트 (미국 최대) |
| 투자 | Compass가 10년간 $1.8B을 기술 플랫폼에 투입 |
| 의미 | 기술 플랫폼 없는 브로커리지는 생존 불가 시대 |

**차용 포인트**: 기술이 곧 해자(moat). 소규모라도 "기술 우선"이면 하이퍼로컬 니치에서 승리 가능.

### 1-4. 한국 프롭테크 (직방/다방/네이버부동산)

| 플랫폼 | 핵심 기술 |
|---------|----------|
| 직방 | 디지털 트윈 3D 투어, AI 빅데이터 (직방RED), NLP 리뷰 분석, 스마트홈 IoT |
| 다방 | VR/360도 매물 보기, 생성형 AI 매물 설명 자동 작성, 블록체인 전자 계약 |
| 호갱노노 | 실거래가 투명성, 수익률 분석, 커뮤니티 |

**차용 포인트**: 한국 시장은 소비자향 플랫폼은 포화. **중개인향 운영 시스템**은 공백 → 이것이 나몬이골의 기회.

### 1-5. 프랜차이즈 관리 소프트웨어 표준 기능셋

| 카테고리 | 표준 기능 |
|----------|----------|
| **온보딩** | 체크리스트, 타임라인, 그랜드 오프닝 관리 |
| **교육/LMS** | 커스텀 코스, 영상 호스팅, 퀴즈, 수료 추적 |
| **운영** | 태스크 관리, 컴플라이언스 추적, 현장 감사, SOP |
| **정산/로열티** | 자동 로열티 계산, 인보이싱, 수금, 회계 연동 |
| **대시보드** | 실시간 KPI, 벤치마킹, 트렌드 분석, C-level/지역별 뷰 |
| **마케팅** | 브랜드 컴플라이언스, 콘텐츠 템플릿, 캠페인 관리 |
| **커뮤니케이션** | 중앙 메시징, 서포트 티켓 |

---

## 2. GAP 분석: 현재 레포 vs 글로벌 표준

### 현재 보유 (Already Built)

| 기능 | 상태 | 글로벌 대응 |
|------|------|-------------|
| 12슬롯 시스템 (2 활성) | ✅ 작동 | Territory Management |
| config-driven 아키텍처 | ✅ 작동 | Multi-Tenant Config |
| 디지털 명함/블로그/유튜브 | ✅ 작동 | Agent Marketing Suite |
| 콘솔 (인증+관리) | ✅ 기본 | Admin Dashboard (기초) |
| PWA + Service Worker | ✅ 작동 | Mobile App |
| Vercel 멀티도메인 | ✅ 배포됨 | Subdomain Routing |
| PR 시스템 (카카오) | ✅ UI 완성 | Support Ticket (기초) |
| 정산 보드 | ✅ UI 완성 | Billing Dashboard (기초) |

### 미보유 (Critical Gaps)

| 기능 | 중요도 | 글로벌 벤치마크 |
|------|--------|----------------|
| **온보딩 자동화** | 🔴 | FranConnect: 자동 체크리스트 + 타임라인 |
| **실시간 대시보드** | 🔴 | FranMetrics: KPI 스코어카드 + 트렌드 |
| **자동 정산/인보이싱** | 🔴 | 자동 로열티 계산 + 결제 연동 |
| **LMS (교육 시스템)** | 🟡 | Naranga: 이중언어 교육 + 수료 추적 |
| **CRM/리드 관리** | 🟡 | kvCORE: AI 행동 자동화 + 리드 라우팅 |
| **콘텐츠 신디케이션** | 🟡 | 네이버 블로그/카페 자동 포스팅 |
| **브랜드 컴플라이언스** | 🟢 | 템플릿 라이브러리 + 승인 워크플로 |
| **API 서버** | 🔴 | Serverless Functions (동적 데이터 처리) |
| **소셜 로그인** | 🟡 | 카카오/네이버 로그인 |
| **분석/리포팅** | 🟡 | 실시간 분석 + 벤치마킹 |

---

## 3. 아키텍처 설계: Franchise OS v2.0

### 3-1. 기술 스택 결정

현재의 **순수 정적 사이트 철학**을 유지하되, Serverless로 동적 기능을 보강한다.

```
┌─────────────────────────────────────────────────────────┐
│                    FRANCHISE OS v2.0                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  Static UI  │  │  Serverless │  │   Data Layer    │ │
│  │  (Vercel)   │  │  Functions  │  │                 │ │
│  │             │  │  (Vercel)   │  │                 │ │
│  │ HTML/CSS/JS │  │             │  │ Supabase        │ │
│  │ Vanilla     │  │ /api/slot   │  │ ├─ Auth (카카오)│ │
│  │ No Framework│  │ /api/billing│  │ ├─ PostgreSQL   │ │
│  │             │  │ /api/onboard│  │ ├─ Realtime     │ │
│  │ slots/      │  │ /api/crm    │  │ └─ Storage      │ │
│  │ modules/    │  │ /api/content│  │                 │ │
│  │ console/    │  │ /api/analytics│ │ KV Store        │ │
│  │ core/       │  │             │  │ (Vercel KV)     │ │
│  └──────┬──────┘  └──────┬──────┘  └────────┬────────┘ │
│         │                │                   │          │
│         └────────────────┴───────────────────┘          │
│                          │                              │
│              ┌───────────┴───────────┐                  │
│              │    External APIs      │                  │
│              │                       │                  │
│              │ ├─ KakaoTalk Channel  │                  │
│              │ ├─ Naver Blog API     │                  │
│              │ ├─ Naver Map API      │                  │
│              │ ├─ 공공데이터 API     │                  │
│              │ ├─ Toss Payments      │                  │
│              │ └─ OpenAI/Claude API  │                  │
│              └───────────────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

### 3-2. 왜 이 스택인가

| 결정 | 이유 |
|------|------|
| **Vanilla JS 유지** | 프레임워크 부채 없음. 12슬롯 규모에서 React 불필요. KW Command도 자체 스택 |
| **Vercel Serverless** | 이미 vercel.json 배포됨. Edge Functions로 API 레이어 추가만 하면 됨 |
| **Supabase** | PostgreSQL + Auth + Realtime + Storage 올인원. 무료 티어 넉넉. 카카오 OAuth 지원 |
| **Toss Payments** | 한국 결제 표준. 정기결제(빌링키) 지원. 중개인 친화적 |
| **Naver API** | 타겟(시흥 중개인)의 메인 플랫폼이 네이버. 블로그/지도 연동 필수 |

### 3-3. 디렉토리 구조 확장

```
namoneygoal/
├── index.html                    # HQ 랜딩
├── config.json                   # 마스터 설정
├── branch.json                   # 프랜차이즈 OS 프로토콜
├── registry.json                 # 멤버 레지스트리
│
├── api/                          # ← NEW: Vercel Serverless Functions
│   ├── slot/
│   │   ├── create.js             # 슬롯 생성/온보딩
│   │   ├── [id].js               # 슬롯 CRUD
│   │   └── status.js             # 슬롯 상태 조회
│   ├── billing/
│   │   ├── invoice.js            # 인보이스 생성
│   │   ├── collect.js            # Toss 정기결제
│   │   └── report.js             # 정산 리포트
│   ├── onboard/
│   │   ├── checklist.js          # 온보딩 체크리스트
│   │   └── progress.js           # 진행 상황
│   ├── crm/
│   │   ├── leads.js              # 리드 관리
│   │   ├── contacts.js           # 연락처
│   │   └── activity.js           # 활동 로그
│   ├── content/
│   │   ├── blog-sync.js          # 네이버 블로그 동기화
│   │   ├── publish.js            # 콘텐츠 발행
│   │   └── templates.js          # 템플릿 관리
│   ├── analytics/
│   │   ├── dashboard.js          # 대시보드 데이터
│   │   └── kpi.js                # KPI 계산
│   └── auth/
│       ├── login.js              # 카카오/네이버 로그인
│       └── session.js            # 세션 관리
│
├── slots/                        # 기존 유지 + 확장
│   ├── slot01/
│   │   ├── index.html            # 디지털 사무실
│   │   ├── card.html             # 디지털 명함
│   │   ├── blog.html             # 블로그
│   │   ├── video.html            # 유튜브
│   │   ├── crm.html              # ← NEW: 개인 CRM 대시보드
│   │   ├── analytics.html        # ← NEW: 내 성과 대시보드
│   │   └── config.json
│   └── ...
│
├── modules/                      # 기존 유지 + 확장
│   ├── card.html
│   ├── blog.html
│   ├── video.html
│   ├── walkie.html
│   ├── pr.js
│   ├── onboard.html              # ← NEW: 온보딩 위자드
│   ├── crm.html                  # ← NEW: CRM 모듈
│   ├── analytics.html            # ← NEW: 분석 모듈
│   └── lms.html                  # ← NEW: 교육 모듈
│
├── console/                      # 기존 유지 + 확장
│   ├── index.html
│   ├── requests.html
│   ├── billing.html
│   ├── onboard-mgr.html          # ← NEW: 온보딩 관리
│   ├── kpi-board.html            # ← NEW: KPI 스코어카드
│   ├── compliance.html           # ← NEW: 브랜드 컴플라이언스
│   └── members.html              # ← NEW: 멤버 관리
│
├── core/                         # 기존 유지 + 확장
│   ├── auth/
│   │   ├── console-gate.js
│   │   └── oauth.js              # ← NEW: 카카오/네이버 OAuth
│   ├── config/loader.js
│   ├── crm/                      # ← NEW
│   │   ├── lead-engine.js        # 리드 엔진
│   │   └── contact-sync.js       # 연락처 동기화
│   ├── billing/                   # ← NEW
│   │   ├── invoicer.js           # 인보이스 생성기
│   │   └── toss-client.js        # Toss Payments 클라이언트
│   ├── analytics/                 # ← NEW
│   │   ├── kpi-calc.js           # KPI 계산 엔진
│   │   └── chart-renderer.js     # 차트 렌더러
│   └── content/                   # ← NEW
│       ├── naver-sync.js         # 네이버 블로그 동기화
│       └── template-engine.js    # 콘텐츠 템플릿 엔진
│
├── db/                            # ← NEW: Supabase 스키마
│   ├── schema.sql                # 테이블 정의
│   ├── seed.sql                  # 초기 데이터
│   └── migrations/               # 마이그레이션
│
└── docs/
    ├── concept.md
    ├── architecture.md
    └── franchise-os-blueprint.md  # 이 문서
```

---

## 4. 개발 로드맵: 5 Phase

### Phase 0: 기반 정비 (1주)
> **서사**: "공장 기초 공사"

| # | 작업 | 산출물 |
|---|------|--------|
| 0-1 | Supabase 프로젝트 생성 + 스키마 설계 | `db/schema.sql` |
| 0-2 | Vercel Serverless Functions 디렉토리 구조 | `api/` 디렉토리 |
| 0-3 | 카카오 개발자 앱 등록 + OAuth 설정 | `core/auth/oauth.js` |
| 0-4 | Toss Payments 테스트 키 발급 | `core/billing/toss-client.js` |
| 0-5 | 네이버 개발자 앱 등록 (블로그 API, 지도 API) | API 키 설정 |

**DB 스키마 핵심 테이블:**

```sql
-- 멤버 (슬롯 소유자)
members (
  id, slot_id, name, phone, email, kakao_id,
  status, joined_at, config_json
)

-- 온보딩 체크리스트
onboarding (
  id, member_id, step, status, completed_at, notes
)

-- 인보이스
invoices (
  id, member_id, amount, type, period,
  status, paid_at, toss_payment_key
)

-- 리드 (잠재 고객)
leads (
  id, member_id, name, phone, source,
  property_interest, status, created_at
)

-- 콘텐츠
contents (
  id, member_id, type, title, body,
  naver_synced, published_at
)

-- 활동 로그
activity_log (
  id, member_id, action, detail, created_at
)

-- KPI 스냅샷
kpi_snapshots (
  id, member_id, period, metrics_json, created_at
)
```

---

### Phase 1: 온보딩 OS (2주)
> **서사**: "첫 번째 제품이 라인에 올라간다"

**벤치마크**: FranConnect 온보딩 → 체크리스트 + 타임라인 + 자동 알림

| # | 작업 | 설명 |
|---|------|------|
| 1-1 | 온보딩 위자드 UI | `modules/onboard.html` — 5단계 위자드 |
| 1-2 | 카카오 로그인 연동 | `api/auth/login.js` + `core/auth/oauth.js` |
| 1-3 | 슬롯 자동 프로비저닝 | 로그인 → 빈 슬롯 배정 → config.json 자동 생성 |
| 1-4 | 온보딩 체크리스트 API | `api/onboard/checklist.js` |
| 1-5 | 콘솔 온보딩 관리 화면 | `console/onboard-mgr.html` |

**온보딩 5단계:**

```
Step 1: 카카오 로그인 → 기본 정보 수집
Step 2: 명함 정보 입력 (이름, 사무소, 전문 지역)
Step 3: 디지털 사무실 테마 선택 (3가지 프리셋)
Step 4: 프로필 사진 업로드 + 명함 미리보기
Step 5: 결제 등록 (Toss 정기결제) → 슬롯 활성화
```

---

### Phase 2: 정산 자동화 (2주)
> **서사**: "원장이 자동으로 기표된다"

**벤치마크**: FranConnect 로열티 관리 → 자동 계산 + 인보이싱 + 수금

| # | 작업 | 설명 |
|---|------|------|
| 2-1 | Toss Payments 정기결제 연동 | `api/billing/collect.js` — 빌링키 발급 + 자동 청구 |
| 2-2 | 인보이스 자동 생성 | `api/billing/invoice.js` — 매월 1일 자동 생성 |
| 2-3 | 정산 대시보드 리뉴얼 | `console/billing.html` — 실 데이터 기반 |
| 2-4 | 멤버별 결제 상태 추적 | 미납/연체 알림 → 카카오 알림톡 |
| 2-5 | 부가 서비스 과금 | PWA 제작, 페이지 수정 등 건별 과금 |

**정산 흐름:**

```
매월 1일 → Cron (Vercel Cron Job)
  → 활성 슬롯 조회
  → 인보이스 생성 (10만원 기본 + 부가서비스)
  → Toss 빌링키로 자동 결제 시도
  → 성공 → invoice.status = 'paid'
  → 실패 → 카카오 알림톡 → 3일 후 재시도 → 7일 후 슬롯 비활성화 경고
```

---

### Phase 3: CRM + 콘텐츠 엔진 (3주)
> **서사**: "무기가 장전된다"

**벤치마크**: kvCORE (AI 행동 자동화) + 다방 (생성형 AI 매물 설명)

| # | 작업 | 설명 |
|---|------|------|
| 3-1 | 리드 관리 시스템 | `modules/crm.html` — 리드 카드, 파이프라인 뷰 |
| 3-2 | AI 워키토키 → 콘텐츠 변환 | walkie 음성/텍스트 → 블로그 글 자동 생성 (Claude API) |
| 3-3 | 네이버 블로그 동기화 | `api/content/blog-sync.js` — 작성 → 네이버에 자동 게시 |
| 3-4 | 매물 설명 AI 생성 | 주소+면적+특징 입력 → 네이버 최적화 매물 설명 자동 생성 |
| 3-5 | 슬롯별 CRM 대시보드 | `slots/slotXX/crm.html` — 내 리드, 내 매물, 내 콘텐츠 |
| 3-6 | 연락처 동기화 | 카카오톡 연락처 → CRM 자동 연동 |

**AI 워키토키 → 콘텐츠 파이프라인:**

```
중개인이 워키토키에 말함
  → "장곡동 유승한내들 34평 급매. 남향 로열층. 5.8억"
  → Claude API가 네이버 블로그 최적화 글 생성
  → 미리보기 → 승인 → 네이버 자동 게시
  → CRM에 매물로 자동 등록
  → 리드에 자동 매칭 알림
```

---

### Phase 4: 대시보드 + KPI (2주)
> **서사**: "계기판이 켜진다"

**벤치마크**: FranMetrics KPI 스코어카드 + KW Command 대시보드

| # | 작업 | 설명 |
|---|------|------|
| 4-1 | KPI 정의 및 계산 엔진 | `core/analytics/kpi-calc.js` |
| 4-2 | 본사 대시보드 | `console/kpi-board.html` — 12슬롯 전체 현황 |
| 4-3 | 슬롯별 성과 대시보드 | `slots/slotXX/analytics.html` — 내 성과 |
| 4-4 | 차트 렌더링 | Chart.js 기반 (프레임워크 없이) |
| 4-5 | 주간/월간 리포트 자동 생성 | 카카오톡으로 자동 발송 |

**KPI 체계 (KW Command 차용):**

```
[본사 KPI]
├── 매출: 총 수금액, MRR, 연체율
├── 성장: 활성 슬롯 수, 신규 가입, 이탈율
├── 활동: 콘텐츠 생산량, 블로그 게시 수, 리드 수
└── 만족: PR 처리 시간, 응답률

[슬롯별 KPI]
├── 매출: 거래 건수, 수수료 수입 (자가 기록)
├── 활동: 블로그 게시 수, 워키토키 사용 횟수
├── 리드: 신규 리드, 전환율, 파이프라인 가치
└── 브랜드: 명함 조회 수, 사이트 방문 수
```

---

### Phase 5: 확장 + 복제 키트 (2주)
> **서사**: "공장이 두 번째 라인을 가동한다"

| # | 작업 | 설명 |
|---|------|------|
| 5-1 | 브랜드 컴플라이언스 도구 | 템플릿 준수 검사, 콘텐츠 승인 워크플로 |
| 5-2 | LMS (교육 시스템) 기초 | `modules/lms.html` — AI 리터러시 교육 코스 |
| 5-3 | 프랜차이즈 복제 키트 | 새 버티컬 브랜치 1클릭 생성 (부동산 외 업종) |
| 5-4 | HQ 동기화 강화 | dtslib-branch와 자동 동기화 파이프라인 |
| 5-5 | 공공데이터 연동 | 국토부 실거래가 API → 슬롯별 자동 시세 표시 |

---

## 5. 우선순위 매트릭스

```
              높은 임팩트
                 │
    Phase 2      │      Phase 1
    (정산 자동화) │      (온보딩 OS)
                 │
 ─────────────────┼────────────────
                 │
    Phase 4      │      Phase 3
    (대시보드)   │      (CRM+콘텐츠)
                 │
              낮은 임팩트

  왼쪽 = 높은 노력     오른쪽 = 낮은 노력
```

**실행 순서**: Phase 0 → 1 → 2 → 3 → 4 → 5

**이유**:
- Phase 1 (온보딩)이 먼저인 이유: 슬롯 10개가 비어있음. 가입 → 돈 받는 파이프가 최우선.
- Phase 2 (정산)가 두 번째인 이유: 돈 받는 시스템 없으면 사업이 안 됨.
- Phase 3 (CRM)이 세 번째인 이유: "허세 먼저, 생산성은 나중" 원칙. 가입시키고 돈 받은 후에 실제 무기를 제공.

---

## 6. 비용 추정

| 항목 | 월 비용 | 비고 |
|------|---------|------|
| Vercel Pro | $20 | Serverless + Cron + KV |
| Supabase Free | $0 | 500MB DB, 50K 월 요청까지 무료 |
| Toss Payments | 거래당 2.8% | 정산에서 차감 |
| Naver API | $0 | 무료 티어 |
| Claude API | ~$10-30 | 워키토키 → 콘텐츠 변환 |
| 도메인 (namoneygoal.kr) | 이미 보유 | |
| **월 총 운영비** | **~$50-70** | 슬롯 3개만 차면 흑자 |

**손익 분기점**: 슬롯 1개 (월 10만원) > 운영비 (~7만원) → **슬롯 1개부터 흑자**

---

## 7. 핵심 차별화: 왜 이게 먹히는가

| KW Command / eXp World | namoneygoal |
|-------------------------|-------------|
| 161,000명 대상 범용 | 12명 한정 프리미엄 |
| $1.8B 투자 | 순수 정적 + Serverless |
| 영어권 중심 | 시흥 하이퍼로컬 |
| 기술이 메인 | **허세가 메인, 기술은 수단** |
| 에이전트가 직접 사용 | **본사(나)가 대신 해줌** |
| SaaS 구독 모델 | **길드 멤버십** (소속감) |

> **"KW Command를 12명짜리 길드로 축소하면 이게 된다."**
> **"eXp의 가상 오피스를 GitHub Pages로 구현하면 이게 된다."**

---

## 8. 즉시 실행 가능한 첫 번째 커밋 계획

### 이번 세션에서 바로 할 수 있는 것:

1. **`db/schema.sql`** — Supabase 스키마 전체 작성
2. **`api/` 디렉토리 스캐폴딩** — Vercel Serverless Functions 구조
3. **`modules/onboard.html`** — 온보딩 위자드 UI (Phase 1-1)
4. **`console/kpi-board.html`** — KPI 대시보드 UI 껍데기
5. **`console/members.html`** — 멤버 관리 화면

### 외부 설정 필요 (사용자가 직접):
- Supabase 프로젝트 생성 → URL + anon key
- 카카오 개발자 앱 등록 → REST API 키
- Toss Payments 가입 → 테스트 키
- 네이버 개발자 앱 등록 → Client ID

---

*Version: 1.0*
*Based on: KW Command, eXp World, FranConnect, kvCORE, 직방/다방 벤치마킹*
*Franchise OS Protocol: namoneygoal CLAUDE.md v3.0 준수*

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
