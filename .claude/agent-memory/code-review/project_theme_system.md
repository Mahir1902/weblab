---
name: Theme system conventions
description: How the light/dark CSS variable system is structured in this project and what invariants to verify during review
type: project
---

The project uses `next-themes` with `attribute="class"` — the `.dark` class is added to `<html>` by next-themes.

**Variable naming convention:**
- Runtime CSS custom properties live in `:root` (light) and `.dark` (dark) blocks in `globals.css`
- Tailwind design tokens are mapped in `@theme inline` block, referencing those runtime vars
- Runtime vars: `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-accent`, `--color-accent-hover`, `--color-accent-dim`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-dim`, `--color-border`, `--color-border-subtle`, `--color-danger`, `--color-success`
- The `@theme inline` var for background is named `--color-background` (maps to `var(--color-bg)`), note the different name avoids self-reference

**Hydration safety checklist:**
- `suppressHydrationWarning` belongs on `<html>`, not `<body>`
- `ThemeProvider` ('use client') wraps children inside `<body>`, not wrapping `<html>`
- `ThemeToggle` must have a mounted guard (`useState(false)` + `useEffect` -> `setMounted(true)`) to prevent SSR/client mismatch on icon rendering
- `defaultTheme="system"` with `enableSystem` is the correct default

**Light mode palette (`:root`):**
- bg: #FFFFFF, surface: #F9FAFB, accent: #2563EB
- text-primary: #111827, text-muted: #6B7280
- Note: accent in light mode is #2563EB (darker blue for contrast on white), while dark mode accent is #3B82F6 (lighter blue for contrast on dark)

**Always-dark hero exception:**
- `AnimatedHero` intentionally stays dark regardless of theme (canvas wave background requires it)
- This is a documented design decision — the hero `bg-[#0A0A0A]` is intentional
- However even intentional exceptions should use CSS tokens where possible

**Why:** The theme system was added in the 2026-04-11 session. Multiple convention violations were found in the initial implementation that need fixing before the system is fully correct.

**How to apply:** On every review touching globals.css or theme-related components, verify: (1) @theme inline has no self-referential vars, (2) color-scheme declared, (3) no body transition conflicts with disableTransitionOnChange, (4) all non-hero components use var(--color-*) not raw hex.
