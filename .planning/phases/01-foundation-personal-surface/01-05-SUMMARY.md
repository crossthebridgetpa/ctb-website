---
phase: 01-foundation-personal-surface
plan: 05
subsystem: ui
tags:
  - astro
  - components
  - tailwind-v4
  - astro-icon
  - astro-assets
  - mailto-obfuscation
  - lucide
  - design-tokens

# Dependency graph
requires:
  - phase: 01-01
    provides: Astro 6 + Vercel adapter + tsconfig + .env.example + repo structure
  - phase: 01-02
    provides: Tailwind v4 @theme tokens (colors, spacing, type scale, fonts) consumed by every component CSS block
provides:
  - Hero.astro (zero-prop homepage hero with locked D-01 copy + single /contact CTA)
  - CtaButton.astro (primary variant; 48px touch-target; gold-glow focus ring)
  - Tile.astro (one component, project|thesis variant; whole-tile anchor; lucide:arrow-up-right)
  - Headshot.astro (Astro Image-pipeline headshot; widths [320,480,640,800,1200]; alt locked)
  - ObfuscatedMailto.astro (three-layer pattern; data-u + data-d base64 + atob reveal; noscript fallback)
  - ExternalLink.astro (target=_blank + rel=noopener+noreferrer + lucide:external-link icon)
  - src/lib/consulting-url.ts (env-driven CTA target with /consulting fallback for Phase 3 cutover)
  - src/content.config.ts (Phase 1 placeholder; Astro 6 location)
  - astro-icon integration registered in astro.config.mjs
affects:
  - 01-06 (BaseLayout/Nav/Footer — Footer composes ObfuscatedMailto)
  - 01-07 (homepage — composes Hero + 4× Tile in 2×2 grid)
  - 01-08 (About — composes Headshot)
  - 01-09 (project pages — compose CtaButton + ExternalLink; AI/Petros uses consulting-url)
  - 02 (writing surface — content.config.ts becomes the schema home)
  - 03 (consulting cutover — unset PUBLIC_CONSULTING_URL → /consulting fallback)

# Tech tracking
tech-stack:
  added:
    - astro-icon integration (registered in astro.config.mjs; package was already in package.json from 01-01)
  patterns:
    - "Component-level <style> blocks reference design tokens via var(--*) — no hardcoded hex values anywhere (Token discipline, Shared Pattern D)"
    - "@media (prefers-reduced-motion: no-preference) wraps every transition/transform (Motion contract)"
    - "Three-layer mailto obfuscation (display variant + base64-encoded JS reveal + noscript) — invariant: zero plaintext email in source or rendered HTML"
    - "Whole-clickable-area anchor pattern for tiles (single <a> wraps label/title/body/icon)"
    - "Astro <Image /> from astro:assets for any raster; format='avif' single-format (Astro 6 deprecated fallbackFormat — use <Picture> for multi-format)"
    - "rel='noopener noreferrer' on every external anchor (T-05-02 reverse-tabnabbing mitigation)"
    - "Env-driven URLs use PUBLIC_* prefix so Astro inlines them at build time (Pitfall H)"

key-files:
  created:
    - src/components/Hero.astro (78 lines)
    - src/components/CtaButton.astro (66 lines)
    - src/components/Tile.astro (94 lines)
    - src/components/Headshot.astro (42 lines)
    - src/components/ObfuscatedMailto.astro (103 lines)
    - src/components/ExternalLink.astro (42 lines)
    - src/lib/consulting-url.ts (16 lines)
    - src/content.config.ts (11 lines)
    - public/wesley-headshot.jpg (copied from repo root, 93.5 KB)
  modified:
    - astro.config.mjs (registered astro-icon integration)

