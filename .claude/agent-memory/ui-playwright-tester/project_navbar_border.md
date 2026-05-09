---
name: Navbar border-b-2 on header
description: Navbar.tsx applies border-b-2 border-[var(--color-foreground)] to the fixed header element — visible 2px dark bottom line on all pages
type: project
---

`src/components/layout/Navbar.tsx` line 29: the `<header>` has class `border-b-2 border-[var(--color-foreground)]`.

This produces a visible 2px solid `#1A1A1A` bottom border below the navbar on every page at every breakpoint. It is the only persistent horizontal black line on the redesigned site.

**Why:** Part of the neo-brutalist design language (intentional framing of the sticky nav). Whether to keep it is a design decision — it was not flagged as a blocker in the 2026-04-26 test.

**How to apply:** When testing for "no black borders", exclude the navbar's own `border-b` from failure criteria — it's a known intentional element. Flag it as a warning, not a failure, unless the user asks for it to be removed.
