# Phase 1: Foundation + Personal Surface — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `01-CONTEXT.md` — this log preserves the alternatives considered.

**Date:** 2026-04-25
**Phase:** 01-foundation-personal-surface
**Areas discussed:** Worldview copy, Project pages, Visual identity, Operational

---

## Worldview Copy

### Q1 — Hero copy variant

| Option | Description | Selected |
|--------|-------------|----------|
| A — Identity-led, first-person | Leads with name + thesis; lists projects as how the thesis manifests (~95 words) | |
| B — Worldview-led, third-person | Leads with the doctrine name; demotes the personal voice (~85 words) | |
| C — Tight, project-grid-led | Minimal worldview, maximum scan-ability, project list as body (~50 words) | |
| D — Question-led, conversational | Hooks with a question the audience is asking themselves (~75 words) | ✓ |

**User's choice:** D — Question-led, conversational
**Notes:** Wesley wants the magazine-cover hook framing over the résumé framing.

### Q2 — Hero tweaks before locking

| Option | Description | Selected |
|--------|-------------|----------|
| Lock D as-is | Use exact draft | |
| Lock D, but change CTA | Same hero, different CTA wording | |
| Lock D, drop project list | Drop the "I work on this in four ways: …" sentence — let project cards do that work | ✓ |
| Let me draft tweaks | Plain-text edits | |

**User's choice:** Lock D, drop project list
**Notes:** Final hero ~50 words. Project cards below the fold carry the manifestation list.

---

## Project Pages

### Q1 — Per-project page depth

| Option | Description | Selected |
|--------|-------------|----------|
| Tight — 1 page, 3 sections | What/why/engage. ~300 words. Stephan Ango / Patrick Collison density. | |
| Standard — 1 page, 4-5 sections | Overview/story/find/media/engage. ~600-800 words. Maggie Appleton style. | |
| Deep — hub + sub-pages | /projects/X/ hub with sub-routes. Heaviest. | |
| Mixed by project | Decide per-project in execution | ✓ |

**User's choice:** Mixed by project
**Notes:** Likely AI/Petros deepest, BB and FBBA tighter.

### Q2 — Bitcoin Bay engagement CTA

| Option | Description | Selected |
|--------|-------------|----------|
| Next event link | Link to Meetup / lu.ma / Eventbrite | |
| Join chat | Discord / Signal / Telegram invite | |
| Email signup | BB events mailing list | ✓ |
| Multiple | Show 2-3 | |

**User's choice:** Email signup

### Q3 — FBBA engagement CTA

| Option | Description | Selected |
|--------|-------------|----------|
| Apply / membership form | Application link or membership signup | |
| Contact email | mailto for membership inquiries | |
| Visit FBBA site | Link to separate FBBA website | ✓ |
| Multiple | Show 2-3 | |

**User's choice:** Visit FBBA site

### Q4 — AI / Petros / Hermes engagement CTA

| Option | Description | Selected |
|--------|-------------|----------|
| GitHub repos | Link out to repos for builders | |
| Read the Polaris doctrine | Link to /writing/petros-polaris essay | |
| Email / waitlist | Inbound for collaborators / AYLIP waitlist | |
| Multiple | 2-3 (GitHub + essay + email) | |
| **Other:** "the current crossthebridge.io page" | Link to live consulting offer (free-text) | ✓ |

**User's choice:** Other — link to the live consulting offer
**Notes:** Coherent product decision: Petros/Hermes are open-source projects, the way to "engage with Wesley's AI work" is to hire him via CTB Consulting. Implement as configurable URL so Phase 3 cutover is a config change.

### Q5 — Freedom Tech Consulting clarification (follow-up)

User clarified inline: **"Freedom Tech Consulting isn't its own project, it's our thesis."**

This invalidated PROJ-03 in REQUIREMENTS.md and forced a re-architecture question.

### Q6 — Where the Freedom Tech thesis lives

| Option | Description | Selected |
|--------|-------------|----------|
| Folded into About | About = bio + thesis fused into one page | ✓ |
| Dedicated /freedom-tech page | Standalone thesis page, About stays purely biographical | |
| It IS the homepage | Homepage itself is the thesis (expanded hero + pillars) | |
| Distilled essay in /writing | Thesis ships as the seed essay | |

