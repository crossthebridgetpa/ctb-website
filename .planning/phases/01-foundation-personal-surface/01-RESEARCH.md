# Phase 1: Foundation + Personal Surface — Research

**Researched:** 2026-04-26
**Domain:** Astro 6 static site scaffolding + privacy-respecting infrastructure (fonts, analytics, network audit, SEO/JSON-LD/llms.txt)
**Confidence:** HIGH for core stack and patterns; MEDIUM-HIGH for Astro Fonts API exact options surface; MEDIUM for Umami self-hosting target (Wesley decision pending)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Worldview Copy (Hero)**
- **D-01:** Homepage hero is locked at the question-led, conversational voice. Final copy:
  > **What does it look like to opt out — without going off-grid?**
  > Cross The Bridge is the answer I'm building.
  >
  > Bitcoin instead of banks. Self-hosted compute instead of surveillance Cloud. AI you own, not AI that owns you.
  >
  > [Get in touch]
  ~50 words. CTA wording: "Get in touch" (locked).
- **D-02:** Tone is toned-down worldview — direct, claims a position, names the legacy systems but doesn't preach. No eyebrow/kicker line.

**Project Pages**
- **D-03:** Three project pages in v1: Bitcoin Bay, FBBA, AI/Petros/Hermes. **Freedom Tech is not a fourth project** — it is the thesis that all three projects manifest. Thesis lives on About. PROJ-03 folded into IDENT-04.
- **D-04:** Page depth is **mixed by project** — decided per-project at execution.
- **D-05:** Per-project engagement CTAs:
  - Bitcoin Bay → email signup for events list (URL TBD; placeholder + flag if missing)
  - FBBA → link out to separate FBBA website (URL TBD)
  - AI/Petros/Hermes → live consulting offer; **env-configurable URL** (`CONSULTING_URL`, default `/consulting`, override to `https://crossthebridge.io` for Phase 1 staging deploys)

**Homepage**
- **D-06:** 4-tile grid (3 project cards + 1 thesis card) + single "Get in touch" CTA. **No consulting CTA on homepage.**
- **D-07:** No "Recent writing" module in Phase 1; placeholder block reserved for Phase 2.

**About**
- **D-08:** Biography + Freedom Tech thesis fused. Sources: `~/.hermes/vault/people/About Me.md` + `~/.hermes/vault/projects/petros/petros-polaris.md` Page 1. Thesis first, bio second. Distillation: real but not preachy. Doctrine words ("Beast System") stay in the vault.
- **D-09:** Reuse + optimize `wesley-headshot.jpg` (95 KB) → AVIF/WebP/JPEG variants + responsive srcset, `loading="lazy"`. Headshot on About only; homepage stays text-forward.

**Visual Identity**
- **D-10:** Carry forward cream/charcoal/green/gold palette with WCAG AA fixes. `prefers-color-scheme` only — no manual toggle.
- **D-11:** Playfair Display + Inter, **self-hosted via Astro Fonts API + Fontsource**. No Google Fonts CDN.
- **D-12:** Collison-style generous whitespace — single column, large type, lots of breathing room.

**Operational**
- **D-13:** Contact = obfuscated mailto to `wesley@crossthebridge.io`. No form, no backend, no Vercel function.
- **D-14:** Analytics = **self-hosted Umami**. Hosting target TBD during planning (nomus Mac Studio @ `100.74.197.54`, existing VPS, or separate Vercel project). Surface as P0 plan task.
- **D-15:** Staging URL = `staging.crossthebridge.io` subdomain via DNS. Apex stays on existing single-page site through Phase 1.
- **D-16:** CI gates blocking PR merge:
  - `astro check && astro build` passes
  - Vercel preview deploy succeeds
  - **Network audit passes** — no Google domains contacted on first paint
  - **No Lighthouse threshold gate** (informational only)

**Architecture (carried forward)**
- **D-17:** Astro 6.x + Tailwind v4 (via `@tailwindcss/vite`, NOT `@astrojs/tailwind`) + `@astrojs/vercel` static adapter + `@astrojs/sitemap` + `@astrojs/mdx` (installed, .md default).
- **D-18:** Layout firewall: `BaseLayout.astro` for personal surface; `ConsultingLayout` is Phase 3 work.
- **D-19:** Subpath not subdomain for `/consulting` (Phase 3 architectural decision, locked).

### Claude's Discretion

- Mobile nav implementation pattern — must work <768px, accessible, simple for 5-link nav.
- JSON-LD schema authoring — Person + WebSite for Phase 1.
- Exact CSS variable names + Tailwind theme keys — follow Astro/Tailwind conventions; document in `/colophon`.
- File and route conventions — follow Astro defaults.
- Network-audit implementation mechanism (Playwright is the standard).

### Deferred Ideas (OUT OF SCOPE)

- AYLIP / Petros homeschool product framing — belongs on AI/Petros project page, NOT About.
- Plausible Cloud revisit — only if Umami self-hosting proves operationally heavy (revisit gate: 7 days into Phase 1).
- FBBA membership form — out of Phase 1 scope.
- Bitcoin Bay events mailing list — placeholder if not ready.
- Manual light/dark mode toggle — out of scope for v1.
- Newsletter signup on homepage — Out of Scope per REQUIREMENTS.md.
- Webmention support — v2 milestone.
- Pagefind search, dynamic per-essay OG images, related-content modules — Phase 2/v2.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| IDENT-01 | Homepage leads with one toned-down worldview claim (≤150 words above the fold) | Locked verbatim in D-01 (~50 words); Hero component spec in UI-SPEC §Components |
| IDENT-02 | Homepage 4-tile grid: 3 project cards + 1 thesis card | Tile component spec + locked copy in UI-SPEC §Components #6; route map in §Page Templates |
| IDENT-03 | Single "Get in touch" CTA — no consulting CTA on homepage | CtaButton spec in UI-SPEC §Components #5; Hero copy locks single CTA |
| IDENT-04 | About fuses bio + Freedom Tech thesis | Distillation guidance in CONTEXT.md `<specifics>`; About page template in UI-SPEC §Page Templates; h-card pattern (this RESEARCH §SEO/Microformats) |
| IDENT-05 | Contact page with at least one working inbound channel | Mailto obfuscation pattern (§Mailto Obfuscation below) |
| IDENT-06 | `/colophon` documenting tech stack + no-tracking stance | Standard static page; copy block specified in UI-SPEC §Page Templates |
| PROJ-01 | Bitcoin Bay project page | Project page structure in UI-SPEC §Page Templates; per-project CTA in D-05 |
| PROJ-02 | FBBA project page | Same |
| PROJ-04 | AI/Petros/Hermes project page | Same; env-configurable consulting URL pattern (§Env Vars below) |
| PROJ-05 | Each project page surfaces ≥1 engagement path | Locked CTAs in D-05 |
| SEO-01 | Every page renders meta description, OG, canonical via shared `BaseSEO.astro` | BaseSEO spec in UI-SPEC §Components #7; OG image template (§OG Image Strategy) |
| SEO-02 | Every page renders JSON-LD via shared `JsonLd.astro` (Person + WebSite for Phase 1) | JsonLd spec in UI-SPEC §Components #8; schema templates (§JSON-LD Schemas below); validation approach (§JSON-LD Validation) |
| SEO-03 | Valid `sitemap.xml` via `@astrojs/sitemap` | Standard integration; no research needed beyond version pin |
| SEO-04 | `robots.txt` permitting all crawlers + sitemap reference | Standard static file in `public/`; AI-crawler allow-list (§Robots/llms.txt) |
| SEO-05 | Curated `llms.txt` for AI crawlers | Format spec + minimal example (§llms.txt below) |
| PRIV-01 | Self-host Playfair + Inter via Astro Fonts API | Fonts API config (§Astro Fonts API below) |
| PRIV-02 | No GA4, no Vercel Web Analytics, no Meta Pixel | Self-hosted Umami per D-14 (§Umami Self-Hosting) |
| PRIV-03 | No third-party media iframes on first paint | UI-SPEC ban list; no embeds in Phase 1 |
| A11Y-01 | Mobile nav works <768px | Mobile nav pattern (§Mobile Nav Pattern below); already specified in UI-SPEC §Components #2 |
| A11Y-02 | WCAG 2.2 AA baseline | Color/typography/touch-target contracts in UI-SPEC §Color and §Accessibility Contract |
| A11Y-03 | Dark + light modes via `prefers-color-scheme` | Token sets in UI-SPEC §Color §Tailwind Theme Block |
| INFRA-01 | Astro 6 + Tailwind v4 (`@tailwindcss/vite`) + `@astrojs/vercel` static | Verified versions (§Standard Stack); install order (§Install Order) |
| INFRA-02 | CI runs `astro check && astro build` on every PR | GitHub Actions workflow shape (§CI Workflow below) |
| INFRA-03 | Vercel preview deploys for every PR | Vercel default behavior with GitHub integration; no extra config |
| INFRA-04 | Repo stays at `crossthebridgetpa/ctb-website` | No code change; constraint only |
</phase_requirements>

---

## Summary

Phase 1 is mostly an integration task on a stack that is already firmly locked: Astro 6.1, Tailwind v4 via the Vite plugin, `@astrojs/vercel` static adapter, self-hosted Playfair + Inter via the Fonts API, plus a small set of bespoke components (`BaseLayout`, `BaseSEO`, `JsonLd`, `Hero`, `Tile`, `Nav`, `Footer`, `CtaButton`). Six pages render off this scaffold (home, About, three project pages, Contact, Colophon).

The genuinely new research surface is narrower than it looks. The CLAUDE.md and SUMMARY recommend Plausible Cloud; the discuss-phase overrode that to **self-hosted Umami (D-14) with hosting target TBD**. That decision creates the only Phase 1 P0 dependency that isn't trivially resolvable from documentation: the script tag in `BaseLayout` cannot be wired until Umami has a stable HTTPS endpoint. Everything else (fonts API, JSON-LD, llms.txt, OG image, mobile nav, mailto obfuscation, network-audit CI gate, image pipeline, DNS) maps to standard recipes.

**Primary recommendation:** Resolve the Umami hosting target in the first plan-phase task (P0). Ship without the analytics script tag if it's not ready by execution time — analytics is not launch-blocking and the Colophon already commits to the no-tracking stance whether Umami is wired or not. Use Playwright for the network-audit CI gate (one assertion script, runs against the Vercel preview URL on every PR). Use Astro's `<Font>` component with Fontsource provider for fonts. Hand-author the static OG PNG once; defer Satori dynamic OG to v2 per CONTEXT.md.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Page rendering (HTML output) | Static build (Astro) | — | All routes are static; no SSR. Astro emits `dist/*.html`. |
| Image optimization | Build-time (Sharp) + Vercel Image API | — | `imageService: 'vercel'` defers transforms to Vercel's CDN. Sharp not shipped to runtime. |
| Font hosting | Origin (self-hosted) | — | Astro Fonts API downloads + caches fonts during build; served from `/_astro/` paths on the same origin. **No third-party request.** |
| Analytics ingest | External (Umami endpoint TBD) | — | Loaded as `<script defer>` from the Umami host; data goes only to that endpoint. Treated as the ONE allowed third-party domain. |
| JSON-LD / SEO / OG | Build-time (Astro components in `<head>`) | — | All meta is statically rendered per route; no runtime evaluation. |
| Mobile nav state | Client (vanilla JS island, ~30 lines) | — | Tiny inline script; no framework dependency. Drawer toggle, ARIA state, focus trap, Escape close. |
| Mailto obfuscation | Client (small JS reveal) | Build-time encoding | Plaintext email never appears in rendered HTML; JS reconstructs on click. Display variant `wesley[at]crossthebridge[dot]io` is human-readable fallback. |
| CI: build + check | GitHub Actions | — | `astro check && astro build` runs on PRs. Vercel preview deploys are independent and triggered by Vercel's GitHub integration, not GH Actions. |
| Network audit | GitHub Actions (Playwright job, against Vercel preview URL) | — | Runs after Vercel preview is live; asserts no banned domains contacted on first paint. |
| Routing | Astro file-based routing | — | One `.astro` file per route under `src/pages/`. No dynamic routes in Phase 1 (project pages are individual files, not a `[slug].astro` collection — kept simple for 3 pages). |