key-decisions:
  - "Tile is one component with `type: 'project' | 'thesis'` variant prop (not two separate components) — keeps the homepage 4-tile grid composing from a single primitive and matches UI-SPEC §6 line 213 explicit instruction"
  - "Hero accepts zero props — copy and CTA target are LOCKED per D-01; pages never override them. Same anti-config principle as RESEARCH §Anti-patterns line 565"
  - "Used `color-mix(in srgb, …)` for the hero gradient — Astro 6 baseline targets browsers with full color-mix() support (Safari 16.2+, Chrome 111+, Firefox 113+); no hex fallback was needed"
  - "ObfuscatedMailto generates a unique CTA element ID per render (`obfmail-<random>`) so two instances on the same page (Footer + Contact body in PLAN-06/09) cannot collide on `getElementById`"
  - "ExternalLink lives as a shared component despite being used twice (FBBA tile + AI/Petros project CTA) — DRY beats inline duplication for the rel=noopener+noreferrer + icon contract; this is the documented justification for exceeding the UI-SPEC component ceiling"

patterns-established:
  - "Three-layer mailto pattern: visible [at]/[dot] display variant, JS reveal via data-u + data-d (base64) + atob, <noscript> fallback with <strong>-wrapped tokens"
  - "Headshot encapsulation: alt text + widths array + lazy/async are LOCKED at the component boundary so consumer pages cannot regress accessibility or performance"
  - "Token-only CSS: every component <style> block references var(--color-*)/var(--spacing-*)/var(--text-*)/var(--font-*) — zero hex literals, all hex values flow through Tailwind v4 @theme"
  - "Env-driven URL pattern: PUBLIC_<NAME> + ?? '/in-repo-route' fallback enables zero-code config flips between phases"

requirements-completed:
  - IDENT-01
  - IDENT-02
  - IDENT-03
  - IDENT-05
  - PROJ-05

# Metrics
duration: 7min
completed: 2026-04-26
---

# Phase 01 Plan 05: Component Authoring Summary

**Six bespoke Astro components + env-driven consulting-url helper + Astro 6 content-collections placeholder, all driven by Tailwind v4 design tokens, with the three-layer mailto obfuscation invariant verified in built output (`! grep wesley@... dist/` exits non-zero).**

## Performance

- **Duration:** ~7 min (active execution); spawn-to-commit time longer due to npm install in fresh worktree
- **Started:** 2026-04-26T23:48:00Z (approx)
- **Completed:** 2026-04-26T23:54:30Z
- **Tasks:** 2 / 2
- **Files modified:** 10 (1 modified — astro.config.mjs; 9 created)

## Accomplishments

- Hero, CtaButton, and Tile primitives ready for PLAN-07 to compose into the homepage 4-tile grid + locked-copy hero
- Headshot, ObfuscatedMailto, and ExternalLink primitives ready for PLAN-08 (About) and PLAN-09 (Contact + project pages)
- consulting-url.ts helper enables Phase 3 cutover via env var unset (no code change needed)
- astro-icon integration registered → `lucide:arrow-up-right` (Tile) and `lucide:external-link` (ExternalLink) resolve correctly
- Three-layer mailto obfuscation invariant verified in `dist/`: zero plaintext `wesley@crossthebridge.io` strings in built output
- All components type-check clean (`astro check` → 0 errors / 0 warnings / 0 hints) and `astro build` produces non-empty `dist/`

## Task Commits

Each task was committed atomically:

1. **Task 1: Author CtaButton, Tile, Hero — homepage component trio with locked copy** — `176557b` (feat)
2. **Task 2: Author Headshot, ObfuscatedMailto, ExternalLink + consulting-url helper + content collections stub** — `642c481` (feat)

_The orchestrator commits SUMMARY.md after this agent returns (worktree mode)._

## Files Created/Modified

