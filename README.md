# 남원골 · namoneygoal

> **시흥 부동산 12슬롯 AI 길드**
> 말하면 블로그가 된다 · 허세가 먼저 팔리고 생산성은 나중에 따라온다

🌐 https://namoneygoal.kr

---

## 한 줄 소개

시흥 지역 부동산 전문가 12명만 운영하는 **디지털 길드 + AI 워키토키 + 허세 포트폴리오** 플랫폼.
글로벌 럭셔리 에이전트 멤버십(REALM Global $7,500/년)의 **1/6 가격 · 로컬 특화 · 허세 포지션** 차별화.

---

## 12슬롯 구조 (2안 동시 운영)

registry 2종 파일로 박씨가 한 줄로 전환 가능:

### 원안 (realtors-only) — 공인중개사 12명
```bash
node scripts/switch-registry.js realtors-only
```
시흥 7권역 + 상가·토지 분업 포함 공인중개사 12명 한정.

### 생태계 안 (ecosystem) — 부동산 원스톱 6직군
```bash
node scripts/switch-registry.js ecosystem
```
공인중개사 7 + 법무사 1 + 세무사 1 + 감정평가사 1 + 홈스타일리스트 1 + 대출상담 1
— "매물부터 등기까지 한 골목에서 끝나는 부동산".

현재 배포됨: **ecosystem**.

---

## 가격

| 항목 | 금액 | 설명 |
|---|---|---|
| 입장비 | 50만원 | 최초 1회 |
| 월 멤버십 | 10만원/월 | ChatGPT 3만 + 남원골 7만 |
| PWA/APK 제작 | 5만/건 | 선택 |
| 페이지 수정 | 1만/건 | 선택 |

**vs 글로벌**: REALM Global $7,500/년(=약 1,050만) · namoneygoal 연 170만원. **1/6 가격**.

---

## 기술 스택

순수 정적 사이트. 빌드 도구 없음.

| 레이어 | 기술 |
|---|---|
| 프론트 | HTML5 · CSS3 · Vanilla JS ES6 modules |
| 호스팅 | Vercel + GitHub Pages (CNAME `namoneygoal.kr`) |
| 저장 | JSON (`registry.json`) + `localStorage` |
| 커뮤니티 | Discord (Webhook + OAuth + WidgetBot iframe) |
| 영상 | YouTube RSS (API 키 불필요, rss2json 프록시) |
| 지도 | OpenStreetMap + 카카오/네이버/Google 딥링크 |
| 자동화 | GitHub Actions (Discord 30분 캐시 + 커밋 알림) |

**추가 SDK 주입 가능**: `window.__KAKAO_APPKEY` 설정 시 Kakao Maps JS SDK 자동 활성.

---

## 디렉토리

```
namoneygoal/
├── index.html                   # 메인 랜딩 (12칸 그리드 + Community + Pricing)
├── recruiting.html              # 모집중 슬롯 홀딩 페이지 (?slot=slotXX)
├── forum.html                   # Discord 포럼 단독 페이지
├── registry.json                # 12슬롯 단일 진실원 (현재 활성)
│
├── assets/
│   ├── discord/                 # phoneparis 에서 이식한 공용 번들 (SSOT)
│   │   ├── config.js            # 박씨 4값 교체 필요
│   │   ├── namoneygoal-theme.css # 보라 팔레트 오버라이드
│   │   └── {auth,contact-form,widget-embed,presence,messages-feed}.js
│   ├── js/
│   │   ├── realty-components.js # 지도 + 인증 뱃지 선언형 컴포넌트
│   │   └── realty-components.css
│   ├── members/                 # 슬롯별 사진
│   └── icons/, logos/, manifest.json
│
├── auth/callback.html           # Discord OAuth 콜백
│
├── data/
│   ├── registry-realtors-only.json  # 안 A (박씨 원안)
│   ├── registry-ecosystem.json      # 안 B (현재 활성)
│   ├── youtube-cache.json           # 박씨 channelId 입력 대기
│   └── latest-messages.json         # Discord fallback
│
├── slots/
│   └── slot01/ ~ slot12/
│       ├── index.html           # 개인 사무실 (active) 또는 홀딩 리다이렉트 (recruiting)
│       ├── card.html / blog.html / video.html
│       └── config.json          # registry 동기화
│
├── console/
│   ├── index.html               # HQ 콘솔 (박씨 전용, code: 1126)
│   ├── slot.html                # 슬롯원 개인 콘솔
│   ├── requests.html            # PR 요청 로그
│   └── billing.html             # 정산 보드
│
├── modules/
│   ├── walkie.html              # AI 워키토키 (INTERNAL · noindex)
│   ├── card.html / blog.html / video.html / pr.js
│
├── scripts/
│   ├── sync-slot-configs.js     # registry → slot/config 동기화
│   ├── apply-realty-snippet.js  # active 슬롯에 지도 + 뱃지 주입
│   ├── apply-recruiting-page.js # recruiting 슬롯 홀딩 템플릿 일괄 교체
│   ├── switch-registry.js       # realtors-only ↔ ecosystem 스위칭
│   └── rollback.sh              # 1-command 롤백 (full / soft / status)
│
├── tests/
│   └── smoke.sh                 # 29개 URL HTTP + 콘텐츠 검증
│
├── docs/
│   ├── ROLLBACK.md              # 복원 가이드
│   ├── BENCHMARK.md             # REALM/Compass/BoardRoom 비교
│   ├── concept.md               # 브랜드 컨셉
│   ├── architecture.md          # 기술 구조
│   ├── franchise-os-blueprint.md # 프랜차이즈 OS
│   ├── market-parameters.md     # 시흥 시장 파라미터
│   └── visual-qa/               # Playwright 스크린샷 6장 + QA 리포트
│
├── .github/workflows/
│   ├── discord-cache.yml        # 30분 공지 캐시
│   └── discord-notify.yml       # 커밋/릴리즈 알림
│
├── HANDOFF.md                   # 박씨 인수 인계 문서
├── CLAUDE.md                    # Claude Code 에이전트 프로토콜
├── CNAME                        # namoneygoal.kr
├── vercel.json                  # 서브도메인 rewrite
└── sw.js                        # Service Worker
```

