---
name: Alternating section background pattern on homepage
description: Homepage sections alternate white/tan in a strict pattern; verified 2026-04-26
type: project
---

The homepage uses a strict alternating white (#FFFFFF) / tan (#F5F0EB) background pattern across all 10 sections. Verified 2026-04-26 at 375px, 768px, 1440px with zero failures.

**Pattern (in DOM order):**
1. Hero (AnimatedHero) — `bg-white` = #FFFFFF
2. IndustryBar — `bg-[var(--color-surface)]` = #F5F0EB
3. SmartWebsiteFeatures — `bg-[var(--color-background)]` = #FFFFFF
4. ProblemSolution — `bg-[var(--color-surface)]` = #F5F0EB
5. ServicesOverview — `bg-[var(--color-background)]` = #FFFFFF
6. AutomationsSection — `bg-[var(--color-surface)]` = #F5F0EB
7. TestimonialsSection — `bg-[var(--color-background)]` = #FFFFFF
8. HowItWorks — `bg-[var(--color-surface)]` = #F5F0EB
9. MobileAppSection — `bg-[var(--color-background)]` = #FFFFFF
10. BookingCTA — `bg-[var(--color-surface)]` = #F5F0EB

**Token values:**
- White = `--color-background: #FFFFFF` (in `@theme inline` block in globals.css)
- Tan = `--color-surface: #F5F0EB` (in `@theme inline` block in globals.css)

**Note:** AutomationsSection, TestimonialsSection, and HowItWorks card interiors use `bg-white` hardcoded (not a token). This is intentional — card backgrounds sit on top of the section's tan background and need to be white for contrast.

**Why:** A regression test should verify no two consecutive sections share the same computed background. Using `page.evaluate()` to collect `getComputedStyle(el).backgroundColor` for all `<section>` elements and checking for consecutive duplicates is the correct approach.

**How to apply:** In any test touching page layout, assert the bg pattern by evaluating computed styles on all 10 `<section>` elements. The expected pattern is `white → tan → white → tan → white → tan → white → tan → white → tan`.
