# Roadmap: crossthebridge.io Personal Site Overhaul

## Overview

Replace the current single-page CTB-Consulting marketing site with a worldview-anchored personal portfolio that surfaces Wesley's Freedom Tech work (Bitcoin Bay, FBBA, Freedom Tech Consulting, AI/Petros/Hermes), hosts his writing on-site, and preserves the existing CTB Consulting offer as a self-contained subsection. v1 ships in three phases: Foundation + Personal Surface (Phase 1) lights up the inbound channel for peer audiences without disturbing the live consulting offer; Writing Surface (Phase 2) layers essays and notes onto the established foundation; Consulting Subsection (Phase 3) replaces the existing `index.html` with a dedicated `/consulting` subpath, retiring the old single-page site. A v2 milestone (Discovery Surface — search, dynamic OG, webmentions, newsletter) is parked until content volume justifies it.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (1.1, 2.1): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation + Personal Surface** - Astro 6 site live at staging URL with worldview homepage, About, Contact, 4 project pages, SEO/privacy infrastructure baked in
- [ ] **Phase 2: Writing Surface** - Essays + notes shipping with RSS, related-content cross-linking, topic pages; homepage gains a "Recent writing" module
- [ ] **Phase 3: Consulting Subsection** - `/consulting` hub + 3 service pages with `ConsultingLayout`; new site cuts over to apex; old `index.html` retired

## Phase Details

### Phase 1: Foundation + Personal Surface
**Goal**: Personal portfolio is live (on staging URL or `/v2` path) with worldview, projects, and contact path — peer inbound channel opens without taking down the existing consulting offer

**Depends on**: Nothing (first phase)

**Pre-build gates** (must complete before scaffolding — surface as prerequisites in plan-phase, not as separate plans):
- **Content inventory**: list publishable vault essays/notes. If <5 publishable essays, commit Phase 2 to Notes-only.
- **IA decision documented**: subpath confirmed (no subdomain for `/consulting` in v1); two-front-door pattern locked.
- **Worldview copy reviewed**: ≤150 words above the fold; tested with 1 peer + 1 non-peer reader.
- **Palette decision**: carry forward cream/charcoal/green/gold or commit to a successor (recommendation: carry forward with refinements).

**Deploy strategy**: Phase 1 ships to a non-apex surface (`staging.crossthebridge.io` subdomain or `/v2` path on Vercel) so the existing single-page consulting site at the apex continues serving paid clients until Phase 3 cuts over.

**Requirements**: IDENT-01, IDENT-02, IDENT-03, IDENT-04, IDENT-05, IDENT-06, PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, PRIV-01, PRIV-02, PRIV-03, A11Y-01, A11Y-02, A11Y-03, INFRA-01, INFRA-02, INFRA-03, INFRA-04

**Success Criteria** (what must be TRUE):
  1. A peer landing on the homepage can name what Wesley does and reach a project page they care about within 30 seconds, without seeing a consulting CTA
  2. Visitor can navigate from homepage → all 4 project pages → About → Contact on both desktop and a phone (mobile nav works <768px), and reach a `/colophon` page documenting the no-tracking stance
  3. New site is publicly reachable at a staging URL while the existing single-page consulting site continues serving paid clients at the apex
  4. Pasting any page URL into Discord/Telegram/X renders a rich preview (OG title, description, image); Google Rich Results Test validates JSON-LD on home, About, and at least one project page
  5. Network audit on first paint shows ≤1 third-party domain contacted (Plausible only — no Google Fonts, no GA, no third-party iframes); Lighthouse Accessibility ≥95 on home, About, and project pages

**Plans**: 10 plans
- [x] 01-01-PLAN.md — Scaffold Astro 6 + Tailwind v4 + Vercel static + vercel.json + .env.example
- [ ] 01-02-PLAN.md — Astro Fonts API (Playfair + Inter) + Tailwind v4 @theme block (light + dark tokens)
- [ ] 01-03-PLAN.md — BaseSEO + JsonLd components, robots.txt, llms.txt, OG image, favicon
- [ ] 01-04-PLAN.md — D-14 Umami hosting decision (P0 checkpoint) + decision document
- [ ] 01-05-PLAN.md — Component primitives: Hero, CtaButton, Tile, Headshot, ObfuscatedMailto, ExternalLink + consulting-url helper
- [ ] 01-06-PLAN.md — BaseLayout + Nav (mobile drawer, full a11y) + Footer
- [ ] 01-07-PLAN.md — Homepage (Hero + 4-tile grid) + custom 404
- [ ] 01-08-PLAN.md — About page (h-card, headshot, thesis + bio fused per D-08)
- [ ] 01-09-PLAN.md — 3 project pages (BB, FBBA, AI/Petros/Hermes) + Contact + Colophon
- [ ] 01-10-PLAN.md — CI workflow + Playwright network audit + Vercel/DNS setup + launch checklist

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

### Phase 3: Consulting Subsection
**Goal**: `/consulting` hub + 3 service pages preserve the existing $499/$1500+$250/$3000+$500 offers and Motion booking flow under a `ConsultingLayout`; new Astro site cuts over to the apex `crossthebridge.io` and the old `index.html`/`script.js`/`styles.css` are removed

**Depends on**: Phase 2

**Scope guard**: Phase 3 preserves the existing pricing tiers, service descriptions (drawn from CTB-Proposal/Audit-Plan/Marketing-Setup PDFs), and the Motion booking link `app.usemotion.com/meet/crossthebridge/intro?d=15` — no offer changes, no new pricing, no new booking primitive. This phase is a layout and routing change, not an offer redesign.

**Requirements**: CONS-01, CONS-02, CONS-03, CONS-04, CONS-05, A11Y-04, PRIV-04, INFRA-05

**Success Criteria** (what must be TRUE):
  1. Visitor can reach `/consulting` and read the three preserved service pages (audit / starter / full); pricing matches the current site exactly; Motion booking link is reachable as a link-out (not iframe) from each service page and the hub
  2. All `/consulting/*` routes render through `ConsultingLayout` (services / case studies / book nav + persistent Motion CTA) — visually distinct from the personal surface — with no Polaris/worldview content bleed into consulting pages
  3. A peer reading personal pages encounters a single neutral cross-link to `/consulting` (in About or Contact only); no consulting CTAs appear in personal homepage or essay body copy
  4. Cutover is complete: `crossthebridge.io` apex serves the new Astro build; the old `index.html`, `script.js`, and unused `styles.css` are removed from the repo; existing consulting clients can still book a discovery call without disruption
  5. Pre-launch verification: network audit on `/consulting/*` confirms ≤1 third-party domain on first paint (Motion link is link-out, not embedded); Lighthouse Accessibility ≥95 on home, About, project pages, essay pages, and consulting pages; JSON-LD Service schema validates on each service page

**Plans**: TBD

**UI hint**: yes

## Future Milestones

### v1.x — Discovery Surface (deferred)

Tracked but not in active roadmap. Trigger-driven; built proportional to content volume. Includes Pagefind search (≥10 essays/notes), dynamic per-essay OG images via Satori (≥5 essays), webmention receiver (first inbound), Buttondown newsletter (3–4 essays live), `/now`, `/uses`, `/press`. See REQUIREMENTS.md v2 section for the full list.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Personal Surface | 0/10 | Not started | - |
| 2. Writing Surface | 0/TBD | Not started | - |
| 3. Consulting Subsection | 0/TBD | Not started | - |

---
*Roadmap created: 2026-04-25*
*Granularity: coarse (3 v1 phases; v2 Discovery Surface tracked as future milestone)*
*Coverage: 41/41 v1 requirements mapped*
