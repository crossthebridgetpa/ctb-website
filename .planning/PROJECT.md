# wesleyschlemmer.com — Personal Hub

## What This Is

A personal hub site for Wesley Schlemmer at `wesleyschlemmer.com` — Wesley-the-person, separate from Cross-The-Bridge-the-brand. The hub leads with worldview (toned-down Freedom Tech: Bitcoin, privacy, sovereign AI, opt-out-without-going-off-grid), introduces three project areas (Bitcoin Bay, FBBA, Cross The Bridge), hosts Wesley's writing as essays + notes, and routes inbound to the right destination — peer / podcast / partnership conversations land here, paying CTB-consulting clients route externally to the CTB brand site at `crossthebridge.io`. Audience: Freedom Tech / Bitcoin / FBBA peers.

**Repo:** stays at `crossthebridgetpa/ctb-website` (rename out of scope for v1; deployed product domain doesn't have to match the repo name).

**Domain split (architectural):**
- `wesleyschlemmer.com` — THIS project. The personal hub. Wesley-the-person.
- `crossthebridge.io` — The CTB brand site (consulting hub + Bitcoin / Privacy / AI sub-pages, Petros + AYLIP framing). **Currently** serves the legacy single-page consulting site untouched. **Future project** (a separate `/gsd-new-project` initiative) builds the new CTB brand site there. Until that project ships, the third project tile on this hub deeplinks to the legacy `crossthebridge.io` page; after, it deeplinks to the new CTB hub.
- `getpetros.com` — Wesley owns. Reserved as a future migration target for the consulting/Petros work IF the CTB brand site grows into a productized AYLIP/Petros offering. Out of scope for v1.

## Core Value

**Inbound opportunities.** The site exists so the right people — podcast bookers, peers in BTC/freedom-tech circles, partnership and speaking invites — find Wesley, understand the work, and reach out. Every other capability serves this. If essays don't ship but inbound flows, the site works. If essays ship and inbound dries, it doesn't.

The CTB consulting funnel (paying clients → Motion booking) lives on the separate CTB brand site at `crossthebridge.io`, not on the personal hub. The personal hub does the discovery work; the brand site closes the deal.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Personal homepage that leads with worldview + identity (toned-down Polaris doctrine), routes to projects, and surfaces a clear way to make contact
- [ ] Project showcase pages for **Bitcoin Bay**, **FBBA**, and **Cross The Bridge** (the third tile is a teaser/positioning page that deeplinks externally to `crossthebridge.io` — the actual CTB brand site is built in a separate future project)
- [ ] Writing surface: long-form essays + shorter notes, hosted on the site (not just linked out)
- [ ] About page that uses the existing About Me + Polaris docs as source material
- [ ] Contact path that produces measurable inbound (obfuscated mailto chosen — no form, no backend)
- [ ] SEO + AI-search readiness: meta tags, OG, canonical, sitemap, robots.txt, llms.txt, JSON-LD schema (Person, WebSite, Article)
- [ ] Privacy-respecting analytics so we can measure inbound without surveilling visitors (no GA4 by default — self-hosted Umami chosen)
- [ ] Mobile-responsive with working navigation
- [ ] Accessibility baseline (alt text, ARIA labels, skip-to-main, keyboard nav)

### Out of Scope

- **CTB consulting hub + Bitcoin/Privacy/AI sub-pages** — moved to a separate future project (the CTB brand site at `crossthebridge.io`). Today's redesign notes (`~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md`) are the seed input for that future project. NOT shipped on `wesleyschlemmer.com`.
- **Loud worldview / manifesto-as-homepage** — Wesley wants Polaris front-and-center but *toned down*; the current Polaris doctrine document stays in vault as source material, the site distills it
- **Hosting writing externally only** — explicitly chose to host essays + notes on-site rather than linking out to Substack / X / Nostr
- **Heavy analytics / pixel tracking** — Wesley's worldview is anti-surveillance; GA4 / Meta Pixel / Vercel Web Analytics are out
- **Daily-log / lifestream content** — writing is essays + curated notes, not a public daily journal
- **Hero portrait / homepage headshot** — homepage stays text-forward; headshot lives on About only

## Context

**Where we are (2026-04-27):** Phase 1 is 70% executed against the original `crossthebridge.io overhaul` framing — 7 of 10 plans complete, 1 plan (01-08 About) drafted and pending Wesley review. Today's reframe pivots the project from `crossthebridge.io` → `wesleyschlemmer.com`. Most built code is domain-agnostic; ~5 hardcoded constants (Person `@id`, robots.txt sitemap line, `astro.config.mjs` site, `.env.example` PUBLIC_SITE_URL, llms.txt H1+URLs) need updating in a small follow-up plan.

**Current legacy state at `crossthebridge.io`:** Single hand-rolled `index.html` (~1100 lines inline CSS), deployed to Vercel from `crossthebridgetpa/ctb-website` `main`. Last meaningful commit 2026-03-26. **In the new architecture this site stays running** — it's the legacy version of what the future CTB brand site will replace. NOT this project's concern; this project ships to `wesleyschlemmer.com` instead.

**Existing weaknesses inherited from the legacy crossthebridge.io site (relevant only when the future CTB brand site project takes them on):**
- No meta description, OG tags, canonical, robots.txt, sitemap.xml, llms.txt, JSON-LD schema
- Orphaned form-handler JS in `script.js:44-80`
- Unused `styles.css` (~1336 lines)
- Mobile nav hidden under 768px with no hamburger
- No CI / staging — auto-deploys from `main`

**Source material to draw from:**
- `~/.hermes/vault/people/About Me.md` — Wesley's voice, style, goals, "Great Bifurcation" framing
- `~/.hermes/vault/projects/petros/petros-polaris.md` — Cross The Bridge doctrine: Money / Data / Infrastructure pillars, Petros/AYLIP framing
- `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md` — Wesley's 2026-04-26 handwritten redesign sketch (transcribed). Seed input for the **future CTB brand-site project**, NOT this Phase 1.

**Wesley's relevant preferences (from About Me):**
- Concise, competent, proactive collaboration — anticipate next steps
- Strategic / overview thinker; weak on small details — needs systems that surface what matters
- Anti-bureaucracy, anti-KYC, anti-biometric capture, anti-surveillance — informs analytics, comments, contact-form choices
- Multi-project, asynchronous workstyle — prefers tooling that doesn't require sustained attention

**Operational reality:** Wesley's working with Claude Code on this. No additional team. Work happens in bursts. Auto-deploy already wired, so any framework choice has to be Vercel-friendly.

## Constraints

- **Hosting:** Vercel — framework choice deploys cleanly to Vercel
- **Domains:**
  - `wesleyschlemmer.com` — apex for THIS project's deploy. Wesley owns it.
  - `crossthebridge.io` — apex serves the legacy single-page consulting site **untouched** through this project's launch and beyond. Future CTB brand-site project replaces the legacy site. Wesley owns it.
  - `getpetros.com` — owned, reserved as a deferred migration target for the CTB brand site if AYLIP/Petros productization warrants. Not in v1.
- **Booking flow (CTB consulting):** Motion link `app.usemotion.com/meet/crossthebridge/intro?d=15` is the working booking primitive — preserved on the legacy `crossthebridge.io` site (not on `wesleyschlemmer.com`)
- **Repo:** stays at `crossthebridgetpa/ctb-website` (deployed product domain doesn't have to match the repo name)
- **Writing tooling:** must support markdown authoring locally (Wesley writes notes in his vault); content collection imports markdown without ceremony
- **Privacy:** no GA4, no Meta Pixel, no Vercel Web Analytics, no third-party fonts that proxy data without consent — self-hosted Playfair + Inter via Astro Fonts API, self-hosted Umami for analytics
- **Authorship transparency:** commits will continue as a mix of Wesley + Claude Code; Peter (CTB Agent) is upstream of this site no longer

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| **Domain split — wesleyschlemmer.com = personal hub, crossthebridge.io = CTB brand site (future project)** | Solves the recursion ("Cross The Bridge" tile inside a site called Cross The Bridge) and gives the CTB consulting work room to grow as its own brand. wesleyschlemmer.com is Wesley-the-person; crossthebridge.io is CTB-the-brand. | **Decided 2026-04-27 during /gsd-discuss-phase 01 (D-20)** |
| Pivot from single-page CTB marketing site to personal hub at wesleyschlemmer.com | Wesley's work is broader than CTB-AI-implementation; the personal-hub framing lets Bitcoin Bay / FBBA / CTB sit as peers, with the deeper CTB work owned by the separate brand-site project. | Decided |
| Worldview "front and center but toned down" | Self-selects aligned audience, repels mismatches, but doesn't preach to the wrong room | Decided |
| Freedom Tech as the umbrella concept | Open source, BTC, deGoogled phones, privacy, Linux, sovereign AI — sits underneath Wesley's identity, not as a project-tile distinct from CTB | Decided |
| **Third project tile = "Cross The Bridge"** (with content from the redesign notes — sovereignty as a service, fourth-turning, old-to-new framing). Page is a teaser; CTA links externally to `https://crossthebridge.io` | "AI / Petros / Hermes" was the original framing; the redesign notes reframe as "CTB Consulting"; the pivot makes "Cross The Bridge" coherent as a project tile under Wesley's hub. AYLIP/Petros detail moves with this tile to the future CTB brand site. | **Decided 2026-04-27 (revises D-03, D-05)** |
| Host writing on-site (essays + notes), not link-out | Owned-channel for ideas; reinforces inbound goal; keeps content under Wesley's control | Decided |
| Privacy-respecting analytics only — self-hosted Umami on existing VPS | Worldview alignment — measuring inbound shouldn't require surveilling visitors. Endpoint: `https://umami.crossthebridge.io` (decided pre-pivot; the host can stay on the CTB DNS zone since Wesley owns both, OR move to `umami.wesleyschlemmer.com` in a follow-up) | Decided (D-14, host pending follow-up) |
| Tech stack: Astro 6 + Tailwind v4 + plain Markdown content collections + `@astrojs/vercel` static adapter | Static-first, near-zero JS, content-collection-native, deploys cleanly to Vercel; aligns with anti-surveillance posture (no JS runtime overhead, no third-party SaaS dependencies) | Decided (D-17) |
| Visual identity: cream/charcoal/green/gold palette, Playfair + Inter | Carry forward from legacy site with WCAG AA contrast tweaks; type pairing self-hosted via Astro Fonts API | Decided (D-10, D-11) |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-27 — wesleyschlemmer.com pivot captured during Phase 1 discuss-phase mid-execution. Original initialization: 2026-04-25.*
