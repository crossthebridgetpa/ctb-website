# Phase 1: Foundation + Personal Surface — Context

**Gathered:** 2026-04-25
**Repointed:** 2026-04-27 — wesleyschlemmer.com pivot captured during /gsd-discuss-phase 01 mid-execution
**Status:** Ready for replanning (D-20 pivot triggers a small follow-on plan + 01-09 reframe via /gsd-plan-phase 01)

<domain>
## Phase Boundary

**Repointed 2026-04-27:** Ship Wesley's personal hub site at `wesleyschlemmer.com` (or `staging.wesleyschlemmer.com` first, then apex cutover) — homepage + 3 project pages (Bitcoin Bay, FBBA, Cross The Bridge teaser-with-external-link) + About + Contact + Colophon — with the SEO/privacy/accessibility infrastructure baked into page templates from day one. The legacy `crossthebridge.io` site stays untouched at its own apex (separate domain, separate concern, owned by a future `/gsd-new-project` initiative — the CTB brand site).

**In scope:**
- Astro 6 scaffold + Vercel static deploy + design tokens
- `BaseLayout`, `BaseSEO`, `JsonLd` components baked into every layout
- Homepage with locked hero copy + 4-tile grid (3 project cards + 1 thesis card)
- 3 project pages: Bitcoin Bay (links to `bitcoinbay.foundation`), FBBA (links to `fbba.io`), Cross The Bridge (teaser, links to `https://crossthebridge.io`)
- About page = biography + Freedom Tech thesis fused
- Contact page (obfuscated mailto)
- Colophon page documenting tech stack and no-tracking stance
- Self-hosted Playfair + Inter via Astro Fonts API
- Self-hosted Umami analytics (host: `umami.crossthebridge.io` per D-14)
- robots.txt, sitemap.xml, llms.txt
- CI: build + check + network audit; Vercel preview deploys on PRs
- Vercel project + DNS for `wesleyschlemmer.com` + `staging.wesleyschlemmer.com`
- Domain-constants follow-up plan (01-11) — swap hardcoded `crossthebridge.io` references in already-built code to `wesleyschlemmer.com`

**Out of scope (later phases or future projects):**
- Writing surface (Phase 2): essays, notes, RSS, related-content, topic pages
- **CTB brand site at `crossthebridge.io`** (separate future `/gsd-new-project` initiative): consulting hub, Bitcoin/Privacy/AI themed sub-pages, ConsultingLayout, Petros/AYLIP product framing, apex cutover from legacy single-page site to new CTB hub. Seed input: `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md`.
- Discovery surface (v1.x): Pagefind search, dynamic OG images, webmentions, newsletter, /now, /uses, /press
- Manual dark-mode toggle (prefers-color-scheme only for v1)

</domain>

<decisions>
## Implementation Decisions

### D-21 — Canonical name: Wesley Schlemmer (NEW, locked 2026-04-27)

**Context:** During /gsd-plan-phase 01 mid-execution, the planner flagged a surname inconsistency between built code ("Wesley Pyburn" hardcoded in BaseSEO/JsonLd/Headshot/Footer/index.astro/llms.txt + baked into public/og/default.png) and project context ("Wesley Schlemmer" in CLAUDE.md and the new domain). Wesley confirmed: **the name is Wesley Schlemmer. "Pyburn" was hallucinated by the 2026-04-25 research agent and propagated unchecked through UI-SPEC, PATTERNS, plans, and built code.**

**Decision:**
- All public-facing copy, structured data, and image text use **"Wesley Schlemmer"** as the canonical name.
- All "Wesley Pyburn" references in built code, the OG image PNG, and the 01-08 About page drafts must be swapped to "Wesley Schlemmer".
- 01-11 absorbs this swap in addition to its domain-constants scope (same shape: replace wrong constant in already-built files).
- Upstream historical artifacts (01-RESEARCH.md, 01-UI-SPEC.md, 01-PATTERNS.md, completed plans 01-03..07, completed SUMMARY.md files) are NOT retroactively edited — they're historical. Downstream agents read CONTEXT.md (this file) for canonical truth, not those artifacts. The grep-verifiable acceptance is in built code only.

