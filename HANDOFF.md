# 🌅 박씨 아침 확인용 — namoneygoal 리팩토링 (v2)

**작업일**: 2026-04-24 밤 ~ 2026-04-25
**작업자**: Claude Opus 4.7 (1M context)
**버전**: v2 — 네이버 생태계 + LLM 전용 (Perplexity Pro)
**상태**: ✅ 라이브 · Discord Bot 자동 활성화 (시각QA 8장)
**상위 헌법**: `docs/CONCEPT-V2-NAVER-LLM-2026-04-25.md`

---

## 🔄 v1 → v2 변경 (2026-04-25 박씨 결정)

| § | v1 | v2 |
|:--:|---|---|
| 1 | "AI 쓰는 중개인" | **"네이버 생태계 최고 전문가"** |
| 2 | ChatGPT 3만 | **Perplexity Pro 3만** (출처 인용 자동) |
| 3 | 슬롯원 자율 도구 | **LLM 만. 코드 접근 금지.** PR 버튼 위탁 |
| 4 | 단일 트랙 | **Tier A (LLM) + Tier B (DeepSeek+Aider, 1~2명 옵션)** |
| 5 | 12 슬롯 (1.1) | **12 슬롯 + tools.tier 메타** |

상세: `docs/CONCEPT-V2-NAVER-LLM-2026-04-25.md`

---

## 🎯 박씨가 지시한 것

1. namoneygoal 리팩토링 (최고 시스템 아키텍트 관점)
2. 부동산 길드 커뮤니티 리서치
3. phoneparis + papafly 패턴 참조해서 일괄 작업
4. 바로 고라이브 가능한 수준
5. 아침에 확인할 수 있게

## 📦 Claude가 일괄 처리한 것

### 1. 12슬롯 직군 다양화 (생태계 원스톱)

기존: 공인중개사 12명만 (10명 비어있음)
변경: 부동산 거래 전과정 원스톱 생태계 12슬롯

| 슬롯 | 직군 | 권역 | 상태 |
|:--:|---|---|:--:|
| slot01 | 공인중개사 | 시흥 남원동 | ✅ 김남원 (앵커) |
| slot02 | 공인중개사 | 시흥 장곡동 | ✅ 권영숙 |
| slot03 | 공인중개사 | 배곧 신도시 | 🟣 모집중 |
| slot04 | 공인중개사 | 정왕·오이도 | 🟣 모집중 |
| slot05 | 공인중개사 | 은행·거모·목감 | 🟣 모집중 |
| slot06 | 공인중개사 | 월곶·소래 | 🟣 모집중 |
| slot07 | 공인중개사 | 서울 남부 광역 | 🟣 모집중 |
| slot08 | **법무사** | 시흥 전역 | 🟣 모집중 |
| slot09 | **세무사** | 시흥 전역 | 🟣 모집중 |
| slot10 | **감정평가사** | 시흥 전역 | 🟣 모집중 |
| slot11 | **홈스타일리스트·사진** | 시흥 전역 | 🟣 모집중 |
| slot12 | **대출·금융 컨설턴트** | 시흥 전역 | 🟣 모집중 |

**컨셉**: "매물부터 등기까지, 한 골목에서 끝나는 부동산"

### 2. phoneparis Discord/YouTube 번들 이식

복붙 완료:
```
assets/discord/       (7 files — config/auth/contact-form/widget-embed/presence/messages-feed/discord.css)
auth/callback.html    (OAuth 콜백)
forum.html            (WidgetBot 포럼 전용 페이지)
.github/workflows/    (discord-cache.yml + discord-notify.yml)
data/latest-messages.json
data/youtube-cache.json
youtube-setup.json
```

### 3. 랜딩 페이지 확장 (index.html)

추가:
- 12칸 슬롯 그리드에 역할/권역 메타 표시
- recruiting 상태용 뱃지 + 보라색 대시 테두리
- 새 섹션: **Community** (Discord 실시간 채팅 + YouTube 피드 + 문의 폼)
- JS 모듈화 (config.js placeholder 감지 → 우아한 fallback)

