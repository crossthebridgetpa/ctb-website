# Phase 2: Writing Surface — Context

**Gathered:** 2026-04-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Layer essays + notes onto the Phase 1 personal-hub foundation at `wesleyschlemmer.com`. This phase delivers the writing surface that converts the site from "lobby + project pages" to "lobby + project pages + on-site library," wired to RSS for the IndieWeb / BTC / Freedom Tech peer audience. The homepage's existing `<section id="recent-writing" hidden>` placeholder (`src/pages/index.astro:75`) gets populated.

**In scope:**
- Astro content collections: `essays` and `notes` (distinct collections, distinct schemas) declared in `src/content.config.ts` (currently empty placeholder)
- Routes: `/writing` (combined hub), `/essays` (index), `/essays/[slug]`, `/notes` (index), `/notes/[slug]`, `/topics/[tag]`
- RSS feeds: combined `/rss.xml` + per-collection `/essays/rss.xml` + `/notes/rss.xml`; `<link rel="alternate">` auto-discovery in `<head>`; W3C-validatable; renders correctly in NetNewsWire/Reeder
- "Related" block at the footer of essays and notes, driven by `related: [slug]` frontmatter (cross-collection)
- Topics: every tag declared in frontmatter generates a `/topics/[tag]` page listing all matching essays + notes
- Homepage "Recent writing" module: replace the hidden placeholder with a curated, library-mode block (NOT a "Latest from the blog" widget)
- 2 seed essays at launch (thesis + sovereignty, mid-length 700-1200 words, Claude-drafted in vault → Wesley-reviewed → moved into repo)
- 5-8 seed notes at launch, adapted from existing vault material (teknium scrape observations, decisions/, health briefs, AI-research bookmarks)
- IndieWeb microformats: `h-entry` on essays/notes, `h-feed` on indexes, `h-card` already present on About from Phase 1 (SEO-06)
- `lib/relations.ts` (resolves cross-collection `related: [slug]`) and `lib/tags.ts` (aggregates tags across collections for `/topics/[tag]`)
- `EssayLayout.astro` and `NoteLayout.astro` (composed inside the existing `BaseLayout.astro` — no second top-level layout)

**Out of scope (other phases / future projects):**
- Pagefind search (v1.x, trigger: ≥10 essays/notes)
- Dynamic per-essay OG images via Satori (v1.x, trigger: ≥5 essays)
- Webmention receiver (v1.x, trigger: first inbound webmention)
- Buttondown newsletter signup (v1.x, trigger: 3-4 essays live)
- Comments / Disqus / any third-party engagement widget (Out-of-Scope per REQUIREMENTS.md)
- "Working-style / meta-essay" adapted from About Me — deferred to v1.x
- "Health / sovereignty" essay (GLP-1 brief, Helios eval) — deferred; may surface as a Note instead
- A `BlogLayout` or any second top-level layout — `BaseLayout` from Phase 1 is the firewall; Essay/Note layouts compose inside it
- Manual dark-mode toggle — still out of v1
- Any change to the consulting funnel (lives on the future CTB brand site at `crossthebridge.io`)
- Cross The Bridge brand-site work — separate `/gsd-new-project` initiative (D-20 from Phase 1)

</domain>

<decisions>
## Implementation Decisions

### Seed Content Strategy

- **D-22:** **2 seed essays at launch** (NOT 3): `thesis` essay (Polaris-distilled, Money/Data/Infrastructure pillars in toned-down peer voice) + `sovereignty-as-a-service` essay (adaptation of `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md` — fourth-turning framework, old-to-new world framing, "the rules have changed" angle, but in personal/peer voice not brand/sales voice). The third "working-style" essay candidate is **deferred** to v1.x; the "health/sovereignty" candidate is deferred or may convert to a Note. This re-words WRITE-02's "2-3 essays" to **exactly 2** — locked.

- **D-23:** **Essay length: mid-length, 700-1200 words.** Not full long-form (1200-2000), not short (500-800). Substantive but not imposing; faster to draft, easier first-pass for the writing habit; still long enough to read as essays not notes.

