#!/usr/bin/env bash
# namoneygoal 1-command 롤백 스크립트
#
# 사용:
#   ./scripts/rollback.sh full    → 박씨 직접 마지막 커밋(26a83e2) 상태로
#   ./scripts/rollback.sh soft    → 10/10 리팩토링 직전(safe-rollback-point)으로
#   ./scripts/rollback.sh status  → 현재 상태 + 롤백 지점 미리보기
#
# 헌법: 파괴적 작업은 박씨 승인 후만 실행.

set -euo pipefail

MODE="${1:-status}"
cd "$(dirname "$0")/.."

case "$MODE" in
  full)
    echo "⚠️  전체 롤백 — 박씨 2026-04-14 (26a83e2) 상태로 복귀"
    echo "   확인: 10/10 리팩토링 + Discord 이식 전부 사라집니다."
    read -p "   진행? (yes/no): " ans
    [[ "$ans" == "yes" ]] || { echo "취소됨"; exit 0; }
    git reset --hard 26a83e2
    git push origin main --force-with-lease
    echo "✅ 완료. 5분 후 Vercel 재배포."
    ;;
  soft)
    echo "🟡 소프트 롤백 — 10/10 리팩토링 직전 (safe-rollback-point) 상태로"
    echo "   유지: Discord 이식 + 12슬롯 다양화 + recruiting 페이지"
    echo "   제거: 10/10 작업 (카카오맵 대체 / CSS 통일 / 시각 QA 등)"
    read -p "   진행? (yes/no): " ans
    [[ "$ans" == "yes" ]] || { echo "취소됨"; exit 0; }
    git reset --hard safe-rollback-point
    git push origin main --force-with-lease
    echo "✅ 완료."
    ;;
  status)
    echo "📍 현재 HEAD: $(git rev-parse --short HEAD)"
    echo "📍 원격 main: $(git rev-parse --short origin/main 2>/dev/null || echo '?')"
    echo ""
    echo "롤백 지점 후보:"
    git log --oneline -n 12
    echo ""
    echo "사용법:"
    echo "  ./scripts/rollback.sh full   # 박씨 2026-04-14 상태로"
    echo "  ./scripts/rollback.sh soft   # safe-rollback-point 로"
    ;;
  *)
    echo "Usage: $0 {full|soft|status}"
    exit 1
    ;;
esac
