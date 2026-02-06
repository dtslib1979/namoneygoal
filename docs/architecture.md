# NAMONEYGOAL 기술 아키텍처 문서

> 남원골 — AI 쓰는 중개인 12슬롯 길드
> 작성일: 2026-02-06

---

## 1. 프로젝트 개요

### 1.1 정체성
- **이름**: 남원골 (NAMONEYGOAL)
- **목적**: 시흥 부동산 중개인용 AI 워키토키 길드
- **구조**: 12슬롯 한정 버티컬 브랜치
- **핵심 가치**: 허세 소비재 (즉시 만족) + 디지털 캐릭터 전환

### 1.2 기술 스택
| 레이어 | 기술 |
|--------|------|
| Frontend | 순수 HTML/CSS/JS (No Framework) |
| Hosting | GitHub Pages |
| Storage | localStorage (Client-side) |
| Parent HQ | dtslib-branch |

### 1.3 Live URL
- HQ: `https://dtslib1979.github.io/namoneygoal/`
- Slots: `https://dtslib1979.github.io/namoneygoal/slots/slot{01-12}/`

---

## 2. 폴더 구조

```
namoneygoal/
├── index.html              # HQ 메인 페이지
├── config.json             # 사이트 설정
├── branch.json             # 프랜차이즈 OS 설정
├── registry.json           # 12슬롯 중앙 레지스트리
├── vercel.json             # Vercel 배포 설정
├── sw.js                   # Service Worker (PWA)
├── CLAUDE.md               # Claude Code 에이전트 프로토콜
│
├── 00_TRUTH/               # Truth System (상속 체계)
│   ├── _inherit.json       # 상속 선언
│   └── index.md            # Truth 문서
│
├── slots/                  # 12개 슬롯 (멤버 개인 공간)
│   ├── slot01/             # 앵커 슬롯 (무료)
│   │   ├── index.html      # 개인 사무실
│   │   ├── card.html       # 디지털 명함
│   │   ├── blog.html       # 블로그
│   │   ├── video.html      # 유튜브 연동
│   │   ├── config.json     # 개인 설정
│   │   ├── manifest.json   # PWA 매니페스트
│   │   ├── sw.js           # Service Worker
│   │   └── staff/          # 스태프 모드
│   │       └── index.html
│   ├── slot02/             # 유료 슬롯
│   │   ├── index.html
│   │   ├── card.html
│   │   ├── blog.html
│   │   ├── video.html
│   │   └── config.json
│   └── slot03-12/          # (동일 구조)
│
├── modules/                # 공용 모듈
│   ├── card.html           # 명함 템플릿
│   ├── blog.html           # 블로그 템플릿
│   ├── video.html          # 유튜브 템플릿
│   ├── walkie.html         # AI 워키토키
│   └── pr.js               # PR 시스템 (카톡 접수)
│
├── console/                # 관제 콘솔 (HQ 전용)
│   ├── index.html          # 콘솔 메인
│   ├── requests.html       # PR 요청 관리
│   └── billing.html        # 정산 보드
│
├── docs/                   # 문서
│   ├── concept.md          # 컨셉 문서
│   ├── chat.html           # 채팅 인터페이스
│   └── architecture.md     # 이 문서
│
├── articles/               # 아티클 시스템
│   ├── index.html
│   └── articles.json
│
├── card/                   # HQ 명함
│   └── index.html
│
├── staff/                  # HQ 스태프 모드
│   └── index.html
│
├── studio/                 # 스튜디오
│   └── index.html
│
├── tools/                  # 도구 모음
│   └── index.html
│
├── assets/                 # 정적 에셋
│   ├── manifest.json       # PWA 매니페스트
│   ├── icons/              # 아이콘
│   ├── members/            # 멤버 사진
│   └── logos/              # 로고
│
└── .vercel/                # Vercel 설정
    └── project.json
```

---

## 3. 핵심 파일 상세

### 3.1 registry.json (슬롯 레지스트리)

HQ index.html이 로딩하여 포탈 그리드를 렌더링하는 중앙 데이터.

