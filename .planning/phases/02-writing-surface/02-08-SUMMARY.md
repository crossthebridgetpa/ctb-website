---
phase: 02-writing-surface
plan: 08
subsystem: content
tags: [notes, seed-content, content-collections, indieweb, freedom-tech]

requires:
  - phase: 02-writing-surface
    provides: notes content collection schema (CD-06 + 02-01); /notes routes + NoteLayout (02-04)
provides:
  - 5 seed notes published to src/content/notes/ with draft: false
  - /notes index now non-sparse (5 items, h-feed + 5 h-entry microformat instances)
  - WRITE-03 + WRITE-07 satisfied (notes surface seeded; content live on build)
affects: [02-09, post-launch-writing-cadence]

tech-stack:
  added: []
  patterns:
    - "Note authoring loop: vault draft -> .planning draft -> human checkpoint -> src/content publish"
    - "draft: true gate (D-28) — drafts excluded from build until approval flips to draft: false"
    - "Vault-as-authoritative-source: Wesley edits in Obsidian; continuation agent reads vault on resume"

key-files:
  created:
    - .planning/phases/02-writing-surface/02-DRAFTS-why-astro-over-next.md
    - .planning/phases/02-writing-surface/02-DRAFTS-why-self-host-umami.md
    - .planning/phases/02-writing-surface/02-DRAFTS-open-source-models-catching-up.md
    - .planning/phases/02-writing-surface/02-DRAFTS-glp1-sovereignty.md
    - .planning/phases/02-writing-surface/02-DRAFTS-why-no-comments.md
    - src/content/notes/why-astro-over-next.md
    - src/content/notes/why-self-host-umami.md
    - src/content/notes/open-source-models-catching-up.md
    - src/content/notes/glp1-sovereignty.md
    - src/content/notes/why-no-comments.md
    - "~/.hermes/vault/projects/wesleyschlemmer/notes/why-astro-over-next-draft.md (vault, not committed)"
    - "~/.hermes/vault/projects/wesleyschlemmer/notes/why-self-host-umami-draft.md (vault, not committed)"
    - "~/.hermes/vault/projects/wesleyschlemmer/notes/open-source-models-catching-up-edited.md (vault, not committed; Wesley renamed -draft -> -edited)"
    - "~/.hermes/vault/projects/wesleyschlemmer/notes/glp1-sovereignty-draft.md (vault, not committed)"
    - "~/.hermes/vault/projects/wesleyschlemmer/notes/why-no-comments-draft.md (vault, not committed)"
  modified: []

key-decisions:
  - "Vault is authoritative for note 3 — Wesley renamed the file from -draft.md to -edited.md and made substantive content edits; published version reflects his edits exactly (verbatim, including a single typo 'kno' in the original)"
  - "Notes 1, 2, 4, 5 published verbatim from .planning/ drafts (vault diff: identical to .planning/ for these 4); only frontmatter draft flag flipped from true to false"
  - "Note 3 reframed as Wesley's commentary on the open-source agent trend (Hermes Agent 100k stars, model-agnostic philosophy, Tool Gateway), NOT a paste of the teknium scrape per T-02-08-01 mitigation; Wesley's edits sharpened the framing further (dropped controversy paragraph, tightened title, simplified description)"
  - "Note 4 (GLP-1) published with explicit 'not medical advice' disclaimer per T-02-08-02 mitigation"
  - "Note 5 (no comments) frames the IndieWeb / Webmention path back as the future answer if the design call is wrong"
  - "Publish gate (T-02-08-04) closed — Wesley's checkpoint approval is the verb that flipped draft: true -> draft: false in src/content/notes/"
  - "Verbatim preservation policy applied: typo 'I don't kno' in Wesley's edited note 3 retained as-authored; flagged in this SUMMARY for his awareness without silently rewriting his prose"

patterns-established:
  - "Voice contract carry-forward (D-08, D-22): peer/personal, no marketing-ese, no doctrine words; verified via grep against banned word list (PASS)"
  - "Status taxonomy applied (CD-02): 3 budding (defensible positions) + 2 seedling (developing views)"
  - "Continuation-agent pattern: original session pauses at human-verify checkpoint with structured state in partial SUMMARY; continuation agent reads vault as authoritative, diffs against .planning/ to detect Wesley's edits, publishes with draft: false"

