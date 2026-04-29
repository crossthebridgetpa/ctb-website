---
phase: 02-writing-surface
plan: 03
subsystem: writing-surface/layouts
tags: [layouts, microformats, json-ld, seo, indieweb, h-entry, h-feed, blog-posting, article, base-layout-composition, priv-firewall]
dependency_graph:
  requires:
    - "src/layouts/BaseLayout.astro (Phase 1 PLAN-06): composition target; owns head, Font preload, Umami three-way guard"
    - "src/components/seo/JsonLd.astro (Phase 1 PLAN-03): conditional schema ladder extended here"
    - "src/components/seo/BaseSEO.astro (Phase 1 PLAN-03): receives ogType='article' through BaseLayout"
    - "src/lib/relations.ts (Wave 1 sibling 02-02): resolveRelated() — referenced but not provided here; integration check resolves at wave merge"
    - "src/content.config.ts (Wave 1 sibling 02-01): essays + notes Zod schemas — referenced but not provided here; integration check resolves at wave merge"
    - "schema-dts (^2.0.0): BlogPosting + Article TS types"
  provides:
    - "EssayLayout.astro: reading-optimized layout for essay pages with h-entry, p-name, p-summary, dt-published, dt-updated, e-content, optional reading-time, Related footer"
    - "NoteLayout.astro: terser layout for notes with h-entry, p-category status badge, single-date display (D-30), Related footer"
    - "JsonLd schema variants 'blog-posting' + 'article': consumable by all pages composing BaseLayout"
    - "BaseLayout Props.jsonLdSchema type union extended to six members"
  affects:
    - "Wave 2 02-04 essays/[slug].astro + notes/[slug].astro: dynamic routes will wrap entries in these layouts"
    - "Wave 2 02-04 topics/[tag].astro: indirectly — uses same BaseLayout type union"
    - "PRIV-01 invariant: preserved (no head re-implementation, no Google Fonts CDN reference)"
    - "PRIV-02 invariant: preserved (Umami three-way guard untouched in BaseLayout body)"
    - "SEO-06 invariant: extended — h-entry now joins h-card on About; h-feed will join in Wave 2"
tech_stack:
  added: []
  patterns:
    - "JSDoc-anchored decision-ID references (CD-02, CD-07, CD-09, CD-10, D-30, PRIV-01, PRIV-02, WRITE-06, SEO-06)"
    - "Layout composition via BaseLayout slot (CD-07 firewall — never re-implement head)"
    - "schema-dts typed JSON-LD with `as any` escape-hatch on @id-only refs"
    - "h-entry / p-name / p-summary / dt-published / dt-updated / e-content / p-category microformats (IndieWeb)"
key_files:
  created:
    - path: src/layouts/EssayLayout.astro
      lines: 194
      purpose: Reading-optimized essay layout composing BaseLayout; h-entry; reading-time; Related footer
    - path: src/layouts/NoteLayout.astro
      lines: 162
      purpose: Terser note layout composing BaseLayout; h-entry + p-category; D-30 single-date; Related footer
  modified:
    - path: src/components/seo/JsonLd.astro
      change: Added BlogPosting + Article schema-dts imports; extended Props.schema union; inserted two new conditional arms before the webpage fallback
    - path: src/layouts/BaseLayout.astro
      change: Extended Props.jsonLdSchema type union to six members ('blog-posting' + 'article' added)
decisions:
  - "Author the layouts referencing the sibling Wave 1 dependencies as planned (resolveRelated import; CollectionEntry<'essays'> / CollectionEntry<'notes'>) and accept that astro check fails in this isolated worktree until the wave merge — this is the documented parallel-execution pattern for orthogonal Wave 1 plans"
metrics:
  duration: ~5min
  completed: 2026-04-29
  tasks: 3
  files: 4
  commits:
    - hash: c9f4be7
      message: "feat(02-03): extend JsonLd with blog-posting and article schemas"
    - hash: 2b8de65
      message: "feat(02-03): create EssayLayout with h-entry microformats"
    - hash: 7ff548a
      message: "feat(02-03): create NoteLayout with h-entry and p-category status badge"
---

# Phase 02 Plan 03: Reading Layouts (EssayLayout + NoteLayout) Summary

EssayLayout and NoteLayout authored as BaseLayout-composing wrappers; JsonLd extended with BlogPosting (essays, CD-10) and Article (notes, CD-10) schema variants; BaseLayout Props.jsonLdSchema type union widened to match.

## What Shipped

**Four files (2 new + 2 modified):**

| File | State | Lines | Role |
|------|-------|-------|------|
| `src/layouts/EssayLayout.astro` | NEW | 194 | Essay reading layout; h-entry + reading-time + Related |
| `src/layouts/NoteLayout.astro` | NEW | 162 | Note reading layout; h-entry + p-category status + Related |
| `src/components/seo/JsonLd.astro` | MODIFIED | +30 | Added BlogPosting + Article ladder arms |
| `src/layouts/BaseLayout.astro` | MODIFIED | +1 | Type union extended to six schema members |