---

## Standard Stack

### Core (verified versions on npm 2026-04-26)

| Library | Version | Purpose | Provenance |
|---------|---------|---------|------------|
| `astro` | `6.1.9` | Static site framework | `[VERIFIED: npm view astro version → 6.1.9]` |
| `@astrojs/vercel` | `5.0.4` | Vercel adapter (static mode) | `[VERIFIED: npm view @astrojs/vercel version → 5.0.4]` — **Note:** SUMMARY/STACK predicted ^8.x; npm registry says 5.0.4 is current. The astro@5/6 vs adapter version coupling needs confirmation at install. Treat the `^8.x` reference in CLAUDE.md as outdated; pin to whatever `npx astro add vercel` selects. |
| `@astrojs/sitemap` | `3.7.2` | sitemap.xml generation | `[VERIFIED: npm view @astrojs/sitemap version → 3.7.2]` |
| `@astrojs/mdx` | `5.0.4` | MDX support (installed, .md default per CLAUDE.md) | `[VERIFIED: npm view @astrojs/mdx version → 5.0.4]` |
| `tailwindcss` | `4.2.4` | Utility CSS + design tokens via `@theme` | `[VERIFIED: npm view tailwindcss version → 4.2.4]` |
| `@tailwindcss/vite` | `4.2.4` | Vite plugin (replaces deprecated `@astrojs/tailwind`) | `[VERIFIED: npm view @tailwindcss/vite version → 4.2.4]` |

### Supporting

| Library | Version | Purpose | Provenance |
|---------|---------|---------|------------|
| `astro-icon` | `1.1.5` | Inline SVG icons (lucide set) | `[VERIFIED: npm view astro-icon version → 1.1.5]` |
| `@iconify-json/lucide` | `1.2.103` | Lucide icon set for astro-icon | `[VERIFIED: npm view @iconify-json/lucide version → 1.2.103]` |
| `@fontsource/playfair-display` | `5.2.8` | Self-hosted Playfair Display 700 (Fontsource provider auto-detects) | `[VERIFIED: npm view @fontsource/playfair-display version → 5.2.8]` |
| `@fontsource-variable/inter` | `5.2.8` | Self-hosted Inter Variable (preferred over static weights per UI-SPEC) | `[VERIFIED: npm view @fontsource-variable/inter version → 5.2.8]` |
| `schema-dts` | `2.0.0` | TypeScript types for Schema.org JSON-LD (compile-time validation) | `[VERIFIED: npm view schema-dts version → 2.0.0; Google-maintained, no runtime cost]` |
| `@playwright/test` | latest stable | Network audit CI gate (and any future smoke test) | `[CITED: playwright.dev/docs/ci-intro]` |

### Development tools

| Tool | Version | Purpose | Provenance |
|------|---------|---------|------------|
| Node.js | `22.22.0` (local) | Build runtime; Astro 6 requires 18.20.8+/20.3.0+/22.0.0+ | `[VERIFIED: node --version on this machine]` |
| pnpm | `10.28.2` (local) | Package manager (preferred for determinism) | `[VERIFIED: pnpm --version]` |
| npm | `10.9.4` (local) | Fallback package manager | `[VERIFIED: npm --version]` |
| Docker | `29.2.1` (local) | Required if Umami self-hosts on `nomus` | `[VERIFIED: docker --version]` |
| Prettier + `prettier-plugin-astro` | latest | Formatting `.astro`/`.md`/`.ts`/`.css` | `[CITED: prettier-plugin-astro README]` |

### Alternatives considered (and rejected per CONTEXT.md / CLAUDE.md)

| Instead of locked choice | Could use | Tradeoff |
|--------------------------|-----------|----------|
| Self-hosted Umami (D-14) | Plausible Cloud (EU), $9/mo | Less ops burden, but ties Wesley to a hosted SaaS. Revisit gate exists if Umami proves heavy. |
| `@tailwindcss/vite` (D-17) | `@astrojs/tailwind` | Deprecated for v4; do not use. |
| Astro Fonts API + Fontsource provider (D-11) | npm-import Fontsource packages directly in CSS | Both work; Fonts API handles preload + fallback metric overrides automatically. Use Fonts API. |
| Plain Markdown (CLAUDE.md default) | MDX as default | MDX is JS-module-per-file, heavier preprocess. Enabled but unused in Phase 1. |
| Static OG fallback (D-09 / DISC-02 deferred) | Satori dynamic OG | Deferred to v2 per CONTEXT.md `<deferred>`. |

### Installation

```bash
# 1. Scaffold (interactive, choose minimal template, TypeScript: strict)
npm create astro@latest ctb-website -- --template minimal --typescript strict
cd ctb-website

# 2. Adapters & integrations (use astro CLI helpers — they patch astro.config.mjs)
npx astro add vercel        # static adapter; pairs with `output: 'static'`
npx astro add tailwind      # installs @tailwindcss/vite, NOT @astrojs/tailwind
npx astro add sitemap
npx astro add mdx           # enabled but defaulted off in collection schemas

# 3. Content & fonts (manual installs)
npm install @fontsource/playfair-display @fontsource-variable/inter
npm install astro-icon @iconify-json/lucide
npm install -D schema-dts                       # JSON-LD type-check
npm install -D @playwright/test                 # network audit CI

# 4. Verify versions (quarterly hygiene)
npm outdated
```

**Version verification gate:** Run `npm view <pkg> version` immediately before committing the `package.json` baseline; the `[VERIFIED]` versions above were captured on 2026-04-26 and may drift.

---

## Architecture Patterns

