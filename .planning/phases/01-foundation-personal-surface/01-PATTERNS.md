# Phase 1: Foundation + Personal Surface — Pattern Map

**Mapped:** 2026-04-26
**Files analyzed:** 30 (29 to create + 1 to optimize-in-place)
**Analogs found:** 4 in-repo reference / 26 from RESEARCH.md excerpts (zero in-repo code analogs — fresh scaffold)

---

## Caveat: From-Scratch Phase

This is a **greenfield Astro 6 scaffold**. The current repo contains only:

- `index.html` (1100-line hand-rolled HTML, retired in Phase 3)
- `styles.css` (1336 lines, unused)
- `script.js` (dead form-handler code)
- `wesley-headshot.jpg` (the one reusable asset)
- `.planning/` artifacts

There are **no existing Astro components, layouts, pages, TypeScript files, or tests** to copy patterns from. Therefore:

- For most files (**26 of 30**), the closest analog is a **concrete code excerpt embedded in `01-RESEARCH.md`** or `01-UI-SPEC.md`. The planner should point the executor directly at those line ranges. No in-repo file teaches the pattern.
- For **1 file** (`src/styles/app.css`), the analog is a **hybrid**: theme block lifted verbatim from `01-UI-SPEC.md §Tailwind Theme Block`, with hex values cross-checked against the existing `index.html` `:root` block (lines 13–26).
- For **1 asset** (`public/wesley-headshot.jpg`), the existing file is **reused in place** — no transformation needed; Astro's `<Image />` component generates AVIF/WebP/JPEG variants at build time.
- For **2 files** (`robots.txt`, `llms.txt`), the analog is a **literal copy-paste** from `01-RESEARCH.md` with the staging URL substituted.

**Implication for the planner:** Plans reference `01-RESEARCH.md §<Section>` or `01-UI-SPEC.md §<Section>` excerpts directly rather than "see `src/components/X.astro` lines N–M." Treat the research file as the canonical analog repository.

---

## File Classification

### Configuration (project root)

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `astro.config.mjs` | config | build-time | RESEARCH.md §"Code Examples" Example 1 (lines 1322–1368) | exact (full file content provided) |
| `tsconfig.json` | config | build-time | Astro `--typescript strict` scaffold default | role-match (Astro CLI generates) |
| `package.json` | config | build-time | RESEARCH.md §"Code Examples" Example 4 (lines 1461–1477) + `npx astro add` augmentation | exact (scripts block provided) |
| `playwright.config.ts` | config | test-runner | RESEARCH.md §"Network Audit CI Gate" + Playwright docs (`[CITED: playwright.dev/docs/ci-intro]`) | role-match (no excerpt; standard pattern) |
| `vercel.json` | config | edge-runtime | RESEARCH.md §"Security Domain — Security headers" (lines 1249–1266) | exact |
| `.env.example` | config | build-time | RESEARCH.md §"Environment Variables" table (lines 1066–1077) | role-match (table → file conversion) |
| `.gitignore` | config | n/a | Astro scaffold default + `.env*` exclusion (RESEARCH.md §Security row "Stored secrets") | role-match |

### CI / Tests

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `.github/workflows/ci.yml` | ci-workflow | event-driven (PR) | RESEARCH.md §"Code Examples" Example 3 (lines 1416–1459) | exact |
| `tests/network-audit.spec.ts` | test | request-response | RESEARCH.md §"Concrete Playwright test" (lines 712–754) | exact |

### Layouts / Components (src/layouts, src/components)

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `src/layouts/BaseLayout.astro` | layout | request-response (build-time render) | RESEARCH.md §"Code Examples" Example 2 (lines 1370–1414) + UI-SPEC §Components #1 | exact (Props interface + head fragment provided) |
| `src/components/Nav.astro` | component | event-driven (drawer toggle) | RESEARCH.md §"Pattern 4: Mobile nav drawer" (lines 481–525) + UI-SPEC §Components #2 | exact (drawer JS + ARIA contract) |
| `src/components/Footer.astro` | component | static-render | UI-SPEC §Components #3 (lines 175–181) | role-match (spec only, no code excerpt) |
| `src/components/Hero.astro` | component | static-render | UI-SPEC §Components #4 (lines 184–203) — locked HTML body provided | exact (markup + token classes specified) |
| `src/components/CtaButton.astro` | component | static-render | UI-SPEC §Components #5 (lines 205–212) | role-match (visual contract; no code excerpt) |
| `src/components/Tile.astro` | component | static-render | UI-SPEC §Components #6 (lines 214–236) — variant prop + locked tile copy table | exact (props + 4-row copy table) |
| `src/components/Headshot.astro` | component | build-time (Image transform) | RESEARCH.md §"Pattern 5: Image pipeline" (lines 535–552) | exact (full `<Image />` usage) |
| `src/components/ObfuscatedMailto.astro` | component | event-driven (click reveal) | RESEARCH.md §"Mailto Obfuscation" three-layer pattern (lines 970–1007) | exact |
| `src/components/ExternalLink.astro` | component | static-render | UI-SPEC §Imagery (icon usage row) + standard `<a rel="noopener noreferrer">` | role-match (no excerpt; standard pattern) |
| `src/components/seo/BaseSEO.astro` | component | static-render | UI-SPEC §Components #7 (lines 238–256) + RESEARCH.md §"OG Image Strategy — Per-page override pattern" (lines 1041–1056) | exact (Props interface + meta tag list) |
| `src/components/seo/JsonLd.astro` | component | static-render | RESEARCH.md §"Pattern 2: BaseSEO + JsonLd" (lines 416–453) + RESEARCH.md §"JSON-LD Schemas" (lines 882–948) | exact (TS Props + 4 schema templates) |

