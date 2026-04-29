---
phase: 02-writing-surface
plan: 04
subsystem: writing-surface/routes
tags: [astro-pages, getStaticPaths, microformats, h-feed, h-entry, p-name, p-summary, p-category, draft-filter, library-mode-IA, cross-collection]

dependency_graph:
  requires:
    - "src/content.config.ts (02-01): essays + notes Zod schemas"
    - "src/lib/tags.ts (02-02): getAllTags + getEntriesByTag (D-28 chokepoint)"
    - "src/layouts/EssayLayout.astro (02-03): essay reading layout (h-entry, reading-time, Related)"
    - "src/layouts/NoteLayout.astro (02-03): note reading layout (h-entry, p-category status, Related)"
    - "src/layouts/BaseLayout.astro (Phase 1 PLAN-06): composition target (PRIV-01/02 firewall)"
  provides:
    - "/writing index (combined hub, library-mode IA, CD-01 featured-first + archive-by-year)"
    - "/essays index (single-collection, h-feed)"
    - "/notes index (single-collection, h-feed + CD-02 status badge)"
    - "/essays/[slug] dynamic route (D-28 in getStaticPaths; CD-09 inline reading-time)"
    - "/notes/[slug] dynamic route (D-28 in getStaticPaths; no reading-time)"
    - "/topics/[tag] cross-collection page (lib/tags.ts chokepoint, CD-04 open taxonomy)"
  affects:
    - "Wave 3 02-07 (essay seeds): files dropped under src/content/essays/ become URLs at /essays/[slug] and appear in /essays + /writing + /topics"
    - "Wave 3 02-08 (note seeds): same pattern under src/content/notes/"
    - "Wave 2 02-05 (RSS endpoints): URLs emitted by these routes are the targets RSS will link to"
    - "Wave 2 02-06 (homepage Recent Writing): consumes the same getCollection chokepoint shape"
    - "Wave 2 02-09 (BaseSEO RSS alternates + nav/footer wiring): /writing, /essays, /notes show up in nav"

tech-stack:
  added: []
  patterns:
    - "Astro 6 getStaticPaths typed: `(async () => {...}) satisfies GetStaticPaths`"
    - "D-28 single-chokepoint draft filter: every loader call applies `({ data }) => !data.draft` (or inherits via lib/tags.ts)"
    - "Astro 6 entry id slug derivation: `entry.id.replace(/\\.md$/, '')` (Astro 5 `entry.slug` removed)"
    - "Inline reading-time formula (CD-09): `entry.body.split(/\\s+/).filter(Boolean).length` then `Math.max(1, Math.ceil(words/250))` when words >= 500"
    - "Library-mode IA (CD-01): featured-first then archive-by-year on /writing; no 'Latest from the blog' framing anywhere"
    - "Microformat chain: h-feed (root article on indexes) -> h-entry (each li) -> p-name (title) + p-summary (subtitle) + p-category (note status)"

key-files:
  created:
    - path: src/pages/writing/index.astro
      lines: 116
      provides: "Combined /writing hub — featured first, archive-by-year (CD-01)"
    - path: src/pages/essays/index.astro
      lines: 56
      provides: "Per-collection /essays index with h-feed"
    - path: src/pages/notes/index.astro
      lines: 56
      provides: "Per-collection /notes index with h-feed and CD-02 status badge"
    - path: src/pages/essays/[slug].astro
      lines: 36
      provides: "Dynamic /essays/[slug] route via getStaticPaths + EssayLayout; CD-09 reading-time"
    - path: src/pages/notes/[slug].astro
      lines: 24
      provides: "Dynamic /notes/[slug] route via getStaticPaths + NoteLayout"
    - path: src/pages/topics/[tag].astro
      lines: 78
      provides: "Cross-collection /topics/[tag] page; uses lib/tags.ts as draft chokepoint"
  modified: []

key-decisions:
  - "Followed plan body verbatim. No deviations beyond a single Rule 1 JSDoc reword on writing/index.astro to satisfy the literal-string `Latest from the blog` grep guard (same pattern as 02-03's two literal-string fixes)."
  - "fonts.googleapis.com substring still appears once in dist/colophon/index.html — pre-existing Phase 1 carry-forward (colophon body text inside <code> tags advertising the privacy posture). Strict PRIV-01 invariant grep `(href|src)=\"...fonts.googleapis.com...\"` returns 0 — this is body text describing the absence of network requests, not a network request. Documented in 02-01-SUMMARY.md."

requirements-completed: [WRITE-01, WRITE-02, WRITE-03, WRITE-04, WRITE-07, SEO-06]

