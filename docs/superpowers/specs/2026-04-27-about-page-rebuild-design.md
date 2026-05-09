# About Page Rebuild — Design Spec

**Date:** 2026-04-27
**Goal:** Rebuild the About page to better express WebLab's brand value, remove the "Who We Work With" section, and optimise for SEO.

## Design Decisions

- **Structure:** Minimal + Deep (5 sections, fewer but each with substance)
- **Tone:** Approachable and human. Warm, relatable, down-to-earth.
- **Proof points:** Early stage, no hard stats. Lean into process, approach, and honest copy.
- **Copy rule:** No dashes between words and sentences. Use full stops, commas, or rewrite.
- **Reference:** WebSquatch.io/about (problem-agitation-solution narrative, niche-specific language, personality-driven)

## Page Structure

### Section 1: Hero
- **Background:** `--color-background` (white)
- **Layout:** Centered text, `max-w-4xl`, `pt-32 pb-20`
- **Elements:**
  - Pill badge: "OUR STORY" (existing pattern: mono font, accent-dim bg, accent border, uppercase tracking-widest)
  - H1: "Good Work Deserves to Be Found." with gradient applied to "to Be Found." via inline style (`#295590 → #3A7BD5 → #6BA3E8`, WebkitBackgroundClip text)
  - Subheading: "WebLab is a Sydney based agency that gives local service businesses the websites, automation, and lead systems they need to grow. Without the complexity or the big agency price tag."
- **SEO keywords embedded:** Sydney, agency, local service businesses, websites, automation, lead systems

### Section 2: Our Story + The Problem
- **Background:** `--color-surface` (#F5F0EB)
- **Layout:** Two-column grid (`lg:grid-cols-2`, `gap-12`, `items-center`)
  - Left: Narrative copy under "Why We Started" H2
  - Right: **Tradie illustration** (replacing the pull quote card)
- **Copy direction:**
  - Paragraph 1: Electricians, plumbers, builders doing great work but struggling to get found online. Competitors with half the skill winning jobs because of better websites or Google presence.
  - Paragraph 2: Missed calls turning into lost jobs. Five star reviews that nobody can find. Tradies juggling three apps, paying for tools they barely use, still losing enquiries.
  - Paragraph 3: "That's the gap we exist to close. Not with flashy marketing promises, but with the actual systems that turn good work into a growing business."
- **Image:** User-provided flat illustration of a tradie in hi-vis with digital elements (phone with 5 star reviews, calendar with bookings, notification bells, growth chart). Warm cream background, blue accent, bold clean outlines. File to be placed at `public/images/tradie-illustration.png`. Add proper alt text: "Illustration of a tradesperson surrounded by digital business tools including reviews, calendar, and growth analytics".
- **SEO keywords embedded:** electricians, plumbers, builders, Sydney, Google, website, reviews, automation

### Section 3: How We Work
- **Background:** `--color-background` (white)
- **Layout:** Centered heading block + 4 column card grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, `gap-6`)
- **Heading:** "Simple, Honest, End to End"
- **Subheading:** "Here's what working with us actually looks like."
- **Cards:** Numbered brutalist cards (border-2 border-foreground, shadow-brutal, hover translate pattern)
  - **Step 1 — Book a Free Call:** "30 minutes, no obligation. We learn about your business, where you're losing leads, and what you've already tried."
  - **Step 2 — We Audit and Plan:** "We review your current setup. Your website, Google presence, and follow up process. Then we map out exactly what needs fixing and in what order."
  - **Step 3 — We Build It:** "Website, CRM, automations, review funnels. We set it all up. You don't need to understand the tech. We handle everything."
  - **Step 4 — Launch and Grow:** "Go live, start capturing leads, and we stay with you. Ongoing support, monthly check ins, and optimisation as your business grows."
- **Animation:** Staggered AnimatedSection delays (i * 0.07s) per card
- **SEO keywords embedded:** website, CRM, automations, review funnels, Google presence, leads

