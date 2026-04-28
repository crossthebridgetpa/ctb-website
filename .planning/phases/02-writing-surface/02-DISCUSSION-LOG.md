# Phase 2: Writing Surface - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-28
**Phase:** 02-writing-surface
**Areas discussed:** Seed content strategy, Authoring pipeline (vault → site)

**Areas the user did NOT select for discussion (locked as Claude's discretion):**
- Library-mode IA & homepage "Recent writing" module shape
- Notes schema & status taxonomy (seedling / budding / evergreen)

---

## Area Selection (multi-select)

| Option | Description | Selected |
|--------|-------------|----------|
| Seed content strategy | Vault has 0 publishable essays; WRITE-02 wants 2-3 at launch. Three live paths: write fresh, adapt vault material, or notes-only fallback. | ✓ |
| Library-mode IA & homepage module | How aggressively to hide chronological signals; drives "Recent writing" wire-in shape. | |
| Authoring pipeline (vault → site) | In-repo vs symlink vs copy-on-build. Drives draft flow and friction of shipping. | ✓ |
| Notes schema & status taxonomy | RESEARCH proposes seedling/budding/evergreen. Adopt, simplify, or drop. | |

**User's choice:** Seed content strategy + Authoring pipeline.
**Notes:** Other two areas locked as Claude-discretion defaults — featured/curated homepage module per pitfall #1, and seedling/budding/evergreen status taxonomy per RESEARCH ARCHITECTURE.md.

---

## Seed content strategy

### Q1 — Which path for seed essays?

| Option | Description | Selected |
|--------|-------------|----------|
| Adapt existing vault material | Distill 2-3 essays from Polaris, About Me, redesign notes, etc. Lowest friction. | ✓ |
| Write 2-3 fresh essays during Phase 2 | Carve out writing time inside Phase 2. Adds dependency. | |
| Notes-only launch (defer essays to v1.x) | Honor Phase 1 inventory gate. Re-words WRITE-02. | |
| Hybrid: 1 adapted essay + Notes | 1 thesis essay + Notes surface. | |

**User's choice:** Adapt existing vault material.

### Q2 — Who drafts the adapted essays?

| Option | Description | Selected |
|--------|-------------|----------|
| Claude drafts → Wesley reviews/edits | Same pattern as 01-08 About page. | ✓ |
| Wesley drafts; Claude assembles structure | Wesley writes prose; Claude scaffolds files. | |
| Mixed per-essay | Decide per-essay. | |

**User's choice:** Claude drafts → Wesley reviews/edits.

### Q3 — Which source material is OK to adapt? (multi-select)

| Option | Description | Selected |
|--------|-------------|----------|
| Polaris doctrine → Money/Data/Infrastructure | Distill petros-polaris.md into 1-2 worldview essays (toned-down). | ✓ |
| Redesign notes → "Sovereignty as a Service" | Adapt website-redesign-notes-2026-04-26.md framing. | ✓ |
| Health research briefs | vault/health/ → 1 essay if surfacing health/sovereignty thread. | ✓ |
| About Me / personal-stack pieces | Sections of About Me.md → meta-essay on working style. | ✓ |

**User's choice:** All four selected as approved sources (final pool; planner narrows per essay-count decision below).

### Q4 — How many seed essays at launch, and what topical mix?

| Option | Description | Selected |
|--------|-------------|----------|
| 3 essays — thesis + sovereignty + working-style | Spans worldview → application → person. | |
| 2 essays — thesis + sovereignty | Tighter launch surface. | ✓ |
| 3 essays — thesis + sovereignty + health | Surfaces health as a writing thread without a project tile to anchor it. | |
| 4 essays — all four threads | Maximal but most drafting work. | |

**User's choice:** 2 essays — thesis + sovereignty.

### Q5 — Essay length / quality bar?

| Option | Description | Selected |
|--------|-------------|----------|
| Long-form (1200-2000 words) | Substantial pieces; matches IndieWeb peer expectations. | |
| Mid-length (700-1200 words) | Substantive but less imposing. Faster to draft. | ✓ |
| Short essay-form (500-800 words) | Tight, single-claim pieces. | |
| Mixed by piece | Thesis long, others mid. | |

**User's choice:** Mid-length (700-1200 words).

### Q6 — CTB brand-site overlap (sovereignty essay)?

| Option | Description | Selected |
|--------|-------------|----------|
| Publish here; CTB brand site re-frames in CTB voice | Two pieces, two purposes — not duplicate content. | ✓ |
| Reserve sovereignty topic for the future CTB site | Swap in a different second essay. | |
| Publish here; don't reuse later | Lock the essay to wesleyschlemmer.com. | |

**User's choice:** Publish here; CTB brand site speaks in CTB voice anyway.

### Q7 — Notes surface at launch?

| Option | Description | Selected |
|--------|-------------|----------|
| 5-8 notes adapted from existing material | Real first impression for /notes index. | ✓ |
| Sparse — 1-2 notes, route exists | Honors WRITE-03's "may launch sparse." | |
| Empty — route exists, no notes yet | Honest but reads as abandoned. | |

**User's choice:** 5-8 notes adapted from existing material.

---

## Authoring pipeline (vault → site)

### Q1 — How do essays and notes flow from vault to site repo?

| Option | Description | Selected |
|--------|-------------|----------|
| In-repo is canonical — write in vault, commit to src/content/ | src/content/ is source of truth; vault is scratch. | ✓ |
| Symlink from vault folders | Vault is canonical; repo references. Won't survive Vercel build. | |
| Copy-on-build script | Pre-build npm run sync-content. Overengineered for current volume. | |

**User's choice:** In-repo is canonical.

### Q2 — Drafts — how does work-in-progress not ship?

| Option | Description | Selected |
|--------|-------------|----------|
| draft: true frontmatter — in-repo but excluded from build | Standard Astro pattern. Single source of truth. | ✓ |
| Drafts stay in vault until ready | Simple but loses repo-side visibility for iteration. | |
| Both — vault for early, draft: true for late | Most flexible, slightly more bookkeeping. | |

**User's choice:** draft: true frontmatter.

### Q3 — When Claude drafts, where do drafts land?

| Option | Description | Selected |
|--------|-------------|----------|
| Direct to src/content/ with draft: true | One-step publish on approval. | |
| Draft to vault for Obsidian review, copy on approval | Matches 01-08 precedent. Two-step. | ✓ |
| Both — vault copy + repo with draft: true in parallel | Risk of drift. | |

**User's choice:** Draft to vault for Obsidian review; copy into src/content/ on approval.

### Q4 — Updates to a published essay/note — how to signal?

| Option | Description | Selected |
|--------|-------------|----------|
| updated: date frontmatter; show stamp when present | Library-mode discipline. | ✓ |
| Use git commit date — no frontmatter field | Typo fixes look like content updates. | |
| Show only published date — no update tracking | Risks dead-blog signal. | |
| Hide all dates on essays; updated only on notes | Most aggressive library-mode. | |

**User's choice:** updated: date frontmatter; show stamp conditionally.

---

## Claude's Discretion

The two unselected gray areas were locked as defaults per RESEARCH and pitfall guidance:

- **Library-mode IA + homepage "Recent writing" module** — featured/curated (manual `featured: true` frontmatter), dateless presentation. Heading "Writing" not "Latest from the blog." Per pitfall #1 (dead-blog graveyard prevention).
- **Notes status taxonomy** — adopt `status: 'seedling' | 'budding' | 'evergreen'` per RESEARCH ARCHITECTURE.md §Notes. Default `seedling`.

Additional Claude-discretion areas (not selected for discussion, locked at defaults — see CONTEXT.md CD-01..CD-10 for full list):

- Related-content mechanism: manual `related: [slug]` only (CD-03)
- Topics taxonomy: open tag → page (CD-04)
- RSS feeds: combined + per-collection, full content (CD-05)
- Frontmatter Zod schemas (CD-06)
- Layouts: EssayLayout + NoteLayout composing BaseLayout (CD-07)
- Reading time on essays only (CD-09)
- Per-essay JSON-LD `BlogPosting` (CD-10)

---

## Deferred Ideas

- 3rd seed essay (working-style / About-Me-adapted) — defer to v1.x
- Health / sovereignty essay — defer to v1.x; may surface as a Note instead in this phase
- Auto-tag-overlap and mention-based auto-linking — manual related: only for v1
- Whitelisted topics — open taxonomy in v1
- Reading-time on notes — essays only for v1
- Topic / featured RSS feeds — only essays + notes feeds for v1
- v1.x Discovery Surface (Pagefind, Satori OG, webmentions, Buttondown, /now, /uses, /press) — unchanged
- CTB brand-site re-treatment of the sovereignty essay — separate future project (D-25)

