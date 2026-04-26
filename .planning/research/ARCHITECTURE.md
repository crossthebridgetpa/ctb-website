# Architecture Research

**Domain:** Personal portfolio site with multiple project areas + on-site writing + consulting subsection
**Researched:** 2026-04-25
**Confidence:** HIGH

## Executive Posture

This is **not a marketing site, not a blog, not a digital garden** in isolation — it's all three braided together. The dominant pattern across high-signal personal sites (Maggie Appleton, Stephan Ango, Brian Lovin, Robin Sloan, Patrick Collison) is a **content-collection-driven hub** where the homepage acts as a *curated lobby* and deeper pages fan out by content type (essays, notes, projects, consulting). Wesley's case adds two twists: (1) a paid-services subsection with conversion-CTA needs that must NOT contaminate the personal surface, and (2) four distinct project areas with different audiences (Bitcoin Bay = local community, FBBA = peers/industry, Petros/Hermes = builder peers, CTB = SMB clients). The architecture must let each project area breathe in its own page while keeping the homepage scannable.

**Core decision:** subpath (`crossthebridge.io/consulting/...`) over subdomain. Reasoning in §Subpath vs Subdomain.

## Standard Architecture (recommended)

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                           │
│                  (Astro pages + components)                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ Homepage │  │ Projects │  │  Writing │  │  Consulting  │   │
│  │  (lobby) │  │   hub    │  │   hub    │  │   subsite    │   │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘  └──────┬───────┘   │
│        │             │             │              │            │
│        ▼             ▼             ▼              ▼            │
│  ┌───────────────────────────────────────────────────────┐    │
│  │          Shared Layout / Nav / Footer (Astro)          │    │
│  │  (separate variant for /consulting — different CTA)    │    │
│  └───────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                     CONTENT LAYER                                │
│                (Astro Content Collections)                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ projects │  │  essays  │  │  notes   │  │  consulting  │   │
│  │ (4 docs) │  │  (long)  │  │ (short)  │  │ (services,   │   │
│  │          │  │          │  │          │  │  case-studies│   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│       │             │             │               │            │
│       └─────────────┴─────────────┴───────────────┘            │
│                            │                                    │
│                            ▼                                    │
│              ┌───────────────────────────┐                      │
│              │   Cross-link resolver     │                      │
│              │ (tags, related, mentions) │                      │
│              └───────────────────────────┘                      │
├─────────────────────────────────────────────────────────────────┤
│                     SOURCE LAYER                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Markdown / MDX files in src/content/<collection>/       │   │
│  │  Frontmatter: title, slug, date, tags, status, related   │   │
│  └──────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                     EDGE / OUTPUT                                │
│   Static HTML  →  Vercel  →  CDN  →  RSS  →  Sitemap  →  llms.txt│
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Implementation |
|-----------|----------------|----------------|
| **Homepage (`/`)** | Lobby. Hero (worldview + identity), 3-4 selected projects, recent writing, contact path. Does NOT sell consulting. | Astro page, hand-curated sections pulling latest from each collection |
| **About (`/about`)** | Long-form identity. Distilled from Polaris doctrine + About Me. Tonally calmer than homepage. | Astro page, mostly static MDX |
| **Projects hub (`/projects`)** | Index of the four project areas. Card grid with one-liner each. | Astro page using `getCollection('projects')` |
| **Project page (`/projects/[slug]`)** | Per-project: what it is, why it exists, current state, links out, related writing. Long, narrative, case-study tone. | Dynamic route from `projects` collection |
| **Writing hub (`/writing`)** | Combined index: essays + notes, filterable by tag and type. Reverse-chronological default. | Astro page combining both collections |
| **Essay (`/essays/[slug]`)** | Long-form, dated, "published" feel. Author byline, reading time, related projects/notes at footer. | Dynamic route from `essays` collection |
| **Note (`/notes/[slug]`)** | Short-form, "still growing" feel. Status badge (seedling / budding / evergreen), last-updated date, no reading time. | Dynamic route from `notes` collection |
| **Topic page (`/topics/[tag]`)** | Tag-filtered index across essays + notes + projects. | Dynamic route, generated from union of tags |
| **Consulting hub (`/consulting`)** | Marketing landing. Hero, services, pricing, social proof, Motion booking CTA. **Visually distinct layout** from personal surface. | Astro page with `consulting-layout.astro` |
| **Consulting service pages (`/consulting/[slug]`)** | Per-offer: $499 audit, $1500+$250, $3000+$500. Each with FAQ, what's included, booking CTA. | Dynamic route from `consulting` collection |
| **Now (`/now`)** | What Wesley is currently working on. Updated quarterly-ish. Member of `nownownow.com` directory. | Single MDX file or short collection |
| **Contact (`/contact`)** | Email, social, form (privacy-respecting), Signal/Nostr if applicable. | Astro page, no JS-heavy form library |
| **RSS feeds** | `/rss.xml` (everything), `/essays/rss.xml`, `/notes/rss.xml`. | `@astrojs/rss` |
| **Sitemap** | Auto-generated, segmented by collection. | `@astrojs/sitemap` |
| **`llms.txt`** | Surface site structure to LLM crawlers (cite-friendly). | Static file at root |

## Recommended Project Structure

```
ctb-website/
├── astro.config.mjs              # @astrojs/sitemap, @astrojs/rss, @astrojs/mdx
├── src/
│   ├── content/
│   │   ├── config.ts             # Zod schemas for all collections
│   │   ├── projects/             # 4 docs to start
│   │   │   ├── bitcoin-bay.md
│   │   │   ├── fbba.md
│   │   │   ├── freedom-tech-consulting.md
│   │   │   └── petros-hermes.md
│   │   ├── essays/               # long-form, dated, "published"
│   │   │   └── *.md (or .mdx if any embeds needed)
│   │   ├── notes/                # short-form, status badge
│   │   │   └── *.md
│   │   └── consulting/           # services + case studies
│   │       ├── audit-499.md
│   │       ├── starter-1500.md
│   │       ├── full-3000.md
│   │       └── case-studies/
│   ├── pages/
│   │   ├── index.astro           # homepage / lobby
│   │   ├── about.astro
│   │   ├── now.astro
│   │   ├── contact.astro
│   │   ├── rss.xml.ts            # combined RSS
│   │   ├── projects/
│   │   │   ├── index.astro       # /projects hub
│   │   │   └── [slug].astro      # /projects/bitcoin-bay
│   │   ├── essays/
│   │   │   ├── index.astro       # /essays archive
│   │   │   ├── [slug].astro
│   │   │   └── rss.xml.ts
│   │   ├── notes/
│   │   │   ├── index.astro
│   │   │   ├── [slug].astro
│   │   │   └── rss.xml.ts
│   │   ├── writing/
│   │   │   └── index.astro       # combined essays+notes hub
│   │   ├── topics/
│   │   │   └── [tag].astro       # /topics/bitcoin
│   │   └── consulting/
│   │       ├── index.astro       # /consulting hub
│   │       └── [slug].astro      # /consulting/audit
│   ├── layouts/
│   │   ├── BaseLayout.astro      # personal surface
│   │   ├── ConsultingLayout.astro # marketing surface (different nav, CTA)
│   │   ├── EssayLayout.astro     # reading-optimized
│   │   ├── NoteLayout.astro      # status-aware
│   │   └── ProjectLayout.astro   # case-study format
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── ConsultingNav.astro
│   │   ├── ProjectCard.astro
│   │   ├── WritingItem.astro
│   │   ├── StatusBadge.astro     # seedling/budding/evergreen
│   │   ├── RelatedContent.astro  # cross-collection linker
│   │   ├── BookingCTA.astro      # Motion link
│   │   └── seo/
│   │       ├── BaseSEO.astro     # OG, canonical, twitter
│   │       └── JsonLd.astro      # Person, Article, Organization
│   ├── lib/
│   │   ├── relations.ts          # cross-collection link resolver
│   │   ├── tags.ts               # tag aggregation across collections
│   │   └── reading-time.ts
│   └── styles/
│       ├── global.css
│       └── tokens.css            # design tokens (cream/charcoal/green/gold or successor)
├── public/
│   ├── robots.txt
│   ├── llms.txt
│   ├── favicon.svg
│   └── og/                       # OG images per page
└── package.json
```

### Structure Rationale

- **`src/content/` over `src/pages/[slug].md`:** Astro Content Collections give Zod schema validation, TypeScript types, `getCollection()` queries, and clean separation between data and presentation. This is the canonical pattern in 2026 and what every multi-section Astro site uses.
- **Separate collections for `essays` vs `notes`:** different schemas (notes have `status`, essays have `published`), different layouts, different RSS feeds, different reader intent. Combining them into one collection forces the same schema and obscures the seedling-vs-evergreen distinction Wesley wants.
- **`consulting/` as a content collection, not raw pages:** future-proofs adding more service tiers and case studies without touching layout code.
- **`/writing` hub in addition to `/essays` and `/notes` indexes:** gives readers a single chronological feed (the way most arrive) while preserving the conceptual split for those who care.
- **Two layouts (`BaseLayout` + `ConsultingLayout`):** firewall between personal surface and conversion surface. Same domain, same design tokens, but distinct nav (`Home / Projects / Writing / About` vs `Services / Case Studies / Book a Call`) and distinct footer CTAs. This is the IA solution to "clients shouldn't feel lost in worldview, peers shouldn't feel sold-to."
- **`lib/relations.ts`:** small module that resolves `related: [...]` frontmatter arrays into typed cross-collection references. Powers "this essay mentions Bitcoin Bay" and "projects referenced in writing." Avoids the heavier "automatic backlinks" approach (regex-scanning markdown bodies) for v1 — opt-in via frontmatter is simpler and predictable.

## Architectural Patterns

### Pattern 1: Content-Collection Hub with Curated Homepage

**What:** Homepage isn't a chronological feed and isn't a static brochure — it's a hand-curated lobby that pulls 1-3 latest items from each collection. The full archive lives at hub pages (`/projects`, `/writing`).

**When:** Sites with multiple content types where the owner wants editorial control over what new visitors see first.

**Trade-offs:**
- **Pro:** Visitor sees a coherent identity in 5 seconds; recent good work surfaces without burying older anchor pieces.
- **Pro:** Each collection grows independently without homepage churn.
- **Con:** Homepage requires occasional manual curation (mitigated: pull "latest 3 essays" + "latest 3 notes" + "selected projects" via `getCollection().slice(0,3)` and override only the selected-projects list manually).

**Example (homepage data fetch):**
```typescript
// src/pages/index.astro
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects'))
  .filter(p => p.data.featured)        // editorial control
  .sort((a, b) => a.data.order - b.data.order);

const recentEssays = (await getCollection('essays'))
  .filter(e => e.data.published)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);

const recentNotes = (await getCollection('notes'))
  .sort((a, b) => b.data.updated.valueOf() - a.data.updated.valueOf())
  .slice(0, 5);
```

### Pattern 2: Distinct Schemas per Content Type

**What:** Essays, notes, and projects each have their own Zod schema reflecting their semantic differences. Notes have `status: 'seedling' | 'budding' | 'evergreen'`; essays have `published: boolean` and `subtitle`; projects have `area: 'bitcoin-bay' | 'fbba' | 'freedom-tech' | 'petros-hermes'` and `cta`.

**When:** When content types serve different reader intents and shouldn't pretend to be the same thing.

**Trade-offs:**
- **Pro:** Type safety, cleaner layouts, content discoverability via `status` and `area` filters.
- **Pro:** Mirrors the Maggie Appleton / Stephan Ango pattern that's now canonical.
- **Con:** Slight redundancy across schemas (date, title, slug repeat) — solved by composing a `baseSchema` and extending.

**Example:**
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).optional(),  // refs by slug
  description: z.string().optional(),
});

