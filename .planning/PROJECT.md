# crossthebridge.io — Personal Site Overhaul

## What This Is

A personal portfolio site for Wesley Schlemmer at `crossthebridge.io`, replacing the current single-page CTB-Consulting marketing site. The new site frames Wesley's work under the "Freedom Tech" umbrella — open-source, Bitcoin, privacy, deGoogled phones, Linux, sovereign AI — with the *Cross The Bridge* worldview (opt out of legacy systems) toned-down but front and center. It surfaces four project areas (Bitcoin Bay, FBBA, Freedom Tech Consulting, AI / Petros / Hermes) plus a CTB Consulting subsection (paid AI-implementation work for Tampa Bay SMBs, the existing $499 / $1500+$250 / $3000+$500 offers) and hosts Wesley's writing as essays + notes. Audience: Freedom Tech / Bitcoin / FBBA peers AND CTB-paying clients, with clients routed to dedicated subpages or a subdomain.

## Core Value

**Inbound opportunities.** The site exists so the right people — podcast bookers, peers in BTC/freedom-tech circles, partnership and speaking invites, aligned consulting clients — find Wesley, understand the work, and reach out. Every other capability serves this. If essays don't ship but inbound flows, the site works. If essays ship and inbound dries, it doesn't.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Personal homepage that leads with worldview + identity (toned-down Polaris doctrine), routes to projects, and surfaces a clear way to make contact
- [ ] Project showcase sections for Bitcoin Bay, FBBA, Freedom Tech Consulting, and AI / Petros / Hermes — each communicating what it is, why it exists, and how to engage
- [ ] CTB Consulting subsection (subpage or subdomain) preserving the current paid-services offer and Motion booking flow
- [ ] Writing surface: long-form essays + shorter notes, hosted on the site (not just linked out)
- [ ] About page that uses the existing About Me + Polaris docs as source material
- [ ] Contact path that produces measurable inbound (form, email, or routed CTAs — TBD in design phase)
- [ ] SEO + AI-search readiness: meta tags, OG, canonical, sitemap, robots.txt, llms.txt, JSON-LD schema (Person, Organization, Article)
- [ ] Privacy-respecting analytics so we can measure inbound without surveilling visitors (no GA4 by default)
- [ ] Mobile-responsive with working navigation (current site has hidden nav and no hamburger fallback)
- [ ] Accessibility baseline (alt text, ARIA labels, skip-to-main, keyboard nav)

### Out of Scope

- **Loud worldview / manifesto-as-homepage** — Wesley wants Polaris front-and-center but *toned down*; the current Polaris doctrine document stays in vault as source material, the site distills it
- **Hosting writing externally only** — explicitly chose to host essays + notes on-site rather than linking out to Substack / X / Nostr
- **CTB consulting moves to its own brand** — stays under crossthebridge.io as one section, just architected so it doesn't compete with the personal/portfolio surface
- **Heavy analytics / pixel tracking** — Wesley's worldview is anti-surveillance; GA4 / Meta Pixel / etc. are out
- **Daily-log / lifestream content** — writing is essays + curated notes, not a public daily journal

## Context

**Current site:** Single hand-rolled `index.html` (~27 KB, ~1100 lines of inline CSS), deployed to Vercel from `crossthebridgetpa/ctb-website` `main`. Last meaningful commit 2026-03-26. Most commits signed by "Peter (CTB Agent)" — automated. Design is intentional (cream / charcoal / green / gold, Playfair + Inter). Single-page hash-anchor architecture: hero → how it works → who it's for → pricing → founder → CTA to Motion booking. Headline: *"AI That Finally Works For Your Business."*

**Existing weaknesses inherited from the current site:**
- No meta description, OG tags, canonical, robots.txt, sitemap.xml, llms.txt, or JSON-LD schema — invisible to search and AI assistants
- Orphaned form-handler JS in `script.js:44-80` referencing nonexistent DOM elements
- Unused `styles.css` (~1336 lines, different palette) sitting in the repo, not loaded by any page
- Mobile nav is hidden under 768px with no hamburger replacement
- Single 95 KB JPG headshot, no WebP / srcset / lazy-loading
- No CI / staging — auto-deploys from `main` on every push

