# Phase 02: Writing Surface — Pattern Map

**Mapped:** 2026-04-28
**Files analyzed:** 14 new files + 6 modifications
**Analogs found:** 12 / 14 new (RSS endpoints have no in-repo analog — see "No Analog Found")

---

## File Classification

| New / Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---------------------|------|-----------|----------------|---------------|
| `src/content.config.ts` | config / schema | build-time (Zod validation) | `src/content.config.ts` (current empty placeholder) + research RESEARCH §Pattern 2 | role-match (file already exists; replace body) |
| `src/content/essays/<slug>.md` | content | static asset → Astro content collection | `src/content.config.ts` schema once defined | n/a — content; schema-driven |
| `src/content/notes/<slug>.md` | content | static asset → Astro content collection | `src/content.config.ts` schema once defined | n/a — content; schema-driven |
| `src/layouts/EssayLayout.astro` | layout | composition (BaseLayout consumer) | `src/layouts/BaseLayout.astro` (composition shape) + `src/pages/about.astro` (h-* microformat container) | exact (composition) + role-match (microformat) |
| `src/layouts/NoteLayout.astro` | layout | composition (BaseLayout consumer) | `src/layouts/BaseLayout.astro` + `src/pages/about.astro` | exact + role-match |
| `src/lib/relations.ts` | utility | data resolver (build-time) | `src/lib/consulting-url.ts` (lib/ shape, single-purpose helper) + ARCHITECTURE.md §Pattern 3 | role-match (location/shape) — logic is novel |
| `src/lib/tags.ts` | utility | data resolver (build-time aggregator) | `src/lib/consulting-url.ts` + ARCHITECTURE.md §Tag flow | role-match (location/shape) |
| `src/pages/writing/index.astro` | page | request-response (static index) | `src/pages/about.astro` (typed page composing BaseLayout + structured content) | exact |
| `src/pages/essays/index.astro` | page | request-response (static index) | `src/pages/about.astro` | exact |
| `src/pages/essays/[slug].astro` | page | request-response + getStaticPaths | `src/pages/about.astro` (BaseLayout composition) + ARCHITECTURE.md §Pattern 1 | partial — composition exact, getStaticPaths is novel-for-this-repo |
| `src/pages/notes/index.astro` | page | request-response (static index) | `src/pages/about.astro` | exact |
| `src/pages/notes/[slug].astro` | page | request-response + getStaticPaths | `src/pages/about.astro` (composition) | partial |
| `src/pages/topics/[tag].astro` | page | request-response + getStaticPaths | `src/pages/about.astro` (composition) + ARCHITECTURE.md §Tag flow | partial |
| `src/pages/rss.xml.ts` | endpoint | feed emitter (build-time) | **NO IN-REPO ANALOG** — see RESEARCH STACK.md + Astro RSS recipe | n/a — use @astrojs/rss recipe |
| `src/pages/essays/rss.xml.ts` | endpoint | feed emitter | NO IN-REPO ANALOG | n/a |
| `src/pages/notes/rss.xml.ts` | endpoint | feed emitter | NO IN-REPO ANALOG | n/a |

| Modification | Target | Closest Analog (within file) |
|--------------|--------|------------------------------|
| `src/pages/index.astro:75` un-hide `<section id="recent-writing">` | inline | already-present markup; just remove `hidden` + populate using same Tile-grid composition pattern |
| `src/components/Nav.astro` add "Writing" link | `links` array (line 35-41) | existing array entry pattern |
| `src/components/Footer.astro` add RSS subscription | `Inbound` column (line 48-53) | existing `<ObfuscatedMailto>` placement; the existing `<p class="footer__rss-placeholder">RSS — coming with Phase 2</p>` is the slot to replace |
| `src/components/seo/JsonLd.astro` add `'blog-posting' \| 'article'` schema variants | conditional ladder (lines 64-87) | existing `if (schema === 'website')` / `else if` pattern + schema-dts type imports |
| `src/components/seo/BaseSEO.astro` add `<link rel="alternate" type="application/rss+xml">` | `<head>` fragment (lines 56-75) | existing `<link rel="canonical">` and `<link rel="icon">` slot |
| `astro.config.mjs` add @astrojs/rss | top-of-file imports + npm install | sitemap import line 6 + integrations array line 20 |

---

## Pattern Assignments

### `src/content.config.ts` (config, build-time Zod)

**Analog:** `src/content.config.ts` itself (current empty placeholder) + RESEARCH `.planning/research/ARCHITECTURE.md` §Pattern 2 (lines 211–262).

**Why it's a match:** The file already exists at the Astro 6 canonical path (`src/content.config.ts`, NOT `src/content/config.ts` — that path was deprecated, see line 8 of the existing file). The current body is a single-line placeholder explicitly waiting on Phase 2 to populate per CD-06.

**Current contents to replace** (`src/content.config.ts:1-12`):
```typescript
/**
 * Astro content collections — Phase 1 placeholder (no collections yet).
 *
 * Phase 2 will add `essays` and `notes` collections via `defineCollection({ ... })`
 * with Zod schemas declaring frontmatter (title, date, related, tags, draft).
 *
 * NOTE: Astro 6 deprecated `src/content/config.ts` in favor of
 * `src/content.config.ts` (this file). See:
 * https://docs.astro.build/en/guides/upgrade-to/v6/#removed-legacy-content-collections
 */
export const collections = {} as const;
```

**Pattern to replicate** — adapted from ARCHITECTURE.md §Pattern 2 (lines 213–262):
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),                          // CD-06: required for OG/RSS/<meta>
  published: z.coerce.date(),                       // CD-06: required at publish
  updated: z.coerce.date().optional(),              // D-30: optional
  subtitle: z.string().optional(),
  tags: z.array(z.string()).default([]),            // CD-04 / lib/tags.ts source
  related: z.array(z.string()).default([]),         // CD-03 / lib/relations.ts source
  draft: z.boolean().default(false),                // D-28
  featured: z.boolean().default(false),             // CD-01
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: baseSchema,
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: baseSchema.extend({
    status: z.enum(['seedling', 'budding', 'evergreen']).default('seedling'),
  }),
});

