# Phase 2 — Validation Report

**Date:** 2026-04-30
**Build:** Full seed content (2 essays + 5 notes), 33 pages, 0 errors
**Auditor:** Plan 02-09 (Wave 4 pre-launch audit)
**Phase goal:** Convert site from "lobby + project pages" to "lobby + project pages + on-site library" with RSS, microformats, library-mode IA.

## Automated Audit Results

| # | Check | Expected | Actual | Status |
|---|-------|----------|--------|--------|
| 1 | h-entry on essays (per-page) | ≥2 pages | 2 pages | PASS |
| 2 | h-entry on notes (per-page) | ≥5 pages | 5 pages | PASS |
| 3 | h-feed on /writing, /essays, /notes | 3 pages | 3 pages | PASS |
| 3b | h-feed on /topics/[tag] sample | ≥1 | 1 | PASS |
| 4 | h-card on /about | present | found | PASS |
| 5 | Internal links per essay/note (literal grep) | ≥2 each | 27 each | PASS |
| 6a | RSS combined /rss.xml items | ≥1 | 7 | PASS |
| 6b | RSS /essays/rss.xml items | ≥1 | 2 | PASS |
| 6c | RSS /notes/rss.xml items | ≥1 | 5 | PASS |
| 7 | PRIV-01: no fonts.googleapis.com (network) | 0 | 0 actual `<link>`/`<script>` | PASS |
| 8 | PRIV-02: no analytics trackers (network) | 0 | 0 actual `<link>`/`<script>` | PASS |
| 9 | Draft bleed (frontmatter in HTML body) | 0 | 0 | PASS |
| 10 | npm run build | exit 0 | exit 0 (33 pages, 0 errors) | PASS |

**Notes on Audits 7 + 8 — colophon false-positive:**

The literal `grep -r "fonts.googleapis.com" dist/` and `grep -rE "google-analytics|googletagmanager|..." dist/` each return 1 match — both in `dist/colophon/index.html`. These hits are **prose mentions** inside the colophon's "What this site does not load" disclosure section (the page intentionally names the avoided domains as `<code>` text so visitors can audit the privacy claim). They are NOT actual network requests.

The strict network-only audit (`grep -rE '(src|href)="[^"]*fonts\.googleapis\.com' dist/` and the analogous tracker grep) returns 0 across the entire build. This confirms the PRIV-01 and PRIV-02 invariants are intact — zero IP-leaking requests at any URL.

The raw `grep -r ...` invocation in the plan should be read as "≤1, attributable to colophon prose" for this audit going forward; alternatively, future audits can use the `(src|href)=` anchored grep variant for unambiguous results.

## Internal Link Audit (Per-Page)

After the Task 1 fix (populated `related:` frontmatter on all 7 published files), the cross-content discovery surface is wired. Each page renders a "Related" aside via `EssayLayout.astro` / `NoteLayout.astro`, surfacing 2 outbound links to other essays/notes from inside the article body.

**Body-area link extraction** (links inside `<div class="(essay|note)__body e-content">...</article>`, including the Related aside):

| Page | Body-area cross-content links | Status |
|------|-------------------------------|--------|
| /essays/thesis | 2 (→ /essays/sovereignty-as-a-service, /notes/why-self-host-umami) | PASS |
| /essays/sovereignty-as-a-service | 2 (→ /essays/thesis, /notes/glp1-sovereignty) | PASS |
| /notes/why-astro-over-next | 2 (→ /notes/why-self-host-umami, /essays/thesis) | PASS |
| /notes/why-self-host-umami | 2 (→ /essays/thesis, /notes/why-astro-over-next) | PASS |
| /notes/open-source-models-catching-up | 2 (→ /essays/thesis, /notes/why-astro-over-next) | PASS |
| /notes/glp1-sovereignty | 2 (→ /essays/sovereignty-as-a-service, /essays/thesis) | PASS |
| /notes/why-no-comments | 2 (→ /notes/why-astro-over-next, /essays/thesis) | PASS |

