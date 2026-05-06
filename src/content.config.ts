/**
 * Astro content collections — essays + notes (Phase 2).
 *
 * Schemas declared per Phase 2 CONTEXT.md decision CD-06. Field rationale:
 *   - title / description: required for OG, RSS <description>, JSON-LD headline.
 *   - published: required at publish (D-30). z.coerce.date() accepts ISO date strings.
 *   - updated: optional (D-30). Set when a published piece is meaningfully revised.
 *     Git commit date is NOT used — typo fixes would falsely look like content updates.
 *   - subtitle: optional. Used in EssayLayout under the H1.
 *   - tags: default []. CD-04 open taxonomy. lib/tags.ts aggregates these.
 *   - related: default []. CD-03 manual cross-collection slug refs. lib/relations.ts resolves.
 *   - draft: default false. D-28 single chokepoint — drafts excluded from build,
 *     RSS, sitemap, related lookups, topic pages, homepage Recent Writing.
 *   - featured: default false. CD-01 library-mode discipline — homepage + /writing
 *     hub surface featured pieces first, NOT a reverse-chrono "Latest" feed.
 *   - status (notes only): CD-02 'seedling' | 'budding' | 'evergreen'. Surfaced
 *     as a small badge on note pages and the /notes index. Default 'seedling'.
 *
 * NOTE: Astro 6 deprecated `src/content/config.ts` in favor of
 * `src/content.config.ts` (this file). See:
 * https://docs.astro.build/en/guides/upgrade-to/v6/#removed-legacy-content-collections
 *
 * Loader: `glob()` from 'astro/loaders' is the Astro 6 canonical pattern
 * (replaces the deprecated `type: 'content'` shorthand from Astro 5).
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * WR-07: tags must be strict kebab-case — lowercase letters + single hyphens.
 * No digits, no underscores, no leading/trailing hyphens, no double hyphens.
 * Catches authoring typos at build time (Bitcoin vs bitcoin; self_host vs self-host).
 * Verified against the existing corpus 2026-05-06 — every published tag matches.
 */
const kebabCaseTag = z
  .string()
  .regex(
    /^[a-z]+(-[a-z]+)*$/,
    'Tag must be strict kebab-case: lowercase letters with single hyphens (e.g. "freedom-tech"). No digits, no underscores, no leading/trailing hyphens.'
  );

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  published: z.coerce.date(),
  updated: z.coerce.date().optional(),
  subtitle: z.string().optional(),
  tags: z.array(kebabCaseTag).default([]),
  related: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
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
