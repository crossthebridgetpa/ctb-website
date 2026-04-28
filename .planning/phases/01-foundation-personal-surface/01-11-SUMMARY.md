---
phase: 01-foundation-personal-surface
plan: 11
subsystem: seo
tags:
  - domain-constants
  - canonical-name
  - pivot-followup
  - d-20
  - d-21
  - seo
  - jsonld
  - llms-txt
  - og-image

# Dependency graph
requires:
  - phase: 01-foundation-personal-surface
    provides: 01-01 scaffold (.env.example, astro.config.mjs site default), 01-03 SEO surface (BaseSEO, JsonLd, robots.txt, llms.txt, public/og/default.png, tools/render-og.html, tools/render-og.mjs), 01-05 Headshot.astro, 01-06 Footer.astro, 01-07 src/pages/index.astro
provides:
  - JSON-LD Person identity pinned to wesleyschlemmer.com/about#wesley with name "Wesley Schlemmer"
  - robots.txt Sitemap directive pointing at staging.wesleyschlemmer.com
  - llms.txt H1 = "Wesley Schlemmer"; absolute URLs on staging.wesleyschlemmer.com; third project tile renamed to "Cross The Bridge" (path /projects/cross-the-bridge); external destination URLs surfaced for each project
  - astro.config.mjs site default = https://wesleyschlemmer.com (env-var override preserved)
  - .env.example PUBLIC_SITE_URL default = https://staging.wesleyschlemmer.com; D-13 / D-14 / D-05-revised exceptions documented inline
  - BaseSEO homepage title = "Cross The Bridge — Wesley Schlemmer" (homepage-only inverted form)
  - Headshot alt = "Wesley Schlemmer — founder of Cross The Bridge"
  - Footer copyright = "© {currentYear} Wesley Schlemmer · ..."
  - index.astro title + description constants emit "Wesley Schlemmer"
  - tools/render-og.html corner.left = "by Wesley Schlemmer"; public/og/default.png re-rendered with that text baked in
affects: 01-08-about, 01-09-projects-contact-colophon, 01-10-ci-vercel-dns

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Domain-constant-as-canonical: D-20 swap completes the personal-hub identity layer (JSON-LD Person.@id + WebSite description + sitemap URL + Astro.site default + env example) all agreeing on wesleyschlemmer.com"
    - "Surname-as-canonical: D-21 swap completes the human-identity surface (homepage title, Person.name, Headshot alt, Footer copyright, OG image corner pixels, llms.txt prose) all agreeing on Wesley Schlemmer"
    - "OG re-render pipeline preserved: Playwright Chromium screenshot of tools/render-og.html → sharp palette PNG → public/og/default.png; documented as one-shot generator script"

key-files:
  created:
    - ".planning/phases/01-foundation-personal-surface/01-11-SUMMARY.md"
  modified:
    - "src/components/seo/JsonLd.astro"
    - "src/components/seo/BaseSEO.astro"
    - "src/components/Headshot.astro"
    - "src/components/Footer.astro"
    - "src/pages/index.astro"
    - "public/robots.txt"
    - "public/llms.txt"
    - "public/og/default.png"
    - "tools/render-og.html"
    - "astro.config.mjs"
    - ".env.example"

key-decisions:
  - "Resolved plan-internal contradiction in favor of D-05-revised + truths: Task 1 Edit 3 prescribed llms.txt content explicitly includes intentional crossthebridge.io references (prose mention + Cross The Bridge external bullet), which Task 5's automated check at line 990 (! grep -l 'crossthebridge.io' dist/llms.txt) treats as a regression. The prescribed content + must_haves truth #6 + D-05-revised all sanction these references; the automated check is too strict. Documented in Deviations below."
  - "OG image right-corner brand wordmark crossthebridge.io preserved per the framing in <interfaces> (line 263): the OG card is a Cross The Bridge brand card with Wesley as author. D-21 only swaps the person's surname, not the brand wordmark."