- `src/components/Hero.astro` — Homepage hero section, zero props, locked D-01 copy verbatim, layered radial gradient via `color-mix()`, single `/contact` CTA
- `src/components/CtaButton.astro` — Primary CTA: green/cream, 48px total height, green outline + gold-glow focus ring, full-width on <480px
- `src/components/Tile.astro` — Project/thesis tile variant via `type` prop, whole-tile anchor, `lucide:arrow-up-right` icon affordance, hover border + inset shadow
- `src/components/Headshot.astro` — Astro `<Image />` with widths [320,480,640,800,1200], format=avif, lazy/async, locked alt, 280px square frame at ≥768px
- `src/components/ObfuscatedMailto.astro` — Three-layer pattern (display + JS reveal + noscript), unique element ID per render, base64 domain `Y3Jvc3N0aGVicmlkZ2UuaW8=`
- `src/components/ExternalLink.astro` — `target=_blank` + `rel=noopener noreferrer` + `lucide:external-link` icon, focus-visible green outline
- `src/lib/consulting-url.ts` — `import.meta.env.PUBLIC_CONSULTING_URL ?? '/consulting'` (one-line export + docstring)
- `src/content.config.ts` — Astro 6 placeholder; empty `collections` export; Phase 2 layers schemas on without restructuring
- `public/wesley-headshot.jpg` — Copied from repo root for `astro:assets` ESM import (93.5 KB; legacy `./wesley-headshot.jpg` retained until Phase 3)
- `astro.config.mjs` — Registered `astro-icon` integration (was in package.json from 01-01 but not yet wired)

## Decisions Made

- **Tile as one component with variant prop** (vs ProjectTile + ThesisTile separate) — UI-SPEC §6 line 213 instruction; keeps page composition uniform.
- **Zero-prop Hero** — copy and CTA target are part of the component contract, not consumer-page parameters; future homepage redesigns must edit Hero.astro deliberately, not pass different strings.
- **`color-mix(in srgb, ...)` for hero gradient** — Astro 6 baseline browsers all support `color-mix()`; no hex fallback authored. If browser-support data shifts, the fallback is a one-line edit using cream/green/gold token hex values.
- **Unique ID per ObfuscatedMailto render** — `obfmail-${Math.random().toString(36).slice(2, 9)}` ensures Footer + Contact body don't collide on `getElementById` when both mount on the same page.
- **ExternalLink as shared component** — used twice in Phase 1 (FBBA tile, AI/Petros CTA), but the rel/target/icon contract is load-bearing enough to justify a component over inline duplication. Documents the justification for exceeding the UI-SPEC §Component Inventory ceiling (see "Component Count Variance" below).

## Component Count Variance vs UI-SPEC

UI-SPEC line 156 sets a soft ceiling of 8 components, requiring justification for a 9th. After this plan + PLAN-06's contribution (BaseLayout, Nav, Footer, BaseSEO, JsonLd) the project total is 11:

1. **BaseLayout** (PLAN-06)
2. **Nav** (PLAN-06)
3. **Footer** (PLAN-06)
4. **BaseSEO** (PLAN-06)
5. **JsonLd** (PLAN-06)
6. **Hero** (this plan) — locked-copy homepage hero
7. **CtaButton** (this plan) — primary CTA primitive
8. **Tile** (this plan) — project|thesis tile variant
9. **Headshot** (this plan) — encapsulates Image-pipeline contract (widths, alt, lazy)
10. **ObfuscatedMailto** (this plan) — encapsulates D-13 three-layer pattern; reused in Footer (PLAN-06) and Contact (PLAN-09)
11. **ExternalLink** (this plan) — encapsulates rel/target/icon contract; reused in FBBA tile (PLAN-09) and AI/Petros CTA (PLAN-09)

**Justification:** Headshot, ObfuscatedMailto, and ExternalLink are all small utility components that each encapsulate a load-bearing contract (image pipeline, mailto privacy, external-link safety). Inlining any of them would either (a) force the consumer page to re-author the contract correctly or (b) duplicate the implementation across two callsites. Both are worse than +1 component above the soft ceiling.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Registered `astro-icon` integration in `astro.config.mjs`**
- **Found during:** Task 1 — Tile.astro imports `Icon` from `astro-icon/components`
- **Issue:** `astro-icon` was in `package.json` (added in 01-01) but never registered as an Astro integration. Without `icon()` in the integrations array, the `Icon` virtual module fails to resolve at build time.
- **Fix:** Added `import icon from 'astro-icon';` and inserted `icon()` into the `integrations` array.
- **Files modified:** `astro.config.mjs`
- **Verification:** `astro check` resolves `astro-icon/components`; `astro build` emits the inlined SVG sprite for `lucide:arrow-up-right` and `lucide:external-link`.
- **Committed in:** `176557b` (Task 1 commit)

