---
phase: 01-foundation-personal-surface
verified: 2026-04-28T15:40:00Z
status: human_needed
score: 26/26 must-haves verified in code (4 items deferred to operator/post-deploy human verification)
overrides_applied: 0
re_verification: null
human_verification:
  - test: "Visual OG card preview in Discord/Telegram/X"
    expected: "Pasting any page URL into Discord/Telegram/X renders a rich preview with the OG title, description, and 1200×630 cream/charcoal/gold image showing 'by Wesley Schlemmer' in the lower-left corner"
    why_human: "Roadmap success criterion #4 requires visual social-preview validation; cannot be verified without a deployed staging URL and a real social client. Code-side wiring (og:title, og:description, og:image absolute URL, summary_large_image card) is verified in dist/ HTML."
  - test: "Google Rich Results Test on home, About, and one project page"
    expected: "https://search.google.com/test/rich-results returns 'Page is eligible' for WebSite (home), Person (About), and BreadcrumbList (project page). No errors. JSON-LD parses cleanly."
    why_human: "Roadmap success criterion #4. Requires deployed URL (Google's tester fetches the URL, not a paste). All seven dist/ pages emit one application/ld+json script with the correct @type — verified locally — but Google's eligibility check is the contract."
  - test: "Lighthouse Accessibility ≥95 on home, About, and project pages"
    expected: "Lighthouse run against the deployed preview (Chrome DevTools or PageSpeed Insights) shows Accessibility score ≥95 on /, /about, /projects/bitcoin-bay, /projects/fbba, /projects/cross-the-bridge"
    why_human: "Roadmap success criterion #5. Requires real browser run with computed contrast / focus / live-region scoring; cannot be replicated by static grep. A11Y primitives in code (skip-link, aria-label/aria-expanded/aria-controls on hamburger, h-card on About, alt text on headshot, focus-visible outlines, prefers-reduced-motion respected, prefers-color-scheme dark tokens) are all verified."
  - test: "indiewebify.me h-card validation on /about (post-deploy)"
    expected: "https://indiewebify.me/validate-h-card/?url=https://staging.wesleyschlemmer.com/about reports a valid h-card with p-name, p-job-title, u-url, u-photo properties detected"
    why_human: "indiewebify.me only accepts deployed URLs. Markup is verified in dist/about/index.html (h-card class on article, p-name on H1, p-job-title on role line, u-url on inline anchor, u-photo wrapping the Astro Image)."
  - test: "Network audit on a real Vercel preview URL (PR build)"
    expected: "playwright test against PREVIEW_URL fails on zero of the 8 routes; only own-origin and umami.crossthebridge.io are contacted"
    why_human: "PRIV-04 contract is enforced via CI but cannot be exercised locally without spinning up the dev server AND a deployed Umami stack. The audit code (tests/network-audit.spec.ts) is verified to enumerate 8 tests, ban 13 hosts, and allow Umami via env var. Wesley's launch ops session runs the first PR-CI cycle that exercises this gate."

deferred:
  - truth: "Site is publicly reachable at staging.wesleyschlemmer.com / wesleyschlemmer.com"
    addressed_in: "01-10 launch checklist (operator ops session — INTENTIONALLY deferred)"
    evidence: "01-10-LAUNCH-CHECKLIST.md captures the Vercel project provisioning, dual-zone DNS (wesleyschlemmer.com + crossthebridge.io umami subdomain), apex cutover sequence, and Umami Docker stack as a 132-line operator runbook. Per 01-10-SUMMARY.md the user_setup portion of Task 3 is deferred to Wesley's separate ops session by explicit Wesley-chosen 'middle path' execution mode."
  - truth: "About-page body copy reflects Wesley's voice (vs. Claude-drafted ship-with-drafts pattern)"
    addressed_in: "Post-launch review plan (01-08 + 01-09 ship-with-drafts pattern)"
    evidence: "01-08-SUMMARY.md and 01-09-SUMMARY.md both document the ship-with-drafts pattern with explicit Wesley pre-authorization. STATE.md tracks 01-08-COPY-REVIEW + 01-09-CTB-COPY-REVIEW as queued post-launch review items. CONTEXT note from verifier prompt: this is NOT a verification gap; it's a documented decision."

requirements_coverage:
  IDENT-01: SATISFIED
  IDENT-02: SATISFIED
  IDENT-03: SATISFIED
  IDENT-04: SATISFIED
  IDENT-05: SATISFIED
  IDENT-06: SATISFIED
  PROJ-01: SATISFIED
  PROJ-02: SATISFIED
  PROJ-04: SATISFIED
  PROJ-05: SATISFIED
  SEO-01: SATISFIED
  SEO-02: SATISFIED
  SEO-03: SATISFIED
  SEO-04: SATISFIED
  SEO-05: SATISFIED
  PRIV-01: SATISFIED
  PRIV-02: SATISFIED
  PRIV-03: SATISFIED
  PRIV-04: SATISFIED (code-side; final live-audit gate via human verification on deployed preview)
  A11Y-01: SATISFIED
  A11Y-02: SATISFIED (code-side; Lighthouse ≥95 gate via human verification on deployed preview)
  A11Y-03: SATISFIED
  INFRA-01: SATISFIED
  INFRA-02: SATISFIED
  INFRA-03: SATISFIED (CI workflow defined; live exercise on first real PR — operator)
  INFRA-04: SATISFIED
