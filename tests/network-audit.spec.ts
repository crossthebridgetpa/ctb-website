import { test, expect } from '@playwright/test';

const BANNED_HOSTS = [
  // Google
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'google-analytics.com',
  'googletagmanager.com',
  'www.google-analytics.com',
  'www.googletagmanager.com',
  // Social embeds (Phase 1 has none — defense in depth)
  'youtube.com',
  'youtu.be',
  'twitter.com',
  'x.com',
  // Booking widget (Phase 1's Cross The Bridge teaser links OUT to crossthebridge.io but does NOT
  // embed a Motion booking iframe; defense in depth covers any future regression)
  'usemotion.com',
  // Vercel Web Analytics + Speed Insights (Pitfall A — operator must keep dashboard toggles OFF)
  'va.vercel-scripts.com',
  'vitals.vercel-insights.com',
];

// Allow-list: own origin + the Umami analytics host.
// PUBLIC_UMAMI_HOST = https://umami.crossthebridge.io per D-14 (CTB DNS zone — Wesley owns
// both wesleyschlemmer.com and crossthebridge.io zones, so analytics-host location does not
// affect visitor privacy). The Vercel project env config (PLAN-10 launch checklist) sets this.
const UMAMI_HOST = process.env.PUBLIC_UMAMI_HOST
  ? new URL(process.env.PUBLIC_UMAMI_HOST).hostname
  : null;

// 8 Phase 1 routes (post 01-09 path rename: /projects/cross-the-bridge is the
// canonical third project page; /404 added for completeness — the custom 404 page from 01-07).
// Note: /about is included even though 01-08 is paused awaiting Wesley's draft review;
// the audit will fail on /about until 01-08 ships, which is captured in the launch
// checklist as a pre-cutover gate.
const ROUTES = [
  '/',
  '/about',
  '/projects/bitcoin-bay',
  '/projects/fbba',
  '/projects/cross-the-bridge',
  '/contact',
  '/colophon',
  '/404',
];

const PREVIEW = process.env.PREVIEW_URL ?? 'http://localhost:4321';
const PREVIEW_HOST = new URL(PREVIEW).hostname;

function isBanned(host: string): boolean {
  return BANNED_HOSTS.some((b) => host === b || host.endsWith(`.${b}`));
}

function isAllowed(host: string): boolean {
  if (host === PREVIEW_HOST) return true;
  if (UMAMI_HOST && host === UMAMI_HOST) return true;
  return false;
}

for (const route of ROUTES) {
  test(`${route} contacts no banned third-party domains on first paint`, async ({ page }) => {
    const violations: string[] = [];
    const allRequests: string[] = [];

    page.on('request', (req) => {
      const url = req.url();
      allRequests.push(`${req.method()} ${url}`);
      let host: string;
      try {
        host = new URL(url).hostname;
      } catch {
        return;
      }
      if (isBanned(host)) {
        violations.push(`BANNED: ${req.method()} ${url}`);
      }
      // Note: we do NOT fail on non-allowed hosts that aren't explicitly banned —
      // that would be too aggressive (e.g., HTTP CONNECT proxies, browser internals).
      // Banned-host enforcement is the contract; allow-list is informational only.
      // isAllowed() is exposed for ad-hoc diagnosis.
      void isAllowed;
    });

    // /404 returns 404, but Astro renders the 404.astro page — the network audit still applies
    // because we care about what THAT page loads. Allow non-2xx responses for the /404 route only.
    const expect2xx = route !== '/404';
    const response = await page.goto(`${PREVIEW}${route}`, { waitUntil: 'load' });
    if (expect2xx) {
      expect(response?.ok(), `${route} should return 2xx (got ${response?.status()})`).toBeTruthy();
    } else {
      // /404 explicitly returns 404; the page still renders fully — verify it loaded HTML
      expect(response?.status(), `/404 should return 404`).toBe(404);
    }

    // Report-all posture (RESEARCH Open Q #9): list every violation, don't bail on first.
    expect(
      violations,
      `Banned third-party requests on ${route}:\n${violations.join('\n')}\n\nAll requests for context:\n${allRequests.join('\n')}`
    ).toEqual([]);
  });
}
