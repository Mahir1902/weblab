# Coding Notes — Navbar Multi-Dropdown Refactor

## Files Changed

### `src/components/layout/Navbar.tsx` (multi-dropdown generic refactor)
- Replaced `dropdownOpen: boolean` with `openDropdown: string | null` — keyed by `link.href`
- Replaced `mobileServicesOpen: boolean` with `mobileAccordionOpen: string | null` — keyed by `link.href`
- Added `FEATURES` to imports from `@/lib/constants`
- Added `type { Service }` import from `@/types` for the `DROPDOWN_ITEMS` lookup map type
- Added module-level `DROPDOWN_ITEMS: Record<string, Service[]>` mapping `'/services'` → `SERVICES` and `'/features'` → `FEATURES`
- `handleDropdownEnter` now accepts `href: string` and calls `setOpenDropdown(href)`
- `handleDropdownLeave` calls `setOpenDropdown(null)` after 150ms timeout
- Desktop dropdown: `isOpen = openDropdown === link.href`; items from `DROPDOWN_ITEMS[link.href] ?? []`; each item links to `${link.href}/${item.id}`; "View All {link.label}" footer link points to `link.href`
- Mobile accordion: `isExpanded = mobileAccordionOpen === link.href`; toggle uses functional setState `prev => prev === link.href ? null : link.href`; items from `DROPDOWN_ITEMS[link.href] ?? []`; each item links to `${link.href}/${item.id}`; "View All {link.label}" at top links to `link.href`
- Route change reset block: `setMobileServicesOpen(false)` → `setMobileAccordionOpen(null)`
- Escape key handler: `setDropdownOpen(false)` → `setOpenDropdown(null)`
- Hamburger onClick: `setMobileServicesOpen(false)` → `setMobileAccordionOpen(null)`
- `aria-expanded` on each desktop trigger now uses per-link `isOpen` boolean

## Previous Session Notes (Navbar Services Dropdown — initial implementation)
- Added `useRef` for `dropdownTimeoutRef`, hover debounce (150ms close delay)
- Added Escape key listener via `useEffect`
- Desktop: `AnimatePresence + motion.div` dropdown panel
- Mobile: staggered `AnimatePresence` accordion
- All Framer Motion eases: `ANIMATION.ease.easeOut` / `ANIMATION.ease.easeInOut` (cubic-bezier arrays)
- All colors: `var(--color-*)` CSS custom properties only
- `src/lib/constants.ts` (deleted — stale duplicate; `.tsx` now is the only file)

## Deviations from Plan
None. All specified changes implemented as described.

## Follow-up Concerns
- Pre-existing lint errors exist in `.agents/skills/` and `.claude/progress/` test files — zero errors in `src/`.

## Build Status
- `npm run build`: PASS — 14 static pages (added `/features` route)
- `npx eslint src/`: PASS — 0 errors, 0 warnings
