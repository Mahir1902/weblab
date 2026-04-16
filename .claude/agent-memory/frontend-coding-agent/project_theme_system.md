---
name: project_theme_system
description: Light/dark/system theme implementation details — CSS vars, next-themes setup, AnimatedHero canvas exception
type: project
---

## Theme system added 2026-04-11

Light/dark/system theme switching was implemented using `next-themes` + CSS custom properties.

**Architecture:**
- `:root` defines light theme vars; `.dark` class (set by next-themes) defines dark theme vars
- `@theme inline` in globals.css proxies CSS vars into Tailwind tokens
- `ThemeProvider` at `src/components/providers/ThemeProvider.tsx` wraps the layout with `attribute="class"`, `defaultTheme="system"`, `enableSystem`
- `ThemeToggle` at `src/components/ui/ThemeToggle.tsx` — sun/moon button, uses `mounted` guard to avoid hydration mismatch
- `suppressHydrationWarning` is required on `<html>` element

**Known exception — AnimatedHero canvas:**
The WaveCanvas in `AnimatedHero.tsx` always uses a hardcoded dark background (`#0A0A0A`) because the blue wave animation requires a dark canvas to be visible. If the canvas bg were light, waves would be invisible. The hero section therefore always appears dark regardless of active theme. HeroWrapper loading skeleton is also hardcoded dark to match.

**Why:** Wave art design only works on dark backgrounds.
**How to apply:** Do not try to theme the canvas background in AnimatedHero. If a light-mode hero is ever needed, a new component with different wave colours would be required.