```json
{
  "meta": {
    "name": "남원골",
    "description": "AI 쓰는 중개인 12슬롯 길드",
    "totalSlots": 12,
    "version": "1.0.0",
    "updatedAt": "2026-02-06"
  },
  "slots": [
    {
      "id": "slot01",
      "status": "active",      // active | empty
      "type": "anchor",        // anchor | paid
      "member": {
        "name": "김남원",
        "fullName": "김남원 공인중개사",
        "avatar": "김",
        "photo": "/assets/members/kimnamwon.png",
        "title": "부동산 전문 중개인",
        "tagline": "시흥 남원골에서 신뢰로 거래하는 AI 쓰는 중개인"
      },
      "contact": {
        "phone": "010-2831-7909",
        "email": "namone@gmail.com"
      },
      "joinedAt": "2026-01-27",
      "theme": "gold"
    },
    // slot02-12...
  ]
}
```

### 3.2 config.json (사이트 설정)

```json
{
  "site": {
    "name": "남원골",
    "shortName": "NAMONEYGOAL",
    "domain": "namoneygoal.kr",
    "url": "https://namoneygoal.kr",
    "description": "시흥 부동산중개인용 AI 워키토키 길드",
    "tagline": "AI 쓰는 중개인",
    "established": "2026.01.27",
    "themeColor": "#A855F7"
  },
  "owner": {
    "name": "남원골 HQ",
    "email": "hq@namoneygoal.kr",
    "location": "시흥, 대한민국"
  },
  "guild": {
    "maxSlots": 12,
    "anchorSlot": "slot01",
    "paidSlots": ["slot02", "slot03", ...]
  },
  "pricing": {
    "entry": 500000,           // 입장비 50만
    "monthly": 100000,         // 월 패키지 10만
    "monthlyBreakdown": {
      "chatgpt": 30000,        // ChatGPT 3만
      "namoneygoal": 70000     // 남원골 7만
    },
    "addons": {
      "pwa": 50000,            // PWA/APK 제작
      "pageEdit": 10000        // 페이지 수정
    }
  },
  "features": {
    "card": true,
    "blog": true,
    "video": true,
    "walkie": true,
    "pr": true,
    "pwa": true
  }
}
```

### 3.3 branch.json (프랜차이즈 OS 설정)

```json
{
  "id": "namoneygoal",
  "name": "NAMONEYGOAL",
  "displayName": "남원골",
  "tagline": "AI 쓰는 중개인",
  "hq": "dtslib1979/dtslib-branch",
  "version": "3.0",
  "branchType": "vertical",
  "status": "active",
  "visibility": "public",

  "axes": {
    "governance": "collaborator",  // HQ와 강하게 연동
    "cognitive": "hybrid"          // Creator + Builder
  },

  "modules": {
    "card": { "enabled": true, "path": "modules/card.html" },
    "blog": { "enabled": true, "path": "modules/blog.html" },
    "video": { "enabled": true, "path": "modules/video.html" },
    "walkie": { "enabled": true, "path": "modules/walkie.html" },
    "pr": { "enabled": true, "path": "modules/pr.js" }
  },

  "hqAccess": ["templates", "sync", "broadcast", "claude-code"],

  "subscriptions": [
    { "feedId": "hq-notices", "publisher": "hq", "autoSync": true },
    { "feedId": "hq-templates", "publisher": "hq", "autoSync": true }
  ]
}
```

### 3.4 slots/slotXX/config.json (개인 슬롯 설정)

