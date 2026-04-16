---
name: AnimatedHero is architecturally dark-only
description: AnimatedHero component uses hardcoded dark hex values and a canvas background that always renders black — does not respond to light/dark theme switching
type: project
---

`src/components/home/AnimatedHero.tsx` was built as a dark-only component and has never been updated for theme switching.

Key violations:
- `section#home` has `bg-[#0A0A0A]` hardcoded — ignores `var(--color-bg)`
- `WaveCanvas` draws `#0A0A0A → #0D0D16` gradient on every animation frame via canvas 2D API — always dark regardless of `<html class>`, cannot be overridden by CSS
- `h1` uses `text-[#F9FAFB]` — near-white, readable only on the dark canvas
- 14 additional hardcoded hex values: `#3B82F6`, `#9CA3AF`, `#D1D5DB`, `#1F2937`, `#2563EB`, `#60A5FA`, `#93C5FD`, `#0D0D16`
- All CTAs and social proof text use hardcoded dark-mode-appropriate colors

**Why:** Component was written before light theme was added to the design system.

**How to apply:** When reviewing any changes to AnimatedHero, flag any hex literal as a convention violation. When implementing light mode for the hero, the canvas background draw call (line ~163) must read a CSS variable at runtime — canvas 2D API does not inherit CSS variables automatically, so the value must be read via `getComputedStyle(document.documentElement).getPropertyValue('--color-bg')` inside the `animate` loop.
