---
phase: 01-foundation-personal-surface
plan: 02
subsystem: ui
tags:
  - astro
  - fonts
  - tailwind
  - design-tokens
  - accessibility
  - dark-mode
  - privacy

# Dependency graph
requires:
  - 01-01
provides:
  - "Self-hosted Playfair Display 700 + Inter (variable axis 400-600) via Astro Fonts API + Fontsource provider — zero `fonts.googleapis.com` / `fonts.gstatic.com` references in `dist/` (PRIV-01 invariant)"
  - "src/styles/global.css with full Tailwind v4 @theme block: 8-stop spacing scale, 2 measure tokens, 2 font tokens, 4 type tokens (incl. responsive --text-display clamp), 5 leading tokens, 2 tracking tokens, 12 light-mode color tokens, dark-mode override block (12 tokens) via @media prefers-color-scheme, html color-scheme: light dark, body defaults, .skip-link styles, default :focus-visible 2px green outline, reduced-motion-aware link/button transitions"
  - "CSS-variable contract that PLAN-05 components and PLAN-06 BaseLayout will consume: `--font-display`, `--font-body`, `--color-cream/charcoal/charcoal-mid/muted/green/green-dark/green-light/gold/gold-light/cream-card/cream-border/white`, `--spacing-{xs..4xl}`, `--measure`, `--measure-wide`, `--text-{display,heading,body,meta}`, `--leading-{display,heading,body,body-tight,meta}`, `--tracking-{display,label}`"
affects:
  - 01-03 through 01-09 (every component / layout / page in Phase 1 references these tokens; no hard-coded hex values permitted downstream)
  - 01-06 (BaseLayout will import `src/styles/global.css` and call `<Font cssVariable="--font-display" preload />` and `<Font cssVariable="--font-body" preload />`)
  - 01-10 (network-audit Playwright test asserts zero Google domain requests; this plan establishes the build-time invariant)

# Tech tracking
tech-stack:
  added: []  # all deps already in place from PLAN-01
  patterns:
    - "Astro Fonts API + fontProviders.fontsource() — declarative self-hosted fonts; cssVariable strings link config to @theme to <Font> components"
    - "@media (prefers-color-scheme: dark) { :root { ... } } override pattern for dark mode (NOT light-dark() function — broader baseline browser support per RESEARCH Open Q #2)"
    - "html { color-scheme: light dark; } for native form / scrollbar / textfield dark coloring"
    - "All design tokens live exactly once in src/styles/global.css @theme block; components reference via var(--token); zero hardcoded hex"
    - "Default :focus-visible outline (2px solid var(--color-green); offset 2px) plus per-component overrides — UI-SPEC §Accessibility default"
    - "Motion: 200ms ease-out transitions for color/background/border on a/button, wrapped in @media (prefers-reduced-motion: no-preference) — A11Y motion contract"

key-files:
  created:
    - "src/styles/global.css — promoted from 1-line @import scaffold to full design-token surface (104 lines, 12 light tokens + 12 dark tokens + spacing/type/motion baseline)"
    - ".planning/phases/01-foundation-personal-surface/01-02-SUMMARY.md — this file"
  modified:
    - "astro.config.mjs — replaced `// fonts: [...]` placeholder with concrete fonts array (Playfair + Inter)"

key-decisions:
  - "Inter family declared as `name: 'Inter'` (NOT 'Inter Variable' as plan's verbatim research excerpt said). The `@fontsource-variable/inter` package is the variable-axis distribution OF the `Inter` family, not a separate family name. With `name: 'Inter Variable'`, the Fontsource provider warned 'No data found for font family Inter Variable' and Inter was NOT emitted to dist. Renamed to `'Inter'` and the variable-range `weights: ['400 600']` syntax produces the correct variable wght-axis woff2. This is the Pitfall D scenario the plan explicitly anticipated; documented per the plan's instruction."
  - "Kept the file at `src/styles/global.css` (the path Wave 1 scaffold created) instead of `src/styles/app.css` (the path PATTERNS.md / PLAN-02's `<files>` field assumed). Reason: BaseLayout (PLAN-06) does not yet exist, so no consumer is locked to either path; the rename can happen in any later plan with zero downstream impact, and creating two files would have left the scaffold's `global.css` orphaned. Tailwind v4 + Vite plugin auto-import the file regardless of name."
  - "Used `@media (prefers-color-scheme: dark) { :root { ... } }` override (NOT the `light-dark()` CSS function). Resolves UI-SPEC Open Question #2 / RESEARCH Open Question #2 in favor of broader baseline browser support and simpler tokens (D-10 / A11Y-03 invariant: no manual toggle)."
  - "Kept `weights: ['400 600']` range syntax for Inter (did not need to fall back to `[400, 600]`). Astro 6.1 + Fontsource provider accepts the space-separated range; emits a single variable wght-axis woff2."

