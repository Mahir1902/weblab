# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
npm run start    # Serve production build
```

No test framework is configured.

## Architecture

Next.js 16 App Router with `src/` directory and `@/*` import alias.

**Data flow:**
- All site-wide constants (services list, nav links, site config, booking URL) live in `src/lib/constants.ts`
- Types are in `src/types/index.ts`
- Page metadata helpers are in `src/lib/metadata.ts`
- `NEXT_PUBLIC_BOOKING_URL` env var controls all booking CTA links (falls back to `#book-a-call`)

**Styling:**
- Tailwind CSS v4 — no `tailwind.config.ts`. All design tokens (`--color-accent`, `--color-background`, etc.) are defined in the `@theme inline` block in `src/app/globals.css`
- Fonts: Geist Sans (body), Geist Mono, Syne 700/800 (headings h1–h3) — all loaded via `next/font/google` in `layout.tsx`
- Utility CSS classes (`.gradient-text`, `.glow-blue-sm`, `.marquee-track`, `.step-connector`) are defined in `globals.css`

**Animation pattern:**
- Framer Motion v12 requires cubic-bezier arrays, not string eases: `[0.25, 0.46, 0.45, 0.94]` not `'easeOut'`
- `AnimatedSection` is the reusable scroll-reveal wrapper (`src/components/ui/AnimatedSection.tsx`)
- `HeroWrapper` (`'use client'`) wraps `AnimatedHero` with `dynamic(..., { ssr: false })` — this is required because Next.js 16 forbids `ssr: false` inside Server Components directly

**Third-party integrations:**
- GoHighLevel (GHL) is allowlisted in the CSP in `next.config.ts` for scripts, frames, connections, and form actions
- GHL calendar and form embeds use placeholder IDs `#ghl-calendar-embed` and `#ghl-form-embed` in the contact page
- `ChatbotPlaceholder` in the layout is where the GHL chatbot widget mounts

**Pages (all static):** `/`, `/services`, `/about`, `/contact`

---

## Multi-Agent Development Workflow

Every development task on this project follows a structured multi-agent parallel workflow. No file in `src/` may be edited without this workflow having run.

### Rule 0 — Skills are required

Every agent must invoke at least one skill before starting. If no installed skill clearly applies, invoke `find-skills` first. Only proceed without a skill if `find-skills` returns no match.

| Skill | Primary Agent |
|---|---|
| `find-skills` | All agents (prerequisite check) |
| `vercel-react-best-practices` | Planning agent, Coding agent |
| `frontend-design` | Coding agent (UI work) |
| `web-design-guidelines` | Code review agent, UI testing agent |
| `playwright-cli` | UI testing agent |
| `skill-creator` | Any agent needing a skill that doesn't exist |

### Phase 1 — Parallel Kickoff (4 agents simultaneously)

**Agent 1: Planning agent**
- Skill: `vercel-react-best-practices`
- Reads task + relevant source files → produces implementation plan
- Output → `.claude/progress/<YYYY-MM-DD>-<slug>/plan.md`

**Agent 2: Devil's advocate agent**
- Skill: `find-skills` first, then reasoning
- Challenges approach: simpler alternatives, bundle size, accessibility, hydration, CSP, project convention violations
- Output → `.claude/progress/<YYYY-MM-DD>-<slug>/devils-advocate.md`

**Agent 3: Coding agent**
- Skills: `vercel-react-best-practices` + `frontend-design`
- Waits only for `plan.md` to exist, then implements
- Hard constraints: design tokens only from `globals.css @theme`, cubic-bezier arrays for eases, client components in proper directories, `HeroWrapper` pattern for `ssr:false`, booking URL via env var
- Must pass `npm run build` + `npm run lint` before marking done
- Output → modified source files + `.claude/progress/<YYYY-MM-DD>-<slug>/coding-notes.md`

**Agent 4: Code review agent**
- Skills: `web-design-guidelines` + `vercel-react-best-practices`
- Reviews against Web Interface Guidelines + project conventions, reports issues in `file:line` format
- Output → `.claude/progress/<YYYY-MM-DD>-<slug>/code-review.md`

### Phase 2 — UI Testing (after coding agent completes)

**Agent 5: UI testing agent**
- Skills: `playwright-cli` + `web-design-guidelines`
- Starts dev server, opens browser, runs full checklist on all 4 pages (`/`, `/services`, `/about`, `/contact`) at 3 breakpoints (375px, 768px, 1440px)
- Checklist: background/accent colors match `globals.css` tokens, typography uses Syne/Geist tokens, no hydration errors, responsive layout intact, focus rings present, all images have alt text, animations use cubic-bezier arrays, ChatbotPlaceholder present in layout, all booking links resolve, no CSP violations in console
- Takes screenshots per page per breakpoint → `.claude/progress/<YYYY-MM-DD>-<slug>/screenshots/`
- Output → `.claude/progress/<YYYY-MM-DD>-<slug>/ui-test-report.md`

### Phase 3 — Resolution (sequential, after all agents finish)

Main agent reads all reports, triages critical blockers (spawns targeted fix agents if needed), updates `task-log.md`, then reports to user.

### Progress Tracking

```
.claude/
  progress/
    task-log.md               ← master index, append-only
    <YYYY-MM-DD>-<slug>/
      plan.md
      devils-advocate.md
      coding-notes.md
      code-review.md
      ui-test-report.md
      screenshots/
```

`task-log.md` entry format (append, never overwrite):

```markdown
## <YYYY-MM-DD> — <Task title>
**Status:** in-progress | complete | blocked
**Folder:** .claude/progress/<YYYY-MM-DD>-<slug>/
**Files changed:** ...
**Build passed:** yes | no
**UI test result:** all-pass | N failures
### Completed
### Deferred / follow-up
---
```

On session start: read `task-log.md` first. Any `in-progress` or `blocked` entry takes priority over new tasks unless the user explicitly overrides.

### Superpowers skill mapping

| Situation | Superpowers skill |
|---|---|
| Exploring approach | `superpowers:brainstorming` |
| Writing task plan | `superpowers:writing-plans` |
| Dispatching Phase 1 agents | `superpowers:dispatching-parallel-agents` |
| Coding implementation | `superpowers:subagent-driven-development` |
| Build/test failure | `superpowers:systematic-debugging` |
| Before marking complete | `superpowers:verification-before-completion` |
| After Phase 3 | `superpowers:requesting-code-review` |
| Closing a feature | `superpowers:finishing-a-development-branch` |

### Enforcement rules

1. No file in `src/` may be edited without the agent workflow having run.
2. UI testing agent runs on every task touching any component, page, or global CSS.
3. `task-log.md` must be updated before the main agent reports completion to the user.
4. If `npm run build` or `npm run lint` fails, the task is not done.
5. If a needed skill doesn't exist, use `skill-creator` to build one before proceeding.
