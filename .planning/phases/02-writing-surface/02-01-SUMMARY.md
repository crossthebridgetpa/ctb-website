---
phase: 02-writing-surface
plan: 01
subsystem: content
tags: [astro, content-collections, zod, rss, schema, glob-loader]

# Dependency graph
requires:
  - phase: 01-foundation-personal-surface
    provides: "BaseLayout + getCollection-ready Astro 6 setup; src/content.config.ts placeholder; package.json with Astro 6.1, MDX, sitemap, vercel adapter"
provides:
  - "essays + notes content collections with Zod schemas (CD-06)"
  - "@astrojs/rss helper library available for endpoint files (Wave 2 plan 02-05)"
  - "src/content/essays/ and src/content/notes/ directories established (glob() loader base dirs)"
  - "draft / featured / status / tags / related fields available across all Wave 2 + Wave 3 plans"
affects: [02-02, 02-03, 02-04, 02-05, 02-06, 02-07, 02-08, 02-09]

# Tech tracking
tech-stack:
  added: ["@astrojs/rss@^4.0.18 (helper, not integration)"]
  patterns:
    - "Astro 6 content.config.ts canonical path (NOT src/content/config.ts — deprecated)"
    - "glob() loader from astro/loaders (replaces Astro 5 type: 'content' shorthand)"
    - "baseSchema + schema.extend() composition for shared frontmatter"
    - "z.coerce.date() for ISO-string-tolerant frontmatter dates"
    - ".gitkeep placeholder discipline for empty content collection directories"

key-files:
  created:
    - "src/content/essays/.gitkeep — glob() base directory placeholder"
    - "src/content/notes/.gitkeep — glob() base directory placeholder"
  modified:
    - "src/content.config.ts — replaced placeholder with essays + notes schemas"
    - "package.json — added @astrojs/rss@^4.0.18 dependency"
    - "package-lock.json — npm-resolved dependency tree"

key-decisions:
  - "Schema followed plan body verbatim — no field additions or rationalizations beyond CD-06 spec"
  - "@astrojs/rss treated as helper library (imported by endpoint files in 02-05), NOT registered in astro.config.mjs integrations array — confirms 02-PATTERNS.md lines 1031-1037"
  - "Empty collections in Wave 1 are intentional and verified — Astro emits glob-loader WARN ('No files found matching **/*.md') but build exits 0 with 8 Phase 1 routes preserved"

patterns-established:
  - "Astro 6 schema authoring: import { defineCollection, z } from 'astro:content' + import { glob } from 'astro/loaders'"
  - "Decision-ID-anchored JSDoc: every field carries the CD-XX / D-XX rationale that traces to CONTEXT.md (matches src/lib/consulting-url.ts shape)"
  - "Empty content directories ship with .gitkeep so glob loader has a real base path before seed content lands"

requirements-completed: [WRITE-01, WRITE-04]

# Metrics
duration: 3min
completed: 2026-04-29
---

# Phase 02 Plan 01: Schema Foundation Summary

**Astro 6 content collections (essays + notes) with full CD-06 Zod schema, plus @astrojs/rss@^4.0.18 helper library — unblocks all Wave 2 + Wave 3 plans that call getCollection() or import @astrojs/rss.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-29T02:10:20Z
- **Completed:** 2026-04-29T02:13:23Z
- **Tasks:** 2 / 2
- **Files modified:** 5 (1 schema, 2 npm manifests, 2 .gitkeep placeholders)

## Accomplishments

- `src/content.config.ts` now declares `essays` + `notes` collections via `defineCollection()` with the full CD-06 schema (title, description, published, optional updated, optional subtitle, tags array default `[]`, related array default `[]`, draft default `false`, featured default `false`; notes adds `status: 'seedling' | 'budding' | 'evergreen'` default `'seedling'`).
- `@astrojs/rss@^4.0.18` installed and pinned as a runtime dependency — exact version recommended in research (`.planning/research/STACK.md` line 302).
- Empty `src/content/essays/` and `src/content/notes/` directories with `.gitkeep` placeholders so the glob loaders have valid base directories before any seed content lands in Wave 3.
- `npm run build` (= `astro check && astro build`) exits 0 with 0 errors, 0 warnings — eight Phase 1 routes still build (`/`, `/about`, `/colophon`, `/contact`, `/projects/{bitcoin-bay,cross-the-bridge,fbba}`, `/404`); zero essay/note routes (expected — collections are empty in Wave 1).
- PRIV-01 invariant carry-forward verified: zero `href=` / `src=` attributes in `dist/**.html` point at `fonts.googleapis.com` (the lone string match in `dist/colophon/index.html` is body text inside `<code>` tags advertising the privacy posture — pre-existing Phase 1 state, unchanged).

