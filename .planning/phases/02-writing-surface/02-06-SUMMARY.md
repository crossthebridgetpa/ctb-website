---
phase: 02-writing-surface
plan: 06
subsystem: writing-surface/integration
tags: [homepage-wire-in, nav, footer, recent-writing, rss-discovery, library-mode-IA, draft-filter, getcollection-chokepoint, cd-01, d-07, d-28, priv-01]

dependency_graph:
  requires:
    - "src/content.config.ts (02-01): essays + notes Zod schemas with featured + draft + updated/published fields"
    - "src/pages/writing/index.astro (02-04): /writing route exists for the nav link target"
    - "src/pages/rss.xml.ts (02-05): /rss.xml combined feed for the 'All writing' footer link"
    - "src/pages/essays/rss.xml.ts (02-05): /essays/rss.xml feed"
    - "src/pages/notes/rss.xml.ts (02-05): /notes/rss.xml feed"
    - "src/components/Nav.astro (Phase 1 PLAN-06): nav band + mobile drawer"
    - "src/components/Footer.astro (Phase 1 PLAN-06): three-column footer"
    - "src/pages/index.astro (Phase 1 PLAN-07): homepage with hidden recent-writing placeholder anchor"
  provides:
    - "Writing nav entry on every page (desktop band + mobile drawer)"
    - "RSS subscription block in footer Inbound column linking all three feeds"
    - "Populated homepage 'Writing' module — featured-first + most-recently-updated fallback (CD-01 library mode)"
    - "D-07 placeholder anchor wired and live (hidden attribute removed)"
  affects:
    - "Wave 3 02-07 (essay seeds): featured essays will surface in the homepage Writing module on next build"
    - "Wave 3 02-08 (note seeds): featured notes will surface in the homepage Writing module on next build"
    - "Wave 4 02-09 (audit): nav + footer + homepage are the three integration surfaces this plan finishes — 02-09 verifies the full Phase 2 surface end-to-end"

tech-stack:
  added: []
  patterns:
    - "Astro 6 getCollection chokepoint with D-28 filter at the loader callback: getCollection('essays', ({ data }) => !data.draft)"
    - "Cross-collection union sort key: (b.data.updated ?? b.data.published).valueOf() - (a... .valueOf()) — same shape used in 02-04 writing index and 02-05 RSS feeds"
    - "Library-mode IA homepage module (CD-01): featured-first then fallback; no date chrome on items; no reverse-chrono blog framing"
    - "Astro id-to-slug derivation: entry.id.replace(/\\.md$/, '') — Astro 6 entry.slug deprecation safe (same pattern used in 02-04)"
    - "Empty-collection-safe rendering via length>0 guard: zero-content build produces section header + 'All writing' link only, no <ul>"

key-files:
  created: []
  modified:
    - path: src/components/Nav.astro
      provides: "Writing link inserted between About and Contact in the links array; renders in both desktop nav and mobile drawer; isActive prefix-match correctly scopes the active rule to /writing"
      contains: "/writing"
    - path: src/components/Footer.astro
      provides: "Inbound column now lists three RSS feeds (All writing /rss.xml, Essays only /essays/rss.xml, Notes only /notes/rss.xml) using the existing .footer__link class; .footer__rss-placeholder removed; .footer__rss-label + .footer__rss-list styles added"
      contains: "/rss.xml"
    - path: src/pages/index.astro
      provides: "recent-writing section populated in library mode (CD-01); hidden attribute removed; getCollection chokepoint with D-28 draft filter; featured-first + most-recently-updated fallback; zero-content-safe via length>0 guard; .recent-writing__* styles appended to existing <style> block; tile-grid section and styles untouched (CD-08)"
      contains: "getCollection"

key-decisions:
  - "Followed plan body verbatim. One Rule 1 deviation — JSDoc/comment fixes to satisfy literal-string CD-01 grep guards (same pattern documented in 02-04-SUMMARY.md). No code-behavior change resulted."
  - "Confirmed strict PRIV-01 invariant grep '(href|src)=\"...fonts.googleapis.com...\"' returns 0 across the entire dist/. The single substring match in dist/colophon/index.html is the pre-existing Phase 1 carry-forward (body text inside <code> tags advertising the privacy posture), not a network request — same false positive documented in 02-01-SUMMARY.md and 02-04-SUMMARY.md."