export const collections = { essays, notes };
```

**Preserve verbatim:**
- The Astro 6 path note (lines 7–9 of current file) — keep the comment so future maintainers don't recreate `src/content/config.ts`.
- The `as const` export shape for the `collections` object.

**Diverges from ARCHITECTURE.md §Pattern 2:**
- ARCHITECTURE shows `type: 'content'` (Astro 5 style); Astro 6 deprecated `type:` in favor of the `glob()` loader (RESEARCH STACK.md). Use the `glob` loader as shown above.
- ARCHITECTURE renames `date` → `published` to match CD-06 explicitly.
- `notes.updated` is OPTIONAL per D-30 (ARCHITECTURE made it required — D-30 supersedes).
- No `consulting` or `projects` collections — out of Phase 2 scope.

---

### `src/layouts/EssayLayout.astro` (layout, composition)

**Analog:** `src/layouts/BaseLayout.astro` (composition + Props pattern) — for the shape of "layout that wraps content with typed Props." Microformat container pattern from `src/pages/about.astro` (lines 55–63 — `class="h-card"` on the article, `p-name` on H1, etc.).

**Why it's a match:** EssayLayout is a "compose-inside-BaseLayout" wrapper per CD-07 ("both compose `BaseLayout.astro` from Phase 1. **No second top-level layout.**"). It needs the same typed-Props discipline BaseLayout exhibits, and it adds `h-entry` microformats the same way `about.astro` adds `h-card`.

**Composition pattern from `src/layouts/BaseLayout.astro:33-53`:**
```typescript
interface Props {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLdSchema?: 'website' | 'person' | 'webpage' | 'breadcrumb';
  jsonLdData?: Record<string, unknown>;
  noIndex?: boolean;
}

const {
  title, description, canonical, ogImage, ogType,
  jsonLdSchema = 'webpage',
  jsonLdData, noIndex,
} = Astro.props;
```

**Microformat shape from `src/pages/about.astro:55-63`:**
```html
<article class="about h-card" itemscope itemtype="https://schema.org/Person">
  <header class="about__header">
    <h1 class="about__h1 p-name" itemprop="name">About Wesley</h1>
    <p class="about__role p-job-title">
      <span itemprop="jobTitle">Founder</span>,
      <a class="u-url" href="https://crossthebridge.io" itemprop="url">Cross The Bridge</a>
    </p>
```

**Pattern for `EssayLayout.astro`:**
```astro
---
import BaseLayout from './BaseLayout.astro';
import type { CollectionEntry } from 'astro:content';
import { resolveRelated } from '../lib/relations.ts';

interface Props {
  entry: CollectionEntry<'essays'>;
  readingMinutes?: number;  // CD-09: skip if undefined or shorter than ~500 words
}
const { entry, readingMinutes } = Astro.props;
const { title, description, published, updated, subtitle, related } = entry.data;
const canonical = `/essays/${entry.id.replace(/\.md$/, '')}`;
const related_entries = await resolveRelated(related);
---
<BaseLayout
  title={title}
  description={description}
  canonical={canonical}
  ogType="article"                        {/* CD-10: per-essay sets article ogType */}
  jsonLdSchema="blog-posting"             {/* CD-10: emit BlogPosting per essay */}
  jsonLdData={{
    headline: title,
    datePublished: published.toISOString(),
    dateModified: updated?.toISOString(),
    description,
    author: { '@id': 'https://wesleyschlemmer.com/about#wesley' },
  }}
>
  <article class="essay h-entry">
    <header class="essay__header">
      <h1 class="essay__h1 p-name">{title}</h1>
      {subtitle && <p class="essay__subtitle p-summary">{subtitle}</p>}
      {/* D-30: hide pure pub-date on evergreen, give updated equal weight */}
      <p class="essay__meta">
        <time class="dt-published" datetime={published.toISOString()}>{...}</time>
        {updated && <time class="dt-updated" datetime={updated.toISOString()}>updated {...}</time>}
        {readingMinutes && <span class="essay__reading-time">{readingMinutes} min read</span>}
      </p>
    </header>
    <div class="essay__body e-content">
      <slot />
    </div>
    {related_entries.length > 0 && (
      <aside class="essay__related"> ... </aside>
    )}
  </article>
</BaseLayout>
```

**Preserve verbatim:**
- The "compose `BaseLayout`, never re-implement `<head>`" rule (CD-07 + RESEARCH PITFALLS §4 — privacy hypocrisy lives in any layout that bypasses BaseLayout's font/Umami guards).
- Typed `Props` interface (BaseLayout pattern). Building without it breaks `astro check`.
- The microformat root class on the article (`h-entry`), the `p-name` on the H1, and `e-content` on the body wrapper. These are checked by https://indiewebify.me.

**Diverges from `about.astro`:**
- `about.astro` uses `h-card` (Person); essays use `h-entry` (Article). H1 stays `p-name` either way.
- About page passes `jsonLdSchema="person"`; essays pass `jsonLdSchema="blog-posting"` per CD-10.
- About page does NOT pass `ogType`; essays MUST pass `ogType="article"` (BaseSEO supports this in Props line 19).
- The "Related" footer block is a NEW feature; CD-03 says manual `related: [slug]` only. Use `lib/relations.ts` for resolution.

---

### `src/layouts/NoteLayout.astro` (layout, composition)

**Analog:** Same as EssayLayout — `src/layouts/BaseLayout.astro` for composition + `src/pages/about.astro` for microformat container.

**Why it's a match:** Same shape as EssayLayout. Differences are content-level only (status badge, terser metadata, no reading-time).

**Pattern (delta from EssayLayout):**
```astro
---
import BaseLayout from './BaseLayout.astro';
import type { CollectionEntry } from 'astro:content';
import { resolveRelated } from '../lib/relations.ts';

interface Props {
  entry: CollectionEntry<'notes'>;
}
const { entry } = Astro.props;
const { title, description, published, updated, status, related } = entry.data;
const canonical = `/notes/${entry.id.replace(/\.md$/, '')}`;
const related_entries = await resolveRelated(related);

// D-30 for notes: show updated if present, otherwise published.
const displayDate = updated ?? published;
---
<BaseLayout
  title={title}
  description={description}
  canonical={canonical}
  ogType="article"
  jsonLdSchema="article"             {/* CD-10: notes use lighter Article schema */}
  jsonLdData={{ headline: title, datePublished: published.toISOString(), description }}
>
  <article class="note h-entry">
    <header class="note__header">
      <span class="note__status p-category" data-status={status}>{status}</span>
      <h1 class="note__h1 p-name">{title}</h1>
      <time class="dt-published" datetime={displayDate.toISOString()}>{...}</time>
    </header>
    <div class="note__body e-content">
      <slot />
    </div>
    {related_entries.length > 0 && (
      <aside class="note__related"> ... </aside>
    )}
  </article>
