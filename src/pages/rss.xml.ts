/**
 * /rss.xml — combined feed (essays + notes), full content per CD-05.
 *
 * Per .planning/research/PITFALLS.md §11 (RSS broken):
 *   - Use the official @astrojs/rss helper (NOT roll-your-own XML).
 *   - Validate at https://validator.w3.org/feed/ before launch (Wave 4 audit).
 *   - Test in NetNewsWire / Reeder before public link.
 *
 * D-28 drafts excluded via getCollection filter callback.
 * Sort key: updated ?? published, descending.
 *
 * CD-05: full body content in <description>. Peer audience reads in feed
 * readers; full content removes the click-through nag.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { marked } from 'marked';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('Astro.site is undefined — set PUBLIC_SITE_URL in astro.config.mjs');
  }
  const [essays, notes] = await Promise.all([
    getCollection('essays', ({ data }) => !data.draft),
    getCollection('notes', ({ data }) => !data.draft),
  ]);
  const all = [...essays, ...notes].sort(
    (a, b) => (b.data.updated ?? b.data.published).valueOf() - (a.data.updated ?? a.data.published).valueOf()
  );
  return rss({
    title: 'Wesley Schlemmer — Writing',
    description: 'Essays and notes — Freedom Tech, Bitcoin, sovereign AI, opting out of legacy systems.',
    site: context.site,
    items: await Promise.all(all.map(async (entry) => {
      const slug = entry.id.replace(/\.md$/, '');
      const link = entry.collection === 'essays' ? `/essays/${slug}` : `/notes/${slug}`;
      return {
        title: entry.data.title,
        pubDate: entry.data.published,
        description: entry.data.description,
        link,
        content: await marked(entry.body ?? ''),
      };
    })),
    customData: '<language>en-us</language>',
  });
}
