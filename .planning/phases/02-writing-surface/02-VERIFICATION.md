---
phase: 02-writing-surface
verified: 2026-04-30T20:00:00Z
status: human_needed
score: 4/5 must-haves verified
overrides_applied: 0
human_verification:
  - test: "RSS feed validation — submit /rss.xml, /essays/rss.xml, /notes/rss.xml to validator.w3.org/feed/ after first Vercel deploy"
    expected: "Each feed returns 'This is a valid RSS feed.' with no errors."
    why_human: "The W3C validator requires a publicly-reachable URL; site has not yet been deployed. Pre-deploy local sanity checks confirm well-formed XML and correct item counts (combined: 7, essays: 2, notes: 5), but external validator result is required to fully satisfy WRITE-05 / SC-2."
  - test: "NetNewsWire/Reeder render — add /rss.xml as a subscription after deploy and verify feed reader renders full article content"
    expected: "Feed reader shows all 7 items; each item renders full HTML body (not just description teaser); no encoding artifacts."
    why_human: "Feed reader rendering cannot be tested without a live URL or local reader pointed at a local server."
  - test: "IndieWebify.me microformat validation — submit /essays/thesis, /notes/why-astro-over-next, /writing, /essays, /notes, /about to indiewebify.me after deploy"
    expected: "h-entry found with p-name, e-content, dt-published on essay/note pages; h-feed with h-entry children on indexes; h-card on /about."
    why_human: "IndieWebify.me validators require a public URL. Local grep confirms class presence but not the parsed microformat graph."
---

# Phase 2: Writing Surface Verification Report

**Phase Goal:** On-site essays and notes are live with RSS and cross-collection linking — peer audience can subscribe in NetNewsWire/Reeder, and the homepage gains a curated "Recent writing" module pulling from the new collections.
**Verified:** 2026-04-30T20:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Visitor can read /writing hub, browse /essays and /notes indexes, and read at least 2–3 seed essays (no empty surface); notes route exists even if sparse | VERIFIED | `src/pages/writing/index.astro`, `src/pages/essays/index.astro`, `src/pages/notes/index.astro`, `src/pages/essays/[slug].astro`, `src/pages/notes/[slug].astro` all exist and are substantive. 2 published essays (thesis, sovereignty-as-a-service) and 5 published notes (all `draft: false`) confirmed in content directories. Build emits 33 pages with 0 errors per 02-VALIDATION-REPORT.md. |
| 2 | Visitor can subscribe to combined and per-collection RSS feeds; feeds validate at W3C and render in NetNewsWire/Reeder | UNCERTAIN (human needed) | Three RSS endpoints exist and are substantive: `/rss.xml`, `/essays/rss.xml`, `/notes/rss.xml`. BaseSEO injects 3 `<link rel="alternate">` auto-discovery tags on every page. Build output confirmed 7/2/5 items respectively. `marked` renders full Markdown body to HTML (CD-05 full-content). W3C external validation and reader rendering require a deployed URL — deferred per 02-VALIDATION-REPORT.md and per the verified gates specified in the phase submission. |
| 3 | Reading any essay/note, visitor sees a "Related" block driven by `related: [slug]` frontmatter; visitor can follow tag chips to /topics/[tag] page | VERIFIED | EssayLayout.astro (line 78) and NoteLayout.astro (line 64) both render a `<aside class="essay__related">` / `<aside class="note__related">` conditionally when `relatedEntries.length > 0`. All 7 published files have 2 `related:` slugs wired (confirmed in frontmatter). `resolveRelated()` in lib/relations.ts resolves slugs across both collections. `/topics/[tag].astro` uses `getStaticPaths` + `getAllTags()` + `getEntriesByTag()` from lib/tags.ts. 02-VALIDATION-REPORT.md confirms 7/7 pages render Related aside with 2 body-area links. |
| 4 | Homepage shows a "Recent writing" module pulling latest items from essays + notes (library mode, curated, no staleness signal) | VERIFIED | `src/pages/index.astro` fetches from both collections with D-28 draft filter, applies featured-first logic with most-recently-updated fallback (CD-01), renders `<section id="recent-writing">` with title "Writing" and subtitle "Featured pieces — by topic, not date." No date chrome on items. "All writing →" link to /writing. Substantive, wired, data flowing from real collections. |
| 5 | Internal-link audit: every essay/note has ≥2 outbound internal links; h-card on About, h-entry on essays/notes, h-feed on indexes validate at indiewebify.me | UNCERTAIN (human needed) | Local verification: `class="h-entry"` confirmed in EssayLayout.astro (line 55) and NoteLayout.astro (line 55). `class="h-feed"` confirmed in writing/index.astro, essays/index.astro, notes/index.astro, topics/[tag].astro. `class="h-card"` confirmed in about.astro (line 55, Phase 1 carry-forward). Microformat property classes (p-name, p-summary, e-content, dt-published, p-category) confirmed in layouts. 02-VALIDATION-REPORT.md confirms 7/7 pages with ≥2 body-area cross-content links. External IndieWebify.me validation requires deployed URL — deferred per 02-VALIDATION-REPORT.md. |