**User's choice:** Folded into About

### Q7 — Homepage grid composition (after FTC reframe)

| Option | Description | Selected |
|--------|-------------|----------|
| 3 cards — BB, FBBA, AI | Just three projects. CTB linked from About/Contact only. | |
| 3 cards + 1 thesis card | BB, FBBA, AI + a "The thesis" card linking to About | ✓ |
| 3 cards + Consulting card | BB, FBBA, AI + CTB Consulting on homepage (reverses prior decision) | |

**User's choice:** 3 cards + 1 thesis card
**Notes:** Visual 4-up grid maintained without making FTC a project.

---

## Visual Identity

### Q1 — Palette

| Option | Description | Selected |
|--------|-------------|----------|
| Carry forward, light tweaks | Same cream/charcoal/green/gold; tighten contrast for AA, define dark-mode | ✓ |
| Carry forward, lean darker | Same family, dark mode default | |
| Refresh — same vibe, new palette | New identity, same warmth | |
| Let me describe | Specific palette in mind | |

**User's choice:** Carry forward, light tweaks

### Q2 — Type pairing

| Option | Description | Selected |
|--------|-------------|----------|
| Keep both | Self-host Playfair + Inter via Astro Fonts API | ✓ |
| Drop Playfair, keep Inter | All-Inter, engineer-site feel | |
| Different serif + Inter | IBM Plex Serif / Newsreader / EB Garamond | |
| Different stack entirely | Fresh pairing | |

**User's choice:** Keep both

### Q3 — Density

| Option | Description | Selected |
|--------|-------------|----------|
| Generous — Collison-style | Whitespace, single column, large type | ✓ |
| Editorial — Appleton-style | Margin annotations, side notes | |
| Designer-tight — Lovin-style | Dense info, multi-column | |
| Plain & functional | No-frills, function-first (Drew DeVault) | |

**User's choice:** Generous — Collison-style

### Q4 — Headshot

| Option | Description | Selected |
|--------|-------------|----------|
| Reuse + optimize current | Existing JPG, generate WebP + srcset, lazy-load | ✓ |
| Reuse, smaller use | Headshot only on About | |
| No headshot, use a graphic | Logo / mark / icon | |
| Need new shoot | Replace before launch | |

**User's choice:** Reuse + optimize current

---

## Operational

### Q1 — Contact mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| mailto: link only | Plain mailto, no spam shielding | |
| Obfuscated mailto | Encoded address to slow harvesters | ✓ |
| Form (serverless) | Vercel function or Web3Forms | |
| Both — mailto + form | Form for inquiries, mailto fallback | |

**User's choice:** Obfuscated mailto

### Q2 — Analytics provider

| Option | Description | Selected |
|--------|-------------|----------|
| Plausible Cloud (EU) — $9/mo | Cleanest UX, EU residency, AGPL | |
| GoatCounter — free | EUPL, simpler dashboard | |
| Self-hosted Umami | Full sovereignty, ops burden (Docker) | ✓ |
| None at launch | Defer analytics | |

**User's choice:** Self-hosted Umami
**Notes:** Hosting target TBD in planning — candidates: nomus, an existing VPS, or Vercel-adjacent project. Surface decision early; Astro template needs the public endpoint to wire the script.

### Q3 — Staging URL

| Option | Description | Selected |
|--------|-------------|----------|
| staging.crossthebridge.io | Dedicated subdomain, clean DNS | ✓ |
| /v2 path on apex | Same domain, awkward URLs | |
| ctb-v2.vercel.app | Vercel preview URL | |
| Different domain entirely | wesleyschlemmer.com or similar | |

**User's choice:** staging.crossthebridge.io

### Q4 — CI gates

| Option | Description | Selected |
|--------|-------------|----------|
| Build + check only | astro check && astro build + Vercel preview | |
| Add Lighthouse threshold | + a11y ≥95 enforced in CI | |
| Add network audit | + automated check that no Google domains contacted | ✓ |
| All three | Build + Lighthouse + network audit | |

**User's choice:** Add network audit
**Notes:** Lighthouse runs informationally on PR previews but doesn't block — over-engineering for a 1-author site. Network audit blocks because the privacy claim is load-bearing.