```json
{
  "slot": {
    "id": "slot01",
    "type": "anchor",          // anchor | paid
    "status": "active"
  },
  "member": {
    "name": "김남원 공인중개사",
    "shortName": "김남원",
    "title": "부동산 전문 중개인",
    "tagline": "시흥 남원골에서 신뢰로 거래하는 AI 쓰는 중개인",
    "badge": "AI 쓰는 중개인",
    "avatar": "김",
    "photo": "/assets/members/kimnamwon.png",
    "logo": "/assets/logos/slot01.png"
  },
  "contact": {
    "phone": "010-2831-7909",
    "office": "경기도 시흥시 남원동",
    "kakao": "@kimnamwon",
    "email": "namone@gmail.com"
  },
  "website": {
    "url": "namoneygoal.kr/slots/slot01",
    "blogTitle": "김남원의 부동산 이야기",
    "blogSubtitle": "시흥 남원골에서 들려주는 진짜 이야기",
    "channelName": "김남원TV"
  },
  "theme": {
    "primary": "#D4AF37",
    "accent": "#E8C547",
    "bg": "#0A0A0F"
  },
  "features": {
    "card": true,
    "blog": true,
    "video": true,
    "walkie": true,
    "pr": true
  },
  "tools": {
    "apk": [
      { "name": "Parksy Axis", "desc": "방송용 오버레이", "icon": "📡", "url": "..." },
      { "name": "Parksy Pen", "desc": "레이저펜 판서", "icon": "✏️", "url": "..." }
    ]
  },
  "staff": {
    "accessCode": "7909",
    "adminCode": "7909admin",
    "storageKey": "nmg_staff_slot01"
  },
  "hq": {
    "name": "남원골 HQ",
    "tagline": "AI 쓰는 중개인 12슬롯 길드",
    "url": "https://namoneygoal.kr",
    "parent": "dtslib-branch"
  }
}
```

---

## 4. 모듈 상세

### 4.1 modules/walkie.html (AI 워키토키)

**기능**: 음성 → 텍스트 → ChatGPT 프롬프트 변환

```
[음성 입력] → [Web Speech API] → [텍스트] → [템플릿 적용] → [ChatGPT 프롬프트]
```

**템플릿 종류**:
| 템플릿 | 용도 |
|--------|------|
| blog | 매물 소개 블로그 글 |
| sns | SNS 홍보 문구 |
| script | 유튜브 영상 대본 |
| analysis | 시세 분석 글 |

**클래스 구조**:
```javascript
class AIWalkie {
  recognition      // SpeechRecognition 객체
  transcript       // 현재 음성 텍스트
  history          // 사용 기록
  templates        // 프롬프트 템플릿

  setupSpeechRecognition()  // 음성 인식 초기화
  toggleRecording()         // 녹음 시작/중지
  generatePrompt(template)  // 프롬프트 생성
  copyToClipboard(text)     // 클립보드 복사
}
```

### 4.2 modules/pr.js (PR 시스템)

**기능**: PR 요청 → 카카오톡 접수

**PR 유형 및 가격**:
| 유형 | 이름 | 가격 |
|------|------|------|
| edit | 페이지 수정 | ₩10,000 |
| pwa | PWA/APK 제작 | ₩50,000 |
| content | 콘텐츠 제작 | ₩30,000 |
| design | 디자인 변경 | ₩20,000 |
| custom | 기타 요청 | 협의 |

**클래스 구조**:
```javascript
class PRSystem {
  requests         // PR 요청 목록

  createFloatingButton()    // 플로팅 버튼 생성
  showPRModal()             // PR 모달 표시
  submitPR(formData)        // PR 제출
  generateKakaoMessage()    // 카톡 메시지 생성
  openKakao()               // 카카오톡 열기
}
```

**데이터 구조**:
```javascript
{
  id: "m1abc123",           // 고유 ID
  type: "edit",             // PR 유형
  slot: "slot01",           // 대상 슬롯
  content: "...",           // 요청 내용
  contact: "010-1234-5678", // 연락처
  status: "pending",        // pending | completed | cancelled
  createdAt: "2026-01-27T...",
  page: "https://..."       // 요청 페이지 URL
}
```

---

## 5. 콘솔 시스템

### 5.1 console/requests.html (PR 요청 관리)

**기능**: PR 요청 목록 조회 및 상태 관리

**상태 흐름**:
```
[pending] → [completed] | [cancelled]
```