## Microformat Checklist (SEO-06)

| Microformat | EssayLayout | NoteLayout | Validation note |
|-------------|-------------|------------|-----------------|
| `h-entry` (root) | yes — `<article class="essay h-entry">` | yes — `<article class="note h-entry">` | indiewebify.me parser hint |
| `p-name` (H1) | yes | yes | Title is the entry name |
| `p-summary` (subtitle) | yes (essay only — conditional on `subtitle`) | n/a | Notes have no subtitle field |
| `dt-published` (time) | yes | yes (renders the resolved displayDate) | ISO datetime via toISOString() |
| `dt-updated` (time) | yes (conditional on `updated`) | n/a | Notes use D-30 single-date logic; updated wins via fallback to published |
| `e-content` (body) | yes — `<div class="essay__body e-content">` | yes — `<div class="note__body e-content">` | Slot wraps markdown render output |
| `p-category` (status) | n/a | yes — `<span class="note__status p-category" data-status={status}>` | CD-02 status taxonomy: seedling / budding / evergreen |

## JSON-LD Shape (CD-10 verified)

**Per-essay BlogPosting** (emitted via `BaseLayout` → `JsonLd schema="blog-posting"`):

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "<title>",
  "datePublished": "<ISO>",
  "dateModified": "<ISO?>",
  "description": "<description>",
  "author": { "@id": "https://wesleyschlemmer.com/about#wesley" },
  "publisher": { "@id": "https://wesleyschlemmer.com/about#wesley" },
  "mainEntityOfPage": { "@id": "<siteUrl>/#website" }
}
```

- `author` and `publisher` reuse the existing `PERSON_ID` constant (graph-stable identity per JsonLd.astro lines 33–37 — Pitfall G exception).
- `mainEntityOfPage` references the WebSite graph node so consumers can resolve the parent site without ambiguity.
- `as any` cast retained on @id-only refs (documented escape hatch, JsonLd.astro line 60).

**Per-note Article** (emitted via `BaseLayout` → `JsonLd schema="article"`):

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "<title>",
  "datePublished": "<ISO>",
  "description": "<description>",
  "author": { "@id": "https://wesleyschlemmer.com/about#wesley" }
}
```

- No `publisher`, no `dateModified`, no `mainEntityOfPage` — lighter weight per CD-10.
- D-30: notes pass `published` (not `displayDate`) into JSON-LD on purpose — schema.org `datePublished` should reflect the original publish time; the human-facing date display uses `updated ?? published` separately.

## BaseLayout Firewall — Intact

Both new layouts compose BaseLayout via slot. Acceptance criteria enforced:

| Check | EssayLayout | NoteLayout |
|-------|-------------|------------|
| `grep -c "<head>"` | 0 | 0 |
| `grep -c "fonts.googleapis.com"` | 0 | 0 |
| `grep -c "set:html"` | 0 | n/a (criteria applies to EssayLayout; NoteLayout also has 0) |
| `grep -q "import BaseLayout from './BaseLayout.astro'"` | yes | yes |

PRIV-01 (no Google Fonts CDN) and PRIV-02 (Umami three-way guard) invariants are preserved — both invariants live exclusively in BaseLayout, which neither new layout touches.

## Date Display Logic (D-30)

| Surface | Essay | Note |
|---------|-------|------|
| Always-show date | `published` | n/a |
| Conditional date | `updated` rendered with equal weight after `published` (PITFALLS.md line 501) | n/a |
| Single date | n/a | `displayDate = updated ?? published` — recency wins |

## Reading Time (CD-09)

- `EssayLayout.astro`: receives `readingMinutes?: number` prop; renders only when defined AND `>= 1`. Computation lives at the page level (Wave 2 essays/[slug].astro will derive from word count or remark plugin).
- `NoteLayout.astro`: zero `readingMinutes` references (`grep -c readingMinutes` → 0). Notes never display reading time.

## Conditional Ladder Order (JsonLd.astro)

The webpage fallback (`else { /* schema === 'webpage' */ }`) remains the LAST arm — confirmed: `blog-posting` arm at line 77, `article` arm at line 92, `webpage` fallback at line 105. Order matters because the chain falls through; placing the new arms before the catch-all preserves the existing semantics for `breadcrumb`, `person`, `website`, and the default `webpage`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 — Bug] JSDoc references to `<head>` and `fonts.googleapis.com` violated firewall greps**

- **Found during:** Task 2 verification (initial wc/grep)
- **Issue:** Acceptance criteria use `grep -c "<head>"` returns 0 and `grep -c "fonts.googleapis.com"` returns 0. The verbatim plan-prescribed JSDoc body in EssayLayout.astro contained the literal strings `<head>` and `fonts.googleapis.com` while *describing* the firewall — but grep does not understand that comments are non-functional, so the literal-string check failed.
- **Fix:** Reworded JSDoc to "the document head" / "Font preload" / "no-Google-Fonts-CDN guarantee" — same meaning, no literal strings that would parse as head re-implementation.
- **Files modified:** `src/layouts/EssayLayout.astro` (and pre-empted in NoteLayout.astro from the start)
- **Commit:** `2b8de65` (rolled into Task 2 commit)

