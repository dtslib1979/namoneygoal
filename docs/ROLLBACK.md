# 🔄 namoneygoal 롤백 가이드

**언제든 박씨가 리팩토링 이전 상태로 1분 안에 되돌릴 수 있도록 만든 안전장치.**

---

## 롤백 지점 (Git Tag)

| 태그 | 시점 | 상태 |
|---|---|---|
| `safe-rollback-point` | 2026-04-25 새벽 | 10/10 리팩토링 직전 (8개 약점 해결 시작점) |
| `26a83e2` (원격 main 최초) | 2026-04-14 | 박씨가 직접 마지막 커밋한 시점 |

---

## 시나리오별 롤백

### 🔴 전부 싫음 — 박씨 직접 커밋 상태로 완전 복귀

```bash
cd ~/namoneygoal
./scripts/rollback.sh full
```

내부 동작:
```bash
git reset --hard 26a83e2
git push origin main --force-with-lease
```

→ GitHub 원격도 박씨 2026-04-14 상태로 돌아감. 5분 후 Vercel 재배포 완료.

---

### 🟡 10/10 리팩토링만 싫음 — Discord/YouTube 이식까지는 유지

```bash
cd ~/namoneygoal
./scripts/rollback.sh soft
```

내부 동작:
```bash
git reset --hard safe-rollback-point
git push origin main --force-with-lease
```

→ 1차 리팩토링(Discord 번들 + 12슬롯 다양화)은 유지. 2차 10/10 작업만 제거.

---

### 🟢 특정 커밋만 되돌리기 — revert (커밋 이력 보존)

```bash
cd ~/namoneygoal
git log --oneline -20           # 커밋 확인
git revert <commit-hash>        # 해당 커밋을 반대 분개로 취소
git push origin main
```

헌법 제2조 원칙: **"삭제는 없다, 반대 분개만 있다"** — revert 가 공식 방법.

---

## 스위칭 시나리오 (롤백 아닌 전환)

### 공인중개사 12명 전용으로 변경

```bash
cd ~/namoneygoal
node scripts/switch-registry.js realtors-only
git commit -am "slot: 공인중개사 12명 전용으로 전환"
git push
```

### 생태계 다양화로 변경

```bash
cd ~/namoneygoal
node scripts/switch-registry.js ecosystem
git commit -am "slot: 부동산 생태계 다양화 12슬롯으로 전환"
git push
```

---

## force push 경고

`--force-with-lease` 는 다른 사람이 그 사이 push 했으면 거부됨. `--force` 대신 이거 사용.

namoneygoal 은 박씨 1인 운영이므로 충돌 거의 없음. 그래도 안전 우선.

---

## 커밋 이력 전체 보기

```bash
cd ~/namoneygoal
git log --oneline --graph --decorate -30
```

각 커밋에 이유/맥락이 명시되어 있어 어느 지점으로 돌아갈지 박씨가 선택 가능.

---

*헌법 제2조: 재공품을 방치하지 않는다. 원할 때 언제든 되돌린다.*