</BaseLayout>
```

**Preserve verbatim:**
- Same composition rule as EssayLayout.
- `h-entry` + `p-name` + `e-content` microformats.

**Diverges from EssayLayout:**
- No `readingMinutes` (CD-09: essays only).
- `jsonLdSchema="article"` not `"blog-posting"` (CD-10 — lighter weight).
- `status` badge is the "terser metadata" element (CD-07 + CD-02).
- D-30: notes show `updated` first, then fallback to `published`. Essays show `published` and optionally `updated`.

---

### `src/lib/relations.ts` (utility, data resolver)

**Analog:** `src/lib/consulting-url.ts` (file lives in `src/lib/`, single-purpose helper, JSDoc-documented). + ARCHITECTURE.md §Pattern 3 lines 277–289 (the actual logic).

**Why it's a match:** `src/lib/consulting-url.ts` establishes the project's `lib/` shape — small TypeScript module, JSDoc-heavy, single named export. relations.ts follows the same shape; the logic comes from ARCHITECTURE.

**`src/lib/consulting-url.ts:1-17` (full file — shape reference):**
```typescript
/**
 * The CTA target URL for the AI/Petros/Hermes project page (D-05).
 *
 * Phase 1 staging: env var = `https://crossthebridge.io` (apex still serves
 * the legacy single-page consulting site; client URL points there until
 * Phase 3 cuts over).
 *
 * Phase 3 cutover: unset PUBLIC_CONSULTING_URL → falls back to `/consulting`
 * (the new in-repo route).
 *
 * Why PUBLIC_*: Astro inlines only PUBLIC_-prefixed env vars into client
 * bundles. Without the prefix, `import.meta.env.CONSULTING_URL` would be
 * `undefined` at build time (Pitfall H, RESEARCH.md line 1208).
 */
export const consultingUrl: string =
  import.meta.env.PUBLIC_CONSULTING_URL ?? '/consulting';
```

**Logic from ARCHITECTURE.md lines 277–289:**
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

**Pattern for `src/lib/relations.ts`:**
```typescript
/**
 * relations.ts — resolves cross-collection `related: [slug]` frontmatter.
 *
 * CD-03: manual related links only (no auto-tag overlap, no mention-based
 * scanning). Each frontmatter `related` array is a list of slugs that may
 * appear in either the `essays` or `notes` collection. This helper attempts
 * each collection in turn and returns whichever entry it finds, or null.
 *
 * D-28: drafts excluded — entries with `data.draft: true` are filtered out
 * so a published essay's "Related" block never points at an unpublished one.
 */
import { getEntry, type CollectionEntry } from 'astro:content';

type AnyEntry = CollectionEntry<'essays'> | CollectionEntry<'notes'>;

export async function resolveRelated(slugs: string[]): Promise<AnyEntry[]> {
  if (!slugs?.length) return [];
  const collections = ['essays', 'notes'] as const;     // Phase 2: only these two (no `projects` collection in Phase 2)
  const candidates = await Promise.all(
    slugs.flatMap((slug) =>
      collections.map((c) =>
        getEntry(c, slug).catch(() => null) as Promise<AnyEntry | null>
      )
    )
  );
  return candidates.filter((e): e is AnyEntry => e !== null && !e.data.draft);
}
```

**Preserve verbatim:**
- File location: `src/lib/relations.ts` (per ARCHITECTURE recommended-structure).
- JSDoc-first style (matches `consulting-url.ts`).
- Decision-ID references in the JSDoc (CD-03, D-28) — matches the project's commenting convention.

**Diverges from ARCHITECTURE §Pattern 3:**
- ARCHITECTURE includes `'projects'` in the collections tuple. Phase 2 does NOT have a `projects` collection (project pages are hand-authored under `src/pages/projects/`). Tuple is `['essays', 'notes']` only.
- ARCHITECTURE returns `entries.filter(Boolean)` — adds D-28 draft filter on top per CD-06.

---

### `src/lib/tags.ts` (utility, data aggregator)

**Analog:** `src/lib/consulting-url.ts` (lib/ shape, JSDoc style) + ARCHITECTURE.md §Tag flow lines 332–342 + ARCHITECTURE §Anti-Pattern 5 (lines 530–540).

**Why it's a match:** Same lib/ shape as `consulting-url.ts`; logic borrowed from ARCHITECTURE. The `topics/[tag].astro` page calls into this for `getStaticPaths`.

**Pattern for `src/lib/tags.ts`:**
```typescript
/**
 * tags.ts — aggregates tags across `essays` and `notes` collections.
 *
 * CD-04: open taxonomy (any tag in any frontmatter `tags: [...]` array
 * generates a /topics/[tag] page). No whitelist. Empty pages cannot exist
 * — a tag only renders if at least one piece references it.
 * D-28: drafts excluded from aggregation so a topic page only lists
 * published content.
 *
 * Tag slugs are lowercase + hyphenated. Frontmatter authors should use the
 * same form ("freedom-tech", not "Freedom Tech") to avoid silent dedupe
 * misses.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

type AnyEntry = CollectionEntry<'essays'> | CollectionEntry<'notes'>;

export async function getAllTags(): Promise<string[]> {
  const [essays, notes] = await Promise.all([
    getCollection('essays', ({ data }) => !data.draft),
    getCollection('notes', ({ data }) => !data.draft),
  ]);
  const all = [...essays, ...notes].flatMap((e) => e.data.tags ?? []);
  return Array.from(new Set(all)).sort();
}

export async function getEntriesByTag(tag: string): Promise<AnyEntry[]> {
  const [essays, notes] = await Promise.all([
    getCollection('essays', ({ data }) => !data.draft && data.tags?.includes(tag)),
    getCollection('notes', ({ data }) => !data.draft && data.tags?.includes(tag)),
  ]);
  // Sort by published date desc; updated-date logic lives at the page level.
  return [...essays, ...notes].sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );
}
```

**Preserve verbatim:**
- File location: `src/lib/tags.ts`.
- JSDoc-first style with decision-ID anchors.
- `getCollection(name, filter)` is the standard `draft: true` exclusion pattern (D-28); Astro evaluates the filter at build time so drafts never reach output, RSS, or related-content lookups.

**Diverges from ARCHITECTURE.md:**
- ARCHITECTURE shows aggregation in pseudocode under §Tag flow (lines 332–342); the function names (`getAllTags`, `getEntriesByTag`) are picked here for consistency with the CD-04 + ARCHITECTURE intent.

---

### `src/pages/writing/index.astro` (page, static index)

**Analog:** `src/pages/about.astro` (typed page composing BaseLayout with `jsonLdSchema` + structured content) + `src/pages/index.astro` (the "tile-grid" composition pattern for displaying multiple items, lines 40–72).

**Why it's a match:** This is a hub page that composes BaseLayout, declares typed page metadata, and renders a list. The same shape as About (composition) and the homepage (multi-item grid).

**Composition pattern from `src/pages/about.astro:41-54`:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Headshot from '../components/Headshot.astro';

const title = 'About';
const description =
  "Wesley Schlemmer's bio fused with the Cross The Bridge thesis — Bitcoin, sovereign AI, Freedom Tech, and the work of opting out of legacy systems.";
const canonical = '/about';
---
<BaseLayout
  title={title}
  description={description}
  canonical={canonical}
  jsonLdSchema="person"
>
```

**Tile/grid pattern from `src/pages/index.astro:40-72`:**
```astro
<section class="tile-grid" aria-label="Projects and thesis">
  <Tile type="project" label="PROJECT" title="Bitcoin Bay" body="..." href="/projects/bitcoin-bay" />
  <Tile ... />
  ...
</section>
```

**Pattern for `src/pages/writing/index.astro`:**
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const title = 'Writing';
const description = "Essays and notes by Wesley Schlemmer — Freedom Tech, Bitcoin, sovereign AI.";
const canonical = '/writing';

// CD-01: featured first, then archive-by-year.
const [essays, notes] = await Promise.all([
  getCollection('essays', ({ data }) => !data.draft),
  getCollection('notes', ({ data }) => !data.draft),
]);
const all = [...essays, ...notes];
const featured = all.filter((e) => e.data.featured);
const archive = all
  .filter((e) => !e.data.featured)
  .sort((a, b) => (b.data.updated ?? b.data.published).valueOf() - (a.data.updated ?? a.data.published).valueOf());
---
<BaseLayout
  title={title}
  description={description}
  canonical={canonical}
  jsonLdSchema="webpage"
  jsonLdData={{
    name: 'Writing — Wesley Schlemmer',
    url: new URL('/writing', Astro.site).toString(),
    description,
  }}
>
  <article class="writing-hub h-feed">      {/* CD-01 + h-feed microformat */}
    <header>
      <h1 class="p-name">Writing</h1>
      <p>Featured pieces — by topic, not date.</p>     {/* CD-01 subline */}
    </header>
    <section aria-label="Featured">
      {featured.map((e) => <article class="h-entry"> ... </article>)}
    </section>
    <section aria-label="All writing">
      {/* archive-by-year listing */}
    </section>
  </article>