# Metrics
metrics:
  duration: 4min 48s
  completed: 2026-04-29
  tasks: 3
  files: 6
  commits:
    - hash: 1f62911
      message: "feat(02-04): add /writing /essays /notes index pages with h-feed"
    - hash: 8a49a5f
      message: "feat(02-04): add /essays/[slug] and /notes/[slug] dynamic routes"
    - hash: a90bf19
      message: "feat(02-04): add /topics/[tag] cross-collection tag page"
---

# Phase 02 Plan 04: Writing Routes (Wave 2 Surface) Summary

Six new Astro page files shipped — the `/writing` hub, per-collection `/essays` and `/notes` indexes, dynamic `/essays/[slug]` and `/notes/[slug]` routes, and the cross-collection `/topics/[tag]` page. All emit IndieWeb microformats (h-feed/h-entry/p-name/p-summary/p-category), all apply the D-28 draft filter at the loader chokepoint (or inherit it via `lib/tags.ts` for topics), all compose `BaseLayout` (PRIV-01 + PRIV-02 firewalls preserved). Build is green against empty Wave 1 collections; the routes will populate automatically when Wave 3 seeds land.

## What Shipped

**Six new files (all under `src/pages/`):**

| File | Lines | Role | Composition |
|------|-------|------|-------------|
| `src/pages/writing/index.astro` | 116 | Combined writing hub — CD-01 library-mode IA (featured-first + archive-by-year) | wraps `BaseLayout` |
| `src/pages/essays/index.astro` | 56 | Per-collection essays index | wraps `BaseLayout` |
| `src/pages/notes/index.astro` | 56 | Per-collection notes index with CD-02 status badge | wraps `BaseLayout` |
| `src/pages/essays/[slug].astro` | 36 | Dynamic per-essay route + CD-09 inline reading-time | wraps `EssayLayout` |
| `src/pages/notes/[slug].astro` | 24 | Dynamic per-note route | wraps `NoteLayout` |
| `src/pages/topics/[tag].astro` | 78 | Cross-collection tag page (lib/tags.ts chokepoint) | wraps `BaseLayout` |

## Microformat Audit (SEO-06)

| Page | h-feed | h-entry | p-name | p-summary | p-category | dt-published | e-content |
|------|--------|---------|--------|-----------|------------|--------------|-----------|
| `/writing` | yes (root article) | yes (each `<li>`) | yes (H1 + each title) | yes (each subtitle) | n/a | n/a (year section break only) | n/a |
| `/essays` | yes | yes | yes | yes | n/a | n/a | n/a |
| `/notes` | yes | yes | yes | n/a | yes (status badge) | n/a | n/a |
| `/essays/[slug]` | n/a | yes (via EssayLayout `<article>`) | yes (via EssayLayout) | yes (via EssayLayout) | n/a | yes (via EssayLayout) | yes (via EssayLayout) |
| `/notes/[slug]` | n/a | yes (via NoteLayout `<article>`) | yes (via NoteLayout) | n/a | yes (via NoteLayout) | yes (via NoteLayout) | yes (via NoteLayout) |
| `/topics/[tag]` | yes | yes | yes (H1 + each title) | yes (each subtitle) | n/a | n/a | n/a |

`h-feed` count across the four indexes/topics pages = 4. The two slug routes are single-entry pages, so h-feed does not apply (the per-page h-entry wrapper sits inside the layout).

## D-28 Draft Filter — Single-Chokepoint Audit

| Page | Predicates | Chokepoint location |
|------|-----------|---------------------|
| `/writing` index | 2 | inline on both `getCollection('essays', ...)` + `getCollection('notes', ...)` |
| `/essays` index | 1 | inline on `getCollection('essays', ...)` |
| `/notes` index | 1 | inline on `getCollection('notes', ...)` |
| `/essays/[slug]` | 1 | inline inside `getStaticPaths` |
| `/notes/[slug]` | 1 | inline inside `getStaticPaths` |
| `/topics/[tag]` | 0 | inherits via `lib/tags.ts` (single source of truth — no double-filter) |

Total verbatim predicate count across the six files = **6**. Each appearance is a `({ data }) => !data.draft` call directly on a `getCollection` invocation — no post-hoc filtering, no double-filtering. `/topics/[tag]` deliberately has 0 predicates because `lib/tags.ts` (from 02-02) is the chokepoint; re-filtering at the page level would create two sources of truth.

## Reading-Time Formula (CD-09 — verbatim)

```typescript
// src/pages/essays/[slug].astro
const wordCount = (entry.body ?? '').trim().split(/\s+/).filter(Boolean).length;
const readingMinutes = wordCount >= 500
  ? Math.max(1, Math.ceil(wordCount / 250))
  : undefined;
```

