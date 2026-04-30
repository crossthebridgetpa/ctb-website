---
phase: 02-writing-surface
plan: 07
subsystem: writing-surface/seed-content
status: complete
tags:
  - seed-content
  - essays
  - voice-contract
  - publish
dependency_graph:
  requires:
    - 02-01 (essay collection schema in src/content.config.ts)
    - 02-04 (EssayLayout + /essays/[slug].astro routes)
  provides:
    - "Two seed essays published — thesis + sovereignty-as-a-service"
    - "Writing surface non-empty at launch (WRITE-02 requirement satisfied)"
  affects:
    - "Homepage Recent Writing section (now renders 2 essays — was empty)"
    - "Topic pages (freedom-tech, bitcoin, privacy, sovereignty, consulting now have content)"
    - "RSS feeds (essays.xml + combined rss.xml will list both essays — validated in 02-09)"
tech-stack:
  added: []
  patterns:
    - "Vault-first draft → Obsidian review → publish on approval (D-29)"
    - "draft: false flip as publish chokepoint (D-28)"
    - "H2 heading on opening line as in-vault style choice (Wesley edit, sov essay)"
key-files:
  created:
    - src/content/essays/thesis.md
    - src/content/essays/sovereignty-as-a-service.md
    - .planning/phases/02-writing-surface/02-DRAFTS-thesis.md (preserved from Task 1)
    - .planning/phases/02-writing-surface/02-DRAFTS-sovereignty-as-a-service.md (preserved from Task 1)
  modified:
    - .planning/phases/02-writing-surface/02-07-SUMMARY.md (this file — rewritten from paused state)
  vault-only:
    - ~/.hermes/vault/projects/wesleyschlemmer/essays/thesis-edited.md (Wesley's authoritative edits)
    - ~/.hermes/vault/projects/wesleyschlemmer/essays/sovereignty-as-a-service-edited.md (Wesley's authoritative edits)
decisions:
  - "Vault file is authoritative when Wesley edits it — published files mirror vault edits, not original drafts"
  - "Renamed working project name: Polaris → Petros (per Wesley's vault edit on the thesis essay)"
  - "Preserved Wesley's stylistic choice of em-dashes converted to commas/hyphens throughout both essays"
  - "Fixed one trailing-## typo in sovereignty essay's opening H2 heading (Rule 1 — would have rendered ## as visible text)"
  - "Normalized empty `related:` YAML field to `related: []` to satisfy Zod array schema (Rule 3 — would have failed build)"
metrics:
  tasks_completed: 3
  tasks_total: 3
  thesis_word_count: 891
  sovereignty_word_count: 854
  duration_total: ~25min (across original session + continuation)
  completed: 2026-04-30
requirements: [WRITE-02]
---

# Phase 02 Plan 07: Essay seed content — Status: COMPLETE

Two seed essays published to `src/content/essays/` with `draft: false`. Wesley reviewed and edited both drafts in his Obsidian vault during the human-verify checkpoint. The continuation agent treated the vault files (`*-edited.md`) as authoritative and published Wesley's edits verbatim, with two minor schema/markup fixes (documented under Deviations).

## Plan execution shape

| Task | Description | Status | Commit |
|------|-------------|--------|--------|
| 1 | Draft both essays — vault + .planning/ copies | Complete (original session) | merged in `6faacaf` (Wave 3 partial) |
| 2 | checkpoint:human-verify (review in Obsidian) | Approved with edits | n/a |
| 3 | Publish approved drafts to src/content/essays/ with draft: false | Complete (this session) | `789ac79` |

## What shipped

**Essay 1 — Freedom Tech Thesis** (`src/content/essays/thesis.md`, slug: `thesis`)
- 891 words (in-range 700-1200).
- Frame: "What does it look like to opt out without going off-grid?" — three pillars (Money / Data / Infrastructure).
- Tags: `freedom-tech`, `bitcoin`, `privacy`, `sovereignty`.
- Frontmatter: `draft: false`, `featured: true`, `published: 2026-04-28`.
- Voice contract: 0 matches on doctrine words (Beast System / Mystery Babylon / Great Bifurcation / fourth-turning) and 0 matches on marketing-ese (revolutionary / leverage / synergy / cutting-edge / AI-powered).

**Essay 2 — Sovereignty as a Service** (`src/content/essays/sovereignty-as-a-service.md`, slug: `sovereignty-as-a-service`)
- 854 words (in-range 700-1200).
- Frame: "the world you grew up in no longer exists" + fourth-turning passage; sovereignty as a practice, not a product.
- Tags: `freedom-tech`, `sovereignty`, `consulting`, `bitcoin`.
- Frontmatter: `draft: false`, `featured: true`, `published: 2026-04-28`.
- Voice contract: 0 matches on service-description triggers (I offer / engagements start at / book a call) and 0 matches on marketing-ese.
- "consulting" appears twice in body prose, never in CTA frame.

## Wesley's vault edits — what changed between Task 1 draft and final published file

Wesley's vault edits were substantive and tonal — both essays now read more like Wesley's natural cadence and less like Claude's draft cadence. Both vault files are named `<slug>-edited.md` (Wesley's convention; the original Task 1 drafts were named `<slug>-draft.md`).

**Thesis essay (`thesis-edited.md` → `src/content/essays/thesis.md`):**
- Em-dashes (`—`) replaced with commas or hyphens throughout (Wesley's house style).
- Working project name renamed: **Polaris → Petros**. Closing paragraph was: "Polaris is the working name for that project." Now: "Petros is the working name for that project." (This is a project-naming decision — propagates to any future Petros-related project tile.)
- "AWS" spelled out as "Amazon Web Service" (Wesley's preference; technically the company is "Amazon Web Services" plural, but Wesley wrote singular and the editor preserves Wesley's voice over technical accuracy).
- "de-Googled" → "deGoogled" (Wesley's spelling).
- "delete Facebook — that's a meme, not a strategy" → "delete Facebook, though that's certainly a place to start." (Softer hedge; less dismissive.)
- "Encrypted messengers — Signal, SimpleX, Matrix —" → "Encrypted messengers like Signal" (simplified — only Signal, not the full alternative-messenger list).
- "Become a sysadmin" → "become a system admin" (spelled out).
- Data section's middle paragraph tightened (removed "three or four times — at phone purchase, at password-manager setup, at messaging-app pick, at note-taking workflow"; replaced with "at phone purchase, password manager, at messaging, and document storage").
- "$5/month VPS" → "$5/month virtual private server" (acronym spelled out).
- Removed "Nextcloud or Immich" → "Nextcloud" (just one product).
- Removed "Tampa Bay small-business owner's life" → "small business owner's life" (de-localized; now reads as broader audience, not Tampa-specific).
- YAML frontmatter: stripped quotes from string scalars where unambiguous; `published` is a bare ISO date instead of a quoted string; `draft: true` → `draft: false`.

**Sovereignty essay (`sovereignty-as-a-service-edited.md` → `src/content/essays/sovereignty-as-a-service.md`):**
- Em-dashes replaced with periods or commas throughout.
- **Structural change:** opening line `The world you grew up in no longer exists.` was promoted from a paragraph to an H2 heading: `## The world you grew up in no longer exists.` (This makes the essay open with a heading instead of a lede paragraph — slight unconventional choice but preserved per Wesley's approval.)
- Removed "Whatever map you were handed — the one with the good schools and the good jobs and the good banks and the good news, where you played by the rules and the rules played fair back — that map is no longer the territory." (Whole sentence cut; the essay now goes straight from the heading to "Some figured this out in 2001…")
- Reworded historical anchor: "Some of us figured this out in 2008. Some in 2020." → "Some figured this out in 2001, some in '08, many in 2020." (Different anchor years — adds 2001 as a hinge moment.)
- "We seem to be in one of those passages right now." → "We seem to be at the end of one of those cycles right now." (Stronger claim about temporal location.)
- Removed "Not theoretical control. Not 'I could move my data if I wanted to.' Real, present-tense control —" (whole hedge cut).
- Removed "self-custody" hyphen → "self custody" (Wesley's spelling).
- Removed "even though I'm allergic to the way that word usually shows up in tech marketing" parenthetical (tightened).
- "Us — the people who can see both sides clearly enough to walk it." → "Us. The people who can see both sides clearly enough to walk it." (Period instead of em-dash — same content, different rhythm.)
- Closing changed: "Sovereignty isn't a destination. It's the slope you choose to walk. The rules have changed. Choose the new ones." → "Sovereignty isn't a destination. It's the path you choose to walk. The rules have changed. So now we must as well." (slope → path; new closing line is more declarative.)
- YAML frontmatter: stripped quotes; `draft: true` → `draft: false`.

## Deviations from Plan

**1. [Rule 1 — Bug] Removed trailing `##` from sovereignty essay's opening H2 heading.**
- **Found during:** Task 3 publish (vault file → src/content/essays/).
- **Issue:** Wesley's vault edit produced `## The world you grew up in no longer exists.##` — the trailing `##` is not valid Markdown (Markdown does not support symmetric ATX-style closing markers). Confirmed by remark-parse → rehype: it would have rendered as `<h2>The world you grew up in no longer exists.##</h2>` with the literal `##` characters visible inside the heading.
- **Fix:** Stripped trailing `##` so the published file reads `## The world you grew up in no longer exists.` Renders cleanly as `<h2>The world you grew up in no longer exists.</h2>`.
- **Files modified:** `src/content/essays/sovereignty-as-a-service.md` (line 16).
- **Commit:** `789ac79`.

**2. [Rule 3 — Blocking] Normalized empty `related:` YAML field to `related: []`.**
- **Found during:** Task 3 frontmatter prep.
- **Issue:** Wesley's vault edits left `related: ` (no value) — YAML parses this as `null`. The Zod schema in `src/content.config.ts` is `z.array(z.string()).default([])`, which rejects `null` (default applies only when the field is missing entirely; an explicit null fails validation). This would have broken `npm run build`.
- **Fix:** Set `related: []` in both published files. Functionally identical to Wesley's intent (both essays have no related posts at launch — manual related-slug refs are populated later per CD-03).
- **Files modified:** `src/content/essays/thesis.md`, `src/content/essays/sovereignty-as-a-service.md`.
- **Commit:** `789ac79`.

No other deviations.

## Voice contract — final confirmation

| Check | Target file | Result |
|---|---|---|
| Banned doctrine words (Beast System, Mystery Babylon, Great Bifurcation, fourth-turning) | `src/content/essays/thesis.md` | 0 matches |
| Marketing-ese (revolutionary, leverage, synergy, cutting-edge, AI-powered) | `src/content/essays/thesis.md` | 0 matches |
| Service-description (I offer, engagements start at, book a call) | `src/content/essays/sovereignty-as-a-service.md` | 0 matches |
| Marketing-ese | `src/content/essays/sovereignty-as-a-service.md` | 0 matches |

The "fourth-turning" frame appears only in the sovereignty essay (acceptable per D-22; banned in thesis essay only) — verified.

## Build + microformat confirmation

```
$ npm run build
[build] 18 page(s) built in 4.50s
[build] Complete!
```

| Check | Result |
|---|---|
| `dist/essays/thesis/index.html` exists | Yes |
| `dist/essays/sovereignty-as-a-service/index.html` exists | Yes |
| `h-entry` microformat in thesis dist HTML | 1 match |
| `h-entry` microformat in sovereignty dist HTML | 1 match |
| `/writing/index.html` references both essay slugs | Yes (essays/thesis + essays/sovereignty-as-a-service) |
| `dist/essays/rss.xml` generated | Yes (validated against both essays in plan 02-09) |
| Pre-existing notes-collection-empty warnings | Expected — notes are seeded in plan 02-08 (separate plan, paused at checkpoint) |

## PRIV-01 (Google Fonts CDN leak invariant) — confirmation

```bash
# No real font CDN link tags anywhere
$ grep -rE '<link[^>]+fonts\.googleapis\.com' dist/
(empty)

# Essay routes specifically
$ grep -c 'fonts.googleapis.com' dist/essays/thesis/index.html dist/essays/sovereignty-as-a-service/index.html
0
```

Note: `dist/colophon/index.html` contains the string `fonts.googleapis.com` once — but this is **prose content** (the colophon explicitly lists "No Google domains (no `fonts.googleapis.com`…)" as something the site does NOT load). It is wrapped in `<code>` inside the page body, not in a `<link href>` resource hint. PRIV-01 invariant intent (no actual Google Fonts CDN request) holds. This colophon mention is pre-existing (not introduced by this plan) and is consistent with the colophon's purpose. Out of scope for this plan to remove.

## Threat-model status — final

| Threat | Disposition | Status |
|---|---|---|
| T-02-07-01 (private-vault content in repo) | mitigate | **Holds.** Both `src/content/essays/*.md` are Wesley's adapted public-voice essays. Vault files (`~/.hermes/vault/...`) are outside the repo and never committed. The `.planning/02-DRAFTS-*.md` files in the repo are the original Task-1 Claude drafts (also Wesley's public voice, not raw transcripts). |
| T-02-07-02 (autonomous publish) | mitigate | **Holds.** Plan was `autonomous: false`. Task 3 (publish) executed only AFTER Wesley's explicit approval at the human-verify checkpoint. `draft: false` set only at Task 3, never auto-flipped. |
| T-02-07-03 (voice-contract violation) | mitigate | **Holds.** Both grep gates ran on the final `src/content/essays/*.md` files. 0 matches on all four ban categories (doctrine words in thesis, service-description in sov, marketing-ese in both). |
| T-02-07-04 (AYLIP/Page 2 leak in thesis) | mitigate | **Holds.** Final thesis essay does not mention AYLIP, "Petros productization" detail, or any Page-2 content. The "Petros" name appears once in the closing paragraph as the working project name (which IS Page-1 content per the source — Page 1 introduces the Polaris/Petros name; Page 2 describes the productized AYLIP offering, which is excluded). |

## Pointer to next plan

**02-09 (RSS validation)** will verify both essays appear correctly in:
- `dist/essays/rss.xml` (essays-only feed)
- `dist/rss.xml` (combined essays + notes feed)
- Sitemap inclusion under `dist/sitemap-*.xml`

The build output already shows `essays/rss.xml`, `notes/rss.xml`, and `rss.xml` were generated — 02-09 will run XML validation, GUID stability checks, and per-essay item presence assertions.

## Self-Check: PASSED

- `src/content/essays/thesis.md` — FOUND
- `src/content/essays/sovereignty-as-a-service.md` — FOUND
- `dist/essays/thesis/index.html` — FOUND (h-entry: 1)
- `dist/essays/sovereignty-as-a-service/index.html` — FOUND (h-entry: 1)
- `.planning/phases/02-writing-surface/02-DRAFTS-thesis.md` — PRESERVED (D-29)
- `.planning/phases/02-writing-surface/02-DRAFTS-sovereignty-as-a-service.md` — PRESERVED (D-29)
- Commit `789ac79` (Task 3 publish) — VERIFIED in `git log`
- All voice-contract greps return 0 matches — VERIFIED
- `npm run build` exits 0 — VERIFIED
- PRIV-01 invariant (no `<link>` to fonts.googleapis.com in dist/) — VERIFIED
