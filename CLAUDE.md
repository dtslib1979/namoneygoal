# LOTUS Agent Protocol

> Claude Code agent guide for the lotus repository.

---

## 1. Project Overview

### Purpose
LOTUS Creative Studio (Bloom Beyond Limits)

### Tech Stack
- Pure static site (HTML/CSS/JS)
- GitHub Pages hosting
- PWA manifest support

### Core Values
- Creative content production
- Premium visual experience
- Mobile-first design
- Purple (#A855F7) + Amber (#F59E0B) theme

---

## 2. HQ Integration

This project is managed by **DTSLIB HQ**.

| Item | Value |
|------|-------|
| **HQ Repo** | dtslib1979/dtslib-branch |
| **Branch ID** | lotus |
| **Status** | active |
| **Visibility** | public |
| **Domain** | lotus.kr |
| **Established** | 2026.01.23 |

---

## 3. Folder Structure

```
lotus/
├── index.html              # Main production page
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
│   └── index.html          # Business card page
│
├── staff/
│   └── index.html          # Staff portal
│
├── studio/
│   └── index.html          # Creative studio tools
│
├── tools/
│   └── index.html          # Production tools
│
└── docs/
    └── chat.html           # Chat Hub
```

---

## 4. Design System

| Token | Value |
|-------|-------|
| **Primary** | `#A855F7` (purple) |
| **Accent** | `#F59E0B` (amber) |
| **Background** | `#0a0a14` (deep navy) |
| **Text** | `#f5f5f5` |
| **Fonts** | Inter, Cinzel, Cormorant Garamond |

---

## 5. Staff Access

- Access code: configured in `config.json`
- Storage key: `lotus_staff_auth` (sessionStorage)
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