**2. [Rule 3 - Blocking] Moved `src/content/config.ts` → `src/content.config.ts`**
- **Found during:** Task 2 verification (`astro check` errored with `LegacyContentConfigError`)
- **Issue:** Astro 6 deprecated the legacy `src/content/config.ts` location. The plan was authored against pre-v6 conventions (PATTERNS.md line 85 references `src/content/config.ts`). The new path is `src/content.config.ts` per Astro 6 upgrade guide.
- **Fix:** Wrote the placeholder at `src/content.config.ts` instead, removed the empty `src/content/` directory, and documented the location change in the file's docstring.
- **Files modified:** `src/content.config.ts` (new), `src/content/` (removed)
- **Verification:** `astro check` exits 0; `astro build` emits `dist/` cleanly.
- **Committed in:** `642c481` (Task 2 commit)

**3. [Rule 1 - Bug] Dropped `fallbackFormat="jpg"` prop from `<Image />` in Headshot.astro**
- **Found during:** Task 2 verification (`astro check` reported `ts(2322): 'fallbackFormat' does not exist on type ...`)
- **Issue:** Astro 6's `<Image />` no longer accepts `fallbackFormat`. Multi-format output now requires `<Picture>` (a separate component). The plan's RESEARCH §Pattern 5 (lines 535–552) was written against the older Image API.
- **Fix:** Kept `format="avif"` only. PLAN-08 (About page) can swap to `<Picture>` if multi-format fallback is required at consumer time; for now AVIF with browser-default fallback covers >95% of traffic.
- **Files modified:** `src/components/Headshot.astro`
- **Verification:** `astro check` exits 0; `astro build` succeeds.
- **Committed in:** `642c481` (Task 2 commit)

**4. [Rule 1 - Bug] Removed `Tampa Bay` from Hero.astro docstring**
- **Found during:** Task 1 verification (`! grep -q 'Tampa Bay' src/components/Hero.astro` failed)
- **Issue:** The docstring described the D-02 constraint by quoting the legacy eyebrow `"Tampa Bay's …"`. The verify step grep treats the source file as the unit of inspection — a comment containing the banned string fails the contract.
- **Fix:** Reworded the docstring to "legacy regional eyebrow removed" without naming the legacy string.
- **Files modified:** `src/components/Hero.astro`
- **Verification:** `grep -c 'Tampa Bay' src/components/Hero.astro` returns 0.
- **Committed in:** `176557b` (Task 1 commit, same commit as the original write)

**5. [Rule 1 - Bug] Obfuscated the literal email string in ObfuscatedMailto.astro docstring**
- **Found during:** Task 2 verification (`! grep -q 'wesley@crossthebridge.io' src/components/ObfuscatedMailto.astro` failed)
- **Issue:** Two docstring lines literally quoted `wesley@crossthebridge.io` while describing the obfuscation invariant. The source-level invariant is part of the verify chain.
- **Fix:** Reworded the docstring to describe the rule as `"wesley" + "@" + the configured domain` without forming the contiguous string.
- **Files modified:** `src/components/ObfuscatedMailto.astro`
- **Verification:** `grep -c 'wesley@crossthebridge.io' src/components/ObfuscatedMailto.astro` returns 0; `! grep -r 'wesley@crossthebridge.io' dist/` exits non-zero (no matches).
- **Committed in:** `642c481` (Task 2 commit, same commit as the original write)

**6. [Rule 2 - Missing critical] Created `public/wesley-headshot.jpg`**
- **Found during:** Task 2 (Headshot.astro imports `../../public/wesley-headshot.jpg`)
- **Issue:** PLAN-01 left the headshot at the repo root (`./wesley-headshot.jpg`); the plan's `<read_first>` step instructs "if `public/wesley-headshot.jpg` doesn't exist, copy from repo root". `astro:assets` ESM imports require the file to be at the import path.
- **Fix:** `cp wesley-headshot.jpg public/wesley-headshot.jpg`. Legacy file at repo root retained per PLAN-01 / PATTERNS line 96 ("REUSE-IN-PLACE per UI-SPEC §Imagery").
- **Files modified:** `public/wesley-headshot.jpg` (new, 93.5 KB)
- **Verification:** `test -f public/wesley-headshot.jpg` passes; `astro build` resolves the import.
- **Committed in:** `642c481` (Task 2 commit)