const essays = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    subtitle: z.string().optional(),
    published: z.boolean().default(false),
    readingTime: z.number().optional(),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    status: z.enum(['seedling', 'budding', 'evergreen']).default('seedling'),
    updated: z.coerce.date(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    area: z.enum(['bitcoin-bay', 'fbba', 'freedom-tech', 'petros-hermes']),
    state: z.enum(['active', 'archived', 'experimental']),
    cta: z.object({ label: z.string(), url: z.string() }).optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const consulting = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    price: z.string(),
    duration: z.string(),
    bookingUrl: z.string().url(),
  }),
});

export const collections = { essays, notes, projects, consulting };
```

### Pattern 3: Frontmatter-Declared Cross-Collection Links

**What:** Each piece of content can declare `related: ['bitcoin-bay', 'why-i-left-substack']`. A `RelatedContent.astro` component resolves these slugs into typed entries from any collection and renders them at the footer of essays/notes/projects.

**When:** When you want explicit, reviewable cross-linking without the complexity of full backlink-graph rendering.

**Trade-offs:**
- **Pro:** Predictable, reviewable. No surprise mentions surfacing from regex parsing.
- **Pro:** Improves SEO (internal linking) and AI-search citation chains (Perplexity follows related-link clusters).
- **Con:** Manual to maintain. Mitigation: a small CLI or build-time script that surfaces "essays that link to project X" inverse views.

**Example:**
```typescript
// src/lib/relations.ts
import { getEntry } from 'astro:content';