**클래스 구조**:
```javascript
class RequestsManager {
  requests         // PR 요청 목록
  currentFilter    // 현재 필터

  renderStats()              // 통계 렌더링
  renderRequests()           // 요청 목록 렌더링
  updateStatus(id, status)   // 상태 변경
}
```

### 5.2 console/billing.html (정산 보드)

**기능**: 수익 계산 및 멤버 정산 관리

**수익 구조**:
```
총 수익 = 고정 수익 (월 이용료) + 변동 수익 (PR)

고정 수익 = 유료 슬롯 수 × ₩70,000
변동 수익 = Σ (완료된 PR × PR 단가)
```

**클래스 구조**:
```javascript
class BillingManager {
  slots           // 슬롯 목록
  prRequests      // PR 요청 목록
  pricing         // 가격표

  calculateRevenue()         // 수익 계산
  renderMembers()            // 멤버 목록 렌더링
  renderPRBilling()          // PR 정산 렌더링
  addMember(formData)        // 멤버 추가
}
```

---

## 6. HQ 페이지 구조

### 6.1 index.html (HQ 메인)

**섹션 구성**:
1. **Header** - 로고 + 입장 신청 CTA
2. **Hero** - 타이틀 + 슬롯 현황 (12/활성/남음)
3. **명함** - HQ 명함 카드
4. **포탈** - 12슬롯 그리드 (registry.json 로딩)
5. **블로그** - 최신 소식 피드
6. **초크보드** - 드로잉 캔버스 + 녹화
7. **워키토키** - AI 워키토키 링크
8. **가격** - 멤버십 안내
9. **Floating CTA** - 워키토키 + 입장 신청

**핵심 함수**:
```javascript
loadRegistry()      // registry.json 로딩
renderPortals()     // 포탈 그리드 렌더링
renderBlog()        // 블로그 피드 렌더링
initChalkboard()    // 초크보드 초기화
```

**초크보드 기능**:
- 4색 분필 (흰/노/초/빨)
- 지우개
- 캔버스 저장 (PNG)
- 캔버스 녹화 (WebM)

---

## 7. 데이터 흐름

### 7.1 슬롯 데이터 흐름

```
[registry.json]
      │
      ▼
[HQ index.html]
      │
      ├─→ renderPortals() → 포탈 그리드
      │
      └─→ 슬롯 클릭 → /slots/slotXX/
                            │
                            ▼
                    [slot config.json]
                            │
                            ▼
                    [슬롯 index.html]
```

### 7.2 PR 데이터 흐름

```
[사용자]
    │
    ▼ PR 버튼 클릭
[pr.js - PRSystem]
    │
    ├─→ localStorage 저장 (nmg_pr_requests)
    │
    ├─→ 카카오톡 메시지 생성 → [카카오톡]
    │
    └─→ Toast 알림

[관리자]
    │
    ▼ console/requests.html
[RequestsManager]
    │
    ├─→ localStorage 조회
    │
    └─→ 상태 변경 (pending → completed)
```

### 7.3 워키토키 데이터 흐름

```
[음성 입력]
    │
    ▼ Web Speech API
[텍스트 변환]
    │
    ▼ 템플릿 선택
[ChatGPT 프롬프트]
    │
    ├─→ localStorage 저장 (nmg_walkie_history)
    │
    └─→ 클립보드 복사 → [ChatGPT 붙여넣기]
```

---

## 8. localStorage 키

| 키 | 용도 | 사용 위치 |
|----|------|----------|
| `nmg_pr_requests` | PR 요청 목록 | pr.js, requests.html |
| `nmg_slots` | 슬롯 데이터 | billing.html |
| `nmg_billing` | 정산 데이터 | billing.html |
| `nmg_walkie_history` | 워키토키 기록 | walkie.html |
| `nmg_blog_slotXX` | 슬롯별 블로그 | blog.html |
| `nmg_staff_slotXX` | 스태프 인증 | staff/index.html |
| `nmg_console_auth` | 콘솔 인증 | console/ |

---

## 9. 테마 시스템

### 9.1 CSS 변수