---

## 빠른 시작 (박씨)

### 1. 브라우저 로컬 미리보기
```bash
cd namoneygoal
python3 -m http.server 8080
# → http://localhost:8080
```

### 2. 라이브 URL
- 도메인: https://namoneygoal.kr
- Vercel 직통: https://namoneygoal.vercel.app
- HQ 콘솔: `/console/` (코드 `1126`)
- 슬롯원 콘솔: `/console/slot.html` (코드 `1126` 공통, 개별 발급 예정)

### 3. Discord/YouTube 활성화 (15분)

`HANDOFF.md` Step 1~5 참고:
1. Discord 서버 → 채널 3개 생성 (채팅 + Webhook + 포럼)
2. `/assets/discord/config.js` placeholder 4값 교체
3. (선택) `/data/youtube-cache.json` channelId 입력
4. `git push` → 5분 후 라이브 완전 활성

### 4. registry 스위칭
```bash
node scripts/switch-registry.js status           # 현재 안 확인
node scripts/switch-registry.js realtors-only    # 공인중개사 12명
node scripts/switch-registry.js ecosystem        # 생태계 다양화
```

### 5. 검증
```bash
./tests/smoke.sh                     # 29개 URL HTTP + 콘텐츠
BASE=https://namoneygoal.kr ./tests/smoke.sh    # 도메인 직접 테스트
```

### 6. 롤백 (박씨 언제든)
```bash
./scripts/rollback.sh status         # 지점 확인
./scripts/rollback.sh soft           # 10/10 작업 전으로
./scripts/rollback.sh full           # 박씨 2026-04-14 상태로
```

---

## CI/CD

- GitHub push → Vercel 자동 배포 (3~5분)
- GitHub Actions:
  - `discord-cache.yml` — 30분마다 공지 캐시 (Secret `DISCORD_BOT_TOKEN`)
  - `discord-notify.yml` — 커밋/릴리즈 Discord 알림 (Secret `DISCORD_WEBHOOK`)

---

## 벤치마크 포지셔닝

| 항목 | REALM Global | Compass PE | **namoneygoal** |
|---|---|---|---|
| 타겟 | 글로벌 Top 1% 럭셔리 | Compass 소속 에이전트 | **시흥 12명 한정** |
| 가격 | $7,500/년 | 회사 플랫폼(무료) | **월 10만 + 입장 50만** |
| 규모 | 230+ | 340,000 | **12** |
| 차별화 | HNW 데이터 | Pre-MLS 비공개 매물 | **AI 자동 블로그 + 허세** |

상세: [`docs/BENCHMARK.md`](docs/BENCHMARK.md)

---

## 개발 규율 (헌법)

[`CLAUDE.md`](CLAUDE.md) 의 헌법 제1~2조 + 특별법 제0~2조 준수:
- **레포지토리는 소설** — squash 금지, revert 로 정정
- **가로축(ERP) + 세로축(FAB)** — 커밋=전표, 디렉토리=계정과목, JSON=매니페스트
- **Claude Code 메인 드라이버** — WSL2 기준, Windows 무시
- **플랫폼 자동화 우선순위** — API → Claude in Chrome → Playwright → CDP

---

## 라이선스

Private · © 2026 DTSLIB HQ · All rights reserved.

---

## 관련 레포 (DTSLIB 생태계)

- [dtslib-papyrus](https://github.com/dtslib1979/dtslib-papyrus) — 그룹 관제탑
- [dtslib-branch](https://github.com/dtslib1979/dtslib-branch) — 프랜차이즈 OS (HQ)
- [phoneparis](https://github.com/dtslib1979/phoneparis) — Discord/YouTube 번들 원본 (SSOT)
- [papafly](https://github.com/dtslib1979/papafly) — 일본 빈티지 (동일 GUILD 공유)
- [buckleychang.com](https://github.com/dtslib1979/buckleychang.com) — 1인회사 컨설팅 (전략 파트너)
- [buddies.kr](https://github.com/dtslib1979/buddies.kr) — 소기업 인스톨레이션 (사무실 인테리어 연계)

---

*"신안산선 개통 전에 유명해지세요."*
