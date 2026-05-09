---
name: Theme system conventions
description: How the light/dark CSS variable system is structured in this project and what invariants to verify during review
type: project
---

The project is now **light-only** — dark mode and `next-themes` have been removed as of the 2026-05-09 session.

**Variable naming convention (current as of 2026-05-09):**
- Runtime CSS custom properties live only in `:root` in `globals.css`, prefixed `--rt-*`
  - `--rt-bg`, `--rt-surface`, `--rt-surface-2`, `--rt-accent` (#295590), `--rt-accent-hover`, `--rt-accent-dim`, `--rt-accent-surface`, `--rt-text-primary`, `--rt-text-secondary`, `--rt-text-muted`, `--rt-text-dim`, `--rt-border`, `--rt-border-subtle`, `--rt-danger`, `--rt-success`, `--rt-foreground`
- Tailwind design tokens in `@theme inline` block use `--color-*` names with **hardcoded values** (not referencing `--rt-*` vars directly), e.g. `--color-background: #FFFFFF`, `--color-accent: #295590`
- Components use `var(--color-*)` via Tailwind utilities, e.g. `bg-[var(--color-accent)]`
- `color-scheme: light` is declared on `:root`

**Current accent color:**
- Accent is `#295590` (navy blue), NOT `#3B82F6` (electric blue). Memory was stale. Update the coding-agent-patterns memory accordingly.

**No dark mode:** There is no `.dark` block, no ThemeToggle, no next-themes. The site is light-only.

**Why:** Dark mode was removed. The runtime `--rt-*` vars and `@theme inline` `--color-*` tokens exist as a two-layer system — `--rt-*` for direct CSS use (scrollbars, body bg), `--color-*` for Tailwind utility class generation.

**How to apply:** On every review touching globals.css, verify: (1) @theme inline has no self-referential vars, (2) color-scheme: light is declared, (3) all components use var(--color-*) not raw hex, (4) no dark mode code has re-appeared.