### Section 4: FAQ
- **Background:** `--color-background` (white) — keeps alternation with surface CTA below
- **Layout:** Centered heading + single column accordion, `max-w-3xl`
- **Heading:** "Questions We Get Asked a Lot"
- **Subheading:** "Honest answers. No jargon."
- **Component:** Reuse existing `FaqAccordion` from `src/components/ui/FaqAccordion.tsx`
- **Questions:**
  1. **How much does it cost to work with WebLab?** — "It depends on what you need. We offer flexible monthly plans starting from a few hundred dollars. Every project starts with a free call so we can understand your business and give you a clear, honest quote with no surprises."
  2. **Do I need to be tech savvy to use your systems?** — "Not at all. We build everything for you and walk you through how it works. Most of our clients are tradies who just want things to run in the background. That's exactly what we set up."
  3. **What if I already have a website?** — "That's fine. We'll review what you have and let you know honestly whether it needs replacing or just improving. We never push a rebuild unless it's actually going to make a difference."
  4. **Are there lock-in contracts?** — "No. We earn your business every month. If things aren't working for you, you're free to walk away. We'd rather keep you because the results speak for themselves."
  5. **How long does it take to get set up?** — "Most clients are fully live within two to three weeks. That includes the website, CRM, automations, and review systems. We move fast because we know leads don't wait."
  6. **Do you only work with tradies in Sydney?** — "We're based in Sydney and most of our clients are local service businesses here. But we work with service businesses across Australia. If you quote jobs, take bookings, or dispatch crews, we can help."
- **SEO:** FAQPage JSON-LD structured data will be added for Google rich results
- **Animation:** AnimatedSection wrapper on the entire section

### Section 5: CTA
- **Background:** `--color-surface` (#F5F0EB) via BookingCTA component
- **Component:** Reuse existing `BookingCTA` from `src/components/ui/BookingCTA.tsx`
- **Props:**
  - `headline`: "Let's Talk About Your Business"
  - `subtext`: "Book a free 30 minute call. We'll have an honest conversation about where you are, where you want to be, and whether we can help you get there."
- **Fine print:** "No contracts. No pressure. Just results." (default from component)

## SEO Enhancements

### Metadata Update
```
title: "About WebLab — Sydney Agency for Local Service Businesses"
description: "WebLab builds websites, CRM systems, and automation for tradies and local service businesses across Sydney. Learn our story and how we work."
keywords: [
  "Sydney web agency for tradies",
  "about WebLab",
  "local business automation Sydney",
  "CRM for tradies Sydney",
  "website for plumbers electricians Sydney",
  "lead generation local service business"
]
openGraph.title: "About WebLab | Websites and Automation for Local Service Businesses"
openGraph.description: "We build the systems that help tradies and local service businesses get found, win more work, and grow. Based in Sydney."
```

### Structured Data (JSON-LD)
- **FAQPage schema** on the FAQ section (6 questions and answers)
- This enables FAQ rich results in Google search, increasing click-through rate

### Heading Hierarchy
- H1: "Good Work Deserves to Be Found."
- H2: "Why We Started"
- H2: "Simple, Honest, End to End"
- H2: "Questions We Get Asked a Lot"
- H2: "Let's Talk About Your Business"

## Sections Removed
- **"Who We Work With"** — 8 industry cards grid. Industries are now mentioned naturally in the story narrative. The homepage `IndustryBar` marquee already handles industry visibility.
- **"Why WebLab?"** — 4 value prop cards. These were generic. The value is now communicated through the story narrative, the process section, and the FAQ answers.

## Components and Patterns
- **Reuse:** `AnimatedSection`, `BookingCTA`, `FaqAccordion`
- **New image asset:** User-provided tradie illustration for Section 2 (to be placed in `public/images/`)
- **No new components needed** — everything fits existing patterns
- **Design tokens:** All from `globals.css @theme` block, no custom colours
- **Card pattern:** `border-2 border-foreground shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all`
- **Section rhythm:** Alternating `--color-background` / `--color-surface`

## Files to Modify
- `src/app/about/page.tsx` — full rewrite of page content
- `src/app/about/page.tsx` metadata export — updated SEO metadata

## Files to Add
- `public/images/tradie-illustration.png` (or similar) — user-provided image asset
