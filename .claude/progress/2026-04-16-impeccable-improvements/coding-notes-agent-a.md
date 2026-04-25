# Coding Notes — Agent A
## Task: Impeccable Improvements (2026-04-16)

---

## Files Changed

### 1. `src/app/globals.css`
- **Removed** the `.gradient-text` class entirely (Task 1). This class used a `linear-gradient` with hardcoded hex values to clip text, which violates the "no gradient text" design guideline.
- **Added** three new semantic typography utility classes at the bottom of the file (Task 4):
  - `.section-label` — monospace, 0.75rem, uppercase, accent color, letter-spaced
  - `.section-heading` — Syne font, fluid size via `clamp(1.75rem, 4vw, 2.5rem)`, weight 700
  - `.section-body` — 1.125rem, 1.7 line-height, `var(--color-text-secondary)` color

### 2. `src/lib/constants.tsx` (primary) + `src/lib/constants.ts` (secondary)
- **Added** `WAVE_COLORS` exported constant (Tasks 2 and 3). Contains dark/light wave palette arrays and gradient stop color pairs.
- **Added** `ANIMATION` exported constant (Task 3). Contains duration presets and cubic-bezier ease arrays typed as `[number, number, number, number]`.
- **Note**: Both `constants.tsx` and `constants.ts` exist in `src/lib/`. The `.tsx` file takes precedence in module resolution (Turbopack resolves `.tsx` before `.ts`). Both files were updated to keep them in sync, but only `constants.tsx` matters for the build.

### 3. `src/components/home/AnimatedHero.tsx`
- **Updated** import to include `WAVE_COLORS` from `@/lib/constants` (Task 2).
- **Replaced** hardcoded `DARK_WAVES` and `LIGHT_WAVES` inline arrays with references to `WAVE_COLORS.dark` and `WAVE_COLORS.light`. Used `as unknown as WaveConfig[]` cast because the `as const` tuple type from constants is more narrow than the mutable `WaveConfig[]` interface — the shape is identical at runtime (Task 2).
- **Updated** the canvas gradient stops inside the `animate()` RAF callback to use `WAVE_COLORS.gradients.dark` / `WAVE_COLORS.gradients.light` instead of hardcoded hex strings (Task 2).
- **Replaced** `<span className="gradient-text">While You Sleep</span>` with `<span className="text-[var(--color-accent)] font-extrabold">While You Sleep</span>` (Task 1).
- **Fixed pre-existing lint error**: `isDarkRef.current = resolvedTheme !== 'light'` was being set during render, which the `react-hooks/refs` rule flags as incorrect. Moved the assignment into a `useEffect(() => { ... }, [resolvedTheme])`. Behavior is unchanged — the ref is only read inside the RAF loop, not during React render. This was flagged by ESLint and required fixing per the task instructions.

### 4. `src/components/home/AutomationsSection.tsx` — No changes
Task 5 required checking whether `style={{ fontFamily: 'var(--font-syne)' }}` could be swapped for `font-syne` as a Tailwind class. After checking all usages with grep, no component in the codebase uses `font-syne` as a Tailwind class — the pattern is consistently inline styles. Tailwind v4's `@theme` mapping `--font-syne: var(--font-syne)` does register the token but the utility class `font-syne` is not verified to work since no other component uses it. Per task instructions: "leave this one as-is and skip this task."

### 5. `src/components/home/HowItWorks.tsx` — No changes
Same rationale as AutomationsSection.tsx above.

---

## Decisions

1. **`as unknown as WaveConfig[]` cast**: The `WAVE_COLORS.dark` array is typed as a deeply readonly const tuple. `WaveConfig[]` is a mutable interface array. The types are structurally identical but TypeScript refuses the direct assignment. Using `as unknown as WaveConfig[]` is the minimal-friction approach that avoids duplicating type definitions. An alternative would be to export a `WaveConfig` type from constants and use it there, but that creates a cross-dependency that was not requested.

2. **Pre-existing lint error fixed**: The `react-hooks/refs` error on `AnimatedHero.tsx:198` was not introduced by this task — it existed before. However, since the file was touched and lint must pass 0 errors, it was fixed. The `useEffect` approach is semantically correct: the ref update only needs to happen when `resolvedTheme` changes, and reading it inside the RAF loop (which runs after effects) is safe.

3. **`constants.tsx` vs `constants.ts`**: The `.tsx` file is the live, production version with JSX icon components. The `.ts` file appears to be an older version that hasn't been deleted. Both were updated. The `.ts` file should ideally be removed to avoid confusion, but that was outside this task's scope.

4. **`npm run lint` bin issue**: The `node_modules/.bin/eslint` shim is broken (throws `Cannot find module '../package.json'`). ESLint was run directly via `node node_modules/eslint/bin/eslint.js` instead, which works correctly and returned 0 errors after fixes.

---

## Build + Lint Status

- **`npm run build`**: PASS — all 5 routes static, 0 TypeScript errors
- **`npm run lint` (via direct node invocation)**: PASS — 0 errors, 0 warnings
