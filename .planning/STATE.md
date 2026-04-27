---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: replan-required
stopped_at: "Phase 01 wave 4 partial + scope shift triggered by 2026-04-26 redesign notes — replan needed before resuming 01-09/01-10"
last_updated: "2026-04-27T10:48:00.000Z"
last_activity: 2026-04-27 -- redesign notes transcribed, scope-shift decision captured (Option 3: add consulting hub)
progress:
  total_phases: 3
  completed_phases: 0
  total_plans: 10
  completed_plans: 7
  percent: 70
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-25)

**Core value:** Inbound opportunities — the right people find Wesley, understand the work, and reach out
**Current focus:** Phase 01 — foundation-personal-surface

## Current Position

Phase: 01 (foundation-personal-surface) — REPLAN-REQUIRED (wave 4 partial + scope shift)
Plan: 8 of 10 done; new plans needed for consulting hub
Status: 2026-04-26 redesign notes triggered scope expansion — Wesley chose Option 3 (add /consulting hub + /consulting/{bitcoin,privacy,ai} sub-pages with per-page themes)
Last activity: 2026-04-27 -- redesign notes transcribed, scope-shift decision captured

Progress: [███████░░░] 70% (of original scope — new plans will reset denominator)

## ⚠ Replan trigger

**Source:** `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md` (transcribed from handwritten PDF on 2026-04-27)

**Wesley's decision (2026-04-27):** Option 3 — replan Phase 1 to add consulting hub now (not as a future milestone).

**What needs to land in CONTEXT.md / new plans:**
1. Third project tile renamed: `AI/Petros/Hermes` → `CTB Consulting`. Single project page links into the new /consulting hub instead of being a content destination itself.
2. New `/consulting` hub page — "Choose Your Adventure" pattern with 3 buttons (Bitcoin / Privacy / AI), black + gold theme, hero "What does it mean to 'cross the bridge'".
3. New `/consulting/bitcoin` page — black + orange theme, "money for the Sovereign Individual", 6 services + FAQ (11 Qs).
4. New `/consulting/privacy` page — black + white theme, cypherpunk "privacy is not secrecy" framing, 6 services + FAQ.
5. New `/consulting/ai` page — black + green theme, "Automate or be automated", 5 services. Petros + AYLIP framing belongs here.
6. Per-page theme tokens — current Phase 1 tokens are cream/charcoal/green/gold; need supplemental token scopes (CSS variables overridden under per-page selector or per-route layout variant).
7. Network audit (01-10) — sitemap + Playwright route list expands from 7 → 11 routes.
8. Open question still: domain split (`getpetros.com` separate Vercel project?) — decide during replan, not deferred.
9. Open question still: `wesleyschlemmer.com` availability check (out-of-band; not on critical path for replan).

**01-08 (About) is unaffected by the scope shift** — drafts at `01-08-DRAFT.md` (and `~/.hermes/vault/projects/ctb/01-08-about-page-draft.md` for Obsidian) still need Wesley review/approval, then 01-08 ships unchanged.

## Performance Metrics

**Velocity:**

- Total plans completed: 0
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**

- Last 5 plans: —
- Trend: —

*Updated after each plan completion*
| Phase 01-foundation-personal-surface P01 | 12min | 2 tasks | 12 files |
| Phase 01-foundation-personal-surface PP02 | 3min | 2 tasks | 3 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.

Phase 1 pre-build gates (resolve during plan-phase, before scaffolding):

- Content inventory (publishable essays/notes count → sets Phase 2 scope)
- IA decision documented (subpath for `/consulting`)
- Worldview copy reviewed (≤150 words, peer + non-peer test)
- Palette decision (carry forward cream/charcoal/green/gold or commit successor)
- [Phase ?]: Trust @astrojs/vercel@10.0.5 (current published) over RESEARCH.md's v5/static and CLAUDE.md's v8 references — both stale; v10 unifies static+SSR via output: field
- [Phase ?]: Defer Content-Security-Policy authoring to a future plan — Astro 6 native CSP API is the safe path; hand-written CSP risks breaking PLAN-05 mailto-reveal and Nav drawer inline scripts
- [Phase ?]: src/pages/index.astro is a 1-line 'Foundation scaffold' stub authorized by PLAN-01 acceptance criteria; PLAN-07 replaces with real Hero + 4-tile homepage

### Pending Todos

**Phase 01 wave 4/5 — awaiting Wesley input:**

