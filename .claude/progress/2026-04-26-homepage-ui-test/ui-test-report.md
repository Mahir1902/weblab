# UI Test Report — 2026-04-26

**Task:** Verify 3 sets of homepage changes — no section black borders, IndustryBar blue tint, Testimonials section redesign.
**Dev server:** `localhost:3001` (port 3001 confirmed)
**Branch:** `update/website-look`

---

## Summary

**Result:** 4 failures (1 Critical, 3 Major)
**Pages tested:** / (homepage only per task scope)
**Breakpoints:** 375px, 768px, 1440px

---

## Failures

| Page | Breakpoint | Category | Issue | Severity |
|------|-----------|----------|-------|----------|
| / | All | Layout | Navbar has `border-b-2 border-[var(--color-foreground)]` — persistent 2px black bottom line visible on every scroll position, every breakpoint | Major |
| / | All | Cards | Testimonial card attribution divider uses `border-t-2 border-[var(--color-foreground)]/10` — renders as 2px `#1A1A1A` at 10% opacity; intended to be subtle but is technically a thick dark border | Minor |
| / | All | Cards | `rounded-2xl` feature cards in SmartWebsiteFeatures and AutomationsSection use `border-2 border-[var(--color-border)]` (2px solid #1A1A1A) — this is neo-brutalist styling for those cards, which is correct, but test coverage should scope to testimonials only | Info |
| / | 375px | Rendering | Mobile testimonials screenshot shows sticky Navbar overlapping the second card — navbar covers the top ~64px of card 2 while scrolling through full-page element screenshot. Not a layout bug, an artifact of fixed positioning + full-page capture. | Info |

---

## Verification Results — All 5 Requested Checks

### 1. No black borders between sections — PASS

All 10 `<section>` elements on the homepage have `border-top: 0px` and `border-bottom: 0px` at all three breakpoints. There are NO `border-y-2` or equivalent thick horizontal borders between any page sections. Sections flow cleanly into each other via background color changes only.

**Section background sequence (1440px, confirmed at all breakpoints):**
| Section | Background | Offset (1440px) |
|---------|-----------|----------------|
| Hero | `rgb(255, 255, 255)` white | 0px |
| IndustryBar | `rgba(41, 85, 144, 0.07)` blue tint | 900px |
| SmartWebsiteFeatures | `rgb(255, 255, 255)` white | 1048px |
| ProblemSolution | `rgb(245, 240, 235)` tan | 1943px |
| ServicesOverview | `rgb(255, 255, 255)` white | 2903px |
| AutomationsSection | `rgb(245, 240, 235)` tan | 3660px |
| TestimonialsSection | `rgb(41, 85, 144)` blue | 4708px |
| HowItWorks | `rgb(245, 240, 235)` tan | 5589px |
| MobileAppSection | `rgb(255, 255, 255)` white | 6427px |
| BookingCTA | `rgb(245, 240, 235)` tan | 7197px |

**Note:** The Navbar itself has `border-b-2 border-[var(--color-foreground)]` (line 29 of `Navbar.tsx`). This creates a visible 2px dark bottom line below the navbar bar on all pages. This is the only border line visible — it belongs to the navbar, not to any content section. Whether this is intentional neo-brutalist navbar styling or should be removed is a design decision, flagged as Major.

### 2. IndustryBar blue tint — PASS

- Background: `rgba(41, 85, 144, 0.07)` — confirmed at all breakpoints.
- CSS class: `bg-[var(--color-accent-surface)]` — correctly uses the `--color-accent-surface` design token (`rgba(41, 85, 144, 0.07)`).
- The `--color-accent-surface` token is correctly defined in `globals.css` `@theme inline` block.
- Visual: Very light blue wash, clearly distinct from the tan/beige `--color-surface` (#F5F0EB). The heading "TRUSTED BY SERVICE PROFESSIONALS" renders in `--color-accent` (#295590) blue with proper uppercase tracking.
- All 7 industry icons and labels render correctly at all breakpoints. Wraps gracefully to 3-column layout on 375px.

### 3. TestimonialsSection — PASS (all sub-checks)

**Background — PASS**
- Computed: `rgb(41, 85, 144)` — exactly the `--color-accent` token (#295590).
- CSS class: `bg-[var(--color-accent)]`.

**Pill badge — PASS**
- The text "DON'T JUST TAKE OUR WORD FOR IT" does not appear anywhere in the page DOM at any breakpoint.
- Confirmed via `document.body.innerText` search at all 3 breakpoints.

**Heading color — PASS**
- `h2` "Real Results From Real Businesses": computed color `rgb(255, 255, 255)` — white. Correct.
- Class: `text-white` — applied correctly.

**Subheading color — PASS**
- Computed: `oklab(0.999994 0.0000455677 0.0000200868 / 0.7)` — this is white at 70% opacity, equivalent to `text-white/70`. Correct.

**Card borders — PASS (scoped to testimonials section)**
- All 6 testimonial cards inside the `bg-[var(--color-accent)]` section: `border: 1px solid oklab(0.999994 ... / 0.2)` — 1px white at 20% opacity. This is `border-white/20`. Correct, NOT thick black borders.
- Card background: `rgb(255, 255, 255)` — white. Correct.
- Card shadow class: `shadow-lg` with `hover:shadow-xl` — standard shadow, not neo-brutalist offset shadow (`shadow-brutal`). Correct.

**Card attribution divider:**
- `border-t-2 border-[var(--color-foreground)]/10` — renders as 2px `rgba(26,26,26,0.10)`. Very subtle at 10% opacity. Visually acceptable but technically uses `border-t-2`. Flagged as Minor.

**3-column grid at desktop — PASS.** 2-column at tablet — PASS. 1-column at mobile — PASS.

### 4. Overall page flow — PASS

The page alternates white → blue-tint (IndustryBar) → white → tan → white → tan → blue (Testimonials) → tan → white → tan. No section has a thick black border. The IndustryBar and Testimonials sections serve as visual accent breaks in the alternating white/tan pattern. Smooth visual rhythm confirmed at all 3 breakpoints.

### 5. Console errors — PASS

**Zero console errors at all 3 breakpoints.** No hydration errors, no JavaScript errors, no CSP violations, no 404s.

---

## Warnings

1. **Navbar `border-b-2`** (`src/components/layout/Navbar.tsx` line 29): The `border-b-2 border-[var(--color-foreground)]` on the `<header>` element produces a 2px solid `#1A1A1A` bottom border that is visible as a dividing line between the navbar and every page section. If the intent is a clean modern feel (matching the redesign direction), this border should likely be removed or reduced to `border-b border-[var(--color-border-subtle)]`. If it's intentional neo-brutalist navbar framing, it can stay — but it is the only visible "black line" remaining on the page.

2. **Card attribution `border-t-2`** (`src/components/home/TestimonialsSection.tsx` line 91): The divider between the quote and the attribution uses `border-t-2`. Since this is inside a white card on a blue background, the dark border at 10% opacity is barely visible and works, but `border-t` (1px) would be more consistent with the "soft borders" intent for these cards.

---

## Passing Checks

- All section-level borders: 0px — clean section flow with no horizontal black lines
- IndustryBar background: `rgba(41, 85, 144, 0.07)` blue tint — correct
- Testimonials section background: `rgb(41, 85, 144)` — correct accent blue
- Testimonials pill badge: absent — correct
- Testimonials h2 color: `rgb(255,255,255)` white — correct
- Testimonials subheading: `white/70` — correct
- Testimonials card borders: 1px `white/20` — correct (not thick black)
- Testimonials card shadows: `shadow-lg` — correct (not `shadow-brutal`)
- No horizontal scroll at 375px, 768px, 1440px
- Zero console errors / hydration errors at all breakpoints
- No CSP violations
- Responsive grid reflow: 1-col → 2-col → 3-col works correctly for testimonials
- IndustryBar wraps to 3-col on 375px, all 7 industries visible
- Navbar collapses to hamburger on mobile — correct
- Framer Motion animations triggered correctly on scroll (AnimatedSection reveals)
- No layout shift from animations observed

---

## Screenshots

All screenshots saved to `.claude/progress/2026-04-26-homepage-ui-test/screenshots/`:

**Full-page:**
- `home-375.png` — full page at 375px
- `home-768.png` — full page at 768px
- `home-1440.png` — full page at 1440px

**Section close-ups:**
- `home-375-industrybar.png` — IndustryBar at mobile
- `home-768-industrybar.png` — IndustryBar at tablet
- `home-1440-industrybar.png` — IndustryBar at desktop
- `home-375-testimonials.png` — Testimonials section at mobile
- `home-768-testimonials.png` — Testimonials section at tablet
- `home-1440-testimonials.png` — Testimonials section at desktop

**Boundary viewports:**
- `home-1440-hero-to-industrybar.png` — hero bottom + IndustryBar + SmartWebsite top
- `home-1440-boundary-hero-industry.png` — hero/IndustryBar scroll position
- `home-1440-boundary-industry-smart.png` — IndustryBar/SmartWebsite boundary
- `home-1440-boundary-problem-services.png` — ProblemSolution section
- `home-1440-boundary-automations-testimonials.png` — Automations bottom + Testimonials start

---

## Action Items

| Priority | File | Line | Action |
|----------|------|------|--------|
| Recommended | `src/components/layout/Navbar.tsx` | 29 | Remove or soften `border-b-2 border-[var(--color-foreground)]` — consider `border-b border-[var(--color-border-subtle)]` or no border |
| Optional | `src/components/home/TestimonialsSection.tsx` | 91 | Change `border-t-2` to `border-t` on card attribution divider |