**Source material to draw from:**
- `~/.hermes/vault/people/About Me.md` — Wesley's voice, style ("everything everywhere all at once"), likes / dislikes, goals ("Live free or Die, while building a family legacy"), worldview ("A Great Bifurcation")
- `~/.hermes/vault/projects/petros/petros-polaris.md` — the Cross The Bridge doctrine: Money / Data / Infrastructure pillars, Petros as sovereign-stack foundation, AYLIP as the product
- `~/projects/CTB-Proposal.pdf`, `CTB-Audit-Plan.pdf`, `CTB-Marketing-Setup-Guides.pdf` — existing CTB deliverables that inform the consulting subsection

**Wesley's relevant preferences (from About Me):**
- Concise, competent, proactive collaboration — anticipate next steps
- Strategic / overview thinker; weak on small details — needs systems that surface what matters
- Anti-bureaucracy, anti-KYC, anti-biometric capture, anti-surveillance — informs analytics, comments, contact-form choices
- Multi-project, asynchronous workstyle — prefers tooling that doesn't require sustained attention

**Operational reality:** Wesley's working with me (Claude Code) on this. No additional team. Work happens in bursts. Auto-deploy already wired, so any framework choice has to be Vercel-friendly.

## Constraints

- **Hosting:** Vercel (current setup, no reason to migrate) — framework choice must deploy cleanly to Vercel
- **Domain:** `crossthebridge.io` is the apex; current redirect `crossthebridge.io` → `www.crossthebridge.io` (307). Subdomain reserved as an option for the CTB Consulting branch (e.g., `consulting.crossthebridge.io`) if subpages prove insufficient
- **Booking flow:** Motion link `app.usemotion.com/meet/crossthebridge/intro?d=15` is the working booking primitive — preserve it for the consulting subsection
- **Repo:** stays at `crossthebridgetpa/ctb-website` (rename if it becomes a portfolio brand decision later — out of scope for v1)
- **Writing tooling:** must support markdown authoring locally (Wesley writes notes in his vault); whatever framework we choose needs a content collection that imports from markdown without ceremony
- **Privacy:** no GA4, no Meta Pixel, no third-party fonts that proxy data without consent (current site uses Google Fonts CDN — TBD whether to self-host fonts in v1)
- **Authorship transparency:** commits will continue as a mix of Wesley + Claude Code; Peter (CTB Agent) is upstream of this site no longer

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Pivot from single-page CTB marketing site to personal portfolio | Wesley's work is broader than CTB-AI-implementation; current site can't surface BB / FBBA / Petros without dilution | — Pending |
| Worldview "front and center but toned down" | Self-selects aligned audience, repels mismatches, but doesn't preach to the wrong room | — Pending |
| Freedom Tech as the umbrella concept | "Freedom Tech Consulting is the idea of what we're working on" — open source, BTC, deGoogled phones, privacy, Linux, AI; CTB-AI-implementation sits underneath as one specialty | — Pending |
| CTB Consulting stays on this site as a section/subpath (subdomain optional) | Preserve current conversion path for paying clients without putting consulting CTAs on the personal homepage | — Pending |
| Host writing on-site (essays + notes), not link-out | Owned-channel for ideas; reinforces inbound goal; keeps content under Wesley's control | — Pending |
| Privacy-respecting analytics only | Worldview alignment — measuring inbound shouldn't require surveilling visitors | — Pending |
| Tech stack: TBD in research phase | Static-HTML simplicity has merit; framework (Astro / 11ty / Next) needed for content collections; defer until research | — Pending |
| Visual identity: TBD in design phase | Current cream/charcoal/green/gold may carry forward, may not — decide once IA is settled | — Pending |

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
*Last updated: 2026-04-25 after initialization*