</BaseLayout>
```

**Preserve verbatim:**
- The `const title / description / canonical = ...` pre-frontmatter declaration block (matches every Phase 1 page).
- BaseLayout composition with `jsonLdSchema="webpage"` (matches `colophon.astro:33`).
- `aria-label` on listing sections (matches `index.astro:40`).

**Diverges from `about.astro`:**
- Adds `h-feed` microformat (per CONTEXT in-scope item: "IndieWeb microformats: `h-entry` on essays/notes, `h-feed` on indexes").
- Loads content via `getCollection` (about.astro is purely static).
- CD-01 library mode: featured-first, then "All writing, by year updated" — NOT a "Latest from the blog" reverse-chrono feed (PITFALLS §1).

---

### `src/pages/essays/index.astro` (page, static index)

**Analog:** Same as `writing/index.astro` — `src/pages/about.astro` composition + `getCollection('essays')`.

**Why it's a match:** Single-collection variant of the writing hub. Same composition shape.

**Pattern (delta from writing/index.astro):**
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const title = 'Essays';
const description = 'Long-form essays by Wesley Schlemmer.';
const canonical = '/essays';

const essays = (await getCollection('essays', ({ data }) => !data.draft))
  .sort((a, b) => (b.data.updated ?? b.data.published).valueOf() - (a.data.updated ?? a.data.published).valueOf());
---
<BaseLayout title={title} description={description} canonical={canonical}>
  <article class="essays-index h-feed">
    <header><h1 class="p-name">Essays</h1></header>
    {essays.map((e) => <article class="h-entry">...</article>)}
  </article>
</BaseLayout>
```

**Preserve / diverges:** same as writing/index.

---

### `src/pages/essays/[slug].astro` (page, dynamic + getStaticPaths)

**Analog:** `src/pages/about.astro` for BaseLayout composition. The `getStaticPaths` shape is novel for this repo (no existing dynamic routes — Phase 1 only has static pages). Use the canonical Astro 6 content-collection pattern.

**Why it's a match:** Composition is identical to about.astro; the only delta is the `getStaticPaths` block, which has no existing analog because Phase 1 hardcoded its three project pages as static `.astro` files.

**Composition pattern (about.astro:41-54)** — already excerpted above.

**Pattern for `src/pages/essays/[slug].astro`:**
```astro
---
import EssayLayout from '../../layouts/EssayLayout.astro';
import { getCollection, render } from 'astro:content';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths = (async () => {
  const essays = await getCollection('essays', ({ data }) => !data.draft);   // D-28
  return essays.map((entry) => ({
    params: { slug: entry.id.replace(/\.md$/, '') },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

const { entry } = Astro.props;
const { Content, remarkPluginFrontmatter } = await render(entry);

// CD-09 reading time: derived from word count, hidden when < ~500 words.
const readingMinutes = remarkPluginFrontmatter?.readingMinutes;
---
<EssayLayout entry={entry} readingMinutes={readingMinutes}>
  <Content />
</EssayLayout>
```

**Preserve verbatim:**
- D-28 draft filter inside `getStaticPaths`. Drafts must NOT reach build output, sitemap, or RSS.
- The `entry.id.replace(/\.md$/, '')` slug derivation (Astro 6 `glob()` loader returns ids with extensions).
- Wrapping the content in `EssayLayout` (which itself wraps BaseLayout). Don't bypass.

**Diverges from `about.astro`:**
- Uses `EssayLayout` not `BaseLayout` directly (CD-07 layout split).
- `getStaticPaths` is novel — about.astro is a single static file.
- Reading-time derivation requires a remark plugin in `astro.config.mjs` (e.g., `remark-reading-time`) — planner decides whether to add the plugin or compute from `entry.body.split(/\s+/).length`. Both are valid; remark plugin is cleaner.