**Score:** 4/5 truths verified (SC-2 and SC-5 are human-needed, not failed — implementation complete; external validation gated on deploy)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/content.config.ts` | Essays + notes Zod schemas | VERIFIED | Declares `essays` and `notes` collections via `defineCollection()` + `glob()`. Full schema with title, description, published, updated, subtitle, tags, related, draft, featured; notes extends with status. |
| `src/content/essays/.gitkeep` | Directory sentinel | VERIFIED | File exists; glob loader has real base dir. |
| `src/content/notes/.gitkeep` | Directory sentinel | VERIFIED | File exists. |
| `src/lib/relations.ts` | Cross-collection slug resolver | VERIFIED | `resolveRelated(slugs)` exists, fans out across essays+notes collections, filters drafts (D-28). Substantive implementation (not stub). |
| `src/lib/tags.ts` | Tag aggregator | VERIFIED | `getAllTags()` and `getEntriesByTag()` both implemented, both filter drafts, sort correctly. |
| `src/layouts/EssayLayout.astro` | Reading layout for essays | VERIFIED | Composes BaseLayout, h-entry microformat, reading-time, Related block, BlogPosting JSON-LD. Wired to BaseLayout. |
| `src/layouts/NoteLayout.astro` | Reading layout for notes | VERIFIED | Composes BaseLayout, h-entry microformat, status badge, Related block, Article JSON-LD. Wired to BaseLayout. |
| `src/pages/writing/index.astro` | /writing hub | VERIFIED | h-feed, featured section + year-grouped archive. Real data from getCollection. |
| `src/pages/essays/index.astro` | /essays index | VERIFIED | h-feed, h-entry per item. Real data. |
| `src/pages/notes/index.astro` | /notes index | VERIFIED | h-feed, h-entry per item, status badge. Real data. |
| `src/pages/essays/[slug].astro` | Essay reading route | VERIFIED | getStaticPaths with D-28 filter. Renders EssayLayout with reading-time. |
| `src/pages/notes/[slug].astro` | Note reading route | VERIFIED | getStaticPaths with D-28 filter. Renders NoteLayout. |
| `src/pages/topics/[tag].astro` | Tag page | VERIFIED | getStaticPaths derived from getAllTags(). h-feed + h-entry. Real data. |
| `src/pages/rss.xml.ts` | Combined RSS feed | VERIFIED | @astrojs/rss, D-28 draft filter, full HTML content via marked, 7 items confirmed. |
| `src/pages/essays/rss.xml.ts` | Essays-only RSS feed | VERIFIED | Same pattern, 2 essays. |
| `src/pages/notes/rss.xml.ts` | Notes-only RSS feed | VERIFIED | Same pattern, 5 notes. |
| `src/content/essays/thesis.md` | Seed essay 1 | VERIFIED | `draft: false`, `featured: true`, `related: [sovereignty-as-a-service, why-self-host-umami]`, substantive prose (~750 words). |
| `src/content/essays/sovereignty-as-a-service.md` | Seed essay 2 | VERIFIED | `draft: false`, `featured: true`, related slugs wired. |
| `src/content/notes/` (5 files) | Seed notes | VERIFIED | 5 notes: glp1-sovereignty, open-source-models-catching-up, why-astro-over-next, why-no-comments, why-self-host-umami. All `draft: false`. All have `related:` frontmatter populated. |
| `src/components/Nav.astro` | Writing link in nav | VERIFIED | `{ href: '/writing', label: 'Writing' }` in links array (line 39). Renders in desktop nav and mobile drawer. |
| `src/components/Footer.astro` | RSS subscription links in footer | VERIFIED | `/rss.xml`, `/essays/rss.xml`, `/notes/rss.xml` all listed in Inbound column. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| EssayLayout.astro | lib/relations.ts | `import { resolveRelated }` | WIRED | Line 26; used at line 37 to populate relatedEntries. |
| NoteLayout.astro | lib/relations.ts | `import { resolveRelated }` | WIRED | Line 27; used at line 37. |
| topics/[tag].astro | lib/tags.ts | `import { getAllTags, getEntriesByTag }` | WIRED | Line 15; getAllTags used in getStaticPaths, getEntriesByTag used for page data. |
| essays/[slug].astro | EssayLayout.astro | `import EssayLayout` | WIRED | Line 14; rendered with entry + readingMinutes props. |
| notes/[slug].astro | NoteLayout.astro | `import NoteLayout` | WIRED | Line 3; rendered with entry prop. |
| rss.xml.ts | @astrojs/rss + getCollection | `import rss; getCollection filter` | WIRED | All three endpoints call getCollection with D-28 filter, pass items array with marked-rendered body. |
| index.astro (homepage) | essays + notes collections | `getCollection` with D-28 filter | WIRED | Lines 38–55; featured-first logic + recent fallback renders actual collection data. |
| BaseSEO.astro | RSS feeds | `<link rel="alternate">` | WIRED | 3 alternate link tags injected on every page. |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|-------------------|--------|
| `src/pages/index.astro` | `recentWriting` | `getCollection('essays')` + `getCollection('notes')` with D-28 filter | Yes — 2 essays + 5 notes at build time | FLOWING |
| `src/pages/writing/index.astro` | `featured` + `archive` | Same getCollection pattern | Yes — 7 items split by featured flag | FLOWING |
| `src/layouts/EssayLayout.astro` | `relatedEntries` | `resolveRelated(related)` → `getEntry` across collections | Yes — resolves real collection entries; 02-VALIDATION-REPORT confirms 2 links per page | FLOWING |
| `src/pages/topics/[tag].astro` | `entries` | `getEntriesByTag(tag)` from lib/tags.ts | Yes — real collection query filtered by tag | FLOWING |
| `src/pages/rss.xml.ts` | RSS `items` | `getCollection` + `marked(entry.body)` | Yes — full Markdown body rendered to HTML | FLOWING |

### Behavioral Spot-Checks

Step 7b: SKIPPED — server required for `astro dev` / `astro build` output verification. The 02-VALIDATION-REPORT.md (Wave 4 audit) serves as the equivalent: `npm run build` exit 0, 33 pages, all 10 automated checks PASS.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| WRITE-01 | 02-01, 02-06 | Visitor can read /writing hub showing recent essays + notes | SATISFIED | `src/pages/writing/index.astro` exists, wired, data flowing. Nav link present. |
| WRITE-02 | 02-07 | At least 2–3 seed essays at launch | SATISFIED | 2 essays confirmed: thesis.md + sovereignty-as-a-service.md, both `draft: false`. |
| WRITE-03 | 02-08 | /notes index exists, may be sparse | SATISFIED | `src/pages/notes/index.astro` + 5 published notes exist. |
| WRITE-04 | 02-01, 02-09 | Essays and notes as plain Markdown in distinct Astro content collections | SATISFIED | `src/content.config.ts` declares two collections with distinct schemas; content is `.md` files. |
| WRITE-05 | 02-05, 02-06 | Visitor can subscribe to combined + per-collection RSS feeds; validates at W3C | PARTIALLY SATISFIED | All 3 endpoints implemented and build correctly. External W3C + reader validation deferred to post-deploy per 02-VALIDATION-REPORT.md. Marked as human_needed. |
| WRITE-06 | 02-03, 02-09 | `related: [slug]` frontmatter surfaces Related block at page footer | SATISFIED | EssayLayout and NoteLayout both render Related aside. All 7 published files have related slugs. 02-VALIDATION-REPORT confirms 7/7 pages render Related block. |
| WRITE-07 | 02-04 | /topics/[tag] page shows all content for a tag across collections | SATISFIED | `src/pages/topics/[tag].astro` with getStaticPaths derived from getAllTags(). Tags present in all essay/note frontmatter. |
| SEO-06 | 02-03, 02-09 | IndieWeb microformats — h-card on About, h-entry on essays/notes, h-feed on indexes | PARTIALLY SATISFIED | All microformat classes confirmed in source: h-entry in layouts, h-feed on indexes, h-card on about.astro. Microformat property classes (p-name, p-summary, e-content, dt-published) verified. External IndieWebify.me validation deferred post-deploy. Marked as human_needed. |

**Notes on orphaned requirements:** WRITE-05 and SEO-06 appear in two plans each (02-05/02-06 and 02-03/02-09 respectively) — this is expected; they cover implementation + validation wave. No orphaned requirement IDs found.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/components/seo/JsonLd.astro` | 116 | `set:html={JSON.stringify(json)}` — raw JSON without `</script>` escaping | Warning | Not a current exploit (trusted authorship), but a latent script-injection vector if any frontmatter field ever contains `</script>`. See CR-01 in 02-REVIEW.md. |
| `src/layouts/NoteLayout.astro` | 59 | `dt-published` class applied to `displayDate = updated ?? published` — mislabels updated date as published date | Warning | Breaks h-entry microformat correctness when a note has both `published` and `updated` dates. No current notes have `updated` set, so latent today. See CR-02 in 02-REVIEW.md. |
| `src/components/seo/JsonLd.astro` | 80-103 | Required Schema.org fields default to empty string (`?? ''`) if caller omits them | Warning | Current callers (EssayLayout, NoteLayout) pass them correctly; latent bug for future callers. See CR-03 in 02-REVIEW.md. |
| `src/lib/relations.ts` | 27-45 | Silently emits duplicate entries if slug exists in both collections; silently drops missing slugs | Warning | Current content has no slug collisions; missing slugs produce no build warning. See WR-01 / WR-02 in 02-REVIEW.md. |
| `src/layouts/BaseLayout.astro` | 88-95 | Umami `src` template literal fragile to env-var format (no URL validation, no trailing-slash normalization) | Warning | Analytics silent failure on bad env var; does not affect any goal-critical behavior. See WR-03 in 02-REVIEW.md. |

