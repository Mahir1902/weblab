---
name: next-themes hydration mismatch pattern
description: next-themes with attribute="class" adds "light" class on client, causing hydration mismatch unless suppressHydrationWarning is set on html element
type: project
---

This project uses `next-themes` with `attribute="class"` and `forcedTheme="light"` in `ThemeProvider.tsx`. On every page, the server renders `<html className="scroll-smooth">` but the client receives `<html className="scroll-smooth light" style="color-scheme: light">`. This causes a React hydration warning on every single page load.

**Why:** `next-themes` injects a blocking script that mutates the `<html>` element before React hydrates, which is by design but causes a server/client attribute mismatch.

**How to apply:** The standard fix is `suppressHydrationWarning` on the `<html>` element in `layout.tsx`. This suppresses the warning for only one level deep (the html element), which is the correct and safe approach. The site is light-only anyway, so the theme toggle machinery (ThemeProvider) could also simply be removed if dark mode is truly gone.