---

### `src/pages/notes/index.astro` (page, static index)

**Analog:** Same as `essays/index.astro`.

**Pattern (delta — surface CD-02 `status` filter UI, optional):**
```astro
const notes = (await getCollection('notes', ({ data }) => !data.draft))
  .sort((a, b) => (b.data.updated ?? b.data.published).valueOf() - (a.data.updated ?? a.data.published).valueOf());
// Each list item shows the status badge near the title (CD-02).
```

---

### `src/pages/notes/[slug].astro` (page, dynamic)

**Analog:** Same as `essays/[slug].astro` — swap `EssayLayout` → `NoteLayout`, swap `'essays'` → `'notes'`.

**Pattern (delta):**
```astro
---
import NoteLayout from '../../layouts/NoteLayout.astro';
import { getCollection, render } from 'astro:content';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths = (async () => {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  return notes.map((entry) => ({ params: { slug: entry.id.replace(/\.md$/, '') }, props: { entry } }));
}) satisfies GetStaticPaths;

const { entry } = Astro.props;
const { Content } = await render(entry);
---
<NoteLayout entry={entry}><Content /></NoteLayout>
```

---

### `src/pages/topics/[tag].astro` (page, dynamic, cross-collection)

**Analog:** `src/pages/essays/[slug].astro` for the `getStaticPaths` shape + `src/lib/tags.ts` for the data layer + `src/pages/about.astro` for BaseLayout composition.

**Why it's a match:** Same dynamic-route shape as `essays/[slug].astro`, but with two `getStaticPaths` paths derived from `getAllTags()` and the body listing entries from `getEntriesByTag(tag)`.

**Pattern:**
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getAllTags, getEntriesByTag } from '../../lib/tags.ts';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths = (async () => {
  const tags = await getAllTags();
  return tags.map((tag) => ({ params: { tag }, props: { tag } }));
}) satisfies GetStaticPaths;

const { tag } = Astro.props;
const entries = await getEntriesByTag(tag);    // Already drafts-filtered + date-sorted
const title = `Topic: ${tag}`;
const description = `All essays and notes tagged ${tag}.`;
const canonical = `/topics/${tag}`;
---
<BaseLayout title={title} description={description} canonical={canonical} jsonLdSchema="webpage" jsonLdData={{ name: title, url: new URL(canonical, Astro.site).toString(), description }}>
  <article class="topic h-feed">
    <header><h1 class="p-name">{tag}</h1></header>
    {entries.map((e) => <article class="h-entry">...</article>)}
  </article>
</BaseLayout>
```

**Preserve verbatim:**
- `getStaticPaths` + `satisfies GetStaticPaths` typed signature.
- D-28 filter is INSIDE `lib/tags.ts` — DON'T re-filter at the page level (single source of truth).
- CD-04: empty pages cannot exist — `getAllTags()` returns only tags that actually have ≥1 published entry, so this is automatic.

---

## RSS Endpoints — No In-Repo Analog

`src/pages/rss.xml.ts`, `src/pages/essays/rss.xml.ts`, `src/pages/notes/rss.xml.ts` have NO existing analog in this codebase:

- The only existing build-time XML emitter is `@astrojs/sitemap`, which is wired as an integration in `astro.config.mjs:20` — not as a `src/pages/*.xml.ts` file.
- The site has no `src/pages/*.xml*` or `*.ts` endpoint files yet (verified — `find src/pages -name "*.xml*" -o -name "*.ts"` returns empty).

**Source pattern: Astro RSS recipe** (RESEARCH STACK.md line 38, https://docs.astro.build/en/recipes/rss/, https://www.npmjs.com/package/@astrojs/rss).

**Pattern for `src/pages/rss.xml.ts`** (combined feed — CD-05):
```typescript
/**
 * rss.xml — combined feed (essays + notes), full content per CD-05.
 *
 * Per PITFALLS §11: validate at https://validator.w3.org/feed/ before launch
 * and test in NetNewsWire/Reeder. Use the official @astrojs/rss helper —
 * don't roll your own escaping.
 *
 * D-28 drafts filter applied via getCollection's filter callback.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [essays, notes] = await Promise.all([
    getCollection('essays', ({ data }) => !data.draft),
    getCollection('notes', ({ data }) => !data.draft),
  ]);
  const all = [...essays, ...notes].sort(
    (a, b) => (b.data.updated ?? b.data.published).valueOf() - (a.data.updated ?? a.data.published).valueOf()
  );
  return rss({
    title: 'Wesley Schlemmer — Writing',
    description: 'Essays and notes — Freedom Tech, Bitcoin, sovereign AI.',
    site: context.site!,
    items: all.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.published,
      description: entry.data.description,
      link: entry.collection === 'essays'
        ? `/essays/${entry.id.replace(/\.md$/, '')}`
        : `/notes/${entry.id.replace(/\.md$/, '')}`,
      content: entry.body,             // CD-05: full content, not summary-only
    })),
    customData: '<language>en</language>',
  });
}
```

**Preserve verbatim:**
- `export async function GET(context: APIContext)` — Astro 6 endpoint signature.
- `context.site!` — relies on `site:` set in `astro.config.mjs:12`.
- D-28 draft filter via `getCollection` filter callback (NOT post-filter).
- CD-05: `content: entry.body` for full-text feed (peer audience reads in NetNewsWire/Reeder).
- File path uses `.ts` extension — Astro 6 supports both `.ts` and `.js` for endpoints; the project is TS-by-default (matches `consulting-url.ts`).

**Per-collection variants** (`src/pages/essays/rss.xml.ts`, `src/pages/notes/rss.xml.ts`):
- Same shape, swap `getCollection('essays')` (or `'notes'`) and update title/description/link prefix accordingly.

**Install requirement (NOT yet in package.json):**
```bash
npm install @astrojs/rss
# Verify version: "^4.0.18" per RESEARCH STACK.md line 302 + research recommendations.
```
The package is NOT currently in `package.json:18-29` (verified — only `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/vercel` present).

---

## Modification Patterns

### `src/pages/index.astro:75` — un-hide "recent-writing" + populate

**Current state** (`src/pages/index.astro:74-75`):
```astro
{/* Phase 2 placeholder per D-07 (CONTEXT.md). Hidden until Phase 2 wires "Recent writing". */}
<section id="recent-writing" hidden></section>
```

**Pattern to replace** (CD-01: featured-first, fallback to most-recently-updated, library-mode):
```astro
---
// Append to existing frontmatter at top of file:
import { getCollection } from 'astro:content';

