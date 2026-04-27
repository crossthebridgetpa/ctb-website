---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: D-20 pivot landed — context updated, ready for /gsd-plan-phase 01 to revise 01-09 + author 01-11 (domain-constants follow-on)
stopped_at: Phase 01 context repointed for wesleyschlemmer.com pivot (D-20)
last_updated: "2026-04-27T15:59:17.748Z"
last_activity: 2026-04-27 -- pivot edits committed across PROJECT.md, ROADMAP.md, REQUIREMENTS.md, 01-CONTEXT.md, 01-DISCUSSION-LOG.md
progress:
  total_phases: 2
  completed_phases: 0
  total_plans: 10
  completed_plans: 7
  percent: 70
---

# Project State

## Project Reference

See: .planning/PROJECT.md (repointed 2026-04-27 for wesleyschlemmer.com pivot)

**Core value:** Inbound opportunities — the right people find Wesley, understand the work, and reach out
**Current focus:** Phase 01 — foundation-personal-surface (now wesleyschlemmer.com personal hub)

## Current Position

Phase: 01 (foundation-personal-surface) — REPLAN-PENDING (wave 4 partial; pivot landed)
Plan: 7 of 11 done (01-01..07); 01-08 draft pending review; 01-09 reframe pending; 01-10 + 01-11 to author
Status: D-20 pivot landed — context updated, ready for /gsd-plan-phase 01 to revise 01-09 + author 01-11 (domain-constants follow-on)
Last activity: 2026-04-27 -- pivot edits committed across PROJECT.md, ROADMAP.md, REQUIREMENTS.md, 01-CONTEXT.md, 01-DISCUSSION-LOG.md

Progress: [██████░░░░] 64% (7/11 plans, accounting for new 01-11 follow-on)

## ⚠ Pivot landed (2026-04-27) — D-20

**Decision:** wesleyschlemmer.com = THIS project (personal hub). crossthebridge.io = future CTB brand-site project (legacy site stays untouched until that future project replaces it).

**Trigger:** Wesley's redesign notes on 2026-04-26 (`~/.hermes/vault/website redesign notes.pdf`, transcribed to `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md`) proposed a richer CTB consulting hub. Mid-discussion Wesley raised "maybe the hub should be wesleyschlemmer.com instead?" — surfacing the recursion concern (a "Cross The Bridge" tile inside a site already named Cross The Bridge). Pivot resolves the recursion and gives the CTB brand room to grow as its own product.

**What changed:**