export async function resolveRelated(slugs: string[]) {
  const collections = ['essays', 'notes', 'projects'] as const;
  const entries = await Promise.all(
    slugs.flatMap(slug =>
      collections.map(c => getEntry(c, slug).catch(() => null))
    )
  );
  return entries.filter(Boolean);
}
```

### Pattern 4: Layout Firewall Between Personal and Consulting Surfaces

**What:** Two top-level layouts. Personal pages render through `BaseLayout` with calm nav (Home / Projects / Writing / About). Consulting pages render through `ConsultingLayout` with conversion-oriented nav (Services / Case Studies / About / Book) and a persistent Motion-booking CTA.

**When:** When the same domain hosts two distinct audience experiences and you want signaling without splitting infrastructure.

**Trade-offs:**
- **Pro:** Single deploy, single content pipeline, single SEO graph.
- **Pro:** Clear visitor mode-shift on entering `/consulting`.
- **Con:** Requires discipline — don't link from `/about` to `/consulting/audit` in the body copy; keep the bridge in the footer or a single dedicated "if you want to hire me" line.

## Data Flow

### Build-Time Flow

```
Markdown files in src/content/<collection>/
        ↓ (Astro reads, validates with Zod)
Typed collection entries (TypeScript)
        ↓ (getCollection() / getEntry())
