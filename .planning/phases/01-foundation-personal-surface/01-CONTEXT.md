# Phase 1: Foundation + Personal Surface — Context

**Gathered:** 2026-04-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Ship the personal portfolio surface — homepage + 3 project pages + About + Contact + Colophon — at a non-apex URL (`staging.crossthebridge.io`), with the SEO/privacy/accessibility infrastructure baked into page templates from day one. The existing single-page consulting site at the apex `crossthebridge.io` continues serving paid clients untouched. Phase 1 lights up the inbound channel for peer audiences without disturbing the live consulting offer.

**In scope:**
- Astro 6 scaffold + Vercel static deploy + design tokens
- `BaseLayout`, `BaseSEO`, `JsonLd` components baked into every layout
- Homepage with locked hero copy + 4-tile grid (3 project cards + 1 thesis card)
- 3 project pages: Bitcoin Bay, FBBA, AI/Petros/Hermes
- About page = biography + Freedom Tech thesis fused
- Contact page (obfuscated mailto)
- Colophon page documenting tech stack and no-tracking stance
- Self-hosted Playfair + Inter via Astro Fonts API
- Self-hosted Umami analytics
- robots.txt, sitemap.xml, llms.txt
- CI: build + check + network audit; Vercel preview deploys on PRs

**Out of scope (later phases or v2):**
- Writing surface (Phase 2): essays, notes, RSS, related-content, topic pages
- Consulting subsection (Phase 3): `/consulting` hub, 3 service pages, ConsultingLayout, apex cutover
- Discovery surface (v2): Pagefind search, dynamic OG images, webmentions, newsletter, /now, /uses, /press
- Mobile hamburger nav refinement beyond functional baseline
- Manual dark-mode toggle (prefers-color-scheme only for v1)

</domain>

<decisions>
## Implementation Decisions

### Worldview Copy (Hero)

- **D-01:** Homepage hero is locked at the **question-led, conversational** voice (Option D from discussion), with the project list dropped — project cards below the fold do that work. Final copy:

  > **What does it look like to opt out — without going off-grid?**
  > Cross The Bridge is the answer I'm building.
  >
  > Bitcoin instead of banks. Self-hosted compute instead of surveillance Cloud. AI you own, not AI that owns you.
  >
  > [Get in touch]

  ~50 words. CTA wording: "Get in touch" (locked).

- **D-02:** Tone is toned-down worldview — direct, claims a position, names the legacy systems but doesn't preach. No eyebrow/kicker line (no "Tampa Bay's …" prefix the current site uses).

### Project Pages

- **D-03:** Three project pages in v1: Bitcoin Bay, FBBA, AI/Petros/Hermes. **Freedom Tech is not a fourth project** — it is the thesis that all three projects manifest. The thesis lives on the About page (see D-09). REQUIREMENTS.md PROJ-03 has been folded into IDENT-04.

- **D-04:** Page depth is **mixed by project** — decided per-project during execution, not standardized. Likely: AI/Petros/Hermes deepest (strongest body of public artifact), BB and FBBA tighter (community-action pages, not portfolios).

- **D-05:** Per-project engagement CTAs:
  - **Bitcoin Bay** → email signup for events mailing list (URL to be supplied during execution; if no list yet, scaffold a placeholder + flag for Wesley)
  - **FBBA** → link out to the separate FBBA website (URL to be supplied during execution)
  - **AI / Petros / Hermes** → link to the live CTB Consulting offer (Phase 1 staging this means → `https://crossthebridge.io` apex which still serves the existing consulting page; Phase 3 cutover means → `/consulting`). Implement as a configurable URL so the cutover doesn't require code changes per page.

### Homepage Structure

- **D-06:** Homepage shows a **4-tile grid: 3 project cards (BB, FBBA, AI/Petros/Hermes) + 1 thesis card** linking to About. Single "Get in touch" CTA. **No consulting CTA on the homepage** (locked at project level).

- **D-07:** No "Recent writing" module on the Phase 1 homepage. Phase 2 layers it in once the writing collections exist (planner: leave a sized placeholder block in the homepage layout for Phase 2 to wire).

### About Page

- **D-08:** About page = **biography + Freedom Tech thesis fused into a single page**. Sources:
  - `~/.hermes/vault/people/About Me.md` — Wesley's voice, style, likes/dislikes, goals, "Great Bifurcation" framing
  - `~/.hermes/vault/projects/petros/petros-polaris.md` — the Cross The Bridge doctrine (Money/Data/Infrastructure pillars) distilled to public, toned-down form
  Distillation level: thesis is real but not preachy. Doctrine words like "Beast System" stay in the vault, not on this page.

- **D-09:** Headshot reuse + optimize: keep the existing `wesley-headshot.jpg` (95 KB), generate WebP variant + responsive srcset, lazy-load. Headshot appears on About page. Homepage stays text-forward (no hero portrait).

