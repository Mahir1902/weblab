# Devil's Advocate — Hero Background Orbs

**Task:** Add CSS-animated radial gradient orbs + dot grid texture to the hero section.
**Date:** 2026-03-17
**Reviewer:** Devil's Advocate Agent

---

## Overall Verdict

The plan is largely sound. The CSS has already been written into `globals.css` (lines 116–168) and appears correct in structure. There are **two real issues**, two **minor concerns** worth noting, and the rest of the questions raised are non-issues.

---

## Real Issues

### 1. `will-change: transform` + `filter: blur(120px)` — Safari iOS GPU memory pressure (REAL RISK, low-medium severity)

This is the most credible risk in the plan. On Safari iOS (especially iPhone 12 and older, or any device with <3 GB RAM), combining `will-change: transform` with a large `filter: blur()` forces the browser to promote the element to its own GPU compositing layer *and* re-rasterize the blur on every frame. With three 600–700 px orbs doing this simultaneously, total GPU texture memory usage can spike to 50–100 MB — enough to trigger a layer eviction or jank on lower-end devices.

**What the plan gets right:** The orbs animate only `transform` (translate + scale), so the blur itself is not re-computed on every frame on Chrome/Firefox (which cache the blurred texture and only re-composite the transform). Safari, however, re-applies `filter` on every compositing update in some versions.

**Recommended mitigation (not blocking, but worth doing):** Add a `@media (max-width: 768px)` override that reduces blur from `120px` to `60px` and reduces orb dimensions by 30–40%. This halves the rasterized texture size on mobile without changing the visual effect noticeably on small screens. If the coding agent hasn't done this, it should.

**Is this a build blocker?** No. The site targets Sydney local service businesses — the primary audience is likely on mid-to-high-end phones. The risk is real but acceptable at launch; it should be logged as a follow-up.

---

### 2. `prefers-reduced-motion` only stops animation — orbs remain visible (REAL ISSUE, low severity)

The current implementation sets `animation: none` for reduced-motion users but leaves the orbs fully rendered and blurred in place. A user with vestibular sensitivity who has `prefers-reduced-motion` enabled will still see three large glowing blobs on the page, which can be visually distracting.

The correct pattern is to also set `opacity: 0` (or `display: none`) on the orbs under reduced-motion, not just stop the animation. The dot grid is correctly handled (`display: none`), but the orbs are not.

**This is a real accessibility gap.** It's not catastrophic but violates the spirit of WCAG 2.3.3 (Animation from Interactions). The coding agent should add:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-orb-a,
  .hero-orb-b,
  .hero-orb-c {
    animation: none;
    opacity: 0;   /* ADD THIS */
  }
}
```

---

## Minor Concerns (Not Blocking)

### 3. Stacking context from the orb container div

The plan inserts a `<div aria-hidden="true">` with `position: absolute; inset: 0` immediately inside `<section>`. The section already has `overflow-hidden`. The orb container div does **not** create a new stacking context on its own (it has no `z-index`, `opacity < 1`, `transform`, `filter`, or `isolation` applied to the container itself — those are on the child `.hero-orb` divs). The existing `z-10` on the content wrapper will correctly stack above it.

**Verdict: Not an issue**, provided the container div has no `z-index` set. Confirm the coding agent does not accidentally add one.

### 4. Tailwind v4 compatibility with custom `@keyframes` in globals.css

Tailwind v4 processes `globals.css` through its own PostCSS pipeline, but plain CSS `@keyframes` and utility class definitions outside `@theme` are passed through untouched. There is no JIT class-scanning conflict because the orb classes (`.hero-orb`, `.hero-orb-a`, etc.) are not Tailwind utility classes — they are authored CSS classes applied directly in JSX. Tailwind v4 does not purge or transform them.

**Verdict: Not an issue.**

---

## Non-Issues (Definitively Cleared)

### 5. SSR / Next.js 16 concerns with decorative CSS classes

The orb divs are static HTML (`<div aria-hidden="true">` with no state, no hooks, no dynamic values). They live inside `AnimatedHero.tsx` which is already a `'use client'` component (and wrapped by `HeroWrapper` with `ssr: false`). There are zero SSR concerns — no hydration mismatch is possible because the component is client-only by project convention.

**Verdict: Not an issue.**

### 6. CSP `style-src` conflicts with inline styles on orb divs

The orb divs use CSS classes, not inline `style` attributes. The gradient colors and dimensions are defined in `globals.css` utility classes. There are no runtime inline styles being injected. The existing CSP `style-src 'self' 'unsafe-inline'` in `next.config.ts` already permits inline styles anyway, and is required by Next.js itself.

**Verdict: Not an issue.**

### 7. `aria-hidden="true"` sufficiency

For purely decorative background elements with no text, no interactive role, and no meaningful visual information, `aria-hidden="true"` is the correct and sufficient ARIA pattern. Screen readers will skip the entire subtree.

**Verdict: Not an issue.**

### 8. Simpler alternatives

The alternative approaches (SVG backgrounds, CSS `background` gradients, a single static radial-gradient on the `<section>`) would achieve a roughly similar visual result with less GPU overhead. However, the animated float adds genuine polish that aligns with the agency's positioning, and the implementation is clean. The complexity-to-value trade-off is reasonable.

**Verdict: The chosen approach is justified. No simpler alternative is strictly necessary.**

---

## Summary of Actions Required

| # | Severity | Action |
|---|----------|--------|
| 1 | Low-medium | Coding agent: add `@media (max-width: 768px)` to reduce blur to `60px` and orb size on mobile |
| 2 | Low (accessibility) | Coding agent: add `opacity: 0` to `.hero-orb-a/b/c` under `prefers-reduced-motion: reduce` |
| 3 | Informational | Confirm orb container `<div>` has no `z-index` set |

Items 1 and 2 are the only changes that should be made before this task is marked complete. The rest of the plan is solid.