| ID | Item | Owner | Trigger |
|----|------|-------|---------|
| 01-08-REVIEW | Review About page thesis (~210 words) + bio (~255 words) drafts at `.planning/phases/01-foundation-personal-surface/01-08-DRAFT.md` — approve / edit / redraft | Wesley | Resume to unblock 01-08 → 01-10 |
| 01-09-FBBA-URL | ✓ confirmed: `https://fbba.io` | Wesley | resolved 2026-04-27 |
| 01-09-BB-URL | ✓ confirmed: `https://bitcoinbay.foundation` | Wesley | resolved 2026-04-27 |
| 01-09-BODY-COPY | Per-project body copy review (Bitcoin Bay tight, FBBA tight, AI/Petros/Hermes deep with AYLIP framing) — drafts will be authored at execution time, then reviewed | Wesley | After 01-08 approval |
| 01-10-VERCEL | Vercel project setup: add `staging.crossthebridge.io` domain, set `PUBLIC_SITE_URL=https://staging.crossthebridge.io` + `PUBLIC_UMAMI_HOST=https://umami.crossthebridge.io` + `PUBLIC_CONSULTING_URL=https://crossthebridge.io` env vars; disable Web Analytics + Speed Insights + Preview Password Protection | Wesley | Before 01-10 CI runs against real preview |
| 01-10-DNS | DNS A/CNAME for `staging.crossthebridge.io → cname.vercel-dns.com.` (provider TBD — supply at this point) + DNS A for `umami.crossthebridge.io → VPS IP` (from 01-04 decision) | Wesley | Before 01-10 launch checklist |
| 01-04-UMAMI-STACK | Provision Umami Docker stack on VPS (Postgres + Umami container per RESEARCH.md 610-643), change default `admin/umami` credentials, add `staging.crossthebridge.io` site to dashboard, capture `data-website-id` UUID, populate `PUBLIC_UMAMI_WEBSITE_ID` in Vercel | Wesley | Before public traffic ramp |
| 01-04-7DAY | 7-day post-launch revisit gate: if self-hosting Umami proves heavier than expected, revisit Plausible Cloud ($9/mo, EU residency) | Wesley | 7 days post Phase 1 launch |

### Blockers/Concerns

- **Apex cutover discipline**: Phase 1 must NOT take down the existing single-page consulting site at the apex. Deploy to `staging.crossthebridge.io` or `/v2` path until Phase 3 cuts over. Wired into Phase 1 success criteria #3.

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Discovery (v2) | Pagefind search, dynamic OG images, webmentions, newsletter, `/now`, `/uses`, `/press` | Future milestone | 2026-04-25 (roadmap creation) |

## Session Continuity

Last session: 2026-04-27T10:48:00.000Z
Stopped at: Phase 01 replan-required — scope shift triggered by 2026-04-26 redesign notes (Option 3: add consulting hub now). Wave 4 partial (01-08 draft awaiting review).
Resume file: `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md` (canonical) + `.planning/phases/01-foundation-personal-surface/01-08-DRAFT.md`

**To resume — recommended single command:**

```
/gsd-discuss-phase 01
```

This will surface the scope shift and let you confirm the replan choices interactively. After CONTEXT.md updates, `/gsd-plan-phase 01` will author the new plans (consulting hub + 3 themed sub-pages, 01-09 reframe, 01-10 route expansion).

**Confirmed inputs Claude has, Wesley does not need to repeat:**
- ✓ FBBA URL = `https://fbba.io`
- ✓ Bitcoin Bay URL = `https://bitcoinbay.foundation`
- ✓ Umami hosting = Option B (VPS, `https://umami.crossthebridge.io`, UUID pending stack provisioning) — captured in 01-04-UMAMI-DECISION.md
- ✓ 01-08 thesis + bio drafts authored, in vault for Obsidian review

**Still needs Wesley's input on resume:**
- Approve / edit / redraft 01-08 About page (`~/.hermes/vault/projects/ctb/01-08-about-page-draft.md`)
- Confirm: ship consulting hub on `crossthebridge.io/consulting/*` OR separate domain (`getpetros.com`)?
- Confirm: themed sub-pages share global tokens with overrides, or each gets a fully scoped theme?
- DNS provider for `staging.crossthebridge.io` + `umami.crossthebridge.io` (for 01-10 launch checklist)
- Vercel project setup (env vars, disable Web Analytics + Preview Password) — for 01-10
- Provision Umami Docker stack on VPS, capture UUID — before public launch

**Wave-by-wave status this session:**
- Wave 1 (01-01) — DONE pre-session
- Wave 2 (01-02 pre-session; 01-03 SEO, 01-04 Umami decision Option B, 01-05 components) — DONE this session
- Wave 3 (01-06 BaseLayout/Nav/Footer) — DONE
- Wave 4 (01-07 homepage+404) — DONE; (01-08 about) — DRAFT pending review; (01-09) — REFRAME PENDING (third tile rename); (01-10) — ROUTE LIST EXPANSION PENDING
- New plans (01-11..01-1N) — TO AUTHOR via `/gsd-plan-phase 01` after `/gsd-discuss-phase 01`