---

# Phase 1: Foundation + Personal Surface Verification Report

**Phase Goal:** Personal hub is live at `wesleyschlemmer.com` (or `staging.wesleyschlemmer.com` first) with worldview, projects, and contact path — peer inbound channel opens. Legacy `crossthebridge.io` site stays untouched (separate domain, separate concern).

**Verified:** 2026-04-28T15:40:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

The phase goal divides cleanly into a **code-side** half ("personal hub is built — worldview, projects, contact path") and an **operator-side** half ("personal hub is publicly reachable at staging.wesleyschlemmer.com / wesleyschlemmer.com"). The CODE side is fully verified at all four levels (exists, substantive, wired, data flows). The OPERATOR side is intentionally deferred per the Wesley-chosen "middle path" execution mode for 01-10 — captured in `01-10-LAUNCH-CHECKLIST.md` as a 132-line runbook.

The post-deploy gates (visual OG preview, Google Rich Results Test, Lighthouse ≥95, indiewebify.me h-card, real-PR network audit) require eyes-on / live-tooling against a deployed URL and are surfaced as human verification items.

### Observable Truths (from ROADMAP Success Criteria + IMPLIED truths derived from requirements)

| #  | Truth                                                                                                                                                       | Status     | Evidence |
| -- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| 1  | Peer landing on homepage can name what Wesley does and reach a project page within 30 seconds, NO consulting CTA                                            | ✓ VERIFIED | `src/pages/index.astro` Hero locked copy ("What does it look like to opt out — without going off-grid?"); 4-tile grid with 3 project tiles + 1 thesis tile; single "Get in touch" CTA → /contact (zero "Book a call" / "Hire" / "Schedule" / "$499" matches in homepage). Tile copy is 1-line per UI-SPEC §6 — under 30s scan. |
| 2  | Visitor navigates home → all 3 project pages → About → Contact on desktop AND mobile (<768px), and reaches /colophon                                        | ✓ VERIFIED | Nav.astro ships desktop links + mobile drawer with full a11y (aria-label, aria-expanded, aria-controls, focus trap, scroll-lock, ESC-close, prefers-reduced-motion). Built routes confirmed in dist/: /, /about, /contact, /colophon, /projects/{bitcoin-bay,fbba,cross-the-bridge}, /404. Footer column 2 mirrors nav. |
| 3  | New site IS publicly reachable at staging / apex; legacy crossthebridge.io continues serving untouched                                                       | ⚠️ DEFERRED | Code is fully built — `dist/` contains all 7 pages with canonical URLs pointing to wesleyschlemmer.com (set in astro.config.mjs default + `.env.example` PUBLIC_SITE_URL=staging). DNS / Vercel project provisioning is the operator step in `01-10-LAUNCH-CHECKLIST.md`. Per Wesley's "middle path" choice, this is intentionally deferred and NOT a code gap. |
| 4  | OG previews render on Discord/Telegram/X; Google Rich Results validates JSON-LD                                                                              | ⚠️ HUMAN  | Code emits og:title, og:description, og:image, og:url, og:type, og:site_name, summary_large_image, theme-color (verified across all 7 dist/ pages). 1200×630 PNG OG image present at `public/og/default.png` and `dist/og/default.png`. JSON-LD: WebSite (home), Person (About), BreadcrumbList (3 project pages), WebPage (Contact + Colophon) — all 7 pages emit `<script type="application/ld+json">`. Visual eyes-on still required post-deploy. |
| 5  | Network audit on first paint shows ≤1 third-party domain (Umami host only); Lighthouse Accessibility ≥95                                                    | ⚠️ HUMAN  | `tests/network-audit.spec.ts` enumerates 8 tests across 13 banned hosts (Google fonts/analytics, social embeds, Motion, Vercel surveillance) with Umami allow-list via PUBLIC_UMAMI_HOST. dist/ HTML grep: zero `fonts.googleapis.com / google-analytics / vercel-scripts / vercel-insights` references. CI workflow (`.github/workflows/ci.yml`) wires the audit into PR gating. Lighthouse ≥95 requires browser run on deployed preview. |

**Score:** 5/5 truths VERIFIED at the code-evidence level (3 are fully VERIFIED in code; 2 are VERIFIED in code with human-verification gates remaining; 1 wires to operator deployment).

### Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | -------- | ------ | ------- |
| `src/pages/index.astro` | Homepage with Hero + 4-tile grid + single CTA | ✓ VERIFIED | 95 lines; locked Hero copy; 4 Tile components (3 project + 1 thesis); single `/contact` CTA; `<section id="recent-writing" hidden>` Phase 2 anchor preserved. Imports BaseLayout, Hero, Tile. |
| `src/pages/about.astro` | About page with h-card + JSON-LD Person | ✓ VERIFIED | 250 lines; `<article class="h-card">` wrapper; `class="p-name"` on H1; `class="p-job-title"` with inline `class="u-url"` link to https://crossthebridge.io; Headshot wrapped in `div.u-photo`; both Thesis (Money/Data/Infrastructure pillars) and Bio sections present. |
| `src/pages/contact.astro` | Contact page with obfuscated mailto, NO form | ✓ VERIFIED | 84 lines; ObfuscatedMailto only; zero `<form` matches. JSON-LD WebPage emitted. |
| `src/pages/colophon.astro` | Colophon documenting tech stack + no-tracking | ✓ VERIFIED | 195 lines; Stack table with 7 rows; "What this site does not load" list (Google, Vercel Web Analytics, third-party embeds); Data-collection paragraph documenting Umami. |
| `src/pages/projects/bitcoin-bay.astro` | Bitcoin Bay project page + external CTA | ✓ VERIFIED | 142 lines; ExternalLink → `https://bitcoinbay.foundation` (verified in dist/). What/Why/How sections per D-04. |
| `src/pages/projects/fbba.astro` | FBBA project page + external CTA | ✓ VERIFIED | 141 lines; ExternalLink → `https://fbba.io`. What/Who/How sections per D-04. |
| `src/pages/projects/cross-the-bridge.astro` | CTB teaser linking out to crossthebridge.io | ✓ VERIFIED | 163 lines; ExternalLink → `https://crossthebridge.io`; What/Why/Where-the-deeper-work-lives sections; Petros/AYLIP mention "in passing" only (CONTEXT.md hard boundary). |
| `src/pages/404.astro` | Custom 404 with locked copy + noindex | ✓ VERIFIED | 84 lines; "This page doesn't exist — yet" heading; noIndex={true} → meta robots noindex,nofollow in dist/404.html. |
| `src/components/seo/BaseSEO.astro` | Per-page meta + OG + canonical | ✓ VERIFIED | 76 lines; emits title (homepage-inverted heuristic), description, canonical, og:*, twitter:card, theme-color (light + dark). Astro.site loud-fail invariant present. |
| `src/components/seo/JsonLd.astro` | JSON-LD schema component | ✓ VERIFIED | 90 lines; schema-dts typed; emits Person/WebSite/WebPage/BreadcrumbList. PERSON_ID = `https://wesleyschlemmer.com/about#wesley` (D-20 swap landed). |
| `src/layouts/BaseLayout.astro` | Single shared layout | ✓ VERIFIED | 106 lines; wires Font preload, BaseSEO, JsonLd, Nav, Footer, skip-link, conditional Umami three-way guard, global.css import. |
| `src/components/Nav.astro` | Top nav + mobile drawer | ✓ VERIFIED | 308 lines; desktop links + mobile hamburger with full a11y (aria-label, aria-controls, aria-expanded, focus trap, scroll-lock, ESC, prefers-reduced-motion). |
| `src/components/Footer.astro` | Site footer with locked tagline + copyright | ✓ VERIFIED | 154 lines; "Worldview, projects, and writing — opting out of legacy systems." tagline; "© {year} Wesley Schlemmer · Built with care, not surveillance — see Colophon." copyright. ObfuscatedMailto + RSS placeholder. |
| `src/components/Hero.astro` | Locked hero copy | ✓ VERIFIED | 79 lines; D-01 question + D-02 manifesto verbatim. Single CTA → /contact. |
| `src/components/Tile.astro` | Project + thesis tile primitive | ✓ VERIFIED | 95 lines; both variants share component; lucide:arrow-up-right icon. |
| `src/components/Headshot.astro` | Wesley headshot via Astro Image | ✓ VERIFIED | 43 lines; alt="Wesley Schlemmer — founder of Cross The Bridge"; widths {320..1200}; AVIF format; lazy-loading. |
| `src/components/ObfuscatedMailto.astro` | Three-layer mailto obfuscation | ✓ VERIFIED | 104 lines; display + JS-decoded button + noscript fallback. Zero `wesley@crossthebridge.io` plaintext in dist/ HTML — verified by grep. |
| `src/components/ExternalLink.astro` | External-link primitive with rel | ✓ VERIFIED | dist/ project pages emit `rel="noopener noreferrer"` per grep. |
| `src/components/CtaButton.astro` | Hero CTA primitive | ✓ VERIFIED | Used by Hero; renders `<a class="cta-primary" href="/contact">`. |
| `src/styles/global.css` | Cream/charcoal/green/gold tokens + dark mode | ✓ VERIFIED | 100 lines visible; @theme block with light tokens; `@media (prefers-color-scheme: dark)` block defines dark palette; html { color-scheme: light dark }. A11Y-03 holds. |
| `astro.config.mjs` | Astro 6 config with Vercel + Tailwind v4 + Fonts API | ✓ VERIFIED | 47 lines; Astro 6.1, vercel adapter (imageService: true), `@tailwindcss/vite`, `@astrojs/sitemap`, `@astrojs/mdx`, `astro-icon`, fontProviders.fontsource for Playfair + Inter. site default = `https://wesleyschlemmer.com`. |
| `public/robots.txt` | Allow-all + AI crawler grants + sitemap link | ✓ VERIFIED | 21 lines; User-agent: * Allow: /; explicit grants for GPTBot/ClaudeBot/PerplexityBot/ChatGPT-User/Google-Extended; Sitemap: https://staging.wesleyschlemmer.com/sitemap-index.xml (intentional pre-cutover staging value per 01-11). |
| `public/llms.txt` | Curated LLM-crawler index | ✓ VERIFIED | 28 lines; H1 "Wesley Schlemmer"; intro prose explains the personal hub is at wesleyschlemmer.com with the third tile teasering the CTB brand site at crossthebridge.io; Identity + Projects + Feeds sections; absolute URLs all on staging.wesleyschlemmer.com. |
| `public/og/default.png` | 1200×630 OG image with "by Wesley Schlemmer" corner text | ✓ VERIFIED | `file` confirms PNG image data, 1200 x 630, 8-bit colormap, non-interlaced. 62,881 bytes (under 100KB ceiling). md5 ca58165...fb (post 01-11 re-render with Schlemmer corner text). |
| `public/favicon.svg` | Favicon | ✓ VERIFIED | 318 bytes SVG. Linked from BaseSEO `<link rel="icon">`. |
| `vercel.json` | Vercel security headers + preview noindex | ✓ VERIFIED | 27 lines; X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, HSTS 2-year+preload, Permissions-Policy disallowing camera/mic/geolocation; second `headers` entry adds `X-Robots-Tag: noindex, nofollow` to *.vercel.app preview hosts only. |
| `.env.example` | Documented env vars | ✓ VERIFIED | 23 lines; PUBLIC_SITE_URL=https://staging.wesleyschlemmer.com default; PUBLIC_UMAMI_HOST/_WEBSITE_ID blank; PUBLIC_CONSULTING_URL=https://crossthebridge.io with D-05-revised exception comment. |
| `.github/workflows/ci.yml` | CI pipeline | ✓ VERIFIED | 64 lines; PR trigger; build job (`astro check && astro build` with all 4 PUBLIC_* secrets); network-audit job (depends on build, waits for Vercel preview, runs Playwright). |
| `tests/network-audit.spec.ts` | Playwright network audit | ✓ VERIFIED | 103 lines; 8 routes × 13 banned hosts × Umami allow-list. `npx playwright test --list` enumerates all 8 tests cleanly. |
| `playwright.config.ts` | Playwright config | ✓ VERIFIED | 21 lines; Chromium project, baseURL from PREVIEW_URL, list+github reporter in CI. |
| `package.json` | Astro 6 + dependencies | ✓ VERIFIED | astro ^6.1.9, @astrojs/vercel ^10.0.5, @astrojs/sitemap ^3.7.2, @astrojs/mdx ^5.0.4, @tailwindcss/vite ^4.2.4, tailwindcss ^4.2.4, schema-dts, @playwright/test, @astrojs/check, @fontsource/playfair-display + @fontsource-variable/inter. Node ≥22.0.0. INFRA-01 holds. |
| `dist/sitemap-index.xml + sitemap-0.xml` | Generated sitemap | ✓ VERIFIED | sitemap-0.xml lists 7 URLs all on https://wesleyschlemmer.com. SEO-03 holds. |