### System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        BUILD-TIME (CI / Vercel)                   │
│                                                                    │
│   Markdown / .astro pages    Astro Fonts API     @fontsource/*    │
│           │                       │                  │             │
│           ▼                       ▼                  ▼             │
│   ┌────────────────────────────────────────────────────────┐     │
│   │           Astro build (vite + sharp + tailwind v4)      │     │
│   │  - emits HTML for all routes                            │     │
│   │  - emits /_astro/*.woff2 (self-hosted fonts)           │     │
│   │  - emits OG default.png (static asset)                 │     │
│   │  - emits sitemap.xml via @astrojs/sitemap              │     │
│   │  - emits robots.txt + llms.txt (from public/)          │     │
│   └────────────────────┬───────────────────────────────────┘     │
│                        │                                           │
│                        ▼                                           │
│           dist/ (static HTML + assets)                             │
└──────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│                  EDGE / VERCEL (production)                       │
│   Vercel CDN  ─────►  staging.crossthebridge.io                  │
│        │                                                           │
│        ├─► /            → BaseLayout + Hero + Tile×4              │
│        ├─► /about       → BaseLayout + headshot + thesis + bio    │
│        ├─► /projects/*  → BaseLayout + project header + body      │
│        ├─► /contact     → BaseLayout + obfuscated mailto          │
│        ├─► /colophon    → BaseLayout + tech-stack table           │
│        ├─► /sitemap.xml → @astrojs/sitemap output                 │
│        ├─► /robots.txt  → static                                  │
│        └─► /llms.txt    → static                                  │
│                                                                    │
│   Vercel Image API  ─►  on-demand AVIF/WebP for /wesley-headshot.* │
└──────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│                          CLIENT (browser)                          │
│   First paint requests:                                            │
│     ✓ HTML, CSS, font files, OG image          → ORIGIN ONLY       │
│     ✓ Umami script (one allowed 3p domain)     → umami host        │
│     ✗ Google Fonts                              → BANNED           │
│     ✗ GA4 / GTM                                 → BANNED           │
│     ✗ Vercel Speed Insights                     → BANNED           │
│                                                                    │
│   Interaction-only (after click):                                  │
│     - Mobile nav drawer (vanilla JS island, ~30 lines)             │
│     - Mailto reveal (small JS decoder)                             │
└──────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│                   CI / VERIFICATION (GitHub Actions)               │
│   On every PR:                                                     │
│     1. astro check && astro build                                  │
│     2. (Vercel deploys preview automatically via GH integration)   │
│     3. Playwright job hits preview URL, asserts:                   │
│          - no requests to fonts.googleapis.com / fonts.gstatic.com │
│          - no requests to google-analytics.com / *.googletagmanager│
│          - no requests to youtube/twitter/x/usemotion              │
│          - allowed: own origin + Umami host (if configured)        │
│   Merge to main blocked unless all three green.                    │
└──────────────────────────────────────────────────────────────────┘
```

### Recommended Project Structure (Phase 1 only — Phase 2/3 add layers)

```
ctb-website/
├── astro.config.mjs              # vercel adapter, sitemap, mdx, tailwind v4 vite, fonts API
├── tsconfig.json                 # strict
├── package.json                  # scripts: build, check, dev, test:network
├── playwright.config.ts          # CI network audit
├── .github/
│   └── workflows/
│       └── ci.yml                # astro check + build + playwright network audit
├── public/
│   ├── robots.txt                # static, allow all + sitemap reference
│   ├── llms.txt                  # static, curated for Phase 1 (5 pages)
│   ├── favicon.svg               # CTB monogram or bridge glyph
│   ├── og/
│   │   └── default.png           # 1200×630 static fallback (D-09; per-essay deferred to v2)
│   └── wesley-headshot.jpg       # 95 KB original; Astro Image emits responsive variants
├── src/
│   ├── pages/
│   │   ├── index.astro           # homepage (Hero + Tile×4)
│   │   ├── about.astro           # IDENT-04 thesis + bio
│   │   ├── contact.astro         # IDENT-05 obfuscated mailto
│   │   ├── colophon.astro        # IDENT-06 stack + no-tracking stance
│   │   ├── 404.astro             # custom 404 (UI-SPEC §Copywriting)
│   │   └── projects/
│   │       ├── bitcoin-bay.astro     # PROJ-01
│   │       ├── fbba.astro            # PROJ-02
│   │       └── ai-petros-hermes.astro # PROJ-04
│   ├── layouts/
│   │   └── BaseLayout.astro      # D-18 — only layout in Phase 1
│   ├── components/
│   │   ├── Nav.astro             # incl. mobile drawer JS island
│   │   ├── Footer.astro
│   │   ├── Hero.astro            # homepage only
│   │   ├── CtaButton.astro       # primary variant only in Phase 1
│   │   ├── Tile.astro            # ProjectTile + ThesisTile (variant prop)
│   │   ├── Headshot.astro        # Astro <Image /> wrapper for D-09 pipeline
│   │   ├── ObfuscatedMailto.astro # D-13
│   │   ├── seo/
│   │   │   ├── BaseSEO.astro     # SEO-01
│   │   │   └── JsonLd.astro      # SEO-02 (Person, WebSite, BreadcrumbList, WebPage)
│   │   └── ExternalLink.astro    # icon + rel="noopener noreferrer"
│   ├── content/
│   │   └── config.ts             # collections schemas (empty in Phase 1, scaffolded for Phase 2)
│   ├── lib/
│   │   └── consulting-url.ts     # reads env CONSULTING_URL, defaults to '/consulting'
│   └── styles/
│       └── app.css               # Tailwind v4 @theme block (UI-SPEC §Tailwind Theme Block)
└── tests/
    └── network-audit.spec.ts     # Playwright assertion suite
```

**Why this shape (not the fuller ARCHITECTURE.md tree):** Phase 1 ships exactly 6 pages plus 404 and 3 static text files. Content collections are scaffolded (so Phase 2 can layer essays/notes onto a typed schema) but not consumed. No `EssayLayout`, `NoteLayout`, `RelatedContent` — those are Phase 2. No `ConsultingLayout`, `ConsultingNav`, `BookingCTA` — those are Phase 3. Three project pages are written as individual `.astro` files rather than a `projects/[slug].astro` dynamic route from a collection because the page bodies are deliberately heterogeneous (D-04 "mixed by project depth"); a collection schema would force shape we don't want yet.

### Pattern 1: Self-hosted fonts via Astro Fonts API

**What:** Use `fontProviders.fontsource()` in `astro.config.mjs` and the `<Font>` component in `BaseLayout`'s `<head>`. Fonts are downloaded at build time, cached, and emitted into `dist/_astro/`. Browser requests hit the same origin. **No `fonts.googleapis.com` / `fonts.gstatic.com` request, ever.**

**When to use:** Always, on this project. PRIV-01 is load-bearing.

**Provenance:** `[CITED: docs.astro.build/en/guides/fonts/]` `[CITED: docs.astro.build/en/reference/font-provider-reference/]`

**Concrete config:**

```javascript
// astro.config.mjs
import { defineConfig, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://staging.crossthebridge.io',  // override in Phase 3 cutover
  output: 'static',
  adapter: vercel({
    imageService: true,           // use Vercel image API in production
  }),
  integrations: [sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Playfair Display',
      cssVariable: '--font-display',
      weights: [700],             // UI-SPEC: only 700 used; 400 dropped
      styles: ['normal'],          // no italic per UI-SPEC §Typography
      subsets: ['latin'],
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter Variable',
      cssVariable: '--font-body',
      // Variable font; weights expressed as a range
      weights: ['400 600'],        // 400 + 600 only per UI-SPEC; 300/500 dropped
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
    },
  ],
});
```

```astro
---
// src/layouts/BaseLayout.astro (head fragment)
import { Font } from 'astro:assets';
---
<html lang="en">
  <head>
    <Font cssVariable="--font-display" preload />
    <Font cssVariable="--font-body" preload />
    <!-- ...BaseSEO, JsonLd, theme-color meta... -->
  </head>
```

The `preload` flag emits `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the LCP-critical pair. The Font component also injects the `@font-face` CSS automatically; the `cssVariable` is consumed in `app.css`'s `@theme` block (already specified in UI-SPEC §Tailwind Theme Block).

**Provenance for exact API surface:** `[CITED: docs.astro.build/en/reference/font-provider-reference/]` confirms `name`, `cssVariable`, `weights`, `styles`, `subsets`, `fallbacks`, `optimizedFallbacks` properties. The Variable-font weight range syntax (`'400 600'`) is `[ASSUMED]` from training but reflects the standard CSS Variable font weight range; verify against Fontsource docs at scaffold if the Font component errors out, and fall back to listing weights individually `[400, 600]` if the range form is rejected.

### Pattern 2: BaseSEO + JsonLd components in every layout

**What:** Two prop-driven `.astro` components consume page frontmatter and emit `<head>` elements. `BaseLayout` invokes both unconditionally — there is no per-page opt-in. Build-time check fails if required props are missing.

**Provenance:** `[CITED: schema.org/Person]` `[CITED: schema.org/WebSite]` for schema shapes. `[CITED: schemavalidator.org]` for validation tooling. `[CITED: github.com/google/schema-dts]` for TypeScript types.

**Example (truncated):**

```astro
---
// src/components/seo/JsonLd.astro
import type { Person, WebSite, WebPage, BreadcrumbList } from 'schema-dts';

interface Props {
  schema: 'website' | 'person' | 'webpage' | 'breadcrumb';
  data?: Record<string, unknown>;
}
const { schema, data = {} } = Astro.props;

const PERSON: Person = {
  '@type': 'Person',
  '@id': 'https://crossthebridge.io/about#wesley',
  name: 'Wesley Pyburn',
  jobTitle: 'Founder, Cross The Bridge',
  url: 'https://staging.crossthebridge.io/about',
  image: 'https://staging.crossthebridge.io/wesley-headshot.jpg',
  // sameAs: [...]  // populate when Wesley supplies public profile URLs
};

const WEBSITE: WebSite = {
  '@type': 'WebSite',
  '@id': 'https://staging.crossthebridge.io/#website',
  name: 'Cross The Bridge',
  url: 'https://staging.crossthebridge.io/',
  publisher: { '@id': 'https://crossthebridge.io/about#wesley' },
  description:
    "Wesley Pyburn's personal site — Freedom Tech, Bitcoin, sovereign AI, and the work of opting out of legacy systems.",
};

const json =
  schema === 'website' ? { '@context': 'https://schema.org', ...WEBSITE }
  : schema === 'person' ? { '@context': 'https://schema.org', ...PERSON }
  : { '@context': 'https://schema.org', '@type': 'WebPage', ...data };
---
<script type="application/ld+json" set:html={JSON.stringify(json)} />
```

**Per-page schema mapping (Phase 1):**

| Route | JSON-LD type(s) |
|-------|-----------------|
| `/` | `WebSite` (with publisher reference to Person `@id`) |
| `/about` | `Person` |
| `/projects/{bitcoin-bay,fbba,ai-petros-hermes}` | `BreadcrumbList` (Home → Projects → {name}) + `WebPage` |
| `/contact` | `WebPage` |
| `/colophon` | `WebPage` |

### Pattern 3: Layout firewall (D-18)

**What:** Phase 1 ships ONE layout (`BaseLayout`). When Phase 3 adds `ConsultingLayout`, the personal surface and the consulting surface diverge structurally (different nav, different footer, different CTA economy). Same design tokens, same fonts, same SEO components — different shells.

**Why it matters in Phase 1 even though only one layout exists:** the architecture must reserve space for the second layout to slot in cleanly. Concretely: `BaseLayout` should not hard-code anything that a Consulting page would need to override (no consulting CTA, no consulting nav links). Hold the line in the components themselves: `Nav.astro` lists exactly the personal-surface routes (Home/Projects/About/Contact/Colophon); when Phase 3 introduces `ConsultingNav.astro`, both render through their own layout.

**Provenance:** `[CITED: ARCHITECTURE.md Pattern 4: Layout firewall]` (project-internal doc).

### Pattern 4: Mobile nav drawer as tiny JS island (A11Y-01)

**What:** A vanilla-JS toggle, ~30 lines, inlined in `Nav.astro`. Slide-down drawer below the nav band on viewports <768px. Hamburger icon → `aria-expanded` toggle → drawer with vertical link list. Closes on link click, Escape key, or hamburger re-toggle. Focus trap while open. Body scroll-lock while open. Respects `prefers-reduced-motion` (no slide animation when reduced).

**When to use it (vs. JS-free `:target` or `<details>`):** UI-SPEC already specified this pattern. The reasoning holds — `:target` requires URL fragment manipulation that pollutes browser history; `<details>` lacks the focus-trap and Escape-close behaviors WCAG 2.2 expects from a modal-like nav. ~30 lines of vanilla JS is the cheapest way to get all the AA behaviors right.

**Provenance:** `[CITED: a11ymatters.com/pattern/mobile-nav]` (accessible mobile nav pattern reference). UI-SPEC §Components #2 specifies the exact ARIA attributes, drawer behavior, and keyboard contract.

**Implementation skeleton (planner can refine):**

```html
<button
  type="button"
  id="nav-toggle"
  class="md:hidden"
  aria-label="Open navigation"
  aria-controls="mobile-nav"
  aria-expanded="false"
>
  <Icon name="lucide:menu" />
</button>
<nav id="mobile-nav" aria-label="Mobile navigation" hidden>
  <!-- ...links... -->
</nav>

<script>
  const btn = document.getElementById('nav-toggle');
  const drawer = document.getElementById('mobile-nav');
  const close = () => {
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation');
    drawer.hidden = true;
    document.body.style.overflow = '';
    btn.focus();
  };
  const open = () => {
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation');
    drawer.hidden = false;
    document.body.style.overflow = 'hidden';
    drawer.querySelector('a')?.focus();
  };
  btn.addEventListener('click', () =>
    btn.getAttribute('aria-expanded') === 'true' ? close() : open()
  );
  drawer.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') close();
  });
</script>
```

Focus trap can be added with one more `keydown` listener that wraps Tab inside the drawer's focusable elements. UI-SPEC requires it; planner should include.

### Pattern 5: Image pipeline (D-09)

**What:** Use Astro's `<Image />` component with `imageService: 'vercel'` configured in the adapter. In production, Vercel's image API does on-demand AVIF/WebP/JPEG transforms based on Accept headers; locally and in build, Sharp does it.

**Provenance:** `[CITED: docs.astro.build/en/guides/images/]` `[CITED: vercel.com/docs/image-optimization]`

```astro
---
// src/components/Headshot.astro
import { Image } from 'astro:assets';
import headshot from '../../public/wesley-headshot.jpg';
---
<Image
  src={headshot}
  alt="Wesley Pyburn — founder of Cross The Bridge"
  widths={[320, 480, 640, 800, 1200]}
  sizes="(min-width: 768px) 280px, 100vw"
  format="avif"
  fallbackFormat="jpg"
  loading="lazy"
  decoding="async"
  class="headshot-frame"
/>
```

The `widths` set matches UI-SPEC §Imagery (320/480/640/800/1200). `sizes` reflects the 280px frame on ≥768px and full-width on mobile. Vercel's image API serves the smallest format the client accepts (AVIF → WebP → JPEG). The original 95 KB JPEG stays in `public/` and serves as the JPEG fallback URL.

**Note on `imageService: true` vs the older `serviceEntryPoint`:** In `@astrojs/vercel` v5+, `imageService: true` on the adapter options enables the Vercel image service. The older `'@astrojs/image/services/vercel'` entry point reference in some 2024-era blog posts is from a deprecated `@astrojs/image` integration and **should not be used**. `[VERIFIED: docs.astro.build/en/guides/integrations-guide/vercel/]`

### Anti-patterns to avoid (Phase-1 specific)

- **Don't import fonts via `@import url('https://fonts.googleapis.com/...')` in `app.css`** — common scaffold inertia; would silently re-introduce the privacy-hypocrisy pitfall.
- **Don't add `<script async src="https://www.googletagmanager.com/gtm.js?id=...">`** — even commented-out templates have shipped accidentally.
- **Don't enable Vercel Web Analytics or Speed Insights** in the Vercel project dashboard. CONTEXT.md and CLAUDE.md both ban this; it's a UI toggle that doesn't appear in repo code, so a checklist item must include "Vercel project Settings → Analytics: OFF; Speed Insights: OFF."
- **Don't use Vercel preview password protection during Phase 1** unless explicitly desired — it requires a `vercel-preview-bypass` cookie that breaks the Playwright network audit.
- **Don't iframe the Motion booking link in any Phase 1 page** — Phase 1 has no consulting CTA on personal pages anyway, but the principle holds for Phase 3: link out, never iframe.
- **Don't auto-generate the homepage tile copy from a JSON config file in Phase 1** — UI-SPEC has the copy locked verbatim; treat it as content not config. Reduces edit blast radius.

---

## Don't Hand-Roll

| Problem | Don't build | Use instead | Why |
|---------|-------------|-------------|-----|
| Self-hosting Playfair / Inter | Manually downloaded `.woff2` files in `public/fonts/` + hand-written `@font-face` blocks | Astro Fonts API + `@fontsource/*` packages | Fonts API handles preload, fallback metric overrides (avoid CLS), caching, and format selection automatically. Hand-rolled is 30 lines of CSS that gets one of those wrong. |
| JSON-LD schema authoring | Hand-typed JS objects with no validation | `schema-dts` types + `<script type="application/ld+json">{JSON.stringify(typedObject)}</script>` | Schema.org has 800+ types and inheritance rules. schema-dts catches misspellings, missing required fields, and wrong nesting at compile time. Free type-safety. |
| Sitemap | Hand-written XML | `@astrojs/sitemap` | Auto-discovers routes; handles lastmod, priority. |
| Mailto obfuscation | DIY ROT13 alone | Layered approach (display variant + JS reveal); see §Mailto Obfuscation | ROT13-only is defeated by trivial scrapers in 2026. Combine with `data-` attributes and reconstruction-on-click. |
| Network audit assertions | Hand-rolled curl scripts that grep response bodies | Playwright `page.on('request')` with banned-host assertion | curl can't tell you what the rendered HTML *causes the browser to fetch*. Playwright runs an actual browser and captures every network request, including ones triggered by inline scripts. |
| Image transforms | Sharp invoked manually in a build script | Astro `<Image />` + `imageService: 'vercel'` | Astro handles `<picture>` source ordering, srcset width sets, AVIF/WebP/JPEG fallback, and lazy-loading attributes. Vercel does the transforms on-demand via CDN. |
| Mobile nav focus trap | DIY focusable-element traversal | `focus-trap` npm package OR ~10 lines of vanilla Tab-key handling | If using vanilla, the contract is small enough; if using a library, `focus-trap` is the de facto choice. UI-SPEC accepts vanilla. |
| Markdown rendering on About + Project pages | Hand-written HTML | Just write the page bodies as `.astro` with inline content (or .md if it's all prose) | Phase 1 pages are static; no need for the `getEntry` plumbing yet. Phase 2 layers content collections on. |
| Color-contrast verification | Eyeballing | A pre-launch pass through https://webaim.org/resources/contrastchecker/ with the locked tokens | UI-SPEC has done the heavy lifting. The planner should include "verify token table values match rendered output" as a launch-checklist item, not a build-time check. |

**Key insight:** Phase 1 has no business hand-rolling anything. Every domain in scope (fonts, JSON-LD, sitemap, image pipeline, network audit) has a canonical 2026 answer with a working npm package or framework primitive. The only place "build it ourselves" is correct is the mailto obfuscator and the mobile nav drawer, and both are tiny enough that a library would add more weight than the code.

---

## Umami Self-Hosting (D-14 — P0 plan task)

**Status:** `[ASSUMED]` for hosting target — the discuss-phase recorded "TBD between nomus / VPS / separate Vercel project." Planner must surface as P0.

**Provenance:** `[CITED: docs.umami.is/docs/install]` `[CITED: github.com/umami-software/umami]` `[CITED: docs.umami.is — Tracker configuration page (referenced but not fully fetched)]`

### Hosting target options (recommendation matrix)

| Target | Public-reachable URL | Ops burden | Sovereignty | Cost | Recommendation |
|--------|---------------------|-----------|-------------|------|----------------|
| **nomus Mac Studio (`100.74.197.54`) via Docker + Caddy fronting** | Requires Tailscale Funnel OR a public domain pointing to the Caddy reverse-proxy | Medium — Wesley already runs containers on nomus per inferred context. Adds Postgres + Umami Docker compose stack (~200 MB RAM total). | HIGH — fully Wesley's data, fully Wesley's hardware | $0 | **Preferred per worldview.** Verify nomus has a public endpoint mechanism (Tailscale Funnel works; ngrok works; static IP + Caddy works). If the public-endpoint piece is not already solved, this option's setup cost dominates. |
| **Existing VPS** | Already public | Low — just docker-compose up | HIGH | ~$5/mo (likely already paid) | Strong fallback if nomus public-reach is unsolved. |
| **Separate Vercel project** | Public via Vercel domain | Lowest — point-and-click; Vercel deploys Umami's Docker image OR use the Umami Cloud free tier (1M events/mo) which is functionally equivalent | LOW — Umami Cloud is sovereign-ish (your data, but on Umami's servers); Vercel-hosted Umami is on Vercel's servers | $0 | Easiest to ship if D-14 sovereignty constraint loosens. Less aligned with worldview but functionally equivalent for analytics signal. |

**The actual blocking question:** Does nomus have a stable public HTTPS endpoint mechanism? If yes (Tailscale Funnel configured, public IP with port-forward, or Cloudflare Tunnel), nomus is the right target. If no, the planner should not invent that infrastructure inside Phase 1 — fall back to existing VPS, and treat "set up nomus public endpoint" as an out-of-band ops task.

### Umami minimum requirements

- **Node.js:** 18.18+ (containerized — host doesn't need it)
- **Database:** PostgreSQL 12.14+ (UTC timezone recommended) OR MySQL — Postgres is the published default `[CITED: docs.umami.is/docs/install]`
- **Resources:** ~200 MB RAM total (Umami app + PG); negligible CPU at <1M pv/mo
- **Container port:** 3000 (Umami app); Postgres internal to docker network

### docker-compose.yml minimum shape

```yaml
# Reference: github.com/umami-software/umami/blob/master/docker-compose.yml
version: '3'
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://umami:CHANGEME@db:5432/umami
      DATABASE_TYPE: postgresql
      APP_SECRET: CHANGEME-RANDOM-32-CHARS
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: CHANGEME
    volumes:
      - umami-db:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
volumes:
  umami-db:
```

### Wiring into Astro

Once Umami is reachable at e.g. `https://umami.crossthebridge.io`:

1. **Default credentials:** username `admin`, password `umami` — change immediately on first login `[CITED: docs.umami.is/docs/install]`.
2. **Add the site** in the Umami dashboard → Settings → Websites → "Add website" with name "crossthebridge.io (staging)" and domain `staging.crossthebridge.io`. Umami issues a `data-website-id` UUID.
3. **Set env var** in Vercel project: `PUBLIC_UMAMI_WEBSITE_ID=<uuid>` and `PUBLIC_UMAMI_HOST=https://umami.crossthebridge.io`.
4. **Render conditionally** in `BaseLayout`:

```astro
---
const umamiHost = import.meta.env.PUBLIC_UMAMI_HOST;
const umamiId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID;
const isProd = import.meta.env.PROD;
---
{isProd && umamiHost && umamiId && (
  <script defer src={`${umamiHost}/script.js`} data-website-id={umamiId}></script>
)}
```

The `defer` attribute is critical — it pushes the script after HTML parse, so Umami doesn't block first paint or interfere with the network audit's "first paint" timing window.

5. **Network audit allow-list:** add `umamiHost` to the Playwright assertion's allow-list (origin + Umami host = the only two domains permitted).

**If Umami is not ready at execution time:** ship without the script tag. Phase 1 is launchable without analytics; the Colophon page already commits to the no-tracking stance regardless. Add the tag later via a small follow-up PR.

---

## Network Audit CI Gate (D-16)

**Goal:** Block any PR merge that introduces a request to a banned third-party domain on first paint of any Phase 1 page.

**Provenance:** `[CITED: playwright.dev/docs/best-practices]` `[CITED: playwright.dev/docs/ci-intro]`

### Recommendation: Playwright

A Playwright test runs a real browser, navigates to each Phase 1 page on the Vercel preview URL, and listens for every network request via `page.on('request')`. If any request URL matches a banned-host pattern, the test fails. Allow-list: own origin + (optionally) Umami host.

### Why Playwright over alternatives

| Approach | Verdict |
|----------|---------|
| Playwright | **Recommended.** Real browser, captures all network requests including those triggered by inline scripts, runs in GH Actions on every PR, has a simple `page.on('request', cb)` event hook. |
| `curl` + grep | Insufficient. curl fetches one HTML response; cannot detect requests fired by JS or even by `<link rel="preload">` resolved by the browser. False negatives guaranteed. |
| Lighthouse JSON output | Possible but heavyweight. Lighthouse runs Playwright under the hood anyway; it reports third-party usage but the assertion logic still has to be hand-coded. Bigger blast radius if Lighthouse internals change. |
| `puppeteer` | Equivalent to Playwright, but Playwright is the 2026 Vercel/CI default and has a better GH Action. |
| CSP `report-only` mode aggregating violations | Works in production but doesn't gate PRs; complementary, not a substitute. Consider for v2 hardening. |

### Banned-domain list (from UI-SPEC §Design System "Network audit invariant")

```
fonts.googleapis.com
fonts.gstatic.com
google-analytics.com
googletagmanager.com
www.google-analytics.com
www.googletagmanager.com
youtube.com
youtu.be
twitter.com
x.com
usemotion.com
app.usemotion.com
```

Match by hostname suffix (so `*.fonts.gstatic.com` is also banned).

### Concrete Playwright test

```typescript
// tests/network-audit.spec.ts
import { test, expect } from '@playwright/test';

const BANNED_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'google-analytics.com',
  'googletagmanager.com',
  'youtube.com', 'youtu.be',
  'twitter.com', 'x.com',
  'usemotion.com',
];

const ROUTES = [
  '/',
  '/about',
  '/contact',
  '/colophon',
  '/projects/bitcoin-bay',
  '/projects/fbba',
  '/projects/ai-petros-hermes',
];

const PREVIEW = process.env.PREVIEW_URL ?? 'http://localhost:4321';

for (const route of ROUTES) {
  test(`${route} contacts no banned third-party domains on first paint`, async ({ page }) => {
    const violations: string[] = [];
    page.on('request', (req) => {
      const host = new URL(req.url()).hostname;
      if (BANNED_HOSTS.some((b) => host === b || host.endsWith(`.${b}`))) {
        violations.push(`${req.method()} ${req.url()}`);
      }
    });
    const response = await page.goto(`${PREVIEW}${route}`, { waitUntil: 'load' });
    expect(response?.ok(), `${route} should return 2xx`).toBeTruthy();
    expect(violations, `Banned third-party requests:\n${violations.join('\n')}`).toEqual([]);
  });
}
```

### GitHub Actions wiring

```yaml
# .github/workflows/ci.yml
name: CI
on: [pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm ci
      - run: npx astro check
      - run: npx astro build

  network-audit:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - name: Wait for Vercel preview
        # Use `vercel inspect` or the Vercel for GitHub deployment status API
        # to capture the preview URL and ensure deploy is ready before testing.
        id: preview
        run: |
          # Pseudocode — actual implementation reads the Vercel deployment-status
          # webhook payload OR uses `vercel pull` + `vercel deploy` to deploy and get URL.
          echo "url=https://staging-pr-${{ github.event.number }}.crossthebridge.io" >> $GITHUB_OUTPUT
      - run: npx playwright test
        env:
          PREVIEW_URL: ${{ steps.preview.outputs.url }}
```

**Wrinkle on Vercel preview URL discovery:** The simple form is `vercel-preview-${{ github.event.pull_request.head.sha }}.vercel.app` if Vercel for GitHub is set up with default preview domains. The cleaner form uses the Vercel CLI (`vercel deploy --token`) or the GH deployment-status API to read the actual preview URL written by Vercel's bot. Planner picks one; the cleanest is to add a separate "wait-for-vercel-preview" GH Action like `patrickedqvist/wait-for-vercel-preview` and pass its output as `PREVIEW_URL`. `[CITED: github.com/patrickedqvist/wait-for-vercel-preview]` `[ASSUMED]` (referenced from training; verify currency).

### Lighthouse: informational only (per D-16)

Optional addition: a parallel `lighthouse-ci` job that posts a comment to the PR with Performance / Accessibility / SEO / Best-Practices scores but does **not** fail the build. This satisfies the "Lighthouse runs informationally on PR previews but doesn't block" half of D-16 without blowing the network-audit critical path.

---

## llms.txt (SEO-05)

**Goal:** A curated `/llms.txt` that summarizes the site for LLM crawlers (Anthropic ClaudeBot, Perplexity, GPTBot).

**Provenance:** `[CITED: llmstxt.org]`

### Spec (minimal, current as of 2026)

The required structure is:

1. **`#` H1** with the project/site name (only required section)
2. **`>` blockquote** with a short summary
3. Zero or more markdown content sections (no headings)
4. Zero or more `## H2`-delimited file lists; each list item is a markdown link `[name](url)` with optional `: notes`

### Phase 1 `public/llms.txt` template

```markdown
# Cross The Bridge

> Wesley Pyburn's personal site — Freedom Tech, Bitcoin, sovereign AI, and the work
> of opting out of legacy systems without going off-grid. Three project areas
> (Bitcoin Bay, FBBA, AI / Petros / Hermes) plus a thesis page (About) and a
> consulting offer (separate subsection at /consulting, currently at the apex
> domain crossthebridge.io during Phase 1 staging).

This file is intended for LLM crawlers (ClaudeBot, GPTBot, PerplexityBot). It
summarizes the site's structure and links to the canonical content for each
section. The site does not track visitors and does not load Google services.

## Identity

- [About — biography and Freedom Tech thesis](https://staging.crossthebridge.io/about): Wesley's bio fused with the Cross The Bridge thesis (Money / Data / Infrastructure pillars). The single canonical statement of what the site is about.
- [Contact](https://staging.crossthebridge.io/contact): Inbound channel for peer reach-outs, podcast invites, and partnership conversations.
- [Colophon](https://staging.crossthebridge.io/colophon): Tech stack and no-tracking stance — what the site does and does not collect.

## Projects

- [Bitcoin Bay](https://staging.crossthebridge.io/projects/bitcoin-bay): Tampa Bay community for people stacking sats and showing up in person.
- [FBBA — Florida Bitcoin & Blockchain Association](https://staging.crossthebridge.io/projects/fbba): Peer / policy / industry organization across Florida.
- [AI / Petros / Hermes](https://staging.crossthebridge.io/projects/ai-petros-hermes): Sovereign-stack AI work — Hermes the agent, Petros the foundation, AYLIP the vision.

## Feeds

- [Sitemap](https://staging.crossthebridge.io/sitemap-index.xml): Machine-readable index of all pages.
```

The Phase 2 update will add `## Writing` with essay/note URLs and per-collection RSS links. For Phase 1, omit any "Writing" / "Essays" sections — there is no content yet, and llms.txt entries pointing to non-existent or empty hubs are worse than no entry at all.

### Robots.txt (SEO-04)

```
# public/robots.txt
User-agent: *
Allow: /

# Tier-1 AI crawlers — explicitly welcomed (Wesley wants AI assistants citing his work)
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://staging.crossthebridge.io/sitemap-index.xml
```

`Sitemap` URL must update to `https://crossthebridge.io/sitemap-index.xml` at Phase 3 cutover.

---

## JSON-LD Schemas (SEO-02)

**Provenance:** `[CITED: schema.org/Person]` `[CITED: schema.org/WebSite]` `[CITED: developers.google.com/search/docs/appearance/structured-data/organization]`

### Person (used on `/about`)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://crossthebridge.io/about#wesley",
  "name": "Wesley Pyburn",
  "jobTitle": "Founder, Cross The Bridge",
  "url": "https://staging.crossthebridge.io/about",
  "image": "https://staging.crossthebridge.io/wesley-headshot.jpg",
  "sameAs": []
}
```

`sameAs` — populate with Wesley-supplied profile URLs at execution. Empty array is valid; better to ship empty than wrong. Per-PITFALLS #7 (security) the `email` field is intentionally omitted from public schema.

### WebSite (used on `/`)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://staging.crossthebridge.io/#website",
  "name": "Cross The Bridge",
  "url": "https://staging.crossthebridge.io/",
  "description": "Wesley Pyburn's personal site — Freedom Tech, Bitcoin, sovereign AI, and the work of opting out of legacy systems.",
  "publisher": { "@id": "https://crossthebridge.io/about#wesley" },
  "inLanguage": "en"
}
```

The `@id` cross-reference between WebSite.publisher and Person is the 2026 best practice for connecting the two schemas. `[CITED: schemapilot.app/blog/json-ld-guide]`

### BreadcrumbList + WebPage (used on each `/projects/*`)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://staging.crossthebridge.io/" },
    { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://staging.crossthebridge.io/projects" },
    { "@type": "ListItem", "position": 3, "name": "Bitcoin Bay" }
  ]
}
```

(No `/projects` index page in Phase 1 — the `position: 2` entry is a virtual breadcrumb, which is permitted by schema.org. Or omit position 2 entirely and ship two-step breadcrumbs Home → Bitcoin Bay; planner picks. Three-step is the cleaner long-term shape because Phase 2 may add `/projects` as a hub.)

### WebPage (used on `/contact`, `/colophon`, project pages alongside breadcrumbs)

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Contact — Cross The Bridge",
  "url": "https://staging.crossthebridge.io/contact",
  "description": "Inbound channel for peer reach-outs, podcast invites, and partnership conversations.",
  "isPartOf": { "@id": "https://staging.crossthebridge.io/#website" },
  "primaryImageOfPage": "https://staging.crossthebridge.io/og/default.png"
}
```

### JSON-LD validation

**Build-time (compile):** `schema-dts` TypeScript types catch structural errors during `astro check`. If `JsonLd.astro` types its props with `Person | WebSite | WebPage | BreadcrumbList`, misspelled keys or missing required fields fail the build. `[CITED: github.com/google/schema-dts]`

**Pre-launch (manual):** Paste each major URL into:
- https://search.google.com/test/rich-results — Google Rich Results Test (`[CITED: developers.google.com/search/docs/appearance/structured-data]`)
- https://validator.schema.org/ — Schema.org Markup Validator (generic)

Both are interactive tools. Google has no documented public API for the Rich Results Test; programmatic validation in CI is **not currently feasible** beyond the schema-dts compile-time path. Treat the Rich Results Test as a manual launch gate — not a CI gate.

`[VERIFIED: explicit search; no public Rich Results API exists as of 2026]`

---

## Mailto Obfuscation (D-13)

**Goal:** No plaintext email in the rendered HTML; readable for screen readers; works with JS disabled (degraded but readable).

**Provenance:** `[CITED: spencermortensen.com/articles/email-obfuscation/]` (2026 comparison) — confirms ROT13/base64 alone are weak in 2026; combined approach with display variant + JS reveal is current best practice.

### Recommendation: Three-layer pattern

**Layer 1: Display variant (always visible, JS-free, readable)**
```
Email: wesley[at]crossthebridge[dot]io
```
Visible to all visitors. Screen readers read it as text. Bots crawling raw HTML see no `mailto:` and no `@` — most simple harvesters skip it.

**Layer 2: JS-reconstructed mailto button (interactive)**
```html
<a
  id="contact-cta"
  href="#"
  class="cta-primary"
  data-u="wesley"
  data-d="Y3Jvc3N0aGVicmlkZ2UuaW8="
>
  Email Wesley
</a>
<script>
  const a = document.getElementById('contact-cta');
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const u = a.dataset.u;
    const d = atob(a.dataset.d);
    window.location.href = `mailto:${u}@${d}`;
  });
</script>
```

The base64-encoded domain in `data-d` is NOT cryptographic obfuscation — it's an extra step a basic regex scraper won't execute. Combined with Layer 1, scrapers either parse the visible text (which needs interpretation) or run JS (which most don't).

**Layer 3: `<noscript>` fallback (JS-disabled users)**
```html
<noscript>
  <p>To email Wesley, write to <strong>wesley</strong> at <strong>crossthebridge.io</strong>.</p>
</noscript>
```

### Why not Cloudflare Email Address Obfuscation

`[CITED: PITFALLS.md Pitfall 4]` — Cloudflare's email obfuscation injects JS that the network audit might flag (depending on whether Cloudflare proxies are in front of Vercel; they currently aren't per the project's setup). It also requires the site to be Cloudflare-fronted. Skip it.

### Why not just plain `mailto:wesley@crossthebridge.io`

Spam volume. Wesley's personal email getting harvested into spam lists is a known cost. The three-layer pattern reduces the bot harvest rate to near-zero without breaking accessibility (Layer 1 + Layer 3 are both screen-reader-safe).

### Accessibility verification

- VoiceOver / NVDA reads `wesley[at]crossthebridge[dot]io` correctly as text.
- Tab focuses the "Email Wesley" button.
- Enter/Space triggers the JS reconstruction → opens email client.
- With JS disabled, the `<noscript>` block replaces the button visually with the assembly instructions.

---

## OG Image Strategy (SEO-01)

**Phase 1:** Single static `public/og/default.png` (1200×630). Used as fallback in `BaseSEO.astro`'s `og:image` when a page doesn't pass an explicit override.

**UI-SPEC § OG Image Template** specifies the composition (cream background, Playfair wordmark, gold rule, page title). The planner must generate this asset once at execution. Tools that work:

- **Figma** + Export PNG @ 1200×630 — manual, easy iteration
- **HTML+CSS rendered with Playwright `page.screenshot({ path, viewport: 1200×630 })`** — reproducible, scriptable; same Playwright already in CI
- **Photoshop / Affinity Designer** — fastest if Wesley already uses one
- **Astro endpoint that renders HTML to image** at build time using a headless library (Satori) — over-engineered for one image

**Recommendation:** Render once via Playwright + a simple HTML template, commit the PNG to `public/og/`. If Phase 2 adds per-essay OG images (DISC-02), revisit Satori. `[CITED: vercel.com/docs/og-image-generation]` for Satori reference but **out of scope** per CONTEXT.md `<deferred>`.

### Per-page override pattern

```astro
---
// src/components/seo/BaseSEO.astro
interface Props {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}
const { ogImage = '/og/default.png', ogType = 'website', ...rest } = Astro.props;
const ogImageAbs = new URL(ogImage, Astro.site).toString();
---
<meta property="og:image" content={ogImageAbs} />
<!-- ... -->
```

`Astro.site` is the canonical URL set in `astro.config.mjs`. Phase 1 sets it to `https://staging.crossthebridge.io`; Phase 3 cutover changes it to the apex.

### Pre-launch test (per UI-SPEC §OG Image Template)

Paste each URL into Discord, Telegram, X, Signal, iMessage. Verify the preview card renders correctly (image + title + description). Document results in launch checklist. This is a one-time visual gate, not automated.

---

## Environment Variables (Vercel project)

Phase 1 env vars (set in Vercel project settings → Environment Variables):

| Name | Scope | Purpose | Phase 1 staging value |
|------|-------|---------|----------------------|
| `PUBLIC_UMAMI_HOST` | Production + Preview | Umami script `src` URL | `https://umami.crossthebridge.io` (or empty if Umami not yet wired) |
| `PUBLIC_UMAMI_WEBSITE_ID` | Production + Preview | Umami `data-website-id` UUID | (UUID from Umami dashboard) or empty |
| `CONSULTING_URL` | Production + Preview | URL for AI/Petros project page CTA (D-05) | `https://crossthebridge.io` for Phase 1 staging; will become `/consulting` post-Phase-3 cutover |
| `PUBLIC_SITE_URL` | Production | Canonical absolute URL | `https://staging.crossthebridge.io` (Phase 1); `https://crossthebridge.io` (Phase 3) |

Astro convention: `PUBLIC_*` env vars are inlined into client bundles; non-public env vars stay server-only. The Umami host/id and site URL are public; `CONSULTING_URL` is also safe to expose.

---

## Vercel Project Setup + DNS (D-15, INFRA-03)

**Provenance:** `[CITED: vercel.com/docs/domains/working-with-domains/add-a-domain]` `[CITED: vercel.com/docs/domains/managing-dns-records]`

### Steps to point `staging.crossthebridge.io` at the new Vercel project

1. **Create a new Vercel project** linked to the `crossthebridgetpa/ctb-website` repo. The existing project (if any) serving the apex stays untouched; the new project is separate so Phase 1 can deploy independently.
2. **In Vercel project Settings → Domains → Add domain:** enter `staging.crossthebridge.io`. Vercel issues a CNAME target (e.g., `cname.vercel-dns.com.` — note the trailing period; it's the FQDN form).
3. **In the DNS provider for `crossthebridge.io`** (whatever registrar Wesley uses — Cloudflare DNS, Namecheap, Porkbun, etc.):
   - Add a CNAME record:
     - Name: `staging`
     - Value: `cname.vercel-dns.com.`
     - TTL: 300 (default fine)
   - Save. Standard CNAME records propagate within minutes; full propagation is up to 48h but typically ~30 min.
4. **In Vercel:** the domain status should flip from "Invalid Configuration" to "Valid Configuration" once DNS resolves. Vercel auto-issues an SSL cert via Let's Encrypt.
5. **Set `astro.config.mjs` `site` field** to `https://staging.crossthebridge.io` so absolute URLs (sitemap, OG images, JSON-LD) resolve correctly.
6. **Set `PUBLIC_SITE_URL` env var** (above) for any runtime references.

### Cloudflare proxy considerations

If `crossthebridge.io` DNS is fronted by Cloudflare (not just using Cloudflare DNS — actively proxied with the orange cloud icon), the CNAME flattening rules may differ. For a subdomain CNAME:

- **DNS-only mode (gray cloud):** Standard CNAME-to-Vercel works; certs issued by Vercel; no extra config.
- **Proxied mode (orange cloud):** Cloudflare terminates TLS; Vercel sees Cloudflare's IP. Vercel's docs explicitly call this out as supported but with friction (cert handling, real-IP forwarding). **Recommendation:** keep `staging.crossthebridge.io` DNS-only (gray cloud) for Phase 1 to avoid Cloudflare-Vercel double-proxy interaction issues. This also keeps the network audit clean — no Cloudflare-injected JS (Email Obfuscation, Bot Fight Mode challenges) in the path. `[CITED: PITFALLS.md Pitfall 4 — Cloudflare audit]`

### Apex domain stays untouched (Phase 1 invariant per CONTEXT.md success criteria #3)

The apex `crossthebridge.io` continues serving the old single-page site through Phase 1. No DNS changes to the apex A record / ALIAS / CNAME. Phase 3 cutover handles that switch.

### Vercel project settings checklist (manual UI items)

- [ ] **Web Analytics: OFF** (CONTEXT.md ban)
- [ ] **Speed Insights: OFF** (PITFALLS.md, RUM data leakage)
- [ ] **Preview Comments: OFF or ON** — Wesley preference
- [ ] **Password Protection on Preview: OFF** (breaks Playwright network audit)
- [ ] **Production Branch: `main`** (default)
- [ ] **Build & Output Settings: framework preset = Astro** (auto-detected)
- [ ] **Node.js Version: 22.x**
- [ ] **Git Integration: Vercel for GitHub installed; preview deploys auto-create on PRs** (INFRA-03)

---

## h-card Microformat (SEO-06 — Phase 2 in REQUIREMENTS, but cheap to ship in Phase 1)

**Phase mapping question (from additional_context #12):** Should Phase 1 ship h-card on About even though SEO-06 is mapped to Phase 2?

**Recommendation:** **YES, ship h-card on About in Phase 1.** Cost is ~5 lines of class names; the page has all the data already (name, photo, URL); the IndieWeb ecosystem (feed readers, IndieAuth) needs h-card on the About page to attribute essays / posts correctly to Wesley once Phase 2 ships. Doing it now means Phase 2 doesn't have to retrofit.

`h-entry` and `h-feed` (SEO-06's other halves) DO belong in Phase 2 because they require essay/note collection content to wrap. Don't ship empty h-feeds.

**Provenance:** `[CITED: indieweb.org/h-card]` `[CITED: microformats.org/wiki/h-card]`

### Minimal h-card on About

```html
<article class="h-card">
  <img class="u-photo" src="/wesley-headshot.jpg" alt="Wesley Pyburn — founder of Cross The Bridge" />
  <h1 class="p-name">Wesley Pyburn</h1>
  <p class="p-job-title">Founder, <a class="u-url" href="https://crossthebridge.io">Cross The Bridge</a></p>
  <!-- thesis section + bio section here -->
</article>
```

The four classes (`h-card`, `p-name`, `u-photo`, `u-url`) are all that's required for the IndieWeb minimal-h-card spec. `p-job-title` is optional but adds context.

Verify at https://indiewebify.me/ at launch.

---

## Common Pitfalls

These are Phase-1-specific failure modes mined from PITFALLS.md and the open-research areas.

### Pitfall A: Vercel Web Analytics enabled by default in dashboard

**What goes wrong:** New Vercel projects have a dashboard toggle for Analytics. Toggling it on injects `https://va.vercel-scripts.com/v1/script.debug.js` and starts collecting RUM data — the exact thing CONTEXT.md and PRIV-02 ban.

**Why:** It's a checkbox in the Vercel UI, not in repo code. CI can't catch it. The default is "off" but project owners click it on out of curiosity and forget.

**Avoid:** Add "Vercel project Settings: Web Analytics OFF, Speed Insights OFF" to the Phase 1 launch checklist. Network audit will catch it after the fact (the va.vercel-scripts.com domain isn't in the banned list — should be added).

**Action for planner:** Add `va.vercel-scripts.com` and `vitals.vercel-insights.com` to the banned-host list in the Playwright network audit.

### Pitfall B: `<link rel="preconnect" href="https://fonts.googleapis.com">` lingering from boilerplate

**What goes wrong:** Astro's default templates (and most "personal site" starter kits) include a `preconnect` to Google Fonts. Even without an actual font import, the `preconnect` triggers a DNS lookup + TLS handshake to `fonts.googleapis.com` on first paint — and the network audit flags it.

**Why:** "Best practice" advice from 2020-2022 was preconnect-everything-third-party.

**Avoid:** Audit the generated `<head>` after `astro build`. No `fonts.googleapis.com` or `fonts.gstatic.com` references anywhere — including `<link rel="preconnect">`, `<link rel="dns-prefetch">`, or commented-out blocks.

### Pitfall C: Astro's `<Image />` component falling back to client-side Sharp on Vercel

**What goes wrong:** If `imageService: true` is forgotten in `@astrojs/vercel` config, the build-time Sharp transforms ship pre-built into `dist/`, but any dynamic image transforms (e.g., querystring-driven sizes) hit Sharp inside a serverless function — bloats deployment and counts against Vercel's function size budget.

**Why:** Phase 1 is `output: 'static'`, so this is unlikely to bite. But the adapter API has shifted between major versions; verify at scaffold time.

**Avoid:** Verify `astro.config.mjs` adapter block has `imageService: true` and that `dist/_image` (or Vercel's emit path) does not contain Sharp binaries. If unsure, ship without `imageService: true` for Phase 1 — the headshot is the only image and it's small enough for build-time transforms.

### Pitfall D: Astro Fonts API silently falling back to system fonts

**What goes wrong:** The Fonts API's `fontProviders.fontsource()` requires the `@fontsource/*` package(s) to be installed in `package.json`. If Wesley installs `@fontsource-variable/inter` but the config references `name: 'Inter'`, Astro may not auto-detect the variable variant — the result is text rendered in the fallback (system-ui) without an obvious build error.

**Why:** Variable vs static Fontsource packages have slightly different naming conventions (`@fontsource/inter` vs `@fontsource-variable/inter`). The Fonts API's auto-detection is robust but not infallible.

**Avoid:** After `astro build`, view source on a built page and confirm `<link rel="preload" as="font" type="font/woff2" ...>` is present and points to a `/_astro/` path on the same origin. If not, the font isn't being self-hosted — fall back to manually importing Fontsource CSS in `app.css`.

### Pitfall E: Network audit passes locally, fails on Vercel preview

**What goes wrong:** Local dev (`astro dev`) doesn't always faithfully reproduce production HTML. The network audit running against `localhost:4321` may pass while the Vercel preview fails because Vercel injects extra headers, or because the production build inlines/bundles differently.

**Avoid:** Run the network audit ONLY against the Vercel preview URL in CI (not against local dev). The Playwright job depends on the build job and waits for Vercel's preview deploy webhook before running.

### Pitfall F: Mobile nav drawer causing scroll-lock leak when navigating

**What goes wrong:** UI-SPEC's drawer locks `document.body.style.overflow = 'hidden'` while open. If the user navigates via a link inside the drawer (e.g., to `/about`), Astro's default page transition does NOT preserve the scroll-lock state — but on the next page load, the body might still be in the locked state if the JS doesn't fire on document ready before navigation.

**Why:** Race condition between link navigation and the drawer's `close()` handler.

**Avoid:** Wire the drawer's link-click handler to call `close()` synchronously BEFORE the navigation occurs (don't rely on `unload` events). Pattern: in the click handler, call `close()` and let the link's default navigation proceed naturally — `close()` is synchronous and clears the overflow lock instantly.

### Pitfall G: JSON-LD with stale or inconsistent URLs after staging→apex cutover

**What goes wrong:** Phase 1 ships JSON-LD with `staging.crossthebridge.io` URLs. Phase 3 cutover flips the canonical to `crossthebridge.io`. If JSON-LD URLs aren't templated through `Astro.site` or `PUBLIC_SITE_URL`, they keep pointing at the staging subdomain forever, fragmenting the schema graph.

**Avoid:** All absolute URLs in JsonLd.astro must be derived from `Astro.site` or env vars. Hardcoded `staging.crossthebridge.io` strings are forbidden. Pre-cutover checklist item: grep for "staging" in `dist/` after Phase 3 build; should be zero hits.

### Pitfall H: `PUBLIC_*` env vars not bundled in static output

**What goes wrong:** Astro's env var convention treats only `PUBLIC_*` names as client-bundled. Non-public names are server-only. In static-output mode, "server-only" effectively means "not available at build time unless imported in a `.astro` file's frontmatter" — this is fine for build-time, but any client-side code (like the Umami script tag's runtime injection) must use `PUBLIC_*` names.

**Avoid:** All env vars referenced in `BaseLayout`'s analytics-script block use `PUBLIC_UMAMI_HOST` / `PUBLIC_UMAMI_WEBSITE_ID`. Don't name them `UMAMI_HOST` (server-only) or the `import.meta.env` reference returns `undefined` at runtime.

---

## Validation Architecture

> Phase 1 has `nyquist_validation: false` in `.planning/config.json`. This section is **omitted** per the schema's instructions. The network-audit Playwright suite (§Network Audit CI Gate) is the closest equivalent and is explicitly described as a CI gate, not a Nyquist test sampler.

---

## Security Domain

`security_enforcement` is not explicitly set in `.planning/config.json` → treat as enabled. Phase 1 has a small attack surface (no forms, no auth, no user data, no server functions), so the threat model is narrow.

### Applicable ASVS categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | no | No login feature in Phase 1. |
| V3 Session Management | no | No sessions. |
| V4 Access Control | no | All content is public. |
| V5 Input Validation | no | No user input. (Mailto reveal accepts no user input; reads only from `data-` attributes set by the author.) |
| V6 Cryptography | no | No secrets stored client-side. The base64 in mailto obfuscation is encoding, not encryption — and it's deliberately weak. |
| V7 Errors and Logging | minimal | Static site has no application logs. Vercel access logs handled by Vercel. |
| V14 Configuration | yes | CSP headers (Astro 6 native CSP API or vercel.json), HSTS, X-Content-Type-Options, Referrer-Policy. |

### Known threat patterns for Astro-on-Vercel static site

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Third-party JS injecting trackers | Information Disclosure | Self-hosted everything; network audit CI gate; CSP `script-src 'self' https://umami.crossthebridge.io` |
| Email harvesting from About / Contact | Information Disclosure | Three-layer mailto obfuscation (above) |
| Clickjacking via iframe embed of the site | Spoofing | `X-Frame-Options: DENY` header in `vercel.json` (Phase 1 has no embeddable widgets — clickjacking is low-risk but the header costs nothing) |
| MIME-confusion XSS on user-supplied uploads | Tampering | N/A — no uploads in Phase 1 |
| Subdomain takeover of `staging.crossthebridge.io` | Spoofing | Vercel-managed cert + Vercel-controlled CNAME prevents most takeover scenarios. After Phase 3 cutover, the staging CNAME should be removed from DNS to prevent dangling-CNAME takeover. Add to Phase 3 launch checklist. |
| Stored secrets in repo | Disclosure | Use Vercel env vars; never commit `.env`. `.gitignore` should include `.env*`. The Umami `data-website-id` is a public identifier and OK to ship in built HTML. |

### Security headers (`vercel.json`)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

CSP is more nuanced — Astro 6 has a native CSP API (`csp:` config option) that handles inline-script hashing automatically. Recommend deferring CSP authoring to a follow-up plan task in Phase 1; a hand-written CSP that breaks the mailto-reveal or mobile-nav inline scripts is worse than no CSP. The native API is the safe path. `[CITED: docs.astro.build — CSP API stable in Astro 6]` `[ASSUMED]` exact API surface; verify at scaffold.

---

## Environment Availability

Phase 1 dependencies and current local availability (audited 2026-04-26):

| Dependency | Required by | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js 22.x | Build runtime | ✓ | 22.22.0 | — |
| pnpm | Preferred package manager | ✓ | 10.28.2 | npm 10.9.4 |
| npm | Fallback package manager | ✓ | 10.9.4 | — |
| Docker | Required if Umami self-hosts on local container | ✓ | 29.2.1 | n/a (only needed for Umami D-14) |
| GitHub CLI (`gh`) | PR / workflow inspection | ✓ | 2.4.0 | git push + GH UI |
| Git | Version control | ✓ | 2.34.1 | — |
| Vercel CLI | Optional — preview URL discovery + manual deploys | ✗ | — | Vercel for GitHub auto-deploys preview on PR |
| Vercel account / project | Hosting | ? | — | Wesley confirms; assumed yes per existing setup |
| `staging.crossthebridge.io` DNS write access | DNS configuration | ? | — | Wesley action — surface as P0 plan task |
| Umami public-reachable endpoint (D-14) | Analytics script src | ✗ | — | (a) ship without analytics for v1 launch and add later, or (b) Umami Cloud free tier |
| Playwright Chromium binary | Network audit CI | install on demand | — | `npx playwright install --with-deps chromium` in GH Action |

**Missing dependencies with no fallback:** None — Phase 1 is launchable today without Umami being live (analytics is a soft dependency).

**Missing dependencies with fallback:**
- Umami endpoint → ship without analytics; add when ready
- Vercel CLI → use Vercel for GitHub integration (default behavior)

**Required ops actions (planner surface as P0):**
- Confirm Vercel project exists or create one
- Confirm Wesley has DNS access for `crossthebridge.io` (likely yes, but verify)
- Resolve Umami hosting target (D-14)

---

## Project Constraints (from CLAUDE.md)

The project's CLAUDE.md restates the locked stack and several invariants. Research must not contradict these. Restated for the planner:

1. **Stack lock:** Astro 6.x, Tailwind v4 via `@tailwindcss/vite` (NOT `@astrojs/tailwind`), `@astrojs/vercel` static adapter, Astro Fonts API + Fontsource, plain Markdown content collections, `@astrojs/sitemap`. No alternatives.
2. **Anti-stack lock:** No Google Fonts CDN, no GA4, no Vercel Web Analytics, no `@astrojs/tailwind`, no Next.js, no Algolia, no Fathom, no Disqus, no raw YouTube/X iframes, no AI-generated imagery.
3. **MDX is enabled but defaults to `.md`** — Phase 1 ships zero `.mdx` files.
4. **Vercel image optimization** — `imageService: 'vercel'` (or current adapter equivalent `imageService: true`); never ship Sharp to serverless.
5. **TypeScript strict mode** — set at scaffold via `--typescript strict`.
6. **CLAUDE.md analytics recommendation (Plausible Cloud) is overridden by D-14 (self-hosted Umami).** This is one of the few places CLAUDE.md and the discuss-phase diverge; the discuss-phase decision wins.
7. **CLAUDE.md `@astrojs/vercel ^8.x` reference** is outdated — npm registry shows current stable as 5.x. Pin to whatever `npx astro add vercel` selects.
8. **GSD Workflow Enforcement:** All file changes flow through GSD commands. The planner produces PLAN-N files; the executor implements against those plans.

---

## Code Examples

Verified patterns ready for the planner / executor to consume.

### Example 1: `astro.config.mjs` Phase 1 baseline

```javascript
// astro.config.mjs
// Source: docs.astro.build/en/guides/fonts/, docs.astro.build/en/guides/integrations-guide/vercel/
import { defineConfig, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://staging.crossthebridge.io',
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel({
    imageService: true,
  }),
  integrations: [
    sitemap(),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Playfair Display',
      cssVariable: '--font-display',
      weights: [700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter Variable',
      cssVariable: '--font-body',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
    },
  ],
});
```

### Example 2: BaseLayout head fragment

```astro
---
// src/layouts/BaseLayout.astro
import { Font } from 'astro:assets';
import BaseSEO from '../components/seo/BaseSEO.astro';
import JsonLd from '../components/seo/JsonLd.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  jsonLdSchema?: 'website' | 'person' | 'webpage' | 'breadcrumb';
  jsonLdData?: Record<string, unknown>;
}
const { title, description, canonical, ogImage, jsonLdSchema = 'webpage', jsonLdData } = Astro.props;

const umamiHost = import.meta.env.PUBLIC_UMAMI_HOST;
const umamiId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Font cssVariable="--font-display" preload />
    <Font cssVariable="--font-body" preload />
    <BaseSEO {title} {description} {canonical} {ogImage} />
    <JsonLd schema={jsonLdSchema} data={jsonLdData} />
    {import.meta.env.PROD && umamiHost && umamiId && (
      <script defer src={`${umamiHost}/script.js`} data-website-id={umamiId} is:inline></script>
    )}
  </head>
  <body>
    <a href="#main" class="skip-link">Skip to main content</a>
    <Nav />
    <main id="main"><slot /></main>
    <Footer />
  </body>
</html>
```

### Example 3: GH Actions CI workflow

```yaml
# .github/workflows/ci.yml
# Source: playwright.dev/docs/ci-intro, github.com/patrickedqvist/wait-for-vercel-preview
name: CI
on: pull_request
permissions:
  contents: read
  deployments: read

jobs:
  build:
    name: astro check + build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'npm' }
      - run: npm ci
      - run: npx astro check
      - run: npx astro build

  network-audit:
    name: network audit (Playwright)
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'npm' }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - name: Wait for Vercel preview deploy
        id: preview
        uses: patrickedqvist/wait-for-vercel-preview@v1.3.1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          max_timeout: 600
      - name: Run network audit against preview
        env:
          PREVIEW_URL: ${{ steps.preview.outputs.url }}
        run: npx playwright test
```

### Example 4: `package.json` scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test:network": "playwright test",
    "test:network:local": "PREVIEW_URL=http://localhost:4321 playwright test"
  },
  "engines": {
    "node": ">=22.0.0"
  }
}
```

---

## State of the Art

| Old approach | Current approach | When changed | Impact |
|--------------|------------------|--------------|--------|
| `@astrojs/tailwind` integration | `@tailwindcss/vite` plugin | Astro 5.2 (Jan 2025) | `@astrojs/tailwind` cannot run Tailwind v4. Use Vite plugin. |
| `@astrojs/image` integration with separate `serviceEntryPoint: '@astrojs/image/services/vercel'` | Built-in `<Image />` from `astro:assets` + `imageService: true` on `@astrojs/vercel` adapter | Astro 3 deprecated `@astrojs/image`; Astro 4+ builds in image | Don't use `@astrojs/image` — it's removed. |
| Hand-rolled `@font-face` CSS pointing to `public/fonts/*.woff2` | `fontProviders.fontsource()` + `<Font>` component | Astro 6 (Mar 2026) — Fonts API stable | Cleaner config; auto preload + fallback metric overrides. |
| Astro 6 CSP API as `experimental` | Stable in Astro 6 | Astro 6.0 release | Use the native CSP API rather than hand-written `vercel.json` `Content-Security-Policy` headers. |
| Plausible Cloud / GA4 | Self-hosted Umami / Plausible / GoatCounter | 2024+ ongoing shift toward sovereignty | Project chose Umami per D-14 — values-driven, not ops-driven. |
| ROT13-only mailto obfuscation | Multi-layer (display variant + JS reveal + `<noscript>`) | 2024+ | ROT13 alone is trivially defeated. |
| llms.txt absent | llms.txt curated for AI crawlers | Adopted by Anthropic, Stripe, Cloudflare in 2025-2026 | 30-min hedge with no downside. |

**Deprecated / outdated (do not use):**
- `@astrojs/tailwind` — replaced by `@tailwindcss/vite`
- `@astrojs/image` — folded into core
- `astro-imagetools` — third-party, no longer recommended now that core image is good
- `astro-seo` (third-party) — sufficient for project but a hand-rolled BaseSEO is simpler and avoids one more dep
- `@astrojs/tailwind`-based starter templates — silently install v3 of Tailwind

---

## Assumptions Log

| # | Claim | Section | Risk if wrong |
|---|-------|---------|---------------|
| A1 | Astro Fonts API accepts the `'400 600'` weight range string for variable fonts | Pattern 1 / Example 1 | LOW — if rejected, fall back to listing weights individually `[400, 600]`. Build error is loud, not silent. |
| A2 | Astro 6 CSP API is the right path for CSP rather than hand-written vercel.json headers | Security Domain | LOW — if API surface differs from expectation, planner defers CSP and uses default headers; CSP isn't strictly required for Phase 1 launch. |
| A3 | `wait-for-vercel-preview` GH Action @ v1.3.1 is current and works with Vercel for GitHub | CI Workflow | LOW — alternatives exist (`zentered/vercel-preview-url`); planner picks one. |
| A4 | nomus has or can have a public HTTPS endpoint for Umami | Umami Self-Hosting | MEDIUM — surfaces during planning. If false, fall back to existing VPS or Umami Cloud. |
| A5 | Wesley has DNS write access for `crossthebridge.io` | Vercel Project Setup + DNS | LOW — almost certainly true; if not, plan adds a "request DNS access" task. |
| A6 | Vercel project for the new build is separate from any existing project serving the apex | Vercel Project Setup + DNS | LOW — even if existing project has multiple domains, separating them is cleaner during the staging period. Easy to merge later. |
| A7 | Cloudflare is NOT in front of the Vercel deploy (DNS-only or no Cloudflare) | Vercel Project Setup + DNS / PITFALLS | LOW — if Cloudflare is in front, planner adds a "verify proxy is gray-cloud / DNS-only" task. |
| A8 | The Umami `data-website-id` is fine to ship in client HTML (it's a public site identifier, not a secret) | Umami Self-Hosting | LOW — confirmed via Umami docs; sites identify clients via this UUID and the host they're loaded on. |
| A9 | `@astrojs/vercel` v5.x is the right pin for Astro 6 (CLAUDE.md said ^8.x) | Standard Stack | LOW — `npx astro add vercel` will pick the right version. |
| A10 | Variable Inter font is preferred over static (per UI-SPEC) — `@fontsource-variable/inter` is the right package | Standard Stack | LOW — both packages exist; if variant detection fails, fall back to `@fontsource/inter` with weights `[400, 600]`. |

**No `[ASSUMED]` claims affect the locked stack itself** — all critical-path version + library choices are `[VERIFIED]` against npm registry. Assumptions concentrate around (a) ops decisions (Umami host, DNS access) Wesley owns, and (b) precise API syntax that is one rebuild away from confirmation.

---

## Open Questions (RESOLVED)

These were decisions the contract left to the planner because they're implementation-mechanics, not contract choices. All 9 are resolved in the Phase 1 plans (`01-{01..10}-PLAN.md`).

1. **Umami hosting target** (D-14) — must resolve before BaseLayout's analytics script tag can be wired. Surface as P0 plan task. Recommendation: nomus if a public endpoint mechanism is solved; existing VPS otherwise.
   - What we know: D-14 picked self-hosted Umami; three candidate hosts identified.
   - What's unclear: whether nomus has a public endpoint configured.
   - Recommendation: ask Wesley directly in plan-phase Q&A before writing tasks.
   - **RESOLVED:** Surfaced as a P0 checkpoint in `01-04-PLAN.md` (autonomous: false). Decision is deferred to execution by design — Wesley picks nomus / VPS / Vercel-separate-project at the checkpoint, then BaseLayout consumes `PUBLIC_UMAMI_HOST` + `PUBLIC_UMAMI_WEBSITE_ID` from the resulting env config.

2. **`light-dark()` CSS function vs `@media (prefers-color-scheme)` override** for theme delivery (UI-SPEC §Color Implementation)
   - What we know: both yield the same contract.
   - What's unclear: baseline-browser support target.
   - Recommendation: use the `@media (prefers-color-scheme: dark)` override pattern — broader support, simpler tokens, no breakage on older Safari/Firefox.
   - **RESOLVED:** `01-02-PLAN.md` ships the `@media (prefers-color-scheme: dark)` override pattern in the `@theme` block (broader browser support; matches A11Y-03).

3. **`CONSULTING_URL` env var default and override placement**
   - What we know: D-05 + UI-SPEC §Page Templates: env-configurable, default `/consulting`, override to `https://crossthebridge.io` for Phase 1 staging.
   - What's unclear: whether this lives in Vercel project env vars or in a `.env` committed to the repo.
   - Recommendation: Vercel project env vars (per-environment overrides), with `.env.example` showing the keys. Don't commit `.env`.
   - **RESOLVED:** `01-01-PLAN.md` commits `.env.example` with `PUBLIC_CONSULTING_URL` (and the Umami keys); per-environment values live in Vercel project env vars (`01-10-PLAN.md` operator setup task).

4. **Bitcoin Bay events list URL** (D-05)
   - What we know: per CONTEXT.md `<deferred>`, ship placeholder if not ready.
   - Recommendation: planner adds a "Wesley provides URL or confirms placeholder" task with a hard placeholder value (e.g., disabled CTA + "Coming soon" copy).
   - **RESOLVED:** `01-09-PLAN.md` ships the BB project page with a "Coming soon" placeholder + Wesley-confirms-or-replaces checkpoint task (autonomous: false).

5. **`@twitter:creator` handle in BaseSEO** (UI-SPEC §Components #7)
   - What we know: placeholder `@wesleypyburn` may be wrong.
   - Recommendation: planner asks Wesley; default to omitting the meta tag rather than shipping a wrong handle.
   - **RESOLVED:** `01-03-PLAN.md` omits the `<meta name="twitter:creator">` tag rather than ship a wrong handle; can be added later via a one-line update once Wesley confirms.

6. **Default OG image author pass** — generate `public/og/default.png` per UI-SPEC §OG Image Template
   - Recommendation: render via Playwright + simple HTML template; commit PNG to repo. Detailed sub-task for executor.
   - **RESOLVED:** `01-03-PLAN.md` task renders `public/og/default.png` via Playwright + the UI-SPEC OG template; PNG is committed to the repo.

7. **Vercel preview URL discovery in CI** (Network Audit § GH Actions wiring)
   - What we know: `wait-for-vercel-preview` action is the de facto choice; alternatives exist.
   - Recommendation: planner picks one and pins the version.
   - **RESOLVED:** `01-10-PLAN.md` pins `patrickedqvist/wait-for-vercel-preview` at a fixed SHA in `.github/workflows/ci.yml`.

8. **CSP authoring strategy** (Security Domain)
   - What we know: Astro 6 CSP API is stable.
   - What's unclear: whether to ship CSP in Phase 1 (vs deferring to a follow-up plan).
   - Recommendation: ship the conservative `vercel.json` headers in Phase 1 (HSTS, X-Frame-Options, etc.), defer CSP authoring to a Phase 1 follow-up plan unless executor has bandwidth.
   - **RESOLVED:** `01-01-PLAN.md` ships conservative `vercel.json` security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy); Astro 6 native CSP API is deferred to a Phase 1 follow-up plan (out of scope for v1 launch).

9. **CI fail-fast vs report-all** in network audit
   - Recommendation: report-all (don't bail on first violation) so PRs surface ALL banned hosts in one run.
   - **RESOLVED:** `01-10-PLAN.md` truth: "Reporter posture is report-all" — Playwright network audit collects all violations across all pages before failing the run.

---

## Sources

### Primary (HIGH confidence)

- [Astro 6.0 release blog](https://astro.build/blog/astro-6/) — Fonts API stable, CSP stable, image improvements
- [Astro Custom Fonts Guide](https://docs.astro.build/en/guides/fonts/) — Fonts API exact config syntax
- [Astro Font Provider API Reference](https://docs.astro.build/en/reference/font-provider-reference/) — full property surface
- [Astro Vercel Adapter Guide](https://docs.astro.build/en/guides/integrations-guide/vercel/) — `imageService` config; static adapter
- [Astro Images Guide](https://docs.astro.build/en/guides/images/) — `<Image />` API
- [Tailwind CSS Astro Install](https://tailwindcss.com/docs/installation/framework-guides/astro) — `@tailwindcss/vite` (NOT `@astrojs/tailwind`)
- [llmstxt.org spec](https://llmstxt.org/) — H1 + blockquote + sections format
- [Schema.org Person](https://schema.org/Person)
- [Schema.org WebSite](https://schema.org/WebSite)
- [Google schema-dts repo](https://github.com/google/schema-dts) — TypeScript types
- [Umami Installation Docs](https://docs.umami.is/docs/install) — Docker compose, requirements
- [Umami GitHub](https://github.com/umami-software/umami) — source + canonical docker-compose.yml
- [Vercel — Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain) — CNAME setup
- [Vercel — Managing DNS Records](https://vercel.com/docs/domains/managing-dns-records)
- [Vercel — Image Optimization](https://vercel.com/docs/image-optimization)
- [Playwright — Setting up CI](https://playwright.dev/docs/ci-intro)
- [Playwright — Best Practices](https://playwright.dev/docs/best-practices)
- [IndieWeb — h-card](https://indieweb.org/h-card)
- [Microformats — h-card](https://microformats.org/wiki/h-card)
- [Google Search Central — Schema Markup Testing Tool](https://developers.google.com/search/docs/appearance/structured-data)

### Secondary (MEDIUM confidence — verified against primary where possible)

- [Astro 6 Stable Release Upgrade Guide](https://lilting.ch/en/articles/astro-6-stable-release-upgrade-guide)
- [Astro 6 Brings Built-in Fonts API and CSP API (AlternativeTo, Mar 2026)](https://alternativeto.net/news/2026/3/astro-6-0-brings-new-astro-dev-built-in-fonts-api-live-content-collections-and-csp-api/)
- [How to Run Umami Analytics in Docker (OneUptime, Feb 2026)](https://oneuptime.com/blog/post/2026-02-08-how-to-run-umami-analytics-in-docker/view)
- [Self-Hosted Website Analytics in 2026 — Umami vs Plausible (SelfHostWise)](https://selfhostwise.com/posts/self-hosted-website-analytics-in-2026-umami-vs-plausible-complete-guide/)
- [Email obfuscation: What works in 2026? (Spencer Mortensen)](https://spencermortensen.com/articles/email-obfuscation/)
- [Accessible Mobile Navigation (a11ymatters)](https://a11ymatters.com/pattern/mobile-nav/)
- [Accessible hamburger buttons without JavaScript (Mat Simon)](https://www.matsimon.dev/blog/accessible-hamburger-buttons-without-javascript)
- [JSON-LD Person Examples](https://jsonld.com/person/)
- [JSON-LD: The Complete Guide to Structured Data 2026 (Schema Pilot)](https://www.schemapilot.app/blog/json-ld-guide/)
- [Schema Markup for SEO and AI Visibility 2026 (Rankeo)](https://rankeo.io/blog/schema-markup-complete-guide)
- [LLMS.txt: Complete Guide With Examples (Incremys)](https://www.incremys.com/en/resources/blog/llms-txt)

### Tertiary (LOW confidence — used for pattern reference only)

- [wait-for-vercel-preview GitHub Action](https://github.com/patrickedqvist/wait-for-vercel-preview) — community action; verify currency at install
- [Self-host Umami Analytics with Docker Compose (Paul's Blog)](https://www.paulsblog.dev/self-host-umami-analytics-with-docker-compose/)
- [Self-hosting Umami on a VPS (DeepakNess)](https://deepakness.com/blog/self-hosting-umami-analytics/)

### Project-internal (the canonical context)

- `.planning/PROJECT.md` — full project context
- `.planning/REQUIREMENTS.md` — 41 v1 requirements; Phase 1 maps to 26
- `.planning/ROADMAP.md` — 3-phase v1 structure, success criteria
- `.planning/STATE.md` — current position
- `.planning/research/SUMMARY.md` — synthesized executive research
- `.planning/research/STACK.md` — Astro 6 + Tailwind v4 stack research
- `.planning/research/ARCHITECTURE.md` — IA, layout firewall, content collections
- `.planning/research/PITFALLS.md` — 18 pitfalls, Phase 1 maps to #1 #2 #3 #4 #5 #9 #18
- `.planning/phases/01-foundation-personal-surface/01-CONTEXT.md` — discuss-phase decisions D-01 through D-19
- `.planning/phases/01-foundation-personal-surface/01-UI-SPEC.md` — visual + interaction contract (45 KB; component specs, copy locks, accessibility contract, theme block)
- `.planning/phases/01-foundation-personal-surface/01-DISCUSSION-LOG.md` — decision rationale
- `./CLAUDE.md` — project instructions (locked stack, GSD enforcement)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions verified against npm registry on 2026-04-26.
- Architecture patterns: HIGH — Astro defaults + UI-SPEC's component specs.
- Astro Fonts API exact config: MEDIUM-HIGH — official docs cited; one assumption (variable weight range syntax) flagged.
- Umami self-hosting: MEDIUM — docs cited; hosting-target decision is a Wesley-owned planning question, not a research gap.
- Network audit pattern: HIGH — Playwright is the canonical 2026 answer.
- JSON-LD schemas: HIGH — schema.org + schema-dts types ground truth.
- Pitfalls (Phase-1-specific): HIGH — most are mined from PITFALLS.md domain knowledge plus open-research observations.
- DNS / Vercel domain config: HIGH — Vercel docs + standard CNAME pattern.

**Research date:** 2026-04-26
**Valid until:** 2026-05-26 (Astro releases minors monthly; pin versions at install time and re-verify quarterly).
