# Requirements: crossthebridge.io Personal Site Overhaul

**Defined:** 2026-04-25
**Core Value:** Inbound opportunities — the right people find Wesley, understand the work, and reach out

## v1 Requirements

Requirements for the initial launch. Mapped to roadmap phases (Phases 1–3).

### Identity

- [ ] **IDENT-01**: Homepage leads with one toned-down worldview claim (≤150 words above the fold) framing the Cross The Bridge / Freedom Tech umbrella
- [ ] **IDENT-02**: Homepage shows 4 project cards (Bitcoin Bay, FBBA, Freedom Tech Consulting, AI/Petros/Hermes) routing to dedicated project pages
- [ ] **IDENT-03**: Homepage shows a single "get in touch" CTA — no consulting/booking CTA on the personal homepage
- [ ] **IDENT-04**: Visitor can reach an About page sourced from the vault (`About Me.md` + Polaris distillation) telling Wesley's story, style, and goals
- [ ] **IDENT-05**: Visitor can reach a Contact page with at least one working inbound channel (email link or form — choice resolved in design)
- [ ] **IDENT-06**: Visitor can reach a `/colophon` page documenting the tech stack, no-tracking stance, and credits

### Projects

- [ ] **PROJ-01**: Visitor can read a Bitcoin Bay project page covering what it is, why it exists, and how to engage (event link, signup, etc.)
- [ ] **PROJ-02**: Visitor can read an FBBA project page covering what it is, who it serves, and how to engage
- [ ] **PROJ-03**: Visitor can read a Freedom Tech Consulting project page framing the umbrella concept (BTC, deGoogled phones, privacy, Linux, sovereign AI)
- [ ] **PROJ-04**: Visitor can read an AI / Petros / Hermes project page covering Hermes, AYLIP vision, and current status
- [ ] **PROJ-05**: Each project page surfaces at least one specific way to engage (link, contact path, or follow-on resource)

### Writing

- [ ] **WRITE-01**: Visitor can read a `/writing` hub showing recent essays + notes
- [ ] **WRITE-02**: Visitor can read at least 2–3 seed essays at launch (no empty surface)
- [ ] **WRITE-03**: Visitor can read a `/notes` index of shorter notes (may launch sparse — route exists)
- [ ] **WRITE-04**: Each essay and note is authored as plain Markdown in an Astro content collection (essays + notes as distinct collections with distinct schemas)
- [ ] **WRITE-05**: Visitor can subscribe to an RSS feed (combined + per-collection); feed validates at W3C feed validator and renders in NetNewsWire/Reeder
- [ ] **WRITE-06**: Each essay/note can declare `related: [slug]` frontmatter that surfaces a "Related" block at the bottom of the page
- [ ] **WRITE-07**: Visitor can browse a `/topics/[tag]` page showing all content for any tag used in frontmatter

### Consulting

- [ ] **CONS-01**: Visitor can reach a `/consulting` hub describing the CTB Consulting offer (AI implementation for Tampa SMBs)
- [ ] **CONS-02**: Visitor can read 3 service pages preserving the current $499 audit / $1500+$250 starter / $3000+$500 full-implementation offers
- [ ] **CONS-03**: Visitor can book a discovery call via the existing Motion link (`app.usemotion.com/meet/crossthebridge/intro?d=15`) rendered as link-out, not iframe
- [ ] **CONS-04**: All `/consulting/*` routes render through `ConsultingLayout` (services/case-studies/book nav + persistent Motion CTA), not `BaseLayout`
- [ ] **CONS-05**: A single neutral cross-link from personal About/Contact routes visitors to `/consulting`; no consulting CTAs in personal body copy

### SEO + AI Search

- [ ] **SEO-01**: Every page renders meta description, OG title/description/image, and canonical URL via a shared `BaseSEO.astro` component baked into every layout
- [ ] **SEO-02**: Every page renders appropriate JSON-LD via a shared `JsonLd.astro` component (Person on About, WebSite on home, BlogPosting on essays, Service on consulting pages)
- [ ] **SEO-03**: Site exposes a valid `sitemap.xml` (via `@astrojs/sitemap`)
- [ ] **SEO-04**: Site exposes a `robots.txt` permitting all crawlers and referencing the sitemap
- [ ] **SEO-05**: Site exposes a curated `llms.txt` summarizing site structure and content for AI crawlers
- [ ] **SEO-06**: Every page emits IndieWeb microformats (h-card on About, h-entry on essays/notes, h-feed on indexes)

### Privacy

- [ ] **PRIV-01**: Site self-hosts Playfair Display + Inter fonts via the Astro Fonts API (no Google Fonts CDN request from any page)
- [ ] **PRIV-02**: Site uses Plausible Cloud (EU) for analytics (no GA4, no Vercel Web Analytics, no Meta Pixel)
- [ ] **PRIV-03**: Site loads no third-party media iframes on first paint (no YouTube, X, Disqus, reCAPTCHA)
- [ ] **PRIV-04**: A pre-launch network audit confirms ≤1 third-party domain is contacted on first paint (Plausible only)

### Accessibility + Mobile

