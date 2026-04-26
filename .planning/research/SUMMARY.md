# Project Research Summary

**Project:** crossthebridge.io Personal Portfolio Rebuild
**Domain:** Worldview-anchored personal portfolio + writing hub + consulting subsection
**Researched:** 2026-04-25
**Confidence:** HIGH

## Executive Summary

This is a personal site serving two distinct audiences — Freedom Tech / Bitcoin / FBBA peers and Tampa Bay SMB consulting clients — from a single domain. The dominant pattern for high-signal personal sites in 2026 (Appleton, Ango, Lovin, Sloan) is a content-collection-driven hub with a curated homepage lobby, separate essay and note surfaces, and strong internal linking. Wesley's case adds a values constraint that warps standard choices throughout the stack: anti-surveillance, anti-Google-services, and opt-out-of-legacy-infrastructure are not aesthetic preferences — they are the product's competitive moat. Every technology choice that contradicts this worldview (Google Fonts CDN, GA4, YouTube iframes, reCAPTCHA) is an active liability, not a neutral default.

The recommended approach is Astro 6 on Vercel with Tailwind v4, plain Markdown content collections, self-hosted fonts via the Astro Fonts API, Pagefind for search, and Plausible Cloud (EU) for analytics. This stack ships near-zero JS by default, handles the markdown-authoring-to-web pipeline without ceremony, and deploys cleanly to the existing Vercel setup. The architecture separates the personal surface from the consulting subsection via a layout firewall (subpath + distinct layout, not subdomain), keeping domain authority unified while preventing peer audiences from feeling sold to and consulting prospects from getting lost in worldview.

The primary risks are not technical: they are audience architecture (dual-audience confusion if consulting CTAs contaminate the personal homepage), content discipline (dead-blog graveyard if writing infrastructure is built before writing habit is established), and worldview consistency (privacy-stance hypocrisy if defaults like Google Fonts CDN ship unchallenged). All three are preventable with explicit IA decisions and a content inventory check before building the writing surface.

---

## Key Findings

### Recommended Stack

Astro 6 is the clear winner for this project. It ships zero JS by default, provides first-class content collections with Zod schema validation, includes a stable Fonts API for self-hosting (eliminating the Google Fonts GDPR leak on the current site), and deploys statically to Vercel with a single adapter. Cloudflare's acquisition of Astro in early 2026 validates its long-term roadmap. The alternative 11ty 3 is viable and simpler but requires more DIY for image pipeline and font handling that Astro now provides natively. Next.js is the wrong tool: it ships a React runtime tax to content pages and fights you when you want zero-JS defaults.

Tailwind v4 via `@tailwindcss/vite` replaces the current 1100-line inline CSS with maintainable utility classes and CSS-variable design tokens. Note: `@astrojs/tailwind` is deprecated for v4 — only `@tailwindcss/vite` is correct. Analytics decision is Plausible Cloud (EU): cookieless, GDPR-clean, AGPL-licensed, $9/mo, and self-hostable later without data migration. GoatCounter (free, EUPL) is the $0 alternative.

**Core technologies:**
- **Astro 6.1** — framework + content collections + image pipeline + Fonts API. Zero-JS default aligns with anti-surveillance worldview.
- **Tailwind v4** (`@tailwindcss/vite`) — design tokens, utility CSS, replaces inline-CSS sprawl.
- **Plain Markdown** (`.md`) — essays and notes as content collections; MDX enabled but sparingly used.
- **Pagefind** — static-site search, client-side, no SaaS, no tracking.
- **Plausible Cloud (EU)** — privacy-respecting analytics; no cookies, EU data residency.
- **Astro Fonts API** + Fontsource — self-hosted Playfair Display + Inter; eliminates Google Fonts IP leak.
- **`@astrojs/rss`** + **`@astrojs/sitemap`** — non-negotiable for BTC/freedom-tech RSS audience and SEO.
- **`@astrojs/vercel` (static mode)** — Vercel image optimization; no Sharp in serverless.

**Anti-stack (confirm never used):** Google Fonts CDN, GA4, Vercel Web Analytics, `@astrojs/tailwind` (v4 deprecated), Next.js, Algolia, Fathom, Disqus, raw YouTube/X iframes.

### Expected Features

