# NAMONEYGOAL 에이전트 프로토콜 v3.0

> 이 문서는 Claude Code가 namoneygoal 레포지토리에서 작업할 때 따라야 하는 가이드입니다.

---

## 1. Branch Identity (2-Axis System)

| 축 | 값 | 설명 |
|----|-----|------|
| **Governance** | `collaborator` | HQ와 강하게 연동. 구조/룰/업데이트 HQ 주도 |
| **Cognitive** | `creator` | 콘텐츠 중심. AI는 도우미. 출력=콘텐츠 |

### HQ Access 권한
```
✅ templates    - 페이지/컴포넌트 템플릿
✅ sync         - HQ 동기화 시스템
✅ broadcast    - 방송/강의 시스템
❌ claude-code  - (Creator 타입 - 불필요)
❌ sdk          - (Creator 타입 - 불필요)
```

### 캐릭터 프로필
- **본성**: 크리에이티브 스튜디오, 비주얼 중심
- **강점**: 프리미엄 시각 콘텐츠, 디자인 감각
- **전략**: 콘텐츠 제작에 집중, 시스템은 HQ 위임

---

## 2. 프로젝트 개요

### 목적
LOTUS Creative Studio — Bloom Beyond Limits

### Focus 영역
- 크리에이티브 콘텐츠 제작
- 프리미엄 비주얼 경험
- 스튜디오 프로덕션

### 기술 스택
- 순수 정적 사이트 (HTML/CSS/JS)
- GitHub Pages 호스팅
- PWA manifest 지원

---

## 3. HQ 연동

이 프로젝트는 **DTSLIB HQ**에서 관리됩니다.

| 항목 | 값 |
|------|-----|
| **본사 레포** | dtslib1979/dtslib-branch |
| **브랜치 ID** | namoneygoal |
| **상태** | active |
| **공개** | public |
| **도메인** | lotus.kr |
| **레지스트리** | `hq/registry/branches.json` |

---

## 4. 폴더 구조

```
namoneygoal/
├── index.html              # 메인 프로덕션 페이지
├── config.json             # 사이트 설정
├── branch.json             # 프랜차이즈 OS 설정
├── CLAUDE.md               # 이 문서
│
├── assets/
│   ├── manifest.json       # PWA 설정
│   └── icons/              # 앱 아이콘
│
├── articles/               # 아티클 콘텐츠
├── card/                   # 명함 페이지
├── staff/                  # 스태프 포털
├── studio/                 # 크리에이티브 스튜디오
├── tools/                  # 프로덕션 도구
└── docs/                   # 문서
```

---

## 5. 디자인 시스템

| 토큰 | 값 |
|------|-----|
| **Primary** | `#A855F7` (purple) |
| **Accent** | `#F59E0B` (amber) |
| **Background** | `#0a0a14` (deep navy) |
| **Text** | `#f5f5f5` |
| **Fonts** | Inter, Cinzel, Cormorant Garamond |

---

## 6. 커밋 컨벤션

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 업데이트
style: 디자인 변경
content: 콘텐츠 추가/수정
studio: 스튜디오 작업
visual: 비주얼/이미지 관련
```

커밋 메시지 끝:
```
Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

## 7. Creator 타입 작업 가이드

### 핵심 원칙
> "비주얼이 먼저. 콘텐츠가 말한다."

### AI 활용 방식
- 콘텐츠 아이디어 브레인스토밍
- 카피/캡션 작성 보조
- 레이아웃 구조 제안
- 비주얼 컨셉 정리

### 하지 않는 것
- 복잡한 자동화 시스템 구축
- SDK 개발
- 코드 중심 작업

---

## 8. 작업 시 주의사항

1. 수정 전 반드시 `git pull` 실행
2. 커밋 메시지는 명확하게
3. 이미지 파일은 적절한 크기로 최적화
4. 비주얼 품질 우선
5. **Creator 원칙**: 콘텐츠 제작에 집중

---

*Version: 3.0*
*Last Updated: 2026-01-27*
*Affiliation: DTSLIB HQ (Collaborator)*