patterns-established:
  - "Plan-internal contradiction resolution: when a plan's automated verify check is stricter than the plan's own truths/decisions/prescribed content, the executor follows the more authoritative source (truths + prescribed content) and documents the deviation."

requirements-completed:
  - SEO-01
  - SEO-02
  - SEO-04
  - SEO-05
  - IDENT-02

# Metrics
duration: 6min
completed: 2026-04-28
---

# Phase 01 Plan 11: D-20 + D-21 Pivot Follow-Up Summary

**JSON-LD Person identity, sitemap directive, llms.txt index, Astro site default, .env.example, BaseSEO homepage title, Headshot alt, Footer copyright, index.astro title/description, OG image corner text, and tools/render-og.html template all swapped from `crossthebridge.io` / `Wesley Pyburn` to `wesleyschlemmer.com` / `Wesley Schlemmer` (with D-13 mailto, D-14 Umami host, and D-05-revised consulting CTA exceptions held).**

## Performance

- **Duration:** ~6 min
- **Started:** 2026-04-28T00:49:29Z
- **Completed:** 2026-04-28T00:55:03Z
- **Tasks:** 5 (3 source-modifying + 2 verification)
- **Files modified:** 11 (10 source/asset + 1 binary re-render)

## Accomplishments

- D-20 domain pivot landed in built code: JSON-LD Person `@id`, robots.txt Sitemap, llms.txt H1+URLs, astro.config.mjs site default, and .env.example PUBLIC_SITE_URL all agree on `wesleyschlemmer.com`.
- D-21 canonical-name pivot landed in built code AND the OG image PNG: BaseSEO homepage title, JsonLd Person.name + WebSite.description, Headshot alt-text, Footer copyright, index.astro title + description, llms.txt H1 + prose, and `public/og/default.png` corner pixels all read `Wesley Schlemmer`.
- Three intentional exceptions held on `crossthebridge.io`: ObfuscatedMailto display strings (D-13), Umami host comment in `.env.example` (D-14), `PUBLIC_CONSULTING_URL` value + Cross The Bridge teaser external links in llms.txt (D-05 revised), and the OG card right-corner brand wordmark in `tools/render-og.html` line 81 / line 78 center title (CTB brand identity preserved per the OG card's brand-card framing).
- The third project tile path renamed from `/projects/ai-petros-hermes` to `/projects/cross-the-bridge` in `public/llms.txt` (consistent with what 01-09 will create).
- Build pipeline still passes: `astro check` exit 0, `astro build` exit 0, dist/og/default.png copied verbatim from public/ and md5sum-verified identical.
- Zero `Pyburn` matches in `src/`, `public/`, `tools/`, and `dist/` (D-21 enforcement line at the source-of-truth and built-output level).

## Task Commits

Each task was committed atomically:

1. **Task 1: D-20 domain swaps + JsonLd.astro D-21 surname swaps (5 files)** — `fdfbda5` (feat)
2. **Task 2: D-21 surname swaps in BaseSEO + Headshot + Footer + index.astro** — `bd49c46` (feat)
3. **Task 3: Re-render `public/og/default.png` with corrected corner text** — `1c2a744` (feat)
4. **Task 4: Sanity grep — zero Pyburn in src/public/tools/dist/** — verification only, no commit
5. **Task 5: D-20 audit on dist/ — only allowed exceptions remain** — verification only, no commit

## Files Created/Modified

### Created
- `.planning/phases/01-foundation-personal-surface/01-11-SUMMARY.md` — this file

### Modified (Task 1, commit `fdfbda5`)
- `src/components/seo/JsonLd.astro` — Pitfall G doc comment + PERSON_ID inline comment + PERSON_ID constant value swapped to `https://wesleyschlemmer.com/about#wesley`; Person.name swapped to `Wesley Schlemmer`; WebSite.description swapped to `Wesley Schlemmer's personal site …`. Repointed-2026-04-27 trailer line added to both comments. Schema-dts imports, escape hatches, and schema-selector switch unchanged.
- `public/robots.txt` — Sitemap directive swapped to `https://staging.wesleyschlemmer.com/sitemap-index.xml`. User-agent / Allow blocks unchanged.
- `public/llms.txt` — full rewrite: H1 `Wesley Schlemmer`; intro prose rewritten to clarify wesleyschlemmer.com is the personal-hub apex with the third project teaser linking out to crossthebridge.io for the CTB brand; absolute URLs all on `staging.wesleyschlemmer.com`; third project bullet renamed `Cross The Bridge` (path `/projects/cross-the-bridge`); each project bullet now surfaces the external destination URL.
- `astro.config.mjs` — `site:` default swapped to `https://wesleyschlemmer.com` (env-var fallback `process.env.PUBLIC_SITE_URL ??` preserved). Adapter, integrations, vite plugins, fonts arrays unchanged.
- `.env.example` — header line + PUBLIC_SITE_URL default + comments swapped to `wesleyschlemmer.com`; `Phase 3 cutover` wording corrected to `Phase 1 cutover` (Phase 3 was removed in the D-20 pivot); D-14 Umami host exception explicitly commented; D-05-revised consulting CTA exception explicitly commented; `PUBLIC_CONSULTING_URL=https://crossthebridge.io` value preserved.

### Modified (Task 2, commit `bd49c46`)
- `src/components/seo/BaseSEO.astro` — title heuristic doc comment + `fullTitle` ternary's homepage branch both swapped to `Cross The Bridge — Wesley Schlemmer`. Props interface, Astro.site invariant, isHome heuristic, meta tag emission, theme-color, favicon link unchanged. The brand wordmark `Cross The Bridge` in `og:site_name` and the secondary-page title right side intentionally preserved.
- `src/components/Headshot.astro` — `alt` attribute swapped to `Wesley Schlemmer — founder of Cross The Bridge`. All other Image props (widths, sizes, format, loading, decoding, class) and the `<style>` block unchanged.
- `src/components/Footer.astro` — doc comment example + emitted copyright literal swapped to `Wesley Schlemmer`. Brand wordmark, navLinks, currentYear computation, three-column structure, ObfuscatedMailto wiring, RSS placeholder, all CSS unchanged.
- `src/pages/index.astro` — load-bearing-invariants docstring updated to reference D-21; `const title` swapped to `'Cross The Bridge — Wesley Schlemmer'`; `const description` opening clause swapped to `Wesley Schlemmer's site …`. BaseLayout wiring, Hero composition, Tile grid (third tile still labeled `AI / Petros / Hermes` — that's 01-09's reframe responsibility), Phase 2 placeholder, and all CSS unchanged.

### Modified (Task 3, commit `1c2a744`)
- `tools/render-og.html` — `corner.left` div text swapped to `by Wesley Schlemmer`. The `corner.right` div (`crossthebridge.io`) and the center `.title` div (`crossthebridge.io`) both preserved as the CTB **brand wordmark** on the OG card per the rationale in the plan's `<interfaces>` block (line 263).
- `public/og/default.png` — re-rendered via `node tools/render-og.mjs` (Playwright Chromium screenshot of the updated `render-og.html` at viewport 1200×630, then `sharp` palette PNG encode). New file is 62,881 bytes (under the 100 KB ceiling), valid 1200×630 8-bit colormap PNG. md5 changed from `742a03233bcea34e75d345aedcbc9abe` (pre) to `ca58165ae458a3d90b8b1480954571fb` (post).

## Pre-Edit Grep Baselines

### D-20 axis — `crossthebridge.io` references in src/, public/, astro.config.mjs, .env.example, tools/

```
src/components/seo/JsonLd.astro:15: * which deliberately pins to the canonical apex `https://crossthebridge.io/about#wesley`
src/components/seo/JsonLd.astro:33:// per RESEARCH §JSON-LD line 433). This is the ONLY hardcoded crossthebridge.io
src/components/seo/JsonLd.astro:35:const PERSON_ID = 'https://crossthebridge.io/about#wesley';
src/components/ObfuscatedMailto.astro:39:      To email Wesley, write to <strong>wesley</strong> at <strong>crossthebridge.io</strong>.
src/lib/consulting-url.ts:4: * Phase 1 staging: env var = `https://crossthebridge.io` (apex still serves
public/robots.txt:20:Sitemap: https://staging.crossthebridge.io/sitemap-index.xml
public/llms.txt:7:> domain crossthebridge.io during Phase 1 staging).
public/llms.txt:15:- [About — biography and Freedom Tech thesis](https://staging.crossthebridge.io/about): …
public/llms.txt:16:- [Contact](https://staging.crossthebridge.io/contact): …
public/llms.txt:17:- [Colophon](https://staging.crossthebridge.io/colophon): …
public/llms.txt:21:- [Bitcoin Bay](https://staging.crossthebridge.io/projects/bitcoin-bay): …
public/llms.txt:22:- [FBBA — Florida Bitcoin & Blockchain Association](https://staging.crossthebridge.io/projects/fbba): …
public/llms.txt:23:- [AI / Petros / Hermes](https://staging.crossthebridge.io/projects/ai-petros-hermes): …
public/llms.txt:27:- [Sitemap](https://staging.crossthebridge.io/sitemap-index.xml): …
astro.config.mjs:12:  site: process.env.PUBLIC_SITE_URL ?? 'https://staging.crossthebridge.io',
.env.example:6:# Phase 1 staging: https://staging.crossthebridge.io
.env.example:7:# Phase 3 cutover: https://crossthebridge.io
.env.example:8:PUBLIC_SITE_URL=https://staging.crossthebridge.io
.env.example:19:PUBLIC_CONSULTING_URL=https://crossthebridge.io
tools/render-og.html:78:      <div class="title">crossthebridge.io</div>
tools/render-og.html:81:    <div class="corner right">crossthebridge.io</div>
```

Matches the plan's expected pre-state (1115-line PLAN.md `<grep_baseline>` block).

### D-21 axis — `Pyburn` references in src/, public/, tools/

```
src/components/seo/BaseSEO.astro:45:// "Cross The Bridge — Wesley Pyburn"; every other page gets
src/components/seo/BaseSEO.astro:54:  ? 'Cross The Bridge — Wesley Pyburn'
src/components/seo/JsonLd.astro:40:  name: 'Wesley Pyburn',
src/components/seo/JsonLd.astro:53:    "Wesley Pyburn's personal site — Freedom Tech, Bitcoin, sovereign AI, and the work of opting out of legacy systems.",
src/components/Headshot.astro:19:  alt="Wesley Pyburn — founder of Cross The Bridge"
src/components/Footer.astro:13: *  - Copyright: "© {year} Wesley Pyburn · Built with care, not surveillance —
src/components/Footer.astro:58:      © {currentYear} Wesley Pyburn · Built with care, not surveillance — see <a href="/colophon" class="footer__link">Colophon</a>.
src/pages/index.astro:18: *     Pyburn" (homepage exception). BaseSEO's isHome heuristic detects
src/pages/index.astro:26:const title = 'Cross The Bridge — Wesley Pyburn';
src/pages/index.astro:28:  "Wesley Pyburn's site — Freedom Tech, Bitcoin, sovereign AI, and the work of opting out of legacy systems without going off-grid. Inbound welcome.";
public/llms.txt:3:> Wesley Pyburn's personal site — Freedom Tech, Bitcoin, sovereign AI, and the work
tools/render-og.html:80:    <div class="corner left">by Wesley Pyburn</div>
```

Matches the plan's expected pre-state (12 matches across 7 files).

## Post-Edit Grep Results

### D-20 axis — `crossthebridge.io` references in src/, public/, astro.config.mjs, .env.example, tools/ (post-Task-3)

```
src/components/seo/JsonLd.astro:17: * Repointed 2026-04-27 per D-20 — was crossthebridge.io pre-pivot.
src/components/seo/JsonLd.astro:35:// per D-20 (was crossthebridge.io pre-pivot). This is the ONLY hardcoded
src/components/ObfuscatedMailto.astro:39:      To email Wesley, write to <strong>wesley</strong> at <strong>crossthebridge.io</strong>.
src/lib/consulting-url.ts:4: * Phase 1 staging: env var = `https://crossthebridge.io` (apex still serves
public/llms.txt:6:> linking out to the Cross The Bridge brand site at `crossthebridge.io`) plus
public/llms.txt:23:- [Cross The Bridge](https://staging.wesleyschlemmer.com/projects/cross-the-bridge): Teaser for Wesley's CTB consulting + AI agents + Petros / AYLIP work. External: https://crossthebridge.io (the Cross The Bridge brand site).
.env.example:12:# Endpoint host is `umami.crossthebridge.io` (CTB DNS zone — Wesley owns both
.env.example:20:# brand site at crossthebridge.io (currently the legacy single-page consulting
.env.example:22:# This var deliberately stays pointing at https://crossthebridge.io.
.env.example:23:PUBLIC_CONSULTING_URL=https://crossthebridge.io
tools/render-og.html:78:      <div class="title">crossthebridge.io</div>
tools/render-og.html:81:    <div class="corner right">crossthebridge.io</div>
```

All 12 remaining matches are intentional documented exceptions:
- `JsonLd.astro:17` + `JsonLd.astro:35` — Pitfall G doc comment trailer + PERSON_ID inline-comment historical reference (the constant value itself is now `wesleyschlemmer.com`); the comments document the swap, they don't emit any runtime value.
- `ObfuscatedMailto.astro:39` — D-13 mailto display string (`wesley@crossthebridge.io` is Wesley's email, unrelated to deploy domain).
- `consulting-url.ts:4` — D-05-revised env-var helper comment.
- `llms.txt:6` + `llms.txt:23` — D-05-revised: third project bullet teasers the Cross The Bridge brand site at crossthebridge.io.
- `.env.example:12` + `.env.example:20` + `.env.example:22` + `.env.example:23` — D-14 Umami host exception comment + D-05-revised PUBLIC_CONSULTING_URL value + its rationale comments.
- `tools/render-og.html:78` + `:81` — OG card brand wordmark + corner brand wordmark (CTB brand identity on the brand card; D-21 framing — only the person's surname swaps, not the brand).

### D-21 axis — `Pyburn` references in src/, public/, tools/ (post-Task-3)

```
(empty — zero matches)
```

ZERO `Pyburn` matches in src/, public/, tools/ — D-21 enforcement holds at the source-of-truth level.

## OG Image Re-Render Evidence

```
$ git diff --stat public/og/default.png
 public/og/default.png | Bin 62791 -> 62881 bytes
 1 file changed, 0 insertions(+), 0 deletions(-)

$ stat --format=%s public/og/default.png
62881

$ file public/og/default.png
public/og/default.png: PNG image data, 1200 x 630, 8-bit colormap, non-interlaced

$ md5sum public/og/default.png
ca58165ae458a3d90b8b1480954571fb  public/og/default.png

(pre-render md5 was 742a03233bcea34e75d345aedcbc9abe — confirmed binary changed)
```

PNG is fresh (md5 changed), valid 1200×630 8-bit colormap PNG, 62,881 bytes (≤ 100 KB ceiling, ~+90 bytes vs pre-edit baseline of 62,791 — consistent with the longer "Schlemmer" string vs "Pyburn" producing slightly more anti-aliased text in the corner pixels).

Visual eye-check (executor): unable to render PNG visually in this environment; pixel content of the corner text is taken on faith from the render-og.html source change + render-og.mjs pipeline correctness. Next plan / 01-10 launch checklist will visually verify against the deployed apex when the OG card renders in social previews.

## Post-Build Dist/ Audit (Tasks 4 + 5)

### D-21 — Pyburn audit on dist/

```
$ grep -rn 'Pyburn' dist/ 2>&1 | grep -v ':Binary'
(empty — zero matches)
```

ZERO `Pyburn` matches in `dist/`. D-21 enforcement holds at the built-output level.

### D-20 — crossthebridge.io classification on dist/

```
$ grep -rn 'crossthebridge.io' dist/ 2>/dev/null
dist/index.html:73:To email Wesley, write to <strong data-astro-cid-hjzz7mav>wesley</strong> at <strong data-astro-cid-hjzz7mav>crossthebridge.io</strong>.
dist/llms.txt:6:> linking out to the Cross The Bridge brand site at `crossthebridge.io`) plus
dist/llms.txt:23:- [Cross The Bridge](https://staging.wesleyschlemmer.com/projects/cross-the-bridge): Teaser for Wesley's CTB consulting + AI agents + Petros / AYLIP work. External: https://crossthebridge.io (the Cross The Bridge brand site).
dist/404.html:78:To email Wesley, write to <strong data-astro-cid-hjzz7mav>wesley</strong> at <strong data-astro-cid-hjzz7mav>crossthebridge.io</strong>.
```

Classification per the plan's Task 5 decision tree:

| File:line | Substring | Category | Source decision | Status |
|-----------|-----------|----------|-----------------|--------|
| dist/index.html:73 | `<strong …>wesley</strong> at <strong …>crossthebridge.io</strong>` (ObfuscatedMailto noscript fallback) | B | D-13 | KEEP — intentional |
| dist/404.html:78 | (same as above, second page mounting Footer's ObfuscatedMailto) | B | D-13 | KEEP — intentional |
| dist/llms.txt:6 | prose `linking out to the Cross The Bridge brand site at \`crossthebridge.io\`` | C-adjacent (llms.txt prose) | D-05 revised | KEEP — intentional (mirrors the third project tile teaser intent) |
| dist/llms.txt:23 | `External: https://crossthebridge.io (the Cross The Bridge brand site).` (Cross The Bridge teaser bullet) | C | D-05 revised | KEEP — intentional |

No regressions. Specifically verified absent:
- `dist/sitemap-0.xml`, `dist/sitemap-index.xml`: no `crossthebridge.io` (sitemap regenerated from `Astro.site` = wesleyschlemmer.com)
- `dist/robots.txt`: no `crossthebridge.io` (only the Sitemap directive and that was swapped in Task 1 Edit 2)
- No HTML page anywhere in `dist/`: `crossthebridge.io/about#wesley` (Person `@id` swap held)
- No HTML page anywhere in `dist/`: `staging.crossthebridge.io` (sitewide URL swap held)
- No `dist/llms.txt`: `Pyburn` or `ai-petros-hermes`

### dist/og/default.png integrity

```
$ file dist/og/default.png
dist/og/default.png: PNG image data, 1200 x 630, 8-bit colormap, non-interlaced

$ stat --format=%s dist/og/default.png
62881

$ diff <(md5sum public/og/default.png | cut -d' ' -f1) <(md5sum dist/og/default.png | cut -d' ' -f1)
(no diff — md5sums match)
```

Build copied `public/og/default.png` verbatim into `dist/og/default.png`. Pixel-identical. Re-rendered "by Wesley Schlemmer" corner text is what's deployed.

## Decisions Made

- **Resolved plan-internal contradiction in favor of D-05-revised + must_haves truths + the planner's explicit Task 1 Edit 3 prescribed content.** Task 1 Edit 3 prescribed an llms.txt body that intentionally includes two `crossthebridge.io` references (the prose mention `linking out to the Cross The Bridge brand site at \`crossthebridge.io\`` AND the third project bullet `External: https://crossthebridge.io (the Cross The Bridge brand site).`). These are the same kind of intentional D-05-revised reference as `PUBLIC_CONSULTING_URL=https://crossthebridge.io` in `.env.example`. However, Task 5's automated verify chain (PLAN line 990) and acceptance criterion (line 996) state `dist/llms.txt` must contain ZERO `crossthebridge.io` references — which would require deleting the prescribed content. The must_haves truth #6 (line 46) explicitly enumerates the allowed exceptions including the consulting-CTA href; the llms.txt teaser bullet is the documentation surface for that same href. Resolution: keep the prescribed content (it implements D-05-revised correctly and matches the must_haves truth), and document the conflict here so future plans can tighten the verify chain or relax the acceptance criterion. See "Deviations from Plan" below for the formal classification.
- **OG image right-corner brand wordmark `crossthebridge.io` preserved per the framing in `<interfaces>` (line 263).** The OG card is a Cross The Bridge brand card with Wesley as author. D-21 only swaps the person's surname, not the brand wordmark. `tools/render-og.html` line 81 (corner.right) and line 78 (center title) both stay as `crossthebridge.io`.

## Deviations from Plan

### Plan-Spec Resolution (1)

**1. [Plan-internal contradiction] Task 5 automated verify is stricter than Task 1 prescribed content + must_haves truths**
- **Found during:** Task 5 (D-20 audit on dist/)
- **Issue:** Task 5's automated verify chain at PLAN line 990 (`! grep -l "crossthebridge.io" dist/llms.txt 2>/dev/null`) and the matching acceptance criterion at line 996 require ZERO `crossthebridge.io` references in `dist/llms.txt`. However, Task 1 Edit 3's prescribed llms.txt content (PLAN lines 437-462) explicitly includes two such references — one in the prose intro (`linking out to the Cross The Bridge brand site at \`crossthebridge.io\``) and one in the third project bullet (`External: https://crossthebridge.io (the Cross The Bridge brand site).`). Both are intentional per D-05-revised (the third project tile is a Cross The Bridge teaser that links OUT to the CTB brand site at crossthebridge.io). The plan's `must_haves` truth #6 also explicitly lists allowed `crossthebridge.io` exceptions including the consulting-CTA href value.
- **Resolution:** Followed the more authoritative source (must_haves truths + Task 1 prescribed content + D-05-revised) and accepted the intentional `crossthebridge.io` references in `dist/llms.txt`. Did NOT delete them to satisfy Task 5's overly-strict automated check. Categorized in the dist/ audit table above as Category C / C-adjacent (per the same exception class as the consulting-CTA href).
- **Files affected:** None — no fix required at the source level. Documentation surface only (this SUMMARY note + the dist/ audit classification).
- **Verification:** Manual review of all 4 remaining `crossthebridge.io` matches in `dist/`. All 4 fall into documented exception categories (B = ObfuscatedMailto display; C = Cross The Bridge teaser external destination). No regressions in sitemap, robots, or canonical URL emission.
- **Committed in:** N/A (verification-only task; documentation in this SUMMARY)

---

**Total deviations:** 1 plan-spec resolution (no source code deviation; the prescribed content was correct — the verify chain was the contradiction).
**Impact on plan:** No code change required. Recommend a tightening of either the verify chain (tolerate the documented exception lines) OR the acceptance criterion (allow Category C / C-adjacent matches in `dist/llms.txt` per D-05-revised) in any follow-on plan that re-uses this verification pattern.

## Issues Encountered

- **Playwright Chromium not pre-installed in this worktree.** The `tools/render-og.mjs` pipeline depends on `playwright` + `sharp`, which are NOT direct dependencies in `package.json` (`@playwright/test` is the only Playwright-related dep). Initial `node tools/render-og.mjs` would have failed because `node_modules/` did not exist yet. Resolution: ran `npm install` (which pulled `playwright` and `sharp` as transitive deps of `@astrojs/vercel` + `@playwright/test`), then `npx playwright install chromium`, then `node tools/render-og.mjs`. All subsequent steps succeeded. This is consistent with the plan's note in `<context_note>` that Chromium install may be needed in the worktree.
- **No source code issues encountered.** All literal-string swaps applied cleanly via Edit tool. All grep verifications passed on first try after the corresponding edits. `astro check` and `astro build` both exit 0 with no warnings.

## Files NOT Modified (Regression Checks)

Confirmed unchanged by `git diff main..HEAD --stat`:

- `src/components/ObfuscatedMailto.astro` — D-13 mailto display strings preserved
- `src/lib/consulting-url.ts` — D-05-revised env-var helper preserved
- `src/components/Hero.astro`, `src/components/CtaButton.astro`, `src/components/Tile.astro`, `src/components/ExternalLink.astro` — component primitives unchanged
- `src/components/Nav.astro` — unchanged
- `src/layouts/BaseLayout.astro` — unchanged
- `src/pages/404.astro` — locked recovery copy unchanged
- All `.planning/research/*.md`, `.planning/phases/01-foundation-personal-surface/01-RESEARCH.md`, `01-UI-SPEC.md`, `01-PATTERNS.md`, completed `01-03..01-07` plan files, completed SUMMARY.md files — historical artifacts NOT retroactively edited (D-21 explicit decision)
- `01-08-DRAFT.md` — pre-execution draft unchanged (01-08 will author about.astro using the canonical name during its own execution)

## User Setup Required

None — no external service configuration required for this plan. The DNS / Vercel project setup for `wesleyschlemmer.com` + `staging.wesleyschlemmer.com` is the responsibility of plan 01-10 (CI + Vercel + DNS).

## Next Phase Readiness

- 01-08 (About page) inherits a clean source baseline: when the About page is authored, every reference to Wesley by name uses `Wesley Schlemmer`, every absolute URL uses `wesleyschlemmer.com`, JSON-LD Person identity already pins to the canonical apex.
- 01-09 (Project pages + Contact + Colophon) inherits the same baseline. The `/projects/cross-the-bridge` route name is now expected (llms.txt already lists it). The `PUBLIC_CONSULTING_URL=https://crossthebridge.io` env var is preserved for the Cross The Bridge teaser project page's CTA.
- 01-10 (CI + Vercel + DNS) inherits the deploy-domain decision: Vercel project targets wesleyschlemmer.com; staging is staging.wesleyschlemmer.com; network audit allow-list per D-14 includes `umami.crossthebridge.io`. The `PUBLIC_SITE_URL` env var should be set to `https://staging.wesleyschlemmer.com` in Vercel (matching `.env.example`'s default).

## Self-Check: PASSED

Verified existence of created/modified files:

```
FOUND: .planning/phases/01-foundation-personal-surface/01-11-SUMMARY.md (after Write below — referenced as next step)
FOUND: src/components/seo/JsonLd.astro
FOUND: src/components/seo/BaseSEO.astro
FOUND: src/components/Headshot.astro
FOUND: src/components/Footer.astro
FOUND: src/pages/index.astro
FOUND: public/robots.txt
FOUND: public/llms.txt
FOUND: public/og/default.png (62881 bytes, valid 1200x630 PNG)
FOUND: tools/render-og.html
FOUND: astro.config.mjs
FOUND: .env.example
```

Verified commit hashes:

```
FOUND: fdfbda5 — Task 1 (D-20 + D-21 in 5 files)
FOUND: bd49c46 — Task 2 (D-21 in 4 files)
FOUND: 1c2a744 — Task 3 (OG re-render)
```

Tasks 4 and 5 are verification-only (no commits expected).

---
*Phase: 01-foundation-personal-surface*
*Completed: 2026-04-28*
