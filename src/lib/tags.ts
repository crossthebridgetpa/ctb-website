/**
 * tags.ts — aggregates tags across `essays` and `notes` collections.
 *
 * CD-04: open taxonomy (any tag in any frontmatter `tags: [...]` array
 * generates a /topics/[tag] page). No whitelist. Empty pages cannot exist
 * — a tag only renders if at least one piece references it (getStaticPaths
 * derives its tag list from getAllTags()).
 *
 * D-28: drafts excluded from aggregation so a topic page only lists
 * published content. The filter callback inside getCollection is the
 * canonical exclusion point — Astro skips drafts at the loader level.
 *
 * Tag slugs are lowercase + hyphenated. Frontmatter authors should use the
 * same form ("freedom-tech", not "Freedom Tech") to avoid silent dedupe
 * misses. This module does NOT lowercase/normalize for them — fail loud at
 * authoring time, not silently at aggregation time.
 *
 * WRITE-07 / CD-04 contract: getAllTags() returns the deduped, sorted list
 * of every tag in use; getEntriesByTag(tag) returns essays + notes carrying
 * that tag, sorted by published-date desc. Topic pages call both.
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
    getCollection('essays', ({ data }) => !data.draft && (data.tags ?? []).includes(tag)),
    getCollection('notes', ({ data }) => !data.draft && (data.tags ?? []).includes(tag)),
  ]);
  return [...essays, ...notes].sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );
}
