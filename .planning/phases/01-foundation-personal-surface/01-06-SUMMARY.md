---
phase: 01-foundation-personal-surface
plan: 06
subsystem: ui
tags: [astro, layout, nav, mobile-drawer, skip-link, umami, fonts-api, a11y, seo]

requires:
  - phase: 01-02
    provides: "@theme tokens in src/styles/global.css (light + dark) consumed via var(--*); Astro Fonts API providers for Playfair Display + Inter via Fontsource"
  - phase: 01-03
    provides: "BaseSEO.astro + JsonLd.astro components consumed in BaseLayout <head>"
  - phase: 01-04
    provides: "01-04-UMAMI-DECISION.md establishes endpoint contract (PUBLIC_UMAMI_HOST=https://umami.crossthebridge.io, PUBLIC_UMAMI_WEBSITE_ID pending) — three-way guard fails safe to no analytics"
  - phase: 01-05
    provides: "ObfuscatedMailto.astro consumed in Footer column 3"
provides:
  - "BaseLayout.astro — single typed shell for every Phase 1 page (head + body + skip-link + Nav + main slot + Footer)"
  - "Nav.astro — desktop link list + mobile drawer with full a11y contract (focus trap, Escape, scroll-lock, prefers-reduced-motion)"
  - "Footer.astro — locked tagline, locked copyright, 3-column structure with ObfuscatedMailto"
  - "Conditional self-hosted Umami injection wired with three-way guard (PROD && PUBLIC_UMAMI_HOST && PUBLIC_UMAMI_WEBSITE_ID)"
affects: [01-07, 01-08, 01-09, 01-10]

tech-stack:
  added:
    - "astro-icon (lucide:menu via Iconify) consumed in Nav hamburger"
  patterns:
    - "Single shared layout: BaseLayout is consumed by every Phase 1 page; PLAN-07/08/09 author page-body slots only"
    - "Three-way conditional analytics injection: import.meta.env.PROD && PUBLIC_UMAMI_HOST && PUBLIC_UMAMI_WEBSITE_ID — fail-safe to no analytics"
    - "Inline mobile-drawer JS (vanilla, no npm focus-trap dep) with synchronous close-before-navigate (Pitfall F)"
    - "Locked copy contract: tagline + copyright + skip-link text are exact strings, sourced from UI-SPEC §Copywriting"

key-files:
  created:
    - "src/components/Nav.astro"
    - "src/components/Footer.astro"
    - "src/layouts/BaseLayout.astro"
  modified: []

key-decisions:
  - "Imported src/styles/global.css (not app.css as plan referenced) — actual filename in src/styles/ is global.css from PLAN-02; updated commit message and SUMMARY to record the deviation"
  - "Inline drawer toggle JS used `<script is:inline>` per RESEARCH guidance; no client islands or third-party focus-trap dep"
  - "Active route signalled both via aria-current=\"page\" and a 2px under-rule (color is not the sole channel — UI-SPEC §Accessibility line 384)"

patterns-established:
  - "Layout consumer contract: title/description/canonical are required strings; ogImage/ogType/jsonLdSchema/jsonLdData/noIndex optional. TypeScript-strict means astro check fails if a page omits required props"
  - "Pitfall F mitigation: drawer-link click handler calls close() synchronously before browser navigates, clearing body.style.overflow"
  - "Phase 3 cross-link to /consulting is an HTML comment in Footer column 3 — placeholder enforces D-18 layout firewall"

requirements-completed: [A11Y-01, A11Y-02, SEO-01, SEO-02, PRIV-01, PRIV-02]

duration: 6min
completed: 2026-04-27
---

# Phase 01 Plan 06: Layout Shell + Nav + Footer Summary

**Single typed BaseLayout shell with self-hosted fonts, conditional Umami three-way guard, mobile drawer (focus trap + Pitfall F scroll-lock), and locked Footer copy.**

## Performance

- **Duration:** 6 min
- **Started:** 2026-04-27T00:02:28Z
- **Completed:** 2026-04-27T00:08:40Z
- **Tasks:** 3 / 3
- **Files created:** 3 (Nav.astro, Footer.astro, BaseLayout.astro)

## Accomplishments

- **Nav.astro** ships the locked link list (Home / Projects / About / Contact / Colophon) at desktop and a slide-down mobile drawer at <768px. Drawer has the full WCAG modal-pattern a11y contract: aria-controls + aria-expanded toggle, aria-label flips between "Open navigation" / "Close navigation", Escape closes, Tab traps focusables (with shift+Tab wraparound), focus restored to hamburger on close, body scroll-locked while open, slide animation suppressed under prefers-reduced-motion.
- **Pitfall F fully mitigated**: the drawer link-click handler calls `close()` synchronously before the browser processes link navigation, so `document.body.style.overflow` is cleared before any page transition. The Pitfall F race is closed by the synchronous handler ordering, not by deferring the navigation.
- **Footer.astro** renders the locked tagline (`Worldview, projects, and writing — opting out of legacy systems.`) and the locked copyright (`© {year} Wesley Pyburn · Built with care, not surveillance — see [Colophon](/colophon).`) with a 3-column grid at ≥768px. Year is build-time via `new Date().getFullYear()`. ObfuscatedMailto is composed into column 3 with `ctaLabel="Email Wesley"`. Phase 3 `/consulting` cross-link is a JSX comment placeholder — D-18 layout firewall enforced.
- **BaseLayout.astro** wires fonts, SEO, JSON-LD, conditional analytics, skip-link, Nav, main slot, and Footer in the exact order the plan invariants require. TypeScript-strict Props interface ensures `astro check` fails if any page omits `title` / `description` / `canonical`. Three-way Umami guard (`import.meta.env.PROD && umamiHost && umamiId`) fails safe to "no analytics" until both env vars are populated in Vercel — exactly per 01-04-UMAMI-DECISION.md option B.

