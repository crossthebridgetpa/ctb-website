---
phase: 02-writing-surface
plan: 02
subsystem: content

tags: [astro-content-collections, typescript, library-helpers, draft-filter, cross-collection]

requires:
  - phase: 02-writing-surface
    provides: "essays + notes content collection schemas (02-01) — read at the type level via CollectionEntry<'essays'> / CollectionEntry<'notes'>"
provides:
  - "src/lib/relations.ts — resolveRelated(slugs) cross-collection resolver, D-28 draft-filtered"
  - "src/lib/tags.ts — getAllTags() and getEntriesByTag(tag) cross-collection aggregator, D-28 draft-filtered"
affects: [02-03 (EssayLayout/NoteLayout call resolveRelated), 02-04 (topics/[tag] page calls getAllTags + getEntriesByTag), 02-05, 02-06, 02-07]

tech-stack:
  added: []
  patterns:
    - "lib/ helper shape: JSDoc-first with decision-ID anchors (CD-NN, D-NN), single-purpose, single named export, matches src/lib/consulting-url.ts precedent"
    - "D-28 single chokepoint invariant: every loader-level helper that crosses both collections filters drafts at the loader boundary, never post-hoc"
    - "Type-narrowing predicate `(e): e is AnyEntry => e !== null && !e.data.draft` for combined null + draft filter"

key-files:
  created:
    - "src/lib/relations.ts"
    - "src/lib/tags.ts"
  modified: []

key-decisions:
  - "Phase 2 collections tuple is ['essays', 'notes'] only — Phase 2 has no `projects` collection (project pages are hand-authored under src/pages/projects/). Documented divergence from .planning/research/ARCHITECTURE.md Pattern 3."
  - "Defensive `(data.tags ?? []).includes(tag)` guard rather than relying on schema default — protects against undefined-shape frontmatter during a hand-edit window before Zod parses."
  - "Tag normalization is the AUTHOR's responsibility (CD-04). The aggregator does NOT lowercase/hyphenate inside the helper — silent dedupe misses surface as authoring bugs, not silent data loss."

patterns-established:
  - "Cross-collection helpers live in src/lib/ as small TypeScript modules (relations.ts, tags.ts pattern) — no per-collection helpers, no inlined logic in pages or layouts"
  - "JSDoc anchored to decision IDs (CD-03, CD-04, D-28) so a future reader can cross-reference back to 02-CONTEXT.md without spelunking the code"

requirements-completed: [WRITE-04, WRITE-06, WRITE-07]

duration: 3min 17s
completed: 2026-04-29
---

# Phase 2 Plan 2: Cross-Collection Lib Helpers Summary

**Cross-collection helpers (resolveRelated + getAllTags + getEntriesByTag) with D-28 draft filter at every loader chokepoint, scaffolded for empty Wave 1 collections.**

## Performance

- **Duration:** 3min 17s
- **Started:** 2026-04-29T02:10:15Z
- **Completed:** 2026-04-29T02:13:32Z
- **Tasks:** 2
- **Files created:** 2

## Accomplishments

- Wired Wave 2's data-resolution path before Wave 2 layouts/topics begin: 02-03 (EssayLayout, NoteLayout) calls `resolveRelated`; 02-04 (topics/[tag]) calls `getAllTags` + `getEntriesByTag`.
- Centralized D-28 draft-exclusion at the loader chokepoint — every cross-collection lookup filters drafts before the entry leaves the helper, eliminating "did this layout remember to filter drafts?" as a future bug surface.
- Established the `lib/` helper shape (JSDoc-first, decision-ID anchored) for future cross-cutting helpers.

## Function Signatures (verbatim)

```typescript
// src/lib/relations.ts
type AnyEntry = CollectionEntry<'essays'> | CollectionEntry<'notes'>;
export async function resolveRelated(slugs: string[]): Promise<AnyEntry[]>;

// src/lib/tags.ts
type AnyEntry = CollectionEntry<'essays'> | CollectionEntry<'notes'>;
export async function getAllTags(): Promise<string[]>;
export async function getEntriesByTag(tag: string): Promise<AnyEntry[]>;
```

## D-28 Draft Filter Confirmation (single-chokepoint invariant)

| Helper | Loader call | Draft-exclusion site |
|--------|-------------|----------------------|
| `resolveRelated` | `getEntry(c, slug).catch(() => null)` | Type-narrowing predicate: `(e): e is AnyEntry => e !== null && !e.data.draft` (post-`getEntry` filter — `getEntry` does not accept a predicate) |
| `getAllTags` | `getCollection('essays' \| 'notes', ({ data }) => !data.draft)` | Inline predicate on the loader call (Astro evaluates at content-load time) |
| `getEntriesByTag` | `getCollection('essays' \| 'notes', ({ data }) => !data.draft && (data.tags ?? []).includes(tag))` | Inline predicate combining draft + tag filters on the loader call |