**Files affected (built code + image, all swapped in 01-11):**
- `src/components/seo/BaseSEO.astro` — homepage title literal
- `src/components/seo/JsonLd.astro` — Person `name` field, Person `description` field
- `src/components/Headshot.astro` — alt-text literal
- `src/components/Footer.astro` — copyright literal
- `src/pages/index.astro` — homepage title literal, description literal
- `public/llms.txt` — H1 + body prose
- `public/og/default.png` — re-render with corrected "by Wesley Schlemmer" text

**Files affected (drafts):**
- `.planning/phases/01-foundation-personal-surface/01-08-DRAFT.md` — thesis + bio drafts (will be authored into about.astro by 01-08 once Wesley approves)
- `~/.hermes/vault/projects/ctb/01-08-about-page-draft.md` — Obsidian-readable copy

### D-20 — Project pivot to wesleyschlemmer.com (NEW, decided 2026-04-27)

**Context:** Mid-Phase-1 execution (7/10 plans complete), Wesley wrote handwritten redesign notes (`~/.hermes/vault/website redesign notes.pdf`, transcribed to `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md`) describing a richer CTB consulting hub with Choose-Your-Adventure Bitcoin/Privacy/AI sub-pages. During /gsd-discuss-phase 01 to integrate that scope, Wesley raised: "Maybe the hub should be wesleyschlemmer.com instead?" — surfacing the recursion concern (a "Cross The Bridge" project tile inside a site already named Cross The Bridge) and proposing a domain split.

**Decision:**
- **`wesleyschlemmer.com`** = THIS project's deploy target. Personal hub, Wesley-the-person.
- **`crossthebridge.io`** = future CTB brand site (separate `/gsd-new-project` initiative). Currently serves the legacy single-page consulting site untouched. Future project replaces it with the consulting hub from the redesign notes.
- **`getpetros.com`** = Wesley owns; reserved for a deferred migration target if AYLIP/Petros productization warrants. Out of v1.

**Implications for built code (7 plans already shipped):**
- `src/components/seo/JsonLd.astro` — Person `@id` hardcoded to `https://crossthebridge.io/about#wesley` → must change to `https://wesleyschlemmer.com/about#wesley`
- `public/robots.txt` — Sitemap line: `staging.crossthebridge.io` → `staging.wesleyschlemmer.com`
- `public/llms.txt` — H1 "Cross The Bridge" + URL refs → "Wesley Schlemmer" / `wesleyschlemmer.com`
- `astro.config.mjs` — `site:` field if hardcoded
- `.env.example` — `PUBLIC_SITE_URL` default → `https://staging.wesleyschlemmer.com`
- These swaps land in a small follow-up plan (01-11) authored during /gsd-plan-phase 01.

**Implications for unbuilt plans:**
- 01-08 (About) drafts unchanged — copy is domain-agnostic.
- 01-09 (project pages + Contact + Colophon) — third project page reframed as "Cross The Bridge" teaser linking to `https://crossthebridge.io` (currently legacy site, eventually new CTB brand site). Bitcoin Bay external URL: `bitcoinbay.foundation`. FBBA external URL: `fbba.io`.
- 01-10 (CI + Vercel + DNS) — Vercel project targets wesleyschlemmer.com. DNS: `staging.wesleyschlemmer.com` CNAME to Vercel; apex `wesleyschlemmer.com` A/ALIAS to Vercel. Network audit allow-list includes `umami.crossthebridge.io`.

### Worldview Copy (Hero)

- **D-01:** Homepage hero is locked at the **question-led, conversational** voice (Option D from discussion). Final copy:

  > **What does it look like to opt out — without going off-grid?**
  > Cross The Bridge is the answer I'm building.
  >
  > Bitcoin instead of banks. Self-hosted compute instead of surveillance Cloud. AI you own, not AI that owns you.
  >
  > [Get in touch]

  ~50 words. CTA wording: "Get in touch" (locked). **Note post-pivot:** Hero still works on a personal-hub site — it reads as "I, Wesley, am building Cross The Bridge to answer this", framing CTB as Wesley's project (linked from project tile #3) rather than the site name itself.

