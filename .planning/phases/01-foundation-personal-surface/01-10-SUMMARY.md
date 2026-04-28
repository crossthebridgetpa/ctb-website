---
phase: 01-foundation-personal-surface
plan: 10
subsystem: ci-launch-gate
tags:
  - ci
  - playwright
  - network-audit
  - vercel
  - dns
  - launch-gates
  - d-20-pivot
  - middle-path-execution
requires:
  - "playwright >=1.59 installed as devDependency (PLAN-01)"
  - "vercel.json with PLAN-01 security headers (preserved on append)"
  - "Phase 1 routes on disk (/, /404, /contact, /colophon, /projects/{bitcoin-bay,fbba,cross-the-bridge}); /about deferred to 01-08 ship"
provides:
  - "playwright.config.ts (Chromium project, PREVIEW_URL baseURL, CI reporter list+github)"
  - "tests/network-audit.spec.ts (8-route banned-host audit; Umami allow-list via PUBLIC_UMAMI_HOST)"
  - ".github/workflows/ci.yml (PR build job + network-audit job depending on build)"
  - "vercel.json (preserves 5 PLAN-01 security headers + adds X-Robots-Tag noindex on *.vercel.app preview hosts)"
  - "01-10-LAUNCH-CHECKLIST.md (Vercel + dual-zone DNS + Umami ops checklist for Wesley's separate ops session)"
affects:
  - "vercel.json (extended; PLAN-01 headers preserved)"
tech-stack-added:
  - "patrickedqvist/wait-for-vercel-preview@v1.3.1 (GitHub Action; pinned per RESEARCH §Code Examples Example 3)"
patterns:
  - "Two-job CI pipeline (build feeds network-audit) gating PR merge to main via branch protection"
  - "Vercel `has` clause regex `(?<host>.+\\.vercel\\.app)` to scope X-Robots-Tag to preview hosts only — production hostnames unaffected"
  - "Three-way analytics guard: build only emits Umami script when PROD && PUBLIC_UMAMI_HOST && PUBLIC_UMAMI_WEBSITE_ID — fail-safe to no-analytics until UUID is issued"
key-files:
  created:
    - "playwright.config.ts"
    - "tests/network-audit.spec.ts"
    - ".github/workflows/ci.yml"
    - ".planning/phases/01-foundation-personal-surface/01-10-LAUNCH-CHECKLIST.md"
  modified:
    - "vercel.json"
decisions:
  - "Network audit ROUTES list lists /about even though 01-08 is paused; the audit will fail on /about until 01-08 ships and that gap is captured in the launch checklist as a pre-cutover gate. This keeps the spec authored against the full intended Phase 1 surface and avoids a future patch"
  - "Vercel `has` regex pattern uses escaped dots `(?<host>.+\\.vercel\\.app)` — functionally matches branch-project.vercel.app preview hosts and rejects production hostnames staging.wesleyschlemmer.com / wesleyschlemmer.com"
  - "Task 3 (the user_setup checkpoint) was scoped to documentation-only per the orchestrator's 'middle path' execution mode: the launch checklist artifact is authored in this run, but the actual Vercel/DNS/Umami operations are deferred to Wesley's out-of-band ops session"
metrics:
  duration: "5m execution time (Tasks 1+2+launch checklist)"
  tasks_completed: 3
  files_changed: 5
  completed_date: "2026-04-28"
---

# Phase 1 Plan 10: CI Network Audit + Launch Checklist Summary

CI pipeline shipped: every PR runs astro check + build + Playwright network audit against the Vercel preview URL, blocking merge unless zero requests hit the 13 banned third-party hosts (Google fonts/analytics, social embeds, Motion booking widget, Vercel Web Analytics + Speed Insights). vercel.json adds `X-Robots-Tag: noindex, nofollow` on `*.vercel.app` preview hosts only, leaving production unaffected. Launch checklist authored at `.planning/phases/01-foundation-personal-surface/01-10-LAUNCH-CHECKLIST.md` capturing the dual-zone DNS pattern (wesleyschlemmer.com + crossthebridge.io for Umami), Vercel project provisioning, Umami Docker stack on the VPS, and GitHub branch protection.

## Execution Context

