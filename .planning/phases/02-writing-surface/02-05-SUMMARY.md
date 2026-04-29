---
phase: 02-writing-surface
plan: 05
subsystem: feeds
tags: [rss, astrojs-rss, marked, base-seo, feed-discovery, content-collections]

# Dependency graph
requires:
  - phase: 02-writing-surface
    plan: 01
    provides: "@astrojs/rss@^4.0.18 helper available; essays + notes content collections defined with D-28 draft field"
  - phase: 01-foundation-personal-surface
    provides: "BaseSEO.astro per-page <head> fragment with Astro.site URL composition; PUBLIC_SITE_URL env-driven absolute URL pattern"
provides:
  - "GET /rss.xml — combined essays + notes feed (CD-05, full HTML content via marked)"
  - "GET /essays/rss.xml — essays-only feed"
  - "GET /notes/rss.xml — notes-only feed"
  - "Three rel=alternate RSS links injected into every page's <head> via BaseSEO (CD-05 always-on feed-discovery)"
  - "marked@^18.0.2 markdown→HTML renderer available for any other body→HTML use cases"
affects: [02-06, 02-07, 02-08, 02-09]

# Tech tracking
tech-stack:
  added: ["marked@^18.0.2 (markdown-to-HTML for RSS <content>)"]
  patterns:
    - "Astro 6 endpoint pattern: export async function GET(context: APIContext) for /rss.xml/.ts files"
    - "@astrojs/rss helper-library composition (NOT integration array — imported in each endpoint file)"
    - "context.site! guarded by explicit Astro.site undefined throw (matches BaseSEO pattern)"
    - "Sort-key pattern: (b.data.updated ?? b.data.published).valueOf() - (a... .valueOf()) for descending recency"
    - "D-28 chokepoint at getCollection's filter callback — ({ data }) => !data.draft — same pattern across all three feeds"
    - "marked async API — content: await marked(entry.body ?? '') wrapped in Promise.all over items"

key-files:
  created:
    - "src/pages/rss.xml.ts — combined feed endpoint (essays + notes), full HTML content per CD-05"
    - "src/pages/essays/rss.xml.ts — essays-only feed endpoint"
    - "src/pages/notes/rss.xml.ts — notes-only feed endpoint"
  modified:
    - "src/components/seo/BaseSEO.astro — three new <link rel=\"alternate\" type=\"application/rss+xml\"> tags inserted between canonical (line 59) and noIndex/og: tags (line 65); always-on, no Props gating"
    - "package.json — added marked@^18.0.2 to dependencies"
    - "package-lock.json — npm-resolved marked dependency tree"

key-decisions:
  - "Followed plan action body verbatim — used `content: await marked(entry.body ?? '')` (not the `content: entry.body` plain string referenced in one stale acceptance-criteria grep). The action body is the post-truth design that addresses CD-05 'rendered content for feed readers' rather than raw markdown syntax in <description>"
  - "@astrojs/rss imported as helper library inside each endpoint file (NOT registered in astro.config.mjs integrations array) — matches 02-PATTERNS.md §RSS Endpoints and 02-01-SUMMARY.md decision"
  - "BaseSEO injection is unconditional (no Props gate) — CD-05 explicit on always-on; all pages advertise feeds via existing BaseLayout consumption"

patterns-established:
  - "Astro 6 RSS endpoint shape: import rss from '@astrojs/rss' + import { getCollection } from 'astro:content' + import { marked } from 'marked' + export async function GET(context: APIContext)"
  - "marked-rendered <content> field per item: await Promise.all(items.map(async ...)) so each entry.body is rendered before passing to @astrojs/rss"
  - "<link rel=\"alternate\"> emission ordering: canonical → 3× rss alternates → og: tags (place feed-discovery before social tags)"

requirements-completed: [WRITE-05, SEO-06]

# Metrics
duration: 3min
completed: 2026-04-29
---

# Phase 02 Plan 05: RSS Feeds Summary

**Three RSS feed endpoints (combined / essays / notes) with `@astrojs/rss` + `marked`-rendered HTML content per CD-05, plus always-on `<link rel="alternate">` feed-discovery on every page via BaseSEO injection. Build green, dist XML well-formed, PRIV-01 invariant preserved.**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-04-29T02:24:10Z
- **Completed:** 2026-04-29T02:27:31Z
- **Tasks:** 2 / 2
- **Files modified:** 6 (3 created, 1 modified, 2 npm manifests)

