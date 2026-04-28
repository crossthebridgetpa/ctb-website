# Phase 1 Launch Checklist (post D-20 pivot)

Run by: Wesley Schlemmer (or operator)
Pre-launch state: PLAN-07/08/09/11 pages authored, PLAN-10 CI configured.
Deploy target: wesleyschlemmer.com (apex) / staging.wesleyschlemmer.com (staging) — NOT crossthebridge.io.

> **Note on /about route:** This checklist assumes 01-08 (the About page) has shipped before
> running the network audit on a real preview URL. If 01-08 is still paused awaiting Wesley's
> draft review, defer the "First PR runs CI green" item until 01-08 ships — the network audit
> spec lists `/about` as one of the 8 routes and will fail if the route 404s on the preview
> deploy.

## Vercel project setup (one-time per project)

- [ ] **Create Vercel project** — Settings → Add New... → Project → import `crossthebridgetpa/ctb-website`. Auto-detects framework as Astro. (Repo location stays per INFRA-04 — pre-pivot CTB-branded repo name is fine.)
- [ ] **Production branch:** `main`
- [ ] **Build & Output:** auto-detected (Astro), Node 22.x
- [ ] **Web Analytics:** OFF (Settings → Analytics → Web Analytics → Disable; Pitfall A; defense-in-depth — also banned in network audit)
- [ ] **Speed Insights:** OFF (Settings → Speed Insights → Disable; defense-in-depth — also banned in network audit)
- [ ] **Deployment Protection (Preview Password):** OFF (Settings → Deployment Protection → no password — Playwright network audit can't traverse a password-protected preview)
- [ ] **Comments on Previews:** Wesley preference (default OFF)
- [ ] **Vercel for GitHub:** confirm installed in GitHub Apps; preview deploys auto-create on PRs (INFRA-03)

## Vercel project environment variables

Read values from `01-04-UMAMI-DECISION.md` (Umami host) and the post-pivot env-var spec.

Set Production + Preview together unless noted:

- [ ] `PUBLIC_SITE_URL=https://wesleyschlemmer.com` for **Production**
- [ ] `PUBLIC_SITE_URL=https://staging.wesleyschlemmer.com` for **Preview** (Phase 1 staging)
- [ ] `PUBLIC_UMAMI_HOST=https://umami.crossthebridge.io` (per D-14; SAME for Production + Preview)
- [ ] `PUBLIC_UMAMI_WEBSITE_ID=<UUID>` (populate AFTER Umami stack is provisioned and the dashboard issues the UUID; until then this stays blank, BaseLayout's three-way guard fails safe to "no analytics")
- [ ] `PUBLIC_CONSULTING_URL=https://crossthebridge.io` (Cross The Bridge teaser tile external CTA target — D-05 revised; stays at crossthebridge.io regardless of pivot since the teaser deliberately links to the brand site)

## DNS configuration — wesleyschlemmer.com zone (NEW post-pivot)

- [ ] **In DNS provider for wesleyschlemmer.com:** Add CNAME record:
  - Name: `staging`
  - Value: `cname.vercel-dns.com.` (note trailing period)
  - TTL: 300
  - **If Cloudflare DNS:** Gray-cloud (DNS-only, NOT proxied). Orange-cloud breaks the network audit and complicates cert handling per RESEARCH lines 1099-1104.
- [ ] **In DNS provider for wesleyschlemmer.com:** Add apex record (A or ALIAS/ANAME) for `wesleyschlemmer.com`:
  - Use the exact value Vercel surfaces in Settings → Domains when adding the apex domain (typically a Vercel anycast IP for an A record, or `cname.vercel-dns.com.` for ALIAS/ANAME if your provider supports apex CNAME-flattening like Cloudflare or DNS Made Easy)
  - TTL: 300
  - Gray-cloud if Cloudflare
- [ ] **In Vercel project Settings → Domains → Add domain:** `staging.wesleyschlemmer.com` (provision FIRST)
- [ ] **In Vercel project Settings → Domains → Add domain:** `wesleyschlemmer.com` (apex; provision AFTER staging is verified)
- [ ] **Wait for cert provisioning** — Let's Encrypt auto-issues; usually ~30s after DNS propagates. Vercel domain status flips from "Invalid Configuration" to "Valid Configuration".
- [ ] **Verify HTTPS staging:** `curl -I https://staging.wesleyschlemmer.com/` returns 200 with valid cert.
- [ ] **Verify HTTPS apex (after cutover):** `curl -I https://wesleyschlemmer.com/` returns 200 with valid cert.

## DNS configuration — crossthebridge.io zone (separate zone, post-pivot still required for Umami)

- [ ] **In DNS provider for crossthebridge.io:** Add A record for the Umami subdomain:
  - Name: `umami`
  - Value: `<Wesley's VPS IP — supplied at this checklist time>`
  - TTL: 300
  - Gray-cloud if Cloudflare
- [ ] **APEX UNTOUCHED:** `crossthebridge.io` apex DNS is NOT changed in Phase 1 (or any Phase of this project). Confirm `curl -I https://crossthebridge.io/` still returns the legacy single-page consulting site. The apex stays serving that site until the future CTB brand-site project replaces it.
- [ ] **Verify Umami host:** `curl -I https://umami.crossthebridge.io/` returns 200 (Umami container responding) once the stack is up (next section).

## Umami stack provisioning (one-time on VPS)

- [ ] **SSH to VPS** (`wesley@vps` or via Tailscale `vimi`) and confirm the host is reachable.
- [ ] **Provision Postgres + Umami container** per RESEARCH §Umami self-host (lines 610-643). The standard pattern is `docker compose up -d` against a docker-compose.yml that pins Postgres + Umami images and exposes Umami on a port behind a reverse proxy (Caddy/nginx) that handles TLS for `umami.crossthebridge.io`.
- [ ] **Reverse proxy + TLS:** confirm the proxy issues a Let's Encrypt cert for `umami.crossthebridge.io` (or use Cloudflare Origin cert if proxied — but per the gray-cloud note above, gray-cloud is the v1 default).
- [ ] **First login:** browse to `https://umami.crossthebridge.io/`, log in with default `admin / umami`, and **change the password immediately**. Pitfall B / RESEARCH §Umami security.
- [ ] **Add website to Umami dashboard:** Settings → Websites → Add → Name: "wesleyschlemmer.com" or similar; Domain: `staging.wesleyschlemmer.com` (and after cutover, also add `wesleyschlemmer.com` apex). Capture the issued `data-website-id` UUID.
- [ ] **Populate PUBLIC_UMAMI_WEBSITE_ID in Vercel:** paste the UUID into the Vercel env var (both Production and Preview). Trigger a redeploy so the new value takes effect.
- [ ] **Verify Umami pageview ingestion:** browse to `https://staging.wesleyschlemmer.com/` from a fresh tab, then refresh the Umami dashboard → confirm the visit shows up. If not, debug via browser DevTools Network tab: the `/api/send` call to umami.crossthebridge.io should be 200 OK. Common issues: (a) website-id mismatch (Umami's UUID vs. what's in Vercel env), (b) BaseLayout three-way guard suppressing the script (check `import.meta.env.PROD` and that the env vars actually arrived in the build), (c) reverse-proxy CORS issue on the Umami host.

## GitHub repo configuration (one-time)

- [ ] **GitHub repo Settings → Secrets and Variables → Actions:** add four secrets matching the Vercel env vars above:
  - `PUBLIC_SITE_URL = https://wesleyschlemmer.com` (production-canonical for build-time absolute URLs in CI builds)
  - `PUBLIC_UMAMI_HOST = https://umami.crossthebridge.io`
  - `PUBLIC_UMAMI_WEBSITE_ID = <UUID after Umami provisioning>`
  - `PUBLIC_CONSULTING_URL = https://crossthebridge.io`
  The CI workflow reads these.
- [ ] **Branch protection on `main`:** Settings → Branches → Add rule → require status checks: `build` and `network-audit`. Require linear history. Block direct pushes to main without PR (INFRA-02 / INFRA-03 enforcement).
- [ ] **Confirm Vercel for GitHub installed and authorised on the repo** (App settings).

## Pre-launch verification (manual, repeat for each major change)

- [ ] **First PR runs CI green:** open a trivial PR (e.g., README typo); confirm `build` and `network-audit` both pass. Block-merge logic verified.
- [ ] **Network audit on staging URL:** locally run `PREVIEW_URL=https://staging.wesleyschlemmer.com PUBLIC_UMAMI_HOST=https://umami.crossthebridge.io npx playwright test`. All 8 routes pass.
- [ ] **Network-audit Umami allow-list verification:** confirm `https://umami.crossthebridge.io/script.js` (or `/api/send`) appears in the per-test `allRequests` log when running with `--reporter=list` and is NOT flagged as a violation. PRIV-04 satisfied (≤1 third-party domain on first paint, Umami only).
- [ ] **Lighthouse spot-check (informational, not gating per D-16):**
  - https://staging.wesleyschlemmer.com/ — Accessibility ≥95, Performance ≥90 (informational)
  - https://staging.wesleyschlemmer.com/about — Accessibility ≥95
  - https://staging.wesleyschlemmer.com/projects/cross-the-bridge — Accessibility ≥95
- [ ] **JSON-LD validation (Person `@id` post-pivot):**
  - https://staging.wesleyschlemmer.com/ → https://search.google.com/test/rich-results → WebSite schema validates
  - https://staging.wesleyschlemmer.com/about → Person schema validates; the Person `@id` reads `https://wesleyschlemmer.com/about#wesley` (post-01-11 swap)
  - https://staging.wesleyschlemmer.com/projects/bitcoin-bay → BreadcrumbList validates
- [ ] **h-card validation:** https://staging.wesleyschlemmer.com/about → https://indiewebify.me/ → "Yes! You have an h-card"
- [ ] **OG preview rendering:** paste each major URL into Discord, Telegram, X, Signal, iMessage. Verify image + title + description preview cards render correctly. Check the og:url field reflects wesleyschlemmer.com (not crossthebridge.io).
- [ ] **Mobile nav verification:** open https://staging.wesleyschlemmer.com/ on a phone (or browser DevTools <768px viewport) — hamburger toggles drawer; Escape closes; link click closes + navigates without scroll-lock leak.
- [ ] **Dark mode verification:** browser DevTools → Rendering → Emulate CSS prefers-color-scheme: dark — body background flips to ink, all text readable, focus rings visible.
- [ ] **Skip-link verification:** Tab from page load — first focus lands on "Skip to main content" link (visible). Enter → focus jumps to `<main>`.
- [ ] **Mailto obfuscation verification:** `curl -s https://staging.wesleyschlemmer.com/contact | grep -c "wesley@crossthebridge.io"` returns 0. (The email address itself stays at crossthebridge.io per D-13 — the obfuscation invariant must still hold post-pivot.)
- [ ] **PRIV-01 spot check:** `curl -s https://staging.wesleyschlemmer.com/ | grep -c "fonts.googleapis.com"` returns 0.
- [ ] **Domain-constants leak audit (post-01-11):** `curl -s https://staging.wesleyschlemmer.com/ | grep -o "crossthebridge.io" | sort -u` returns ONLY: `umami.crossthebridge.io` (analytics endpoint), `crossthebridge.io` (consulting CTA href, IF the homepage embeds the value), and the obfuscated-mailto strings. NO `staging.crossthebridge.io` or `crossthebridge.io/about#wesley` references.
- [ ] **External CTA destinations live:** verify each external link resolves:
  - `curl -I https://bitcoinbay.foundation/` returns 2xx
  - `curl -I https://fbba.io/` returns 2xx
  - `curl -I https://crossthebridge.io/` returns 2xx (legacy single-page CTB site)
- [ ] **Cross-zone DNS sanity:** `dig +short staging.wesleyschlemmer.com` returns Vercel CNAME; `dig +short umami.crossthebridge.io` returns VPS IP; `dig +short crossthebridge.io` UNCHANGED (still serving legacy site).

## Apex cutover (after staging verification — Phase 1 closure)

- [ ] **All staging checks above passed for staging.wesleyschlemmer.com.**
- [ ] **Add apex domain in Vercel:** Settings → Domains → Add → `wesleyschlemmer.com`. Wait for cert.
- [ ] **Update PUBLIC_SITE_URL Production env in Vercel:** `https://wesleyschlemmer.com` (was previously left blank or set to staging during pre-cutover).
- [ ] **Trigger production redeploy:** push or redeploy from Vercel dashboard.
- [ ] **Verify apex resolves and serves:** `curl -I https://wesleyschlemmer.com/` returns 200; site renders.
- [ ] **Re-run network audit against apex:** `PREVIEW_URL=https://wesleyschlemmer.com PUBLIC_UMAMI_HOST=https://umami.crossthebridge.io npx playwright test`. All 8 routes pass.
- [ ] **Add apex to Umami:** Umami dashboard → Settings → Websites → add `wesleyschlemmer.com` (or update existing entry if Umami's domain field accepts both).
- [ ] **Confirm legacy crossthebridge.io still serves:** `curl -I https://crossthebridge.io/` still returns the legacy single-page consulting site. Phase 1 success criterion #3 closed.

## Post-launch hygiene (subdomain takeover prevention)

- [ ] **Once Phase 1 closes** (no further use for the staging subdomain), **REMOVE** the `staging.wesleyschlemmer.com` CNAME record from DNS to prevent dangling-CNAME takeover (T-10-04). Also remove the staging domain from the Vercel project. If staging is needed for future plans, keep it but verify the CNAME still points at a Vercel-controlled target.

## 7-day revisit gate (CONTEXT.md `<deferred>`)

- [ ] On day 7 post-launch, audit Umami operational load. If self-hosting heavier than expected, decide whether to revisit Plausible Cloud per CONTEXT.md / 01-04-UMAMI-DECISION.md "7-day revisit gate".

## Sign-off

- [ ] All items above checked → Phase 1 ready to declare complete via `/gsd-transition` or `/gsd-complete-milestone`.