Astro pages + layouts render to HTML
        ↓ (Vite build)
Static HTML + assets in dist/
        ↓ (vercel deploy)
CDN-served pages, RSS feeds, sitemap.xml
```

### Cross-Collection Linking Flow

```
Essay frontmatter: related: ['bitcoin-bay', 'sovereign-stack-note']
        ↓
RelatedContent component invoked at essay footer
        ↓
lib/relations.ts → resolveRelated(slugs)
        ↓
For each slug, try getEntry from each collection
        ↓
Render typed cards with link, title, collection-badge
```

### Topic / Tag Flow

```
All entries declare tags: ['bitcoin', 'freedom-tech']
        ↓
Build-time: lib/tags.ts aggregates unique tags across collections
        ↓
getStaticPaths in /topics/[tag].astro generates one page per tag
        ↓
Tag page lists all entries (essays + notes + projects) with that tag
```

## URL Structure (recommended)

```
/                              Homepage (lobby)
/about                         About (long-form identity)
/now                           Currently working on
/contact                       Contact

/projects                      Project hub (4 cards)
/projects/bitcoin-bay          Project page
/projects/fbba                 Project page
/projects/freedom-tech         Project page (note: slug not "freedom-tech-consulting" to avoid /consulting collision)
/projects/petros-hermes        Project page