## Accomplishments

- `src/pages/rss.xml.ts` ships the combined feed (essays + notes) sorted descending by `updated ?? published`. D-28 draft filter applied at `getCollection()` callback — drafts can never leak into the feed. CD-05: full body content rendered to HTML via `marked` and emitted in the `<content>` field; the frontmatter `description` populates `<description>`.
- `src/pages/essays/rss.xml.ts` ships the essays-only feed with the same shape, scoped to `getCollection('essays')`.
- `src/pages/notes/rss.xml.ts` ships the notes-only feed scoped to `getCollection('notes')`.
- `src/components/seo/BaseSEO.astro` emits three `<link rel="alternate" type="application/rss+xml">` tags on every page (between the canonical link and noIndex/og: tags). Absolute URLs derived from `Astro.site` (PUBLIC_SITE_URL); no Props gating — always-on per CD-05.
- `marked@^18.0.2` installed as a runtime dependency; used to render `entry.body` markdown to HTML before passing to the `content` field of each feed item — NetNewsWire/Reeder subscribers will see rendered headings/bold/lists, not raw `## heading` / `**bold**` syntax.
- `npm run build` exits 0, 0 errors, 0 warnings (14 hints inherited from 02-01 — `z` deprecation, out of phase scope).
- All three feeds emit valid RSS 2.0 XML (`<rss version="2.0"><channel>...`) with title, description, link, language. With empty collections the channels emit no `<item>` entries (Wave 1 expected state — Wave 3 plans 02-07/02-08 will seed content).
- Feed-discovery verified on `dist/index.html` AND `dist/about/index.html`: each page contains 3 `application/rss+xml` link tags with the correct absolute URLs (`https://wesleyschlemmer.com/rss.xml`, `/essays/rss.xml`, `/notes/rss.xml`). Confirms BaseLayout-wide injection (every page advertises every feed).
- PRIV-01 invariant: `grep -rE '(href|src)="[^"]*fonts\.googleapis\.com[^"]*"' dist/` returns 0 — no Google Fonts CDN reference introduced.
- T-02-05-01 mitigation: `@astrojs/rss` handles all XML escaping (CDATA / entity-encoding) for embedded markdown content. No roll-your-own XML — `grep -rl "<rss" src/pages/` returns no files (all three feed files use the helper, not string concat).

## Plan Action vs Acceptance Criteria — Drift Resolved

The plan body's `<action>` instructions for Task 1 specified `content: await marked(entry.body ?? '')` and a `npm install marked` step (lines 117 and 167 of the plan). The plan's `<acceptance_criteria>` line 262 still grep'd for `content: entry.body` — a leftover from the pre-marked draft of the plan that the patternmaker's example block (02-PATTERNS.md line 698) carries.

**Resolution:** Followed the explicit action-body code, which is the post-truth design (CD-05 says feeds emit "rendered" content for feed readers). The grep mismatch is a stale criterion, not a missing requirement — `marked(entry.body ?? '')` IS full content per CD-05, just rendered. All three feeds carry `content: await marked(...)` and ship `marked` as a dependency.

This is documented as a Rule 1 / Rule 2 N/A — both feed designs satisfy CD-05; the plan's action body is the authoritative implementation per its own ordering.

## Schema-Field Usage

The three feeds consume these schema fields from 02-01:

| Field | Usage |
|---|---|
| `title` | RSS `<title>` per item |
| `description` | RSS `<description>` per item (channel-item summary) |
| `published` | RSS `<pubDate>` |
| `updated` | Sort key (`updated ?? published` descending) |
| `draft` | D-28 chokepoint — filtered at `getCollection()` callback |
| (entry.body) | Rendered to HTML via `marked` and emitted in `<content>` per CD-05 |

The `featured`, `subtitle`, `tags`, `related`, and `status` fields are NOT consumed by feeds — those flow into other Wave 2/3 plans (homepage Recent Writing, EssayLayout, topics page, related-writing rail).

## Task Commits

