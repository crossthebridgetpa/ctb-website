---
phase: 01-foundation-personal-surface
plan: 04
status: complete
completed: 2026-04-26
checkpoint_resolved: 2026-04-26
requirements:
  - PRIV-02
  - PRIV-03
---

# Plan 01-04 Summary — D-14 Umami Hosting Decision

## What was built

Single decision artifact: `.planning/phases/01-foundation-personal-surface/01-04-UMAMI-DECISION.md`. No code changes — this plan is a checkpoint that resolves a P0 ops decision so PLAN-06 (BaseLayout analytics injection) and PLAN-09 (Colophon copy) can author against concrete values rather than guess.

## Decision

**Option B — Existing VPS** chosen.

| Field | Value |
|-------|-------|
| Endpoint | `https://umami.crossthebridge.io` |
| VPS account | `wesley` user; reachable via Tailscale as `vimi` machine |
| Domain | reserved on the same DNS zone as the rest of the site |
| Provisioning state | VPS up; Docker stack (Postgres + Umami container) is a pre-launch ops task |
| `data-website-id` UUID | pending — issued by Umami dashboard "Add website" step on stack provisioning |
| DNS A record provider/IP | TBD — captured in PLAN-10 launch checklist for Wesley to supply at cutover |

## Env-var values for PLAN-10 (Vercel project Settings → Environment Variables)

- `PUBLIC_UMAMI_HOST = https://umami.crossthebridge.io` (set now)
- `PUBLIC_UMAMI_WEBSITE_ID = ` *(blank in Vercel until UUID is issued; populate in a follow-up before public traffic ramps)*

The three-way guard `import.meta.env.PROD && umamiHost && umamiId` in BaseLayout (PLAN-06) keeps the `<script>` block inert until both env vars are populated. Adding the UUID later is a pure Vercel env-var change — zero code edit.

## Colophon copy variant for PLAN-09

Variant A/B selected (Umami wired with hashed IPs / no cookies). Full copy in `01-04-UMAMI-DECISION.md` — PLAN-09 copies it verbatim.

## Pending Todos for STATE.md

| Item | Owner | Trigger |
|------|-------|---------|
| Provision Umami Docker stack on VPS (Postgres + Umami container per RESEARCH.md lines 610-643) | Wesley | Before Phase 1 launch |
| Run Umami dashboard "Add website" with domain `staging.crossthebridge.io`, capture `data-website-id` UUID | Wesley | After stack is up |
| Populate `PUBLIC_UMAMI_WEBSITE_ID` in Vercel (Production + Preview) with the UUID | Wesley | After UUID issued |
| Change default `admin/umami` Umami credentials | Wesley | First login |
| Supply DNS A record provider + target IP for `umami.crossthebridge.io` | Wesley | At PLAN-10 launch checklist |
| 7-day revisit gate — if self-hosting proves heavier than expected, revisit Plausible Cloud ($9/mo) | Wesley | 7 days post-launch |

## Issues encountered

None. Pure decision capture; no code paths exercised.

## Self-Check: PASSED

- File `.planning/phases/01-foundation-personal-surface/01-04-UMAMI-DECISION.md` exists
- `## Decision Outcome` filled with `Option chosen: B — VPS`
- Env-var table filled with concrete values (UUID marked "pending" — explicit, not a placeholder)
- Single Colophon copy variant (A/B) — variant C removed
- `## PLAN-06 instructions`, `## PLAN-10 instructions`, `## 7-day revisit gate` all present and filled
- Zero `{placeholder}` strings remain
- Verify-grep checks all pass (Decision Outcome, Option chosen, env vars, sections)

## Requirements satisfied

- **PRIV-02** — Site uses self-hosted Umami for analytics (decision recorded; PLAN-06 + PLAN-10 wire it). Status: DECISION RECORDED.
- **PRIV-03** — Site loads no third-party media iframes on first paint. Documented as a CI-gate invariant; PLAN-10 Playwright banned-host list will enforce. Status: DOCUMENTED.

## Commits

- `0e67dc8` — feat(01-04): record D-14 Umami hosting decision (option B — VPS)
