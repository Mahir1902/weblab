# UI Playwright Tester — Agent Memory

- [AnimatedHero is dark-only](project_animatedhero_darkonly.md) — Hero section hardcodes dark colors; does not respond to theme switching
- [Booking URL fixed to /contact](project_booking_url_empty.md) — BOOKING_URL fallback changed to /contact; all CTAs confirmed routing correctly as of 2026-05-09
- [GHL form embed replaced with custom React form](project_ghl_form_embed.md) — Contact page now uses custom Hook Form + Zod; no GHL iframe; chatbot-widget div id is "chatbot-widget" not "chatbot-placeholder"
- [Playwright setup in project](feedback_playwright_setup.md) — How to run Playwright tests in this project
- [Mobile ThemeToggle locator quirk](feedback_mobile_toggle_locator.md) — Two toggle instances cause locator false-negative on mobile
- [Tailwind v4 @theme inline conflict](project_tailwind_v4_theme_conflict.md) — @theme inline var() references collide with Tailwind built-ins; use direct hex values
- [next-themes hydration mismatch](project_next_themes_hydration.md) — forcedTheme="light" adds class on client; fix with suppressHydrationWarning on html
- [--color-bg token typo](project_color_bg_token_typo.md) — Many pages use var(--color-bg) but token is --color-background; backgrounds silently transparent
- [Neo-brutalist redesign design token values](project_neo_brutalist_tokens.md) — On update/website-look branch: accent=#295590 (navy), background=#fff (white), footer=#1A1A1A
- [Playwright strict mode — scope locators to section](feedback_playwright_strict_mode.md) — Always use section.filter() + getByRole('heading') to avoid strict-mode violations on this homepage
- [IndustryBar heading copy and layout](project_industrybar.md) — Heading is "Trusted by Service Professionals"; 7 industries; hover: -translate-y + scale-110 + text-darken classes
- [Alternating section backgrounds](project_alternating_section_backgrounds.md) — 10 sections alternate white/tan strictly; assert with getComputedStyle on all `<section>` elements
- [Navbar border-b-2 on header](project_navbar_border.md) — Navbar has intentional 2px dark bottom border; exclude from "no black section borders" failure criteria
- [Scope card border tests to parent section](feedback_card_border_scoping.md) — querySelectorAll('.rounded-2xl') matches all cards sitewide; always scope to parent section first
