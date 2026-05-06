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
 * WR-01/WR-02 (Phase 02.1): missing slugs produce a build-time warning;
 * slugs that exist in BOTH essays and notes log a duplicate warning and
 * resolve to the essays hit (stop-at-first-hit, essays first).
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

  const resolved: AnyEntry[] = [];
  for (const slug of slugs) {
    // Try essays first, then notes — sequential per WR-02 stop-at-first-hit.
    let essayHit: AnyEntry | null = null;
    let noteHit: AnyEntry | null = null;

    try {
      const e = await getEntry('essays', slug);
      essayHit = (e ?? null) as AnyEntry | null;
    } catch {
      essayHit = null;
    }

    try {
      const n = await getEntry('notes', slug);
      noteHit = (n ?? null) as AnyEntry | null;
    } catch {
      noteHit = null;
    }

    if (essayHit && noteHit) {
      // WR-02: same slug in both collections is a content-authoring smell.
      // Warn once, return the essays hit (essays wins per stop-at-first-hit).
      console.warn(
        `[relations] related slug "${slug}" exists in both essays and notes; using essays. Rename one to disambiguate.`
      );
      resolved.push(essayHit);
    } else if (essayHit) {
      resolved.push(essayHit);
    } else if (noteHit) {
      resolved.push(noteHit);
    } else {
      // WR-01: missing slug — warn at build so authoring typos surface in Vercel logs.
      console.warn(
        `[relations] related slug "${slug}" not found in essays or notes. Check frontmatter for typos.`
      );
    }
  }

  // D-28: drop drafts so a published page never points at an unpublished one.
  return resolved.filter((e) => !e.data.draft);
}
