---
phase: 01-foundation-personal-surface
plan: 01
subsystem: infra
tags:
  - astro
  - tailwind
  - vercel
  - scaffold
  - security-headers

# Dependency graph
requires: []
provides:
  - "Astro 6.1.9 + Tailwind v4 + Vercel static adapter scaffolded; `astro check && astro build` exits 0"
  - "package.json with locked Phase 1 dep tree (deps + scripts + Node 22 engine pin)"
  - "astro.config.mjs wiring vercel({imageService:true}), sitemap, mdx, @tailwindcss/vite plugin, site=PUBLIC_SITE_URL with staging fallback, output:'static', trailingSlash:'never', fontProviders import + // fonts:[...] placeholder for PLAN-02"
  - "vercel.json with five baseline security headers (X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, HSTS 2y preload, Permissions-Policy denying camera/mic/geo)"
  - ".env.example documenting the four PUBLIC_* env vars (SITE_URL, UMAMI_HOST, UMAMI_WEBSITE_ID, CONSULTING_URL)"
  - ".gitignore excluding .env*, .vercel, dist/, node_modules/, .astro, playwright-report/, test-results/"
  - ".nvmrc=22"
  - "Temporary src/pages/index.astro 'Foundation scaffold' stub (PLAN-07 replaces with real homepage)"
affects:
  - 01-02 (fonts API can now insert into the placeholder)
  - 01-03..01-09 (all subsequent Phase 1 plans depend on a passing build)
  - 01-10 (CI gates rely on `astro check && astro build` succeeding)

# Tech tracking
tech-stack:
  added:
    - "astro@6.1.9"
    - "@astrojs/vercel@10.0.5 (static + SSR unified — no /static subpath; current published is v10, not v8 as CLAUDE.md / RESEARCH.md said)"
    - "@astrojs/sitemap@3.7.2"
    - "@astrojs/mdx@5.0.4"
    - "tailwindcss@4.2.4 + @tailwindcss/vite@4.2.4 (NOT @astrojs/tailwind — deprecated for v4)"
    - "astro-icon@1.1.5 + @iconify-json/lucide@1.2.103"
    - "@fontsource/playfair-display@5.2.8"
    - "@fontsource-variable/inter@5.2.8"
    - "schema-dts@2.0.0 (devDep, JSON-LD compile-time types)"
    - "@playwright/test@1.59.1 (devDep, network-audit gate)"
    - "@astrojs/check@0.9.8 + typescript@5.9.3 (devDeps, prompted by `astro check`)"
  patterns:
    - "Env-driven site URL: process.env.PUBLIC_SITE_URL ?? 'https://staging.crossthebridge.io' — Phase 3 cutover is a config change, not code"
    - "Vercel-managed image service via imageService:true (avoids shipping Sharp to serverless)"
    - "Anti-stack guard: package.json grepped for @astrojs/tailwind / @astrojs/image; both must be absent"
    - "PUBLIC_ prefix invariant for any env var that ships to the browser bundle"

key-files:
  created:
    - "package.json — locked dep tree + scripts + engines.node>=22.0.0"
    - "package-lock.json — npm v3 lockfile (8000+ lines)"
    - "astro.config.mjs — Vercel adapter (imageService:true), sitemap, mdx, Tailwind v4 via Vite plugin, site from env, output:'static', trailingSlash:'never', fontProviders import + // fonts:[...] placeholder"
    - "tsconfig.json — extends astro/tsconfigs/strict"
    - "vercel.json — five baseline security headers"
    - ".env.example — four PUBLIC_* env var declarations with comments"
    - ".gitignore — Node/Astro/Vercel/env/Playwright exclusions"
    - ".nvmrc — '22'"
    - "src/env.d.ts — Astro client types reference"
    - "src/pages/index.astro — temporary 'Foundation scaffold' stub (PLAN-07 replaces)"
    - "src/styles/global.css — Tailwind v4 import scaffolded by `astro add tailwind` (PLAN-04 expands to the full @theme block as src/styles/app.css per PATTERNS.md)"
  modified: []