Each task was committed atomically:

1. **Task 1: Create the three RSS endpoint files** — `d098f7a` (feat)
2. **Task 2: Inject three rel=alternate RSS links into BaseSEO** — `5b179e7` (feat)

_Note: This is a worktree-parallel executor agent — committed with `--no-verify` per parallel-execution protocol; the orchestrator validates hooks once after all wave-2 agents merge._

## Files Created/Modified

**Created:**
- `src/pages/rss.xml.ts` (47 lines) — combined feed endpoint
- `src/pages/essays/rss.xml.ts` (35 lines) — essays-only feed endpoint
- `src/pages/notes/rss.xml.ts` (35 lines) — notes-only feed endpoint

**Modified:**
- `src/components/seo/BaseSEO.astro` — 3-line additive insert between line 59 (canonical) and line 60 (noIndex). All other tags (og:, twitter:, theme-color, favicon, title-format heuristic) preserved verbatim.
- `package.json` — added `"marked": "^18.0.2"` to `dependencies`.
- `package-lock.json` — npm install resolved marked + transitive dependencies (audit: 8 vulnerabilities flagged — pre-existing across the lockfile, not introduced by marked specifically; out of plan scope).

## Decisions Made

- **Use `marked` as instructed in plan action body** despite the stale `content: entry.body` grep in acceptance criteria. The action body is authoritative; CD-05 wants rendered HTML for feed readers.
- **Always-on alternate-link emission in BaseSEO** (no Props gate) per CD-05 explicit "every page advertises feeds".
- **Sort key `updated ?? published` descending** matches the plan body verbatim and the cross-feed convention used in homepage Recent Writing (CD-01).

## Build Output (key lines)

```
Result (35 files): 0 errors, 0 warnings, 14 hints
[content] Synced content (empty essays + notes — Wave 1 state, expected)
generating static routes
  ├─ /essays/rss.xml (+45ms)
  ├─ /notes/rss.xml (+3ms)
  ├─ /rss.xml (+3ms)
  └─ … (existing 8 Phase 1 routes preserved)
[build] 8 page(s) built in 2.01s
[build] Complete!
```

The "collection does not exist or is empty" messages emitted to stderr are informational (zero items in essays + notes — empty Wave 1 collections); they do not fail the build and resolve in Wave 3 when content is seeded. Phase 1 routes (8) are preserved; the three RSS endpoints are emitted as expected.

## Verification — Acceptance Criteria

**Task 1 (RSS endpoint files):**
- ✅ All three `.ts` files exist
- ✅ All three import `@astrojs/rss` and use `export async function GET`
- ✅ All three include the D-28 draft filter `({ data }) => !data.draft`
- ✅ All three use `content: await marked(entry.body ?? '')` (CD-05 full content, rendered)
- ✅ Combined feed uses `site: context.site` from PUBLIC_SITE_URL
- ✅ `npm run build` exits 0
- ✅ `dist/rss.xml`, `dist/essays/rss.xml`, `dist/notes/rss.xml` all generated
- ✅ Each dist XML has `<rss>` root + `<channel>` child + correct `<title>`
- ✅ With empty collections, item count = 0 across all three feeds (Wave 1 expected — will increase in Wave 3)

**Task 2 (BaseSEO injection):**
- ✅ `application/rss+xml` substring present 3 times in BaseSEO.astro source
- ✅ All three `new URL('/rss.xml' | '/essays/rss.xml' | '/notes/rss.xml', Astro.site)` calls present
- ✅ Ordering preserved: canonical (line 59) → 3× alternate (lines 60-62) → og: tags (line 65)
- ✅ `astro check` exits 0 (0 errors, 0 warnings, 14 hints — same hints as Wave 1)
- ✅ `npm run build` exits 0
- ✅ Three `application/rss+xml` occurrences on `dist/index.html` AND `dist/about/index.html` (verified via `grep -o ... | wc -l`; not `grep -c` which counts lines on minified single-line `<head>`)

**Plan-level verification:**
- ✅ All seven `<verification>` block items pass (build, dist files, alternate-link counts, PRIV-01 carry-forward, no roll-your-own XML)
- ✅ All seven `<success_criteria>` items satisfied

## Threat-Model Coverage

