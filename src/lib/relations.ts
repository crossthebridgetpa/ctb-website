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
 *
 * Slug shape: callers pass the SLUG (not the file id with `.md` extension).
 * Astro 6 `getEntry(collection, slug)` accepts the slug part only; this
 * matches how `getStaticPaths` derives params via `entry.id.replace(/\.md$/, '')`.
 *
 * Diverges from .planning/research/ARCHITECTURE.md Pattern 3 (lines 277-289):
 *   - ARCHITECTURE includes 'projects' in the collections tuple.
 *     Phase 2 has no `projects` collection (project pages are hand-authored
 *     under `src/pages/projects/`). Tuple is `['essays', 'notes']` only.
 *   - ARCHITECTURE does not filter drafts. We add the D-28 filter here so the
 *     draft-exclusion invariant lives at every loader-level chokepoint.
 */
import { getEntry, type CollectionEntry } from 'astro:content';

type AnyEntry = CollectionEntry<'essays'> | CollectionEntry<'notes'>;

export async function resolveRelated(slugs: string[]): Promise<AnyEntry[]> {
  if (!slugs?.length) return [];
  const collections = ['essays', 'notes'] as const;
  const candidates = await Promise.all(
    slugs.flatMap((slug) =>
      collections.map(async (c): Promise<AnyEntry | null> => {
        try {
          const entry = await getEntry(c, slug);
          return (entry ?? null) as AnyEntry | null;
        } catch {
          return null;
        }
      })
    )
  );
  return candidates.filter(
    (e): e is AnyEntry => e !== null && !e.data.draft
  );
}