key-decisions:
  - "Use `astro add` CLI helpers for Vercel/Tailwind/sitemap/MDX rather than manual config edits — the CLI patches astro.config.mjs and selects current published versions, sidestepping CLAUDE.md / RESEARCH.md's outdated version pins"
  - "Trust @astrojs/vercel@10.0.5 (current published) over RESEARCH.md's @astrojs/vercel/static v5 pattern. v10 unifies static and SSR under a bare `@astrojs/vercel` import; output:'static' in defineConfig drives the static path. CLAUDE.md ^8.x reference and RESEARCH.md /static subpath are both obsolete."
  - "Author src/pages/index.astro as a 1-line 'Foundation scaffold' stub so `astro build` produces non-empty dist/ and exits 0 — PLAN-07 replaces with the real Hero + 4-tile homepage. Plan explicitly authorized this stub."
  - "Keep src/styles/global.css as scaffolded by `astro add tailwind` (single `@import \"tailwindcss\";` line). PATTERNS.md Phase 1 path is src/styles/app.css with the full @theme block — PLAN-04 owns the rename + theme expansion."
  - "Defer Content-Security-Policy authoring to a future plan (RESEARCH Open Q #8). Hand-written CSP risks breaking PLAN-05's mailto-reveal and Nav drawer inline scripts; Astro 6 native CSP API is the safe path."

patterns-established:
  - "Locked stack invariants: every Phase 1 dep is pinned to caret-major chosen by `astro add` or `npm install`; manual version edits forbidden (T-01-01 mitigation)"
  - "Anti-stack greps as commit gates: package.json must NOT contain @astrojs/tailwind or @astrojs/image; vercel.json must NOT contain Content-Security-Policy"
  - "Legacy file preservation: the four pre-existing root files (index.html, script.js, styles.css, wesley-headshot.jpg) are git-status-checked after every commit; Phase 3 owns retirement"

requirements-completed:
  - INFRA-01
  - INFRA-04
  # INFRA-03 is intentionally PARTIAL — adapter wiring shipped here; Vercel project + DNS are PLAN-10 territory.

# Metrics
duration: ~12min
completed: 2026-04-26
---

# Phase 01 Plan 01: Astro 6 + Tailwind v4 + Vercel scaffold Summary

**Bootstrapped the Astro 6 build toolchain (Tailwind v4 via @tailwindcss/vite, Vercel static adapter @10, sitemap, mdx, schema-dts, Playwright) into the existing repo without touching the legacy single-page consulting site, with `astro check && astro build` passing on a 1-page scaffold stub.**

## Performance

- **Duration:** ~12 min (~10 min wall clock between first and last commit + ~2 min context-load before the first commit)
- **Started:** 2026-04-26T13:48:00Z (approx, immediately after context load)
- **Completed:** 2026-04-26T13:50:36Z
- **Tasks:** 2 of 2
- **Files created:** 12 (package.json, package-lock.json, astro.config.mjs, tsconfig.json, vercel.json, .env.example, .gitignore, .nvmrc, src/env.d.ts, src/pages/index.astro, src/styles/global.css, .planning/phases/01-foundation-personal-surface/01-01-SUMMARY.md)

## Accomplishments

- Astro 6 + Tailwind v4 (correct way: `@tailwindcss/vite`) + Vercel static adapter wired in. `astro check` exits 0 (one TS hint about unused `fontProviders` import — intentional, PLAN-02 consumes it). `astro build` produces `dist/` (16 KB: index.html + sitemap-index.xml + sitemap-0.xml).
- Anti-stack invariants verified by grep: NO `@astrojs/tailwind` (deprecated for v4), NO `@astrojs/image` (folded into core), NO `Content-Security-Policy` in vercel.json (Astro native CSP API is the safe path; deferred).
- Legacy single-page consulting site (`index.html`, `script.js`, `styles.css`, `wesley-headshot.jpg`) at the repo root is unmodified — `git status` clean for those four paths through both commits. Phase 3 retires them at apex cutover.
- STRIDE T-01-03 through T-01-07 mitigated via vercel.json baseline headers (clickjacking, MIME-sniff XSS, referrer leakage, TLS downgrade, browser-feature leakage). T-01-08 (CSP) accepted with documented deferral.

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Astro project preserving legacy assets** — `0d28e82` (feat)
   - Manual minimal `package.json` → `npm install astro@^6.1` → `astro add vercel/tailwind/sitemap/mdx --yes` → manual edits to astro.config.mjs (site, output, trailingSlash, imageService:true, fontProviders import, fonts placeholder) → installed astro-icon, @iconify-json/lucide, @fontsource/playfair-display, @fontsource-variable/inter, @playwright/test, schema-dts, @astrojs/check, typescript.
