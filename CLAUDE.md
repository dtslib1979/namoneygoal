# BUCKLEY Agent Protocol

> Claude Code agent guide for the buckley repository.

---

## 1. Project Overview

### Purpose
Broadcasting Content Platform (On Air. On Point.)

### Tech Stack
- Pure static site (HTML/CSS/JS)
- GitHub Pages hosting
- PWA manifest support

### Core Values
- Broadcasting content creation & management
- Streaming resource management
- Mobile-first, premium design
- Pink (#EC4899) + Teal (#14B8A6) theme

---

## 2. HQ Integration

This project is managed by **DTSLIB HQ**.

| Item | Value |
|------|-------|
| **HQ Repo** | dtslib1979/dtslib-branch |
| **Branch ID** | buckley |
| **Status** | active |
| **Visibility** | public |
| **Domain** | buckley.kr |
| **Established** | 2026.01.23 |

---

## 3. Folder Structure

```
buckley/
├── index.html              # Main production page (premium single-page)
├── config.json             # Site configuration
├── branch.json             # Franchise OS settings
├── CLAUDE.md               # This document
├── .nojekyll               # Disable Jekyll processing
├── robots.txt              # SEO robots
├── sitemap.xml             # Sitemap
│
├── assets/
│   ├── manifest.json       # PWA manifest
│   └── icons/              # App icons
│
├── articles/
│   ├── index.html          # Articles list page
│   └── articles.json       # Articles registry
│
├── card/
│   └── index.html          # Business card page (OG-enabled)
│
├── staff/
│   └── index.html          # Staff portal (access-controlled)
│
├── studio/
│   └── index.html          # Broadcasting studio tools
│
└── tools/
    └── index.html          # Content creation tools
```

---

## 4. Design System

| Token | Value |
|-------|-------|
| **Primary** | `#EC4899` (pink) |
| **Accent** | `#14B8A6` (teal) |
| **Background** | `#0f0a1a` (dark purple) |
| **Text** | `#f5f5f5` |
| **Fonts** | Inter, Cinzel, Cormorant Garamond |

---

## 5. Staff Access

- Access code: configured in `config.json`
- Storage key: `buckley_staff_auth` (sessionStorage)
- Entry point: `/staff/`

---

## 6. Commit Convention

```
feat: New feature
fix: Bug fix
docs: Documentation update
style: Design changes
content: Content add/modify
build: Production build changes
```

---

*Last updated: 2026-01-23*
*Affiliation: DTSLIB HQ*