patterns-established:
  - "PRIV-01 invariant load-bearing: production build (`astro build`) MUST contact zero Google font domains. Acceptance criterion: `grep -r 'fonts.googleapis.com\\|fonts.gstatic.com' dist/ | wc -l` returns 0. Re-verify this on every Phase 1 SUMMARY going forward."
  - "Color-token discipline (Shared Pattern D): no hardcoded hex outside @theme + dark override block. Components reference via var(--color-*). Linter / grep gate enforced in PLAN-10 (network audit + a11y audit)."
  - "Dark-mode override scope: only the 12 color tokens override in @media-dark; all spacing / type / leading / tracking / motion tokens are mode-agnostic. Single source of truth pattern."

requirements-completed:
  - PRIV-01
  - A11Y-03
  # A11Y-02 is partial — token surface complies; full WCAG 2.2 AA contrast audit happens in PLAN-10

# Metrics
duration: ~3min
completed: 2026-04-26
---

# Phase 01 Plan 02: Self-hosted fonts + Tailwind v4 design-token surface Summary

**Wired Astro Fonts API for self-hosted Playfair Display 700 + Inter (wght axis 400-600) and authored the full Tailwind v4 `@theme` design-token block in `src/styles/global.css` — production build emits 71KB of self-hosted woff2 with zero references to fonts.googleapis.com / fonts.gstatic.com.**

## Performance

- **Duration:** ~3 min (188 sec from start time to last commit; SUMMARY write time excluded)
- **Started:** 2026-04-26T13:55:20Z
- **Tasks:** 2 of 2
- **Commits:** 2 task commits

## Accomplishments

- **PRIV-01 sealed.** Production `astro build` produces `dist/_astro/fonts/5288773a5a229461.woff2` (Playfair Display 700, 48256 bytes, latin subset) and `dist/_astro/fonts/5edca2a1f7ffbddd.woff2` (Inter wght-axis variable, 23224 bytes, latin subset). `grep -r 'fonts.googleapis.com\|fonts.gstatic.com' dist/` returns 0 lines. The Google Fonts CDN IP-leak that the legacy `index.html` had is eliminated at the framework level.
- **Design-token surface declared once.** All 8 spacing tokens, 2 measure tokens, 2 font-family tokens, 4 type tokens (one responsive via `clamp()`), 5 leading tokens, 2 tracking tokens, 12 color tokens (light) + 12 color tokens (dark via @media override) live in a single `@theme` block. Every Phase 1 component will reference these via `var(--*)`.
- **A11Y-03 dark-mode parity wired.** `@media (prefers-color-scheme: dark) { :root { ... } }` override declares full dark token set. `html { color-scheme: light dark; }` enables native form / scrollbar dark coloring. No JS, no manual toggle (D-10 invariant).
- **AA contrast tightening locked in.** `--color-muted` is `#6A6050` (5.58:1 vs cream — passes AA-body), NOT the legacy `#7A7060` (4.40:1 — failed). Single surgical change vs the carry-forward palette.
- **Skip-link + focus-visible base styles in place.** `.skip-link` (visible on focus only, top-left, green-on-cream, 9999 z-index) and default `:focus-visible { outline: 2px solid var(--color-green); outline-offset: 2px; }` declared once for the whole site. PLAN-06 BaseLayout will mount `.skip-link` as the first focusable element on every page.
- **Motion contract honored.** 200ms ease-out transitions on color/background/border for `a, button` are wrapped in `@media (prefers-reduced-motion: no-preference)` — visitors with reduced-motion preference get instant state changes.
- **`astro check` is now 0/0/0** (was 0/0/1 from the unused `fontProviders` import after PLAN-01).

## Task Commits

Each task was committed atomically:

1. **Task 1: Insert Astro Fonts API block into astro.config.mjs** — `7a18776` (feat)
   - Replaced `// fonts: [...]` placeholder with two-entry fonts array.
   - Playfair Display weight 700 → `--font-display` CSS variable.
   - Inter (variable wght-axis 400-600) → `--font-body` CSS variable.
   - `npx astro check` 0 errors / 0 warnings / 0 hints (clears prior unused-import hint).
   - `npx astro build` exits 0; emits 2 woff2 files into `dist/_astro/fonts/`.