**2. [Rule 1 — Bug] JSDoc reference to `BlogPosting` in NoteLayout violated CD-10 grep**

- **Found during:** Task 3 verification
- **Issue:** Acceptance criteria use `grep -c "BlogPosting" src/layouts/NoteLayout.astro` returns 0 (CD-10 — notes use Article). My JSDoc said "lighter than BlogPosting" — accurate description but failed the literal-string check.
- **Fix:** Reworded to "lighter than the essay variant".
- **Files modified:** `src/layouts/NoteLayout.astro`
- **Commit:** `7ff548a` (rolled into Task 3 commit)

### Sibling-Wave Dependencies (Expected — Not Auto-Fixed)

`astro check` returns 10 errors in this isolated worktree, all of which trace to two dependencies that are authored in sibling Wave 1 worktrees:

| Error | Sibling worktree that resolves it |
|-------|------------------------------------|
| `Cannot find module '../lib/relations'` (EssayLayout + NoteLayout) | 02-02 (creates `src/lib/relations.ts` with `resolveRelated`) |
| `Type '"essays"' does not satisfy the constraint 'never'` | 02-01 (defines `essays` collection in `src/content.config.ts`) |
| `Type '"notes"' does not satisfy the constraint 'never'` | 02-01 (defines `notes` collection in `src/content.config.ts`) |
| `Property 'data' / 'id' does not exist on type 'never'` (cascade from above) | 02-01 (collection schemas declare frontmatter shape) |

This is the documented parallel-execution pattern: each Wave 1 worktree authors its piece of the integration; the orchestrator runs the integrated `astro check` after merging all Wave 1 worktrees back to main. The plan's `depends_on: [02-01, 02-02]` field declares this contract.

No stub files were created in 02-01 or 02-02's territory because that would conflict at merge. The single self-validating check that *does* pass in isolation is Task 1 (JsonLd + BaseLayout — no missing-file imports), which validated cleanly with `0 errors / 0 warnings`.

## Handoff to Wave 2

**02-04** (essays/[slug].astro + notes/[slug].astro + topics/[tag].astro) wraps these layouts in dynamic routes via `getStaticPaths`. The integration shape:

```astro
// src/pages/essays/[slug].astro
import EssayLayout from '../../layouts/EssayLayout.astro';
import { getCollection, render } from 'astro:content';

export const getStaticPaths = (async () => {
  const essays = await getCollection('essays', ({ data }) => !data.draft);  // D-28
  return essays.map((entry) => ({
    params: { slug: entry.id.replace(/\.md$/, '') },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

const { entry } = Astro.props;
const { Content, remarkPluginFrontmatter } = await render(entry);
const readingMinutes = remarkPluginFrontmatter?.readingMinutes;
---
<EssayLayout entry={entry} readingMinutes={readingMinutes}>
  <Content />
</EssayLayout>
```

NoteLayout takes the same shape minus `readingMinutes` (CD-09 essays-only).

## Verification Summary

| Check | Result |
|-------|--------|
| Task 1 commit `c9f4be7` exists | yes |
| Task 2 commit `2b8de65` exists | yes |
| Task 3 commit `7ff548a` exists | yes |
| `EssayLayout.astro` exists (>=60 lines) | yes (194 lines) |
| `NoteLayout.astro` exists (>=50 lines) | yes (162 lines) |
| `astro check` for Task 1 alone | 0 errors / 0 warnings / 0 hints |
| `astro check` integrated (Tasks 2+3) | 10 errors — all resolved by sibling Wave 1 merges (02-01, 02-02) |
| BaseLayout firewall intact (no head re-impl) | yes |
| JsonLd webpage fallback last | yes (line 105 — after blog-posting at 77 and article at 92) |
| BlogPosting schema in JsonLd.astro | yes |
| Article schema in JsonLd.astro | yes |
| BaseLayout Props.jsonLdSchema includes blog-posting + article | yes |
| h-entry, p-name, e-content in EssayLayout | yes |
| h-entry, p-name, e-content, p-category in NoteLayout | yes |
| dt-published in both layouts | yes |
| dt-updated in EssayLayout | yes |
| readingMinutes references in NoteLayout | 0 (CD-09 essays-only) |
| BlogPosting references in NoteLayout | 0 (CD-10) |
| `<head>` references in either new layout | 0 (PRIV firewall) |
| `fonts.googleapis.com` references in either new layout | 0 (PRIV-01) |
| `set:html` references in either new layout | 0 |

## Self-Check: PASSED

- All three commits present in `git log`: `c9f4be7`, `2b8de65`, `7ff548a`
- All four files at expected paths and contents (2 created, 2 modified)
- All grep-based acceptance criteria pass
- All firewall checks pass
- `astro check` failures are scoped exclusively to sibling-wave dependencies (`'../lib/relations'` from 02-02; `'essays'`/`'notes'` collections from 02-01) — wave-merge integration check resolves them