- **D-02:** Tone is toned-down worldview — direct, claims a position, names the legacy systems but doesn't preach. No eyebrow/kicker line.

### Project Pages

- **D-03 (REVISED 2026-04-27):** Three project pages in v1: **Bitcoin Bay**, **FBBA**, **Cross The Bridge**. The third tile was originally framed "AI/Petros/Hermes" (deep technical/strategic page); post-pivot it is reframed as **"Cross The Bridge" teaser/positioning page** with copy from the 2026-04-26 redesign notes (sovereignty as a service, fourth-turning framework, old-to-new world framing, "the rules have changed", Petros + AYLIP product mention). The page CTA deeplinks externally to `https://crossthebridge.io` (currently legacy single-page site; eventually the new CTB brand site built by the future project). **Freedom Tech is not a fourth project** — it is the thesis underneath all three projects, lives on the About page (D-08). REQUIREMENTS.md PROJ-03 folded into IDENT-04, PROJ-04 reframed.

- **D-04:** Page depth is **mixed by project** — decided per-project during execution, not standardized. Likely: Cross The Bridge tile is shorter/teaser-style (it points OUT to the CTB brand site for depth); BB and FBBA are tight community-action pages.

- **D-05 (REVISED 2026-04-27):** Per-project engagement CTAs:
  - **Bitcoin Bay** → External link to `https://bitcoinbay.foundation` (URL confirmed by Wesley 2026-04-27)
  - **FBBA** → External link to `https://fbba.io` (URL confirmed by Wesley 2026-04-27)
  - **Cross The Bridge** → External link to `https://crossthebridge.io` (currently legacy single-page site; reframes automatically when the future CTB brand-site project ships). Originally was: "Hire me for AI implementation work →" pointing to the consulting offer.

### Homepage Structure

