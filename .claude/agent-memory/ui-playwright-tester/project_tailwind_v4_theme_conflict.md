---
name: Tailwind v4 @theme inline CSS variable conflict
description: Tailwind v4 @theme inline with var() references — built-in color tokens override :root custom properties, causing wrong computed colors
type: project
---

In this project, `globals.css` defines `:root { --rt-accent: #295590 }` and then `@theme inline { --color-accent: var(--rt-accent) }`. However, Tailwind v4 has built-in `--color-accent` and related color mappings that resolve in the cascade before the `:root` definition, causing the browser to compute `--rt-accent` as `#2563eb` (Tailwind's blue-600) and `--color-foreground` as empty string.

**Why:** Tailwind v4 generates its own CSS custom properties for the theme system. When `@theme inline` maps `--color-accent: var(--rt-accent)`, the Tailwind default theme's `--color-accent` definition may win depending on specificity/source order.

**How to apply:** When debugging "wrong accent color" or "token resolves to Tailwind default instead of custom value" — check if `@theme inline` is using `var()` references that collide with Tailwind built-ins. The fix is to override with direct hex values in `@theme inline` rather than chaining variable references: `--color-accent: #295590` instead of `--color-accent: var(--rt-accent)`.
