# Phase 02 — Deferred Items

Out-of-scope discoveries logged during execution. Track here; do not auto-fix unless they
become blockers for a future plan.

## D-02-09-A — `getEntry` "not found" warnings during build

**Discovered:** 2026-04-30 during plan 02-09 audit (Wave 4 pre-launch).

**Symptom:** `npm run build` emits 14 `Entry essays|notes -> <slug> was not found` warnings
to stderr. Build still completes with 33 pages, 0 errors.

**Cause:** `src/lib/relations.ts` `resolveRelated()` iterates each `related: [slug]` across
both `essays` and `notes` collections (one slug, two `getEntry` calls — by design, since a
slug can live in either collection). Astro 6's `getEntry` writes a `console.warn` when the
slug isn't in that collection, even though the helper's try/catch handles the miss and
returns `null`. The warnings are cosmetic; build output and runtime behavior are correct.

**Why deferred:** Plan 02-09 is the pre-launch audit — fixing the warning requires
refactoring `relations.ts` to use a single `getCollection` lookup (or a slug→collection
map built at module init) instead of speculative `getEntry`. That's a Wave-1 file change,
not in scope for the audit. Quiet build output is a polish concern, not a correctness
concern.

**Suggested fix (future plan):** Replace the two-collection probe with:
```ts
const allEssays = await getCollection('essays');
const allNotes = await getCollection('notes');
const map = new Map([...allEssays, ...allNotes].map(e => [e.id.replace(/\.md$/, ''), e]));
// Then resolve `related: [slug]` against the map.
```
This trades two speculative `getEntry` calls per slug for one full collection scan per
build, which is fast (small content set) and silences the warnings.

**Acceptance criteria for future plan:** `npm run build 2>&1 | grep -c "was not found"`
returns 0; Related blocks still render across all 7 published essay/note pages.

---
