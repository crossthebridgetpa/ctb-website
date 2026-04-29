---
phase: 02-writing-surface
plan: 08
subsystem: content
tags: [notes, seed-content, content-collections, indieweb, freedom-tech]

requires:
  - phase: 02-writing-surface
    provides: notes content collection schema (CD-06 + 02-01); /notes routes + NoteLayout (02-04)
provides:
  - 5 seed-note drafts authored from vault source pool (vault + .planning/ copies)
  - Awaiting human checkpoint approval before publish to src/content/notes/
affects: [02-09, post-launch-writing-cadence]

tech-stack:
  added: []
  patterns:
    - "Note authoring loop: vault draft -> .planning draft -> human checkpoint -> src/content publish"
    - "draft: true gate (D-28) — drafts excluded from build until approval flips to draft: false"

key-files:
  created:
    - .planning/phases/02-writing-surface/02-DRAFTS-why-astro-over-next.md
    - .planning/phases/02-writing-surface/02-DRAFTS-why-self-host-umami.md
    - .planning/phases/02-writing-surface/02-DRAFTS-open-source-models-catching-up.md
    - .planning/phases/02-writing-surface/02-DRAFTS-glp1-sovereignty.md
    - .planning/phases/02-writing-surface/02-DRAFTS-why-no-comments.md
    - "~/.hermes/vault/projects/wesleyschlemmer/notes/why-astro-over-next-draft.md (vault, not committed)"
    - "~/.hermes/vault/projects/wesleyschlemmer/notes/why-self-host-umami-draft.md (vault, not committed)"
    - "~/.hermes/vault/projects/wesleyschlemmer/notes/open-source-models-catching-up-draft.md (vault, not committed)"
    - "~/.hermes/vault/projects/wesleyschlemmer/notes/glp1-sovereignty-draft.md (vault, not committed)"
    - "~/.hermes/vault/projects/wesleyschlemmer/notes/why-no-comments-draft.md (vault, not committed)"
  modified: []

key-decisions:
  - "Note 3 reframed as Wesley's commentary on the open-source agent trend (Hermes Agent 100k stars, model-agnostic philosophy, Tool Gateway), NOT a paste of the teknium scrape per T-02-08-01 mitigation"
  - "Note 4 (GLP-1) limited to Wesley's personal-takeaway frame with explicit 'not medical advice' disclaimer per T-02-08-02 mitigation"
  - "Note 5 (no comments) frames the IndieWeb / Webmention path back as the future answer if the design call is wrong"
  - "All drafts ship with draft: true; publish gate enforced at the human checkpoint (T-02-08-04 mitigation)"

patterns-established:
  - "Voice contract carry-forward (D-08, D-22): peer/personal, no marketing-ese, no doctrine words; verified via grep against banned word list"
  - "Status taxonomy applied (CD-02): 3 budding (defensible positions) + 2 seedling (developing views)"

requirements-completed: []  # WRITE-03 + WRITE-07 only complete after Task 3 publishes approved notes
duration: pending
completed: pending
---

# Phase 2 Plan 08: Seed Notes — Summary (PARTIAL — checkpoint pending)

**Five seed-note drafts authored across the vault + .planning/ surface and awaiting Wesley's Obsidian review at the human checkpoint before publish.**

## Status

This plan is `autonomous: false`. Task 1 (drafting) is complete and committed. Task 2 is a `checkpoint:human-verify` gate. Task 3 (publish to `src/content/notes/` with `draft: false`) runs only after Wesley's approval and will be executed by a continuation agent.

This SUMMARY will be re-written by the continuation agent after Task 3 to reflect final published-note counts, slugs, status assignments, and any cuts/additions Wesley directs at the checkpoint.

## Performance (Task 1 only — partial)

- **Started:** 2026-04-28
- **Tasks completed:** 1 of 3 (Task 1 done; Task 2 checkpoint pending; Task 3 awaits approval)
- **Files committed:** 5 draft files in `.planning/phases/02-writing-surface/`
- **Vault files written (uncommitted):** 5 in `~/.hermes/vault/projects/wesleyschlemmer/notes/`

## Accomplishments (Task 1)

- 5 seed-note drafts authored from the vault source pool defined in 02-CONTEXT D-26:
  - `why-astro-over-next` — framework values choice (budding, ~373 body words; CLAUDE.md Bake-Off + STACK.md sourced)
  - `why-self-host-umami` — analytics vs surveillance (budding, ~373 body words; 01-CONTEXT D-14 + CLAUDE.md privacy table sourced)
  - `open-source-models-catching-up` — AI-trend commentary (seedling, ~409 body words; teknium scrapes 2026-04-18/19 reframed, NO raw paste)
  - `glp1-sovereignty` — health-sovereignty take (seedling, ~402 body words; glp1-research-brief themes only, with disclaimer)
  - `why-no-comments` — design rationale + IndieWeb path (budding, ~375 body words; first-principles)
- Vault copies written to `~/.hermes/vault/projects/wesleyschlemmer/notes/<slug>-draft.md` for Obsidian review
- All drafts carry `draft: true`; the publish gate is the human checkpoint
- Banned-pattern grep checks PASS: no "Today I learned" diary patterns, no "Beast System / Mystery Babylon / fourth-turning" doctrine words, no "revolutionary / leverage / synergy / cutting-edge" marketing-ese
- Note 4 contains the explicit "personal observation, not medical advice" disclaimer

## Task Commits

1. **Task 1: Draft 5 seed notes** — `894e9c1` (docs)
2. **Task 2: Human checkpoint** — pending Wesley's approval
3. **Task 3: Publish approved notes** — pending continuation

_The continuation agent will append the Task 3 commit hash and the final metadata commit hash here._

## Files Created (Task 1)