## Task Commits

1. **Task 1: Author Nav.astro with desktop links + mobile drawer + a11y contract** — `9543b83` (feat)
2. **Task 2: Author Footer.astro with locked tagline + copyright** — `4592dea` (feat)
3. **Task 3: Author BaseLayout.astro wiring fonts/SEO/JsonLd/analytics/Nav/Footer/skip-link** — `ee6e683` (feat)

_Plan metadata commit will be made by the orchestrator after wave merge._

## Files Created/Modified

- `src/components/Nav.astro` — top nav band + mobile drawer, ~307 lines
- `src/components/Footer.astro` — site-wide footer, ~153 lines
- `src/layouts/BaseLayout.astro` — single shared layout shell, ~105 lines

No files modified — all three are new.

## Decisions Made

- **Style import path is `../styles/global.css`, not `../styles/app.css`.** PLAN-06 referenced `app.css` in two places (the `<truths>` invariant and the Task 3 action snippet), but PLAN-02 named the actual file `src/styles/global.css`. Used the real filename so the build resolves; documented as a Rule 3 deviation. The `key_links` regex (`pattern: "import\\s+['\"]\\.\\.\\/styles\\/app\\.css['\"]"`) will not match against this file — the plan-level pattern check should be updated in any verification step that reads it, but the layout import works correctly.
- **Inline focus-trap rather than npm `focus-trap` package.** RESEARCH §Pattern 4 explicitly chose vanilla JS to keep the bundle small and the audit surface minimal; no client island runtime is shipped beyond the ~30 lines in the inline `<script is:inline>` block.
- **Scaffold homepage left untouched.** `src/pages/index.astro` is still the 1-line "Foundation scaffold" stub from PLAN-01 (per STATE.md decision). PLAN-07 will rewrite it to consume BaseLayout. The `astro build` ran successfully (1 page emitted in 2.49s, sitemap generated, fonts copied to `dist/_astro/fonts/`).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Style import path mismatch (`app.css` → `global.css`)**
- **Found during:** Task 3 (BaseLayout authoring)
- **Issue:** Plan instructed `import '../styles/app.css'` (lines 38, 55, 762 of PLAN). Actual filename in src/styles/ is `global.css` (verified — `app.css` does not exist, would cause Vite resolve error during build).
- **Fix:** Used `import '../styles/global.css'` to match the actual file from PLAN-02. The plan's `must_haves.key_links` regex `pattern: "import\\s+['\"]\\.\\.\\/styles\\/app\\.css['\"]"` is therefore not literally matched; the equivalent global.css import satisfies the underlying invariant ("BaseLayout imports the @theme tokens stylesheet so every page picks them up").
- **Files modified:** src/layouts/BaseLayout.astro
- **Verification:** `astro check` exits 0; `astro build` exits 0; fonts copied to `dist/_astro/fonts/` (5288773…woff2 47.1K + 5edca2a…woff2 22.7K) — confirms the global stylesheet is wired in.
- **Committed in:** ee6e683 (Task 3 commit)

**2. [Rule 1 - Bug] Removed literal `fonts.googleapis.com` mention in BaseLayout doc comment**
- **Found during:** Task 3 verification
- **Issue:** Plan's verify chain includes `! grep -q "fonts.googleapis.com"` to enforce Pitfall B. My initial doc comment said "zero references to fonts.googleapis.com" — the literal string in the comment caused the verify check to fail.
- **Fix:** Reworded the docstring to "zero references to the Google Fonts CDN" — same meaning, no triggering literal.
- **Files modified:** src/layouts/BaseLayout.astro
- **Verification:** `! grep -q "fonts.googleapis.com" src/layouts/BaseLayout.astro` now passes.
- **Committed in:** ee6e683 (Task 3 commit, included in single commit)

---

**Total deviations:** 2 auto-fixed (1 blocking path mismatch, 1 self-introduced bug)
**Impact on plan:** Both fixes are minimal and recover the underlying invariants. No scope creep.

## Verification regex caveat

The plan's Task 1 verify chain includes `grep -qE "Home.*Projects.*About.*Contact.*Colophon" src/components/Nav.astro` — a single-line regex that will not match because the link labels live on separate lines of the `links` array. The labels are present in the correct order (verified individually with `grep -E "label: '(Home|Projects|About|Contact|Colophon)'"`). This is a planner-side regex bug, not an implementation defect; flagging here so a future verifier knows to use a multi-line/awk check instead.

## Issues Encountered

None — every task verified on first run after the two deviations above were applied.

## Known Stubs

Two intentional placeholders mandated by plan + UI-SPEC:

| File | Line | Stub | Why intentional |
|------|------|------|-----------------|
| src/components/Footer.astro | 51 | `<p class="footer__rss-placeholder">RSS — coming with Phase 2</p>` | UI-SPEC §Components #3 line 178 mandates this exact placeholder copy until Phase 2 ships the RSS feed |
| src/components/Footer.astro | 52 | `{/* Phase 3: cross-link to /consulting goes here. Commented out in Phase 1 per CONTEXT.md/D-18 layout firewall. */}` | D-18 layout firewall: Phase 1 Footer must not link to consulting; Phase 3 wires this when ConsultingLayout ships |

Neither stub blocks the plan goal — both are explicit Phase 1 contract surfaces.

## Threat Flags

No new threat surface introduced beyond the plan's documented register. The Umami three-way guard is the only first-paint third-party origin and is explicitly accepted in T-06-01 / T-06-04 of the plan threat model.

## LCP / Network audit hint (per <output>)

- `astro build` emitted `dist/_astro/fonts/` with two `.woff2` files (Playfair Display 47.1K + Inter 22.7K). Self-hosted, no Google Fonts CDN reference anywhere in the layout/Nav/Footer trio (`! grep "fonts.googleapis.com" src/{layouts,components}/...` passes).
- Umami script absent from `dist/index.html` (build runs without `PUBLIC_UMAMI_*` env vars in this worktree, so the three-way guard correctly suppresses the tag — fail-safe verified).
- Manual font-preload check in <head> deferred to PLAN-07 (which actually consumes BaseLayout for the homepage). The current scaffold `src/pages/index.astro` is a 1-line stub that doesn't import BaseLayout, so the built `dist/index.html` is 43 bytes and contains no `<link rel="preload" as="font">`. PLAN-07's homepage will exercise this once it consumes BaseLayout.

## Component count (per <output>)

After this plan: BaseLayout + Nav + Footer + (BaseSEO + JsonLd from PLAN-03) + (Hero + CtaButton + Tile + Headshot + ObfuscatedMailto + ExternalLink from PLAN-05) = **11 components total**, vs UI-SPEC ceiling of 8. The over-budget components are:

- **BaseSEO + JsonLd** (PLAN-03) — over-budget but justified: separating SEO meta from JSON-LD enables per-page structured-data variants (WebSite / Person / WebPage / BreadcrumbList) without a 4-way conditional in BaseLayout itself.
- **CtaButton + ExternalLink** (PLAN-05) — over-budget but justified: explicit primitives keep `target="_blank" rel="noopener"` invariants and the booking-vs-mailto CTA logic out of consumer page code.
- **BaseLayout + Nav + Footer** (this plan) — core, not over-budget: every static-site framework demands these three at minimum. Drawer logic could not live in `<Hero />`.

The 8-component ceiling was a Phase 1 austerity target; the 11 we ship are all load-bearing for SEO, a11y, or shared CTA semantics. Documented for the verifier.

## Self-Check: PASSED

Verified before SUMMARY commit:
- `[ -f src/components/Nav.astro ]` → FOUND
- `[ -f src/components/Footer.astro ]` → FOUND
- `[ -f src/layouts/BaseLayout.astro ]` → FOUND
- `git log --oneline | grep 9543b83` → FOUND
- `git log --oneline | grep 4592dea` → FOUND
- `git log --oneline | grep ee6e683` → FOUND
- `node_modules/.bin/astro check` → 0 errors / 0 warnings / 0 hints (19 files)
- `node_modules/.bin/astro build` → 1 page emitted, sitemap generated, 2 woff2 fonts copied

## Next Plan Readiness

PLAN-07/08/09 can now consume `BaseLayout` and ship page-body slots only. Every concern (SEO meta, JSON-LD, font preloads, conditional analytics, Nav with mobile drawer, Footer with locked copy, skip-link, dark-mode tokens) is centralised in this layout. The TypeScript Props interface will catch any consumer page that omits `title` / `description` / `canonical` at `astro check` time.

PLAN-10 (launch checklist) needs to:
- Set `PUBLIC_UMAMI_HOST=https://umami.crossthebridge.io` in Vercel project env (Production + Preview).
- Leave `PUBLIC_UMAMI_WEBSITE_ID` blank in Vercel until Wesley provisions Umami on the VPS and the dashboard issues the UUID — three-way guard keeps the tag suppressed in the meantime.
- Add `umami.crossthebridge.io` to the Playwright network-audit allow-list (host-based check, not website-id-based).

---
*Phase: 01-foundation-personal-surface*
*Plan: 06 (wave 3)*
*Completed: 2026-04-27*