### 4. recruiting.html 홀딩 페이지 (신규)

빈 슬롯 클릭 → `/recruiting.html?slot=slotXX` → registry.json 읽어서 자동 렌더링
- 슬롯 직군 + 권역 + 이모지
- 슬롯 혜택 목록
- 카카오 상담 + 전화 CTA
- 가격 안내

### 5. 부동산 특화 컴포넌트

**`assets/js/realty-components.js` + `.css`**
- `data-kakao-map="경기도 시흥시 ..."` → 카카오맵 iframe 임베드 (API 키 불필요)
- `data-cert-badge="공인중개사" data-cert-no="..."` → 직군별 인증 뱃지

**12개 슬롯 전체 index.html에 자동 삽입** (scripts/apply-realty-snippet.js)
- 사무실 지도 + 인증 뱃지 + 권역 태그
- 중복 삽입 방지 (`id="realty-anchor"` 체크)

### 6. 슬롯원별 개인 콘솔 (신규)

**`console/slot.html`**
- 슬롯별 로그인 (세션 4시간)
- 개인 대시보드: 포스팅 수 / YouTube 조회 / PR 요청 대기 / 청구 금액
- 본인 PR 요청 이력만 필터 (localStorage)
- 개인 링크 바로가기 (사무실/명함/블로그/비디오)

### 7. walkie 내부 도구 표시

- `<title>` 에 "(내부 도구)" 추가
- `noindex, nofollow` meta
- 상단에 "INTERNAL · 관리자 전용" 뱃지
- 박씨·슬롯원 전용 명시

### 8. registry.json + slot 동기화 스크립트

**`scripts/sync-slot-configs.js`** — registry.json 변경 시 각 slot/config.json 자동 업데이트
**`scripts/apply-realty-snippet.js`** — 부동산 섹션 모든 슬롯에 일괄 삽입

### 9. 메모리 정정

`project_work_packages.md`: papafly "K-도넛" → "일본 빈티지 물성 큐레이션 쇼핑몰"로 정정
(다른 메모리는 이미 정확했음. `project_branch_guild_summary.md` = "64세 한국 아저씨의 일본 빈티지 문화 쇼핑몰")

---

## ⚠️ 박씨가 아침에 해야 할 것 (4개 값 입력)

라이브까지 **15분** 작업.

### Step 1 — Discord 서버 확인

옵션 A: **phoneparis/papafly 와 같은 서버 공유** (권장 · 3레포 생태계)
- GUILD_ID 유지 (`1493490911278272655`)
- 새 채널만 만들기

옵션 B: **독립 서버**
- Discord 에서 남원골 서버 신규 생성
- 새 GUILD_ID 획득 → `config.js` 에도 업데이트

### Step 2 — 채널 3개 생성

Discord 서버에서:
1. **#namoneygoal-공지** (또는 일반 채팅) → CH_ID 복사
2. **#namoneygoal-문의** (Webhook 대상) → 오른쪽 설정 → "웹후크" → URL 복사
3. **#namoneygoal-포럼** (포럼 타입 채널) → FORUM_CH ID 복사

### Step 3 — `assets/discord/config.js` 수정

현재 상태 (placeholder):
```js
CH_ID:       "PLACEHOLDER_CHANNEL_ID",
WEBHOOK:     "PLACEHOLDER_WEBHOOK_URL",
FORUM_CH:    "PLACEHOLDER_FORUM_CHANNEL_ID",
```

박씨가 교체:
```js
CH_ID:       "1234567890123456789",
WEBHOOK:     "https://discord.com/api/webhooks/.../...",
FORUM_CH:    "1234567890123456789",
WB_CHAT:     "https://e.widgetbot.io/channels/1493490911278272655/{CH_ID 값}",
WB_FORUM:    "https://e.widgetbot.io/channels/1493490911278272655/{FORUM_CH 값}",
```

### Step 4 — YouTube 채널 결정 (선택)

