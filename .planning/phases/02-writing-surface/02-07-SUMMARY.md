---
phase: 02-writing-surface
plan: 07
subsystem: writing-surface/seed-content
status: paused-at-checkpoint
checkpoint_type: human-verify
tags:
  - seed-content
  - essays
  - voice-contract
dependency_graph:
  requires:
    - 02-01 (essay collection schema in src/content.config.ts)
    - 02-04 (EssayLayout + /essays/[slug].astro routes)
  provides:
    - "Two seed essays drafted and awaiting Wesley approval"
  affects:
    - "src/content/essays/ (post-approval — Task 3)"
tech-stack:
  added: []
  patterns:
    - "Vault-first draft → Obsidian review → publish on approval (D-29)"
    - "draft: true frontmatter gate (D-28)"
key-files:
  created:
    - .planning/phases/02-writing-surface/02-DRAFTS-thesis.md
    - .planning/phases/02-writing-surface/02-DRAFTS-sovereignty-as-a-service.md
  modified: []
  vault-only:
    - ~/.hermes/vault/projects/wesleyschlemmer/essays/thesis-draft.md
    - ~/.hermes/vault/projects/wesleyschlemmer/essays/sovereignty-as-a-service-draft.md
decisions: []
metrics:
  tasks_completed: 1
  tasks_total: 3
  thesis_word_count: 909
  sovereignty_word_count: 946
  duration_so_far: ~10min
  paused_at: 2026-04-29
---

# Phase 02 Plan 07: Essay seed content — Status: PAUSED AT CHECKPOINT

Two seed essays drafted to vault + .planning/, awaiting Wesley's approval at the human-verify checkpoint before publish to `src/content/essays/`.

## What was completed (Task 1)

**Essay 1 — Freedom Tech Thesis (slug: thesis)**
- Source: `~/.hermes/vault/projects/petros/petros-polaris.md` Page 1 only (Page 2 AYLIP/product framing was NOT read — reserved for the future CTB brand site per D-22).
- Frame: "What does it look like to opt out — without going off-grid?" (echoes D-01 hero).
- Body: three sections — Money (Bitcoin), Data (privacy + open-source tools), Infrastructure (self-hosted compute + nodes) — each ~150-200 words.
- Closing: personal pull-through to why Wesley is building Polaris/CTB.
- Word count: **909** (in-range 700-1200).
- Tags: `freedom-tech`, `bitcoin`, `privacy`, `sovereignty`.
- Banned-word grep returned **0 matches** (Beast System / Mystery Babylon / Great Bifurcation / fourth-turning / revolutionary / leverage / synergy / cutting-edge / AI-powered).
- `featured: true`, `draft: true`, `published: 2026-04-28` in frontmatter.

**Essay 2 — Sovereignty as a Service (slug: sovereignty-as-a-service)**
- Source: `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md` (full file).
- Frame: fourth-turning passage; "the world you grew up in no longer exists / the rules have changed"; sovereignty as a property of how your life is structured, not a product.
- Voice: Wesley-the-person reflecting; "consulting" used sparingly in body prose, never in a CTA frame.
- Word count: **946** (in-range 700-1200).
- Tags: `freedom-tech`, `sovereignty`, `consulting`, `bitcoin`.
- Service-description grep returned **0 matches** ("I offer" / "engagements start at" / "book a call").
- Marketing-ese grep returned **0 matches** (revolutionary / leverage / synergy / cutting-edge / AI-powered).
- `featured: true`, `draft: true`, `published: 2026-04-28` in frontmatter.

**Files created (committed):**
- `.planning/phases/02-writing-surface/02-DRAFTS-thesis.md` (in-repo draft for downstream Claude sessions, kept after publish per D-29).
- `.planning/phases/02-writing-surface/02-DRAFTS-sovereignty-as-a-service.md` (same).

**Files created (NOT committed — outside repo root):**
- `~/.hermes/vault/projects/wesleyschlemmer/essays/thesis-draft.md` (Obsidian review copy).
- `~/.hermes/vault/projects/wesleyschlemmer/essays/sovereignty-as-a-service-draft.md` (same).

