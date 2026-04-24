# 📸 namoneygoal 시각 QA 리포트

**테스트 일시**: 2026-04-25
**대상 URL**: https://namoneygoal.vercel.app
**뷰포트**: 430 × 932 (iPhone 16 Pro Max 가로 기준, 모바일 퍼스트)
**테스트 도구**: Playwright MCP
**검증 페이지**: 6개

---

## 스크린샷 목록

| # | 파일 | 페이지 | 검증 포인트 | 결과 |
|:--:|---|---|---|:--:|
| 01 | `01-main-landing.png` | `/` 메인 랜딩 | 히어로 / 5대 권역 / 12슬롯 그리드 / Community / Pricing | ✅ |
| 02 | `02-recruiting-slot08-lawyer.png` | `/recruiting.html?slot=slot08` | 법무사 모집 홀딩 페이지 / CTA 2종 / 혜택 리스트 | ✅ |
| 03 | `03-console-slot-gate.png` | `/console/slot.html` | 슬롯원 콘솔 로그인 게이트 / 12슬롯 선택 | ✅ |
| 04 | `04-slot01-active-kimnamwon.png` | `/slots/slot01/` | 김남원 사무실 / OSM 지도 / 인증 뱃지 / 3 deep links | ✅ |
| 05 | `05-forum.png` | `/forum.html` | WidgetBot 로드 확인 (Discord 4값 입력 전 안내) | ⚠️ 수정됨 |
| 06 | `06-hq-console.png` | `/console/` | HQ 관제 콘솔 / 접근 코드 gate | ✅ |

---

## Smoke Test 결과

```
$ ./tests/smoke.sh
🌐 BASE: https://namoneygoal.vercel.app

29개 항목 · PASS 29 · FAIL 0
🎉 ALL GREEN
```

검증된 URL:
- 페이지 6개 (메인 / recruiting / forum / slot-console / HQ-console / walkie)
- Active 슬롯 2개 (slot01, slot02)
- Recruiting 슬롯 10개 (slot03~12 모두 `recruiting.html` 리다이렉트)
- JSON 자산 4개 (registry / registry-realtors / registry-ecosystem / youtube-setup)
- JS/CSS 자산 3개 (discord config / theme / realty-components)
- 문서 3개 (HANDOFF / ROLLBACK / BENCHMARK)

---

## 발견한 이슈 (작업 중 수정 완료)

### 🔧 수정 완료

1. **`index.html`**: `import { showPresence }` → `renderPresence` (실제 export 이름)
2. **`forum.html`**: 제목 "포럼 — phoneparis" → "포럼 — 남원골"
3. **`forum.html`**: CFG placeholder 감지 → 우아한 안내 UI

### ⚠️ 박씨 검토 필요

1. **slot01 카카오맵 이미지**: OSM iframe 동작 확인. 단 실제 주소 등록 전까진 "시흥 남원동" 동 중심 좌표
2. **Discord/YouTube**: 여전히 placeholder (예상 동작). config.js 4값 입력 후 활성화
3. **favicon.ico 404**: 박씨 파비콘 파일 추가 필요 (선택)

---

## 렌더링 확인 요소

### ✅ 잘 렌더링된 것
- 12칸 슬롯 그리드 (anchor gold / active emerald / recruiting purple-dashed 구분)
- 직군 이모지 (🏙️🌊🌳⚓🗼⚖️🧾📐📸💰)
- 슬롯 메타 (직군 · 권역)
- 히어로 카운터 애니메이션 (data-count)
- Pricing 카드 (50만 / 10만)
- Active 슬롯 Realty 섹션 (인증 뱃지 + 지도 + 3 deep links)
- Recruiting 홀딩 (emoji + tagline + 혜택 + CTA)
- Console Gate (보라 그라데이션 버튼)

### 📝 Discord/YouTube 활성화 후 확인
- 실시간 채팅 WidgetBot iframe
- YouTube 최신 영상 4개 썸네일 그리드
- 문의 폼 Webhook 전송

---

## 다음 테스트 시

박씨 Discord 4값 입력 후:
```bash
./tests/smoke.sh
```
→ PASS 29/29 유지 확인.

또한 forum/Community 섹션에 실제 Discord 채팅 로드 여부 수동 확인.

---

*Playwright MCP · 2026-04-25 KST*