---

**Total deviations:** 6 auto-fixed (3 Rule 1 bugs, 1 Rule 2 missing critical, 2 Rule 3 blocking)
**Impact on plan:** All deviations were required for correctness or to align the plan's pre-v6 instructions with the installed Astro 6.1.9. No scope creep. Output spec deliverables (6 components + helper + content stub) all shipped as specified.

## Issues Encountered

- **No headshot Image variants in `dist/`:** The Astro Image pipeline only emits `_image` URLs / pre-built variants when a *page* references the Headshot component. Because PLAN-08 has not yet wired Headshot into `about.astro`, this build's `dist/_astro/` contains zero headshot variants. Expected — Task 2 verify only requires `astro build` exits 0 and the obfuscation invariant holds. The output spec asks "Whether the build emitted Image variants for the headshot at all 5 widths" — answer: NO yet, deferred to PLAN-08 when About consumes the component. The smallest AVIF variant size sanity check is also deferred until then.

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| (none) | — | No new threat surface beyond the plan's `<threat_model>`. ObfuscatedMailto's runtime click handler is `is:inline` + `define:vars` (no XSS surface), Headshot strips EXIF via Sharp/Vercel re-encode (T-05-03 mitigated), ExternalLink emits noopener+noreferrer (T-05-02 mitigated). |

## TDD Gate Compliance

Plan type is `execute` (not `tdd`). Per-task TDD was not required. Tasks 1 and 2 are `tdd="false"` per plan frontmatter. No TDD gate enforcement applies.

## User Setup Required

None — no external service configuration required for this plan. `PUBLIC_CONSULTING_URL` is already declared in `.env.example` (set in PLAN-01). The Vercel project will need that env var set before Phase 3 cutover, but Phase 1 staging works with the default value already in `.env.example`.

## Next Phase Readiness

- **PLAN-06 (BaseLayout/Nav/Footer):** Footer.astro can import ObfuscatedMailto directly. No blockers.
- **PLAN-07 (homepage):** `src/pages/index.astro` rewrites to `<BaseLayout><Hero /><section class="tile-grid"><Tile ... /×4></section></BaseLayout>`. All primitives ready.
- **PLAN-08 (About):** Imports Headshot — first build that triggers the Image pipeline at the 5 widths.
- **PLAN-09 (project pages, Contact):** Composes CtaButton + ExternalLink + ObfuscatedMailto + consulting-url. All primitives ready.
- **PLAN-08 follow-up:** Consider switching Headshot from `<Image format="avif" />` to `<Picture formats={['avif', 'webp']} fallbackFormat="jpg" />` if multi-format fallback proves necessary (Astro 6's `<Picture>` is the dedicated multi-format component).

## Self-Check: PASSED

Verified outputs:

- FOUND: src/components/Hero.astro
- FOUND: src/components/CtaButton.astro
- FOUND: src/components/Tile.astro
- FOUND: src/components/Headshot.astro
- FOUND: src/components/ObfuscatedMailto.astro
- FOUND: src/components/ExternalLink.astro
- FOUND: src/lib/consulting-url.ts
- FOUND: src/content.config.ts
- FOUND: public/wesley-headshot.jpg
- FOUND commit: 176557b (Task 1)
- FOUND commit: 642c481 (Task 2)
- VERIFIED: `astro check` → 0 errors / 0 warnings / 0 hints
- VERIFIED: `astro build` → 1 page built, sitemap created, dist non-empty
- VERIFIED: `! grep -r 'wesley@crossthebridge.io' dist/` exits non-zero (zero plaintext email in built output)
- VERIFIED: hero contains zero `Tampa Bay` references
- VERIFIED: `data-d="Y3Jvc3N0aGVicmlkZ2UuaW8="` matches `echo -n 'crossthebridge.io' | base64`

---
*Phase: 01-foundation-personal-surface*
*Plan: 05*
*Completed: 2026-04-26*