```css
:root {
  --primary: #7C3AED;        /* 메인 퍼플 */
  --primary-dark: #5B21B6;
  --accent: #F59E0B;          /* 골드 액센트 */
  --bg: #0F0F1A;              /* 배경 */
  --bg-card: #1A1A2E;         /* 카드 배경 */
  --bg-card-hover: #252542;
  --text: #FFFFFF;
  --text-dim: #9CA3AF;
  --text-muted: #6B7280;
  --gradient: linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #F59E0B 100%);
  --shadow: 0 4px 24px rgba(124, 58, 237, 0.15);
  --radius: 16px;
  --radius-sm: 12px;
}
```

### 9.2 슬롯별 테마

각 슬롯은 `config.json`의 `theme` 객체로 개별 테마 적용 가능:

```json
"theme": {
  "primary": "#D4AF37",
  "accent": "#E8C547",
  "bg": "#0A0A0F"
}
```

---

## 10. PWA 지원

### 10.1 manifest.json

```json
{
  "name": "남원골",
  "short_name": "남원골",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0F0F1A",
  "theme_color": "#7C3AED",
  "icons": [
    { "src": "/assets/icons/icon-192.png", "sizes": "192x192" },
    { "src": "/assets/icons/icon-512.png", "sizes": "512x512" }
  ]
}
```

### 10.2 Service Worker

각 슬롯은 개별 `sw.js`를 가질 수 있어 오프라인 지원 가능.

---

## 11. 슬롯 시스템

### 11.1 슬롯 유형

| 유형 | 슬롯 | 가격 | 설명 |
|------|------|------|------|
| anchor | slot01 | 무료 | 앵커 (친구) |
| paid | slot02-12 | 월 7만 | 유료 슬롯 |

### 11.2 슬롯 상태

| 상태 | 의미 |
|------|------|
| active | 활성 (멤버 있음) |
| empty | 비어있음 |

### 11.3 슬롯별 페이지

| 경로 | 기능 |
|------|------|
| /slots/slotXX/ | 개인 사무실 메인 |
| /slots/slotXX/card.html | 디지털 명함 |
| /slots/slotXX/blog.html | 블로그 |
| /slots/slotXX/video.html | 유튜브 연동 |
| /slots/slotXX/staff/ | 스태프 모드 |

---

## 12. 가격 구조

### 12.1 기본 요금

| 항목 | 금액 | 비고 |
|------|------|------|
| 입장비 | ₩500,000 | 1회 |
| 월 패키지 | ₩100,000 | ChatGPT 3만 + 남원골 7만 |

### 12.2 부가 서비스

| 항목 | 금액 |
|------|------|
| PWA/APK 제작 | ₩50,000 / 건 |
| 페이지 수정 | ₩10,000 / 건 |
| 콘텐츠 제작 | ₩30,000 / 건 |
| 디자인 변경 | ₩20,000 / 건 |

### 12.3 운영자 바닥값

```
고정 수익 = 11 (유료 슬롯) × ₩70,000 = ₩770,000
목표 = 약 ₩1,000,000 / 월
```

---

## 13. HQ 연동

### 13.1 상위 계층

```
dtslib-papyrus (Tier 1)
    └── dtslib-branch (Tier 2)
            └── namoneygoal (Vertical Branch)
```

### 13.2 HQ Access 권한

```
✅ templates    - 페이지/컴포넌트 템플릿
✅ sync         - HQ 동기화 시스템
✅ broadcast    - 방송/강의 시스템
✅ claude-code  - Claude Code 에이전트 접근
```

---

## 14. 커밋 컨벤션

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 업데이트
slot: 슬롯 관련 작업
module: 모듈 관련 작업
console: 관제/정산 관련
pr: PR 시스템 관련
```

---

## 15. 파일 수 통계

| 카테고리 | 파일 수 |
|----------|--------|
| HTML | 66 |
| JSON | 16 |
| JS | 3 |
| MD | 4 |
| **Total** | **89** |

---

*Version: 1.0.0*
*Last Updated: 2026-02-06*
*Author: Claude Opus 4.5*