This run executed only Tasks 1 and 2 plus the documentation portion of Task 3 (the launch checklist artifact). Wesley explicitly chose "middle path" execution mode: autonomous code changes ship in this session; the user_setup operations (Vercel dashboard, DNS A/CNAME records on two zones, Umami Docker stack on the VPS, GitHub branch protection) run in a separate ops session that Wesley walks through manually using the launch checklist as the canonical guide. The checkpoint:human-action of Task 3 was therefore not paused on; instead the artifact Wesley reads during that ops session was authored in advance.

The orchestrator owns STATE.md and ROADMAP.md updates — those files are not modified in this commit set per the parallel-execution contract.

## Tasks Completed

| Task | Name                                                                                       | Commit  | Files                                                                                |
| ---- | ------------------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------ |
| 1    | Author playwright.config.ts + tests/network-audit.spec.ts                                  | 14b9a3a | playwright.config.ts, tests/network-audit.spec.ts                                    |
| 2    | Author .github/workflows/ci.yml + append X-Robots-Tag preview noindex to vercel.json       | 4b161a4 | .github/workflows/ci.yml, vercel.json                                                |
| 3-doc| Author launch checklist (Task 3 documentation portion only; ops deferred)                  | 3be1f59 | .planning/phases/01-foundation-personal-surface/01-10-LAUNCH-CHECKLIST.md            |

## What Was Built

### Task 1 — Playwright config + network audit spec

`playwright.config.ts` (project root) configures a single Chromium project with `baseURL` sourced from `PREVIEW_URL` env (falls back to `http://localhost:4321` for local runs), `forbidOnly` and 2 retries when `CI=true`, reporter `list` + `github` in CI. Default headless via Playwright's defaults; traces enabled `on-first-retry`.

`tests/network-audit.spec.ts` defines:
- `BANNED_HOSTS` — 13 hosts: Google ×6 (fonts.googleapis.com, fonts.gstatic.com, google-analytics.com, googletagmanager.com, www.google-analytics.com, www.googletagmanager.com), social embeds ×4 (youtube.com, youtu.be, twitter.com, x.com), Motion booking widget ×1 (usemotion.com), Vercel surveillance ×2 (va.vercel-scripts.com, vitals.vercel-insights.com — Pitfall A defense in depth)
- `UMAMI_HOST` — derived from `PUBLIC_UMAMI_HOST` env (umami.crossthebridge.io per D-14 — the analytics endpoint stays on the CTB DNS zone post-D-20 pivot since Wesley owns both zones)
- `ROUTES` — 8 routes: `/`, `/about`, `/projects/bitcoin-bay`, `/projects/fbba`, `/projects/cross-the-bridge`, `/contact`, `/colophon`, `/404`. The third project route is the post-01-09-rename canonical name; the pre-pivot `/projects/ai-petros-hermes` path does NOT appear anywhere in the spec
- Suffix-match logic: `host === b || host.endsWith(\`.${b}\`)` catches subdomains (e.g., `embed.x.com`) while avoiding tail-matches like `xmyfox.com` matching `x.com`
- `/404` route tolerates a 404 status code (asserts exactly 404, not 2xx); banned-host check still applies
- Report-all posture: every violation collected and listed in the failure message; doesn't bail on first

`npx playwright test --list` enumerates 8 tests cleanly.

### Task 2 — GitHub Actions CI + Vercel preview noindex

`.github/workflows/ci.yml`:
- `build` job — checkout → setup-node@v4 with Node 22 + npm cache → `npm ci` → `npx astro check` → `npx astro build`. Build step receives `PUBLIC_SITE_URL`, `PUBLIC_UMAMI_HOST`, `PUBLIC_UMAMI_WEBSITE_ID`, `PUBLIC_CONSULTING_URL` from GitHub Actions secrets so JsonLd canonical and Umami env values resolve correctly in the static output
- `network-audit` job — `needs: build`. Checkout → setup-node@v4 → `npm ci` → `npx playwright install --with-deps chromium` → `patrickedqvist/wait-for-vercel-preview@v1.3.1` to capture the preview URL → `npx playwright test` with `PREVIEW_URL` and `PUBLIC_UMAMI_HOST` injected
- Permissions scoped to `contents: read` and `deployments: read`

`vercel.json` extension:
- All 5 PLAN-01 security headers preserved (X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, HSTS 2-year + includeSubDomains + preload, Permissions-Policy disallowing camera/mic/geolocation)
- Second `headers` entry added with `has: [{ type: host, value: "(?<host>.+\\.vercel\\.app)" }]` and a single header `X-Robots-Tag: noindex, nofollow`. The regex matches preview hostnames like `branch-project.vercel.app` and does NOT match production hostnames `staging.wesleyschlemmer.com` or `wesleyschlemmer.com`. Verified functionally with Python `re.fullmatch` against both preview and production hostname samples

