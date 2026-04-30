---
phase: 02-writing-surface
reviewed: 2026-04-30T19:39:13Z
depth: standard
files_reviewed: 28
files_reviewed_list:
  - package.json
  - src/components/Footer.astro
  - src/components/Nav.astro
  - src/components/seo/BaseSEO.astro
  - src/components/seo/JsonLd.astro
  - src/content.config.ts
  - src/content/essays/sovereignty-as-a-service.md
  - src/content/essays/thesis.md
  - src/content/notes/glp1-sovereignty.md
  - src/content/notes/open-source-models-catching-up.md
  - src/content/notes/why-astro-over-next.md
  - src/content/notes/why-no-comments.md
  - src/content/notes/why-self-host-umami.md
  - src/layouts/BaseLayout.astro
  - src/layouts/EssayLayout.astro
  - src/layouts/NoteLayout.astro
  - src/lib/relations.ts
  - src/lib/tags.ts
  - src/pages/essays/[slug].astro
  - src/pages/essays/index.astro
  - src/pages/essays/rss.xml.ts
  - src/pages/index.astro
  - src/pages/notes/[slug].astro
  - src/pages/notes/index.astro
  - src/pages/notes/rss.xml.ts
  - src/pages/rss.xml.ts
  - src/pages/topics/[tag].astro
  - src/pages/writing/index.astro
findings:
  critical: 3
  warning: 9
  info: 5
  total: 17
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-04-30T19:39:13Z
**Depth:** standard
**Files Reviewed:** 28
**Status:** issues_found

## Summary

Phase 02 lands a coherent writing surface — content collections, three RSS endpoints, six new content routes, two reading layouts that compose `BaseLayout` (privacy firewall preserved), and a homepage / nav / footer wire-in. The PRIV-01 invariant is intact: zero references to `fonts.googleapis.com` or other Google CDN domains in `src/`. The privacy-firewall composition pattern (BaseLayout owns `<head>`; reading layouts only contribute body content + `jsonLdData` props) is well-structured and the three-way Umami guard fails closed.

That said, the implementation has real bugs and contract holes worth blocking on:

- **JSON-LD `set:html` with un-escaped `JSON.stringify` output** (`</script>` in any frontmatter field would break out of the script tag — script-injection vector even if currently mitigated by trusted authorship).
- **`NoteLayout` mislabels `updated` dates as `dt-published`** in microformats markup, breaking h-entry parsers.
- **`JsonLd.astro` silently emits empty-string `headline`/`datePublished`** when callers omit them; required Schema.org fields shipping as empty.
- **`relations.ts` silently double-resolves** when a slug exists in both collections, and silently drops typo'd / missing references with no build-time warning.
- **`BaseLayout` Umami `src` template literal** does not normalize trailing slashes or validate the protocol; an env var like `umami.crossthebridge.io` (no scheme) would emit a relative URL that 404s on the site origin.

The reading layouts themselves (EssayLayout, NoteLayout), the RSS endpoints, the index pages, and the content schema are otherwise clean. The mobile-nav drawer's a11y wiring (focus trap, scroll-lock release, Escape handler, sync-close-before-nav) is solid.

## Critical Issues

### CR-01: JSON-LD `set:html` emits raw `JSON.stringify` output — `</script>` injection bypass

**File:** `src/components/seo/JsonLd.astro:116`
**Issue:** The component renders structured data with:

```astro
<script is:inline type="application/ld+json" set:html={JSON.stringify(json)} />
```

`JSON.stringify` does not escape `<`, `>`, `&`, or the literal sequence `</script>`. If any field flowing into `data` (or any field on `WEBSITE` / `PERSON`) ever contains `</script>`, the closing tag breaks out of the script element and any text after it is parsed as HTML. Since the schema description, `data.headline`, `data.description`, etc. flow from frontmatter (and from `Astro.site` via `siteUrl`), today's content is trusted — but the firewall is paper-thin. The first author who pastes an essay subtitle containing `<` or runs a script-snippet through the system will produce a broken page or, worse, a content-injection vector.

