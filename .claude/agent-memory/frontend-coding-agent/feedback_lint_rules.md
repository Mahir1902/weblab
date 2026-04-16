---
name: feedback_lint_rules
description: ESLint rules from eslint-config-next that catch common patterns — react-hooks/set-state-in-effect and fixes
type: feedback
---

## `react-hooks/set-state-in-effect` rule

**Rule:** Do not call `setState` synchronously in the body of a `useEffect`. This catches patterns like `useEffect(() => setState(true), [])`.

**Why:** eslint-config-next includes this rule to prevent cascading renders from synchronous state updates in effects.

**How to apply:** Whenever setting state inside a useEffect (especially for mounted guards or simple one-time state changes), wrap the setState in a `setTimeout(..., 0)` to make it async:

```tsx
// Fails lint:
useEffect(() => setMounted(true), []);

// Passes lint:
useEffect(() => {
  const t = setTimeout(() => setMounted(true), 0);
  return () => clearTimeout(t);
}, []);
```

This applies to: `ThemeToggle.tsx`, any new component with a mounted guard, and the Typewriter component in `AnimatedHero.tsx`.

## `@typescript-eslint/no-unused-expressions` warning

Ternary expressions used for side effects (e.g., `condition ? fn1() : fn2()`) trigger this warning. Use `if/else` instead:

```tsx
// Warns:
x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);

// Clean:
if (x === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
```
