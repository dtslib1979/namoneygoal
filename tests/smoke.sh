#!/usr/bin/env bash
# namoneygoal smoke test — 라이브 URL 전체 검증
#
#   ./tests/smoke.sh                                   # Vercel 기본
#   BASE=https://namoneygoal.kr ./tests/smoke.sh        # 도메인 직접
#   BASE=http://localhost:8080 ./tests/smoke.sh         # 로컬 미리보기

set -euo pipefail

BASE="${BASE:-https://namoneygoal.vercel.app}"
FAIL=0
PASS=0

check() {
  local url="$1"
  local expect_status="${2:-200}"
  local grep_text="${3:-}"

  local code
  code=$(curl -sL -o /tmp/_smoke_body -m 10 -w "%{http_code}" "$BASE$url" 2>/dev/null || echo "000")

  local ok=true
  if [[ "$code" != "$expect_status" ]]; then ok=false; fi
  if [[ -n "$grep_text" ]] && ! grep -q "$grep_text" /tmp/_smoke_body 2>/dev/null; then ok=false; fi

  if $ok; then
    echo "  ✅ $url ($code)"
    PASS=$((PASS+1))
  else
    echo "  ❌ $url (HTTP $code, grep '$grep_text')"
    FAIL=$((FAIL+1))
  fi
}

echo "🌐 BASE: $BASE"
echo ""
echo "── 페이지 ──"
check "/" 200 "community-section"
check "/recruiting.html?slot=slot08" 200 "slot-id"
check "/forum.html" 200
check "/console/slot.html" 200 "슬롯원 콘솔"
check "/console/" 200
check "/modules/walkie.html" 200 "INTERNAL"

echo ""
echo "── Active 슬롯 (slot01/02) ──"
check "/slots/slot01/" 200 "realty-anchor"
check "/slots/slot02/" 200 "realty-anchor"

echo ""
echo "── Recruiting 슬롯 홀딩 (slot03~12) ──"
for n in 03 04 05 06 07 08 09 10 11 12; do
  check "/slots/slot${n}/" 200 "recruiting.html"
done

echo ""
echo "── 데이터/스크립트 자산 ──"
check "/registry.json" 200 "totalSlots"
check "/data/registry-realtors-only.json" 200 "공인중개사"
check "/data/registry-ecosystem.json" 200 "totalSlots"
check "/assets/discord/config.js" 200
check "/assets/discord/namoneygoal-theme.css" 200
check "/assets/js/realty-components.js" 200
check "/assets/js/realty-components.css" 200
check "/youtube-setup.json" 200

echo ""
echo "── 문서 ──"
check "/HANDOFF.md" 200
check "/docs/ROLLBACK.md" 200
check "/docs/BENCHMARK.md" 200

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " PASS: $PASS · FAIL: $FAIL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[[ $FAIL -eq 0 ]] && echo "🎉 ALL GREEN" || { echo "⚠️  실패 항목 있음"; exit 1; }