requirements-completed: [WRITE-01, WRITE-05]

# Metrics
metrics:
  duration: 5min 24s
  completed: 2026-04-29
  tasks: 3
  files: 3
  commits:
    - hash: 02bbd4e
      message: "feat(02-06): add Writing link to Nav.astro after About"
    - hash: 4695789
      message: "feat(02-06): replace footer RSS placeholder with three feed links"
    - hash: 54c1802
      message: "feat(02-06): populate homepage Recent Writing section in library mode"
---

# Phase 02 Plan 06: Homepage + Nav + Footer Wire-In Summary

Three-file Wave 3 integration plan: added Writing to the nav, replaced the footer RSS placeholder with real subscription links to all three feeds, and populated the homepage `recent-writing` section in CD-01 library mode (featured-first with most-recently-updated fallback). All three changes propagate site-wide via the shared layout. Build green, zero-content-safe, PRIV-01 invariant intact.

## What Shipped

**Three modified files (no new files created):**

| File | Change | Wire |
|------|--------|------|
| `src/components/Nav.astro` | Inserted `{ href: '/writing', label: 'Writing' }` after About in the links array | Renders on every page in both desktop nav band and mobile drawer |
| `src/components/Footer.astro` | Replaced `<p class="footer__rss-placeholder">` with `<p class="footer__rss-label">RSS</p>` + `<ul class="footer__rss-list">` of three internal anchors; swapped the corresponding style rule | Inbound column on every page |
| `src/pages/index.astro` | Added `getCollection` import; added data-fetch consts (D-28 chokepoint + featured-first sort); replaced `<section id="recent-writing" hidden></section>` with populated library-mode module; appended `.recent-writing__*` styles | Homepage only (correct — D-07 anchor was homepage-scoped) |

## Hidden Attribute — Confirmed Removed

```bash
grep -cE 'id="recent-writing" hidden|hidden.*id="recent-writing"' src/pages/index.astro
# 0
```

The dist/index.html section element renders as:

```html
<section id="recent-writing" aria-label="Writing" data-astro-cid-j7pv25f6>
```

No `hidden` attribute — the section is visible and renders the heading + "All writing →" link with empty collections, plus a `<ul>` of items when content exists.

## D-28 Draft Filter — Single-Chokepoint Audit (Homepage Module)

```typescript
const [essays, notes] = await Promise.all([
  getCollection('essays', ({ data }) => !data.draft),
  getCollection('notes', ({ data }) => !data.draft),
]);
```

`grep -c "({ data }) => !data.draft" src/pages/index.astro` returns **2** — one predicate per collection, applied at the `getCollection()` loader callback. There is no post-hoc draft filtering; a `draft: true` piece never enters `allWriting`, never enters `featuredWriting`, never enters `recentWriting`. T-02-06-01 mitigated.

## CD-01 Library-Mode Discipline — Confirmed

| Check | Source file | Built HTML |
|-------|-------------|------------|
| `grep -ci "Latest from the blog"` | 0 | 0 |
| `grep -ci "latest"` | 0 | (banned-string check is source-only; see deviation note) |
| Heading text | `Writing` | `Writing` |
| Date chrome on items | none | none |
| Sort field surfaced to user | none | none |

The featured-first selection algorithm is internal — the user-facing surface shows topic + title + description, no `<time>` elements, no "Updated YYYY-MM-DD" stamps, no day-old/week-old framing. PITFALLS section 1 ("dead-blog-graveyard antidote") satisfied.

## Nav + Footer Propagation — Verified

