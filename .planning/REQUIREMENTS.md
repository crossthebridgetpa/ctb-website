# Requirements: wesleyschlemmer.com Personal Hub

**Defined:** 2026-04-25 (original — for `crossthebridge.io overhaul` project)
**Repointed:** 2026-04-27 (pivot to `wesleyschlemmer.com` personal hub; Phase 3 Consulting Subsection moved to separate future project)
**Core Value:** Inbound opportunities — the right people find Wesley, understand the work, and reach out

## v1 Requirements

Requirements for the initial launch. Mapped to roadmap phases (Phase 1 + Phase 2).

### Identity

- [ ] **IDENT-01**: Homepage leads with one toned-down worldview claim (≤150 words above the fold) framing the Cross The Bridge / Freedom Tech umbrella. (D-01 hero copy locked.)
- [ ] **IDENT-02**: Homepage shows a 4-tile grid: 3 project cards (Bitcoin Bay, FBBA, Cross The Bridge) routing to dedicated project pages + 1 thesis card routing to About (per Phase 1 discussion: Freedom Tech is the thesis underneath the projects, not a fourth project)
- [ ] **IDENT-03**: Homepage shows a single "get in touch" CTA — no consulting/booking CTA on the personal hub homepage
- [ ] **IDENT-04**: Visitor can reach an About page that fuses Wesley's biography (sourced from `About Me.md`) with the Freedom Tech thesis (distilled from Polaris) — About is the thesis page (per Phase 1 discussion)
- [ ] **IDENT-05**: Visitor can reach a Contact page with at least one working inbound channel (obfuscated mailto chosen — no form, no backend)
- [ ] **IDENT-06**: Visitor can reach a `/colophon` page documenting the tech stack, no-tracking stance, and credits

### Projects

- [ ] **PROJ-01**: Visitor can read a Bitcoin Bay project page covering what it is, why it exists, and how to engage. External link to `https://bitcoinbay.foundation`.
- [ ] **PROJ-02**: Visitor can read an FBBA project page covering what it is, who it serves, and how to engage. External link to `https://fbba.io`.
- [ ] ~~**PROJ-03**: Freedom Tech Consulting project page~~ — **FOLDED into IDENT-04 per Phase 1 discussion (2026-04-25).** Freedom Tech is the thesis underneath the other projects, not a separate project page. The thesis lives on the About page (IDENT-04). The homepage thesis card (IDENT-02) routes to About.
- [ ] **PROJ-04**: Visitor can read a **Cross The Bridge** project page (the 3rd project tile) — a teaser/positioning page describing Wesley's CTB consulting + AI agents + Petros / AYLIP work, ending with a per-page CTA that deeplinks externally to the CTB brand site at `https://crossthebridge.io`. (The full CTB brand site itself — consulting hub + Bitcoin / Privacy / AI sub-pages — is built in a separate future project.) (Reframed 2026-04-27 from "AI / Petros / Hermes project page".)
- [ ] **PROJ-05**: Each project page surfaces at least one specific way to engage (link, contact path, or follow-on resource)

### Writing

- [ ] **WRITE-01**: Visitor can read a `/writing` hub showing recent essays + notes
- [ ] **WRITE-02**: Visitor can read at least 2–3 seed essays at launch (no empty surface)
- [ ] **WRITE-03**: Visitor can read a `/notes` index of shorter notes (may launch sparse — route exists)
- [ ] **WRITE-04**: Each essay and note is authored as plain Markdown in an Astro content collection (essays + notes as distinct collections with distinct schemas)
- [ ] **WRITE-05**: Visitor can subscribe to an RSS feed (combined + per-collection); feed validates at W3C feed validator and renders in NetNewsWire/Reeder
- [ ] **WRITE-06**: Each essay/note can declare `related: [slug]` frontmatter that surfaces a "Related" block at the bottom of the page
- [ ] **WRITE-07**: Visitor can browse a `/topics/[tag]` page showing all content for any tag used in frontmatter

### SEO + AI Search

- [ ] **SEO-01**: Every page renders meta description, OG title/description/image, and canonical URL via a shared `BaseSEO.astro` component baked into every layout
- [ ] **SEO-02**: Every page renders appropriate JSON-LD via a shared `JsonLd.astro` component (Person on About, WebSite on home, BlogPosting on essays)
- [ ] **SEO-03**: Site exposes a valid `sitemap.xml` (via `@astrojs/sitemap`)
- [ ] **SEO-04**: Site exposes a `robots.txt` permitting all crawlers and referencing the sitemap
- [ ] **SEO-05**: Site exposes a curated `llms.txt` summarizing site structure and content for AI crawlers
- [ ] **SEO-06**: Every page emits IndieWeb microformats (h-card on About, h-entry on essays/notes, h-feed on indexes)

### Privacy

- [ ] **PRIV-01**: Site self-hosts Playfair Display + Inter fonts via the Astro Fonts API (no Google Fonts CDN request from any page)
- [ ] **PRIV-02**: Site uses self-hosted Umami for analytics (no GA4, no Vercel Web Analytics, no Meta Pixel). Endpoint: `https://umami.crossthebridge.io` (decided pre-pivot; CTB DNS zone is acceptable as Wesley owns both domains).
- [ ] **PRIV-03**: Site loads no third-party media iframes on first paint (no YouTube, X, Disqus, reCAPTCHA)
- [ ] **PRIV-04**: A pre-launch network audit confirms ≤1 third-party domain is contacted on first paint (Umami host only). (Moved from Phase 3 → Phase 1 post-pivot 2026-04-27, since Phase 3 Consulting Subsection no longer exists in this roadmap.)

### Accessibility + Mobile

