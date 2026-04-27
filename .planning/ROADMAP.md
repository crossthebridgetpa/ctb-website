# Roadmap: wesleyschlemmer.com Personal Hub

## Overview

Build a personal hub for Wesley Schlemmer at `wesleyschlemmer.com` — Wesley-the-person, separate from Cross-The-Bridge-the-brand. The hub leads with worldview, surfaces Wesley's project areas (Bitcoin Bay, FBBA, Cross The Bridge), hosts his writing on-site, and routes inbound to the right destination — peer / podcast / partnership conversations land here, paying CTB-consulting clients route externally to the CTB brand site at `crossthebridge.io`. v1 ships in two phases: Foundation + Personal Surface (Phase 1) lights up the hub; Writing Surface (Phase 2) layers essays + notes onto the established foundation. The CTB brand site (`crossthebridge.io` consulting hub + Bitcoin/Privacy/AI sub-pages) is a **separate future project** kicked off via `/gsd-new-project` after Phase 2 launches. A v1.x milestone (Discovery Surface — search, dynamic OG, webmentions, newsletter) is parked until content volume justifies it.

## Phases

**Phase Numbering:**
- Integer phases (1, 2): Planned milestone work
- Decimal phases (1.1, 2.1): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation + Personal Surface** — Astro 6 site live at `staging.wesleyschlemmer.com` with worldview homepage, About, Contact, Colophon, 3 project pages (Bitcoin Bay, FBBA, Cross The Bridge teaser-with-external-link), SEO/privacy infrastructure baked in
- [ ] **Phase 2: Writing Surface** — Essays + notes shipping with RSS, related-content cross-linking, topic pages; homepage gains a "Recent writing" module

## Phase Details

### Phase 1: Foundation + Personal Surface
**Goal**: Personal hub is live at `wesleyschlemmer.com` (or `staging.wesleyschlemmer.com` first) with worldview, projects, and contact path — peer inbound channel opens. Legacy `crossthebridge.io` site stays untouched (separate domain, separate concern).

**Depends on**: Nothing (first phase)

**Pre-build gates** (must complete before scaffolding — surface as prerequisites in plan-phase, not as separate plans):
- **Content inventory**: list publishable vault essays/notes. If <5 publishable essays, commit Phase 2 to Notes-only. — *Resolved during execution*
- **Worldview copy reviewed**: ≤150 words above the fold; toned-down voice locked (D-01). — *Resolved 2026-04-25*
- **Palette decision**: cream/charcoal/green/gold carried forward. — *Resolved 2026-04-25 (D-10)*
- **Domain decision**: `wesleyschlemmer.com` apex (NEW, post-pivot 2026-04-27); legacy `crossthebridge.io` untouched. — *Resolved 2026-04-27 (D-20)*