2. **Task 2: Author src/styles/global.css with Tailwind v4 @theme block + dark override + skip-link/focus-ring base** — `bd5b988` (feat)
   - File grew from 1 line (`@import "tailwindcss";`) to 104 lines.
   - 8 spacing + 2 measure + 2 font + 4 type + 5 leading + 2 tracking + 12 light color tokens.
   - 12 dark color tokens in `@media (prefers-color-scheme: dark) {:root {...}}` override.
   - `html { color-scheme: light dark; }` + body defaults.
   - `.skip-link` + `.skip-link:focus-visible` + default `:focus-visible` outline + reduced-motion-aware link/button transition.

_(No TDD; no refactor commits.)_

## Files Created/Modified

### Created

- `src/styles/global.css` (104 lines) — see frontmatter `key-files.created` for the canonical token list

### Modified

- `astro.config.mjs` — fonts array inserted; `fontProviders` import is now consumed (clears the TS hint from PLAN-01)

### Build output diff vs PLAN-01 baseline

| Metric | Before (PLAN-01) | After (PLAN-02) | Delta |
|--------|------------------|-----------------|-------|
| `dist/` total size | ~16 KB | 96 KB | +80 KB |
| woff2 files | 0 | 2 | +2 |
| Files in `dist/` | 3 | 5 | +2 (both woff2) |
| `astro check` | 0/0/1 (1 hint) | 0/0/0 | hint cleared |

`dist/index.html` is still the 43-byte scaffold stub — `<Font preload />` HTML emission requires BaseLayout (PLAN-06) to mount the components.

## Decisions Made

See `key-decisions` in frontmatter. Highlights:

1. **Inter family name corrected to `'Inter'` (not `'Inter Variable'`).** This is the **Pitfall D** scenario the plan anticipated. The Fontsource provider keys on Google Fonts canonical family names (`metadata.json` from `@fontsource-variable/inter`: `family: "Inter"`). Using `'Inter Variable'` produced a build warning ("No data found for font family Inter Variable. Did you mean Inter Tight?") and silently failed to emit the woff2. Switching to `'Inter'` while keeping the `@fontsource-variable/inter` package emitted the correct variable wght-axis font.
2. **`weights: ['400 600']` range syntax accepted as-is** — no fallback to `[400, 600]` was needed (Assumption A1 from RESEARCH.md line 1506 resolved positively). Astro 6.1 + Fontsource provider parses the space-separated range and produces a single variable woff2 covering the wght axis from 400 to 600.
3. **File path `src/styles/global.css` retained (not renamed to `src/styles/app.css`).** The plan's `<files>` field said `src/styles/app.css`, matching PATTERNS.md, but Wave 1's scaffold produced `global.css`. Since no consumer is currently locked to either path (BaseLayout — PLAN-06 — will reference whatever path exists), and since Tailwind v4 via the Vite plugin auto-imports regardless of filename, the rename is deferred to whichever later plan finds it convenient. This avoids leaving an orphan `global.css` from Wave 1 alongside a duplicate `app.css`.
4. **Dark mode via `@media (prefers-color-scheme: dark)` override (NOT `light-dark()`).** Resolves UI-SPEC / RESEARCH Open Q #2 in favor of broader baseline browser support. The token-list is duplicated (12 light + 12 dark) but the indirection is simple to reason about, and visitors on browsers without `light-dark()` support fall through to the light defaults rather than rendering with `currentColor`-style undefined behavior.

## Color Token Diff vs Legacy `index.html:13-26`