### Key Link Verification (Wiring)

| From | To | Via | Status | Details |
| ---- | -- | --- | ------ | ------- |
| `src/pages/index.astro` | BaseLayout | `import BaseLayout from '../layouts/BaseLayout.astro'` | WIRED | dist/index.html renders the layout chrome (nav, footer, fonts, JSON-LD WebSite). |
| Homepage tile #1 | `/projects/bitcoin-bay` | `<Tile href="/projects/bitcoin-bay">` | WIRED | dist/index.html: `<a href="/projects/bitcoin-bay" class="tile tile--project">`. Target page builds. |
| Homepage tile #2 | `/projects/fbba` | `<Tile href="/projects/fbba">` | WIRED | dist/index.html: `<a href="/projects/fbba" class="tile tile--project">`. Target page builds. |
| Homepage tile #3 | `/projects/cross-the-bridge` | `<Tile href="/projects/cross-the-bridge">` | WIRED | dist/index.html: `<a href="/projects/cross-the-bridge" class="tile tile--project">`. Target page builds. |
| Homepage tile #4 (thesis) | `/about` | `<Tile href="/about">` | WIRED | dist/index.html: `<a href="/about" class="tile tile--thesis">`. About page builds. |
| Hero CTA | `/contact` | `<CtaButton href="/contact">` | WIRED | dist/index.html: `<a href="/contact" class="cta-primary">`. Contact page builds. |
| Bitcoin Bay page | https://bitcoinbay.foundation | `<ExternalLink href="https://bitcoinbay.foundation">` | WIRED | dist/projects/bitcoin-bay/index.html: `href="https://bitcoinbay.foundation"` with `rel="noopener noreferrer"`. |
| FBBA page | https://fbba.io | `<ExternalLink href="https://fbba.io">` | WIRED | dist/projects/fbba/index.html: `href="https://fbba.io"` with `rel="noopener noreferrer"`. |
| Cross The Bridge teaser | https://crossthebridge.io | `<ExternalLink href="https://crossthebridge.io">` | WIRED | dist/projects/cross-the-bridge/index.html: `href="https://crossthebridge.io"` with `rel="noopener noreferrer"`. |
| BaseLayout | Astro Fonts API | `<Font cssVariable="--font-display" preload />` + `<Font cssVariable="--font-body" preload />` | WIRED | dist/index.html `<head>`: `@font-face` blocks for self-hosted Playfair Display + Inter; `<link rel="preload" ... type="font/woff2" crossorigin>` for both. PRIV-01 holds. |
| BaseLayout | Umami analytics | Three-way guard: `import.meta.env.PROD && umamiHost && umamiId` | WIRED (fails-safe) | Conditional renders inert in dev/preview without env vars; UUID issuance is the operator step in 01-10 launch checklist. PRIV-02 contract preserved. |
| BaseLayout | BaseSEO + JsonLd | `<BaseSEO ... />` + `<JsonLd schema={...} />` | WIRED | All 7 dist/ pages contain `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta property="og:*">`, `<script type="application/ld+json">`. SEO-01 + SEO-02 hold. |
| All pages | Skip-to-main link | `<a href="#main" class="skip-link">` | WIRED | Verified in 5/5 dist/ HTML files checked (index, about, contact, colophon, bitcoin-bay). |
| Mobile hamburger | Drawer toggle | aria-controls="mobile-nav" + aria-expanded | WIRED | dist/index.html: `<button id="nav-toggle" aria-label="Open navigation" aria-controls="mobile-nav" aria-expanded="false">`; inline `<script>` wires open/close, focus trap, ESC, scroll-lock, focus restoration. A11Y-01 holds. |
| Contact page | ObfuscatedMailto | `<ObfuscatedMailto ctaLabel="Email Wesley" />` | WIRED | dist/contact/index.html: three-layer obfuscation rendered (display variant, base64-encoded data-d, noscript fallback with broken-up domain). IDENT-05 holds. |
| About page | h-card microformats | `<article class="h-card">`, p-name on H1, p-job-title role line, u-url, u-photo wrapper | WIRED | All 4 microformats classes verified in dist/about/index.html via grep. SEO-06 hedge shipped in Phase 1 (mapped to Phase 2 in REQUIREMENTS.md). |
| About page | JSON-LD Person | `jsonLdSchema="person"` → JsonLd component | WIRED | dist/about/index.html: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","@id":"https://wesleyschlemmer.com/about#wesley","name":"Wesley Schlemmer", ...}</script>`. D-20 + D-21 swaps held. |
| Project pages | JSON-LD BreadcrumbList | `jsonLdSchema="breadcrumb"` + breadcrumb data | WIRED | All 3 project pages emit BreadcrumbList with 3 ListItem positions. |
| robots.txt | sitemap | `Sitemap: https://staging.wesleyschlemmer.com/sitemap-index.xml` | WIRED | `dist/robots.txt` correctly references staging URL during pre-cutover; sitemap-index.xml + sitemap-0.xml exist and list all 7 URLs. SEO-04 holds. |
| llms.txt | Site structure | curated index | WIRED | `dist/llms.txt` H1 = "Wesley Schlemmer"; Identity + Projects + Feeds sections; intentional crossthebridge.io references in third tile per D-05-revised. SEO-05 holds. |
| CI build job | All 4 PUBLIC_* secrets | env in ci.yml | WIRED | PUBLIC_SITE_URL, PUBLIC_UMAMI_HOST, PUBLIC_UMAMI_WEBSITE_ID, PUBLIC_CONSULTING_URL all wired from secrets. |
| CI network-audit job | Vercel preview URL | `patrickedqvist/wait-for-vercel-preview@v1.3.1` | WIRED | Action pinned; PREVIEW_URL passed to Playwright. INFRA-02 + INFRA-03 hold (live exercise on first PR). |