This is also a documented JSON-LD best-practice failure: every guide on script-tag JSON injection (OWASP, Google's structured-data guide) requires escaping `</` to `<\/` inside `<script>` blocks.

**Fix:** Replace `JSON.stringify(json)` with an escape-aware wrapper:

```ts
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
```

Then: `set:html={safeJsonLd(json)}`. The `\u2028` / `\u2029` escapes also fix the JS line-terminator-in-string bug that breaks JSON parsing in some readers.

### CR-02: NoteLayout mislabels `updated` dates as `dt-published` — microformats / h-entry violation

**File:** `src/layouts/NoteLayout.astro:38, 59`
**Issue:** The layout sets `displayDate = updated ?? published`, then emits:

```astro
<time class="dt-published" datetime={displayDate.toISOString()}>{dateFmt(displayDate)}</time>
```

When a note has both `published` and `updated` frontmatter, this renders the `updated` date with the `dt-published` microformat class. Any h-entry consumer (IndieWeb readers, Webmention parsers, search indexers that read microformats) will record the wrong publication date. `dt-published` is a load-bearing microformat field; if you mean to surface the more-recent date, use `dt-updated` (or render both, as `EssayLayout` correctly does).

This is also inconsistent with the JSON-LD: `jsonLdData={{ headline, datePublished: published.toISOString(), description }}` (line 49–53) — `datePublished` correctly uses the original publication date. The visible `<time>` contradicts the structured data.

**Fix:** Either render two `<time>` elements (matching EssayLayout's pattern) or relabel the class:

```astro
{updated ? (
  <>
    <time class="dt-published" datetime={published.toISOString()}>{dateFmt(published)}</time>
    <span aria-hidden="true"> · </span>
    <time class="dt-updated" datetime={updated.toISOString()}>updated {dateFmt(updated)}</time>
  </>
) : (
  <time class="dt-published" datetime={published.toISOString()}>{dateFmt(published)}</time>
)}
```

Also add `dateModified` to the Article JSON-LD payload at line 49-53 so the structured data carries the same signal:

```astro
jsonLdData={{
  headline: title,
  datePublished: published.toISOString(),
  dateModified: updated?.toISOString(),
  description,
}}
```

### CR-03: `JsonLd.astro` silently emits empty-string required fields

**File:** `src/components/seo/JsonLd.astro:80-103`
**Issue:** Both the BlogPosting and Article branches default missing required fields to empty strings:

```ts
headline: (data.headline as string) ?? '',
datePublished: (data.datePublished as string) ?? '',
description: (data.description as string) ?? '',
```

If a caller forgets to pass one (or passes `undefined`), the page ships with `"headline": ""` and `"datePublished": ""` in the structured data. Google Search Console will flag these as invalid; aggregators may reject the feed; the empty `datePublished` will fail Schema.org Date validation.

The current callers (EssayLayout, NoteLayout) all pass these correctly, so the bug is latent — but the contract is broken: `JsonLd` accepts incomplete data and silently emits malformed schema. The whole point of using `schema-dts` types is to catch this at build time, but the explicit `as string ?? ''` cast defeats the type checker.

**Fix:** Throw explicitly when required fields are missing — fail loud at build time (which `astro check` will surface in CI), not silently in production:

```ts
} else if (schema === 'blog-posting') {
  if (!data.headline || !data.datePublished || !data.description) {
    throw new Error(
      `JsonLd schema=blog-posting requires headline, datePublished, description; got: ${JSON.stringify(data)}`
    );
  }
  const blogPosting: BlogPosting = {
    '@type': 'BlogPosting',
    headline: data.headline as string,
    datePublished: data.datePublished as string,
    dateModified: data.dateModified as string | undefined,
    description: data.description as string,
    // ...
  };
}
```

Apply the same guard to the `'article'` branch.

## Warnings

### WR-01: `relations.ts` silently dedupes nothing — duplicate emissions when slug exists in both collections

**File:** `src/lib/relations.ts:27-45`
**Issue:** For each slug in the input, the function fans out across both collections (`['essays', 'notes']`) and pushes whichever entries exist. If a slug appears in BOTH collections (e.g., a note `thesis.md` is later created alongside the existing essay `thesis.md`), `resolveRelated(['thesis'])` returns BOTH entries. The "Related" block in EssayLayout / NoteLayout will then render two list items pointing at different URLs, both labeled "thesis". Authors who think they're linking to one piece will silently link to two.

Today there is no collision (verified: `essays/thesis.md` exists; no `notes/thesis.md`), so the bug is latent — but the architecture allows it without warning. Combined with **WR-02** (silent drop on missing), the entire `related` resolution path has zero failure visibility.

**Fix:** Resolve in collection-priority order and stop at the first hit per slug:

```ts
export async function resolveRelated(slugs: string[]): Promise<AnyEntry[]> {
  if (!slugs?.length) return [];
  const collections = ['essays', 'notes'] as const;
  const results: AnyEntry[] = [];
  for (const slug of slugs) {
    let found: AnyEntry | null = null;
    for (const c of collections) {
      try {
        const entry = await getEntry(c, slug);
        if (entry) {
          found = entry as AnyEntry;
          break;
        }
      } catch {
        // continue
      }
    }
    if (!found) {
      console.warn(`[relations] related slug not found in any collection: "${slug}"`);
      continue;
    }
    if (found.data.draft) {
      console.warn(`[relations] related slug points at draft: "${slug}"`);
      continue;
    }
    results.push(found);
  }
  return results;
}
```

### WR-02: `relations.ts` silently drops typo'd / missing related slugs — broken-link rot at scale

**File:** `src/lib/relations.ts:33-44`
**Issue:** The `try/catch` swallows any error from `getEntry`, and the `.filter(...)` drops entries that were drafts or `null`. There is no `console.warn` or build-time signal when a `related: [foo]` reference fails to resolve. Authors get no feedback that they've typo'd a slug, deleted a target, or pointed at a draft. The "Related" block silently shrinks.

For a writing surface where cross-linking is part of the editorial value (CD-03), this is a quiet decay vector — every refactor that renames a slug breaks every back-reference without warning.

**Fix:** Same as WR-01 — emit `console.warn` for unresolved / drafted slugs. In dev/build, those messages surface in the Astro build log. Optional stricter mode: throw if `process.env.STRICT_RELATIONS === '1'` so CI can fail on broken refs without breaking author feedback loops.

### WR-03: `BaseLayout.astro` Umami `src` template literal is fragile to env-var format

**File:** `src/layouts/BaseLayout.astro:88-95`
**Issue:** The script tag is built as:

```astro
<script defer src={`${umamiHost}/script.js`} data-website-id={umamiId} is:inline />
```

Two real problems with no validation:

1. If `PUBLIC_UMAMI_HOST` ends with `/` (a perfectly normal value, e.g., `https://umami.example.com/`), the resolved src becomes `https://umami.example.com//script.js` (double slash). Most servers accept this, but caches, CSPs, and signature-checking proxies may not.
2. If `PUBLIC_UMAMI_HOST` is set without protocol (e.g., `umami.crossthebridge.io`), the browser resolves `umami.crossthebridge.io/script.js` as a relative URL against the page origin → request to `https://crossthebridge.io/umami.crossthebridge.io/script.js` → 404 → analytics silently dies. There is no validation that `umamiHost` looks URL-shaped before emitting.

Combined with the existing three-way guard, a typo'd env var produces silent analytics loss with no error.

**Fix:** Normalize and validate at the layout boundary:

```ts
const umamiHostRaw = import.meta.env.PUBLIC_UMAMI_HOST;
const umamiId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID;

let umamiSrc: string | undefined;
if (umamiHostRaw) {
  try {
    const u = new URL(umamiHostRaw);
    if (u.protocol === 'https:' || u.protocol === 'http:') {
      umamiSrc = `${u.origin}/script.js`;
    }
  } catch {
    // invalid URL — fall through to undefined; guard below skips emission
  }
}
```

Then condition on `import.meta.env.PROD && umamiSrc && umamiId` and emit `src={umamiSrc}`.

### WR-04: `JsonLd.astro` BlogPosting / Article missing `url` and `mainEntityOfPage` correctness

**File:** `src/components/seo/JsonLd.astro:79-103`
**Issue:** Two structured-data correctness issues for article-shape pages:

1. **No `url` field on the BlogPosting / Article.** Schema.org and Google both treat `url` as the canonical pointer back to the rendered page. Without it, structured data parsers must infer the page URL from `mainEntityOfPage` or surrounding context. The current code passes `slug`-derived data through `EssayLayout`/`NoteLayout` but never sets `url` on the schema.
2. **`mainEntityOfPage: { '@id': '${siteUrl}/#website' }`** points at the WebSite node, not at the page itself. Per Schema.org, `mainEntityOfPage` should be a WebPage (or its `@id`). Pointing it at the WebSite is a graph error — Google's rich-results test will warn.

**Fix:** Layouts should pass page URL into `data`, and `JsonLd` should set both `url` and a per-page `mainEntityOfPage`:

EssayLayout / NoteLayout: add `url` to `jsonLdData`:
```ts
jsonLdData={{
  headline: title,
  datePublished: published.toISOString(),
  dateModified: updated?.toISOString(),
  description,
  url: new URL(canonical, Astro.site).toString(),
}}
```

JsonLd.astro: build `mainEntityOfPage` as the page URL `@id`, not the website:
```ts
const pageUrl = (data.url as string) ?? '';
const blogPosting: BlogPosting = {
  // ...
  url: pageUrl,
  mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl } as any,
  // ...
};
```

### WR-05: Glob-loader `id` already strips extension — `.replace(/\.md$/, '')` is dead code AND a latent bug for nested files

**File:** Many — `src/layouts/EssayLayout.astro:36`, `src/layouts/NoteLayout.astro:35`, `src/pages/essays/[slug].astro:21`, `src/pages/essays/index.astro:35`, `src/pages/essays/rss.xml.ts:23`, `src/pages/notes/[slug].astro:15`, `src/pages/notes/index.astro:35`, `src/pages/notes/rss.xml.ts:24`, `src/pages/rss.xml.ts:36`, `src/pages/topics/[tag].astro:34`, `src/pages/index.astro:111`, `src/pages/writing/index.astro:34`
**Issue:** Astro 6 `glob({ pattern: '**/*.md' })` returns `entry.id` already stripped of the file extension (per [Astro docs on the glob loader](https://docs.astro.build/en/reference/content-loader-reference/#glob-loader)). The pervasive `entry.id.replace(/\.md$/, '')` is a no-op today — but it signals an architectural misunderstanding that becomes a bug as soon as someone adds a nested file.

The route is `/essays/[slug].astro` — single segment. The loader pattern `**/*.md` recursively matches `essays/sub/foo.md` and emits `id = 'sub/foo'`. The dynamic route would either fail to match it or generate the URL `/essays/sub/foo` with `slug = 'sub/foo'` (depending on Astro's encoding behavior) — and the `.replace(/\.md$/, '')` strip would do nothing useful.

**Fix:** Either:
1. Drop the regex (it's a no-op) and rely on `entry.id` directly. Add a CI check (or schema-level invariant) that all collection files are flat under their collection root.
2. Or: switch the loader pattern to `*.md` (single-level) so any nested file fails the schema instead of silently producing a malformed slug.

I'd recommend option 2 + dropping the regex — the regex is a confused defense against a problem that doesn't exist (extensions) while leaving the real failure (nested files) silent.

### WR-06: `getEntry` semantic mismatch — passing slug works in Astro 6 but the comment misleads

**File:** `src/lib/relations.ts:13-15, 34`
**Issue:** Comment claims `Astro 6 getEntry(collection, slug)` accepts the slug part. Per Astro 6 docs, `getEntry` accepts the entry's `id` (the field exposed on `CollectionEntry`). Because the glob loader's `id` happens to equal the slug for flat files, the call works today. But the doc comment frames it as if `getEntry` has a "slug" mode separate from "id", which is incorrect — and any future change to the loader (different pattern, ext-included id, etc.) silently breaks resolution.

**Fix:** Update the comment to reflect reality: "`getEntry(collection, id)` — for the glob loader with a flat directory and `**/*.md`, `id` equals the slug-without-extension." Then make sure WR-05 fixes line up with this.

### WR-07: `tags.ts` does not URL-encode tag values used as static-path params

**File:** `src/pages/topics/[tag].astro:18-24`, `src/lib/tags.ts:26-33`
**Issue:** `getStaticPaths` returns `params: { tag }` directly from frontmatter strings. Today's tags are kebab-case (`freedom-tech`, `bitcoin`), so URLs are clean. Tomorrow's first author who uses `Open Source` (capital, space) gets:
- A topic URL of `/topics/Open Source` (unencoded space in build output → broken on most file systems / hosts)
- A title of `Topic: Open Source` (acceptable)

The `tags.ts` doc comment notes this is intentional ("fail loud at authoring time, not silently at aggregation time"), but no actual fail-loud check exists — the build will emit a path with a space and Vercel may serve it, may not, depending on encoding behavior. There's no Zod-level validation either.

**Fix:** Add a Zod refinement on the `tags` field:

```ts
const slugTag = z.string().regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, {
  message: 'tags must be lowercase kebab-case (a-z, 0-9, hyphen)',
});
const baseSchema = z.object({
  // ...
  tags: z.array(slugTag).default([]),
});
```

Now `astro check` (and the build) fails on any non-kebab tag at the source — exactly the "fail loud at authoring time" the comment promises but doesn't deliver.

### WR-08: `Nav.astro` `isActive` matches false-positive prefixes (`/about` vs `/about-us`)

**File:** `src/components/Nav.astro:28-31`
**Issue:** `isActive('/about')` returns true for `currentPath === '/about'` OR `currentPath.startsWith('/about/')`. That's correct for the documented case. But the regex `replace(/\/$/, '')` strips trailing slashes, then concatenates with a slash. The check `currentPath.startsWith('/about/')` is fine — `startsWith('/about/')` is correct, not `startsWith('/about')` — so `/about-us` does NOT match. Good catch by the implementation.

However: `currentPath.startsWith('/' + ...)` is computed without normalizing the `href` itself. If a future link is added with a trailing slash (`href: '/about/'`), the check breaks: `currentPath === '/about'` (after strip) and `href = '/about/'` — `startsWith('/about//')` always fails. Latent fragility.

**Fix:** Normalize `href` the same way as `currentPath`:

```ts
const isActive = (href: string) => {
  const norm = href.replace(/\/$/, '') || '/';
  if (norm === '/') return currentPath === '/';
  return currentPath === norm || currentPath.startsWith(`${norm}/`);
};
```

### WR-09: `Footer.astro` and `Nav.astro` link to routes that may not exist in Phase 02 deliverables

**File:** `src/components/Nav.astro:35-42`, `src/components/Footer.astro:21-26`
**Issue:** Both components link to `/about`, `/contact`, `/colophon`, and `/projects`. Phase 02 (writing-surface) does not deliver these pages — they are referenced but the files were not in this phase's diff. If any of these pages don't exist in the codebase, every layout-bearing page emits broken links to all of them.

I confirmed `colophon.astro` and `contact.astro` exist (by ls of src/pages). `/projects` (the index, not the project subpages) was not visible. If `/projects` returns a 404, the nav advertises a dead route on every page including the new writing routes shipped in this phase.

**Fix:** Either:
1. Verify `/projects/index.astro` exists and renders something (could be a list of the four project tiles, redirecting to homepage tiles, or stub-with-roadmap text). The phase ROADMAP / PLAN should be checked for whether this is owned here.
2. Remove `/projects` from the nav until Phase 03 ships the page.

This is a dead-link hazard, not a logic bug, but every Phase 02 page now ships with the broken nav link if `/projects` is missing.

## Info

### IN-01: `entry.body ?? ''` defends against an impossible nullish

**File:** `src/pages/essays/rss.xml.ts:29`, `src/pages/notes/rss.xml.ts:30`, `src/pages/rss.xml.ts:43`, `src/pages/essays/[slug].astro:32`
**Issue:** `entry.body` is typed as `string | undefined` only when the loader produces no body (e.g., MDX with no body content). For the markdown glob loader on `.md` files with content, `entry.body` is always a string. The `?? ''` is harmless defensive code, but it papers over a meaningful failure (an essay/note file with no body) by silently producing an empty RSS item.

**Fix:** If you want to keep the defense, log the case: `if (!entry.body) console.warn('[rss] empty body for', entry.id);`. Otherwise drop the `?? ''` and let TypeScript surface the type union.

### IN-02: Date `toLocaleDateString` is locale + timezone dependent at build time

**File:** `src/layouts/EssayLayout.astro:39-40`, `src/layouts/NoteLayout.astro:40-41`, `src/pages/writing/index.astro:39-43`
**Issue:** `dateFmt` calls `d.toLocaleDateString('en-US', {...})` with no timezone. The locale is pinned (good), but the timezone defaults to the build host's timezone (Vercel build images can vary). `getFullYear()` in `/writing/index.astro` is also local-time. A piece dated `2026-01-01T00:00:00Z` becomes year `2025` in a UTC-8 build host. The same piece becomes year `2026` in a UTC build host. Build-output drift.

**Fix:** Pin the timezone to UTC for deterministic output:

```ts
const dateFmt = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

// And in writing/index.astro:
const yearKey = String((entry.data.updated ?? entry.data.published).getUTCFullYear());
```

### IN-03: `JsonLd.astro` uses `as any` six times for `@id`-only refs — fragile escape hatch

**File:** `src/components/seo/JsonLd.astro:60, 86, 87, 88, 100, 111`
**Issue:** Every `@id`-only ref form uses `as any`. `schema-dts` types are strict about object shapes; the `as any` defeats type-checking entirely for those fields. A typo in `@id` (e.g., `'@is'`) compiles fine and silently emits an invalid schema.

**Fix:** Define a typed helper for `@id` refs:

```ts
type IdRef<T> = { '@id': string } & Partial<T>;

const idRef = <T,>(id: string): IdRef<T> => ({ '@id': id });

// Usage:
publisher: idRef<Person>(PERSON_ID),
```

The `Partial<T>` keeps schema-dts narrowing intact while allowing the `@id`-only ref form. No more `as any`.

### IN-04: `lib/tags.ts` does no case-insensitive dedupe — documented but worth a guard

**File:** `src/lib/tags.ts:31`
**Issue:** Same concern as WR-07 from the dedupe angle: `Array.from(new Set(all)).sort()` does case-sensitive Set deduplication. `Privacy` and `privacy` produce two distinct topic pages. The doc comment says "fail loud at authoring time" but there's no actual failure mode — the loud part is missing.

**Fix:** Combine with WR-07: a Zod regex on tags eliminates the case-mixing problem at the schema level. Once that's in, this concern goes away.

### IN-05: `EssayLayout.astro` reading-time has no graceful fallback for short essays

**File:** `src/pages/essays/[slug].astro:32-33`
**Issue:** `wordCount >= 500` gating means essays under 500 words display no reading-time. Documented as CD-09. The 500-word threshold is hardcoded; if Wesley wants to surface "2 min read" on a tighter essay, he has to edit the file. This is a config-as-code choice, not a bug — but the magic number `500` should be pulled into a named constant for future tuning visibility.

**Fix:** Extract `MIN_WORDS_FOR_READING_TIME = 500` and `WORDS_PER_MINUTE = 250` as named constants at the top of the file. Pure readability win.

---

_Reviewed: 2026-04-30T19:39:13Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