The plan's `<threat_model>` lists six STRIDE threats:

| Threat | Disposition | Implementation status |
|--------|-------------|----------------------|
| T-02-05-01 (XML injection via markdown body) | mitigate | ✅ — `@astrojs/rss` handles XML encoding; we never string-concat; plan rule "DO NOT roll your own XML" enforced |
| T-02-05-02 (Draft leak via feed) | mitigate | ✅ — `({ data }) => !data.draft` filter in all three feed endpoints; verified by acceptance criterion |
| T-02-05-03 (Future-dated post leak) | accept | n/a — accepted; Wesley owns publish discipline |
| T-02-05-04 (Forged RSS GUID) | accept | n/a — accepted; @astrojs/rss derives GUID from link |
| T-02-05-05 (Feed-discovery to wrong host) | mitigate | ✅ — alternate links derive from `Astro.site` (PUBLIC_SITE_URL config), not from request headers |
| T-02-05-06 (Markdown body containing private references) | accept | n/a — accepted; D-28 draft pipeline is the chokepoint |

No new threat surface introduced. No threat flags to add.

## Pointer to Wave 4 Audit (02-09)

Plan 02-09 (Wave 4 audit) will validate the three feeds at https://validator.w3.org/feed/ before launch. The Wave 1 expected state (empty collections → empty `<item>` lists) will graduate to populated feeds during Wave 3 (02-07 essays seed + 02-08 notes seed); 02-09 runs against the populated state.

## Deviations from Plan

### Auto-fixed Issues

None. The plan body was followed verbatim including the marked-rendering pattern. The acceptance-criteria/action-body discrepancy on `content: entry.body` vs `content: await marked(entry.body ?? '')` was resolved in favor of the action body (the canonical CD-05 implementation); see "Plan Action vs Acceptance Criteria" section above. This is plan-text drift, not a code deviation.

## Issues Encountered

None during execution. Two cosmetic/non-substantive notes:

1. **`grep -c` line-counter ambiguity:** Acceptance criterion line 319 expects `grep -c "application/rss+xml" dist/index.html` to return 3. Astro's build emits the entire `<head>` as a single minified line, so `grep -c` (line-counter) returns 1 even though three `<link rel="alternate">` tags are present. Re-verified with `grep -o ... | wc -l` (occurrence-counter), which returns 3 on both home and about pages. The substantive intent — three alternate links on every page — is fully met.
2. **Build-time stderr "collection does not exist or is empty"**: Informational-only messages from `getCollection()` when called against empty collections. Same condition as Wave 1's empty collections; not an error; Wave 3 seeds resolve them.

Neither was a real failure.

## User Setup Required

None — no external service config, no env vars, no DNS, no Vercel changes triggered by this plan. The npm install of `marked` resolved offline against the existing lockfile cache.

## Next Wave Readiness

**Wave 2 → Wave 3 unblocked.** Wave 3 plans (02-07 homepage Recent Writing + essays seed; 02-08 notes seed + topics) can proceed: when their content lands in `src/content/essays/` and `src/content/notes/`, the feeds will populate automatically because `getCollection()` re-evaluates at every build.

**Wave 4 audit ready.** 02-09 can validate the populated feeds at validator.w3.org/feed/ once Wave 3 ships seed content.

**No blockers, no architectural decisions surfaced.** The orchestrator can merge this worktree into the wave 2 integration branch.

## Self-Check: PASSED

Verified after writing this SUMMARY:

- `src/pages/rss.xml.ts` exists (FOUND).
- `src/pages/essays/rss.xml.ts` exists (FOUND).
- `src/pages/notes/rss.xml.ts` exists (FOUND).
- `src/components/seo/BaseSEO.astro` contains 3 `application/rss+xml` substrings (FOUND).
- `package.json` contains `"marked": "^18.0.2"` (FOUND).
- Commit `d098f7a` (Task 1) exists in `git log` (FOUND).
- Commit `5b179e7` (Task 2) exists in `git log` (FOUND).
- `dist/rss.xml` and `dist/{essays,notes}/rss.xml` all generated by `npm run build` (FOUND).

---
*Phase: 02-writing-surface*
*Plan: 05*
*Completed: 2026-04-29*