**Deploy strategy**: Phase 1 ships to `staging.wesleyschlemmer.com` for pre-launch verification, then cuts over to apex `wesleyschlemmer.com`. The legacy single-page consulting site at `crossthebridge.io` stays serving its own apex (separate Vercel project, separate domain, NOT part of this project's cutover).

**Requirements**: IDENT-01, IDENT-02, IDENT-03, IDENT-04, IDENT-05, IDENT-06, PROJ-01, PROJ-02, PROJ-04, PROJ-05, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, PRIV-01, PRIV-02, PRIV-03, PRIV-04, A11Y-01, A11Y-02, A11Y-03, INFRA-01, INFRA-02, INFRA-03, INFRA-04

**Success Criteria** (what must be TRUE):
  1. A peer landing on the homepage can name what Wesley does and reach a project page they care about within 30 seconds, without seeing a consulting CTA on the personal hub
  2. Visitor can navigate from homepage → all 3 project pages (Bitcoin Bay, FBBA, Cross The Bridge teaser) → About → Contact on both desktop and a phone (mobile nav works <768px), and reach a `/colophon` page documenting the no-tracking stance
  3. New site is publicly reachable at `staging.wesleyschlemmer.com` (and after cutover, at the apex `wesleyschlemmer.com`); the legacy `crossthebridge.io` site continues serving at its own apex untouched
  4. Pasting any page URL into Discord/Telegram/X renders a rich preview (OG title, description, image); Google Rich Results Test validates JSON-LD on home, About, and at least one project page
  5. Network audit on first paint shows ≤1 third-party domain contacted (Umami host only — no Google Fonts, no GA, no Vercel Web Analytics, no third-party iframes); Lighthouse Accessibility ≥95 on home, About, and project pages

**Plans**: 10 plans + small follow-on
- [x] 01-01-PLAN.md — Scaffold Astro 6 + Tailwind v4 + Vercel static + vercel.json + .env.example
- [x] 01-02-PLAN.md — Astro Fonts API (Playfair + Inter) + Tailwind v4 @theme block (light + dark tokens)
- [x] 01-03-PLAN.md — BaseSEO + JsonLd components, robots.txt, llms.txt, OG image, favicon
- [x] 01-04-PLAN.md — D-14 Umami hosting decision (P0 checkpoint) + decision document
- [x] 01-05-PLAN.md — Component primitives: Hero, CtaButton, Tile, Headshot, ObfuscatedMailto, ExternalLink + consulting-url helper
- [x] 01-06-PLAN.md — BaseLayout + Nav (mobile drawer, full a11y) + Footer
- [x] 01-07-PLAN.md — Homepage (Hero + 4-tile grid: 3 projects + 1 thesis card) + custom 404
- [ ] 01-08-PLAN.md — About page (h-card, headshot, thesis + bio fused per D-08) — *drafts pending Wesley review*
- [ ] 01-09-PLAN.md — 3 project pages (Bitcoin Bay, FBBA, Cross The Bridge teaser) + Contact + Colophon — *to be revised post-pivot via /gsd-plan-phase*
- [ ] 01-10-PLAN.md — CI workflow + Playwright network audit + Vercel/DNS setup + launch checklist — *Vercel project + DNS now point to wesleyschlemmer.com per D-20*
- [ ] **01-11-PLAN.md (NEW)** — Domain-constants follow-up: swap hardcoded `crossthebridge.io` references in built code (Person `@id`, robots.txt sitemap line, `astro.config.mjs` site, `.env.example` PUBLIC_SITE_URL, llms.txt H1+URLs) to `wesleyschlemmer.com` per D-20

### Phase 2: Writing Surface
**Goal**: On-site essays and notes are live with RSS and cross-collection linking — peer audience can subscribe in NetNewsWire/Reeder, and the homepage gains a curated "Recent writing" module pulling from the new collections

**Depends on**: Phase 1

**Requirements**: WRITE-01, WRITE-02, WRITE-03, WRITE-04, WRITE-05, WRITE-06, WRITE-07, SEO-06

**Success Criteria** (what must be TRUE):
  1. Visitor can read the `/writing` hub, browse `/essays` and `/notes` indexes, and read at least 2–3 seed essays at launch (no empty surface) plus the notes route exists even if sparse
  2. Visitor can subscribe to combined and per-collection RSS feeds; the feed validates at validator.w3.org/feed/ and renders correctly when added to NetNewsWire/Reeder
  3. Reading any essay or note, the visitor sees a "Related" block at the page footer (driven by `related: [slug]` frontmatter) and can follow tag chips to a `/topics/[tag]` page that shows all content for that tag across collections
  4. Homepage shows a "Recent writing" module pulling latest items from essays + notes (NOT a "Latest blog" widget — library mode, curated, no staleness signal)
  5. Pre-launch internal-link audit confirms every essay/note/project page has ≥2 outbound internal links (no content silos); h-card on About, h-entry on essays/notes, h-feed on indexes are present and validate at indiewebify.me

**Plans**: TBD

**UI hint**: yes

## Future Projects

### CTB Brand Site (separate /gsd-new-project initiative)

The Cross The Bridge consulting work — `/consulting` hub, Bitcoin / Privacy / AI themed sub-pages, Petros + AYLIP product framing — was originally scoped as Phase 3 of this project. The 2026-04-27 pivot moved it OUT to its own future project: building the CTB brand site at `crossthebridge.io` (which currently serves the legacy single-page consulting site). Trigger: kicked off when Wesley is ready to retire the legacy site and replace it with the new CTB brand site.

**Seed input:** `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md` (Wesley's 2026-04-26 handwritten redesign notes, transcribed)

**Out of scope for this project** (`wesleyschlemmer.com`). This roadmap does not plan, requirement, or schedule that work.

### v1.x — Discovery Surface (deferred)

Tracked but not in active roadmap. Trigger-driven; built proportional to content volume. Includes Pagefind search (≥10 essays/notes), dynamic per-essay OG images via Satori (≥5 essays), webmention receiver (first inbound), Buttondown newsletter (3–4 essays live), `/now`, `/uses`, `/press`. See REQUIREMENTS.md v2 section for the full list.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Personal Surface | 7/11 | In progress (paused for pivot replan) | - |
| 2. Writing Surface | 0/TBD | Not started | - |

---
*Roadmap originally created: 2026-04-25 (then titled "crossthebridge.io Personal Site Overhaul" with 3 phases including Consulting Subsection)*
*Repointed 2026-04-27: pivoted to wesleyschlemmer.com personal hub; Phase 3 Consulting Subsection moved out as separate future project (CTB Brand Site)*
*Granularity: coarse (2 v1 phases; CTB Brand Site as future project; v1.x Discovery Surface deferred)*