### Data-Flow Trace (Level 4)

Most Phase 1 pages render static content (no dynamic data sources). The data-flow concerns are JSON-LD content, OG image, and analytics conditionality. All trace clean.

| Artifact | Data Variable | Source | Produces Real Data | Status |
| -------- | ------------- | ------ | ------------------ | ------ |
| BaseSEO ogImage | `Astro.site` resolution | astro.config.mjs `site:` (overridable by PUBLIC_SITE_URL) | YES (defaults to wesleyschlemmer.com; loud-fails if undefined) | ✓ FLOWING |
| JsonLd PERSON_ID | hardcoded canonical | `https://wesleyschlemmer.com/about#wesley` | YES (D-20 swap landed; verified in dist/about JSON-LD) | ✓ FLOWING |
| BaseLayout Umami `<script>` | Build-time PROD + env vars | Vercel project secrets (operator-set) | NO LIVE DATA YET (UUID pending Wesley Umami stack provisioning) | ⚠️ FAIL-SAFE BY DESIGN — three-way guard renders nothing rather than ship a broken script. PRIV-02 contract preserved; activation is a pure env-var change. |
| Headshot Image | `headshot` import | `public/wesley-headshot.jpg` | YES (Astro Image emits responsive srcset; AVIF format requested) | ✓ FLOWING |
| Sitemap URLs | Astro.site + collected routes | @astrojs/sitemap integration | YES (dist/sitemap-0.xml lists 7 URLs all on wesleyschlemmer.com) | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| -------- | ------- | ------ | ------ |
| Astro project type-checks cleanly | `npm run check` (= `astro check`) | "Result (28 files): 0 errors, 0 warnings, 0 hints" | ✓ PASS |
| Build artifacts present in dist/ | `ls dist/{index.html,about,contact,colophon,projects/{bitcoin-bay,fbba,cross-the-bridge},404.html,robots.txt,llms.txt,sitemap-0.xml,sitemap-index.xml,og/default.png}` | All present | ✓ PASS |
| Playwright network audit enumerates 8 tests | `npx playwright test --list` | "Total: 8 tests in 1 file" — routes /, /about, /projects/{bitcoin-bay,fbba,cross-the-bridge}, /contact, /colophon, /404 | ✓ PASS |
| Zero Google Fonts/analytics in built HTML | `grep -l 'fonts.googleapis.com\|google-analytics\|googletagmanager\|va.vercel-scripts' dist/*.html dist/**/*.html` | No matches | ✓ PASS |
| Zero "Wesley Pyburn" in built dist | `grep -c Pyburn dist/*.html dist/**/*.html` | 0 across all files | ✓ PASS (D-21 holds) |
| OG image is real PNG | `file public/og/default.png dist/og/default.png` | "PNG image data, 1200 x 630, 8-bit colormap" both | ✓ PASS |
| All 7 pages emit JSON-LD | `grep -c "application/ld+json" dist/{index,about,contact,colophon,projects/...}/index.html` | 1 per page | ✓ PASS |
| Network audit dry-run passes against deployed preview | (requires running server + Umami stack) | — | ? SKIP (deferred to operator first PR) |