---

## Claude's Discretion

- Mobile nav implementation pattern (must work <768px)
- JSON-LD schema authoring details
- Exact Tailwind theme config keys + CSS variable names
- File and route conventions (follow Astro defaults)
- Network-audit implementation mechanism (Playwright or lighter)

## Deferred Ideas

- AYLIP detail moves to AI/Petros project page, not About
- Plausible Cloud as fallback if Umami self-hosting proves heavier than expected (revisit gate: 7 days unresolved)
- FBBA membership form on crossthebridge.io if external site lacks clean signup (v2)
- Bitcoin Bay events mailing list scaffolded as "Coming soon" if no list exists yet (Buttondown candidate)
- Manual light/dark toggle (v2 if `prefers-color-scheme` insufficient)
- Newsletter signup, webmentions — v2 milestone

---

*Discussion completed: 2026-04-25*

---

# Phase 1 — Discussion Log (Session 2: pivot to wesleyschlemmer.com)

**Date:** 2026-04-27
**Trigger:** Wesley wrote handwritten redesign notes on 2026-04-26 (`~/.hermes/vault/website redesign notes.pdf`, transcribed mid-session to `~/.hermes/vault/projects/ctb/website-redesign-notes-2026-04-26.md`) describing a richer CTB consulting hub with Choose-Your-Adventure Bitcoin/Privacy/AI sub-pages. /gsd-discuss-phase 01 was invoked to integrate that scope into Phase 1.
**Areas presented:** Consulting hub domain, v1 consulting sub-page set, Third project tile identity, Sub-page body content authoring (4 areas)
**Areas resolved before pivot:** 2 (Consulting hub domain, v1 consulting sub-page set)
**Areas resolved after pivot:** Third project tile identity (resolved by D-20 pivot itself)
**Areas dropped post-pivot:** Sub-page body content authoring (consulting sub-pages move OUT to future CTB brand-site project)

---

## Consulting hub domain

| Option | Description | Selected |
|--------|-------------|----------|
| Subpath on `crossthebridge.io/consulting/*` | Keeps everything under one brand. Maintains D-19 lock. Single Vercel project, single sitemap. | |
| Separate domain on `getpetros.com` | "Petros" framing surfaces in URL. Clean separation. Costs: second Vercel project, second analytics property, cross-domain link discipline. | |
| Subpath now, `getpetros.com` later | Ship Phase 1 on subpath; migrate to `getpetros.com` when AYLIP product launches. Defers the domain decision. | ✓ |

**User's choice:** Subpath now, `getpetros.com` later
**Notes:** Decision became moot when D-20 pivot landed (consulting hub work moves out of this project entirely). Captured for the future CTB brand-site project to inherit.

---

## v1 consulting sub-page set

| Option | Description | Selected |
|--------|-------------|----------|
| Hub + 3 themed sub-pages, full content | All 4 pages with full body copy, services lists, FAQs. ~4 new plans. | ✓ |
| Hub + 3 sub-pages, minimal content | Skeleton + services lists, FAQs deferred. ~3 new plans. | |
| Hub only, sub-pages deferred | Just `/consulting` hub with stubbed sub-page links. ~1 new plan. | |
| Hub + 1 anchor sub-page | Hub + the single most-load-bearing sub-page. ~2 new plans. | |

**User's choice:** Hub + all 3 themed sub-pages, full content
**Notes:** Honors the 2026-04-26 redesign notes most faithfully. Decision moves to the future CTB brand-site project after D-20 pivot — captured there as the inherited scope target.

---

## Third project tile identity

| Option | Description | Selected |
|--------|-------------|----------|
| Tile = "CTB Consulting", page = teaser → /consulting | Recommended pre-pivot. Cleanest funnel from tile to hub. | |
| Tile = "CTB Consulting", no separate page | Skip the intermediate /projects page; tile deeplinks to /consulting. | |
| Keep "AI / Petros / Hermes" tile + page, CTA → /consulting | Original D-03/D-05 framing stays. | |
| **Other (free text):** "Title is Cross the Bridge" | Wesley wrote freeform — flagged the recursion concern (a "Cross the Bridge" tile inside a site already named Cross The Bridge). | ✓ |