### Task 3-doc — Launch checklist artifact

`01-10-LAUNCH-CHECKLIST.md` (132 lines) captures every manual operator step Wesley needs to perform during the ops session:
1. Vercel project setup (Web Analytics OFF, Speed Insights OFF, Preview Password OFF, Node 22, framework=Astro auto-detected)
2. Vercel env vars split between Production (`PUBLIC_SITE_URL=https://wesleyschlemmer.com`) and Preview (`PUBLIC_SITE_URL=https://staging.wesleyschlemmer.com`); `PUBLIC_UMAMI_HOST=https://umami.crossthebridge.io` per D-14; `PUBLIC_UMAMI_WEBSITE_ID` left blank until Umami issues UUID; `PUBLIC_CONSULTING_URL=https://crossthebridge.io`
3. DNS for `wesleyschlemmer.com` zone — staging CNAME + apex A/ALIAS to Vercel
4. DNS for `crossthebridge.io` zone — `umami` A record to VPS IP only; apex EXPLICITLY UNTOUCHED (still serves legacy single-page CTB site)
5. Umami Docker stack provisioning on VPS — Postgres + Umami container behind reverse proxy with TLS for `umami.crossthebridge.io`; first-login password change; "Add website" UUID issuance
6. GitHub repo secrets (4 PUBLIC_* values) + branch protection on `main` requiring `build` and `network-audit` checks
7. Pre-launch verification: First PR CI green, network audit on staging, Lighthouse, Rich Results, indiewebify h-card, OG previews across messengers, mobile nav, dark mode, skip-link, mailto obfuscation, PRIV-01 fonts.googleapis.com spot check, domain-constants leak audit, external CTAs alive, cross-zone `dig` sanity
8. Apex cutover after staging verification
9. Post-launch hygiene — remove staging CNAME when no longer needed (T-10-04 dangling-CNAME takeover prevention)
10. 7-day Umami operational-load revisit gate (CONTEXT.md `<deferred>` per 01-04-UMAMI-DECISION.md)

A note at the top of the checklist warns that 01-08 (the About page) must ship before the network audit will pass on a real preview URL — `/about` is in the ROUTES list intentionally, against the full intended Phase 1 surface.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Plan's vercel.json verification assertion has a flaw — actual JSON is correct**
- **Found during:** Task 2 verification step
- **Issue:** The plan's `<verify>` block contains `python3 -c "import json; d=json.load(open('vercel.json')); assert any('vercel.app' in str(h.get('has',[])) for h in d['headers']), 'no vercel.app match in has clause'"`. With the standard Vercel-recommended regex `(?<host>.+\\.vercel\\.app)` (escaped dots, the canonical pattern from Vercel docs), Python's `str()` on the parsed dict re-escapes backslashes so the rendered string is `[{'type': 'host', 'value': '(?<host>.+\\\\.vercel\\\\.app)'}]`. The literal substring `vercel.app` (with an unescaped dot) does NOT appear in that rendering — there's `vercel\\.app` (with backslash-dot) instead.
- **Fix:** No code change needed. The vercel.json file is functionally correct: the regex `(?<host>.+\\.vercel\\.app)` (which becomes `(?<host>.+\.vercel\.app)` after JSON-parse) properly matches `*.vercel.app` preview hosts and rejects production hostnames. Verified directly with `re.fullmatch(pattern, 'branch-project.vercel.app')` → MATCH and `re.fullmatch(pattern, 'wesleyschlemmer.com')` → NO MATCH.
- **Files modified:** None (the plan's verify script is a documentation artifact, not committed code)
- **Commit:** N/A — substituted equivalent functional verification (`re.fullmatch` against representative hostnames, plus substring check that `vercel` and `app` both appear in the value)

### Scope adjustments

**2. [Task scope override per orchestrator] Task 3 executed as documentation-only**
- **Source:** Explicit `<task_scope_override>` instruction from the parent orchestrator
- **Action:** Task 3's `checkpoint:human-action` was NOT paused on; instead the launch checklist artifact (one of the two deliverables Task 3 produces — the other being the actual Vercel/DNS/Umami operations) was authored autonomously. The actual ops session is deferred to Wesley out-of-band.
- **Status:** Tracked as expected; SUMMARY (this file) and the launch checklist make the deferred work visible to STATE.md / ROADMAP.md updates by the orchestrator

### Routes-list note

**3. [Plan as written] /about included in audit ROUTES despite 01-08 being paused**
- **Note:** The plan's must-haves explicitly list `/about` in the ROUTES array. 01-08 has not yet shipped (paused awaiting Wesley's About-page draft review). The audit spec follows the plan exactly, listing `/about` as one of the 8 routes. The launch checklist captures this gap as a pre-cutover gate ("ensure 01-08 ships before running CI against a real preview URL"). No code adjustment — the spec is correct; the data state catches up to it when 01-08 ships.

