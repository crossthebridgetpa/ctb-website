# D-14 Umami Hosting Decision (Phase 1)

**Resolved:** 2026-04-26
**Decided by:** Wesley Pyburn (via /gsd-execute-phase checkpoint)
**Status:** ready-for-PLAN-06

## Decision Outcome

**Option chosen:** B — VPS

The VPS is already up and reachable. Wesley is the user account on the VPS (`wesley@vps`), and the host is also reachable via Tailscale as the `vimi` machine. The domain `umami.crossthebridge.io` is reserved on the same DNS zone as the rest of the site. The Docker stack (Postgres + Umami) will be brought up on the VPS as a pre-launch ops task; the Umami dashboard "Add website" step will issue the `data-website-id` UUID at that time. PLAN-06 wires the conditional script block now so adding the UUID later is a pure env-var change with zero code edits — the three-way guard fails safe to "no analytics" until both env vars are populated in Vercel.

## Endpoint contract (consumed by PLAN-06 BaseLayout + Vercel project env vars in PLAN-10)

| Env var | Value at Phase 1 staging |
|---------|--------------------------|
| `PUBLIC_UMAMI_HOST` | `https://umami.crossthebridge.io` |
| `PUBLIC_UMAMI_WEBSITE_ID` | `pending — issued by Umami dashboard "Add website" step on VPS provisioning` |

Wesley will provision (or has provisioned) the Docker stack at the host above with default Postgres + Umami container per RESEARCH.md lines 610-643. Default admin password `umami` MUST be changed immediately. The site `staging.crossthebridge.io` is registered in the Umami dashboard → Settings → Websites; UUID issued is in the table above.

## Colophon copy variant for PLAN-09

> **Analytics: self-hosted Umami at `https://umami.crossthebridge.io`.** No cookies set on visitors. No fingerprinting. No PII collected. IP addresses are hashed at the Umami server and never stored. No data crosses to third parties beyond the Umami endpoint itself, which Wesley operates. Verify against Umami's own privacy documentation at https://umami.is/docs/.

## PLAN-06 instructions (BaseLayout analytics injection)

Wire the conditional script block per RESEARCH.md lines 654-665. Use the env-var names exactly as in the table above. Confirm `is:inline` directive is present so Astro doesn't process the script. The three-way guard `import.meta.env.PROD && umamiHost && umamiId` keeps the block inert until both env vars are populated, so it is safe to merge before the UUID is issued.

## PLAN-10 instructions (Vercel env-var setup + network-audit allow-list)

Vercel project Settings → Environment Variables (Production + Preview):
- `PUBLIC_UMAMI_HOST = https://umami.crossthebridge.io`
- `PUBLIC_UMAMI_WEBSITE_ID = ` *(leave blank in Vercel until the UUID is issued by the Umami dashboard; populate in a follow-up before public traffic ramps)*

Network-audit allow-list (Playwright spec): add `umami.crossthebridge.io` to the allow-list so requests to `https://umami.crossthebridge.io/script.js` and `https://umami.crossthebridge.io/api/send` are not flagged as banned third-party traffic. Once Umami is live, the CI environment must have `PUBLIC_UMAMI_HOST` set during the Playwright test run; the `PUBLIC_UMAMI_WEBSITE_ID` value can stay blank in CI — the allow-list check is host-based, not website-id-based.

DNS A record for `umami.crossthebridge.io`: provider and target IP are TBD — Wesley will supply at launch checklist time. PLAN-10 launch checklist captures "DNS A record `umami.crossthebridge.io` → VPS IP, provider TBD" as a pre-cutover gate.

## 7-day revisit gate (from CONTEXT.md `<deferred>`)

If self-hosting proves operationally heavier than expected within 7 days of Phase 1 launch, revisit Plausible Cloud ($9/mo, EU data residency) before the Phase 2 cutover. Decision recorded as D-14; this revisit is not a Phase 1 launch blocker.

---

*Decision document. PLAN-06 + PLAN-09 + PLAN-10 read this file.*