/writing                       Combined hub (essays + notes, chrono)
/essays                        Essays index (long-form only)
/essays/[slug]                 Essay
/notes                         Notes index (short-form)
/notes/[slug]                  Note
/topics/[tag]                  Tag-filtered cross-collection view

/consulting                    Consulting hub (marketing landing)
/consulting/audit              $499 service
/consulting/starter            $1500+$250 service
/consulting/full               $3000+$500 service
/consulting/case-studies/[slug]  Case studies (later phase)

/rss.xml                       Combined RSS (essays + notes)
/essays/rss.xml                Essays-only RSS
/notes/rss.xml                 Notes-only RSS
/sitemap-index.xml             Auto-generated by @astrojs/sitemap
/robots.txt                    Static
/llms.txt                      Static (lists key URLs for AI crawlers)
```

**Slug discipline:**
- Lowercase, hyphenated, descriptive (`why-bitcoin-bay-exists`, not `2026-04-25-why-bb`)
- No date prefixes in URLs (kills SEO when you re-publish or update; date lives in frontmatter and shown on page)
- Notes can have terser slugs (`sovereign-stack`) since they're meant to be linkable atoms
- Project slugs match the project names users would search for, not internal codenames

**Why this beats alternatives:**
- `/blog` is dated and implies dated chronological content; `/writing` is what serious writers (Sloan, Appleton, Lovin) use in 2026
- Splitting `/essays` and `/notes` mirrors the digital-garden taxonomy that's become canonical (Appleton, Matuschak); combining them under `/posts` blurs the seedling-vs-evergreen distinction
- `/topics/[tag]` (not `/tag/[tag]` or `/categories/...`) reads as "these are the topics I think about" — humanizes the taxonomy
- `/projects` (not `/work` or `/portfolio`) — Wesley's work is multi-area and non-commercial-mostly; "projects" is the honest framing
- `/consulting` (subpath, not subdomain) — see below

## Subpath vs Subdomain Decision

**Recommendation: subpath (`crossthebridge.io/consulting/...`).**

### Reasoning

| Factor | Subpath wins | Subdomain wins | Verdict |
|--------|-------------|----------------|---------|
| **SEO authority consolidation** | Yes — backlinks to essays / projects flow to consulting pages via the same domain authority graph | Subdomains are treated as somewhat-separate sites by Google (officially "equally well," empirically less so) | Subpath. Backlinko's 11.8M-result analysis: subdirectories outperform subdomains in organic rankings. |
| **AI-search citation flow** | Yes — Perplexity / ChatGPT cluster citations by domain; one strong domain > two weaker ones | Subdomain fragments authority signals | Subpath |
| **Operational simplicity** | One Vercel project, one deploy, one cert, one analytics surface | Separate Vercel project (or vercel.json rewrites), separate certs, separate sitemaps | Subpath |
| **Brand cohesion / discoverability** | Visitors who land on `/consulting/audit` can see other work via nav | Subdomain can feel siloed; visitor doesn't realize there's a bigger project surface | Subpath |
| **Future spin-out** | Migration cost: ~2 weeks if consulting becomes its own brand | Already separated, easier to lift | Subdomain |
| **Audience separation signaling** | Achieved via `ConsultingLayout` (different nav, different CTA, possibly different accent color) | Achieved via subdomain itself | Tie — subpath solution requires layout discipline but works |

**Tipping point that would flip this:** if CTB Consulting hires a separate team, gets its own brand identity, and starts ranking for keywords distinct from Wesley's personal/freedom-tech terms (e.g., "Tampa AI consulting"), then `consulting.crossthebridge.io` or even `ctbconsulting.com` becomes correct. **For v1 with one operator, subpath is right.**

**One concrete escape hatch to build in now:** keep all consulting content in its own collection (`src/content/consulting/`) and isolated layout. If you later spin out, you lift one folder + one layout + four pages, not a tangled mess. Cost of optionality: near-zero.

## Build Order (maps to roadmap phases)

The architecture suggests **3 to 4 coarse phases**. Each phase is independently shippable.

### Phase 1: Foundation + Personal Surface (the shippable MVP)

**Goal:** Working personal portfolio site replacing current single-page CTB marketing site, with worldview and projects clearly visible. Inbound flows from peers can begin.

**Build:**
1. Astro project init, Vercel deploy wiring, design tokens
2. Content collections schema (`projects`, `essays`, `notes`) — empty or near-empty
3. `BaseLayout`, `Nav`, `Footer`, `BaseSEO`
4. Homepage (hero + 4 project cards + recent writing stub + contact CTA)
5. About page
6. Projects hub + 4 project pages (one each: BB, FBBA, Freedom Tech, Petros/Hermes)
7. Contact page
8. SEO baseline: meta, OG, canonical, robots.txt, sitemap, JSON-LD Person+Article
9. `/now` page (single MDX, takes 30 minutes)

**Why first:** Delivers the core value (inbound flows) with the smallest scope. Project pages alone make Wesley findable and contextualizable. Writing can be sparse or empty at launch — a project-hub-only site is already a 10x improvement over the current single-page.

**Depends on:** nothing prior.

### Phase 2: Writing Surface

**Goal:** On-site writing live, with both essays and notes shipping. Establishes Wesley as a thinker, not just a person with projects.

**Build:**
1. Essay layout, essay archive index, essay individual pages
2. Note layout (with status badge), notes index, note individual pages
3. `/writing` combined hub
4. RSS feeds (combined + per-collection)
5. Reading time, footnotes, MDX support if needed
6. First 3-5 essays migrated/written, first 5-10 notes seeded
7. `RelatedContent` component (cross-collection linking via frontmatter)

**Why second:** Writing is high-leverage but not on the inbound critical path. Better to ship the project hub fast and iterate on writing IA after seeing how Wesley actually wants to write.

**Depends on:** Phase 1 (collections, layouts, base styles).

### Phase 3: Consulting Subsection

**Goal:** Restore CTB consulting offers as a visitor-routable subsection with intact Motion booking flow. Replaces the conversion path the current site provides.

**Build:**
1. `ConsultingLayout`, `ConsultingNav`, `BookingCTA`
2. `/consulting` hub (services overview)
3. Three service pages (audit, starter, full) from existing CTB-Proposal/Audit-Plan/Marketing-Setup material
4. JSON-LD Service schema
5. Light social proof (testimonials if available, otherwise framing)

**Why third (not first):** The current single-page site still works for consulting until this ships. Wesley's stated core value is *inbound from peers* — consulting is a maintained capability, not the priority. If Wesley wanted consulting first, swap order with Phase 1; the architecture supports it.

**Depends on:** Phase 1 (design tokens, collection infra).

### Phase 4: Discovery Surface (defer to milestone 2)

**Goal:** Site becomes self-organizing as content accumulates.

**Build:**
1. `/topics/[tag]` pages
2. Search (Pagefind — static-friendly, no backend)
3. Inverse-relations view ("essays that mention this project")
4. `llms.txt` curated for AI-citation routing
5. Webmentions / Mastodon comment thread embedding (optional)

**Why last:** None of this matters with <20 content items. Premature build adds maintenance and clutter.

**Depends on:** Phase 2 (enough content to surface).

## Scaling Considerations

This is a personal site. "Scale" here means content volume and audience reach, not concurrent users.

| Scale | Adjustments |
|-------|-------------|
| **0-50 pieces of content** | Current architecture is over-spec'd for this; that's fine, the bones are right |
| **50-300 pieces** | Add Pagefind search, add inverse-relations view, consider tag-tree page |
| **300+** | Consider splitting writing into year-archives (`/writing/2026/`), add a "best of" curated entry page, evaluate moving notes to a separate notes-app surface |
| **Traffic 0-1k visitors/day** | Vercel free tier handles fine |
| **Traffic 1k-10k/day** | Vercel hobby may hit bandwidth limits; upgrade or consider Cloudflare Pages |
| **Traffic 10k+/day** | Reevaluate hosting; static site means almost any CDN works |

### Scaling Priorities (what breaks first)

1. **Build time** balloons past 30s once you hit ~200 pages. Mitigation: Astro 5+ has incremental builds; collection content stays fast even with many pages.
2. **Cross-collection link auditing** becomes manual pain past ~50 cross-references. Mitigation: build-time check that warns on broken `related:` slugs.
3. **Tag soup** — tags multiply without curation. Mitigation: cap at ~20 canonical tags, enforce in schema with `z.enum([...])` once stable.

## Anti-Patterns

### Anti-Pattern 1: Putting Consulting CTA on Homepage

**What people do:** Add "Hire Me" or "Book a Call" CTA to personal homepage to maximize conversion paths.

**Why it's wrong:** Homepage is now reading as a sales surface to peers, repelling exactly the audience that drives high-quality inbound. Wesley's stated tension is precisely this.

**Do this instead:** Homepage routes consulting-curious visitors via *one* footer line ("Looking to hire me for AI work? See consulting →") and the `/consulting` subsection handles the conversion job in its own surface.

### Anti-Pattern 2: Single `/blog` Catch-All

**What people do:** One `/blog` collection with `type: 'essay' | 'note'` field, one layout, one RSS.

**Why it's wrong:** Conflates two reader intents (deep read vs quick reference), forces lowest-common-denominator layout, kills the seedling-vs-evergreen affordance that signals "this is still cooking."

**Do this instead:** Separate collections with separate schemas. Combined `/writing` hub for chronological reading; separate `/essays` and `/notes` for type-aware browsing.

### Anti-Pattern 3: Date-Prefixed URLs

**What people do:** `/blog/2026/04/25/post-title`.

**Why it's wrong:** URL becomes stale when content updates; SEO penalty when you republish; signals "this is dated" even for evergreen pieces; hostile to AI-citation (LLMs cite stable canonical URLs).

**Do this instead:** `/essays/[slug]` with date in frontmatter and rendered on page. Stable URL, visible date.

### Anti-Pattern 4: Subdomain for Consulting Without Reason

**What people do:** Reflexively put consulting on `consulting.crossthebridge.io` because "it's a different audience."

**Why it's wrong:** Splits domain authority, complicates SEO, fragments analytics, and the audience-separation problem is solvable with layouts. See §Subpath vs Subdomain.

**Do this instead:** Subpath + distinct layout. Reserve subdomain for the case where consulting becomes a separate brand with its own team.

### Anti-Pattern 5: Auto-Backlink Rendering on Every Note

**What people do:** Regex-scan all markdown for mentions, render every backlink at the bottom of every page.

**Why it's wrong:** Noisy. Surfaces irrelevant backlinks. Makes the page feel like a wiki rather than a thoughtful document. Maggie Appleton famously moved away from heavy backlinking on her main essays for this reason.

**Do this instead:** Explicit `related:` frontmatter. Reviewable, predictable, cleaner UX. Add inverse-view ("essays that mention this") as a separate page in Phase 4 if useful.

### Anti-Pattern 6: Mega-Nav

**What people do:** Cram all 12 surfaces into the top nav.

**Why it's wrong:** Decision paralysis. Visitors bounce.

**Do this instead:** Top nav: 4-5 items max (Home / Projects / Writing / About / Contact). Footer carries the rest (Now, RSS, Topics, Consulting if not surfaced elsewhere).

## Integration Points

### External Services

| Service | Integration | Notes |
|---------|-------------|-------|
| **Vercel** | Deploy from `main` (existing wiring) | Add staging branch in Phase 1 to avoid broken main pushes |
| **Motion** | Booking link on consulting pages | Iframe vs link-out: link-out preserves Wesley's privacy stance, no third-party JS on personal pages |
| **Plausible / Umami / Counter** | Privacy-respecting analytics | Self-host preferred; Plausible Cloud OK if budget. Block in `consent: anti-surveillance` mode |
| **Bluesky / Mastodon / Nostr** | Profile links + (optional) post embeds | No JS embeds — use static syndication links. Webmentions via brid.gy in Phase 4 |
| **GitHub** | Project repo links from project pages | Static links, no API |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Personal layout ↔ Consulting layout | Shared design tokens, distinct nav/footer/CTA | Single bridge link in personal footer; no consulting CTAs in personal body |
| Essays ↔ Notes ↔ Projects | `related:` frontmatter resolved by `lib/relations.ts` | Opt-in, reviewable |
| Content collections ↔ Layouts | `getCollection` / `getEntry` from `astro:content` | Type-safe via Zod schemas |
| Build ↔ Deploy | `astro build` → `dist/` → Vercel auto-deploy | Add build-time link-check script in Phase 2 |

## Real Examples Mapped to This Architecture

| Site | Pattern Borrowed |
|------|------------------|
| **Maggie Appleton** (`maggieappleton.com`) | `/essays`, `/notes`, `/topics/[tag]`, status-aware notes, distinct schemas — closest analog |
| **Stephan Ango** (`stephango.com`) | Topic-organized homepage, simple flat IA, projects + writing co-located |
| **Brian Lovin** (`brianlovin.com`) | `/writing`, project case studies, polished personal-brand surface |
| **Robin Sloan** (`robinsloan.com`) | `/lab` for short-form vs newsletter for long-form (parallel to notes/essays); newsletter-as-primary cadence |
| **Patrick Collison** (`patrickcollison.com`) | Curated topical pages (`/fast`, `/questions`, `/bookshelf`) — the "thematic project" pattern that could host BB, FBBA, etc. |
| **Andy Matuschak** (`notes.andymatuschak.org`) | Pure-notes treatment as a *separate surface* — informs "should notes be at `notes.crossthebridge.io`?" question (answer: no, integrate them; Andy's case is notes-only, Wesley's isn't) |

## Sources

- [Maggie Appleton — Essays, Notes, Topics structure](https://maggieappleton.com/)
- [Maggie Appleton — Garden taxonomy (seedling/budding/evergreen)](https://maggieappleton.com/garden/)
- [Stephan Ango — kepano homepage and topic organization](https://stephango.com/)
- [Brian Lovin — How my website works](https://brianlovin.com/writing/how-my-website-works)
- [Brian Lovin — briOS source](https://github.com/brianlovin/briOS)
- [Robin Sloan — Newsletters and Lab structure](https://www.robinsloan.com/)
- [Patrick Collison — patrickcollison.com curated topical pages](https://patrickcollison.com/)
- [Andy Matuschak — Evergreen notes & taxonomy](https://notes.andymatuschak.org/Evergreen_notes)
- [Astro Docs — Content collections (canonical pattern)](https://docs.astro.build/en/guides/content-collections/)
- [Astro Docs — Sitemap integration with chunking](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Astro Docs — RSS feeds with content collections](https://docs.astro.build/en/recipes/rss/)
- [Astro Project Structure conventions](https://docs.astro.build/en/basics/project-structure/)
- [Backlinko — Subdomain vs Subdirectory SEO analysis](https://backlinko.com/subdirectory-vs-subdomain)
- [Search Engine Journal — Subdomain vs Subdirectory ranking factors](https://www.searchengineljournal.com/ranking-factors/subdomain-subdirectory/)
- [SearchScale AI — Optimize for ChatGPT/Perplexity/Google AI 2026](https://www.searchscaleai.com/blog/optimize-website-chatgpt-perplexity-google-ai-2026/)
- [Code Macabre — Backlinks in Astro implementation](https://codemacabre.com/notes/backlinks-in-astro/)
- [UX Folio — Case study structure 2026](https://blog.uxfol.io/ux-case-study-template/)

---
*Architecture research for: personal portfolio site with multiple project areas + on-site writing + consulting subsection*
*Researched: 2026-04-25*
