---
name: --color-bg is an undefined design token
description: services/about/contact/layout pages use bg-[var(--color-bg)] but this token does not exist in globals.css @theme
type: project
---

Pages using `bg-[var(--color-bg)]`: `src/app/services/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/layout.tsx`, `src/components/home/MobileAppSection.tsx`, `src/components/layout/Footer.tsx`.

The `@theme inline` block in `globals.css` defines `--color-background: var(--rt-bg)`. Tailwind maps this to the class `bg-background`. There is NO `--color-bg` alias defined anywhere.

When `bg-[var(--color-bg)]` is used, Tailwind v4 renders `background-color: var(--color-bg)` but this CSS custom property is undefined, so the browser computes it as `rgba(0, 0, 0, 0)` (transparent).

**Why the sections still look correct visually in dark mode:** The `<html>` element has `background-color: var(--rt-bg)` (#0A0A0A), so transparent sections inherit the dark background. This makes the bug invisible in dark mode. In light mode, they inherit white. The sections that correctly use `bg-[var(--color-surface)]` compute `rgb(17,17,17)` in dark mode.

**How to apply:** Any time you see `bg-[var(--color-bg)]` in this codebase, flag it as using an undefined token. The correct replacement is `bg-background` (Tailwind token) or `bg-[var(--color-background)]`. Do not introduce new uses of `--color-bg`.