- 250 wpm baseline (CD-09).
- Hidden when `wordCount < 500` (CD-09 lower bound).
- `EssayLayout` treats `undefined` (or values `< 1`) as "do not display" — see EssayLayout.astro line 67: `{readingMinutes && readingMinutes >= 1 && (...)}`.
- `/notes/[slug]` does NOT compute reading-time (CD-09 essays-only — verified: `grep -c readingMinutes src/pages/notes/[slug].astro` = 0).

Inline computation chosen over a remark plugin (e.g., `remark-reading-time`) to keep Phase 2's dependency surface small. Both approaches are valid per 02-PATTERNS.md line 575.

## Empty-Collection Build — Confirmed Green

Wave 1 left `src/content/essays/` and `src/content/notes/` empty (only `.gitkeep`). With these six new routes in place:

- `astro check`: 0 errors / 0 warnings / 14 hints (the hints are upstream `ts(6385) 'z' is deprecated` re-export markers in `astro:content` — unrelated to this plan; Phase 1 + 02-01 carry-forward).
- `astro build`: exits 0. **11 pages built** (Phase 1's 8 routes preserved: `/`, `/about`, `/colophon`, `/contact`, `/projects/{bitcoin-bay,cross-the-bridge,fbba}`, `/404`; plus the 3 new index pages: `/writing`, `/essays`, `/notes`). Zero pages emitted from `[slug].astro` or `[tag].astro` because their `getStaticPaths` calls return `[]` against empty collections — exactly the documented behavior.
- Glob loader emits the expected informational warnings (`No files found matching "**/*.md" in directory "src/content/essays"` / `... notes`) — not errors. Behavior matches 02-01-SUMMARY.md.
- Sitemap (`dist/sitemap-index.xml`) generated successfully — empty collections + draft-filter chokepoint mean no draft URLs leak (T-02-04-06 mitigation verified).

## CD-01 Library-Mode Discipline — Confirmed

`grep -ci "Latest from the blog"` across all four index/topics files returns **0**. Heading on `/writing` is `"Writing"`. Subline reads "Featured pieces — by topic, not date." Featured section renders first, archive section second, archive sorted by `updated ?? published` desc but grouped by year (year as section break, no inline date chrome). PITFALLS section 1 ("dead-blog-graveyard antidote") satisfied.

## CD-04 Open Taxonomy — Empty Pages Cannot Exist

`/topics/[tag]` `getStaticPaths` derives its tag list from `getAllTags()`, which (via `lib/tags.ts`) only returns tags that have at least one non-draft entry. A tag used exclusively by drafts produces zero pages. Tag rendered verbatim in the H1 (`{tag}`) — author owns canonical form, no silent lowercase/normalize at the helper level (CD-04).

## PRIV-01 + PRIV-02 Firewalls — Intact

- `<head>` count across all six new files = **0** (BaseLayout firewall preserved — no head re-implementation).
- `set:html` count across all six new files = **0** (no XSS surface from frontmatter strings).
- Strict PRIV-01 check (`grep -roE '(href|src)="...fonts.googleapis.com..."' dist/`) = **0** — no Google Fonts CDN network requests anywhere in built HTML.
- Loose substring check `grep -r "fonts.googleapis.com" dist/` = 1 — pre-existing Phase 1 colophon body text inside `<code>` tags advertising the absence of Google requests. Documented as a known false positive in 02-01-SUMMARY.md, not a violation.

## Task Commits

1. **Task 1: index pages** — `1f62911` (feat) — `src/pages/writing/index.astro`, `src/pages/essays/index.astro`, `src/pages/notes/index.astro`
2. **Task 2: dynamic routes** — `8a49a5f` (feat) — `src/pages/essays/[slug].astro`, `src/pages/notes/[slug].astro`
3. **Task 3: topics page** — `a90bf19` (feat) — `src/pages/topics/[tag].astro`

_(Worktree-parallel executor — orchestrator commits the metadata after wave merge per parallel-execution protocol; this worktree commits source code only.)_

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 — Bug] JSDoc reference to "Latest from the blog" in writing/index.astro violated CD-01 grep**