**User's choice:** "Cross the Bridge" — but follow-up clarification surfaced the recursion concern, which led to the D-20 pivot.
**Notes:** This was the gateway question that triggered the larger architecture pivot. After the pivot landed, the third tile = "Cross The Bridge" makes sense (no longer recursive) on the personal hub at wesleyschlemmer.com — it's now Wesley listing CTB as one of his projects.

---

## D-20 — Pivot to wesleyschlemmer.com (NEW, mid-session escalation)

Triggered by Wesley's question: *"Well maybe the hub should be wesleyschlemmer.com instead?"*

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — commit to the pivot. wesleyschlemmer.com = personal hub, crossthebridge.io = CTB brand site | Big move but cleanest IA. Solves recursion. CTB consulting work moves to a separate future project. | ✓ |
| Stay on crossthebridge.io — rename third tile to dodge recursion | Keep current architecture. Third tile gets a non-recursive name. | |
| Pause — let me think | Save checkpoint. | |
| Spike it — sketch both architectures side by side via /gsd-sketch | Visual comparison before commit. | |

**User's choice:** Yes — commit to the pivot
**Notes:** Wesley owns both `wesleyschlemmer.com` and `getpetros.com`. The pivot solves the recursion, gives the CTB brand room to grow as its own product (potentially migrating to `getpetros.com` if AYLIP productizes), and lets the legacy `crossthebridge.io` site stay running until a separate `/gsd-new-project` initiative builds the new CTB brand site. Phase 1 of THIS project (now `wesleyschlemmer.com` personal hub) actually SIMPLIFIES — the consulting hub work moves OUT.

---

## Sub-page body content authoring (DROPPED post-pivot)

| Option | Description | Selected |
|--------|-------------|----------|
| Wesley drafts each sub-page | | |
| Claude drafts, Wesley approves at checkpoint | | |
| Hybrid | | |

**User's choice:** N/A — area dropped after D-20 pivot moved the sub-pages out of this project entirely.

---

## How to drive the pivot

| Option | Description | Selected |
|--------|-------------|----------|
| I drive everything inside this discuss-phase session | Claude updates PROJECT.md, ROADMAP.md, REQUIREMENTS.md, CONTEXT.md, STATE.md as a single 'project pivot' commit, then routes to /gsd-plan-phase 01. | ✓ |
| Pause discuss-phase, give checklist | Claude writes a concise edit list, Wesley walks through it on his own time. | |
| Hybrid: Claude drives PROJECT.md + ROADMAP.md, Wesley finalizes CONTEXT.md | | |
| Stop and let Wesley think — commit nothing | | |

**User's choice:** I drive everything inside this discuss-phase session
**Notes:** Wesley wants to keep moving; trusts Claude to drive the artifact updates with a sanity-check before commit.

---

## Pre-existing inputs Wesley provided this session (not gray-area choices, just info captured)

- **FBBA URL:** `https://fbba.io` (replaces earlier `fbba.org` placeholder)
- **Bitcoin Bay URL:** `https://bitcoinbay.foundation` (replaces earlier "Coming soon" placeholder)
- **Domains owned:** `wesleyschlemmer.com`, `getpetros.com` (in addition to `crossthebridge.io`)
- **Cross The Bridge tile copy seed:** From the 2026-04-26 redesign notes — sovereignty as a service, fourth-turning, old-to-new framing, "the world you grew up in no longer exists", "the rules have changed", Petros + AYLIP product mention

---

## Deferred Ideas (this session)

- All consulting hub work (Choose-Your-Adventure pattern, themed sub-pages, FAQ depth, theming approach) → moves to the future CTB brand-site project. Seed input: redesign notes file in vault.
- `getpetros.com` migration target → reserved domain, deferred to AYLIP productization milestone within the future CTB brand-site project.
- `umami.wesleyschlemmer.com` subdomain isolation (vs current `umami.crossthebridge.io`) → optional follow-up if domain-isolation between personal and brand surfaces is preferred.
- Hero copy revisit post-pivot → D-01 still works (visitor on wesleyschlemmer.com reads "I, Wesley, am building Cross The Bridge"), but worth re-reading after the pivot to confirm it lands.

---

*Session 2 (pivot) completed: 2026-04-27*
