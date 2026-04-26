// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://staging.crossthebridge.io',
  output: 'static',
  trailingSlash: 'never',

  adapter: vercel({
    imageService: true,
  }),

  integrations: [sitemap(), mdx()],

  vite: {
    plugins: [tailwindcss()],
  },

  // fonts: [...] — added by PLAN-02 (Astro Fonts API + Fontsource provider).
  // Importing `fontProviders` above so PLAN-02's diff is isolated to the array body.
});