- [ ] **A11Y-01**: Mobile nav works on viewports <768px (hamburger toggle replaces the current site's hidden menu)
- [ ] **A11Y-02**: Site meets WCAG 2.2 AA baseline (color contrast, alt text on all images, ARIA labels on icon buttons, skip-to-main link, keyboard navigability for all interactive elements)
- [ ] **A11Y-03**: Site renders dark + light modes respecting `prefers-color-scheme` (no manual toggle required for v1)

### Infrastructure

- [x] **INFRA-01**: Site is built with Astro 6 + Tailwind v4 (via `@tailwindcss/vite`, NOT `@astrojs/tailwind`) deployed to Vercel via `@astrojs/vercel` static adapter
- [ ] **INFRA-02**: Repo CI runs `astro check && astro build` on every PR; merge to `main` blocked on green
- [ ] **INFRA-03**: Vercel preview deploys are wired for every PR (no direct-to-prod auto-deploy from `main` without preview)
- [x] **INFRA-04**: Repo retains current `crossthebridgetpa/ctb-website` location (no rename in v1; deployed product domain `wesleyschlemmer.com` does not have to match the repo name)

## Out of v1 Scope

Explicitly excluded for v1 unless reconsidered. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| **CTB consulting hub + Bitcoin/Privacy/AI sub-pages** | Moved to a separate future project (CTB brand site at `crossthebridge.io`) per the 2026-04-27 pivot. Seed input: `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md`. |
| **`ConsultingLayout` + Motion booking flow on this site** | Lives on the future CTB brand site, not on `wesleyschlemmer.com`. |
| **Removing the legacy `crossthebridge.io` `index.html` / `script.js` / `styles.css`** | Out of scope for this project — those files belong to the legacy CTB site, which the future CTB brand-site project replaces. |
| GA4 / Meta Pixel / Vercel Web Analytics | Anti-surveillance worldview; Umami covers the inbound-measurement need |
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
| Manual dark-mode toggle | `prefers-color-scheme` only for v1; manual toggle adds JS state without value |

## v2 Requirements (Discovery Surface — deferred)

Deferred to a future v1.x milestone. Acknowledged but not in current roadmap.

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

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| IDENT-01 | Phase 1 | Pending (executed in 01-07) |
| IDENT-02 | Phase 1 | Pending (executed in 01-07; tile #3 reframed post-pivot — needs 01-09 + 01-11) |
| IDENT-03 | Phase 1 | Pending (executed in 01-07) |
| IDENT-04 | Phase 1 | Pending (01-08 drafts pending Wesley review) |
| IDENT-05 | Phase 1 | Pending (01-09) |
| IDENT-06 | Phase 1 | Pending (01-09) |
| PROJ-01 | Phase 1 | Pending (01-09) |
| PROJ-02 | Phase 1 | Pending (01-09) |
| PROJ-03 | — | Folded into IDENT-04 |
| PROJ-04 | Phase 1 | Pending (01-09 — reframed post-pivot to "Cross The Bridge" tile) |
| PROJ-05 | Phase 1 | Pending (01-09) |
| WRITE-01 | Phase 2 | Pending |
| WRITE-02 | Phase 2 | Pending |
| WRITE-03 | Phase 2 | Pending |
| WRITE-04 | Phase 2 | Pending |
| WRITE-05 | Phase 2 | Pending |
| WRITE-06 | Phase 2 | Pending |
| WRITE-07 | Phase 2 | Pending |
| SEO-01 | Phase 1 | Pending (executed in 01-03; needs 01-11 domain-constants update) |
| SEO-02 | Phase 1 | Pending (executed in 01-03; needs 01-11 Person `@id` update) |
| SEO-03 | Phase 1 | Pending |
| SEO-04 | Phase 1 | Pending (executed in 01-03; needs 01-11 robots.txt sitemap update) |
| SEO-05 | Phase 1 | Pending (executed in 01-03; needs 01-11 llms.txt domain update) |
| SEO-06 | Phase 2 | Pending |
| PRIV-01 | Phase 1 | Pending (executed in 01-02) |
| PRIV-02 | Phase 1 | Pending (decision recorded 01-04; UUID + DNS pending) |
| PRIV-03 | Phase 1 | Pending (enforced via 01-10 network audit) |
| PRIV-04 | Phase 1 | Pending (was Phase 3; moved to Phase 1 post-pivot 2026-04-27) |
| A11Y-01 | Phase 1 | Pending (executed in 01-06) |
| A11Y-02 | Phase 1 | Pending (validated by 01-10 Lighthouse + audit) |
| A11Y-03 | Phase 1 | Pending (executed in 01-02 dark-mode tokens) |
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Pending (01-10) |
| INFRA-03 | Phase 1 | Pending (01-10) |
| INFRA-04 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 36 total (35 active + 1 folded: PROJ-03 → IDENT-04 per Phase 1 discussion)
- Mapped to phases: 36
- Unmapped: 0 ✓

**Removed in 2026-04-27 pivot (moved to future CTB brand-site project):**
- CONS-01..CONS-05 (Consulting hub, service pages, Motion booking, ConsultingLayout, neutral cross-link)
- A11Y-04 (Lighthouse threshold for consulting pages — covered by CTB brand-site project's own A11Y reqs)
- INFRA-05 (Removing legacy `index.html` / `script.js` / `styles.css` — those files belong to the legacy CTB site, owned by the future CTB brand-site project)

---
*Requirements originally defined: 2026-04-25*
*Repointed 2026-04-27 — wesleyschlemmer.com pivot, CONS-01..05 + A11Y-04 + INFRA-05 moved out to future CTB brand-site project; PRIV-04 moved Phase 3 → Phase 1; PROJ-04 reframed*