All 7 pages have ≥2 outbound internal links inside the article body. Combined with BaseLayout chrome (nav: Home/Projects/Writing/About/Contact/Colophon; footer: 3-column with RSS subscription links), every essay and note page exposes ample internal-discovery surface — meeting WRITE-04's per-page link audit and the Phase 1 success-criteria #5 carry-forward.

## W3C Feed Validator Results

**Status:** Deferred — will validate post-deploy.

The site has not yet been deployed to a public Vercel URL (per STATE.md: "Vercel + DNS launch ops session" remains an open Phase 1 follow-up owned by Wesley). The W3C feed validator at https://validator.w3.org/feed/ requires a publicly-reachable URL.

**Action items for launch ops:**

1. Once a Vercel preview or production URL is live, validate each of:
   - `https://<host>/rss.xml` (combined feed, 7 items)
   - `https://<host>/essays/rss.xml` (essays-only, 2 items)
   - `https://<host>/notes/rss.xml` (notes-only, 5 items)
2. Expected result for each: "This is a valid RSS feed."
3. Any errors reported by the validator must be fixed before announcing the feeds to the Freedom Tech / Bitcoin / FBBA peer audience — broken RSS at first impression is a reputation cost in those circles.
4. Record the validator output (pass + any warnings) by appending to this file under a new "W3C Feed Validation — Post-Deploy Results" section.

**Local pre-deploy sanity checks already performed:**

- Each feed file exists in `dist/` and is well-formed XML (build emits them via `@astrojs/rss`).
- Each feed contains the expected number of `<item>` elements (combined: 7, essays: 2, notes: 5).
- BaseSEO injects 3 `<link rel="alternate" type="application/rss+xml">` tags in every page's `<head>` (auto-discovery for RSS readers).
- The combined feed includes both essays and notes; per-collection feeds filter correctly.
- Full content (not summary-only) is in each item's `<description>` per CD-05 — readers in NetNewsWire / Reeder will see the whole essay, not a teaser. (`marked@^18.0.2` renders Markdown body to HTML at feed-build time.)

## IndieWebify.me Results

**Status:** Deferred — will validate post-deploy.

Same blocker as W3C: the IndieWebify validators (`/validate-h-entry/`, `/validate-h-card/`, `/validate-h-feed/`) require a public URL.

**Action items for launch ops:**

1. **h-entry validation** (essays + notes):
   - https://indiewebify.me/validate-h-entry/ → enter `https://<host>/essays/thesis`
   - Repeat for `/essays/sovereignty-as-a-service` and at least one note (e.g., `/notes/why-astro-over-next`)
   - Expected: validator finds `h-entry`, `p-name` (title), `p-summary` (subtitle), `e-content` (body), `dt-published` (date), and `dt-updated` if present.
2. **h-card validation** (About page, Phase 1 carry-forward):
   - https://indiewebify.me/validate-h-card/ → enter `https://<host>/about`
   - Expected: validator finds `h-card`, `p-name` ("Wesley Schlemmer"), `u-url`, optional `p-note`.