- **Found during:** Task 1 verification (`grep -ci "Latest from the blog" src/pages/writing/index.astro` returned 1).
- **Issue:** The acceptance criterion is a literal-string check enforcing CD-01 + PITFALLS section 1 (no "Latest from the blog" framing). My JSDoc said `Heading is "Writing" not "Latest from the blog" (PITFALLS section 1)` — accurate prohibition reference, but the literal string failed the guard.
- **Fix:** Reworded to `Heading is "Writing" — NOT a reverse-chrono blog feed framing (PITFALLS section 1).` Same meaning, no banned literal string.
- **Files modified:** `src/pages/writing/index.astro` (JSDoc only — no runtime change)
- **Commit:** Folded into `1f62911` (Task 1 commit) — not a separate fix commit.
- **Precedent:** Same pattern as 02-03's two literal-string JSDoc fixes (BlogPosting in NoteLayout; head/fonts.googleapis.com in EssayLayout JSDoc).

No Rule 2 (missing critical functionality), Rule 3 (blocking issues), or Rule 4 (architectural changes) deviations triggered.

## Issues Encountered

### node_modules not pre-installed in worktree

- The fresh worktree at `.claude/worktrees/agent-aab3c48dc61384ddc/` did not have `node_modules` installed; `npx astro check` failed with "Missing script: astro" until I ran `npm install`. Treated as Rule 3 (blocking issue) — installed dependencies (~3s, 504 packages, lockfile cache hit) and continued. No `package.json` / `package-lock.json` modifications resulted; the install was a pure cache restoration.

### `fonts.googleapis.com` substring in dist (carry-forward)

- The lone `grep -r "fonts.googleapis.com" dist/` match in `dist/colophon/index.html` is body text inside `<code>` tags from the Phase 1 colophon advertising the privacy posture. Documented in 02-01-SUMMARY.md as a known false positive. The strict PRIV-01 invariant uses the `(href|src)="..."` form which returns 0; the literal substring count of 1 is body text describing the *absence* of network requests, not a network request itself. **Not a violation, not in scope of this plan.**

## Pointer to Wave 3 (Seed Content)

Once Wave 3 seeds essays under `src/content/essays/*.md` and notes under `src/content/notes/*.md`:

- `/essays/[slug]` will emit one HTML file per non-draft essay.
- `/notes/[slug]` will emit one HTML file per non-draft note.
- `/essays/index.html` will list every non-draft essay sorted by `updated ?? published` desc.
- `/notes/index.html` will list every non-draft note sorted the same way, with each item showing its CD-02 status badge.
- `/writing/index.html` will surface featured pieces first (CD-01) then group archive items by year.
- `/topics/[tag]/index.html` will be auto-generated for every tag with at least one non-draft entry referencing it.

The seed plans are:
- **02-07** (essay seeds): drops `.md` files into `src/content/essays/` matching the schema in `src/content.config.ts`.
- **02-08** (note seeds): drops `.md` files into `src/content/notes/` (schema includes the `status` field).

No code changes will be required in any of the six routes when seed content lands — the routes are content-shape-agnostic by design.

## Wave 2 Sibling Coordination

Other Wave 2 plans running in parallel worktrees:

- **02-05** (RSS endpoints + JsonLd extension): produces `src/pages/rss.xml.ts` (combined feed), `src/pages/essays/rss.xml.ts`, `src/pages/notes/rss.xml.ts`. RSS will link to the URLs this plan provides (`/essays/[slug]`, `/notes/[slug]`). No file conflicts with this worktree.
- **02-06** (homepage Recent Writing): modifies `src/pages/index.astro` to add a Recent Writing band that links into `/essays`, `/notes`, and `/writing`. No file conflicts.
- **02-09** (nav/footer + BaseSEO RSS alternates): modifies `src/components/Nav.astro`, `src/components/Footer.astro`, `src/components/seo/BaseSEO.astro` to add links to `/writing`, `/essays`, `/notes` and `<link rel="alternate" type="application/rss+xml">` tags. No file conflicts with this worktree.

The orchestrator's wave merge resolves any stitching needed.

## User Setup Required

None — no external service configuration triggered by this plan. Pure Astro page authoring against pre-existing schemas, helpers, and layouts.

## Self-Check: PASSED

Verified after writing this SUMMARY:

- `src/pages/writing/index.astro` — present (FOUND).
- `src/pages/essays/index.astro` — present (FOUND).
- `src/pages/notes/index.astro` — present (FOUND).
- `src/pages/essays/[slug].astro` — present (FOUND).
- `src/pages/notes/[slug].astro` — present (FOUND).
- `src/pages/topics/[tag].astro` — present (FOUND).
- Commit `1f62911` (Task 1) — present in `git log` (FOUND).
- Commit `8a49a5f` (Task 2) — present in `git log` (FOUND).
- Commit `a90bf19` (Task 3) — present in `git log` (FOUND).

---
*Phase: 02-writing-surface*
*Plan: 04*
*Completed: 2026-04-29*