- **D-24:** **Claude drafts; Wesley reviews/edits.** Same pattern as Phase 1's 01-08 About page. Drafts land in vault for Obsidian review (see D-27 for path). Wesley approves (with edits) at a checkpoint inside Phase 2 execution; on approval Claude moves the file into `src/content/essays/<slug>.md` with `draft: false`.

- **D-25:** **CTB brand-site overlap is acceptable.** The `sovereignty-as-a-service` essay distills the same redesign notes that are seed input for the future CTB brand-site project. Decision: ship both — wesleyschlemmer.com gets the Wesley-the-person/peer voice version; the future CTB brand site re-frames the same ideas as a consulting offer in CTB-the-brand voice. Two pieces, two purposes — not duplicate content. Voice contract enforced at draft-review.

- **D-26:** **Notes ship seeded, not sparse.** 5-8 notes (200-500 words each) at launch, adapted from existing vault material:
  - teknium scrape observations (reframed as "what I'm watching in AI" notes, not as scrape dumps)
  - decisions/ (technical/personal decisions written up as short reflections — e.g., why-I-chose-X notes)
  - health/ briefs (one-screen takeaways, NOT the full research briefs)
  - ai-research/ bookmarks (annotated link-style notes)
  - **NOT** allowed: daily-log content (Out-of-Scope per REQUIREMENTS.md), unedited scrape paste (privacy/voice mismatch), claude-sessions/ content (private workspace)

### Authoring Pipeline