### Visual Identity

- **D-10:** Carry forward cream/charcoal/green/gold palette with light tweaks: bump contrast where needed for WCAG AA, define dark-mode variants (`prefers-color-scheme` only — no manual toggle in v1).

- **D-11:** Type pairing stays Playfair Display (display) + Inter (body). Self-hosted via Astro Fonts API + Fontsource — **no Google Fonts CDN request from any page** (load-bearing for privacy stance).

- **D-12:** Density is **Collison-style generous whitespace**: single column, large type, lots of breathing room. Says "the words matter." Easiest to maintain at scale.

### Operational

- **D-13:** Contact path = **obfuscated mailto** to `wesley@crossthebridge.io`. No form, no backend, no Vercel function. Encoded format (Cloudflare-style or hand-rolled JS reveal) to slow harvesters.

- **D-14:** Analytics = **self-hosted Umami**. Fully sovereign (Wesley owns the data), aligns with worldview. **Hosting target TBD during planning** — candidates:
  - On `nomus` (Wesley's Mac Studio at `100.74.197.54`) via Docker — preferred if nomus has spare capacity and a public-reachable endpoint exists
  - On a VPS Wesley already owns
  - On Vercel via a separate project (least-sovereign option but easiest)
  Planner: surface this decision early — Umami needs a stable public endpoint before the Astro template can wire the script tag.

- **D-15:** Staging URL = `staging.crossthebridge.io` subdomain. DNS will need to be configured to point the subdomain at the Vercel project. Plausible/Umami can treat staging as a separate property if Wesley wants pre-launch traffic kept clean.

- **D-16:** CI gates blocking PR merge to main:
  - `astro check && astro build` must pass
  - Vercel preview deploy must succeed
  - **Network audit** must pass — automated check that no Google domains (`fonts.googleapis.com`, `fonts.gstatic.com`, `google-analytics.com`, `googletagmanager.com`) are contacted on first paint of any page
  - **No Lighthouse threshold gate** — over-engineering for a 1-author site; Lighthouse runs informationally on PR previews but doesn't block

### Architecture (carried forward, not re-discussed)

- **D-17:** Stack: Astro 6.x + Tailwind v4 (via `@tailwindcss/vite`, NOT `@astrojs/tailwind` which is v4-deprecated) + plain Markdown content collections + `@astrojs/vercel` static adapter + `@astrojs/sitemap` + `@astrojs/rss` (Phase 2). Verified at install time via `npm view <pkg> version`.

- **D-18:** Layout firewall: `BaseLayout.astro` for the personal surface (homepage + projects + About + Contact + Colophon). `ConsultingLayout.astro` is Phase 3 work. Phase 1 only ships `BaseLayout`.

- **D-19:** Subpath not subdomain for `/consulting` (Phase 3 architectural decision, locked).

### Claude's Discretion

- Mobile nav implementation pattern — hamburger toggle vs slide-over vs bottom-tab; pick whatever is most accessible + simplest for a 5-link nav. Must work <768px.
- JSON-LD schema authoring — pick standard Person + WebSite schema for home/About; the planner researcher can refine.
- Exact CSS variable names + Tailwind theme config keys — follow Astro/Tailwind conventions; document in `/colophon`.
- File and route conventions — follow Astro defaults unless there's a specific reason not to.
- Network-audit implementation — Playwright + a small assertion script in CI is the standard approach; planner can pick a different mechanism if there's a leaner one.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project context
- `.planning/PROJECT.md` — full project context, core value, constraints, key decisions
- `.planning/REQUIREMENTS.md` — 41 v1 requirements (40 active + PROJ-03 folded into IDENT-04 per this discussion); Phase 1 maps to 26 requirements
- `.planning/ROADMAP.md` — 3-phase v1 structure, Phase 1 success criteria, deploy strategy, pre-build gates
- `.planning/STATE.md` — current position + accumulated context

### Research (informs every decision below)
- `.planning/research/SUMMARY.md` — synthesized executive summary + phase ordering rationale
- `.planning/research/STACK.md` — Astro 6 + Tailwind v4 + Plausible (now overridden to Umami per D-14) + self-hosted fonts; anti-stack list
- `.planning/research/FEATURES.md` — table-stakes / differentiators / anti-features for personal-portfolio sites
- `.planning/research/ARCHITECTURE.md` — IA, URL structure, layout firewall, content collections layout
- `.planning/research/PITFALLS.md` — 18 pitfalls with phase mapping (Phase 1 must avoid: dead-blog graveyard, worldview overreach, dual-audience confusion, privacy hypocrisy, SEO invisibility)

### Source material for content authoring
- `~/.hermes/vault/people/About Me.md` — Wesley's voice + style + goals + "Great Bifurcation" framing (source for About bio half)
- `~/.hermes/vault/projects/petros/petros-polaris.md` — Cross The Bridge doctrine; Money/Data/Infrastructure pillars; AYLIP framing (source for About thesis half)

### Existing assets
- `~/projects/ctb-website/wesley-headshot.jpg` — current 95 KB headshot to optimize (D-09)
- `~/projects/CTB-Proposal.pdf`, `~/projects/CTB-Audit-Plan.pdf`, `~/projects/CTB-Marketing-Setup-Guides.pdf` — Phase 3 source material; not needed in Phase 1

### External
- Astro 6 docs: https://docs.astro.build/
- Astro Fonts API: https://docs.astro.build/en/guides/fonts/ (verify exact API at scaffold time)
- Tailwind v4 with Astro: https://tailwindcss.com/docs/installation/framework-guides/astro
- Umami self-hosting docs: https://umami.is/docs (verify hosting target before wiring script tag — D-14)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

**None usable directly.** The current `~/projects/ctb-website/index.html` (1100 lines, inline CSS), `script.js` (form-handler dead code at lines 44–80), and `styles.css` (1336 lines, unused) are headed for retirement. Phase 1 ships in parallel; Phase 3 deletes them.

**Reusable as reference (not code):**
- `wesley-headshot.jpg` — image asset, optimize in place
- Color palette values from `index.html` `:root` block — copy the cream/charcoal/green/gold hex codes to the new Tailwind theme config (D-10 carry-forward)
- Headline tone of the existing site (`"AI That Finally Works For Your Business"`) is a counterexample — what Phase 1 explicitly moves away from

### Established Patterns

None. The existing site is a single hand-rolled HTML file — no patterns worth carrying.

### Integration Points

- `crossthebridge.io` apex DNS (currently → existing single-page site) stays untouched in Phase 1
- `staging.crossthebridge.io` subdomain DNS → needs to be created and pointed at the new Vercel project (D-15)
- Vercel project setup — new project under Wesley's existing Vercel account; auto-deploy from the new `astro` branch (or rename to `main` with the old site in a tag/branch)
- `wesley@crossthebridge.io` mailto target — already working, no setup needed

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

### Visual references for Collison-style density (D-12)

- patrickcollison.com — single column, generous whitespace, large type
- stephango.com — minimal, library-mode, no chronological pressure
- Avoid: Maggie Appleton's annotated/marginalia style (decided against — too editorial-heavy for Wesley's voice)
- Avoid: Brian Lovin's designer-tight density (more polish work than this surface needs)