requirements-completed: [WRITE-03, WRITE-07]
duration: ~25 min (Task 3 + verifications + SUMMARY)
completed: 2026-04-30
---

# Phase 2 Plan 08: Seed Notes — Summary

**Five seed notes published to `src/content/notes/` with `draft: false` after Wesley's checkpoint approval. The `/notes` route is non-sparse for launch (h-feed wraps 5 h-entry items); WRITE-03 + WRITE-07 satisfied; PRIV-01 carry-forward holds (zero runtime fonts.googleapis.com loads — only mention is descriptive copy on the colophon page boasting the absence).**

## Status

Plan complete. Task 1 (drafting), Task 2 (human checkpoint approved by Wesley with edits to note 3), and Task 3 (publish to `src/content/notes/`) all closed. Plan was `autonomous: false` and required human verification at the publish gate; the gate has been closed.

## Performance

- **Started:** 2026-04-28 (Task 1)
- **Resumed:** 2026-04-30 (Task 3 by continuation agent)
- **Tasks completed:** 3 of 3 (Task 1: 5 drafts; Task 2: Wesley's approval + edit to note 3; Task 3: publish)
- **Files committed (final):** 5 .planning/ drafts + 5 src/content/notes/ live notes = 10 files
- **Vault files (uncommitted, in Wesley's Obsidian-synced vault):** 5 (1 explicitly renamed `-draft` -> `-edited` to mark his revision)
- **Build:** `npm run build` exits 0; 29 pages built in 3.58s

## Accomplishments

- 5 seed notes live in `src/content/notes/` with `draft: false`:
  - `why-astro-over-next` — framework values choice (budding, 424 words incl. frontmatter)
  - `why-self-host-umami` — analytics vs surveillance (budding, 421 words)
  - `open-source-models-catching-up` — AI-trend commentary (seedling, 372 words; **Wesley-edited**)
  - `glp1-sovereignty` — health-sovereignty take w/ disclaimer (seedling, 452 words)
  - `why-no-comments` — design rationale + IndieWeb path (budding, 437 words)
- All 5 routes render at `dist/notes/<slug>/index.html` after `npm run build`
- `/notes` index renders with `h-feed` wrapper + 5 `h-entry` items (microformats correctly applied via NoteLayout from 02-04)
- Each individual note page wraps in `h-entry` (verified via spot-check on `dist/notes/why-astro-over-next/index.html`)
- Banned-pattern check PASS: no `today i learned`, no `leverage`, no `synergy`, no `cutting-edge`, no `revolutionary` in any published note
- `.planning/02-DRAFTS-*.md` historical drafts preserved (D-29) — none deleted

## Task Commits

1. **Task 1: Draft 5 seed notes** — `894e9c1` (docs)
2. **Task 2: Human checkpoint** — closed by Wesley's approval message ("Ok I read and edited the drafts. They're in the obsidian folder. I also edited the open source model note.")
3. **Task 3: Publish 5 seed notes** — `75e3067` (feat)
4. **Final SUMMARY** — appended below in this commit

## Files Created (Final)

`.planning/` drafts (preserved per D-29):
- `.planning/phases/02-writing-surface/02-DRAFTS-why-astro-over-next.md`
- `.planning/phases/02-writing-surface/02-DRAFTS-why-self-host-umami.md`
- `.planning/phases/02-writing-surface/02-DRAFTS-open-source-models-catching-up.md`
- `.planning/phases/02-writing-surface/02-DRAFTS-glp1-sovereignty.md`
- `.planning/phases/02-writing-surface/02-DRAFTS-why-no-comments.md`

`src/content/notes/` published files:
- `src/content/notes/why-astro-over-next.md`
- `src/content/notes/why-self-host-umami.md`
- `src/content/notes/open-source-models-catching-up.md`
- `src/content/notes/glp1-sovereignty.md`
- `src/content/notes/why-no-comments.md`

Vault copies (uncommitted):
- `~/.hermes/vault/projects/wesleyschlemmer/notes/why-astro-over-next-draft.md` (unchanged from original draft)
- `~/.hermes/vault/projects/wesleyschlemmer/notes/why-self-host-umami-draft.md` (unchanged)
- `~/.hermes/vault/projects/wesleyschlemmer/notes/open-source-models-catching-up-edited.md` (**Wesley renamed and edited**)
- `~/.hermes/vault/projects/wesleyschlemmer/notes/glp1-sovereignty-draft.md` (unchanged)
- `~/.hermes/vault/projects/wesleyschlemmer/notes/why-no-comments-draft.md` (unchanged)

## Decisions Made (Continuation)

- **Vault diff against `.planning/` drafts.** Diffed each vault file vs its `.planning/02-DRAFTS-*` counterpart. Notes 1/2/4/5 are byte-identical between vault and .planning/. Only note 3 (open-source-models-catching-up) differs — Wesley made substantive edits and signaled them by renaming the file from `-draft.md` to `-edited.md`.
- **Verbatim preservation.** Per the continuation context's "vault is authoritative" instruction and "do not touch what Wesley left," published note 3 reflects Wesley's text exactly — including a single typo (`I don't kno`) and shifted dash style. Wesley reads his own work; silent rewriting would betray the authorship contract.
- **Note 3 frontmatter normalization.** Wesley's edit had `related:` (empty value, no brackets) — this is valid YAML and works with the Zod schema (`z.array(z.string()).default([])`). Published version carries `related: []` to match the consistent pattern across the other 4 notes; the only frontmatter change beyond `draft: true -> false` is making the empty `related` field explicit. No content text was modified.

## Deviations from Plan

### Wesley's Checkpoint Edits (expected per Task 2 design)

**Note 3 — `open-source-models-catching-up` — Wesley-edited substantively**

| Field | Original (`.planning/02-DRAFTS-...`) | Wesley's vault version (published) |
|-------|--------------------------------------|------------------------------------|
| Title | "What I'm watching: open-source agents catching up" | "Open Source Agents are Catching Up" |
| Description | "An open-source agent framework hit 100k GitHub stars in a month and 53k in a single week. The pattern that interests me isn't the numbers — it's where the gravity is moving." | "The era of walled gardens is ending" |
| Body | Opens with: "Hermes Agent — the open-source agent framework from Nous Research — hit a hundred thousand stars on GitHub this month..." | Opens with: "Hermes Agent, the open source agent framework from Nous Research, hit 100,000 stars on GitHub in April '26..." |
| Body | Includes paragraph about controversy (Chinese team accusation, Teknium denial) | **Removed** — cleaner trajectory framing without the gossip beat |
| Body | "300-plus models are now reachable through one open subscription via the Tool Gateway" + extra sentence about X/Twitter skill switch | Pared down: "300+ models are now reachable through one open subscription via the Tool Gateway." (no extra sentence) |
| Style | Em-dashes, hyphenated compounds, quoted attribution | Commas, simpler punctuation, plain attribution |

Wesley's edit is the lighter, more direct version. Tone is closer to "thought pinned to the wall" than "essay in miniature." Better fit for the seedling status assigned.

**Notes 1, 2, 4, 5** — published verbatim from `.planning/02-DRAFTS-*.md` (no Wesley edits; vault and .planning/ identical).

### Auto-fixed Issues

None. No Rule 1/2/3 fixes triggered. The published files are the vault-authoritative content with `draft: false` and `related: []` frontmatter normalization.

### Observations Flagged for Wesley (no action taken — verbatim preservation policy)

- **Typo in note 3 body:** `"I don't kno whether the 100k-stars compounds or plateaus."` — `kno` should likely be `know`. Preserved verbatim because the instruction was "do not touch what Wesley left." Wesley can fix in a follow-up commit if desired; the publish gate has already passed and this is a one-character cosmetic correction, not a content gate.

## Threat Surface Scan

The plan's `<threat_model>` covers the relevant boundaries (vault → public, draft → publish gate, scrape paste, health data, claude-sessions exclusion, daily-log exclusion). All five mitigations are honored in the published surface:

- **T-02-08-01** (raw scrape paste): mitigated — note 3 published as Wesley's commentary; Wesley's edits sharpened this further (dropped the controversy paragraph). No raw teknium scrape content present.
- **T-02-08-02** (private health data): mitigated — note 4 published as one-screen takeaway with the `*This is a personal observation, not medical advice...*` disclaimer line intact.
- **T-02-08-03** (claude-sessions content): not triggered — no claude-sessions/ paths read or referenced during continuation.
- **T-02-08-04** (notes published without review): **CLOSED** — Wesley's explicit approval ("Ok I read and edited the drafts...") at the human-verify checkpoint is the publish-gate signal; `draft: false` was set only after that signal arrived.
- **T-02-08-05** (daily-log content): mitigated — banned-pattern grep PASS across all 5 published notes.

No new threat surface introduced. No `threat_flag` entries needed.

## Self-Check

**Files (published):**
- File `src/content/notes/why-astro-over-next.md` — FOUND
- File `src/content/notes/why-self-host-umami.md` — FOUND
- File `src/content/notes/open-source-models-catching-up.md` — FOUND
- File `src/content/notes/glp1-sovereignty.md` — FOUND
- File `src/content/notes/why-no-comments.md` — FOUND

**Files (.planning/ drafts preserved):**
- File `.planning/phases/02-writing-surface/02-DRAFTS-why-astro-over-next.md` — FOUND
- File `.planning/phases/02-writing-surface/02-DRAFTS-why-self-host-umami.md` — FOUND
- File `.planning/phases/02-writing-surface/02-DRAFTS-open-source-models-catching-up.md` — FOUND
- File `.planning/phases/02-writing-surface/02-DRAFTS-glp1-sovereignty.md` — FOUND
- File `.planning/phases/02-writing-surface/02-DRAFTS-why-no-comments.md` — FOUND

**Build artifacts:**
- File `dist/notes/index.html` — FOUND
- File `dist/notes/why-astro-over-next/index.html` — FOUND
- File `dist/notes/why-self-host-umami/index.html` — FOUND
- File `dist/notes/open-source-models-catching-up/index.html` — FOUND
- File `dist/notes/glp1-sovereignty/index.html` — FOUND
- File `dist/notes/why-no-comments/index.html` — FOUND

**Microformats:**
- `h-feed` count in `dist/notes/index.html` — 1 (PASS — wraps the feed)
- `h-entry` count in `dist/notes/index.html` — 5 (PASS — one per note item)
- `h-entry` count in `dist/notes/why-astro-over-next/index.html` — 1 (PASS — wraps the article)

**Frontmatter:**
- `draft: false` in src/content/notes/*.md — 5 of 5 (PASS)
- `status:` field in src/content/notes/*.md — 5 of 5 (PASS)

**PRIV-01 carry-forward:**
- Runtime `fonts.googleapis.com` loads in `dist/` — 0
- Total `fonts.googleapis.com` string occurrences in `dist/` — 1 (in `dist/colophon/index.html`, descriptive copy boasting the site does NOT load Google Fonts; not a runtime resource request — pre-existing pattern from 01-foundation; semantically PASS)

**Commits:**
- Commit `894e9c1` (Task 1 drafts) — FOUND
- Commit `75e3067` (Task 3 publish) — FOUND

## Self-Check: PASSED

## Next Plan Readiness

- **02-09** (validation pass + non-sparse-index check) is now unblocked. The `/notes` index has 5 items with status badges, h-feed/h-entry microformats are present, and PRIV-01 holds. 02-09 should run after orchestrator merges this worktree.
- **02-07** (essays publish) remains paused at its own human-verify checkpoint per `203eb07` — that plan owns the essay surface; 02-08 only owns notes. The "essays empty" build warnings observed during this plan's `npm run build` are pre-existing and out-of-scope per the deviation-rules scope boundary.

## Output Reference

Per the plan's `<output>` section:
- **Notes published:** 5 (the floor; Wesley made edits but no cuts/additions)
- **Slugs published:** `why-astro-over-next`, `why-self-host-umami`, `open-source-models-catching-up`, `glp1-sovereignty`, `why-no-comments`
- **Status:** 3 budding (notes 1, 2, 5) + 2 seedling (notes 3, 4)
- **Tags:** `astro/freedom-tech/tooling`, `privacy/analytics/self-hosting`, `ai/open-source/freedom-tech`, `health/sovereignty`, `indieweb/writing/design`
- **Cuts/additions at checkpoint:** None — Wesley edited note 3 in place, kept all 5 in scope.
- **Vault drafts preserved:** Yes (5 in `~/.hermes/vault/projects/wesleyschlemmer/notes/`; not committed to repo).
- **`.planning/` drafts preserved (D-29):** Yes (5 files intact; not deleted).
- **Pointer:** 02-09 will validate the writing surface end-to-end (non-sparse, RSS, sitemap, microformats, audit).

---
*Phase: 02-writing-surface*
*Plan: 08*
*Status: COMPLETE — all 3 tasks closed; publish gate honored*