Net effect: a draft essay/note never leaves a Phase 2 lib helper. There is no second filtering layer required at the page or layout level.

## Task Commits

1. **Task 1: Create src/lib/relations.ts** — `c979337` (feat)
2. **Task 2: Create src/lib/tags.ts** — `b8f46fb` (feat)

_(Plan-metadata commit deliberately omitted — orchestrator owns the merge-time metadata commit per parallel-execution protocol; this worktree commits source code only.)_

## Files Created/Modified

- `src/lib/relations.ts` — Cross-collection slug resolver with draft filter (40 lines, JSDoc-anchored to CD-03 + D-28).
- `src/lib/tags.ts` — Cross-collection tag aggregator with draft filter (43 lines, JSDoc-anchored to CD-04 + D-28).

## Decisions Made

### TypeScript Narrowing
Used the type-predicate form `(e): e is AnyEntry => e !== null && !e.data.draft` inside `resolveRelated` rather than chained `.filter(Boolean).filter(notDraft)`. Reasons:
- Single pass over the candidates array.
- The predicate narrows `(AnyEntry | null)[]` directly to `AnyEntry[]` so the function's return type matches its signature without an `as` cast.
- Mirrors the canonical TypeScript narrowing-predicate idiom; future readers don't have to reason about why two filters are necessary.

### Defensive `(data.tags ?? [])` in tags.ts
The Zod schema in 02-01 defaults `tags` to `[]`, so the optional chaining is technically redundant once the schema parses. The defensive guard is preserved because:
- Hand-edited frontmatter can reach the helper before Zod validation in dev/HMR transitions.
- The cost of the guard is trivial (a single `?? []`) and the failure mode it prevents (`includes is not a function on undefined`) is loud and confusing.
- Plan instruction (line 219) explicitly required this guard.

### Phase 2 has no `projects` collection
The original ARCHITECTURE.md Pattern 3 included `'projects'` in the collections tuple. Phase 2 does NOT have a `projects` content collection — project pages live as hand-authored `.astro` files under `src/pages/projects/`. The collections tuple is `['essays', 'notes']` only; the divergence is documented in the JSDoc block at the top of `relations.ts` so a future reader sees it in-source, not just in the plan archive.

## Deviations from Plan

None — plan executed exactly as written. Both files match the verbatim patterns in 02-PATTERNS.md (lines 312–340 for relations.ts, lines 360–397 for tags.ts) with the documented divergences (no `projects`, defensive `?? []` guards, decision-ID JSDoc anchors).

## Issues Encountered

### Astro Check 0-Errors Criterion (parallel-execution race)

The plan's verification step requires `npx astro check` to report 0 errors after each task. In this worktree's filesystem snapshot the check reports 5 errors after Task 1 and 20 after Task 2 — all of the form:

> Type '"essays"' does not satisfy the constraint 'never'.
> Type '"notes"' does not satisfy the constraint 'never'.

This is not a code-correctness issue. The errors are caused by `src/content.config.ts` still being the Phase 1 placeholder (`export const collections = {} as const;`) in this worktree. Plan 02-01 (Wave 1, parallel-running in a sibling worktree) creates the actual `essays`/`notes` collection definitions; once the orchestrator merges 02-01's worktree into the integration branch, `CollectionEntry<'essays'>` and `CollectionEntry<'notes'>` resolve to their full Zod-derived types, and both helpers type-check cleanly.

The plan's frontmatter explicitly anticipated this race (line 62-63: "Wave 1, parallel-safe — schema is committed at start of Wave 1 even if 02-01 and 02-02 run in parallel"). The orchestrator runs full verification after merge.

The code in this worktree is correct against the schema as documented in 02-CONTEXT.md and 02-PATTERNS.md and matches the plan's verbatim code blocks. No code changes were needed; the type-check will pass on the merged tree.

**No deferral required.** This is the documented parallel-execution merge contract, not a residual issue.

## Next Phase Readiness

Wave 2 (02-03 layouts, 02-04 topics page) is unblocked from this worktree's perspective. Both layouts can `import { resolveRelated } from '../lib/relations'`; the topics page can `import { getAllTags, getEntriesByTag } from '../lib/tags'`. Function signatures, draft semantics, and sort order are now stable contracts.

**Pointer to Wave 2:**
- `02-03` calls `resolveRelated` from EssayLayout's and NoteLayout's "Related" footer block.
- `02-04` calls `getAllTags` from `getStaticPaths` (paths derived from the deduped tag set) and `getEntriesByTag` from the page body (entries listed by published-date desc).

## Self-Check: PASSED

- src/lib/relations.ts — present (verified by `test -f`)
- src/lib/tags.ts — present (verified by `test -f`)
- Commit c979337 — present in `git log`
- Commit b8f46fb — present in `git log`

---
*Phase: 02-writing-surface*
*Plan: 02*
*Completed: 2026-04-29*