| Status | Token | Legacy hex | New hex | Reason |
|--------|-------|------------|---------|--------|
| Unchanged | `--color-cream` | `#F7F3EC` | `#F7F3EC` | carry-forward |
| Unchanged | `--color-cream-card` | `#EDE8DE` | `#EDE8DE` | carry-forward |
| Unchanged | `--color-cream-border` | `#DDD5C4` | `#DDD5C4` | carry-forward |
| Unchanged | `--color-charcoal` | `#1C1A16` | `#1C1A16` | carry-forward |
| Unchanged | `--color-charcoal-mid` | `#3A3730` | `#3A3730` | carry-forward |
| **CHANGED** | `--color-muted` | `#7A7060` (4.40:1 — fails AA-body) | `#6A6050` (5.58:1 — passes AA-body) | UI-SPEC §Color tightening; sole surgical AA fix |
| Unchanged | `--color-green` | `#2D4A3E` | `#2D4A3E` | carry-forward |
| Unchanged | `--color-green-dark` | `#1A2E28` | `#1A2E28` | carry-forward |
| Unchanged | `--color-green-light` | `#3D6254` | `#3D6254` | carry-forward |
| Unchanged | `--color-gold` | `#C8A96E` | `#C8A96E` | carry-forward |
| Unchanged | `--color-gold-light` | `#E2C98A` | `#E2C98A` | carry-forward |
| Unchanged | `--color-white` | `#FDFAF5` | `#FDFAF5` | carry-forward |
| **NEW** | 12 dark-mode tokens | (none) | per UI-SPEC §Color Dark Mode | first dark-mode pass |

Total: **11 unchanged, 1 changed (--color-muted), 12 new dark-mode values** — matches the plan's expected diff exactly.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Inter family name `'Inter Variable'` rejected by Fontsource provider**
- **Found during:** Task 1 first build attempt
- **Issue:** Astro logged `[WARN] [assets] No data found for font family Inter Variable. Review your configuration` and `Inter Variable font family cannot be retrieved by the provider. Did you mean Inter Tight?`. Only 1 woff2 file was emitted (Playfair); Inter silently fell back to `system-ui`.
- **Diagnosis:** Inspected `node_modules/@fontsource-variable/inter/metadata.json` — the package's family name is literally `"Inter"`. The `-variable` in the package name describes the *axis distribution*, not the family. The plan's verbatim research excerpt was wrong on this point.
- **Fix:** Renamed `name: 'Inter Variable'` → `name: 'Inter'` in `astro.config.mjs`. Build now emits both woff2 files cleanly with zero warnings.
- **Files modified:** `astro.config.mjs`
- **Commit:** `7a18776` (incorporated into Task 1 commit)
- **Plan-anticipated:** YES — Task 1's action block called this out explicitly as Pitfall D and listed the same Fontsource fallback path (which I considered, but the simpler family-name fix made it unnecessary).

### Authorized adjustments (not bugs)

**2. [Authorized adaptation] Wrote to `src/styles/global.css` instead of `src/styles/app.css`**
- **Reason:** Wave 1 scaffold (PLAN-01) created `src/styles/global.css` via `astro add tailwind` rather than the `app.css` path that PATTERNS.md envisioned. Per the user's executor context note, PLAN-02 should adapt to the actual Wave 1 path. Since no consumer references either path yet (BaseLayout / PLAN-06 is future work), retaining `global.css` is a strict superset of the plan's intent — same content, same tokens, same CSS-variable contract.
- **Downstream impact:** PLAN-04 / PLAN-06 should reference `src/styles/global.css`. If a future plan wants the `app.css` rename, it's a single `git mv` + import-path update.

## Threat Flags

None — no new security-relevant surface introduced. The `@fontsource-variable/inter` and `@fontsource/playfair-display` packages were already in dependencies (PLAN-01); no new network endpoints, auth paths, file-access patterns, or trust-boundary changes.

The threat register's T-02-01 (Google Fonts CDN leak) is now `mitigated`: build emits 0 references to Google domains. T-02-02 (color-token AA regression) is `mitigated`: `--color-muted` is verified at `#6A6050`. T-02-03 (variable-font silent fallback) is `mitigated`: build emits 2 woff2 files with no warnings; the family-name diagnosis path described in the plan was followed.

## Known Stubs

None introduced by this plan. The pre-existing stubs from PLAN-01 (`src/pages/index.astro` placeholder; downstream-plan ownership) remain unchanged.

## Deferred Issues

None. All work intended by this plan landed.

## Self-Check: PASSED

Verified via `Bash` after writing this SUMMARY:

- Files exist: `astro.config.mjs` (modified), `src/styles/global.css` (now 104 lines) — both FOUND.
- Commits exist: `7a18776` (Task 1), `bd5b988` (Task 2) — both FOUND in `git log`.
- Build clean: `astro check` → 0 errors / 0 warnings / 0 hints; `astro build` → 0 errors, 0 warnings, 2 woff2 files emitted.
- PRIV-01 invariant: `grep -r 'fonts.googleapis.com\|fonts.gstatic.com' dist/` → 0 references.
- Token-surface acceptance grep block: all 23 named patterns matched.