// CD-01: up to 3 featured pieces, dateless framing. Fallback to most-recent-updated
// if fewer than 3 featured exist.
const [essays, notes] = await Promise.all([
  getCollection('essays', ({ data }) => !data.draft),
  getCollection('notes', ({ data }) => !data.draft),
]);
const all = [...essays, ...notes];
const featuredFirst = [
  ...all.filter((e) => e.data.featured),
  ...all
    .filter((e) => !e.data.featured)
    .sort((a, b) => (b.data.updated ?? b.data.published).valueOf() - (a.data.updated ?? a.data.published).valueOf()),
].slice(0, 3);
---
{/* … existing Hero + tile-grid above … */}

{/* D-07 + CD-01: library-mode "Writing" module. Heading is "Writing", NOT "Latest from the blog". */}
<section id="recent-writing" class="recent-writing" aria-label="Writing">
  <h2 class="recent-writing__h2">Writing</h2>
  <p class="recent-writing__sub">Featured pieces — by topic, not date.</p>
  <ul class="recent-writing__list">
    {featuredFirst.map((entry) => (
      <li class="h-entry">
        <a href={entry.collection === 'essays'
          ? `/essays/${entry.id.replace(/\.md$/, '')}`
          : `/notes/${entry.id.replace(/\.md$/, '')}`}
          class="p-name">{entry.data.title}</a>
        {entry.data.subtitle && <p class="p-summary">{entry.data.subtitle}</p>}
      </li>
    ))}
  </ul>
</section>
```

**Preserve verbatim:**
- The `<section id="recent-writing">` element id (it's the documented Phase-2 anchor per the comment + CONTEXT line 166).
- The locked tile-grid above this section (D-06 / IDENT-03 — DO NOT MUTATE).
- The locked single-CTA discipline (no consulting/booking CTA was added to the homepage in Phase 1; Phase 2 adds zero new CTAs here either).

**Diverges from current placeholder:**
- Remove the `hidden` attribute.
- Heading is "Writing", explicitly NOT "Latest from the blog" (PITFALLS §1 dead-blog graveyard, CONTEXT specifics line 215).

---

### `src/components/Nav.astro` — add "Writing" link

**Current `links` array** (`src/components/Nav.astro:35-41`):
```typescript
const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/colophon', label: 'Colophon' },
];
```

**Minimal additive change:** Insert a `Writing` entry before `About`:
```typescript
const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },     // <-- NEW (Phase 2)
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/colophon', label: 'Colophon' },
];
```

**Preserve verbatim:**
- The rest of the file. The `isActive(href)` helper at line 28-31 ALREADY handles `/writing` and `/writing/anything` correctly (matches both exact and `startsWith(href + '/')`). No JS changes needed.
- Same goes for the desktop and mobile drawer renderers — they iterate the `links` array.

**Diverges from current:**
- One new array entry. No other changes.
- Note: ARCHITECTURE §Anti-Pattern 6 (Mega-Nav) caps top nav at 4-5 items. Adding "Writing" puts the array at 6 items. Acceptable given Colophon is the lowest-priority surface (it can move to footer-only in a follow-up if nav feels crowded; not required for Phase 2).

---

### `src/components/Footer.astro` — replace RSS placeholder with subscription affordance

**Current Inbound column** (`src/components/Footer.astro:48-53`):
```astro
<div class="footer__col">
  <h2 class="footer__heading">Inbound</h2>
  <ObfuscatedMailto ctaLabel="Email Wesley" />
  <p class="footer__rss-placeholder">RSS — coming with Phase 2</p>
  {/* Phase 3: cross-link to /consulting goes here. Commented out in Phase 1 per CONTEXT.md/D-18 layout firewall. */}
</div>
```

**Minimal additive change:** Replace the placeholder `<p>` with a subscription block (CD-05: three feeds visible):
```astro
<div class="footer__col">
  <h2 class="footer__heading">Inbound</h2>
  <ObfuscatedMailto ctaLabel="Email Wesley" />
  <ul class="footer__rss-list">
    <li><a class="footer__link" href="/rss.xml">RSS — all writing</a></li>
    <li><a class="footer__link" href="/essays/rss.xml">RSS — essays only</a></li>
    <li><a class="footer__link" href="/notes/rss.xml">RSS — notes only</a></li>
  </ul>
  {/* Phase 3 cross-link comment: REMOVE — D-18 firewall is permanent post-pivot, no Phase 3 in this project. */}
</div>
```
And ADD a small style rule mirroring `.footer__list`:
```css
.footer__rss-list {
  list-style: none;
  margin: var(--spacing-md) 0 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
```

**Preserve verbatim:**
- The locked tagline (lines 36, "Worldview, projects, and writing — opting out of legacy systems.") — NOT a Phase 2 modification target.
- The locked copyright line (lines 57-59).
- The `<ObfuscatedMailto>` placement and props.
- The `.footer__link` reuse for the RSS anchors (matches existing styling on the Site column links, lines 119-132).

**Diverges from current:**
- The placeholder `<p>` and the now-stale Phase-3 comment go away.
- Three internal `<a href="/.../rss.xml">` anchors replace them (NOT external — these resolve at the site's own apex).

---

### `src/components/seo/JsonLd.astro` — add `'blog-posting' | 'article'` schema variants

**Current type union** (`src/components/seo/JsonLd.astro:21-23`):
```typescript
interface Props {
  schema: 'website' | 'person' | 'webpage' | 'breadcrumb';
  data?: Record<string, unknown>;
}
```

**Current conditional ladder** (`src/components/seo/JsonLd.astro:64-87`):
```typescript
let json: Record<string, unknown>;
if (schema === 'website') {
  json = { '@context': 'https://schema.org', ...WEBSITE };
} else if (schema === 'person') {
  json = { '@context': 'https://schema.org', ...PERSON };
} else if (schema === 'breadcrumb') {
  json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...data,
  };
} else {
  // schema === 'webpage'
  const fallback: WebPage = { ... };
  json = { '@context': 'https://schema.org', ...fallback, ...data };
}
```

**Minimal additive change:**
1. Extend the union: `'website' | 'person' | 'webpage' | 'breadcrumb' | 'blog-posting' | 'article'` (matches CD-10 wording).
2. Add `BlogPosting` and `Article` imports from `schema-dts` (they're available in the same package).
3. Add two new `else if` arms BEFORE the `webpage` fallback:

```typescript
import type { Person, WebSite, WebPage, BlogPosting, Article } from 'schema-dts';

