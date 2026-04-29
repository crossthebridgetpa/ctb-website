/**
 * /notes/rss.xml — notes-only feed, full HTML content per CD-05.
 *
 * Notes are shorter and update more often; recency-aware feed for the
 * peer audience that wants the more frequent surface.
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
  const notes = (await getCollection('notes', ({ data }) => !data.draft))
    .sort((a, b) => (b.data.updated ?? b.data.published).valueOf() - (a.data.updated ?? a.data.published).valueOf());
  return rss({
    title: 'Wesley Schlemmer — Notes',
    description: 'Short notes by Wesley Schlemmer — observations, decisions, annotated bookmarks.',
    site: context.site,
    items: await Promise.all(notes.map(async (entry) => {
      const slug = entry.id.replace(/\.md$/, '');
      return {
        title: entry.data.title,
        pubDate: entry.data.published,
        description: entry.data.description,
        link: `/notes/${slug}`,
        content: await marked(entry.body ?? ''),
      };
    })),
    customData: '<language>en-us</language>',
  });
}