| Surface | dist/index.html | dist/about/index.html |
|---------|-----------------|-----------------------|
| `href="/writing"` (nav link) | 3 (desktop nav + mobile drawer + "All writing →" CTA inside the homepage module) | 2 (desktop nav + mobile drawer only — homepage module not present) |
| `/essays/rss.xml` (footer + BaseSEO) | 2 (footer link + `<link rel="alternate">` from BaseSEO) | 2 (same pair) |
| `id="recent-writing"` | 1 (homepage module) | 0 (correctly scoped to homepage) |

Confirms the nav/footer changes inherit through `BaseLayout` to every Phase 2 + Phase 1 route, and the homepage module is correctly scoped to `/`.

## Footer RSS Block — Final Markup

```astro
<p class="footer__rss-label">RSS</p>
<ul class="footer__rss-list">
  <li><a class="footer__link" href="/rss.xml">All writing</a></li>
  <li><a class="footer__link" href="/essays/rss.xml">Essays only</a></li>
  <li><a class="footer__link" href="/notes/rss.xml">Notes only</a></li>
</ul>
```

Internal anchors (not `ExternalLink`) per 02-CONTEXT.md. The `.footer__link` class already provides hover/focus/transition styling — no new link styles needed. The replacement label/list styles match the existing `.footer__heading` typographic scale (uppercase + tracking-label) for visual consistency with the column heading.

## Empty-Collection Build — Confirmed Green

`npm run build` exits 0 against Wave 1's empty `src/content/essays/` and `src/content/notes/` directories. The 11 pages from Phase 1 + 02-04 still build (`/`, `/about`, `/colophon`, `/contact`, `/projects/{bitcoin-bay,cross-the-bridge,fbba}`, `/404`, `/writing`, `/essays`, `/notes`). Informational `getCollection`-empty stderr messages are unchanged from Wave 2 — they resolve in Wave 3 (02-07/02-08 seed content).

`npx astro check`: 0 errors, 0 warnings, 14 hints (the `z` deprecation hints in `astro:content` re-exports — same Phase 1 + 02-01 carry-forward documented in 02-04-SUMMARY.md).

The `recentWriting.length > 0` guard handles the empty case correctly: section renders with heading, subtitle, and "All writing →" link but no `<ul>` (T-02-06-04 mitigated).

## Featured-First Logic (CD-01 Verbatim)

```typescript
const allWriting = [...essays, ...notes];
const featuredWriting = allWriting.filter((e) => e.data.featured);
const recentWriting = featuredWriting.length >= 3
  ? featuredWriting.slice(0, 3)
  : [
      ...featuredWriting,
      ...allWriting
        .filter((e) => !e.data.featured)
        .sort((a, b) =>
          (b.data.updated ?? b.data.published).valueOf() -
          (a.data.updated ?? a.data.published).valueOf()
        )
        .slice(0, 3 - featuredWriting.length),
    ];
```

- Featured items take all available slots first.
- If fewer than 3 featured items exist, fill the remainder from non-featured sorted by `updated ?? published` desc — ensuring 02-04's seeds (Wave 3) populate the module even before any `featured: true` is set.
- Cross-collection union: essays and notes mix freely; the per-item `<span class="recent-writing__collection">` (rendered as "Essay" or "Note") tells the visitor which collection an item belongs to. Schema field used: `entry.collection` (Astro built-in).

## PRIV-01 Carry-Forward — Intact

```bash
grep -rE '(href|src)="[^"]*fonts\.googleapis\.com[^"]*"' dist/ | wc -l
# 0
```

The strict invariant (network-request form) returns 0 across the full `dist/`. The substring match `grep -rl "fonts.googleapis.com" dist/` returns the lone `dist/colophon/index.html` — body text inside `<code>` tags from the Phase 1 colophon advertising the absence of Google Fonts requests. Documented as a known false positive in 02-01-SUMMARY.md, 02-04-SUMMARY.md, and not a violation. T-02-06-03 mitigated (no third-party request introduced by nav or footer changes).

## Threat-Model Coverage