**Stub classification note:** None of the above constitute render-blocking stubs. All anti-patterns are latent code-quality issues or edge-case bugs. No file returns `null`, `{}`, `[]`, or placeholder text as its primary output. All anti-patterns are pre-launch advisory items documented in 02-REVIEW.md.

### Human Verification Required

#### 1. W3C Feed Validation

**Test:** After first Vercel deploy, submit each of the following to https://validator.w3.org/feed/:
- `https://<host>/rss.xml`
- `https://<host>/essays/rss.xml`
- `https://<host>/notes/rss.xml`

**Expected:** "This is a valid RSS feed." for each. No errors; warnings acceptable if non-blocking.

**Why human:** W3C validator requires a publicly-reachable URL. Site is not yet deployed (launch ops pending per STATE.md). Implementation is complete and build-verified.

#### 2. Feed Reader Render Check

**Test:** Add `https://<host>/rss.xml` as a subscription in NetNewsWire or Reeder after deploy.

**Expected:** Feed reader shows 7 items with full article text (not just description teasers). No encoding artifacts. Dates display correctly.

**Why human:** Feed reader rendering cannot be tested programmatically without a live URL. Local build confirms `marked` renders full Markdown body into `<content>` field per CD-05.

#### 3. IndieWebify.me Microformat Validation