2. **Task 2: vercel.json security headers + .env.example** — `b7d2aba` (feat)

_(No TDD; no refactor commits.)_

## Files Created/Modified

### Created

- `package.json` — locked dep tree + 6 scripts + `engines.node>=22.0.0`
- `package-lock.json` — npm lockfile (resolved versions; see `tech-stack.added` frontmatter for the canonical list)
- `astro.config.mjs` — full config baseline. Variants from RESEARCH.md Example 1: import path is `from '@astrojs/vercel'` (not `/static` — v10 unified), and the `fonts: [...]` block is intentionally omitted (PLAN-02 owns it; the `fontProviders` import is left in place so PLAN-02's diff is isolated to the array body).
- `tsconfig.json` — extends `astro/tsconfigs/strict`, includes `.astro/types.d.ts` and `**/*`, excludes `dist`
- `vercel.json` — verbatim from RESEARCH.md §Security Domain lines 1251-1266
- `.env.example` — four PUBLIC_* vars per RESEARCH.md §Environment Variables, with inline comments explaining the Phase 3 cutover semantics
- `.gitignore` — Node/Astro/Vercel/env/Playwright/OS exclusions; appended to the single-line `.vercel` file `astro add vercel` had created
- `.nvmrc` — single line: `22`
- `src/env.d.ts` — `/// <reference types="astro/client" />`
- `src/pages/index.astro` — 1-line `<h1>Foundation scaffold</h1>` placeholder (PLAN-07 replaces)
- `src/styles/global.css` — `@import "tailwindcss";` (scaffolded by `astro add tailwind`; PLAN-04 will expand this and likely rename to `src/styles/app.css`)

### Modified

None — this plan is greenfield in the Astro tree.

## Decisions Made

See `key-decisions` in frontmatter. Highlights:

1. **`@astrojs/vercel@10.0.5` unified import** — v10's bare `@astrojs/vercel` import covers both static and SSR (driven by `output:` field). RESEARCH.md and CLAUDE.md both reference older v5/`/static` and v8 patterns; the npm registry's current published is v10. Trusted `astro add vercel`'s selection per the Phase 1 stack-lock rule "trust whatever `npx astro add` selects."
2. **`imageService: true` set explicitly** — `astro add vercel` initialized the adapter as `vercel()` with no `imageService` field. Manual edit flipped this on per RESEARCH Pitfall C (avoids shipping Sharp into Vercel functions in production).
3. **`fontProviders` imported but unused** — emits a single TS hint from `astro check`. Intentional: PLAN-02 inserts the `fonts: [...]` array; importing now means PLAN-02's diff is only the array, not the import statement.
4. **Stub homepage** — single `<h1>Foundation scaffold</h1>` so build produces a non-empty dist. Plan acceptance criteria explicitly authorize this.

## Deviations from Plan

### Auto-fixed / authorized adjustments (not bugs)

**1. [Rule 3 - Blocking] @astrojs/check was missing for `astro check`**
- **Found during:** Task 1 verification
- **Issue:** First `./node_modules/.bin/astro check` invocation prompted interactively to install `@astrojs/check` and `typescript`. Plan didn't pre-install them (the plan listed them implicitly via `npx astro add typescript` hint in Task 1 step 1).
- **Fix:** Ran `npm install --save-dev @astrojs/check typescript` non-interactively before retrying `astro check`.
- **Files modified:** `package.json` (devDeps), `package-lock.json`
- **Committed in:** `0d28e82` (rolled into Task 1 commit)

**2. [Authorized by plan] Used manual skeleton instead of `npx create-astro . --template minimal`**
- **Found during:** Task 1 step 1
- **Issue:** Plan's preferred path (`npx --yes create-astro@latest . --template minimal`) would have refused on the non-empty repo (legacy index.html etc. present).
- **Fix:** Used the plan's documented fallback (manual `package.json` + `mkdir src/pages src/components public` + `npm install astro@^6.1` + `astro add` integrations).
- **Files modified:** All Task 1 files
- **Committed in:** `0d28e82`

**3. [Documented deviation] Vercel adapter import path**
- **Found during:** Task 1 step 2 (`astro add vercel`)
- **Issue:** RESEARCH.md Example 1 imports `from '@astrojs/vercel/static'` (v5.x pattern). Current published `@astrojs/vercel@10.0.5` exports a bare module — `from '@astrojs/vercel'` with `output:` deciding static-vs-SSR.
- **Fix:** Kept the v10 unified import (which is what `astro add vercel` wrote). RESEARCH.md and CLAUDE.md notes are stale on this point but the plan anticipates it ("CLAUDE.md's reference to ^8.x is outdated... trust `npx astro add`").
- **Verification:** `astro build` ran clean and produced static `dist/` output as expected.

**4. [Stub authorized] `src/pages/index.astro` is a 1-line scaffold stub**
- **Reason:** `astro build` errors with no pages defined. Plan acceptance criteria explicitly allow a placeholder index.astro and note that PLAN-07 replaces it.
- **Marker:** File header comment says "PLAN-07 replaces this with the real homepage."

## Known Stubs

- `src/pages/index.astro` — `<h1>Foundation scaffold</h1>` placeholder. PLAN-07 (per ROADMAP / phase plan list) replaces with the real Hero + 4-tile grid homepage.
- `src/styles/global.css` — single `@import "tailwindcss";` line. PLAN-04 expands to the full `@theme` block per UI-SPEC, likely renaming the file to `src/styles/app.css` to match PATTERNS.md Phase 1 path.
- `astro.config.mjs` — has a `// fonts: [...] — added by PLAN-02` comment placeholder. PLAN-02 inserts the fonts API block.

These are all intentional, plan-anticipated deferrals. Each downstream plan that owns the stub is named in the comment / file header.

## Deferred Issues

- **`npm audit` reports 3 high-severity findings** in `path-to-regexp` (transitive through `@vercel/routing-utils` → `@astrojs/vercel@^10`). The "fix" `npm audit` proposes is a downgrade to `@astrojs/vercel@8.0.4`, which would be a breaking change AND contradict the stack-lock rule of trusting `astro add`'s selection. Not fixing in this plan.
  - **Recommended follow-up:** revisit when `@astrojs/vercel` ships an update that bumps `@vercel/routing-utils` to a `path-to-regexp@>=6.3.0`. Track upstream issue.
  - **Risk assessment:** the regex-DoS vulnerability affects `path-to-regexp` callers that compile untrusted patterns — Phase 1 is a fully static site; `@vercel/routing-utils` is build-time only, never sees runtime user input. Threat is theoretical for this codebase.
  - **Logged to:** `.planning/phases/01-foundation-personal-surface/deferred-items.md` (will create if any future plan accumulates more).

## Build Output

```
dist/
├── index.html        (43 bytes)
├── sitemap-0.xml     (389 bytes)
└── sitemap-index.xml (196 bytes)
```

Total: ~16 KB. Single page, single sitemap entry. Sitemap correctly absolutized to `https://staging.crossthebridge.io/` (proves `site` config + env-fallback is wiring properly).

`astro check` warnings: 1 hint (`'fontProviders' is declared but never read`) — intentional, PLAN-02 consumes the import.

## Self-Check: PASSED

Verified via `Bash` after writing this SUMMARY:

- Files exist: `package.json`, `tsconfig.json`, `astro.config.mjs`, `vercel.json`, `.env.example`, `.gitignore`, `.nvmrc`, `src/pages/index.astro` — all FOUND.
- Commits exist: `0d28e82` (Task 1), `b7d2aba` (Task 2) — both FOUND in `git log`.
- Legacy preservation: `git status --short index.html script.js styles.css wesley-headshot.jpg` returns no output → all four legacy files unmodified.
- Anti-stack: `! grep '@astrojs/tailwind' package.json`, `! grep '@astrojs/image' package.json`, `! grep -i 'content-security-policy' vercel.json` — all PASS.
- Build: `astro check` 0 errors / 0 warnings / 1 hint; `astro build` exits 0; `dist/index.html` is 43 bytes (the scaffold stub).