## Authentication / External-Surface Gates

None encountered during this run. All Tasks 1 + 2 + 3-doc are fully autonomous (file writes, JSON edits, YAML config). The actual Vercel + dual-zone DNS + Umami provisioning is the deferred ops work captured in the launch checklist; that ops session will hit Vercel dashboard auth, DNS provider auth, VPS SSH, and GitHub repo settings — all expected and explicitly out-of-band per Wesley's middle-path mode.

## Verification Performed in This Run

- `playwright.config.ts` parses (Playwright tooling reads it during `--list`)
- `tests/network-audit.spec.ts` parses + Playwright enumerates exactly 8 tests, one per Phase 1 route, none for `/projects/ai-petros-hermes`
- `npx playwright --version` returns 1.59.1 (matches package.json)
- `vercel.json` is valid JSON; preserves all 5 PLAN-01 security headers; adds the `has`-gated `X-Robots-Tag` header
- Vercel-`has` regex functionally matches `*.vercel.app` and rejects `wesleyschlemmer.com` / `staging.wesleyschlemmer.com`
- `.github/workflows/ci.yml` contains both jobs (`build`, `network-audit`) with `needs: build` dependency, Node 22, `wait-for-vercel-preview@v1.3.1`, all four `PUBLIC_*` env vars, `npx playwright test` step with `PREVIEW_URL` from `steps.preview.outputs.url`
- `npx astro check` passes with 0 errors / 0 warnings (regression check: no breakage from new files)
- All Task 1 grep-based assertions pass (after fixing the comment that mentioned the deprecated path)
- All Task 2 grep + JSON assertions pass (with the noted equivalent functional regex check substituting for the buggy substring assertion)

## Deferred Work (Wesley's ops session)

The launch checklist captures everything; Wesley walks through it during a separate session. High-level deferred items:
1. Create Vercel project + verify Web Analytics / Speed Insights / Preview Password are OFF
2. Set 4 Vercel env vars (production + preview split for PUBLIC_SITE_URL)
3. DNS A/CNAME records on `wesleyschlemmer.com` zone (staging + apex)
4. DNS A record on `crossthebridge.io` zone (`umami` subdomain only — apex stays untouched)
5. Provision Postgres + Umami stack on VPS, change default credentials, register staging.wesleyschlemmer.com in Umami dashboard, capture the issued UUID, populate `PUBLIC_UMAMI_WEBSITE_ID` in Vercel + GitHub secrets
6. GitHub repo secrets (4 values) + branch protection on `main` requiring `build` + `network-audit` status checks
7. Pre-launch verification (Lighthouse, JSON-LD via Rich Results Test, indiewebify h-card, OG preview cards, dark mode, mobile nav, dig DNS sanity, etc.)
8. Apex cutover after staging verification
9. Remove staging CNAME post-Phase-1 (subdomain-takeover prevention)
10. 7-day Umami operational-load revisit gate

Until those items run, the CI pipeline is build-time-correct but the network-audit job will not have a real preview URL to hit (no Vercel project = no preview deploy = `wait-for-vercel-preview` step has nothing to wait for). The checklist explicitly orders the steps so Vercel project + DNS land before the first PR CI run.

## Self-Check: PASSED

Verified each created file exists and each commit is in the log:

- `playwright.config.ts` — FOUND
- `tests/network-audit.spec.ts` — FOUND
- `.github/workflows/ci.yml` — FOUND
- `vercel.json` (modified) — FOUND
- `.planning/phases/01-foundation-personal-surface/01-10-LAUNCH-CHECKLIST.md` — FOUND
- Commit `14b9a3a` (Task 1) — FOUND
- Commit `4b161a4` (Task 2) — FOUND
- Commit `3be1f59` (Task 3-doc) — FOUND