3. **h-feed validation** (writing surfaces):
   - Use a generic microformats parser (e.g., https://php.microformats.io/) on `/writing`, `/essays`, `/notes`
   - Expected: each page contains an `h-feed` with embedded `h-entry` children.

**Local pre-deploy sanity checks already performed:**

- `class="h-entry"` present on every essay page (Audit 1 confirms 2/2).
- `class="h-entry"` present on every note page (Audit 2 confirms 5/5).
- `class="h-feed"` present on `/writing`, `/essays`, `/notes`, and `/topics/[tag]` index pages (Audit 3 + 3b confirm).
- `class="h-card"` present on `/about` (Audit 4 confirms — Phase 1 01-08 carry-forward).
- Microformat property classes (`p-name`, `p-summary`, `e-content`, `dt-published`, `dt-updated`) are emitted by `EssayLayout.astro` and `NoteLayout.astro` per the layout source review.

## Targeted Fixes Applied During Audit

**Fix 1 — Populated `related:` frontmatter on all 7 published essays + notes** (commit c05ce0d).

- **Trigger:** Audit 5 literal-grep passed (≥2 internal links per page, courtesy of nav + footer chrome). But the body-area extraction revealed zero cross-content links inside any essay or note body, and zero `class="essay__related"` / `class="note__related"` aside elements rendered. Every published file had `related: []`. The plan's audit-5 spirit and the WRITE-04 / WRITE-06 / SEO-06 design intent require visible cross-discovery between pieces — not just chrome.
- **Rule:** Rule 2 (auto-add missing critical functionality). Threat model T-02-09-02 explicitly warned about false-positive grep passes; this is the exact case it anticipated.
- **Action:** Wrote 2 sensible cross-collection slugs into each file's `related:` array based on tag overlap and theme:
  - `thesis` → `[sovereignty-as-a-service, why-self-host-umami]`
  - `sovereignty-as-a-service` → `[thesis, glp1-sovereignty]`
  - `glp1-sovereignty` → `[sovereignty-as-a-service, thesis]`
  - `open-source-models-catching-up` → `[thesis, why-astro-over-next]`
  - `why-astro-over-next` → `[why-self-host-umami, thesis]`
  - `why-no-comments` → `[why-astro-over-next, thesis]`
  - `why-self-host-umami` → `[thesis, why-astro-over-next]`
- **Verification:** Re-ran build, confirmed all 7 pages now render the Related aside with 2 outbound body-area links.
- **Files changed:** 7 markdown files in `src/content/essays/` and `src/content/notes/`.

**No prose was edited in any essay or note** — Wesley already approved the published content. The fix landed only in `related:` frontmatter, which is metadata and does not touch the editorial voice.

## Deferred Items

**D-02-09-A** — `getEntry` "not found" warnings during build (cosmetic).

`src/lib/relations.ts:resolveRelated()` issues 14 `console.warn` lines per build because it speculatively probes both `essays` and `notes` collections per related-slug. The function correctly handles the misses (try/catch returning null) and the build still emits 33 pages with 0 errors, but the noise pollutes the build log. Fix is a small refactor (load both collections once, look up via Map) that's out of scope for the audit plan.

Logged in `.planning/phases/02-writing-surface/deferred-items.md` for a future polish plan.

## Phase 2 Readiness

| Gate | Status |
|------|--------|
| All automated checks (1–10) | PASS |
| Build clean with full seed content | PASS (33 pages, 0 errors) |
| Internal link audit (body-area, post-fix) | PASS (7/7 pages with 2+ cross-content links) |
| W3C feed validation | DEFERRED — requires deploy |
| IndieWebify microformat validation | DEFERRED — requires deploy |

**Phase 2 status: Ready for STATE.md update — pending post-deploy external validation.**

The site is internally complete: essays + notes ship, RSS surfaces are live and well-formed, microformats render, library-mode IA is in place, homepage Recent Writing module is wired, nav/footer carry the Writing entry point and RSS subscription links. The two outstanding items (W3C + IndieWebify) are external validators that physically cannot run against a non-deployed build; both are gated on Wesley's launch-ops session.

## Pointer to Launch Ops

The following remain on the launch-ops checklist (per STATE.md "Open Phase 1 follow-ups"):

- Vercel project + DNS for `wesleyschlemmer.com` (Wesley owns)
- Umami self-hosted Docker stack provisioning + UUID wiring (Wesley owns)
- 7-day post-launch Umami revisit gate (Wesley owns)
- Post-deploy: append W3C + IndieWebify results to this file under "Post-Deploy Results"
- Post-deploy: 01-08 About page draft review (still pending Wesley's read)

Phase 2's internal deliverables do not block launch ops; launch ops do not block Phase 2's plan-completion ledger. They are sequenced as parallel tracks.

---

*Generated by plan 02-09 (Wave 4 pre-launch audit), 2026-04-30.*
*See also: 02-09-SUMMARY.md, 02-CONTEXT.md, 02-06/02-07/02-08 SUMMARY.md.*
