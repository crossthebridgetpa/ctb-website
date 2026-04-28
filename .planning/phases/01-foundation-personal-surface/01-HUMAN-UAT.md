---
status: partial
phase: 01-foundation-personal-surface
source: [01-VERIFICATION.md]
started: 2026-04-28T11:35:00Z
updated: 2026-04-28T11:35:00Z
---

## Current Test

[awaiting human testing — gated on Wesley running 01-10-LAUNCH-CHECKLIST.md ops session first; once a real preview URL exists, items 1-5 can be exercised]

## Tests

### 1. Visual OG card preview in Discord/Telegram/X
expected: Pasting any wesleyschlemmer.com URL into a Discord/Telegram/X message renders a rich preview with the OG card (cream background, "Cross The Bridge" wordmark, "by Wesley Schlemmer" corner text), correct page title, correct meta description.
result: [pending — requires deployed staging.wesleyschlemmer.com URL]

### 2. Google Rich Results Test
expected: Pasting `https://staging.wesleyschlemmer.com/`, `/about`, and one project page URL into https://search.google.com/test/rich-results validates JSON-LD structured data with no errors. WebSite (homepage) + Person (about) + BreadcrumbList (project pages) all valid.
result: [pending — requires deployed URL]

### 3. Lighthouse Accessibility ≥95
expected: Running Chrome DevTools Lighthouse audit (Accessibility category) on `/`, `/about`, and project pages each return a score ≥95. Per ROADMAP success criterion 5.
result: [pending — requires deployed URL]

### 4. indiewebify.me h-card validation
expected: Pasting `https://staging.wesleyschlemmer.com/about` into https://indiewebify.me confirms h-card microformats parse correctly: name, photo, job title, url all extracted. Per RESEARCH §h-card recommendation for SEO-06 hedge.
result: [pending — requires deployed URL]

### 5. Network audit on real Vercel preview
expected: First PR triggers Vercel preview deploy; CI workflow runs `tests/network-audit.spec.ts` against the preview URL; Playwright reports zero contacts to banned hosts (Google, GA, Vercel surveillance scripts, third-party iframes); only allow-listed `umami.crossthebridge.io` may be contacted (and only if `PUBLIC_UMAMI_*` env vars are set). Per ROADMAP success criterion 5 + INFRA-02 + PRIV-04.
result: [pending — requires Vercel project setup + first PR]

### 6. Public reachability at staging.wesleyschlemmer.com (deferred operator step)
expected: After Wesley completes the 01-10-LAUNCH-CHECKLIST.md ops session (Vercel project setup, dual-zone DNS records, Umami Docker stack provisioning), `https://staging.wesleyschlemmer.com/` returns 200 and serves the new Astro build. Legacy `crossthebridge.io` apex continues serving its own (untouched) single-page consulting site.
result: [pending — Wesley's ops session work; canonical guide at `01-10-LAUNCH-CHECKLIST.md`]

## Summary

total: 6
passed: 0
issues: 0
pending: 6
skipped: 0
blocked: 0

## Gaps

[none yet — all 6 items are post-deploy verification, not code gaps]

## Notes

**Code-side: 26/26 requirements verified passing.** All Phase 1 code shipped. The 6 items above are the deployment-and-verification work that closes the loop after Wesley runs the launch checklist.

**Two known items shipped as "review-post-launch" by orchestrator decision (NOT verification gaps):**

- About page (01-08) thesis + bio drafts (Claude-authored, ~210 + ~255 words) — Wesley reviews on the live site or via direct file edit. Source draft at `01-08-DRAFT.md`.
- Cross The Bridge teaser (01-09) body copy (Claude-authored, ≤300 words) — Wesley reviews on the live site or via direct file edit. Source draft at `01-09-CTB-DRAFT.md`.

These don't appear in this UAT because they're content-quality reviews (not implementation verification). They live in STATE.md "Pending Todos" and surface in `/gsd-progress`.