**Must have for v1 launch:**
- Working mobile nav (current site's hidden hamburger is the most visible regression to fix)
- Homepage: worldview-toned hero, <=150 words of doctrine, 4 project cards, single "get in touch" CTA — no consulting CTA on homepage
- About page sourced from vault (`About Me.md` + Polaris distillation)
- 4 project pages (Bitcoin Bay, FBBA, Freedom Tech Consulting, Petros/Hermes) with what/why/how-to-engage
- Consulting subsection (`/consulting`) with 3 service pages + Motion booking — rendered through `ConsultingLayout`, not `BaseLayout`
- Essays index + 2-3 seed essays at launch (non-negotiable: no empty writing surface)
- Notes feed surface (can be sparse but route must exist)
- RSS/Atom feed with full content and auto-discovery link — this audience reads in NetNewsWire, not browsers
- SEO baseline baked into every page template: meta description, canonical, OG tags, JSON-LD (Person + WebSite + BlogPosting)
- `llms.txt` — 30-minute hedge, no reason to skip
- Self-hosted fonts (Google Fonts CDN is a values violation on day 1, not a v2 task)
- WCAG 2.2 AA accessibility baseline + dark mode respecting `prefers-color-scheme`
- Microformats (h-card, h-entry, h-feed) — ~5 min per template, unlocks IndieWeb ecosystem
- `/colophon` page documenting tech choices and no-tracking stance

**Add post-launch when triggered:**
- Newsletter (Buttondown) — trigger: 3-4 essays live
- `/now` page — trigger: current focus worth publishing
- `/press` media kit — trigger: first podcast inbound
- Dynamic per-essay OG images (Satori) — trigger: 5+ essays live
- Pagefind search — trigger: 10+ essays/notes
- Webmention receiver (webmention.io) — trigger: first inbound webmention

**Defer to v2+:** Nostr cross-posting workflow, audio/podcast feed, webmention sending, paid newsletter tiers, photography lightbox.

**Anti-features (explicitly not building):** Disqus, Google reCAPTCHA, YouTube iframes on paint, newsletter popups, social login, "As seen on" homepage logo wall, push notifications, live chat, AI-generated imagery, view counters.

### Architecture Approach

The site is a content-collection hub with a curated homepage lobby pulling featured projects and latest content from each collection. The critical structural decision is a **layout firewall**: `BaseLayout.astro` serves the personal surface (Home / Projects / Writing / About nav); `ConsultingLayout.astro` serves `/consulting` (Services / Case Studies / Book nav, Motion CTA persistent). Same domain and design tokens, different mode. Subpath over subdomain is correct for v1: unified SEO authority, simpler ops, single deploy. Subdomain becomes correct only if consulting acquires a separate team and distinct brand.

**Major components:**
1. **`BaseLayout` + `ConsultingLayout`** — layout firewall isolating personal from consulting surfaces
2. **Content collections** (`essays`, `notes`, `projects`, `consulting`) with typed Zod schemas composing from `baseSchema`
3. **`lib/relations.ts`** — frontmatter-declared `related: [slug]` cross-collection linker (opt-in, not auto-regex)
4. **`lib/tags.ts`** — tag aggregation across collections, generates `/topics/[tag]` pages
5. **`BaseSEO.astro` + `JsonLd.astro`** — baked into every layout, not optional per-page
6. **RSS feeds** (combined + per-collection) via `@astrojs/rss`

**URL structure:** `/projects/[slug]`, `/essays/[slug]`, `/notes/[slug]`, `/writing` (combined hub), `/topics/[tag]`, `/consulting/[slug]`. No date prefixes in URLs.

### Critical Pitfalls

1. **Dead-blog graveyard** — writing infrastructure built before writing habit exists. Prevention: content inventory gate before Phase 2; if <5 publishable essays, ship Notes-only at launch; never put "Latest essays" on homepage without committed monthly cadence.

2. **Worldview overreach** — Polaris doctrine verbatim on homepage reads as a sermon. Prevention: one-sentence worldview claim above fold (<=150 words total); doctrine lives at `/about` where readers self-select.

3. **Dual-audience confusion** — consulting CTAs on personal homepage repel peers; worldview copy on consulting pages confuses prospects. Prevention: layout firewall is the structural fix; single neutral bridge in personal footer to consulting.

4. **Privacy-stance hypocrisy** — Google Fonts CDN, raw YouTube iframes, or Vercel Analytics collapse the worldview claim. Prevention: network audit at launch (target: <=1 third-party domain on first paint); self-hosted fonts are day-one, not v2.

5. **SEO + AI-search invisibility** — same gaps as current site (no meta, no JSON-LD, no sitemap) recurring because "we'll add SEO later." Prevention: `BaseSEO.astro` and `JsonLd.astro` in every layout from day one; build-time schema validation; rich preview test before launch.

6. **Content silos** — essays don't link to projects, vice versa; single-page sessions >70%. Prevention: `related:` frontmatter + `RelatedContent.astro` from the start; pre-launch audit enforces >=2 internal links per page.

---

## Implications for Roadmap

### Phase Disagreement: Reconciliation

The four research files propose different phase counts that need explicit resolution:

| Source | Phases | Notable |
|--------|--------|---------|
| ARCHITECTURE | 4 | Consulting in Phase 3; Discovery in Phase 4 |
| PITFALLS | 5 | IA/scoping as a distinct Phase 1 before any build |
| STACK | 6 | SEO and privacy as separate late phases |
| FEATURES | 2-3 | Consulting treated as P1 alongside projects and writing |

**Core tensions:**
- ARCHITECTURE vs FEATURES: consulting in Phase 3 vs P1. ARCHITECTURE wins — current site preserves the consulting path; peer inbound unblocks more value faster.
- PITFALLS vs all others: IA/scoping should be a distinct phase. Correct in spirit, but this is pre-build planning work, not a build phase — fold it into Phase 1 as a mandatory gate before scaffolding.
- STACK vs all others: SEO/privacy as separate late phases. Wrong — these are foundational page-template contracts, not additive features. Pitfall #5 is exactly how this recurs. Bake them into Phase 1.
- FEATURES: treating consulting as P1 alongside everything else would produce an overloaded Phase 1. Split is better.

**Recommended 4-phase structure:**

---

### Phase 1: Foundation + Personal Surface

**Rationale:** Delivers the inbound-enabling core with minimal scope. Project pages make Wesley findable to peers. Writing can be sparse. Consulting explicitly deferred because the current site still works for it. SEO and privacy infrastructure baked in as foundational requirements, not additive.

**Pre-build gates (PITFALLS-sourced — must complete before scaffolding):**
- Content inventory: list vault essays/notes that could ship at launch. If <5 publishable essays, commit to Notes-only writing surface in Phase 2.
- Two-front-door IA decision documented (subpath confirmed).
- Consulting CTA placement rule agreed: no consulting CTAs in personal body copy.
- Homepage worldview copy drafted (<=150 words; one peer + one non-peer reader test).

**Delivers:**
- Astro 6 project scaffolded, Vercel deploy wired, design tokens established
- `BaseLayout`, `BaseSEO`, `JsonLd` baked into every layout from day one
- Homepage: one-sentence worldview, 4 project cards, recent writing stub, contact CTA
- About page, 4 project pages, Contact page
- Self-hosted fonts (Astro Fonts API — day one)
- Plausible analytics wired
- robots.txt, sitemap.xml, llms.txt
- CI: `astro check && astro build`; Lighthouse Accessibility >=95; Vercel preview deploys on PRs
- `/colophon` page

**Avoids pitfalls:** #4 privacy hypocrisy, #5 SEO invisibility, #3 dual-audience confusion (layout firewall established), #18 auto-deploy without staging.

**Research flag:** Standard patterns — no phase research needed.

---

### Phase 2: Writing Surface

**Rationale:** Peer inbound accelerates when writing is live. Scope (essays + notes vs. notes-only) set by Phase 1 content inventory gate — don't skip that gate.

**Delivers:**
- Essay collection + `EssayLayout` (reading-optimized, abstract, reading time)
- Notes collection + `NoteLayout` (seedling/budding/evergreen status badge)
- `/writing` combined hub
- RSS feeds (combined + per-collection); validated at W3C feed validator + tested in actual readers
- `RelatedContent.astro` + `lib/relations.ts` cross-collection linking
- `lib/tags.ts` + `/topics/[tag]` pages
- 3-5 seed essays + 5-10 seed notes from vault
- Pre-launch audit: every page has >=2 internal links

**Avoids pitfalls:** #1 dead-blog graveyard (library mode IA, no "latest posts" homepage widget), #6 content silos, #8 link rot (quote-then-link authoring convention established), #11 RSS broken.

**Research flag:** Standard patterns — Astro RSS + content collections are canonical.

---

### Phase 3: Consulting Subsection

**Rationale:** Current single-page site continues serving consulting. Phase 3 only after personal surface is live and validated. This is restoring a maintained capability, not the strategic priority.

**Delivers:**
- `ConsultingLayout.astro` (Services / Case Studies / Book nav; persistent Motion CTA; no Polaris content bleed)
- `consulting` collection + Zod schema (price, duration, bookingUrl)
- `/consulting` hub + 3 service pages drawn from CTB-Proposal/Audit-Plan/Marketing-Setup material
- JSON-LD Service schema
- Motion booking as link-out (not iframe — preserves privacy stance)
- Single cross-link from personal About/Contact to `/consulting`: one neutral line

**Avoids pitfalls:** #3 dual-audience confusion (layout firewall enforced; peer + client reader tests before launch).

**Research flag:** Standard patterns — no research phase needed. Service page copy is content work.

---

### Phase 4: Discovery Surface

**Rationale:** None of these features matter with <20 content items. Build proportional to content volume. Explicitly milestone 2 / v1.x work.

**Delivers:**
- Pagefind search (trigger: 10+ essays/notes)
- Dynamic per-essay OG images via Satori (trigger: 5+ essays)
- Webmention receiver (webmention.io)
- Newsletter (Buttondown) — when 3-4 essays exist
- `/now` page + nownownow.com submission
- `/uses` page, `/press` media kit
- Outbound link-rot audit script

**Avoids pitfalls:** #10 build-time creep, #7 infrastructure-before-content.

**Research flag:** Dynamic OG images with Satori + Astro 6 — verify API compatibility at phase start. Everything else is standard.

---

### Phase Ordering Rationale

- Phase 1 before Phase 2: content collection infra, design tokens, and layout system must exist before writing is layered on.
- Phase 2 before Phase 3: peer inbound is the higher-value unlock; current site preserves consulting path.
- SEO and privacy in Phase 1, not a separate phase: these are page-template contracts, not features. Separating them (as STACK suggests) is exactly how Pitfall #5 recurs.
- Consulting at Phase 3, not Phase 1 (overriding FEATURES): FEATURES conflates eventual needs with launch requirements. Current site handles consulting.
- Phase 4 after content accumulates: discovery features are useless before a content body exists. Building them at launch is Pitfall #7.

### Research Flags

Needs research during planning:
- **Phase 4:** Dynamic OG images — verify Satori + Astro 6 static output compatibility before committing to the approach.

Standard patterns (no research phase needed):
- **Phase 1:** Astro 6 + Vercel is well-documented and HIGH confidence.
- **Phase 2:** Astro content collections + RSS are canonical patterns.
- **Phase 3:** Service page architecture is content work, not technical unknowns.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Astro 6, Tailwind v4, Pagefind, Plausible verified via 2026 official docs and multiple sources. Context7 MCP was unavailable to STACK researcher; reconfirm exact version pins at install time via `npm view`. |
| Features | HIGH | Table stakes and differentiators well-established in IndieWeb/BTC writing community. Priority matrix opinionated but defensible against reference sites. |
| Architecture | HIGH | Content-collection hub with curated homepage is the canonical 2026 pattern, directly evidenced by Appleton, Ango, Lovin. Subpath decision well-reasoned. |
| Pitfalls | HIGH | Domain-specific to Wesley's situation (dual audience, worldview as moat, burst-working style). Not generic web advice. |

**Overall confidence:** HIGH

### Gaps to Address

- **Content inventory gate:** Before Phase 2 planning, Wesley must audit what vault content is actually publishable. This is the single highest-leverage scoping decision in the project — it sets whether Phase 2 builds essays + notes or notes-only.
- **Visual identity:** PROJECT.md leaves cream/charcoal/green/gold as "may carry forward." Existing palette is already ageless (not trendy). Recommendation: carry forward with minor refinements. Needs explicit decision at Phase 1 start.
- **Analytics hosting:** Plausible Cloud ($9/mo) vs. GoatCounter (free) vs. self-hosted Umami. Recommend Plausible Cloud for v1 (lower ops burden, better UX), with self-hosted migration path documented for later.
- **Exact version pins:** STACK researcher correctly flagged Context7 MCP unavailability. Run `npm view astro version` etc. at scaffold time.

---

## Sources

See full source lists in individual research files:
- `/home/nofeds/projects/ctb-website/.planning/research/STACK.md`
- `/home/nofeds/projects/ctb-website/.planning/research/FEATURES.md`
- `/home/nofeds/projects/ctb-website/.planning/research/ARCHITECTURE.md`
- `/home/nofeds/projects/ctb-website/.planning/research/PITFALLS.md`

### Key primary sources

- [Astro 6.1 release notes + Fonts API](https://astro.build/blog/astro-610/) — HIGH confidence
- [Tailwind v4 with Astro (official)](https://tailwindcss.com/docs/installation/framework-guides/astro) — HIGH confidence
- [Astro content collections docs](https://docs.astro.build/en/guides/content-collections/) — HIGH confidence
- [Google Fonts GDPR Munich ruling](https://privacychecker.pro/blog/google-fonts-gdpr-compliant) — HIGH confidence
- [Pagefind comparison 2026](https://sarthakmishra.com/blog/astro-search-comparison) — HIGH confidence
- [Backlinko subdirectory vs subdomain analysis](https://backlinko.com/subdirectory-vs-subdomain) — MEDIUM confidence
- [Maggie Appleton — essays/notes/topics structure](https://maggieappleton.com/) — HIGH confidence (living reference)

---
*Research completed: 2026-04-25*
*Ready for roadmap: yes*