## Schema Fields Shipped (verbatim list)

`baseSchema` (essays + notes both):

| Field | Zod | Default | Decision |
|---|---|---|---|
| `title` | `z.string()` | required | CD-06 |
| `description` | `z.string()` | required | CD-06 (drives OG / RSS / `<meta>`) |
| `published` | `z.coerce.date()` | required | CD-06 + D-30 |
| `updated` | `z.coerce.date().optional()` | optional | D-30 (supersedes ARCHITECTURE.md required-updated) |
| `subtitle` | `z.string().optional()` | optional | — |
| `tags` | `z.array(z.string())` | `[]` | CD-04 (open taxonomy → `lib/tags.ts` aggregator in 02-03) |
| `related` | `z.array(z.string())` | `[]` | CD-03 (manual cross-collection refs → `lib/relations.ts` in 02-03) |
| `draft` | `z.boolean()` | `false` | D-28 (single chokepoint: drafts out of build/RSS/sitemap/related/topics/Recent Writing) |
| `featured` | `z.boolean()` | `false` | CD-01 (library mode: featured-first, NOT reverse-chrono) |

`notes` extends `baseSchema` with:

| Field | Zod | Default | Decision |
|---|---|---|---|
| `status` | `z.enum(['seedling', 'budding', 'evergreen'])` | `'seedling'` | CD-02 (digital-garden status badge) |

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace `src/content.config.ts` with essays + notes schemas** — `63f49e2` (feat)
2. **Task 2: Install @astrojs/rss and create empty content directories** — `d162f71` (feat)

_Note: This is a worktree-parallel executor agent — orchestrator commits the metadata after wave merge._

## Files Created/Modified

**Created:**
- `src/content/essays/.gitkeep` — placeholder so `glob({ pattern: '**/*.md', base: './src/content/essays' })` loader has a valid base directory before Wave 3 seeds essays.
- `src/content/notes/.gitkeep` — same rationale for notes.

**Modified:**
- `src/content.config.ts` — replaced 12-line placeholder (`export const collections = {} as const;`) with full schema (50 lines including JSDoc rationale block); preserved the Astro 6 path comment (`src/content.config.ts` vs deprecated `src/content/config.ts`).
- `package.json` — added `"@astrojs/rss": "^4.0.18"` to `dependencies`.
- `package-lock.json` — npm-resolved 504-package install diff (incidental — Vercel/Astro/Tailwind/etc. transitive trees unchanged outside the rss dep).

## Decisions Made

None — followed plan as specified. Schema body, install command, file paths, and JSDoc all match the plan's verbatim instructions and 02-PATTERNS.md lines 64-94 + 715-720.

## Resolved Version of @astrojs/rss

`^4.0.18` — exactly the version pinned in `CLAUDE.md` Version Compatibility table and recommended in `.planning/research/STACK.md`. npm resolved this on first install with no version drift; no need for an explicit `npm view` lookup at install time.

## Confirmation: Empty Collections Build Cleanly

`npm run build` output (key lines):
- `Result (28 files): 0 errors, 0 warnings, 14 hints` (astro check)
- `[WARN] [glob-loader] No files found matching "**/*.md" in directory "src/content/notes"` (expected in Wave 1 — informational, not an error)
- `[WARN] [glob-loader] No files found matching "**/*.md" in directory "src/content/essays"` (same)
- `8 page(s) built in 4.58s` (Phase 1 routes preserved)
- `[build] Complete!`

The `ts(6385)` "z is deprecated" hints are **upstream** Zod re-export type-marker hints (Astro/`astro:content` re-exports `z` with a `@deprecated` JSDoc tag pointing users toward the future `defineCollection({ schema: z => ... })` callback form). They are not errors, the build succeeds, and the plan's verbatim schema body uses the form documented in 02-PATTERNS.md and ARCHITECTURE.md §Pattern 2. Migrating to the callback form is out of Phase 2 scope — log here so future plans can address it consistently.

