---
name: Neo-brutalist redesign design token values
description: Verified token values for the neo-brutalist redesign (2026-04-25): accent is dark navy #295590, background is white #FFFFFF, surface is cream, footer is #1A1A1A
type: project
---

The neo-brutalist redesign (branch: update/website-look) changed the color palette away from the original dark theme. Verified computed values as of 2026-04-25:

- `--color-accent`: `#295590` (dark navy blue, rgb(41, 85, 144)) — NOT the previous `#3B82F6` or `#2563eb`
- `--color-background`: `#fff` / `#FFFFFF` (white) — NOT the previous `#0A0A0A` dark background
- `--color-surface`: `rgb(245, 240, 235)` (warm cream tone)
- Footer background: `rgb(26, 26, 26)` = `#1A1A1A` (dark charcoal)
- Card borders: `2px solid rgb(26, 26, 26)` with offset shadow `rgb(26, 26, 26) 4px 4px 0px 0px`
- Button borders: same dark neo-brutalist treatment

**Why:** This is a full light-theme neo-brutalist redesign. The CLAUDE.md and global memory still reference the old dark values (`#0A0A0A` background, `#3B82F6` accent) — those docs are stale for the update/website-look branch.

**How to apply:** When testing or reviewing on this branch, expect white backgrounds and dark navy accent. Do not flag white background as a bug. Do not flag `#295590` as wrong — it replaced `#3B82F6` intentionally.