- `.planning/phases/02-writing-surface/02-DRAFTS-why-astro-over-next.md` — note 1 draft
- `.planning/phases/02-writing-surface/02-DRAFTS-why-self-host-umami.md` — note 2 draft
- `.planning/phases/02-writing-surface/02-DRAFTS-open-source-models-catching-up.md` — note 3 draft
- `.planning/phases/02-writing-surface/02-DRAFTS-glp1-sovereignty.md` — note 4 draft
- `.planning/phases/02-writing-surface/02-DRAFTS-why-no-comments.md` — note 5 draft

Vault copies (uncommitted, in Wesley's Obsidian-synced vault):
- `~/.hermes/vault/projects/wesleyschlemmer/notes/why-astro-over-next-draft.md`
- `~/.hermes/vault/projects/wesleyschlemmer/notes/why-self-host-umami-draft.md`
- `~/.hermes/vault/projects/wesleyschlemmer/notes/open-source-models-catching-up-draft.md`
- `~/.hermes/vault/projects/wesleyschlemmer/notes/glp1-sovereignty-draft.md`
- `~/.hermes/vault/projects/wesleyschlemmer/notes/why-no-comments-draft.md`

## Decisions Made

- **Note 3 framing.** Read both teknium scrapes (2026-04-18, 2026-04-19) for themes. Reframed as Wesley's "what I'm tracking" reflection on the *trajectory* (100k stars, model-agnostic philosophy, Tool Gateway, Hermes-Ollama, AWS Bedrock support) — not a recap of any single tweet or controversy. Explicitly avoided naming the EvoMap controversy as the centerpiece (signal, not gossip).
- **Note 4 framing.** Did NOT paste the GLP-1 brief contents. Wrote a one-screen takeaway: "skepticism that isn't well-earned conflates sovereignty with refusing the most effective tool." Added the disclaimer per T-02-08-02 mitigation. Did not include any private health data; brief was read for themes only.
- **Note 5 framing.** First-principles design rationale; no external source. Made the IndieWeb / Webmention path explicit so the position is reversible.
- **Status taxonomy.** Three notes marked `budding` (the technical/design decisions that are defensible and tested by being live), two marked `seedling` (the AI-trend commentary and health takeaway, where Wesley's view is still developing).

## Deviations from Plan (Task 1)

None — Task 1 executed exactly as written. All acceptance criteria for Task 1 met; all banned-pattern checks PASS; vault and `.planning/` copies present at the specified paths.

## Threat Surface Scan

The plan's `<threat_model>` covers the relevant boundaries (vault → public, draft → publish gate, scrape paste, health data, claude-sessions exclusion, daily-log exclusion). Task 1 honors all five mitigations:

- T-02-08-01 (raw scrape paste): mitigated — note 3 is reframed commentary, no quoted scrape content
- T-02-08-02 (private health data): mitigated — note 4 is one-screen takeaway with disclaimer
- T-02-08-03 (claude-sessions content): not triggered — no claude-sessions/ paths read or referenced
- T-02-08-04 (notes published without review): NOT YET CLOSED — closes only after Task 3 publish post-approval
- T-02-08-05 (daily-log content): mitigated — banned-pattern grep PASS

No new threat surface introduced. No `threat_flag` entries needed.

## Self-Check (Task 1)

- File `.planning/phases/02-writing-surface/02-DRAFTS-why-astro-over-next.md` — FOUND
- File `.planning/phases/02-writing-surface/02-DRAFTS-why-self-host-umami.md` — FOUND
- File `.planning/phases/02-writing-surface/02-DRAFTS-open-source-models-catching-up.md` — FOUND
- File `.planning/phases/02-writing-surface/02-DRAFTS-glp1-sovereignty.md` — FOUND
- File `.planning/phases/02-writing-surface/02-DRAFTS-why-no-comments.md` — FOUND
- File `~/.hermes/vault/projects/wesleyschlemmer/notes/why-astro-over-next-draft.md` — FOUND
- File `~/.hermes/vault/projects/wesleyschlemmer/notes/why-self-host-umami-draft.md` — FOUND
- File `~/.hermes/vault/projects/wesleyschlemmer/notes/open-source-models-catching-up-draft.md` — FOUND
- File `~/.hermes/vault/projects/wesleyschlemmer/notes/glp1-sovereignty-draft.md` — FOUND
- File `~/.hermes/vault/projects/wesleyschlemmer/notes/why-no-comments-draft.md` — FOUND
- Commit `894e9c1` — FOUND

## Self-Check: PASSED (Task 1)

## Checkpoint Awaiting

The plan is paused at Task 2 (`checkpoint:human-verify`). Wesley reviews the 5 drafts in Obsidian (or in `.planning/` for non-Obsidian readers) and signals one of:

- "approved" — publish all 5 as-is
- A specific list of edits (Wesley may edit the `.planning/` files directly; the continuation agent reads the current versions on resume)
- Cuts (e.g., "skip why-no-comments")
- Additions (any 6th–8th note Wesley wants added)

On resume, a continuation agent will execute Task 3: copy approved drafts into `src/content/notes/<slug>.md` with `draft: false`, run `npm run build`, verify `dist/notes/<slug>/index.html` routes exist, and confirm `h-entry` microformats and zero `fonts.googleapis.com` references in `dist/`. The continuation agent will then re-write this SUMMARY with final outcomes and the Task 3 commit hash.

## Next Plan Readiness

- 02-09 (validation pass + non-sparse-index check) cannot run usefully until Task 3 publishes notes — orchestrator should hold 02-09 until this plan reaches PLAN COMPLETE state on continuation.

---
*Phase: 02-writing-surface*
*Plan: 08*
*Status: CHECKPOINT — Task 1 done, Task 2 awaiting human verify, Task 3 deferred to continuation*