### Pages (src/pages)

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `src/pages/index.astro` | page | static-render | UI-SPEC §Page Templates row "Home" (line 274) + UI-SPEC §Components #4 (Hero copy locked) + #6 (4-tile copy locked) | exact (all copy + structure locked) |
| `src/pages/about.astro` | page | static-render | UI-SPEC §Page Templates row "About" (line 275) + RESEARCH.md §"h-card Microformat" (lines 1133–1146) + CONTEXT.md `<specifics>` distillation guidance | exact (h-card markup + structure provided; bio/thesis copy must be authored from vault sources) |
| `src/pages/contact.astro` | page | static-render | UI-SPEC §Page Templates row "Contact" (line 279) + ObfuscatedMailto component | exact (structure locked) |
| `src/pages/colophon.astro` | page | static-render | UI-SPEC §Page Templates row "Colophon" (line 280) + CLAUDE.md stack table | role-match (structure spec; copy authored at execution) |
| `src/pages/404.astro` | page | static-render | UI-SPEC §Copywriting Contract 404 rows (lines 307–309) | exact (copy verbatim) |
| `src/pages/projects/bitcoin-bay.astro` | page | static-render | UI-SPEC §Page Templates "Project page structure" (lines 282–290) + per-project CTA mapping (D-05) | role-match (structure locked; body copy authored at execution per D-04) |
| `src/pages/projects/fbba.astro` | page | static-render | Same as bitcoin-bay | role-match |
| `src/pages/projects/ai-petros-hermes.astro` | page | static-render | Same + `consulting-url.ts` lib + AYLIP detail per CONTEXT.md `<deferred>` | role-match |

### Library / Content

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `src/lib/consulting-url.ts` | utility | build-time env read | CONTEXT.md `<specifics>` "Per-project CTA implementation note" (lines 199–201) + Astro `import.meta.env.PUBLIC_*` convention | role-match (env-var pattern is standard Astro) |
| `src/content/config.ts` | config | build-time (Zod schemas) | Astro content collections docs (`[CITED]`); empty/scaffolded for Phase 1, schemas added Phase 2 | role-match (scaffolded only) |
| `src/styles/app.css` | stylesheet | build-time (Tailwind v4 `@theme`) | UI-SPEC §"Tailwind v4 Theme Block" (lines 471–554) **VERBATIM** + cross-check vs `index.html` lines 13–26 | exact (full theme block ready to drop in) |

### Static / Public

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `public/robots.txt` | static-text | request-response | RESEARCH.md §"Robots.txt" (lines 854–876) | exact (verbatim with URL substitution) |
| `public/llms.txt` | static-text | request-response | RESEARCH.md §"Phase 1 `public/llms.txt` template" (lines 820–848) | exact (verbatim with URL substitution) |
| `public/favicon.svg` | asset | static | UI-SPEC §Imagery (favicon row, line 337) | role-match (planner-discretion design; SVG monogram or bridge glyph) |
| `public/og/default.png` | asset | static | UI-SPEC §"OG Image Template" (lines 441–454) — composition spec | role-match (asset rendered at execution per spec) |
| `public/wesley-headshot.jpg` | asset | static | **EXISTING in-repo file** — `~/projects/ctb-website/wesley-headshot.jpg` (93.5 KB, 1280×853) | **REUSE-IN-PLACE** (only true in-repo asset analog) |

---

## Pattern Assignments

### `astro.config.mjs` (config, build-time)

**Analog:** `01-RESEARCH.md` §"Code Examples — Example 1" (lines 1322–1368) — **full file provided verbatim**.

**Imports + integrations pattern:**
```javascript
import { defineConfig, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
```

**Core config block (load-bearing):**
- `site: process.env.PUBLIC_SITE_URL ?? 'https://staging.crossthebridge.io'` — drives sitemap absolute URLs, OG image absolute URLs, JSON-LD `@id` fields. Phase 3 cutover changes this env var, no code change.
- `output: 'static'` — INFRA-01 invariant.
- `adapter: vercel({ imageService: true })` — enables Vercel image API in production (Pattern 5; pitfall C).
- `vite: { plugins: [tailwindcss()] }` — Tailwind v4 the v4 way (NOT `@astrojs/tailwind`, per D-17 + CLAUDE.md anti-stack).
- `fonts: [...]` — Astro Fonts API + Fontsource provider; PRIV-01 load-bearing. Playfair Display 700, Inter Variable `'400 600'` range.

**Trade-off flag (A1 in RESEARCH.md Assumptions Log):** the variable-weight range string `'400 600'` may need to fall back to `[400, 600]` array form if Astro rejects the range syntax. Build error would be loud; planner can pivot.

---

### `src/layouts/BaseLayout.astro` (layout, request-response)

**Analog:** `01-RESEARCH.md` §"Code Examples — Example 2" (lines 1370–1414) — **full head fragment provided verbatim**, plus `01-UI-SPEC.md §Components #1` (lines 160–165) for body structure.

**Props interface (load-bearing for SEO-01 build-time validation):**
```typescript
interface Props {
  title: string;        // required — fails build if missing
  description: string;  // required — fails build if missing
  canonical: string;    // required — fails build if missing
  ogImage?: string;     // optional — defaults to /og/default.png in BaseSEO
  jsonLdSchema?: 'website' | 'person' | 'webpage' | 'breadcrumb';
  jsonLdData?: Record<string, unknown>;
}
```