### Per-project CTA implementation note (D-05)

The AI/Petros/Hermes CTA links to "the live consulting offer." During Phase 1 staging this resolves to `https://crossthebridge.io` (apex still serves the old single-page site). After Phase 3 cutover this resolves to `/consulting`. **Implement as an env-configurable URL** (`CONSULTING_URL` in `.env`, default `/consulting`, override to `https://crossthebridge.io` for Phase 1 staging deploys) so the cutover is a config change, not a code change.

### About page distillation guidance

- Bio half: pull directly from `About Me.md` — first-person, conversational. Sections: My Style, My Goals, How I Work. Skip "My ideal assistant" (irrelevant to public audience).
- Thesis half: distill Polaris Page 1 (Money/Data/Infrastructure pillars) to ~150-250 words in toned-down language. Keep the metaphor "Cross the Bridge from the Old World to the New" — that's the brand line. Skip Page 2 (AYLIP product details — too proprietary for the public About page; lives in the AI/Petros project page instead).
- Order: thesis first (the WHY), bio second (the WHO behind the why). One page, two clearly-marked sections.

</specifics>

<deferred>
## Deferred Ideas

- **AYLIP / Petros homeschool product framing** — Polaris Page 2's AYLIP detail belongs on the AI/Petros/Hermes project page, NOT on the About thesis page. Capture in execution as a project-page section.
- **Plausible Cloud vs Umami revisit** — if self-hosting Umami proves operationally heavier than expected, revisit Plausible Cloud ($9/mo) before launch. Decision recorded as D-14; revisit gate is "Umami hosting target unresolved 7 days into Phase 1."
- **FBBA membership form** — if the FBBA external site doesn't expose a clean membership signup, consider adding one to crossthebridge.io's FBBA project page in v2. Out of Phase 1 scope.
- **Bitcoin Bay events mailing list** — if no list exists yet, Phase 1 ships with a "Coming soon" placeholder + flag for Wesley to set one up (Buttondown candidate). Not blocking Phase 1 launch.
- **Manual light/dark mode toggle** — out of scope for v1; reconsider if user feedback indicates `prefers-color-scheme` isn't enough.
- **Newsletter signup on homepage** — Out of Scope per REQUIREMENTS.md; reconsider in v2 (3-4 essays milestone).
- **Webmention support** — v2 milestone (Discovery Surface).

</deferred>

---

*Phase: 01-foundation-personal-surface*
*Context gathered: 2026-04-25*
