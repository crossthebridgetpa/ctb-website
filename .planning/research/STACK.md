# Stack Research

**Domain:** Personal portfolio + writing-hosting site with consulting subsection (privacy-respecting, Vercel-deployed, markdown-authored)
**Researched:** 2026-04-25
**Overall confidence:** HIGH for framework + analytics + fonts; MEDIUM for some library version pins (verified via current docs/blog posts, not Context7 — Context7 MCP unavailable)

---

## TL;DR — Primary Stack Recommendation

**Astro 6 + Tailwind v4 (via @tailwindcss/vite) + plain Markdown (with MDX as opt-in) + Pagefind + Plausible Cloud (EU) + self-hosted fonts via Astro Fonts API + @astrojs/vercel adapter (static mode) + Vercel image optimization.**

**Why this stack signals values:**
- Astro ships **zero JS by default** — respects visitors' bandwidth, batteries, attention. Fits "anti-surveillance" worldview at the framework level.
- Self-hosted fonts via Astro Fonts API → no third-party request to Google. Eliminates the IP-leak that current site causes (Google Fonts CDN in `index.html` today).
- Plausible / GoatCounter / Umami / Fathom — pick one — all cookieless, no consent banner needed. None are GA4.
- Markdown content collections → Wesley writes essays in his vault using the same tools he already uses; no CMS lock-in.

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Astro** | `^6.1` (Astro 6.1, released March 2026) | Static-first site framework with content collections, MDX support, native CSP, Fonts API | Best-in-class for content sites in 2026: ships near-zero JS by default (PageSpeed 98–100 typical), first-class markdown content collections, Cloudflare-acquired with strong roadmap, native font self-hosting. Beats Next.js for this use case (no React runtime tax) and beats 11ty on DX, image pipeline, and ecosystem. **Confidence: HIGH** ([Astro 6 announcement](https://astro.build/blog/whats-new-march-2026/), [InfoQ](https://www.infoq.com/news/2026/02/astro-v6-beta-cloudflare/)) |
| **Tailwind CSS** | `^4.x` (via `@tailwindcss/vite`) | Utility-first CSS, design tokens via CSS variables | v4 is now the recommended approach in Astro via the Vite plugin (the old `@astrojs/tailwind` integration is deprecated for v4). Cuts inline-CSS bloat dramatically vs current site's 1100-line style block. Wesley can still author hand-tuned CSS for hero/identity sections — Tailwind handles the long tail. **Confidence: HIGH** ([Tailwind Astro install guide](https://tailwindcss.com/docs/installation/framework-guides/astro), [Tailkits 2026 setup guide](https://tailkits.com/blog/astro-tailwind-setup/)) |
| **@astrojs/vercel** | `^8.x` (current as of 2026) | Vercel adapter for Astro | Required for using Vercel's image optimization, Web Analytics (off — we don't want them), and ISR features. Static mode (`output: 'static'` in config) is the default and what we want for a portfolio. Adapter only adds value if we use Vercel image API. **Confidence: HIGH** ([Astro Vercel docs](https://docs.astro.build/en/guides/integrations-guide/vercel/)) |
| **Plain Markdown** (`.md`) | n/a — built into Astro | Long-form essays + notes via content collections | Simpler, more portable, future-proof. No JSX runtime overhead. Wesley already authors notes as `.md` in his Hermes vault — content can move/symlink in without transformation. **MDX enabled but used sparingly** (see Supporting Libraries). **Confidence: HIGH** ([Astro markdown docs](https://docs.astro.build/en/guides/markdown-content/)) |
| **Pagefind** | `^1.x` | Static-site search (zero-backend, privacy-respecting) | Indexes built HTML at build time, splits into tiny binary chunks loaded on demand. No SaaS, no fingerprinting, no third-party requests. Scales to 100K pages. Standard answer for static blogs in 2026. **Confidence: HIGH** ([Pagefind comparison](https://sarthakmishra.com/blog/astro-search-comparison)) |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@astrojs/mdx` | `^4.x` | MDX support (Markdown + JSX/components) | Install + enable, but **default to `.md`** for essays/notes. Use `.mdx` only when an essay genuinely needs an embedded interactive component (chart, demo, custom callout). Don't make MDX the default — it's a JS module per file and adds preprocess overhead at scale. ([CSS-Tricks: Markdown + Astro](https://css-tricks.com/markdown-astro/)) |
| `@astrojs/rss` | `^4.0.18` | RSS feed generation for essays + notes | One file at `src/pages/feed.xml.js` (or `essays.xml.js` + `notes.xml.js`) using `getCollection()`. Critical for Freedom Tech / Bitcoin / FBBA peer audience — these are RSS-native communities. **Confidence: HIGH** ([@astrojs/rss npm](https://www.npmjs.com/package/@astrojs/rss)) |
| `@astrojs/sitemap` | `^3.x` | sitemap.xml generation | Required for the "SEO + AI-search readiness" requirement in PROJECT.md. Auto-generates from routes. |
| `astro-expressive-code` | `^0.x` | Code blocks with frames, copy buttons, syntax highlighting (uses Shiki underneath) | Wesley's writing will include code, terminal output, and config snippets. Expressive-Code gives editor/terminal frames + copy button + diff highlighting out of the box. Lighter alternative: rely on Astro's built-in Shiki only — no copy button, no frames, but zero extra deps. Default to expressive-code unless build time becomes an issue. ([Expressive-Code](https://expressive-code.com/key-features/syntax-highlighting/)) |
| **Fontsource packages** (e.g. `@fontsource/playfair-display`, `@fontsource/inter`) | latest | Self-hosted Playfair Display + Inter via npm packages | Either install Fontsource npm packages and import in a layout, OR use the new Astro Fonts API (`fonts: [...]` in `astro.config`) with `provider: fontsource()`. The Fonts API is **stable** in Astro 6 and is the cleaner long-term choice — handles preload, fallback metric overrides, and caching. Eliminates the Google Fonts IP leak (the current site's GDPR risk). **Confidence: HIGH** ([Astro Fonts API docs](https://docs.astro.build/en/guides/fonts/)) |
| `sharp` | bundled by Astro | Local image transforms during dev/build | Astro bundles Sharp. No manual install needed unless customizing the image service. In production on Vercel, use `imageService: 'vercel'` so Vercel does on-demand resize/format conversion (avoids shipping Sharp to the serverless function). ([Vercel image optimization](https://vercel.com/docs/image-optimization)) |
| `remark-gfm` | latest | GitHub-Flavored Markdown (tables, autolinks, strikethrough) | Likely already wired in Astro's defaults; verify in `astro.config.mjs`. Wesley's note-taking style probably uses GFM tables. |
| (Optional) `astro-icon` | `^1.x` | Inline SVG icons from Iconify with zero JS | Useful for the project-tile section if we want crisp, tree-shakeable icons (Bitcoin, Linux, etc.) without a font-icon dependency. Skip if all visuals are custom. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **Node.js** | Runtime for build | Astro 6 requires Node 18.20.8+ / 20.3.0+ / 22.0.0+. Vercel auto-detects from `package.json` `engines`. Pin to LTS (Node 22.x) in `package.json`. |
| **pnpm** (preferred) or npm | Package manager | pnpm has faster installs and the strict-by-default `node_modules` layout catches phantom dependencies — useful for a one-person project where you want determinism. npm is fine if Wesley doesn't already use pnpm. |
| **Prettier + `prettier-plugin-astro`** | Formatting | Format `.astro`, `.md`, `.mdx`, `.ts`, `.css` consistently. |
| **TypeScript** | Type-checking content schemas | Astro's content collections use Zod schemas — TypeScript gives autocomplete + frontmatter validation at build time. Astro projects are TS-by-default. |
| **`astro check`** | Pre-deploy type-check | Run in CI before `astro build` to catch broken collection refs / link rot. |
| **GitHub Actions** (light) | Optional CI gate | Current project auto-deploys from `main` with no CI. Add a single workflow that runs `astro check && astro build` on PRs to catch breaks before merge. Keeps the auto-deploy-from-main workflow but stops broken HTML from shipping. |

---

## Installation

```bash
# 1. Scaffold (interactive — pick "minimal" template, TypeScript: strict, install deps)
npm create astro@latest ctb-website -- --template minimal --typescript strict

cd ctb-website

# 2. Vercel adapter (use astro CLI helper — patches astro.config.mjs)
npx astro add vercel

# 3. Tailwind v4 via Vite plugin (use astro CLI helper — patches astro.config.mjs)
npx astro add tailwind

# 4. MDX (enable, but author in .md by default)
npx astro add mdx

# 5. Sitemap
npx astro add sitemap

# 6. RSS
npm install @astrojs/rss

# 7. Search (Pagefind — wires into the build output, no integration needed)
npm install -D pagefind

# 8. Syntax highlighting frames + copy button
npx astro add astro-expressive-code

# 9. Self-hosted fonts (option A: npm packages — simplest)
npm install @fontsource/playfair-display @fontsource/inter

# OR option B: Astro Fonts API + Fontsource provider (configured in astro.config.mjs;
# no separate npm install needed beyond astro itself for Fontsource provider).

# 10. Optional: Iconify for SVG icons
npm install astro-icon @iconify-json/lucide @iconify-json/simple-icons
```

**Pagefind build hook** — add to `package.json`:
```json
{
  "scripts": {
    "build": "astro check && astro build && pagefind --site dist"
  }
}
```

---

## Decision Rationale: Framework Bake-Off

### Astro 6 (RECOMMENDED)
- **Ships zero JS by default**; opt into per-component "islands" only where interactivity is needed (search box, contact form). Direct fit with anti-surveillance, performance-first values.
- **Content collections** with Zod schemas: type-safe `essays/`, `notes/`, `projects/` with build-time frontmatter validation. Markdown-native.
- **Native Fonts API + CSP** (Astro 6, stable): self-hosted fonts with one config line; CSP headers without manual templating. Both are direct privacy/security wins.
- **Vercel-friendly:** `npx astro add vercel`, deploys static by default with zero config; image optimization integrates with Vercel's API on-demand without shipping Sharp to serverless.
- **Cloudflare acquired Astro in early 2026** — long-term funding/momentum is now strong; not a hobby project.
- **Trade-offs:** If Wesley ever wants a fully dynamic dashboard or per-user state, he'll need an SSR adapter. Not a concern for a portfolio + essays site.

### 11ty 3 (RUNNER-UP — choose if you reject npm-heavy frameworks)
- **Strengths:** Smallest mental model in the SSG world, fastest builds for huge content sites, ESM-native after 3.0 (Oct 2024), template-language flexibility (Nunjucks, Liquid, Markdown, JS, Vue SFC).
- **When to choose 11ty over Astro:** You actively don't want a component model, you want minimum dependencies, or you want to template in Nunjucks/Liquid instead of `.astro`. For a personal blog/portfolio with <500 pages, both produce equivalent output.
- **Why NOT for this project:** Image pipeline and font handling are more DIY (Astro provides both natively as of v6). Component composition for project-tile sections is more verbose. Smaller ecosystem of pre-built integrations for the things we want (RSS, sitemap, MDX equivalents).

### Next.js 15 (NOT RECOMMENDED for this project)
- **Strengths:** App Router, React Server Components, mature ecosystem, first-class Vercel.
- **Why NOT:** Ships React runtime even for static pages — heavier than necessary. App Router complexity is overkill for a portfolio. Wesley's anti-surveillance framing benefits from a framework that *defaults* to no JS, not one that requires you to fight defaults to avoid shipping React. Next.js is the right answer when you need a SaaS app with auth, dashboards, and dynamic data — not an essay site. **Choose Next.js only if** the consulting subsection grows into a full client portal with auth/billing in v2+.

### Hugo (NOT RECOMMENDED — but acceptable)
- **Strengths:** Fastest builds in the SSG world (Go), zero npm, single binary deploy.
- **Why NOT:** Templating in Go templates is a ceiling for a one-person operation that occasionally wants to drop in a Tailwind-styled component. Markdown shortcodes work but are clunkier than `.astro`/`.mdx`. Image pipeline lags Astro. **Choose Hugo only if** you actively want to ban Node.js from the toolchain.

### Plain static HTML (NOT RECOMMENDED — what you're escaping)
- **Why NOT:** It's the current state, and the PROJECT.md explicitly identifies its failure modes: 1100 lines of inline CSS (unmaintainable), no shared layouts (every page repeats `<head>`), no content collections (essays would each need to be hand-written HTML), no build pipeline for images/fonts. The cost of moving to Astro is small (a weekend's work for Wesley + me) and the unlock is large (every essay = a `.md` file).

---

## Privacy-Respecting Analytics: Decision Matrix

The PROJECT.md is explicit: anti-surveillance worldview, no GA4. All four candidates (Plausible, Umami, GoatCounter, Fathom) pass the privacy bar — none use cookies, none fingerprint, all are GDPR/CCPA-compliant by default. The decision is operational.

| Tool | License | Hosting | Cost | Best For |
|------|---------|---------|------|----------|
| **Plausible** | AGPL (Community Edition) | Cloud (EU) OR self-hosted | $9/mo cloud (10K pv); free self-hosted | **Recommended default** — best dashboard, best funnels/goals, EU data residency for the cloud version. Self-host if Wesley wants the full anti-SaaS posture. |
| **GoatCounter** | EUPL | Self-hosted only (single Go binary) OR free hosted for non-commercial | Free (hosted, personal/non-commercial) or free (self-hosted) | **Strong contender** — Wesley qualifies for the free hosted tier. Single Go binary if self-hosted. Most minimalist of the four. Public dashboard option (Wesley could make stats publicly visible — a values flex). |
| **Umami** | MIT | Self-hosted OR cloud (1M events/mo free) | Free (cloud) or free (self-hosted; needs Postgres/MySQL) | Cleanest if Wesley wants self-hosted but doesn't want to set up Plausible's heavier stack. Generous free cloud tier. |
| **Fathom** | Closed-source | Cloud only | $15/mo (100K pv, unlimited sites) | **NOT recommended** for this project — closed-source contradicts Freedom Tech / open-source values; no self-host option. Skip on principle. |

### Recommendation: **Plausible Cloud (EU)** for v1, with a clear migration path to self-hosted Plausible Community Edition if Wesley wants to consolidate analytics for multiple sites later.

**Rationale:**
- Cloud reduces ops burden (Wesley is "weak on small details" per PROJECT.md context — running Postgres for analytics is friction).
- EU data residency means visitor IPs don't even cross the Atlantic.
- $9/mo is rounding error vs the consulting offers ($499 / $1500 / $3000 tier).
- AGPL means we can self-host later with no migration trauma; same dashboard either way.
- Adding Plausible to Astro: one `<script>` tag in the layout's `<head>`. ~1 KB.

**Alternative: GoatCounter hosted (free)** — if Wesley wants $0 spend and is okay with a less polished dashboard. Plausible has clearly better UX. Either is values-aligned.

**DO NOT use Vercel Web Analytics** — Vercel's first-party analytics is privacy-respecting for visitors but data sits in Vercel's account; the brand is also "the surveillance-adjacent VC-backed cloud" which is not the signal we're sending. Plus it requires the @astrojs/vercel adapter in serverless mode (extra build complexity).

[Sources: [Self-hosted analytics 2026](https://openpanel.dev/articles/self-hosted-web-analytics), [Plausible vs Umami vs Fathom](https://apiscout.dev/blog/plausible-vs-umami-vs-fathom-analytics-2026), [GoatCounter review 2026](https://userbird.com/review/goatcounter)]

---

## MDX vs Plain Markdown — Decision

**Default to plain Markdown (`.md`) for essays + notes.** Enable MDX (`@astrojs/mdx`) but use it only when needed.

**Rationale:**
- Plain Markdown outputs HTML; MDX outputs a JS module of JSX components — heavier.
- All valid Markdown is valid MDX, so renaming `.md` → `.mdx` later is zero-cost when an essay needs an embedded component.
- Wesley authors in his vault as `.md` — keeping content as `.md` means notes can flow between vault and site with no syntactic transformation.
- The Astro pattern: `src/content/essays/*.md` for the 95% case; `src/content/essays/*.mdx` for the 5% essay that genuinely embeds an interactive component (Bitcoin price widget, embedded TradingView snippet, etc.).

[Source: [Astro markdown vs MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/)]

---

## Tailwind v4 vs Vanilla CSS — Decision

**Tailwind v4 via `@tailwindcss/vite` plugin.**

**Rationale:**
- Current site is 1100 lines of inline CSS — unmaintainable. The cost of "no abstraction" is paid in every edit.
- Tailwind v4's CSS-variable-based design tokens map well to the brand palette (cream/charcoal/green/gold from PROJECT.md context). Define palette + typography scale in `@theme` block in `global.css`; reuse across pages.
- v4's CSS-first config (no JS-based `tailwind.config.js`) is closer to "just CSS" — easier to reason about than v3.
- Doesn't preclude hand-rolled CSS for unique sections (hero, brand identity moments) — write a vanilla `<style>` block right in the `.astro` component for those.
- **DO NOT use `@astrojs/tailwind`** — that integration is deprecated for Tailwind v4; use `@tailwindcss/vite` instead.

**Alternative if you reject Tailwind:** vanilla CSS with `:root` custom properties + a small set of utility classes hand-written in `src/styles/global.css`. Viable for a small site — the cost is reinventing spacing/typography scales. Choose this only if Wesley actively dislikes utility-class CSS.

[Source: [Tailwind Astro install](https://tailwindcss.com/docs/installation/framework-guides/astro), [Astro 5.2 release](https://astro.build/blog/astro-520/)]

---

## Image Optimization — Decision

**Use Astro's `<Image />` component + `imageService: 'vercel'` in `astro.config.mjs`.**

**Rationale:**
- Local images (e.g., headshot, project hero shots) live in `src/assets/` and are imported as ES modules → Astro's `<Image />` handles dimensions, format conversion, srcset.
- In production, Vercel's image API does the actual resize/format work on-demand → keeps the serverless function small (no Sharp shipped) and uses Vercel's CDN cache. For a static-output site, this is automatic when you use the @astrojs/vercel adapter with `imageService: 'vercel'`.
- Astro 6.1 added `image.service.config` for codec-specific defaults (set JPEG quality, AVIF quality, WebP quality once globally).
- Replaces the current site's pattern of one 95 KB JPG with no WebP/srcset/lazy-loading.

**Format strategy:** Output AVIF + WebP with JPEG fallback. Vercel handles content negotiation.

[Source: [Astro 6.1 release](https://astro.build/blog/astro-610/), [Vercel image optimization](https://vercel.com/docs/image-optimization)]

---

## Search — Decision

**Pagefind.** Static-site search, indexes the built HTML, no SaaS, no fingerprinting.

- Add `pagefind --site dist` after `astro build` (see install snippet).
- Drop the Pagefind UI snippet (small JS bundle, ~30 KB) into a `/search` route or as a modal triggered from the nav.
- Privacy: search happens entirely client-side; no queries leave the browser. Direct values fit.
- Alternatives rejected: **Algolia** (paid, hosted, third-party tracking); **Fuse.js** (loads entire index — fine for <100 essays, but Pagefind scales better and is the 2026 standard).

[Source: [Pagefind comparison](https://sarthakmishra.com/blog/astro-search-comparison)]

---

## Fonts — Decision

**Self-host via Astro Fonts API with Fontsource provider** (Playfair Display + Inter, matching the existing brand).

**Rationale (this is a values-load-bearing choice):**
- Current site loads Google Fonts from `fonts.googleapis.com` → leaks visitor IP to Google. Multiple EU courts have ruled this is a GDPR violation (Munich LG ruling, LG München I, 3 O 17493/20).
- Self-hosting eliminates the third-party request entirely. No consent banner needed.
- Astro 6's Fonts API is stable as of 2026: `fonts: [{ name: 'Playfair Display', cssVariable: '--font-display', provider: fontsource() }]` in `astro.config.mjs` → handles preload, fallback-metric override (avoids CLS), and caching automatically.
- Performance bonus: self-hosted fonts typically score 15–30% better on LCP than Google Fonts CDN.

[Source: [Astro Fonts docs](https://docs.astro.build/en/guides/fonts/), [Google Fonts GDPR compliance 2026](https://privacychecker.pro/blog/google-fonts-gdpr-compliant)]

---

## Security: Native CSP

**Enable Astro 6's stable CSP API** in `astro.config.mjs`. Cuts XSS / code-injection risk and signals security awareness without any third-party tooling. Configure once, applies to static and dynamic routes.

```js
// astro.config.mjs
export default defineConfig({
  experimental: {}, // CSP no longer experimental in Astro 6
  // CSP config here per the Astro 6 docs
});
```

Pair with a `vercel.json` `headers` block for any non-CSP security headers (HSTS, Referrer-Policy: `strict-origin-when-cross-origin`, X-Content-Type-Options).

[Source: [Astro 6 CSP](https://astro.build/blog/whats-new-march-2026/)]

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Google Fonts CDN** (`fonts.googleapis.com`) | Leaks visitor IP to Google → GDPR violation per multiple EU rulings; performance penalty vs self-hosted | Astro Fonts API + Fontsource provider (self-hosted) |
| **Google Analytics 4** | Visitor surveillance, requires consent banner, contradicts the entire PROJECT.md anti-surveillance framing | Plausible Cloud (EU) or GoatCounter |
| **Vercel Web Analytics** | Privacy-respecting for visitors, but ties analytics to Vercel account and signals "VC-cloud" rather than "Freedom Tech"; also requires SSR adapter mode | Plausible / GoatCounter (independent of host) |
| **`@astrojs/tailwind` integration** | Deprecated for Tailwind v4 — using it traps you on v3 | `@tailwindcss/vite` plugin (added via `npx astro add tailwind` on Astro 5.2+) |
| **Next.js 15** | Ships React runtime for content pages; App Router complexity is overkill for a portfolio; wrong defaults (JS-by-default) for a values-aligned site | Astro 6 |
| **Hand-written `index.html` (current state)** | No content collections, every essay = hand-written HTML, 1100-line inline CSS, no image pipeline, no shared layout | Astro 6 with content collections |
| **MDX as default content format** | JS module per file; preprocess overhead; harder to move content between vault and site | Plain `.md`; enable MDX, use only when an essay needs embedded components |
| **Algolia for search** | Paid SaaS, third-party JS, network requests for every keystroke → privacy negative | Pagefind (static, client-side, zero SaaS) |
| **Fathom Analytics** | Closed-source, cloud-only, no self-host option — contradicts Freedom Tech / open-source ethos | Plausible (AGPL) or GoatCounter (EUPL) or Umami (MIT) |
| **Disqus / Hyvor / any third-party comments** | Comments are out of scope per PROJECT.md (no daily-log content), but if added later: third-party comment SaaS = analytics + cookies leak | Federated alternative (Cactus Comments / static Webmention) only if comments become a requirement |
| **Headless CMS** (Sanity, Contentful, Strapi) | Adds an external dependency, vendor lock-in, paid tier, and Wesley already authors in markdown | Markdown content collections in-repo |
| **Vercel Speed Insights** | Sends RUM data to Vercel — same surveillance concern as analytics | None needed; Plausible covers visitor metrics, Lighthouse covers performance |

---

## Stack Patterns by Variant

**If consulting subsection becomes a full client portal (auth, billing, dashboards):**
- Move CTB Consulting to a subdomain (`consulting.crossthebridge.io` or `app.crossthebridge.io`) with its own Next.js or Remix project.
- Keep main site on Astro. Two separate Vercel projects, two separate repos (or a monorepo).
- Don't try to make Astro do auth — it can, but Next.js is the right tool for that workload.

**If Wesley wants 100% self-hosted (no Vercel):**
- Astro builds to `dist/` — copy to any static host. Cloudflare Pages, Netlify, Caddy on a VPS, or even a Pi at home.
- Drop the @astrojs/vercel adapter; remove `imageService: 'vercel'` (use default Sharp-based service).
- Self-host Plausible Community Edition on the same VPS for full sovereignty.
- This is a v2+ option — don't do it now (PROJECT.md constraint: stay on Vercel for v1).

**If ops budget is $0:**
- GoatCounter (free hosted, non-commercial) instead of Plausible.
- Skip @astrojs/vercel adapter; use default static deploy. Vercel hobby tier is free for personal sites.

---

## Version Compatibility (verified as of 2026-04-25)

| Package | Version | Notes |
|---------|---------|-------|
| `astro@^6.1` | 6.1.x | Requires Node 18.20.8+ / 20.3.0+ / 22.0.0+ |
| `@astrojs/vercel@^8` | 8.x | Pairs with Astro 6; older v7 was for Astro 5 |
| `@astrojs/mdx@^4` | 4.x | Astro 6 compatible |
| `@astrojs/rss@^4.0.18` | 4.0.18 | Latest as of npm check |
| `@astrojs/sitemap@^3` | 3.x | Astro 6 compatible |
| `tailwindcss@^4` + `@tailwindcss/vite` | 4.x | NOT `@astrojs/tailwind` (deprecated for v4) |
| `pagefind@^1` | 1.x | CLI-driven, no Astro integration needed |
| `astro-expressive-code` | 0.x | Wraps Shiki; check Astro 6 compat in changelog before pin |
| `@fontsource/*` | latest | Per-font-family npm packages; alternative to Astro Fonts API |

**Notes:**
- Pin major versions in `package.json`; let Renovate/Dependabot bump minors.
- Run `npm outdated` quarterly. Astro releases minors monthly — usually painless to upgrade.

---

## Confidence Assessment

| Area | Confidence | Why |
|------|------------|-----|
| Astro 6 as the framework | HIGH | Multiple 2026 sources, official Astro blog, Cloudflare acquisition validates roadmap |
| Tailwind v4 via Vite plugin | HIGH | Tailwind official docs, Astro 5.2 release notes confirm `@astrojs/tailwind` deprecation |
| Plausible as analytics default | HIGH | Multiple 2026 comparisons agree on positioning; AGPL + EU residency confirmed |
| Pagefind for search | HIGH | 2026-dated sources confirm it's the standard for static sites |
| Self-host fonts via Astro Fonts API | HIGH | Astro docs confirm stable; legal precedent on Google Fonts is unambiguous |
| MDX-as-opt-in (not default) | HIGH | Astro docs explicit on the trade-off |
| Vercel image service via @astrojs/vercel | HIGH | Both Astro and Vercel docs confirm pattern |
| Exact version pins (`^6.1`, `^4.0.18`, etc.) | MEDIUM | Verified via web sources; recommend running `npm view <pkg> version` at install time to confirm exact latest |
| Astro 6 CSP API exact config syntax | MEDIUM | Stable in Astro 6 per release notes; exact API surface verified at install time from `docs.astro.build/en/reference/configuration-reference/` |

---

## Sources

**Astro framework:**
- [What's new in Astro - March 2026](https://astro.build/blog/whats-new-march-2026/) — Astro 6.1 confirmation, image + markdown improvements
- [Astro 6 Beta announcement (InfoQ, Feb 2026)](https://www.infoq.com/news/2026/02/astro-v6-beta-cloudflare/) — redesigned dev server, Cloudflare-first
- [Astro 6 features & breaking changes](https://www.southwellmedia.com/blog/astro-6-whats-coming-2026)
- [Astro Content Collections 2026 guide](https://inhaq.com/blog/getting-started-with-astro-content-collections)
- [Astro markdown docs](https://docs.astro.build/en/guides/markdown-content/)
- [Astro MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Astro Fonts API docs](https://docs.astro.build/en/guides/fonts/)
- [Astro Vercel adapter](https://docs.astro.build/en/guides/integrations-guide/vercel/)
- [Astro 6.1 release notes](https://astro.build/blog/astro-610/)
- [Astro 5.2 release (Tailwind v4 support)](https://astro.build/blog/astro-520/)

**Comparisons:**
- [Astro vs Next.js for Blogs 2026](https://sourabhyadav.com/blog/astro-vs-nextjs-for-blogs-2026/)
- [Astro vs Next.js vs Eleventy 2026](https://www.index.dev/skill-vs-skill/astro-vs-nextjs-vs-eleventy)
- [Top static site generators 2025](https://cloudcannon.com/blog/the-top-five-static-site-generators-for-2025-and-when-to-use-them/)

**Tailwind:**
- [Install Tailwind with Astro (official)](https://tailwindcss.com/docs/installation/framework-guides/astro)
- [Astro + Tailwind v4 Setup 2026](https://tailkits.com/blog/astro-tailwind-setup/)

**Search:**
- [Astro search engines compared (Sarthak Mishra)](https://sarthakmishra.com/blog/astro-search-comparison)
- [Building static site search with Pagefind](https://karl.fail/blog/building-a-static-site-search-with-pagefind/)

**Privacy analytics:**
- [Self-hosted web analytics 2026](https://openpanel.dev/articles/self-hosted-web-analytics)
- [Plausible vs Umami vs Fathom 2026](https://apiscout.dev/blog/plausible-vs-umami-vs-fathom-analytics-2026)
- [Privacy-preserving analytics: Plausible, Umami, GoatCounter](https://dasroot.net/posts/2026/03/privacy-preserving-analytics-plausible-umami-goatcounter/)
- [GoatCounter Review 2026](https://userbird.com/review/goatcounter)

**Fonts / GDPR:**
- [Is Google Fonts GDPR Compliant in 2026?](https://privacychecker.pro/blog/google-fonts-gdpr-compliant)
- [Google Fonts and GDPR: why self-hosting is essential](https://www.ruelle.studio/latest-news/think-google-fonts-are-safe-think-again)
- [Self-hosted vs CDN fonts: performance + privacy](https://font-converters.com/compare/self-hosted-vs-cdn)

**Image optimization:**
- [Vercel image optimization](https://vercel.com/docs/image-optimization)
- [Astro.js Image Component on Vercel (Shramko)](https://shramko.dev/blog/astro-image-on-vercel)

**RSS:**
- [@astrojs/rss on npm](https://www.npmjs.com/package/@astrojs/rss)
- [Astro RSS docs](https://docs.astro.build/en/recipes/rss/)

**Syntax highlighting:**
- [Astro syntax highlighting docs](https://docs.astro.build/en/guides/syntax-highlighting/)
- [Expressive Code](https://expressive-code.com/key-features/syntax-highlighting/)

**CSP:**
- [Astro 6 CSP API stable](https://alternativeto.net/news/2026/3/astro-6-0-brings-new-astro-dev-built-in-fonts-api-live-content-collections-and-csp-api/)
- [How to setup CSP in Astro 6 (Trevor Lasn)](https://www.trevorlasn.com/blog/csp-headers-astro)

---

*Stack research for: personal portfolio + writing-hosting site (crossthebridge.io v2)*
*Researched: 2026-04-25*
*Note: Context7 MCP unavailable in this agent invocation (upstream bug anthropics/claude-code#13898). Versions verified via official docs + 2026-dated sources rather than Context7. Recommend running `npm view <pkg> version` at install time to confirm exact pins.*