- THIS project's deploy target: `crossthebridge.io` → `wesleyschlemmer.com`
- ROADMAP.md: Phase 3 (Consulting Subsection) moved OUT to a separate future project. v1 milestone now Phase 1 + Phase 2.
- REQUIREMENTS.md: CONS-01..05, A11Y-04, INFRA-05 moved out (to future CTB brand-site project). PRIV-04 moved Phase 3 → Phase 1. PROJ-04 reframed.
- CONTEXT.md: D-20 added; D-03, D-05, D-15, D-18, D-19 revised inline.
- New plan needed: 01-11 — domain-constants follow-on (swap hardcoded `crossthebridge.io` references in 7 already-built plans' code to `wesleyschlemmer.com`).
- 01-09 needs reframe: third project page becomes "Cross The Bridge" teaser linking externally to `https://crossthebridge.io`.
- 01-10 stays similar but Vercel project + DNS now target wesleyschlemmer.com.

**01-08 (About) is unaffected** — drafts at `01-08-DRAFT.md` (and `~/.hermes/vault/projects/ctb/01-08-about-page-draft.md` for Obsidian) still need Wesley review/approval, then 01-08 ships unchanged.

## Performance Metrics

**Velocity:**

- Total plans completed: 7
- Average duration: ~7-9 min/plan (worktree-isolated executor agents)
- Total execution time: ~50 min (wave 2-4 in this session)

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01 (in progress) | 7 of 11 done | ~50 min | ~7 min |

**Recent Trend:**

- Last 5 plans: 01-03, 01-04, 01-05, 01-06, 01-07 — all complete with worktree-isolated parallel execution

*Updated after each plan completion*
| Phase 01-foundation-personal-surface P01 | 12min | 2 tasks | 12 files |
| Phase 01-foundation-personal-surface PP02 | 3min | 2 tasks | 3 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table. Phase 1 specifics in `01-CONTEXT.md` (D-01 through D-20).

Phase 1 pre-build gates (resolve during plan-phase, before scaffolding):

- ✓ Content inventory (publishable essays/notes count → sets Phase 2 scope) — resolved during execution
- ✓ Worldview copy reviewed (≤150 words, peer + non-peer test) — D-01 locked 2026-04-25
- ✓ Palette decision — D-10 cream/charcoal/green/gold carry-forward locked 2026-04-25
- ✓ Domain decision — D-20 wesleyschlemmer.com landed 2026-04-27
- [Phase ?]: Trust @astrojs/vercel@10.0.5 (current published) over RESEARCH.md's v5/static and CLAUDE.md's v8 references — both stale; v10 unifies static+SSR via output: field
- [Phase ?]: Defer Content-Security-Policy authoring to a future plan — Astro 6 native CSP API is the safe path; hand-written CSP risks breaking PLAN-05 mailto-reveal and Nav drawer inline scripts
- [Phase ?]: src/pages/index.astro is a 1-line 'Foundation scaffold' stub authorized by PLAN-01 acceptance criteria; PLAN-07 replaces with real Hero + 4-tile homepage

### Pending Todos

**Phase 01 — awaiting Wesley input:**

| ID | Item | Owner | Trigger |
|----|------|-------|---------|
| 01-08-REVIEW | Review About page thesis (~210 words) + bio (~255 words) drafts at `~/.hermes/vault/projects/ctb/01-08-about-page-draft.md` (Obsidian) — approve / edit / redraft | Wesley | Resume to unblock 01-08 |
| 01-09-FBBA-URL | ✓ confirmed: `https://fbba.io` | Wesley | resolved 2026-04-27 |
| 01-09-BB-URL | ✓ confirmed: `https://bitcoinbay.foundation` | Wesley | resolved 2026-04-27 |
| 01-09-CTB-COPY | Cross The Bridge teaser-page body copy (post-pivot 3rd tile) — Claude drafts using redesign-notes seed material at execution time, Wesley reviews at checkpoint | Wesley | After 01-09 plan revised by /gsd-plan-phase |
| 01-10-VERCEL | Vercel project setup for **wesleyschlemmer.com**: add `staging.wesleyschlemmer.com` + apex domains; set `PUBLIC_SITE_URL=https://staging.wesleyschlemmer.com` + `PUBLIC_UMAMI_HOST=https://umami.crossthebridge.io` (from D-14) + `PUBLIC_CONSULTING_URL=https://crossthebridge.io` env vars; disable Web Analytics + Speed Insights + Preview Password Protection | Wesley | Before 01-10 CI runs against real preview |
| 01-10-DNS | DNS for wesleyschlemmer.com: CNAME `staging.wesleyschlemmer.com → cname.vercel-dns.com.` + apex A/ALIAS to Vercel; AND DNS A for `umami.crossthebridge.io → VPS IP` (from D-14 — different DNS zone, owned by Wesley too) | Wesley | Before 01-10 launch checklist |
| 01-04-UMAMI-STACK | Provision Umami Docker stack on VPS (Postgres + Umami container), change default `admin/umami` credentials, add `staging.wesleyschlemmer.com` site to dashboard, capture `data-website-id` UUID, populate `PUBLIC_UMAMI_WEBSITE_ID` in Vercel | Wesley | Before public traffic ramp |
| 01-04-7DAY | 7-day post-launch revisit gate: if self-hosting Umami proves heavier than expected, revisit Plausible Cloud ($9/mo, EU residency) | Wesley | 7 days post Phase 1 launch |

### Blockers/Concerns

- **Domain-constants drift**: 7 already-built plans have hardcoded `crossthebridge.io` references (Person `@id` in JsonLd, robots.txt sitemap line, llms.txt H1/URLs, .env.example PUBLIC_SITE_URL, possibly astro.config.mjs site). Plan 01-11 (to be authored by /gsd-plan-phase) lands all the swaps as a single follow-on commit.

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| **Future project** | CTB brand site at `crossthebridge.io` (consulting hub + Bitcoin/Privacy/AI sub-pages, Petros/AYLIP framing) | New `/gsd-new-project` initiative; seed input is `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md` | 2026-04-27 (D-20 pivot) |
| **Future migration** | `getpetros.com` as CTB brand-site domain target if AYLIP productizes | Reserved domain (Wesley owns); decided per future project | 2026-04-27 |
| **Optional follow-up** | Migrate Umami host from `umami.crossthebridge.io` to `umami.wesleyschlemmer.com` for subdomain isolation | Not blocking; Wesley owns both zones | 2026-04-27 |
| Discovery (v1.x) | Pagefind search, dynamic OG images, webmentions, newsletter, `/now`, `/uses`, `/press` | Future v1.x milestone | 2026-04-25 (roadmap creation) |

## Session Continuity

Last session: 2026-04-27T15:59:17.743Z
Stopped at: Phase 01 context repointed for wesleyschlemmer.com pivot (D-20)
Resume file: .planning/phases/01-foundation-personal-surface/01-CONTEXT.md

**To resume — recommended single command:**

```
/gsd-plan-phase 01
```

This will read the repointed CONTEXT.md and author:

- A new follow-on plan (01-11 — domain-constants update across 5 files in built code)
- A revised 01-09 plan (third project page reframed to "Cross The Bridge" teaser linking externally to `https://crossthebridge.io`; FBBA + Bitcoin Bay external URLs supplied)
- A revised 01-10 plan (Vercel project + DNS now target `wesleyschlemmer.com`; network audit allow-list still includes `umami.crossthebridge.io`)

**Confirmed inputs Claude has, Wesley does not need to repeat:**

- ✓ FBBA URL = `https://fbba.io`
- ✓ Bitcoin Bay URL = `https://bitcoinbay.foundation`
- ✓ Umami hosting = Option B (VPS, `https://umami.crossthebridge.io`, UUID pending stack provisioning) — captured in 01-04-UMAMI-DECISION.md
- ✓ Domains owned: `wesleyschlemmer.com`, `crossthebridge.io`, `getpetros.com`
- ✓ 01-08 thesis + bio drafts authored, in vault for Obsidian review
- ✓ D-20 pivot to wesleyschlemmer.com personal hub (CTB brand site = separate future project)

**Still needs Wesley's input on resume:**

- Approve / edit / redraft 01-08 About page drafts
- Sanity-check the pivot artifact updates (PROJECT.md, ROADMAP.md, REQUIREMENTS.md, 01-CONTEXT.md) before /gsd-plan-phase 01 runs
- Cross The Bridge teaser-page body copy review (after /gsd-plan-phase 01 authors 01-09 revision; copy will be drafted at execution time)
- DNS provider for `staging.wesleyschlemmer.com` + apex `wesleyschlemmer.com` (for 01-10 launch checklist)
- Vercel project setup for wesleyschlemmer.com (env vars + disable Web Analytics/Preview Password) — for 01-10
- Provision Umami Docker stack on VPS, capture UUID — before public launch

**Wave-by-wave status this session:**

- Wave 1 (01-01) — DONE pre-session
- Wave 2 (01-02 pre-session; 01-03 SEO, 01-04 Umami decision Option B, 01-05 components) — DONE this session
- Wave 3 (01-06 BaseLayout/Nav/Footer) — DONE
- Wave 4 (01-07 homepage+404) — DONE; (01-08 about) — DRAFT pending review; (01-09) — REFRAME PENDING (third tile = Cross The Bridge teaser); (01-10) — DOMAIN UPDATE PENDING (Vercel + DNS now wesleyschlemmer.com)
- Wave 5 (01-10 + new 01-11 domain-constants follow-on) — TO AUTHOR via `/gsd-plan-phase 01`
