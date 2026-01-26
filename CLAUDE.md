# NAMONEYGOAL 에이전트 프로토콜 v3.0

> 이 문서는 Claude Code가 namoneygoal 레포지토리에서 작업할 때 따라야 하는 가이드입니다.

---

## 1. Branch Identity (2-Axis System)

| 축 | 값 | 설명 |
|----|-----|------|
| **Governance** | `collaborator` | HQ와 강하게 연동. 구조/룰/업데이트 HQ 주도 |
| **Cognitive** | `hybrid` | Creator(콘텐츠) + Builder(시스템) 공존 |

### HQ Access 권한
```
✅ templates    - 페이지/컴포넌트 템플릿
✅ sync         - HQ 동기화 시스템
✅ broadcast    - 방송/강의 시스템
✅ claude-code  - Claude Code 에이전트 접근
❌ sdk          - (버티컬 특화 - 불필요)
```

### 캐릭터 프로필
- **정체성**: 시흥 부동산 중개인용 AI 워키토키 길드
- **본질**: AI 리터러시를 "허세 소비재"로 파는 직업 운영 시스템
- **구조**: 브랜치의 브랜치 (12슬롯 한정)
- **전략**: 첫 번째 버티컬 파일럿 → 검증 후 복제

---

## 2. 프로젝트 개요

### 목적
남원골 / namoneygoal — 부동산 중개인의 말이 자동으로 네이버에 쌓이는 12슬롯 한정 직업 운영 길드

### 핵심 가치
- 허세 소비재 (즉시 만족)
- 디지털 캐릭터 전환
- 생산성은 보너스

### Focus 영역
- 부동산 중개인 전용
- AI 워키토키
- 허세 포트폴리오 (명함/블로그/유튜브/사무실)

### 기술 스택
- 순수 정적 사이트 (HTML/CSS/JS)
- GitHub Pages 호스팅
- Branch HQ PR 시스템 연동

---

## 3. HQ 연동

이 프로젝트는 **DTSLIB HQ**에서 관리됩니다.

| 항목 | 값 |
|------|-----|
| **본사 레포** | dtslib1979/dtslib-branch |
| **브랜치 ID** | namoneygoal |
| **상태** | active |
| **공개** | public |
| **도메인** | namoneygoal.kr |
| **레지스트리** | `hq/registry/branches.json` |
| **타입** | 버티컬 브랜치 (브랜치의 브랜치) |

---

## 4. 폴더 구조

```
namoneygoal/
├── index.html              # 남원골 HQ
├── config.json             # 사이트 설정
├── branch.json             # 프랜차이즈 OS 설정
├── CLAUDE.md               # 이 문서
│
├── slots/
│   ├── slot01/             # 중개인 1 전용 페이지
│   ├── slot02/
│   └── ... (slot12까지)
│
├── modules/
│   ├── card.html           # 내 디지털 명함
│   ├── blog.html           # 내 디지털 블로그
│   ├── video.html          # 내 디지털 유튜브
│   ├── walkie.html         # AI 워키토키 입력
│   └── pr.js               # PR 버튼 → 카톡 접수
│
├── console/
│   ├── requests.html       # PR 요청 로그
│   └── billing.html        # 정산 보드
│
├── docs/
│   └── concept.md          # 컨셉 문서
│
└── assets/
    └── icons/
```

---

## 5. 슬롯 시스템

### 구조
- 12슬롯 한정
- slot01: 앵커 (친구 무료)
- slot02~12: 유료

### 각 슬롯 구성
```
slots/slotXX/
├── index.html      # 개인 사무실
├── card.html       # 디지털 명함
├── blog.html       # 블로그
└── config.json     # 개인 설정
```

### 슬롯 = 브랜치의 브랜치
겉으로는 "각자의 사이트", 실제로는 **단일 관제 시스템**.

---

## 6. 커밋 컨벤션

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 업데이트
slot: 슬롯 관련 작업
module: 모듈 관련 작업
console: 관제/정산 관련
pr: PR 시스템 관련
```

커밋 메시지 끝:
```
Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

## 7. Hybrid 타입 작업 가이드

### Creator 모드 (콘텐츠)
- 슬롯별 콘텐츠 제작
- PD 모드 배치 작업
- 영상/글 템플릿 관리

### Builder 모드 (시스템)
- PR 시스템 구축
- 관제 콘솔 개발
- 정산 보드 자동화

### 핵심 원칙
> "허세가 먼저 팔리고, 생산성은 나중에 따라온다."

---

## 8. 작업 시 주의사항

1. 수정 전 반드시 `git pull` 실행
2. 슬롯 작업 시 slot 번호 명확히 구분
3. PR 시스템은 Branch HQ와 연동 확인
4. 정산 데이터는 민감 정보 주의
5. **버티컬 특화**: 부동산 중개인 맥락 유지

---

## 9. 가격 구조

| 항목 | 금액 |
|------|------|
| 입장비 | 50만 원 |
| 월 유지 | 5만 원 |
| PR 호출 | 1만 / 건 |
| 세션 | 10만 / 시간 |

---

## 10. 타겟

- 시흥 부동산 중개인
- 이미 ChatGPT 사용자
- 확보된 풀: 10명+ (남원 네트워크)

---

*Version: 3.0*
*Last Updated: 2026-01-27*
*Affiliation: DTSLIB HQ (Collaborator - Vertical Branch)*