- **D-06:** Homepage shows a **4-tile grid: 3 project cards (Bitcoin Bay, FBBA, Cross The Bridge) + 1 thesis card** linking to About. Single "Get in touch" CTA. **No consulting CTA on the homepage** (locked at project level via the Cross The Bridge tile's external link).

- **D-07:** No "Recent writing" module on the Phase 1 homepage. Phase 2 layers it in once writing collections exist (planner: leave a sized placeholder block in the homepage layout for Phase 2 to wire). *Note: Already implemented as `<section id="recent-writing" hidden>` in 01-07.*

### About Page

- **D-08:** About page = **biography + Freedom Tech thesis fused into a single page**. Sources:
  - `~/.hermes/vault/people/About Me.md` — Wesley's voice, style, likes/dislikes, goals
  - `~/.hermes/vault/projects/petros/petros-polaris.md` — the Cross The Bridge doctrine (Money/Data/Infrastructure pillars) distilled to public, toned-down form
  Distillation level: thesis is real but not preachy. Doctrine words stay in the vault, not on this page. **Drafts authored by Claude 2026-04-26, awaiting Wesley review at `~/.hermes/vault/projects/ctb/01-08-about-page-draft.md` (Obsidian-readable copy of `.planning/phases/01-foundation-personal-surface/01-08-DRAFT.md`).**

- **D-09:** Headshot reuse + optimize: keep the existing `wesley-headshot.jpg` (95 KB), generate WebP variant + responsive srcset, lazy-load. Headshot appears on About page. Homepage stays text-forward.

### Visual Identity

- **D-10:** Carry forward cream/charcoal/green/gold palette with light tweaks. Define dark-mode variants (`prefers-color-scheme` only — no manual toggle in v1).

- **D-11:** Type pairing stays Playfair Display (display) + Inter (body). Self-hosted via Astro Fonts API + Fontsource — **no Google Fonts CDN request from any page**.

- **D-12:** Density is **Collison-style generous whitespace**: single column, large type, lots of breathing room. Says "the words matter." Easiest to maintain at scale.

### Operational

- **D-13:** Contact path = **obfuscated mailto** to `wesley@crossthebridge.io`. No form, no backend, no Vercel function. Encoded format to slow harvesters. *Note post-pivot:* The email address itself stays `wesley@crossthebridge.io` — that's just Wesley's email, unrelated to which domain hosts the personal hub.

- **D-14:** Analytics = **self-hosted Umami on existing VPS** (Option B chosen 2026-04-26). Endpoint: `https://umami.crossthebridge.io`. UUID pending Wesley provisioning the Docker stack. The CTB DNS zone is acceptable as the Umami host even though the personal hub is at `wesleyschlemmer.com` — Wesley owns both domains. (Could alternatively migrate to `umami.wesleyschlemmer.com` in a follow-up if subdomain-isolation is preferred.)

- **D-15 (REVISED 2026-04-27):** Staging URL = `staging.wesleyschlemmer.com` (was `staging.crossthebridge.io` pre-pivot). DNS will need to be configured to point the subdomain at the Vercel project. After Phase 1 verification, apex cutover to `wesleyschlemmer.com` happens. **Apex of `crossthebridge.io` is not part of this project's cutover** — it stays serving the legacy single-page consulting site, owned by the future CTB brand-site project.

- **D-16:** CI gates blocking PR merge to main:
  - `astro check && astro build` must pass
  - Vercel preview deploy must succeed
  - **Network audit** must pass — automated check that no Google domains (`fonts.googleapis.com`, `fonts.gstatic.com`, `google-analytics.com`, `googletagmanager.com`) and no Vercel surveillance scripts (`va.vercel-scripts.com`, `vitals.vercel-insights.com`) are contacted on first paint of any page. Allow-list: Umami host (`umami.crossthebridge.io`).
  - **No Lighthouse threshold gate** — over-engineering for a 1-author site; Lighthouse runs informationally on PR previews but doesn't block

### Architecture (carried forward, not re-discussed)

- **D-17:** Stack: Astro 6.x + Tailwind v4 (via `@tailwindcss/vite`) + plain Markdown content collections + `@astrojs/vercel` static adapter + `@astrojs/sitemap` + `@astrojs/rss` (Phase 2).

- **D-18 (REVISED 2026-04-27):** Layout firewall: `BaseLayout.astro` for the entire personal hub (homepage + projects + About + Contact + Colophon). **`ConsultingLayout` is no longer a Phase 3 deliverable** — it moves to the future CTB brand-site project entirely. Phase 1 only ships `BaseLayout`.

- **D-19 (REVISED 2026-04-27):** **Subpath vs subdomain for /consulting is no longer a Phase 1 question.** The /consulting hub work moves to the future CTB brand-site project at `crossthebridge.io` (where /consulting/* lives at root). Domain split for AYLIP/Petros productization (potential `getpetros.com` migration) is a future-project decision, not Phase 1.

### Claude's Discretion

- Mobile nav implementation pattern — already implemented in 01-06 (full a11y mobile drawer). No change.
- JSON-LD schema authoring — Person + WebSite + WebPage + Breadcrumb already implemented in 01-03 with schema-dts types. No change beyond domain-constant update.
- Exact CSS variable names + Tailwind theme config keys — already implemented in 01-02 `src/styles/global.css`. No change.
- File and route conventions — Astro defaults followed. No change.
- Network-audit implementation — Playwright + assertion script in CI is already the planned approach (01-10).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project context
- `.planning/PROJECT.md` — full project context, core value, constraints, key decisions (UPDATED 2026-04-27 for wesleyschlemmer.com pivot)
- `.planning/REQUIREMENTS.md` — 36 v1 requirements (35 active + PROJ-03 folded into IDENT-04 per Phase 1 discussion); CONS-01..05 + A11Y-04 + INFRA-05 removed in 2026-04-27 pivot (moved to future CTB brand-site project)
- `.planning/ROADMAP.md` — 2-phase v1 structure (Phase 1 + Phase 2); Phase 3 Consulting Subsection moved out as separate future project
- `.planning/STATE.md` — current position + accumulated context
- `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md` — Wesley's 2026-04-26 handwritten redesign notes (transcribed). **Seed input for the future CTB brand-site project, NOT this Phase 1.** Triggered the 2026-04-27 pivot decision (D-20).

### Research (informs every decision below)
- `.planning/research/SUMMARY.md` — synthesized executive summary + phase ordering rationale
- `.planning/research/STACK.md` — Astro 6 + Tailwind v4 + Umami + self-hosted fonts; anti-stack list
- `.planning/research/FEATURES.md` — table-stakes / differentiators / anti-features for personal-portfolio sites
- `.planning/research/ARCHITECTURE.md` — IA, URL structure, layout firewall, content collections layout
- `.planning/research/PITFALLS.md` — 18 pitfalls with phase mapping (Phase 1 must avoid: dead-blog graveyard, worldview overreach, dual-audience confusion, privacy hypocrisy, SEO invisibility)

### Source material for content authoring
- `~/.hermes/vault/people/About Me.md` — Wesley's voice + style + goals + "Great Bifurcation" framing (source for About bio half)
- `~/.hermes/vault/projects/petros/petros-polaris.md` — Cross The Bridge doctrine; Money/Data/Infrastructure pillars (source for About thesis half — Page 1 only)
- `.planning/phases/01-foundation-personal-surface/01-08-DRAFT.md` — Claude-authored thesis + bio drafts pending Wesley review (Obsidian-readable copy at `~/.hermes/vault/projects/ctb/01-08-about-page-draft.md`)

### Existing assets
- `~/projects/ctb-website/wesley-headshot.jpg` — current 95 KB headshot to optimize (D-09)
- `~/projects/CTB-Proposal.pdf`, `~/projects/CTB-Audit-Plan.pdf`, `~/projects/CTB-Marketing-Setup-Guides.pdf` — relevant only to the future CTB brand-site project, NOT this Phase 1.

### External
- Astro 6 docs: https://docs.astro.build/
- Astro Fonts API: https://docs.astro.build/en/guides/fonts/
- Tailwind v4 with Astro: https://tailwindcss.com/docs/installation/framework-guides/astro
- Umami self-hosting docs: https://umami.is/docs

</canonical_refs>

<code_context>
## Existing Code Insights

### Already Built (7 plans complete)

**01-01 — Astro 6 + Tailwind v4 + Vercel scaffold:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `vercel.json`, `.env.example`, `.nvmrc`, `.gitignore`. Stack pinned. Schema-dts + astro-icon as deps. **Contains hardcoded `crossthebridge.io` references in `.env.example` PUBLIC_SITE_URL default — needs 01-11 update.**

**01-02 — Astro Fonts API + Tailwind v4 tokens:** `src/styles/global.css` (cream/charcoal/green/gold palette + dark-mode variants per A11Y-03; @theme block with full token scale); Astro Fonts API wired in `astro.config.mjs` (Playfair + Inter via Fontsource provider). PRIV-01 holds: zero `fonts.googleapis.com` requests in build output.

**01-03 — SEO + structured data:** `src/components/seo/BaseSEO.astro` (typed Props, OG, canonical, Twitter, theme-color), `src/components/seo/JsonLd.astro` (schema-dts-typed Person/WebSite/WebPage/Breadcrumb). `public/robots.txt`, `public/llms.txt`, `public/og/default.png` (1200×630, 61KB), `public/favicon.svg`. **`JsonLd.astro` Person `@id` hardcoded to `https://crossthebridge.io/about#wesley` — needs 01-11 update. `robots.txt` Sitemap line + `llms.txt` H1+URLs all reference crossthebridge.io — need 01-11 update.**

**01-04 — D-14 Umami decision document:** `.planning/phases/01-foundation-personal-surface/01-04-UMAMI-DECISION.md` records Option B (VPS), endpoint `https://umami.crossthebridge.io`, UUID pending stack provisioning. PRIV-02 + PRIV-03 captured.

**01-05 — Component primitives:** `src/components/Hero.astro`, `CtaButton.astro`, `Tile.astro`, `Headshot.astro`, `ObfuscatedMailto.astro`, `ExternalLink.astro`, `src/lib/consulting-url.ts`, `src/content.config.ts`. Token-driven; mailto three-layer obfuscation invariant verified in `dist/`.

**01-06 — BaseLayout + Nav + Footer:** `src/layouts/BaseLayout.astro` (composes BaseSEO + JsonLd + Nav + Footer + skip-link + conditional Umami three-way guard), `src/components/Nav.astro` (desktop links + mobile drawer + full a11y), `src/components/Footer.astro` (locked tagline, 3-column).

**01-07 — Homepage + 404:** `src/pages/index.astro` (Hero + 4-tile grid + Phase-2 placeholder), `src/pages/404.astro` (locked recovery copy + noindex). 145-char description in plan band. IDENT-03 holds. **Homepage tile #3 currently labeled "AI / Petros / Hermes" with link to `/projects/ai-petros-hermes` — post-pivot needs reframe to "Cross The Bridge" tile linking externally to `crossthebridge.io` (handled in 01-09 reframe).**

### Reusable Assets

- `wesley-headshot.jpg` at `public/wesley-headshot.jpg` (copied from repo root in 01-05) — image asset for About page
- All component primitives + BaseLayout are domain-agnostic; reuse without changes
- Color palette tokens in `src/styles/global.css` are domain-agnostic

### Established Patterns

- Pages compose `BaseLayout` with typed Props (`title`, `description`, `canonical`, `jsonLdSchema`, `jsonLdData?`)
- External links use `<ExternalLink>` (rel="noopener noreferrer", target="_blank" with screen-reader hint)
- Mailto uses `<ObfuscatedMailto>` (three-layer obfuscation: HTML entity, JS reveal, no plaintext in `dist/`)
- Per-page CTA pattern (locked at component level via `CtaButton`)
- Astro 6 content collections at `src/content.config.ts` (Phase 2 will populate `essays/` + `notes/`)

### Integration Points

- `wesleyschlemmer.com` apex DNS — needs to be created and pointed at the new Vercel project (D-15, post-pivot)
- `staging.wesleyschlemmer.com` subdomain DNS — same
- `crossthebridge.io` apex DNS — **stays untouched** through this project (separate domain, separate concern; future CTB brand-site project replaces the legacy site there)
- Vercel project setup — new project under Wesley's existing Vercel account; auto-deploy from `main`
- `wesley@crossthebridge.io` mailto target — already working, no setup needed (the email address is Wesley's, unrelated to which domain hosts the personal hub)
- `umami.crossthebridge.io` — Umami endpoint per D-14 (DNS A record pending Wesley supplies VPS IP at PLAN-10 launch checklist)

</code_context>

<specifics>
## Specific Ideas

### Hero copy (locked, ready to render)

> **What does it look like to opt out — without going off-grid?**
> Cross The Bridge is the answer I'm building.
>
> Bitcoin instead of banks. Self-hosted compute instead of surveillance Cloud. AI you own, not AI that owns you.
>
> [Get in touch]

*Reads correctly post-pivot: "I, Wesley, am building Cross The Bridge to answer this question" — visitor lands on wesleyschlemmer.com (Wesley's hub), hears about CTB as Wesley's project, can click the third tile to learn more about it.*

### Visual references for Collison-style density (D-12)

- patrickcollison.com — single column, generous whitespace, large type
- stephango.com — minimal, library-mode, no chronological pressure
- Avoid: Maggie Appleton's annotated/marginalia style
- Avoid: Brian Lovin's designer-tight density

### Cross The Bridge tile copy seed (D-03 revision)

From the 2026-04-26 redesign notes (canonical ref above), the third tile's project page should distill these themes:
- "AI + freedom-tech consulting. AI agents"
- "Sovereignty as a Service"
- "Fourth-turning framework"
- Old to new world framing — "the world you grew up in no longer exists"
- "the rules have changed"
- Petros + AYLIP product mention (in passing — depth lives on the future CTB brand site, not this teaser page)
- Per-page CTA: external link to `https://crossthebridge.io`

Voice contract: same as IDENT-01 hero — toned-down worldview, claims a position, no preaching, no "Beast System" / "Great Bifurcation" / "Mystery Babylon" doctrine words. Marketing-ese banned: no "revolutionary", "leverage", "synergy", "cutting-edge", "AI-powered" self-descriptors.

### Per-project external URLs (D-05 revision)

- Bitcoin Bay → `https://bitcoinbay.foundation` (confirmed 2026-04-27)
- FBBA → `https://fbba.io` (confirmed 2026-04-27)
- Cross The Bridge → `https://crossthebridge.io` (currently legacy site; future CTB brand-site project replaces it)

### About page distillation guidance (unchanged, drafts pending review)

- Bio half: pull directly from `About Me.md` — first-person, conversational. Sections: My Style, How I Work, What I'm Building. Skip "My ideal assistant".
- Thesis half: distill Polaris Page 1 (Money/Data/Infrastructure pillars) to ~150-250 words in toned-down language. Keep the metaphor "Cross the bridge from the Old World to the New" — that's the brand line. Skip Page 2 (AYLIP — too proprietary for the public About page; lives on the future CTB brand site).
- Order: thesis first (the WHY), bio second (the WHO behind the why). One page, two clearly-marked sections.

</specifics>

<deferred>
## Deferred Ideas

### Future CTB brand-site project (separate /gsd-new-project)

The full CTB brand site (`crossthebridge.io` consulting hub + Bitcoin / Privacy / AI themed sub-pages, Petros + AYLIP product framing) was originally Phase 3 of this project. The 2026-04-27 pivot moved it OUT entirely. Trigger: Wesley kicks off `/gsd-new-project` when ready to retire the legacy single-page site at `crossthebridge.io`.

**Seed input:** `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md`

**Architectural questions deferred to that project:**
- Choose-Your-Adventure hub pattern (3 buttons over an "open source" arch)
- Per-page color theming: black+gold (hub), black+orange (Bitcoin), black+white (Privacy), black+green (AI)
- FAQ depth on Bitcoin sub-page (~11 Qs in notes), Privacy sub-page (~5 Qs)
- Personal vs business AI offerings split
- AYLIP product framing depth
- Whether to migrate to `getpetros.com` if AYLIP productizes

### Within-Phase-1 deferrals (unchanged)

- **AYLIP / Petros homeschool product framing** — Polaris Page 2's AYLIP detail belongs on the future CTB brand site, NOT on the About thesis page or the Cross The Bridge teaser tile.
- **Bitcoin Bay events mailing list URL** — if no list exists yet at launch, the BB project page CTA can stay as the foundation external link until Wesley sets up Buttondown.
- **Manual light/dark mode toggle** — out of scope for v1; reconsider if user feedback indicates `prefers-color-scheme` isn't enough.
- **Newsletter signup on homepage** — Out of Scope per REQUIREMENTS.md; reconsider in v1.x (3-4 essays milestone).
- **Webmention support** — v1.x milestone (Discovery Surface).
- **`getpetros.com` future migration** — reserved domain; no v1 migration. Reconsider when AYLIP product launches.
- **`umami.wesleyschlemmer.com` subdomain isolation** — Umami host can move from `umami.crossthebridge.io` to a wesleyschlemmer.com subdomain in a follow-up if domain-isolation between personal and brand surfaces is preferred. Not blocking Phase 1 launch.

</deferred>

---

*Phase: 01-foundation-personal-surface*
*Context originally gathered: 2026-04-25*
*Repointed: 2026-04-27 — wesleyschlemmer.com pivot (D-20)*