- **D-27:** **In-repo is canonical.** `src/content/essays/*.md` and `src/content/notes/*.md` ARE the source of truth. Vault is the scratch / draft / pre-publish surface. Repo commit history is the publish history. Astro symlinks rejected (don't survive Vercel build); copy-on-build script rejected (overengineered for current low volume).

- **D-28:** **Drafts gated by `draft: true` frontmatter.** Files with `draft: true` exist in `src/content/` but are excluded from build output, RSS feeds, topic pages, related-content lookups, and the homepage "Recent writing" module. Standard Astro pattern (`getCollection('essays', ({ data }) => !data.draft)`). Single source of truth — the repo. Flip to `draft: false` (or remove the field) to publish.

- **D-29:** **Drafts land in vault for Obsidian review, then are moved into the repo on approval.** Same pattern as Phase 1 01-08 About:
  - Claude writes drafts to `~/.hermes/vault/projects/wesleyschlemmer/essays/<slug>-draft.md` (and same shape for notes under `notes/`) for Obsidian review.
  - Claude **also** writes a planning-phase artifact at `.planning/phases/02-writing-surface/02-DRAFTS-<slug>.md` so the draft is visible to downstream Claude sessions even if Wesley hasn't synced his vault.
  - On approval Claude moves the file into `src/content/essays/<slug>.md` (or `src/content/notes/<slug>.md`) with `draft: false` and the final frontmatter.
  - Vault and `.planning/` draft copies are NOT cleaned up automatically — they stay as historical drafts for retrospective reference (matches 01-08 precedent where drafts stayed at `01-08-DRAFT.md` after the page shipped).

- **D-30:** **Optional `updated:` frontmatter; conditional "updated" stamp.** Fields:
  - `published: <ISO date>` — required at publish time
  - `updated: <ISO date>` — optional; set when a published piece is meaningfully revised (NOT for typo fixes)
  - **Essays:** show `published` date small under title; if `updated` is present, show `updated DATE` with at least equal weight (per pitfall #1: hide pure pub-date on evergreen, give updated equal weight). Library-mode discipline.
  - **Notes:** show `updated` if present, otherwise show `published`. Notes are the recency-aware surface.
  - Git commit date is NOT used to derive dates (typo fixes would falsely look like content updates).

### Claude's Discretion (not selected for discussion — defaults locked)

These follow `.planning/research/ARCHITECTURE.md` and `.planning/research/PITFALLS.md` defaults; the planner can adjust if it surfaces a real conflict.

- **CD-01: Library-mode IA discipline (`/writing` hub + homepage module).** `/writing` defaults to a curated/featured layout (manual `featured: true` frontmatter selects up to 5 essays + notes, dateless presentation), with a secondary "All writing, by year updated" archive list below. Homepage `<section id="recent-writing">` shows up to 3 featured items (NOT "latest" — explicitly featured / dateless), titled something like "Writing" not "Latest from the blog." Per pitfall #1 (dead-blog graveyard).

- **CD-02: Notes status taxonomy.** Adopt `status: 'seedling' | 'budding' | 'evergreen'` per RESEARCH.md ARCHITECTURE.md §Notes. Surfaced as a small badge on the note page and on the `/notes` index. Default status if unspecified: `seedling`.

- **CD-03: Related content mechanism.** Manual `related: [slug]` frontmatter only for v1.x. Auto-tag-overlap and mention-based linking are richer but add code surface and edge cases — defer. The audit pass (≥2 internal links per page, per Phase 1 success criteria #5) catches missing manual links.

- **CD-04: Topics taxonomy.** Open — every tag declared in any frontmatter `tags: [...]` array generates a `/topics/[tag]` page. No whitelist. `lib/tags.ts` aggregates and dedupes. Empty tag pages cannot exist (a tag only renders a page if at least one piece references it). Tag slugs are lowercase, hyphenated.

- **CD-05: RSS feed scope.** Three feeds — `/rss.xml` (combined essays + notes), `/essays/rss.xml`, `/notes/rss.xml`. **Full content** in `<description>` (not summary-only) — peer audience reads in NetNewsWire/Reeder; full content respects them. `<link rel="alternate" type="application/rss+xml">` for all three in every page's `<head>` via BaseLayout.

- **CD-06: Frontmatter schemas (Zod).**
  - Essays: `title` (req), `slug` (auto from filename, but overridable), `published` (req on publish), `updated` (opt), `subtitle` (opt), `description` (req — used for OG/RSS/`<meta>`), `tags` (opt array), `related` (opt array of slugs), `draft` (opt, default false), `featured` (opt, default false)
  - Notes: `title` (req), `slug` (auto), `published` (req), `updated` (opt), `description` (req), `tags` (opt), `related` (opt), `draft` (opt), `featured` (opt), `status` (opt, default `seedling`)
  - Schemas live in `src/content.config.ts` (currently empty placeholder — Phase 2 populates per inline note in that file).

- **CD-07: Layouts split.** `EssayLayout.astro` (reading-optimized: `h-entry`, max-width prose, optional reading-time, no sidebar, "Related" block at footer) and `NoteLayout.astro` (terser: status badge, terser metadata, "Related" at footer) — both compose `BaseLayout.astro` from Phase 1. **No second top-level layout.** Title/description/canonical/JSON-LD all flow through BaseLayout's existing Props.

- **CD-08: Homepage tile/grid stays untouched.** The existing 4-tile grid (Bitcoin Bay / FBBA / Cross The Bridge / Freedom Tech thesis) is locked. Phase 2 only wires the `<section id="recent-writing">` placeholder; no other homepage layout change.

- **CD-09: Reading time.** Show on essays only (not notes). Computed at build time from word count, displayed as "N min read." Skipped if essay is shorter than ~500 words.

- **CD-10: Per-essay JSON-LD.** Emit `BlogPosting` schema (per SEO-02) on essay pages via the existing `JsonLd.astro` component, with `headline`, `datePublished`, `dateModified` (if `updated`), `author` (Person ref to About `@id`), `description`. Notes use `Article` (lighter-weight) or skip JSON-LD if it bloats note pages.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project context
- `.planning/PROJECT.md` — full project context, core value (inbound opportunities), constraints, key decisions table
- `.planning/REQUIREMENTS.md` — Phase 2 requirements: WRITE-01..07, SEO-06
- `.planning/ROADMAP.md` — Phase 2 goal + success criteria (lines 55-71)
- `.planning/STATE.md` — current position (Phase 1 complete; Phase 2 ready to plan)
- `.planning/phases/01-foundation-personal-surface/01-CONTEXT.md` — Phase 1 decisions D-01..D-21 (carry-forward: D-12 Collison density, D-17 stack, D-21 Wesley Schlemmer canonical name)

### Research (informs every decision)
- `.planning/research/SUMMARY.md` — synthesized research overview, Phase 2 ordering rationale (lines 148-164)
- `.planning/research/ARCHITECTURE.md` §Content collections, §Tag flow, §URL structure (lines 84-393) — collection separation rationale, route structure, `lib/tags.ts` shape, `lib/relations.ts` shape
- `.planning/research/FEATURES.md` — table-stakes / differentiators / anti-features for personal-portfolio writing surfaces
- `.planning/research/PITFALLS.md` §1 (dead-blog graveyard), §6 (content silos), §11 (RSS broken) — the three pitfalls Phase 2 must avoid
- `.planning/research/STACK.md` — `@astrojs/rss` + content collections + plain Markdown choices

### Source material for adapted essays + notes (seed content)
- `~/.hermes/vault/projects/petros/petros-polaris.md` — primary source for the **thesis essay** (Money/Data/Infrastructure pillars; toned down per Phase 1 D-08 — doctrine words like "Beast System" / "Mystery Babylon" stay in vault)
- `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md` — primary source for the **sovereignty-as-a-service essay** (fourth-turning framework, old-to-new world framing, "the rules have changed"). Voice contract: peer/personal, NOT brand/sales — that comes later on the future CTB brand site.
- `~/.hermes/vault/people/About Me.md` — voice + style + goals reference; source for any Note that touches Wesley's working approach. NOT primary source for an essay in this phase (working-style essay deferred per D-22).
- `~/.hermes/vault/health/glp1-research-brief-2026-04-20.md`, `~/.hermes/vault/health/helios-health-claims-eval-2026-04-07.md` — pool for adapted Notes (one-screen takeaways, not full briefs).
- `~/.hermes/vault/1 - Rough Notes/2026-04-*-teknium-scrape*.md` — pool for "what I'm watching in AI" Notes (reframed, not raw scrape paste).
- `~/.hermes/vault/decisions/*.md` — pool for "why I chose X" Notes (technical/personal decisions reframed for public audience).
- `~/.hermes/vault/ai-research/*` — pool for annotated link-style Notes.

### External
- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Astro RSS recipe: https://docs.astro.build/en/recipes/rss/ + `@astrojs/rss` npm: https://www.npmjs.com/package/@astrojs/rss
- IndieWeb microformats: https://microformats.org/wiki/h-entry, https://microformats.org/wiki/h-feed
- IndieWebify validator: https://indiewebify.me/
- W3C feed validator: https://validator.w3.org/feed/
- Astro frontmatter / Zod schema patterns: https://docs.astro.build/en/guides/content-collections/#defining-collections

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (Phase 1, all domain-agnostic)
- `src/layouts/BaseLayout.astro` — composes BaseSEO + JsonLd + Nav + Footer + skip-link + conditional Umami three-way guard. EssayLayout/NoteLayout compose this; do NOT bypass it.
- `src/components/seo/BaseSEO.astro` — typed Props (`title`, `description`, `canonical`, `ogImage?`, `ogType?`). Essays will pass `ogType="article"`.
- `src/components/seo/JsonLd.astro` — schema-dts-typed; supports `'website' | 'person' | 'webpage' | 'breadcrumb'` today. Phase 2 extends with `'blog-posting' | 'article'` for essays/notes (CD-10).
- `src/components/Hero.astro`, `src/components/Tile.astro`, `src/components/CtaButton.astro`, `src/components/Headshot.astro`, `src/components/ObfuscatedMailto.astro`, `src/components/ExternalLink.astro` — homepage + about page primitives. Reusable as-is for any "writing" surface that needs them.
- `src/styles/global.css` — design tokens (cream/charcoal/green/gold light + dark variants per A11Y-03), `@theme` block. Essay reading column uses these.
- `src/lib/consulting-url.ts` — domain-constants helper from Phase 1; not directly used by Phase 2 but pattern reference for `lib/relations.ts` and `lib/tags.ts`.

### Established Patterns
- Pages compose `BaseLayout` with typed Props: `title`, `description`, `canonical`, `jsonLdSchema?`, `jsonLdData?`. EssayLayout/NoteLayout follow this.
- External links use `<ExternalLink>` (rel="noopener noreferrer", target="_blank", screen-reader hint). Essay bodies that link out use this.
- Mailto uses `<ObfuscatedMailto>` (three-layer obfuscation; no plaintext in `dist/`).
- Astro 6 content collections live in `src/content/` (NOT `src/content/config.ts` — Astro 6 deprecated that path; Phase 1 already created `src/content.config.ts` as the new location).
- Slugs derive from filenames by Astro default; override only when needed.
- Zero `fonts.googleapis.com` requests (Phase 1 PRIV-01 invariant) — Phase 2 must not regress this.

### Integration Points
- `src/content.config.ts:11` — currently `export const collections = {} as const;`. Phase 2 replaces with `defineCollection({ ... })` for `essays` and `notes` per CD-06.
- `src/pages/index.astro:75` — `<section id="recent-writing" hidden></section>` placeholder. Phase 2 wires this with the curated featured-writing module per CD-01. The `hidden` attribute is removed at the same time.
- `astro.config.mjs` — already wires `@astrojs/sitemap` (Phase 1). Phase 2 adds `@astrojs/rss` (npm install + import). No other config change anticipated.
- `src/pages/about.astro` — already emits `h-card` (SEO-06 partial via Phase 1 01-08). Essays + notes complete SEO-06 by adding `h-entry`; indexes add `h-feed`.
- `src/components/Nav.astro` — currently has Home / Projects / About / Contact / Colophon (per Phase 1 01-06). Phase 2 adds a "Writing" link (linking to `/writing`).
- `src/components/Footer.astro` — currently 3-column with locked tagline. Phase 2 adds RSS subscription links (combined + per-collection) in an unobtrusive position.

### Files Phase 2 will create
- `src/content/essays/` — directory + 2 seed `.md` files (post-review)
- `src/content/notes/` — directory + 5-8 seed `.md` files (post-review)
- `src/layouts/EssayLayout.astro`, `src/layouts/NoteLayout.astro`
- `src/lib/relations.ts`, `src/lib/tags.ts`
- `src/pages/writing/index.astro` (combined hub)
- `src/pages/essays/index.astro`, `src/pages/essays/[slug].astro`
- `src/pages/notes/index.astro`, `src/pages/notes/[slug].astro`
- `src/pages/topics/[tag].astro`
- `src/pages/rss.xml.ts`, `src/pages/essays/rss.xml.ts`, `src/pages/notes/rss.xml.ts`
- `.planning/phases/02-writing-surface/02-DRAFTS-<slug>.md` (per essay + per note for review)

</code_context>

<specifics>
## Specific Ideas

### The two essays — voice contract and sourcing

**Essay 1 — `thesis` (Polaris-distilled, 700-1200 words):**
- Source: `~/.hermes/vault/projects/petros/petros-polaris.md` (Page 1 only — Page 2's AYLIP detail belongs on the future CTB brand site, NOT here, per Phase 1 D-08)
- Frame: Money / Data / Infrastructure as three pillars of "what does it look like to opt out without going off-grid."
- Voice: same as the homepage hero (D-01) — toned-down worldview, claims a position, no preaching. **Banned words** (carry-forward from Phase 1 D-08): "Beast System," "Mystery Babylon," "Great Bifurcation as a phrase" (the *idea* is fine; the phrase is doctrine), "fourth-turning" (acceptable in essay 2 but feels heavy here).
- Banned marketing-ese: "revolutionary," "leverage," "synergy," "cutting-edge," "AI-powered" (as a self-descriptor).
- Slug: `thesis` or `freedom-tech-thesis` (planner picks).

**Essay 2 — `sovereignty-as-a-service` (redesign-notes adaptation, 700-1200 words):**
- Source: `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md`
- Frame: "the world you grew up in no longer exists / the rules have changed"; sovereignty is something you can build into your life, not just buy. **NOT a consulting pitch** — that's reserved for the future CTB brand site (D-25). Voice is Wesley-the-person reflecting, not CTB-the-brand selling.
- Banned: anything that reads like a service description ("I offer," "engagements start at," "book a call"). The word "consulting" can appear sparingly in the essay body but never in a CTA frame.
- Slug: `sovereignty-as-a-service` (locked).

### The 5-8 notes — pool and shape
Per D-26, notes are 200-500 words, adapted (not raw paste). Indicative pool — planner picks 5-8 from this set during execution; final selection at draft-review:

- 1-2 "what I'm watching in AI" notes from teknium-scrape observations (reframed as Wesley's commentary, not scrape excerpts)
- 1-2 "why I chose X" notes from `~/.hermes/vault/decisions/` (e.g., why-self-host-Umami, why-Astro-over-Next, why-no-comments)
- 1-2 health/sovereignty one-screen takeaways from health briefs (NOT the full briefs; a takeaway-paragraph version)
- 1-2 annotated bookmarks from `ai-research/` (pattern: link + 2-3 sentences of why-this-matters)

Each note has a `status` (seedling default, budding for refined ones, evergreen rare) and 1-3 tags.

### Library-mode discipline (CD-01 reminder)
- Homepage "Recent writing" module heading: **"Writing"** (NOT "Latest from the blog"). Subline optional: "Featured pieces — by topic, not date."
- Items: up to 3 featured pieces (`featured: true` in frontmatter). If fewer than 3 featured, fall through to most-recently-updated (still within library-mode framing — no big "POSTED OCT 2025" chrome).
- The `<section id="recent-writing">` markup must drop the `hidden` attribute when Phase 2 ships.

### Accessibility carry-through
- Skip-to-main link from BaseLayout still works on essay/note pages (composition).
- Reading column max-width tuned for 65-75ch readability — research recommends this; planner picks the exact value.
- Code blocks (if any essay/note ships with code) inherit Astro's default Shiki — no `astro-expressive-code` install in this phase (defer to a later phase if Wesley starts shipping code-heavy posts).

### Visual references (Collison-style density carry-forward, D-12)
- patrickcollison.com — single column, generous whitespace, large type
- stephango.com — minimal, library-mode, no chronological pressure
- Avoid: Maggie Appleton's annotated/marginalia density; Brian Lovin's designer-tight density.

</specifics>

<deferred>
## Deferred Ideas

### Phase 2 scope reductions explicitly accepted

- **3rd seed essay (working-style / About-Me-adapted "How I Work" piece)** — deferred to v1.x. Useful for peer/podcast inbound but not blocking Phase 2 launch.
- **Health / sovereignty essay** (GLP-1 brief, Helios eval distilled) — deferred to v1.x. May surface as a Note in Phase 2's notes seed pool instead.
- **Auto-tag-overlap related-content** and **mention-based auto-linking** — manual `related: [slug]` only for now (CD-03). Auto-mechanisms are richer but add edge cases; revisit at v1.x if the manual approach feels brittle.
- **Whitelisted topics** — open tag taxonomy in v1 (CD-04); revisit if the topic surface gets noisy.
- **Reading-time on notes** — only on essays (CD-09); revisit if note pages start feeling sparse.
- **Per-collection feed for `topics` or `featured`** — only essays + notes get RSS in this phase; topic-feed and featured-feed deferred.

### v1.x Discovery Surface (carried from Phase 1, unchanged)
- Pagefind search (trigger: ≥10 essays + notes)
- Dynamic per-essay OG images via Satori (trigger: ≥5 essays)
- Webmention receiver via webmention.io (trigger: first inbound webmention)
- Buttondown newsletter signup (trigger: 3-4 essays live)
- `/now`, `/uses`, `/press` pages

### Future projects (carried from Phase 1, unchanged)
- CTB brand site at `crossthebridge.io` — separate `/gsd-new-project`. Phase 2's `sovereignty-as-a-service` essay will be re-treated by that project in CTB-the-brand voice (D-25). Not a Phase 2 concern.
- `getpetros.com` migration target if AYLIP productizes — out of v1.

### Open Phase 1 follow-ups (NOT Phase 2 scope)
These are still open from Phase 1 and should be tracked in STATE.md, NOT pulled into Phase 2:
- 01-08 About page draft review (still pending Wesley's read)
- Vercel + DNS launch ops session (Wesley owns)
- Umami Docker stack provisioning (Wesley owns; UUID pending)
- 7-day post-launch Umami revisit gate

</deferred>

---

*Phase: 02-writing-surface*
*Context gathered: 2026-04-28*