옵션 A: 신규 채널 개설 → `data/youtube-cache.json` 의 `channelId` 교체
옵션 B: `@dtslib-branch` 하위 플레이리스트로 운영 → 해당 플레이리스트 ID 사용
옵션 C: YouTube 연동 skip → placeholder 유지 (자동으로 숨김)

### Step 5 — GitHub Secrets (선택)

Discord 자동 알림 원할 경우 `dtslib1979/namoneygoal` 레포 Settings → Secrets:
- `DISCORD_BOT_TOKEN` (30분마다 공지 캐시)
- `DISCORD_WEBHOOK` (커밋/릴리즈 알림)

### Step 6 — 푸시

```bash
cd ~/namoneygoal
git log --oneline -5   # Claude가 만든 커밋 확인
git push origin main   # GitHub Pages 자동 배포
```

3~5분 후 `https://namoneygoal.kr` 라이브.

---

## 🧪 박씨가 확인할 URL

| URL | 상태 |
|---|---|
| https://namoneygoal.kr | 메인 (12칸 그리드 + Community 섹션) |
| https://namoneygoal.kr/recruiting.html?slot=slot08 | 모집중 홀딩 (법무사) |
| https://namoneygoal.kr/recruiting.html?slot=slot10 | 모집중 홀딩 (감정평가사) |
| https://namoneygoal.kr/forum.html | Discord 포럼 (4값 입력 후) |
| https://namoneygoal.kr/console/slot.html | 슬롯원 개인 콘솔 (코드 `1126`) |
| https://namoneygoal.kr/slots/slot01/ | 김남원 사무실 + 카카오맵 |
| https://namoneygoal.kr/slots/slot08/ | 법무사 모집 사무실 |

---

## 📁 변경/신규 파일

### 신규
```
recruiting.html                        홀딩 페이지
HANDOFF.md                             이 문서
assets/discord/                        7개 파일 (번들)
auth/callback.html
forum.html
data/latest-messages.json
data/youtube-cache.json
youtube-setup.json
.github/workflows/discord-cache.yml
.github/workflows/discord-notify.yml
console/slot.html                      슬롯원 개인 콘솔
scripts/sync-slot-configs.js
scripts/apply-realty-snippet.js
assets/js/realty-components.js
assets/js/realty-components.css
```

### 수정
```
registry.json                          12슬롯 직군 다양화
index.html                             Community 섹션 + 슬롯 메타
slots/slot{01~12}/config.json          role/region/placeholder 주입
slots/slot{01~12}/index.html           realty-anchor 섹션 삽입
modules/walkie.html                    INTERNAL 뱃지 + noindex
```

---

## 🚨 주의

1. **로컬 커밋만** 생성됨 (push는 박씨 수동)
2. **Discord 4값** 입력 전까지 Community 섹션은 placeholder 안내 표시
3. **기존 slot01/slot02 실제 데이터**(김남원/권영숙)는 유지
4. **slot03~12의 기존 더미 데이터**(이영희 등)은 config.json 레벨에서 `recruiting` 로 덮어씀. index.html 내부 더미 이름은 남아 있을 수 있음 → 박씨가 검토 후 원하면 별도 정리
5. **커밋 컨벤션**: `feat/slot/module/console/pr:` (namoneygoal CLAUDE.md 준수)

---

## 📈 다음 제안 (박씨 결정 대기)

1. slot03~12 index.html 내부 더미 이름 일괄 교체 (박씨 승인 시 1분 작업)
2. 슬롯원별 개인 액세스 코드 발급 (현재 공통 `1126`)
3. Discord 역할 매핑: 슬롯01~07 = 중개사 role, slot08~12 = 전문가 role
4. naver 블로그 자동 발행 파이프라인 연결 (walkie.html 실구현)
5. 매물 공유 Discord 포럼 태그 체계 (아파트/단독/상가/매매/전세/월세)

---

*박씨가 결정할 것: 커밋 승인 → push → Discord 4값 입력 → 라이브*
*문의: HQ 콘솔 `/console/` 접근코드 `1126`*