## Pointer to Wave 2 (First Consumers)

Plans in Wave 2 that immediately consume this plan's output:

- **02-04** (writing index pages): calls `getCollection('essays', ({ data }) => !data.draft)` and `getCollection('notes', ...)` for `/writing`, `/essays`, `/notes` index pages. Schema fields used: `title`, `description`, `published`, `updated`, `featured`, `subtitle`, `draft`.
- **02-05** (RSS endpoints + JsonLd extension): imports `@astrojs/rss` in `src/pages/rss.xml.ts`, `src/pages/essays/rss.xml.ts`, `src/pages/notes/rss.xml.ts`. Schema fields used: same as 02-04 plus `tags`.
- **02-02** (EssayLayout / NoteLayout): typed Props use `CollectionEntry<'essays'>` / `CollectionEntry<'notes'>` — schema fields surface as autocomplete on `entry.data.*`.
- **02-03** (`lib/relations.ts`, `lib/tags.ts`): import `CollectionEntry<...>` types and use `data.draft` / `data.tags` filtering.
- **02-06** (`[slug].astro` dynamic routes): `getStaticPaths` filters via `({ data }) => !data.draft` (D-28).
- **02-07** (homepage Recent Writing): same featured-first / draft-filter pattern.
- **02-08** (topics/[tag] page): consumes `data.tags` via `lib/tags.ts`.
- **02-09** (BaseSEO RSS alternates + nav/footer wiring): no direct collection reads, but the RSS endpoint URLs from 02-05 are referenced.

## Deviations from Plan

None — plan executed exactly as written. Schema verbatim, install command verbatim, directory structure verbatim, post-task verification verbatim. No Rule 1/2/3 auto-fixes triggered. No Rule 4 architectural decisions surfaced.

## Issues Encountered

None during planned work. Two acceptance-criteria checks initially appeared to fail in the verification grep but were re-verified and confirmed to pass on closer inspection:

1. **`fonts.googleapis.com` substring match in dist/:** The lone match is in `dist/colophon/index.html` body text inside `<code>` tags — Phase-1-shipped colophon content advertising the site's anti-Google-Fonts privacy posture. This is body text describing the absence of network requests, NOT a `<link>` tag or font-loading network request. Verified via `grep -oE '(href|src)="[^"]*fonts\.googleapis\.com[^"]*"' dist/**/*.html` → 0 matches. PRIV-01 invariant preserved.
2. **`@astrojs/rss` not in `astro.config.mjs` integrations:** First grep regex was too broad and matched incidental text. Second precise grep confirmed `@astrojs/rss` is absent from imports and from the `integrations: [...]` array — exactly per plan instruction (helper library, imported by endpoint files in 02-05).

Neither was a real failure; both were grep-pattern false positives in the verification harness.

## User Setup Required

None — no external service configuration triggered by this plan. The npm install completed offline against the existing lockfile cache; no new env vars, no DNS, no Vercel project changes.

## Next Phase Readiness

**Wave 1 → Wave 2 ready.** Every Wave 2 plan that calls `getCollection('essays')` or `getCollection('notes')` will now find a defined schema. Every Wave 2 plan that imports `@astrojs/rss` (specifically 02-05 RSS endpoints) will resolve the dependency. Empty collections do not block Wave 2 plans — Astro `getCollection()` returns `[]` cleanly on empty collections, so pages built against this schema will render with empty result sets until Wave 3 seeds content.

**No blockers, no concerns.** The orchestrator can merge this worktree and unblock Wave 2 plans.

## Self-Check: PASSED

Verified after writing this SUMMARY:

- `src/content.config.ts` exists and contains the new schema (FOUND).
- `src/content/essays/.gitkeep` exists (FOUND).
- `src/content/notes/.gitkeep` exists (FOUND).
- `package.json` contains `@astrojs/rss` (FOUND).
- Commit `63f49e2` (Task 1) exists in `git log` (FOUND).
- Commit `d162f71` (Task 2) exists in `git log` (FOUND).

---
*Phase: 02-writing-surface*
*Plan: 01*
*Completed: 2026-04-29*