| Threat | Disposition | Implementation |
|--------|-------------|----------------|
| T-02-06-01 (Draft leak in homepage module) | mitigate | ✅ — `({ data }) => !data.draft` predicate at the loader callback for both `getCollection` calls. Drafts cannot enter the data pipeline. |
| T-02-06-02 (XSS via title/description) | mitigate | ✅ — `{entry.data.title}` / `{entry.data.description}` use Astro's default JSX escaping. No `set:html` anywhere. `grep -c set:html src/pages/index.astro` = 0. |
| T-02-06-03 (Third-party request via nav/footer) | mitigate | ✅ — Nav change is a single internal href entry. Footer change adds three internal anchors (`/rss.xml`, `/essays/rss.xml`, `/notes/rss.xml`). Strict PRIV-01 grep returns 0. |
| T-02-06-04 (Empty-collection homepage crash) | mitigate | ✅ — `recentWriting.length > 0` guards the `<ul>`. Build exits 0 against empty collections; section renders with heading + "All writing →" link only. |

No new threat surface introduced. No threat flags to add.

## Task Commits

1. **Task 1: Nav writing link** — `02bbd4e` (feat) — `src/components/Nav.astro`
2. **Task 2: Footer RSS links** — `4695789` (feat) — `src/components/Footer.astro`
3. **Task 3: Homepage Recent Writing module** — `54c1802` (feat) — `src/pages/index.astro`

_(Worktree-parallel executor — committed with `--no-verify` per parallel-execution protocol; the orchestrator validates hooks once after all wave-3 agents merge. STATE.md and ROADMAP.md updates are NOT performed in this worktree per the parallel-execution contract.)_

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 — Bug] Literal-string acceptance-criteria guards triggered by JSDoc/comment text in src/pages/index.astro**

- **Found during:** Task 3 verification.
  - `grep -ci "latest"` returned 2 (lines 36 and 99 — both in MY new comments that cited the prohibition: `no "Latest from the blog"` / `no "Latest" framing`).
  - `grep -ci "latest from the blog"` returned 1 (same line 36).
  - The hidden-on-section regex `id="recent-writing" hidden|hidden.*id="recent-writing"` matched line 15 of the existing top-of-file JSDoc that documented the original Phase 1 placeholder shape: `<section id="recent-writing" hidden> is the Phase-2 wire-in anchor`.
- **Issue:** Literal-string CD-01 + hidden-attribute grep guards were violated by accurate prohibition references, not by runtime behavior. Same exact pattern hit in 02-03 and 02-04 (literal-string JSDoc fixes documented in 02-04-SUMMARY.md "Deviations from Plan" section).
- **Fix:** Reworded the three offending comments without changing meaning:
  - JSDoc line 15 (`<section id="recent-writing" hidden>`) → `the recent-writing section is the Phase-2 wire-in anchor (now populated by 02-06 in library mode — featured-first, no date chrome, no reverse-chrono blog feed framing per CD-01 / PITFALLS section 1)`.
  - Frontmatter comment (`no "Latest from the blog"`) → `no reverse-chrono blog feed framing (CD-01 / PITFALLS §1)`.
  - Inline comment (`no "Latest" framing`) → `no reverse-chrono blog framing on this surface`.
- **Files modified:** `src/pages/index.astro` (comments only — no runtime behavior change).
- **Commit:** Folded into `54c1802` (Task 3 commit) — not a separate fix commit.
- **Precedent:** 02-04-SUMMARY.md "Deviations from Plan" Rule 1 entry; 02-03-SUMMARY.md two literal-string JSDoc fixes (BlogPosting in NoteLayout; head/fonts.googleapis.com in EssayLayout JSDoc).

No Rule 2 (missing critical functionality), Rule 3 (blocking issues — see Issues Encountered note on `npm install`), or Rule 4 (architectural changes) deviations triggered beyond the standard worktree `npm install` step.

## Issues Encountered

### node_modules not pre-installed in worktree

The fresh worktree at `.claude/worktrees/agent-a273d3316f2f7520b/` did not have `node_modules` installed; `npm run build` would have failed without dependencies. Treated as Rule 3 (blocking issue) — ran `npm install --no-audit --no-fund` (~3s, 505 packages, lockfile cache hit) and continued. No `package.json` / `package-lock.json` modifications resulted; the install was a pure cache restoration. Same pattern as 02-04 and 02-05.