**Vault directory created:** `~/.hermes/vault/projects/wesleyschlemmer/essays/` (did not previously exist).

## What is paused (Task 2 — human-verify checkpoint)

The plan is `autonomous: false`. Task 3 (publish to `src/content/essays/` with `draft: false`) MUST NOT execute until Wesley has reviewed both drafts in Obsidian and signaled approval (or requested specific edits).

## What is pending (Task 3 — runs only after approval)

A continuation agent will:
1. Read the current `02-DRAFTS-<slug>.md` files (Wesley may have edited the vault copies — the continuation agent should also read the vault copies and reconcile if they differ from the .planning/ copies, treating Wesley's vault edits as authoritative).
2. Copy approved content to `src/content/essays/thesis.md` and `src/content/essays/sovereignty-as-a-service.md`.
3. Set `draft: false` in both files' frontmatter (the publish chokepoint per D-28).
4. Run `npm run build` and verify both routes (`dist/essays/thesis/index.html`, `dist/essays/sovereignty-as-a-service/index.html`) build with `h-entry` microformat present.
5. Re-run banned-word grep on the final files (final voice-contract gate per T-02-07-03).
6. Re-run `grep -r "fonts.googleapis.com" dist/` to confirm PRIV-01 invariant holds.
7. Update this SUMMARY.md to reflect the published state and commit.

## Deviations from Plan

None. Task 1 executed exactly as written.

## Voice contract — confirmation

| Check | File | Result |
|---|---|---|
| Banned doctrine words (Beast System, Mystery Babylon, Great Bifurcation, fourth-turning) | thesis | 0 matches |
| Marketing-ese (revolutionary, leverage, synergy, cutting-edge, AI-powered) | thesis | 0 matches |
| Service-description (I offer, engagements start at, book a call) | sovereignty-as-a-service | 0 matches |
| Marketing-ese (same set) | sovereignty-as-a-service | 0 matches |

The "fourth-turning" frame appears in essay 2 only (acceptable per D-22; banned in essay 1 only) — verified by re-running the essay-1-only grep.

## Threat-model status

| Threat | Disposition | Status |
|---|---|---|
| T-02-07-01 (private-vault content in repo) | mitigate | Holds. Drafts are adapted essays in Wesley's public voice, not raw transcript paste. Vault scratch files at `~/.hermes/vault/...` are outside the repo root and not committed. |
| T-02-07-02 (autonomous publish) | mitigate | Holds. Plan is `autonomous: false`, Task 3 paused behind the checkpoint, `draft: true` in current state. |
| T-02-07-03 (voice-contract violation) | mitigate | Pre-checkpoint grep gates passed (0 matches on all four bans). Final check at Task 3 against `src/content/essays/*.md` still pending. |
| T-02-07-04 (AYLIP/Page 2 leak in thesis) | mitigate | Holds. Only Page 1 of `petros-polaris.md` was read for the thesis essay. AYLIP, Petros productization, and Page 2 product framing do not appear in the draft. |

## Pointer to next plan

`02-09` (RSS validation) will verify both essays appear in the generated RSS feeds after Task 3 publishes them.

---

**STATUS: Awaiting Wesley's review at the checkpoint.** Continuation agent will resume from Task 3 once approval (or revision request) is received. This SUMMARY.md will be re-written to reflect the published state on continuation.

## Self-Check: PASSED

- `.planning/phases/02-writing-surface/02-DRAFTS-thesis.md` — FOUND
- `.planning/phases/02-writing-surface/02-DRAFTS-sovereignty-as-a-service.md` — FOUND
- `~/.hermes/vault/projects/wesleyschlemmer/essays/thesis-draft.md` — FOUND
- `~/.hermes/vault/projects/wesleyschlemmer/essays/sovereignty-as-a-service-draft.md` — FOUND
- Commit `eb61cf4` (Task 1 drafts) — FOUND in `git log`
