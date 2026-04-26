/**
 * The CTA target URL for the AI/Petros/Hermes project page (D-05).
 *
 * Phase 1 staging: env var = `https://crossthebridge.io` (apex still serves
 * the legacy single-page consulting site; client URL points there until
 * Phase 3 cuts over).
 *
 * Phase 3 cutover: unset PUBLIC_CONSULTING_URL → falls back to `/consulting`
 * (the new in-repo route).
 *
 * Why PUBLIC_*: Astro inlines only PUBLIC_-prefixed env vars into client
 * bundles. Without the prefix, `import.meta.env.CONSULTING_URL` would be
 * `undefined` at build time (Pitfall H, RESEARCH.md line 1208).
 */
export const consultingUrl: string =
  import.meta.env.PUBLIC_CONSULTING_URL ?? '/consulting';