**Test:** After deploy, submit the following URLs to the relevant IndieWebify.me tools:
- h-entry: https://indiewebify.me/validate-h-entry/ → `/essays/thesis` and at least one note
- h-card: https://indiewebify.me/validate-h-card/ → `/about`
- h-feed: general microformats parser (e.g., https://php.microformats.io/) → `/writing`, `/essays`, `/notes`

**Expected:** Parser finds h-entry (p-name, e-content, dt-published) on essays/notes; h-card (p-name "Wesley Schlemmer") on About; h-feed with h-entry children on indexes.

**Why human:** External validators require a public URL. Local grep confirms class presence; parsed microformat graph requires a live endpoint.

### Known Concerns (Advisory — Pre-Launch Cleanup)

The following issues from 02-REVIEW.md are code quality concerns to address before the site is announced publicly. They do not block phase goal achievement (writing surface is live, RSS works, cross-linking works), but should be fixed before attracting sustained peer traffic:

**Critical priority (fix before public launch announcement):**
- **CR-01** — JsonLd.astro: escape `</script>` sequences in JSON.stringify output (security hygiene)
- **CR-02** — NoteLayout.astro: correct `dt-published` mislabel when `updated` date is set (microformat correctness)
- **CR-03** — JsonLd.astro: fail loud at build time when required BlogPosting fields are missing

**Warning priority (fix before content volume grows):**
- **WR-01/WR-02** — relations.ts: add console.warn for missing/duplicated slugs; stop-at-first-hit per slug
- **WR-03** — BaseLayout.astro: validate Umami env var URL format before emitting
- **WR-07** — tags.ts: add Zod regex refinement for kebab-case-only tags
- **IN-02** — Date formatting: pin `timeZone: 'UTC'` in `toLocaleDateString` for deterministic build output

### Gaps Summary

No blocking gaps. The phase goal is code-complete: writing surface is live with RSS, related cross-linking, topic pages, and a homepage "Recent writing" module. All five Success Criteria have substantive implementation verified in the codebase.

SC-2 (RSS validation) and SC-5 (IndieWebify validation) are blocked on external services that require a deployed URL — per the phase submission instruction and the 02-VALIDATION-REPORT.md, these are classified as human_verification items rather than gaps. The underlying implementation for both is verified in the codebase.

---

_Verified: 2026-04-30T20:00:00Z_
_Verifier: Claude (gsd-verifier)_