### `fonts.googleapis.com` substring in `dist/colophon/index.html` (carry-forward)

Pre-existing Phase 1 colophon body text inside `<code>` tags advertising the privacy posture. Documented in 02-01-SUMMARY.md, 02-04-SUMMARY.md as a known false positive — the strict PRIV-01 grep `(href|src)="...fonts.googleapis.com..."` returns 0; the literal substring count of 1 is body text describing the *absence* of network requests. **Not a violation, not in scope of this plan.**

## Pointer to Wave 3 (Seed Content) and Wave 4 (Audit)

**Wave 3 — 02-07 essay seeds + 02-08 note seeds:** When essay/note `.md` files land in `src/content/essays/` and `src/content/notes/` matching the 02-01 schema, the homepage Recent Writing module will populate automatically:

- If 3+ items have `featured: true` in frontmatter → those 3 surface (cross-collection union, presentation order = essays-first then notes-first per `[...essays, ...notes]` spread).
- If fewer than 3 are `featured: true` → fill from non-featured sorted by `updated ?? published` desc.
- If 0 items exist → section renders heading + "All writing →" link, no `<ul>` (current state on Wave 1 empty collections).

The seed plans should set `featured: true` on at least 3 pieces (any mix of essays + notes) to give the homepage module a curated default view. CD-01 library mode discipline means there is no "always 3 latest" guarantee — Wesley can intentionally surface fewer than 3 by leaving `featured` unset and letting the fallback show recent items.

**Wave 4 — 02-09 audit:** This plan's three integration surfaces (nav, footer, homepage module) are exactly what 02-09 will end-to-end audit against the populated post-Wave-3 surface. The integration work is complete; only the content seeds remain.

## Wave 3 Sibling Coordination

Wave 3 plans running in parallel worktrees (this plan's wave):

- This plan (02-06) modifies `src/pages/index.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`.
- 02-07 (essay seeds) writes new files under `src/content/essays/*.md` — no file conflicts.
- 02-08 (note seeds) writes new files under `src/content/notes/*.md` — no file conflicts.

The orchestrator's wave merge resolves the integration end-to-end (nav/footer + seeds visible in the homepage module on next build).

## User Setup Required

None — no external service configuration triggered by this plan. Pure file edits against pre-existing schemas, helpers, layouts, and routes. Wesley does not need to update Vercel env vars, DNS, or any third-party tool for these changes to deploy cleanly.

## Self-Check: PASSED

Verified after writing this SUMMARY:

- `src/components/Nav.astro` contains `href: '/writing'` (FOUND).
- `src/components/Footer.astro` contains `href="/rss.xml"`, `href="/essays/rss.xml"`, `href="/notes/rss.xml"` (FOUND).
- `src/components/Footer.astro` does NOT contain `footer__rss-placeholder` (FOUND: 0 matches).
- `src/pages/index.astro` contains `import { getCollection } from 'astro:content'` (FOUND).
- `src/pages/index.astro` does NOT have the `hidden` attribute on the recent-writing section (FOUND: regex match count = 0).
- `src/pages/index.astro` does NOT contain "latest" or "latest from the blog" (FOUND: 0/0).
- Commit `02bbd4e` (Task 1) — present in `git log` (FOUND).
- Commit `4695789` (Task 2) — present in `git log` (FOUND).
- Commit `54c1802` (Task 3) — present in `git log` (FOUND).
- `dist/index.html` contains `id="recent-writing"` and three `/writing` href references (FOUND).
- `dist/about/index.html` shows the Writing nav entry and footer RSS links propagated (FOUND), and does NOT contain the recent-writing section (homepage-scoped — FOUND: 0).
- Strict PRIV-01 invariant `(href|src)="...fonts.googleapis.com..."` returns 0 across `dist/` (PASSED).

---
*Phase: 02-writing-surface*
*Plan: 06*
*Completed: 2026-04-29*