interface Props {
  schema: 'website' | 'person' | 'webpage' | 'breadcrumb' | 'blog-posting' | 'article';
  data?: Record<string, unknown>;
}

// ... existing PERSON / WEBSITE consts unchanged ...

let json: Record<string, unknown>;
if (schema === 'website') {
  json = { '@context': 'https://schema.org', ...WEBSITE };
} else if (schema === 'person') {
  json = { '@context': 'https://schema.org', ...PERSON };
} else if (schema === 'breadcrumb') {
  json = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', ...data };
} else if (schema === 'blog-posting') {
  // CD-10: per-essay BlogPosting with author @id ref to Person
  const blogPosting: BlogPosting = {
    '@type': 'BlogPosting',
    headline: (data.headline as string) ?? '',
    datePublished: (data.datePublished as string) ?? '',
    dateModified: data.dateModified as string | undefined,
    description: (data.description as string) ?? '',
    author: { '@id': PERSON_ID } as any,            // existing escape-hatch pattern, line 60
    publisher: { '@id': PERSON_ID } as any,
    mainEntityOfPage: { '@id': `${siteUrl}/#website` } as any,
    ...data,
  };
  json = { '@context': 'https://schema.org', ...blogPosting };
} else if (schema === 'article') {
  // CD-10: notes use lighter Article schema (no headline-vs-name disambiguation, no publisher requirement)
  const article: Article = {
    '@type': 'Article',
    headline: (data.headline as string) ?? '',
    datePublished: (data.datePublished as string) ?? '',
    description: (data.description as string) ?? '',
    author: { '@id': PERSON_ID } as any,
    ...data,
  };
  json = { '@context': 'https://schema.org', ...article };
} else {
  // schema === 'webpage' — UNCHANGED
  const fallback: WebPage = { ... };
  json = { '@context': 'https://schema.org', ...fallback, ...data };
}
```

**Preserve verbatim:**
- `PERSON_ID` constant (`src/components/seo/JsonLd.astro:37`) — re-use for `author` + `publisher` `@id` refs (graph-stable identity per the comment on lines 33-37).
- The `as any` escape hatch (line 60) is the documented pattern for `@id`-only refs.
- `import type { Person, WebSite, WebPage } from 'schema-dts'` — add `BlogPosting, Article` to the same import.

**Diverges from current:**
- Two new union members (`'blog-posting'`, `'article'`).
- Two new `else if` arms BEFORE the `webpage` fallback (the fallback must remain last).
- Update the BaseLayout `Props.jsonLdSchema` type union too (`src/layouts/BaseLayout.astro:39`) — same six-member union — so consumers can pass the new values.

---

### `src/components/seo/BaseSEO.astro` — add `<link rel="alternate" type="application/rss+xml">`

**Current Props** (`src/components/seo/BaseSEO.astro:14-21`):
```typescript
interface Props {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}
```

**Current `<head>` fragment** (`src/components/seo/BaseSEO.astro:57-75`):
```astro
<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalAbs} />
{noIndex && <meta name="robots" content="noindex,nofollow" />}
{/* og: + twitter: + theme-color + favicon ... */}
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
```

**Minimal additive change:** Auto-emit three `<link rel="alternate">` tags on every page (CD-05 says "for all three in every page's `<head>` via BaseLayout" — so this is unconditional, not opt-in via prop):

```astro
{/* INSERT after the existing canonical + before og: tags, around line 60 */}
<link rel="alternate" type="application/rss+xml" title="Wesley Schlemmer — Writing (combined)" href={new URL('/rss.xml', Astro.site).toString()} />
<link rel="alternate" type="application/rss+xml" title="Wesley Schlemmer — Essays" href={new URL('/essays/rss.xml', Astro.site).toString()} />
<link rel="alternate" type="application/rss+xml" title="Wesley Schlemmer — Notes" href={new URL('/notes/rss.xml', Astro.site).toString()} />
```

**Preserve verbatim:**
- The `Astro.site` URL composition pattern (already used on line 39 for ogImage, line 42 for canonical).
- The `if (!Astro.site) throw` guard at line 35-37 — RSS alternates depend on the same env var.

**Diverges from current:**
- No new Props (CD-05 says always-on, not opt-in).
- No conditional logic — three `<link>` tags emitted on every page.

---

### `astro.config.mjs` — add @astrojs/rss

**Current state** (`astro.config.mjs:1-46`):
```javascript
// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://wesleyschlemmer.com',
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel({ imageService: true }),
  integrations: [sitemap(), mdx(), icon()],
  vite: { plugins: [tailwindcss()] },
  fonts: [ /* ... */ ],
});
```

**Minimal additive change:**
- `@astrojs/rss` is a *helper library* (used inside endpoint files via `import rss from '@astrojs/rss'`), NOT an integration. It does NOT register in the `integrations: [...]` array.
- Therefore: the only `astro.config.mjs` change is OPTIONAL (no required edit) — but the planner may want to ADD a comment noting RSS is wired via endpoint files.
- The npm install is the actual dependency change:
  ```bash
  npm install @astrojs/rss
  ```
  Confirm version `^4.x` (research recommends ^4.0.18; check `npm view @astrojs/rss version` at install time).

**Preserve verbatim:**
- Sitemap integration line (`integrations: [sitemap(), mdx(), icon()]`) — sitemap auto-discovers `src/pages/*.xml.ts` endpoints by default and includes them in `sitemap-index.xml` (verify after first build).
- The `site:` field — already correctly pointing at `wesleyschlemmer.com` post-pivot (line 12).

**Diverges from current:**
- Add `@astrojs/rss` to `package.json` dependencies (npm install handles this).
- No code change to `astro.config.mjs` is strictly required.

---

## Shared Patterns

### Page composition (applies to ALL new pages)

**Source:** `src/pages/about.astro:41-54` (composition shape) + `src/layouts/BaseLayout.astro:33-53` (Props contract).

**Apply to:** `writing/index.astro`, `essays/index.astro`, `essays/[slug].astro`, `notes/index.astro`, `notes/[slug].astro`, `topics/[tag].astro`, plus modifications to `index.astro`.

**Excerpt** (about.astro, the canonical example for "page composing BaseLayout with typed locals + jsonLd*"):
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const title = 'About';
const description = "...";
const canonical = '/about';
---
<BaseLayout
  title={title}
  description={description}
  canonical={canonical}
  jsonLdSchema="person"
>
  <article ...>...</article>
</BaseLayout>
```

**Rule** (carry-forward from Phase 1 D-18 + CD-07):
- Every page MUST compose `BaseLayout` directly OR via `EssayLayout` / `NoteLayout` (which themselves wrap `BaseLayout`).
- Never re-implement `<head>`, `<Font>`, or the Umami three-way guard. Any page that bypasses BaseLayout breaks PRIV-01 (no `fonts.googleapis.com`) and PRIV-02 (analytics three-way guard).

---

### h-* microformat container shape (applies to all writing pages)

**Source:** `src/pages/about.astro:55-63` (h-card example).

**Apply to:**
- `EssayLayout.astro`, `NoteLayout.astro` → root `<article class="... h-entry">`, H1 carries `p-name`, body wrapper carries `e-content`, dates carry `dt-published` / `dt-updated`.
- `writing/index.astro`, `essays/index.astro`, `notes/index.astro`, `topics/[tag].astro` → root `<article class="... h-feed">`, list items each `class="h-entry"`.

**Excerpt** (about.astro:55-63):
```html
<article class="about h-card" itemscope itemtype="https://schema.org/Person">
  <header>
    <h1 class="about__h1 p-name" itemprop="name">About Wesley</h1>
    <p class="about__role p-job-title">
      <span itemprop="jobTitle">Founder</span>,
      <a class="u-url" href="https://crossthebridge.io" itemprop="url">Cross The Bridge</a>
    </p>
```

**Rule:** The h-* class pattern from `about.astro` is the contract. Validate at https://indiewebify.me before launch (matches the SEO-06 invariant — already partially shipped in Phase 1 via h-card).

---

### Decision-ID-anchored JSDoc comments (applies to ALL new files)

**Source:** Every `.astro` and `.ts` file in the repo (e.g. `src/lib/consulting-url.ts:1-14`, `src/components/seo/JsonLd.astro:1-18`, `src/pages/about.astro:1-40`).

**Apply to:** All Phase 2 files.

**Pattern:** Each new file opens with a JSDoc block that:
1. Names the file's purpose in one line.
2. Cites the canonical decision IDs it implements (e.g. `D-30`, `CD-05`, `WRITE-03`).
3. Calls out load-bearing invariants — what NOT to mutate.
4. References RESEARCH PITFALLS / RESEARCH ARCHITECTURE sections where the rationale lives.

**Rule:** Match the style of `JsonLd.astro:1-18` and `consulting-url.ts:1-14`. Future maintainers and downstream Claude sessions navigate the codebase by these comments.

---

### Drafts-filter discipline (applies to ALL data-loading)

**Source:** D-28 in CONTEXT.md + Astro convention `getCollection(name, ({ data }) => !data.draft)`.

**Apply to:**
- `lib/relations.ts` (post-filter inside the function)
- `lib/tags.ts` (filter inside `getCollection`)
- All RSS endpoints (`rss.xml.ts`, `essays/rss.xml.ts`, `notes/rss.xml.ts`)
- All listing pages (`writing/index.astro`, `essays/index.astro`, `notes/index.astro`, `topics/[tag].astro`)
- All dynamic-route `getStaticPaths` (`essays/[slug].astro`, `notes/[slug].astro`, `topics/[tag].astro`)
- The homepage `<section id="recent-writing">` populated module

**Pattern (canonical form):**
```typescript
const essays = await getCollection('essays', ({ data }) => !data.draft);
```

**Rule:** Single source of truth (the repo). Drafts must NEVER appear in: build output, RSS feeds, sitemap, related-content lookups, topic pages, homepage Recent Writing. Use the filter callback inside `getCollection` (not a post-`.filter()` step) so Astro skips them at the loader level.

---

## No Analog Found

Files where the codebase has no close match — planner should rely on RESEARCH (STACK.md, ARCHITECTURE.md) and the Astro RSS recipe instead of in-repo patterns:

| File | Role | Data Flow | Reason | Recommended source |
|------|------|-----------|--------|-------------------|
| `src/pages/rss.xml.ts` | endpoint | feed emitter | No `*.xml.ts` or `*.ts` endpoints exist in `src/pages/`. Sitemap is plugin-generated, not endpoint-generated. | `@astrojs/rss` recipe at https://docs.astro.build/en/recipes/rss/ + STACK.md line 38 |
| `src/pages/essays/rss.xml.ts` | endpoint | feed emitter | Same | Same |
| `src/pages/notes/rss.xml.ts` | endpoint | feed emitter | Same | Same |
| Reading-time computation (used by `essays/[slug].astro`) | utility | build-time word-count | No reading-time helper in `src/lib/`. | Either `remark-reading-time` plugin in `astro.config.mjs:integrations` OR inline `entry.body.split(/\s+/).length / 250` in `EssayLayout.astro`. CD-09: skip if < 500 words. |

---

## Metadata

**Analog search scope:**
- `src/components/`, `src/components/seo/`, `src/layouts/`, `src/lib/`, `src/pages/`, `src/pages/projects/`, `src/content.config.ts`, `astro.config.mjs`, `package.json`
- `.planning/research/STACK.md`, `.planning/research/ARCHITECTURE.md`, `.planning/research/PITFALLS.md` (§1, §6, §11)
- `.planning/phases/02-writing-surface/02-CONTEXT.md`, `.planning/phases/01-foundation-personal-surface/01-CONTEXT.md`

**Files scanned:** 14 source files + 4 research/context files

**Pattern extraction date:** 2026-04-28

**Notable findings:**
1. Phase 1 codebase has near-perfect analogs for every new file EXCEPT the three RSS `*.xml.ts` endpoints (no existing endpoint files of any type).
2. Microformat carry-through: `about.astro` already implements `h-card` (Phase 1 SEO-06 hedge) — the `h-entry` / `h-feed` patterns for Phase 2 are a clean syntactic mirror.
3. `JsonLd.astro` extension (CD-10) is the highest-risk modification because it adds two new schema-dts type imports and two new conditional arms — the existing escape-hatch pattern (`as any` for `@id`-only refs, line 60) is the documented way to handle `author: { '@id': PERSON_ID }`.
4. The `src/content.config.ts` Astro 6 path is correct and stable — no migration concern.
5. `@astrojs/rss` is NOT yet in `package.json` dependencies — npm install required.

---

## PATTERN MAPPING COMPLETE