- [ ] **A11Y-01**: Mobile nav works on viewports <768px (hamburger toggle replaces the current site's hidden menu)
- [ ] **A11Y-02**: Site meets WCAG 2.2 AA baseline (color contrast, alt text on all images, ARIA labels on icon buttons, skip-to-main link, keyboard navigability for all interactive elements)
- [ ] **A11Y-03**: Site renders dark + light modes respecting `prefers-color-scheme` (no manual toggle required for v1)
- [ ] **A11Y-04**: Lighthouse Accessibility score ≥95 on home, About, project pages, essay pages, consulting pages

### Infrastructure

- [ ] **INFRA-01**: Site is built with Astro 6 + Tailwind v4 (via `@tailwindcss/vite`, NOT `@astrojs/tailwind`) deployed to Vercel via `@astrojs/vercel` static adapter
- [ ] **INFRA-02**: Repo CI runs `astro check && astro build` on every PR; merge to `main` blocked on green
- [ ] **INFRA-03**: Vercel preview deploys are wired for every PR (no direct-to-prod auto-deploy from `main` without preview)
- [ ] **INFRA-04**: Repo retains current `crossthebridgetpa/ctb-website` location (no rename in v1)
- [ ] **INFRA-05**: Existing `index.html` / `script.js` / `styles.css` from the old site are removed once the Astro build is live (no orphan files)

## v2 Requirements

Deferred to a future milestone. Acknowledged but not in current roadmap.

### Discovery

- **DISC-01**: Visitor can search all content via Pagefind (trigger: ≥10 essays/notes published)
- **DISC-02**: Each essay renders a dynamic OG image generated via Satori (trigger: ≥5 essays published)
- **DISC-03**: Visitor sees `RelatedContent` driven by inverse relations ("essays mentioning this project")

### Audience-building

- **AUD-01**: Visitor can subscribe to a newsletter via Buttondown (trigger: 3–4 essays live)
- **AUD-02**: Visitor can read a `/now` page documenting current focus
- **AUD-03**: Visitor can browse a `/uses` page documenting Wesley's hardware/software stack
- **AUD-04**: Visitor can access a `/press` media kit (trigger: first podcast inbound)

### IndieWeb extensions

- **WEB-01**: Site receives webmentions via webmention.io and renders them on essay pages (trigger: first inbound webmention)
- **WEB-02**: Site sends webmentions for outbound links

## Out of Scope

Explicitly excluded for v1 and beyond unless reconsidered. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| GA4 / Meta Pixel / Vercel Web Analytics | Anti-surveillance worldview; Plausible covers the inbound-measurement need |
| Disqus / Hyvor Talk / any embedded comment service | Engagement-bait + tracking + JS bloat; webmentions cover signal |
| Google reCAPTCHA on any form | Tracking + Google dependency contradicts worldview |
| Newsletter popups / exit-intent modals | Engagement-bait misaligned with audience |
| YouTube / X / Twitter iframes loading on first paint | Third-party tracking + JS bloat; lite-embed or static cards if needed |
| Social-login (Google / GitHub / X) for any feature | No login feature exists in v1; aligns with anti-Google |
| "As seen on" homepage logo wall | Confidence-laundering; out of step with worldview tone |
| Push notifications | Engagement-bait |
| Live chat / Intercom-style widgets | JS bloat + tracking |
| AI-generated hero / illustration imagery | Worldview alignment — Wesley builds AI, doesn't ornament with it |
| View counters / like buttons | Vanity-metric driven design |
| Daily-log / lifestream public journal | Out-of-scope per PROJECT.md (essays + notes only, not lifestream) |
| Hosting writing externally (Substack / Mirror / etc.) | Explicitly chose owned-channel on-site hosting |
| Loud-doctrine homepage / manifesto-as-homepage | Worldview must be toned down per Wesley's direction |
| Subdomain for `/consulting` (e.g., consulting.crossthebridge.io) | Subpath chosen for v1; subdomain is a v2+ option if consulting spins out as separate brand |
| CTB consulting moves off this domain | Stays as a section per Wesley's direction |
| Manual dark-mode toggle | `prefers-color-scheme` only for v1; manual toggle adds JS state without value |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| IDENT-01 | Phase 1 | Pending |
| IDENT-02 | Phase 1 | Pending |
| IDENT-03 | Phase 1 | Pending |
| IDENT-04 | Phase 1 | Pending |
| IDENT-05 | Phase 1 | Pending |
| IDENT-06 | Phase 1 | Pending |
| PROJ-01 | Phase 1 | Pending |
| PROJ-02 | Phase 1 | Pending |
| PROJ-03 | Phase 1 | Pending |
| PROJ-04 | Phase 1 | Pending |
| PROJ-05 | Phase 1 | Pending |
| WRITE-01 | Phase 2 | Pending |
| WRITE-02 | Phase 2 | Pending |
| WRITE-03 | Phase 2 | Pending |
| WRITE-04 | Phase 2 | Pending |
| WRITE-05 | Phase 2 | Pending |
| WRITE-06 | Phase 2 | Pending |
| WRITE-07 | Phase 2 | Pending |
| CONS-01 | Phase 3 | Pending |
| CONS-02 | Phase 3 | Pending |
| CONS-03 | Phase 3 | Pending |
| CONS-04 | Phase 3 | Pending |
| CONS-05 | Phase 3 | Pending |
| SEO-01 | Phase 1 | Pending |
| SEO-02 | Phase 1 | Pending |
| SEO-03 | Phase 1 | Pending |
| SEO-04 | Phase 1 | Pending |
| SEO-05 | Phase 1 | Pending |
| SEO-06 | Phase 2 | Pending |
| PRIV-01 | Phase 1 | Pending |
| PRIV-02 | Phase 1 | Pending |
| PRIV-03 | Phase 1 | Pending |
| PRIV-04 | Phase 3 | Pending |
| A11Y-01 | Phase 1 | Pending |
| A11Y-02 | Phase 1 | Pending |
| A11Y-03 | Phase 1 | Pending |
| A11Y-04 | Phase 3 | Pending |
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-03 | Phase 1 | Pending |
| INFRA-04 | Phase 1 | Pending |
| INFRA-05 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 41 total
- Mapped to phases: 41
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-25*
*Last updated: 2026-04-25 after initial definition*
