/**
 * /essays/rss.xml — essays-only feed, full HTML content per CD-05.
 *
 * Same shape as /rss.xml but scoped to the essays collection.
 * D-28 drafts excluded. `marked` converts markdown body to HTML for feed readers.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { marked } from 'marked';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('Astro.site is undefined — set PUBLIC_SITE_URL in astro.config.mjs');
  }
  const essays = (await getCollection('essays', ({ data }) => !data.draft))
    .sort((a, b) => (b.data.updated ?? b.data.published).valueOf() - (a.data.updated ?? a.data.published).valueOf());
  return rss({
    title: 'Wesley Schlemmer — Essays',
    description: 'Long-form essays by Wesley Schlemmer.',
    site: context.site,
    items: await Promise.all(essays.map(async (entry) => {
      const slug = entry.id.replace(/\.md$/, '');
      return {
        title: entry.data.title,
        pubDate: entry.data.published,
        description: entry.data.description,
        link: `/essays/${slug}`,
        content: await marked(entry.body ?? ''),
      };
    })),
    customData: '<language>en-us</language>',
  });
}