**Body shell pattern** (UI-SPEC §Components #1):
```astro
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <Nav />
  <main id="main"><slot /></main>
  <Footer />
</body>
```
- Skip-link is the **first focusable element** (A11Y-02 invariant).
- `<main id="main">` matches the skip-link target.
- No header/section wrapper around `<Nav />` — the component renders its own `<nav>` landmark.

**Conditional analytics injection** (D-14 + Pitfall H):
```astro
{import.meta.env.PROD && umamiHost && umamiId && (
  <script defer src={`${umamiHost}/script.js`} data-website-id={umamiId} is:inline></script>
)}
```
- `PUBLIC_*` env var names mandatory (Astro client-bundling convention).
- `is:inline` prevents Astro from processing the script tag.
- `defer` is load-bearing for the network audit's "first paint" timing window.
- Three-way guard means no script in dev/preview, no script if env vars unset → fail-safe to "no analytics."

**Font preload (PRIV-01 + UI-SPEC §Typography note):**
```astro
<Font cssVariable="--font-display" preload />
<Font cssVariable="--font-body" preload />
```
- The `cssVariable` strings must match `astro.config.mjs` `fonts[].cssVariable` exactly.
- `preload` emits `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the LCP-critical pair.

---

### `src/components/Nav.astro` (component, event-driven drawer toggle)

**Analog:** `01-RESEARCH.md` §"Pattern 4: Mobile nav drawer" (lines 481–525) — **full ARIA + JS skeleton provided** + `01-UI-SPEC.md §Components #2` (lines 167–173) for visual + accessibility contract.

**Drawer toggle JS pattern (vanilla, ~30 lines, no framework):**
```html
<button id="nav-toggle" class="md:hidden"
        aria-label="Open navigation"
        aria-controls="mobile-nav"
        aria-expanded="false">
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
  // ...open(), click toggle, drawer link-click close, Escape close...
</script>
```

**Critical contract points:**
- `aria-expanded` flips on every toggle.
- `aria-label` flips between "Open navigation" / "Close navigation" (A11Y-02 + UI-SPEC §Copywriting Contract).
- `document.body.style.overflow = 'hidden'` on open; cleared synchronously on close (Pitfall F: race condition with link navigation — call `close()` synchronously on link click, don't rely on `unload`).
- Escape key closes (WCAG 2.2 modal-like pattern).
- Focus trap on Tab (UI-SPEC §Components #2 requires it; planner adds the wraparound listener).
- `prefers-reduced-motion: reduce` skips the slide-down animation (UI-SPEC §Motion contract).

**Top-nav routes (locked, UI-SPEC §Components #2):** Home / Projects / About / Contact / Colophon. Brand wordmark "Cross The `<span class='text-green'>Bridge</span>`" — Playfair 18px / weight 600 — links to `/`. Mirrors the existing site's wordmark pattern at `index.html` line 806 (footer) and is the single in-repo brand-shape reference.

---

### `src/components/seo/JsonLd.astro` (component, static-render)

**Analog:** `01-RESEARCH.md` §"Pattern 2: BaseSEO + JsonLd components" (lines 416–453) — **full TS-typed component provided** + §"JSON-LD Schemas" (lines 882–948) for the four canonical schema shapes.

**TypeScript type-safety pattern (load-bearing for SEO-02 build-time validation):**
```astro
---
import type { Person, WebSite, WebPage, BreadcrumbList } from 'schema-dts';

interface Props {
  schema: 'website' | 'person' | 'webpage' | 'breadcrumb';
  data?: Record<string, unknown>;
}
---
<script type="application/ld+json" set:html={JSON.stringify(json)} />
```
- `schema-dts` types fail `astro check` if Person/WebSite/etc. fields are misspelled or wrong-typed. This is the only compile-time JSON-LD validation available (Google's Rich Results Test has no public API per RESEARCH.md A11 verification — manual launch gate only).
- `set:html` directive is required to emit raw JSON (otherwise Astro escapes `<`/`>`).

**Per-route schema mapping (Phase 1, RESEARCH.md table line 457):**
- `/` → `WebSite` (with `publisher` `@id` reference to Person)
- `/about` → `Person` (sameAs array empty until Wesley supplies profile URLs)
- `/projects/{slug}` → `BreadcrumbList` + `WebPage`
- `/contact` → `WebPage`
- `/colophon` → `WebPage`

**`@id` cross-reference pattern (Pitfall G + 2026 best practice):**
```typescript
// Person on /about uses fixed @id (canonical, not staging)
'@id': 'https://crossthebridge.io/about#wesley'

// WebSite publisher references that fixed @id
publisher: { '@id': 'https://crossthebridge.io/about#wesley' }
```
- All other absolute URLs derive from `Astro.site` (configured by env var, swaps cleanly at Phase 3 cutover).
- Hardcoded `staging.crossthebridge.io` strings are forbidden anywhere except documented `@id` anchors that intentionally pin to the canonical apex.

---

### `src/components/seo/BaseSEO.astro` (component, static-render)

**Analog:** `01-UI-SPEC.md §Components #7` (lines 238–256) for the meta tag list + `01-RESEARCH.md §"OG Image Strategy — Per-page override pattern"` (lines 1041–1056) for the `Astro.site` URL absolutization pattern.

**Props + URL absolutization:**
```astro
---
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
```

**Meta tag list (UI-SPEC verbatim):**
- `<title>{title} — Cross The Bridge</title>` (homepage exception: `<title>Cross The Bridge — Wesley Pyburn</title>`)
- `<meta name="description">`, `<link rel="canonical">`, OG (title/description/url/image/type/site_name), Twitter card (summary_large_image + creator placeholder).
- Theme-color meta paired by media query: cream for light, deep ink for dark.

---

### `src/components/Tile.astro` (component, static-render)

**Analog:** `01-UI-SPEC.md §Components #6` (lines 214–236) — **full visual contract + variant prop + 4-row locked copy table provided**.

**Variant prop pattern:**
```typescript
interface Props {
  type: 'project' | 'thesis';
  label: 'PROJECT' | 'THESIS';
  title: string;
  body: string;
  href: string;
}
```
- One component, two variants. Tiles 1–3 use `type: 'project'`; tile 4 (Freedom Tech → /about) uses `type: 'thesis'`.
- Whole tile is one anchor (`<a>` wrapping the contents), `cursor: pointer`, `:focus-visible` ring matches CtaButton.

**Locked tile copy (UI-SPEC verbatim — DO NOT generate from JSON config per Anti-pattern in RESEARCH.md line 565):**

| Tile | Label | Title | Body | Routes to |
|------|-------|-------|------|-----------|
| 1 | PROJECT | Bitcoin Bay | A Tampa Bay community for people stacking sats and showing up. | `/projects/bitcoin-bay` |
| 2 | PROJECT | FBBA | Florida Bitcoin & Blockchain Association — peers, policy, and a real Florida Bitcoin scene. | `/projects/fbba` |
| 3 | PROJECT | AI / Petros / Hermes | The sovereign-stack AI work: Hermes the agent, Petros the foundation, AYLIP the vision. | `/projects/ai-petros-hermes` |
| 4 | THESIS | Freedom Tech | Why I'm building all of this — the thesis underneath the projects. | `/about` |

---

### `src/components/Hero.astro` (component, static-render)

**Analog:** `01-UI-SPEC.md §Components #4` (lines 184–203) — **HTML body locked verbatim from D-01**.

**Locked markup (DO NOT mutate copy):**
```astro
<h1>What does it look like to opt out — without going off-grid?</h1>
<p>Cross The Bridge is the answer I'm building.</p>
<p>Bitcoin instead of banks. Self-hosted compute instead of surveillance Cloud. AI you own, not AI that owns you.</p>
<a class="cta-primary" href="/contact">Get in touch</a>
```

**Typography contract (UI-SPEC §Typography + §Components #4):**
- H1: `text-display` (Playfair, `clamp(2.25rem, 5.5vw + 1rem, 3.5rem)`, weight 700, line-height 1.10–1.15).
- First `<p>`: `text-body` weight 600 (Inter 18px / 600 / 1.5).
- Second `<p>`: `text-body` weight 400 (Inter 18px / 400 / 1.6).
- Spacing: H1 → first `<p>` is `--space-xl` (32px); paragraph → paragraph is `--space-lg` (24px).

**Background gradient pattern (homepage hero only, UI-SPEC §Components #4):**
- Mirrors existing site's layered radial-gradient aesthetic — but simplified: base linear-gradient + ONE subtle radial-green at bottom-center (opacity ≤ 0.12) + ONE subtle radial-gold at bottom-right (opacity ≤ 0.10).
- Existing site `index.html` lines 50–80 (rough range) has the original layered hero gradient — reusable as **stylistic reference only**, not as code import.

**Constraints (load-bearing):**
- NO eyebrow line (D-02 — removed "Tampa Bay's …").
- NO hero portrait (D-09 — homepage stays text-forward).
- Single CTA: "Get in touch" → `/contact`.

---

### `src/components/CtaButton.astro` (component, static-render)

**Analog:** `01-UI-SPEC.md §Components #5` (lines 205–212) — visual contract only (no code excerpt; the planner authors the markup against the contract).

**Visual contract:**
- Background `--color-green`, text `--color-cream`.
- Padding: `--space-md` vertical / `--space-lg` horizontal (16px / 24px) — clears 44px touch-target (48px total height).
- Border-radius 6px. Inter 16px / weight 600 / line-height 1.0 / letter-spacing 0.01em.

**Hover/focus/active (UI-SPEC + §Motion):**
- Hover: `--color-green-dark` background, 200ms ease-out.
- Focus: `outline: 2px solid var(--color-green); outline-offset: 3px;` + `box-shadow: 0 0 0 4px var(--color-gold-light)` (gold's earned use).
- Active: `transform: translateY(1px)` (skip if `prefers-reduced-motion: reduce`).
- Mobile <480px: `display: block; width: 100%;`.

**Phase 1 has only `primary` variant** (no `secondary`, no `destructive` — UI-SPEC explicit).

---

### `src/components/Headshot.astro` (component, build-time Image transform)

**Analog:** `01-RESEARCH.md §"Pattern 5: Image pipeline"` (lines 535–552) — **full `<Image />` usage provided**.

**Pattern:**
```astro
---
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

- `widths` set matches UI-SPEC §Imagery (line 335).
- `loading="lazy"` per D-09.
- Alt text locked verbatim per UI-SPEC §Imagery + §Accessibility Contract.
- `imageService: true` in `astro.config.mjs` adapter delegates production transforms to Vercel image API (Pattern 5).

---

### `src/components/ObfuscatedMailto.astro` (component, event-driven click reveal)

**Analog:** `01-RESEARCH.md §"Mailto Obfuscation"` three-layer pattern (lines 970–1007) — **full pattern provided**.

**Three-layer contract (D-13):**
1. **Visible display variant** (always rendered, JS-free, screen-reader-safe): `wesley[at]crossthebridge[dot]io`.
2. **JS-reconstructed mailto button** (`data-u`/`data-d` attributes; click handler reconstructs `mailto:` URL via base64 decode + concatenation):
```html
<a id="contact-cta" href="#" class="cta-primary"
   data-u="wesley" data-d="Y3Jvc3N0aGVicmlkZ2UuaW8=">
  Email Wesley
</a>
<script>
  const a = document.getElementById('contact-cta');
  a.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `mailto:${a.dataset.u}@${atob(a.dataset.d)}`;
  });
</script>
```
3. **`<noscript>` fallback** for JS-disabled visitors.

**Invariant:** No plaintext `wesley@crossthebridge.io` string anywhere in rendered HTML. The base64 string `Y3Jvc3N0aGVicmlkZ2UuaW8=` decodes to `crossthebridge.io` and is the deliberately-weak encoding step.

---

### `src/lib/consulting-url.ts` (utility, build-time env read)

**Analog:** `01-CONTEXT.md §<specifics>` "Per-project CTA implementation note" (lines 199–201) + Astro `import.meta.env.PUBLIC_*` standard convention.

**Pattern:**
```typescript
// src/lib/consulting-url.ts
export const consultingUrl = import.meta.env.PUBLIC_CONSULTING_URL ?? '/consulting';
```
- Phase 1 staging Vercel env: `PUBLIC_CONSULTING_URL=https://crossthebridge.io` (apex still serves old single-page consulting site).
- Phase 3 cutover: unset the env var → falls back to `/consulting` (the new in-repo route).
- **No code change at cutover** — config-only switch (D-05 / `<specifics>`).

**Note on `PUBLIC_*` prefix:** non-public env vars are server-only (Pitfall H); since Phase 1 is `output: 'static'`, "server-only" = "build-time only," but the `PUBLIC_` prefix makes the intent explicit and survives any future SSR migration.

---

### `src/styles/app.css` (stylesheet, build-time Tailwind v4 `@theme`)

**Analog:** `01-UI-SPEC.md §"Tailwind v4 Theme Block (planner-ready)"` (lines 471–554) — **full `@theme` block provided VERBATIM, ready to drop in**.

**Cross-reference for hex values:** Existing `index.html` lines 13–26 declare the original cream/charcoal/green/gold palette:
```css
:root {
  --cream:        #F7F3EC;
  --cream-card:   #EDE8DE;
  --cream-border: #DDD5C4;
  --charcoal:     #1C1A16;
  --charcoal-mid: #3A3730;
  --muted:        #7A7060;     /* ← TIGHTENED in UI-SPEC to #6A6050 for AA-body */
  --green:        #2D4A3E;
  --green-dark:   #1A2E28;
  --green-light:  #3D6254;
  --gold:         #C8A96E;
  --gold-light:   #E2C98A;
  --white:        #FDFAF5;
}
```
- 11 of 12 values carry forward unchanged.
- **`--muted` is the one surgical fix** (UI-SPEC §Color note): `#7A7060` (4.40:1 — failed AA-body) → `#6A6050` (5.58:1 — passes AA-body).
- Dark-mode set is new (no in-repo analog) — fully specified in UI-SPEC §Color "Dark Mode" table and §Tailwind Theme Block dark override.

**Implementation choice (Open Question #2 in RESEARCH.md):** `@media (prefers-color-scheme: dark) { :root { ... } }` override pattern recommended over `light-dark()` CSS function for broader baseline-browser support.

---

### `src/pages/index.astro` (page, static-render)

**Analog:** `01-UI-SPEC.md §Page Templates` row "Home" (line 274) + Hero component (locked copy) + Tile component (locked 4-row copy table).

**Structure (locked):**
```astro
<BaseLayout title="Cross The Bridge — Wesley Pyburn"
            description="..." canonical="/" jsonLdSchema="website">
  <Hero />
  <section class="tile-grid">
    <Tile type="project" label="PROJECT" title="Bitcoin Bay" body="..." href="/projects/bitcoin-bay" />
    <Tile type="project" label="PROJECT" title="FBBA" body="..." href="/projects/fbba" />
    <Tile type="project" label="PROJECT" title="AI / Petros / Hermes" body="..." href="/projects/ai-petros-hermes" />
    <Tile type="thesis" label="THESIS" title="Freedom Tech" body="..." href="/about" />
  </section>
  <!-- Phase 2 placeholder: <section id="recent-writing" hidden></section> per D-07 -->
</BaseLayout>
```

**Constraints:** Title format is the homepage exception (`Cross The Bridge — Wesley Pyburn`, not `<page> — Cross The Bridge`). Reserved empty `<section id="recent-writing">` block keeps the future Phase 2 wire-in trivial (D-07).

---

### `src/pages/about.astro` (page, static-render)

**Analog:** `01-UI-SPEC.md §Page Templates` row "About" (line 275) + `01-RESEARCH.md §"h-card Microformat"` (lines 1133–1146).

**h-card pattern (SEO-06 Phase-1 hedge — RESEARCH.md recommendation):**
```html
<article class="h-card">
  <img class="u-photo" src="/wesley-headshot.jpg" alt="Wesley Pyburn — founder of Cross The Bridge" />
  <h1 class="p-name">Wesley Pyburn</h1>
  <p class="p-job-title">Founder, <a class="u-url" href="https://crossthebridge.io">Cross The Bridge</a></p>
  <!-- thesis section + bio section here -->
</article>
```

**Page structure (D-08, UI-SPEC line 275):**
- One H1: "About Wesley".
- Two H2s: "The Thesis: Cross The Bridge" (first — the WHY) → "About Me" (second — the WHO).
- Headshot floats right at ≥768px (max-width 280px); full-width above bio at <768px.
- `JsonLd` props: `schema="person"`.

**Copy authoring sources (CONTEXT.md `<specifics>` lines 204–207):**
- **Thesis section (~200 words):** distill from `~/.hermes/vault/projects/petros/petros-polaris.md` Page 1 (Money/Data/Infrastructure pillars). Lead with brand line "Cross the bridge from the Old World to the New" — once. Skip Page 2 (AYLIP belongs on AI/Petros project page).
- **Bio section (~250 words):** pull from `~/.hermes/vault/people/About Me.md` — first-person, sections "My Style," "How I Work," "What I'm Building." Skip "My ideal assistant" (irrelevant to public).
- **Voice contract (UI-SPEC §Copywriting):** No "Beast System," no "Great Bifurcation," no "Mystery Babylon" — those stay in the vault.

---

### `src/pages/projects/{bitcoin-bay,fbba,ai-petros-hermes}.astro` (3 pages, static-render)

**Analog:** `01-UI-SPEC.md §Page Templates` "Project page structure" (lines 282–290) + per-project CTA mapping (D-05).

**Shared structural pattern:**
```astro
<BaseLayout title="..." description="..." canonical="..." jsonLdSchema="breadcrumb" jsonLdData={...}>
  <article>
    <p class="eyebrow">PROJECT</p>
    <h1>{project name}</h1>
    <p class="subtitle">{one-sentence positioning}</p>
    <div class="prose">
      <!-- H2 sections: "What it is" / "Why it exists" / "Current state" / "How to engage" -->
    </div>
    <section class="engagement-cta">
      <!-- per-project CTA per D-05 -->
    </section>
  </article>
</BaseLayout>
```

**Per-project CTA contract (D-05 + UI-SPEC §Page Templates):**
| Page | CTA mechanism | URL source |
|------|---------------|-----------|
| `bitcoin-bay.astro` | "Join the Bitcoin Bay events list" — email signup placeholder | TBD URL or "Coming soon" copy + flag for Wesley |
| `fbba.astro` | "Visit the FBBA site →" — external link with `lucide:external-link` icon | TBD URL provided at execution |
| `ai-petros-hermes.astro` | "Hire me for AI implementation work →" — external link | `consultingUrl` from `src/lib/consulting-url.ts` (env-driven) |

**Body copy:** Mixed depth per project (D-04). AI/Petros/Hermes likely deepest (AYLIP detail belongs here, per CONTEXT.md `<deferred>`). BB/FBBA tighter — community-action pages, not portfolios. Author at execution; no pattern dictates word counts.

---

### `src/pages/contact.astro` (page, static-render)

**Analog:** `01-UI-SPEC.md §Page Templates` row "Contact" (line 279) + ObfuscatedMailto component spec.

**Structure (locked):**
- One H1: "Contact".
- One paragraph explaining welcomed inbound (peer reach-outs, podcast invites, partnership conversations).
- `<ObfuscatedMailto />` component renders the three-layer pattern.
- Optional fallback line: "Prefer a different channel? Find me on…" — Wesley fills at execution if alternative channels exist.
- NO form (D-13 invariant).

---

### `src/pages/colophon.astro` (page, static-render)

**Analog:** `01-UI-SPEC.md §Page Templates` row "Colophon" (line 280) + CLAUDE.md "Recommended Stack" tables for source-of-truth content.

**Structure:**
- H1 + section table documenting the stack: Astro 6, Tailwind v4 (via `@tailwindcss/vite`), Vercel static deploy, self-hosted fonts via Astro Fonts API + Fontsource (Playfair 700 + Inter Variable 400/600), self-hosted Umami analytics (or "no analytics yet — Umami pending" if not wired at launch), `@astrojs/sitemap`, `@astrojs/mdx` (enabled, unused in Phase 1).
- Tracking-stance prose: NO Google domains, NO GA, NO third-party iframes on first paint, NO cookies (verify against Umami's actual default config when hosting target chosen).
- Reuses Tailwind theme tokens to render the stack table — no decorative imagery, just typographic hierarchy.

---

### `src/pages/404.astro` (page, static-render)

**Analog:** `01-UI-SPEC.md §Copywriting Contract` 404 rows (lines 307–309) — **all copy locked verbatim**.

**Locked copy:**
- Heading: **This page doesn't exist — yet**
- Body: **The link you followed leads nowhere on this site. Try the [homepage](/), the [About page](/about), or [get in touch](/contact) if something used to be here.**
- Meta-line (small, muted): **No 404s in inbound essays — that's the contract.**

---

### `public/robots.txt` (static-text)

**Analog:** `01-RESEARCH.md §"Robots.txt"` (lines 854–876) — **verbatim**, with `Sitemap:` URL set to `https://staging.crossthebridge.io/sitemap-index.xml`. Phase 3 cutover swaps to apex.

**Pattern includes explicit allow for tier-1 AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Google-Extended) — Wesley wants AI assistants citing his work (CONTEXT.md core value: inbound).

---

### `public/llms.txt` (static-text)

**Analog:** `01-RESEARCH.md §"Phase 1 public/llms.txt template"` (lines 820–848) — **verbatim**, with absolute URLs scoped to `staging.crossthebridge.io`.

**Format (per [llmstxt.org](https://llmstxt.org/) spec):**
1. `# Cross The Bridge` — H1 site name.
2. `> ...` — blockquote summary (~3 sentences).
3. Plain markdown context paragraph.
4. `## Identity` (About / Contact / Colophon links).
5. `## Projects` (3 project page links).
6. `## Feeds` (sitemap link).

**Phase 2 augmentation:** Add `## Writing` section pointing to essays + notes + RSS once those collections exist. **Do NOT ship empty Writing section in Phase 1** (worse than absent).

---

### `vercel.json` (config, edge-runtime)

**Analog:** `01-RESEARCH.md §"Security Domain — Security headers"` (lines 1249–1266) — **verbatim**.

**Headers (load-bearing for security baseline):**
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

**CSP deferred to follow-up plan task** (RESEARCH.md Open Question #8) — Astro 6 native CSP API is the safe path; hand-written CSP risks breaking the mailto-reveal and mobile-nav inline scripts.

---

### `.github/workflows/ci.yml` (ci-workflow, event-driven)

**Analog:** `01-RESEARCH.md §"Code Examples — Example 3"` (lines 1416–1459) — **full workflow provided verbatim**.

**Two-job pattern:**
1. `build` — `actions/checkout` → `setup-node@22` → `npm ci` → `npx astro check` → `npx astro build`.
2. `network-audit` — depends on `build`; uses `patrickedqvist/wait-for-vercel-preview@v1.3.1` to capture the Vercel preview URL, then runs `npx playwright test` against it.

**Critical:** the network audit MUST run against the Vercel preview URL, not localhost (Pitfall E: local dev doesn't faithfully reproduce production HTML).

---

### `tests/network-audit.spec.ts` (test, request-response assertion)

**Analog:** `01-RESEARCH.md §"Concrete Playwright test"` (lines 712–754) — **full test file provided verbatim**.

**Banned-host list** (UI-SPEC + RESEARCH.md):
```typescript
const BANNED_HOSTS = [
  'fonts.googleapis.com', 'fonts.gstatic.com',
  'google-analytics.com', 'googletagmanager.com',
  'youtube.com', 'youtu.be',
  'twitter.com', 'x.com',
  'usemotion.com',
  // Augment per Pitfall A:
  'va.vercel-scripts.com', 'vitals.vercel-insights.com',
];
```

**Allow-list:** own origin + (optionally) `process.env.PUBLIC_UMAMI_HOST` if Umami is wired.

**Routes asserted (all 7 Phase 1 pages):** `/`, `/about`, `/contact`, `/colophon`, `/projects/bitcoin-bay`, `/projects/fbba`, `/projects/ai-petros-hermes`.

**Hostname-suffix matching:** `host === b || host.endsWith('.' + b)` so `*.fonts.gstatic.com` is also caught.

**Reporter posture (RESEARCH.md Open Question #9):** report-all (don't bail on first violation) so PRs surface ALL banned hosts in one run.

---

## Shared Patterns

These are cross-cutting concerns that touch multiple files. Apply consistently.

### Shared Pattern A: Self-hosted fonts (PRIV-01 invariant)

**Source:** `01-RESEARCH.md §"Pattern 1: Self-hosted fonts via Astro Fonts API"` (lines 339–406).

**Apply to:**
- `astro.config.mjs` — `fonts: [...]` block declaring Playfair Display + Inter Variable via `fontProviders.fontsource()`.
- `src/layouts/BaseLayout.astro` — `<Font cssVariable="--font-display" preload />` + `<Font cssVariable="--font-body" preload />` in `<head>`.
- `src/styles/app.css` — `@theme` references `--font-display` / `--font-body` CSS variables.

**Invariant:** ZERO requests to `fonts.googleapis.com` or `fonts.gstatic.com` on first paint of any page (network-audit CI gate enforces).

**Pitfall guard (Pitfall B):** No `<link rel="preconnect" href="https://fonts.googleapis.com">` anywhere — common Astro starter inertia, must be scrubbed.

**Pitfall guard (Pitfall D):** After `astro build`, view source and confirm `<link rel="preload" as="font" type="font/woff2">` points to a `/_astro/` path on the same origin. If pointed elsewhere, font isn't being self-hosted.

---

### Shared Pattern B: Conditional analytics injection (D-14)

**Source:** `01-RESEARCH.md §"Wiring into Astro"` (lines 645–665) + `01-UI-SPEC.md §"Analytics: Self-Hosted Umami"` (lines 422–435).

**Apply to:** `src/layouts/BaseLayout.astro` only (single point of injection per D-18 layout firewall).

```astro
{import.meta.env.PROD && umamiHost && umamiId && (
  <script defer src={`${umamiHost}/script.js`} data-website-id={umamiId} is:inline></script>
)}
```

**Three-way guard semantics:**
- `import.meta.env.PROD` — no script in dev/preview.
- `umamiHost && umamiId` — no script if env vars unset.
- → Result: fail-safe to "no analytics" if Umami isn't wired yet.

**Env var names locked (Pitfall H):** `PUBLIC_UMAMI_HOST`, `PUBLIC_UMAMI_WEBSITE_ID`. Without `PUBLIC_` prefix, `import.meta.env` returns undefined in client bundle.

---

### Shared Pattern C: SEO + JsonLd in every layout (SEO-01, SEO-02)

**Source:** `01-UI-SPEC.md §Components #7 + #8` (lines 238–266) + `01-RESEARCH.md §"Pattern 2"` (lines 408–453).

**Apply to:** Every `src/pages/*.astro` file.

**Contract:** Every page passes `title`, `description`, `canonical` props to `BaseLayout`. Build fails if any are missing (UI-SPEC §Components #7 "Validation"). Every page also passes a `jsonLdSchema` value (one of `website | person | webpage | breadcrumb`) — defaults to `webpage` if omitted.

---

### Shared Pattern D: Color discipline (UI-SPEC §Color "load-bearing")

**Source:** `01-UI-SPEC.md §Color` (lines 87–153) + `§Tailwind Theme Block` (lines 471–554).

**Apply to:** All `.astro` components that render visible elements.

**Rules:**
- NO hard-coded hex values anywhere in component code. All colors flow through `var(--color-*)` tokens or Tailwind utility classes that map to those tokens.
- Green is reserved for: hero CTA bg, inline body links, brand wordmark `<span>`, focus rings, About-page H2 markers, RSS icon (Phase 2). Six uses, exhaustively listed.
- Gold is decorative-only: hero ornament, About H1 divider, focus-ring outer glow. NEVER text or icons.
- 60% cream / 30% cream-card / 10% green visual ratio holds across all pages.

---

### Shared Pattern E: `prefers-reduced-motion` + `prefers-color-scheme` (A11Y-02, A11Y-03)

**Source:** `01-UI-SPEC.md §Motion / Interaction Contract` (lines 351–372) + `§Color Dark Mode` (lines 132–151).

**Apply to:** All components with hover transitions or color-mode-aware surfaces (Hero, Tile, CtaButton, Nav drawer, BaseLayout body).

**Rules:**
- All transitions (≤300ms) wrapped in `@media (prefers-reduced-motion: no-preference)` blocks.
- Both light + dark token sets defined; dark via `@media (prefers-color-scheme: dark) { :root { ... } }` override pattern (RESEARCH.md Open Question #2 recommendation).
- NO manual light/dark toggle in Phase 1 (D-10 invariant; deferred per CONTEXT.md `<deferred>`).

---

### Shared Pattern F: Absolute URL templating via `Astro.site` (Pitfall G)

**Source:** `01-RESEARCH.md §"Pitfall G"` (lines 1202–1206) + `§"OG Image Strategy — Per-page override pattern"` (lines 1041–1056).

**Apply to:** `BaseSEO.astro` (canonical, og:url, og:image), `JsonLd.astro` (all `url`/`item`/`image` fields), `public/llms.txt` (build-time substitution OR static with documented post-cutover edit), `public/robots.txt` (Sitemap: line).

**Rule:** Hardcoded `staging.crossthebridge.io` strings forbidden in component code. All absolute URLs derive from `Astro.site` (config field set from `PUBLIC_SITE_URL` env var). Phase 3 cutover changes the env var → all schemas + meta tags + sitemap update with no code change.

**Documented exception:** `JsonLd.astro` Person `@id` pins to canonical apex `https://crossthebridge.io/about#wesley` even from staging — this is intentional graph-stable identity (RESEARCH.md line 433).

---

### Shared Pattern G: Read-only env access (Astro `import.meta.env.PUBLIC_*`)

**Source:** `01-RESEARCH.md §"Environment Variables"` (lines 1066–1077) + `§"Pitfall H"` (lines 1208–1212).

**Apply to:** `astro.config.mjs` (server-side, can read non-public), `BaseLayout.astro` (Umami host/id — must be `PUBLIC_*`), `consulting-url.ts` (must be `PUBLIC_*`).

**Rule:** Any env var referenced in code that ships to the client (or to client-bundled `.astro` frontmatter that emits HTML attributes) MUST use the `PUBLIC_` prefix. Server-only env vars (no Phase 1 use case) drop the prefix.

**`.env.example` (committed, no secrets) declares all four:**
```
PUBLIC_SITE_URL=https://staging.crossthebridge.io
PUBLIC_UMAMI_HOST=
PUBLIC_UMAMI_WEBSITE_ID=
PUBLIC_CONSULTING_URL=https://crossthebridge.io
```

---

## No Analog Found (Pure From-Scratch)

The following files have **no in-repo analog AND no concrete code excerpt in RESEARCH.md** — the planner relies on UI-SPEC visual contracts + standard framework conventions. Executor authors against the contract, not against a pre-existing pattern.

| File | Role | Why no analog |
|------|------|---------------|
| `src/components/Footer.astro` | component | UI-SPEC §Components #3 specifies layout (3-column grid, brand wordmark, footer nav links, copyright line) but no code excerpt. Standard Astro component pattern; planner authors directly. |
| `src/components/CtaButton.astro` | component | UI-SPEC §Components #5 specifies all visual properties (padding, border-radius, hover/focus/active states); no code excerpt. ~30 lines of `.astro` against the contract. |
| `src/components/ExternalLink.astro` | component | UI-SPEC §Imagery names the icon (`lucide:external-link`) and standard `rel="noopener noreferrer"` is universal. ~10 lines of `.astro`; no excerpt needed. |
| `src/content/config.ts` | config | Phase 1 scaffolds an empty content config. Phase 2 layers essay/note schemas on. No excerpt needed; the file may be a single-line `export const collections = {};`. |
| `playwright.config.ts` | config | Standard Playwright config; `playwright.dev/docs/ci-intro` is the canonical reference. Planner authors. |
| `tsconfig.json` | config | Astro CLI generates with `--typescript strict`. No authored content. |
| `.gitignore` | config | Astro scaffold default + add `.env*`, `.vercel`, `dist/`, `node_modules/`, `playwright-report/`. |
| `public/favicon.svg` | asset | UI-SPEC line 337 — planner-discretion design. CTB monogram OR bridge-arch glyph; SVG; <2 KB. |
| `public/og/default.png` | asset | UI-SPEC §"OG Image Template" (lines 441–454) specifies composition; rendered once via Playwright + HTML template (RESEARCH.md Open Question #6). One-time author task. |

---

## Metadata

**Analog search scope:**
- Existing repo: `~/projects/ctb-website/` (1 HTML, 1 CSS, 1 JS, 1 JPG — none usable as code analogs).
- Research excerpts: `01-RESEARCH.md` (1640 lines, ~14 concrete code excerpts mined).
- UI-SPEC excerpts: `01-UI-SPEC.md` (582 lines, 8 component specs + theme block + copy locks).
- Project instructions: `./CLAUDE.md` (locked stack, anti-stack list).

**Files scanned:** 5 in-repo files (read in full or relevant ranges) + 3 planning artifacts (read in full or relevant ranges).

**Pattern extraction date:** 2026-04-26.

**Planner-side note:** Because this is a from-scratch phase, plan action sections should reference excerpts by `01-RESEARCH.md §<Section>` lines `N–M` or `01-UI-SPEC.md §<Section>` lines `N–M`. There are no `src/<file>.ts` lines `N–M` analogs to point at — those will exist only after Phase 1 ships. Future phases (2 / 3) will be able to point at Phase 1 files as in-repo analogs.