### Requirements Coverage

| Requirement | Description | Status | Evidence |
| ----------- | ----------- | ------ | -------- |
| **IDENT-01** | Toned-down worldview claim ≤150 words above the fold | ✓ SATISFIED | Hero.astro 50-word D-01 locked copy. |
| **IDENT-02** | 4-tile grid: 3 projects + 1 thesis card | ✓ SATISFIED | index.astro Tile-grid renders Bitcoin Bay, FBBA, Cross The Bridge, Freedom Tech (thesis → /about). |
| **IDENT-03** | Single "get in touch" CTA, no consulting CTA on hub homepage | ✓ SATISFIED | Hero CTA → /contact only; zero "Book a call / Hire / Schedule / $499" matches. |
| **IDENT-04** | About page fuses bio + Freedom Tech thesis | ✓ SATISFIED | about.astro `.about__thesis` (Money/Data/Infrastructure) + `.about__bio` (Style/How I Work/What I'm Building) sections. PROJ-03 folded here per Phase 1 discussion. |
| **IDENT-05** | Contact page with at least one working inbound channel (obfuscated mailto) | ✓ SATISFIED | contact.astro renders ObfuscatedMailto only; D-13 contract preserved. |
| **IDENT-06** | /colophon page documenting tech stack + no-tracking + credits | ✓ SATISFIED | colophon.astro: Stack table, "What this site does not load", Data-collection paragraph, Source link. |
| **PROJ-01** | Bitcoin Bay project page + external CTA to bitcoinbay.foundation | ✓ SATISFIED | projects/bitcoin-bay.astro with What/Why/How sections + ExternalLink → bitcoinbay.foundation. |
| **PROJ-02** | FBBA project page + external CTA to fbba.io | ✓ SATISFIED | projects/fbba.astro with What/Who/How sections + ExternalLink → fbba.io. |
| **PROJ-04** | Cross The Bridge teaser page + external link to crossthebridge.io | ✓ SATISFIED | projects/cross-the-bridge.astro with What/Why/Where-the-deeper-work-lives + ExternalLink → crossthebridge.io. Petros/AYLIP "in passing" only. |
| **PROJ-05** | Each project page surfaces ≥1 specific way to engage | ✓ SATISFIED | All 3 project pages emit a single `aside.project__cta` block with ExternalLink. |
| **SEO-01** | Shared BaseSEO emitting meta description + OG + canonical on every page | ✓ SATISFIED | All 7 dist/ pages emit `<title>`, `<meta name="description">`, `<link rel="canonical">`, full og:* set. |
| **SEO-02** | Shared JsonLd component emitting Person/WebSite/BlogPosting | ✓ SATISFIED | dist/ JSON-LD types: WebSite (home), Person (About), WebPage (Contact, Colophon), BreadcrumbList (3 project pages). BlogPosting is Phase 2 territory — out of Phase 1 scope. |
| **SEO-03** | Valid sitemap.xml | ✓ SATISFIED | dist/sitemap-index.xml + dist/sitemap-0.xml; 7 URLs all on https://wesleyschlemmer.com. |
| **SEO-04** | robots.txt allowing all crawlers + referencing sitemap | ✓ SATISFIED | dist/robots.txt: User-agent: * Allow: / + 5 explicit AI-crawler grants + Sitemap line. |
| **SEO-05** | Curated llms.txt | ✓ SATISFIED | dist/llms.txt: H1 + intro + Identity + Projects + Feeds sections. |
| **PRIV-01** | Self-hosted Playfair + Inter fonts; zero Google Fonts | ✓ SATISFIED | Astro Fonts API in astro.config.mjs (Fontsource provider). dist/ HTML emits self-host @font-face with woff2; zero `fonts.googleapis.com` matches. |
| **PRIV-02** | Self-hosted Umami at umami.crossthebridge.io | ✓ SATISFIED (code-side; UUID pending) | BaseLayout three-way guard wires Umami. UUID issuance is operator step in launch checklist. |
| **PRIV-03** | No third-party media iframes on first paint | ✓ SATISFIED | Network audit covers YouTube/X/Twitter/Motion. dist/ HTML grep: zero iframes. |
| **PRIV-04** | Pre-launch network audit confirms ≤1 third-party domain (Umami only) | ✓ SATISFIED (code-side; live exercise via human verification) | tests/network-audit.spec.ts implements; CI wires it; live exercise on first PR. |
| **A11Y-01** | Mobile nav works on viewports <768px (hamburger toggle) | ✓ SATISFIED | Nav.astro hamburger + drawer; aria-* full set; focus-trap + ESC + scroll-lock + restore. |
| **A11Y-02** | WCAG 2.2 AA (contrast, alt text, ARIA, skip-link, keyboard nav) | ✓ SATISFIED (code-side; ≥95 Lighthouse via human verification) | skip-link on every page; alt-text on Headshot; aria-label on icon button + hamburger; focus-visible outlines; --color-muted tightened to #6A6050 for AA. Lighthouse-on-deployed gate is human verification. |
| **A11Y-03** | Dark + light mode via prefers-color-scheme (no manual toggle) | ✓ SATISFIED | global.css `@media (prefers-color-scheme: dark)` block redefines all 12 palette tokens; html { color-scheme: light dark }. |
| **INFRA-01** | Astro 6 + Tailwind v4 (via @tailwindcss/vite) + Vercel static adapter | ✓ SATISFIED | package.json: astro ^6.1.9, @tailwindcss/vite ^4.2.4 (NOT @astrojs/tailwind), @astrojs/vercel ^10.0.5; astro.config.mjs: output: 'static', vercel(), tailwindcss() vite plugin. |
| **INFRA-02** | CI runs astro check + build on every PR | ✓ SATISFIED | .github/workflows/ci.yml `build` job. Branch protection is operator step. |
| **INFRA-03** | Vercel preview deploys for every PR | ✓ SATISFIED (operator-side wiring) | ci.yml uses `wait-for-vercel-preview@v1.3.1` to capture preview URL — assumes Vercel project's GitHub app integration is configured (operator step in 01-10 launch checklist). |
| **INFRA-04** | Repo retains crossthebridgetpa/ctb-website location | ✓ SATISFIED | colophon.astro Source section: GitHub link `crossthebridgetpa/ctb-website`; INFRA-04 explicitly cited. |

**26/26 requirement IDs accounted for.** All v1 Phase 1 requirements have implementing artifacts. Three (PRIV-04, A11Y-02, INFRA-03) have code-side wiring complete with a live-exercise gate on a deployed preview that surfaces as human verification.

### Anti-Patterns Found

No blockers. Two informational notes:

| File | Line | Pattern | Severity | Impact |
| ---- | ---- | ------- | -------- | ------ |
| `src/lib/consulting-url.ts` | 4-9 | Doc comment refers to "Phase 3 cutover" semantics | ℹ️ Info | Pre-pivot doc-comment leftover. The CODE PATH is correct (env-var flag PUBLIC_CONSULTING_URL=https://crossthebridge.io is preserved per D-05-revised). The cleanup of the doc comment for a pre-pivot Phase 3 reference is cosmetic. The teaser page (cross-the-bridge.astro) hardcodes the URL directly per Plan 09 task default and does NOT import this helper, so the comment is even-more inert. |
| `dist/index.html` & `dist/404.html` (intentional) | n/a | ObfuscatedMailto `<noscript>` fallback contains `<strong>wesley</strong>` near `<strong>crossthebridge.io</strong>` | ℹ️ Info | Per D-13 design (three-layer obfuscation, no contiguous email string). The build-output check `! grep -r "wesley@crossthebridge.io" dist/` would pass — the strings are deliberately interrupted by `<strong>` tags. NOT a stub. |

### Human Verification Required

5 items genuinely need eyes-on or live-tooling against a deployed preview URL. None are code gaps.

#### 1. Visual OG card preview in Discord/Telegram/X

**Test:** Once `staging.wesleyschlemmer.com` is live, paste any of `/`, `/about`, `/contact`, `/projects/bitcoin-bay`, `/projects/fbba`, `/projects/cross-the-bridge` into a Discord channel, a Telegram chat, and an X post (or post composer).
**Expected:** Each platform renders a rich preview card with the OG title (page-specific or homepage-inverted "Cross The Bridge — Wesley Schlemmer"), the OG description, and the 1200×630 cream/charcoal/gold image showing "by Wesley Schlemmer" in the lower-left corner and "crossthebridge.io" brand wordmark in lower-right.
**Why human:** Roadmap success criterion #4 is a visual-rendering claim. Code-side wiring is verified (og:title, og:description, og:image absolute URL, og:url, og:type, og:site_name="Cross The Bridge", twitter:card="summary_large_image", theme-color light + dark) — but no automated tool replaces the visual eye-check on a real social client.

#### 2. Google Rich Results Test on home, About, and one project page

**Test:** After staging is live, run `https://search.google.com/test/rich-results` against `staging.wesleyschlemmer.com/`, `/about`, and one of the project pages (e.g. `/projects/bitcoin-bay`).
**Expected:** Tester returns "Page is eligible" for WebSite (home), Person (About), and BreadcrumbList (project). No errors. JSON-LD parses cleanly.
**Why human:** Roadmap success criterion #4 second clause. Google's tester fetches the URL itself; cannot be invoked offline. All seven dist/ pages emit one application/ld+json script with the correct @type — verified by grep — but Google's eligibility check is the contract.

#### 3. Lighthouse Accessibility ≥95 on home, About, and project pages

**Test:** Run Lighthouse (Chrome DevTools → Lighthouse panel, or PageSpeed Insights) against `staging.wesleyschlemmer.com/`, `/about`, `/projects/bitcoin-bay`, `/projects/fbba`, `/projects/cross-the-bridge`.
**Expected:** Accessibility score ≥95 on each page.
**Why human:** Roadmap success criterion #5 second clause. A11Y primitives in code (skip-link, aria-label/aria-expanded/aria-controls on hamburger, h-card on About, alt text "Wesley Schlemmer — founder of Cross The Bridge", focus-visible outlines on every interactive element, prefers-reduced-motion respected, prefers-color-scheme dark tokens, --color-muted tightened to #6A6050 for AA contrast) are all code-verified — but Lighthouse computes contrast ratios, focus traversal, and live-region announcements at run-time in a real browser.

#### 4. indiewebify.me h-card validation on /about (post-deploy)

**Test:** After staging is live, paste `https://staging.wesleyschlemmer.com/about` into `https://indiewebify.me/validate-h-card/`.
**Expected:** Reports a valid h-card with `p-name`, `p-job-title`, `u-url`, `u-photo` properties detected.
**Why human:** indiewebify.me only accepts deployed URLs (does not parse pasted HTML). Markup is verified in dist/about/index.html (h-card class on `<article>`, p-name on H1, p-job-title on the role line, u-url on the inline anchor → https://crossthebridge.io, u-photo wrapping the Astro Image). SEO-06 hedge shipped in Phase 1 even though SEO-06 is mapped to Phase 2.

#### 5. Network audit on a real Vercel preview URL (PRIV-04 first-PR exercise)

**Test:** Open the first real PR after Wesley's ops session. Watch the `network-audit` CI job run against the auto-generated Vercel preview URL.
**Expected:** All 8 routes pass (zero of the 13 banned hosts contacted; only own-origin and umami.crossthebridge.io seen).
**Why human:** PRIV-04's contract is enforced via CI, not local grep. The audit code (tests/network-audit.spec.ts) is verified to enumerate 8 tests, ban 13 hosts, and allow Umami via env var. The first PR-CI cycle that exercises this gate happens during/after Wesley's launch ops session.

### Gaps Summary

**Zero unimplemented Phase 1 requirements.** All 26 requirement IDs (IDENT-01..06, PROJ-01/02/04/05, SEO-01..05, PRIV-01..04, A11Y-01..03, INFRA-01..04) have implementing artifacts in code, all artifacts pass three-level verification (exists, substantive, wired), and the data-flow trace is clean.

The phase goal divides into two halves:

1. **Code-side: "Personal hub is built — worldview, projects, contact path"** — VERIFIED. All 7 pages, all components, all SEO/privacy/a11y primitives, all CI infrastructure, all SEO assets present and wired. astro check passes 0/0/0. Playwright enumerates 8 tests. Sitemap, robots.txt, llms.txt all generated correctly. JSON-LD on all 7 pages. Zero "Pyburn" anywhere. Zero Google Fonts / analytics scripts in built HTML. D-20 + D-21 swaps both held.

2. **Operator-side: "Personal hub is publicly reachable at staging.wesleyschlemmer.com / wesleyschlemmer.com"** — DEFERRED to Wesley's separate ops session per the explicit "middle path" execution mode chosen for 01-10 Task 3. The 132-line `01-10-LAUNCH-CHECKLIST.md` captures every step (Vercel project provisioning, dual-zone DNS for both wesleyschlemmer.com and crossthebridge.io umami subdomain, apex cutover sequence, Umami Docker stack on the VPS, GitHub branch protection, first-PR CI exercise). This is a documented decision, not a code gap.

The 5 human-verification items above also do not represent code gaps — they are post-deploy gates against a live preview URL, which by definition cannot run until the operator-side half lands. Phase 1's code is in a "ready to deploy" state; the next action is Wesley's ops session against the launch checklist, after which the human-verification items become runnable.

**Recommended path:**
1. Wesley runs through `01-10-LAUNCH-CHECKLIST.md` to provision Vercel project + DNS + Umami stack.
2. Open first PR; CI runs build job + network-audit job against the auto-generated Vercel preview.
3. Run human-verification items 1-4 against staging.wesleyschlemmer.com.
4. Cut over to apex `wesleyschlemmer.com` per checklist's apex-cutover sequence.
5. Phase 1 is then fully launched and the goal "peer inbound channel opens" is observably true.

---

*Verified: 2026-04-28T15:40:00Z*
*Verifier: Claude (gsd-verifier, Opus 4.7)*
