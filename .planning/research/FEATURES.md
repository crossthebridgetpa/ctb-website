# Feature Research

**Domain:** Personal portfolio + worldview-driven writing hub with consulting subsection (BTC / Freedom Tech / privacy-aligned)
**Researched:** 2026-04-25
**Confidence:** HIGH (table stakes well-established; differentiators verified against 2026 IndieWeb / sovereign-stack patterns and peer sites in the BTC writing space)

---

## Project-Specific Framing

This site is unusual on two axes that warp the standard "personal portfolio" feature set:

1. **Bifurcated audience.** Freedom Tech / Bitcoin / FBBA peers + Tampa SMB consulting clients. Anything optimized purely for one audience risks repelling the other. Most feature decisions hinge on "does this read as legible to both, or do we need an architectural separation?"
2. **Worldview is the moat.** Anti-surveillance, opt-out, sovereign stack. This makes a chunk of "industry standard" features (GA4, social-login comments, embedded YouTube, hosted form analytics) into anti-features. The features list reflects worldview as a binding constraint, not a vibe.

Goal is **inbound** (podcasts, partnerships, speaking, aligned clients). Every feature is rated against "does this help the right person reach out, or does it merely look professional?"

---

## Feature Landscape

### Table Stakes (Users Expect These in 2026)

Missing any of these makes the site feel either amateur or hostile. Users won't credit you for having them; they'll bounce when they're absent.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Mobile-responsive layout w/ working nav** | Current site fails this (hidden nav <768px, no hamburger) — this is the visible scar to fix first | LOW | Hamburger or bottom-tab pattern; touch targets 44×44 min |
| **Homepage hero w/ identity + 1 primary CTA** | Visitors orient in <5s; if they can't tell who Wesley is and what to do next, they leave | LOW | Worldview tone "front and center but toned down" per PROJECT.md |
| **About page** | Both audiences need it; peers verify alignment, clients verify credibility | LOW | Source: `vault/people/About Me.md` + Polaris doc distillation |
| **Contact path (visible, multiple modalities)** | Inbound is the core value — there must be at least 2 paths (form/email + booking link) | LOW–MED | Form for general, Motion link for paid-consult intake |
| **Project showcase (4 areas: BB, FBBA, FTC, AI/Petros/Hermes)** | Stated requirement; each area gets a "what / why / how to engage" block | MED | Each project page should be cheap to publish — markdown-driven |
| **Long-form essays surface (chronological + by topic)** | Hosting writing on-site is an explicit design choice; without an essays index, the choice is invisible | MED | Markdown content collection; tag/topic taxonomy |
| **Notes feed (shorter posts, separate from essays)** | Two-tier writing pattern is now expected on personal sites (long essays + thinking-out-loud notes) | MED | Same backend as essays, different rendering / index |
| **RSS / Atom feed (full content, absolute URLs, HTTPS)** | Non-negotiable in the BTC/freedom-tech audience — they read in NetNewsWire / FreshRSS / Reeder, not in browsers | LOW | Atom preferred over RSS 2.0 (cleaner spec); auto-discovery `<link>` in `<head>` |
| **`<head>` SEO basics** (meta description, canonical, robots.txt, sitemap.xml) | Current site lacks all of these — invisible to search and crawlers | LOW | Per-route description; one-time setup |
| **Open Graph + Twitter Card metadata** | Link previews on X / Telegram / Signal / Discord — peers share writing in DMs constantly | LOW | Per-page OG tags w/ static fallback image |
| **JSON-LD schema (Person, Article, WebSite)** | 2026 baseline for AI search visibility; rich snippets give 82% higher CTR per industry data | LOW | `Person` linked to `Organization` via `worksFor`; `Article`/`BlogPosting` per essay/note |
| **Privacy-respecting analytics** | Wesley's worldview makes GA4 a non-starter; he still needs to measure inbound | LOW | Plausible (paid, EU-hosted) or self-hosted Umami; pick once |
| **Dark mode (system-preference respecting)** | Default expectation in dev/tech audiences; respecting `prefers-color-scheme` is the floor | LOW | `color-scheme: light dark`, `light-dark()` CSS function for newer browsers; manual toggle optional |
| **Accessibility baseline (WCAG 2.2 AA)** | Skip-to-main, keyboard nav, alt text, ARIA labels, 4.5:1 contrast — stated requirement | MED | Bake in from start; cheaper than retrofit |
| **Performance (LCP <2.5s, image optimization)** | Current site ships a 95KB JPG with no WebP/srcset; lazy-loading is free | LOW | WebP + AVIF, `loading="lazy"`, responsive `srcset` |
| **HTTPS + clean URLs** | Already done via Vercel; just don't break it | LOW | No trailing slash inconsistencies |
| **404 page that's actually useful** | Lets visitors recover (search, recent essays, "did you mean…") | LOW | Recent posts list + search box |

### Differentiators (Competitive Edge for Inbound Goal)

These are where Wesley signals worldview alignment and competence to peers — and quietly demonstrates "I think differently" to consulting clients without preaching at them. Each is a discriminator that turns ambient traffic into real inbound from the right people.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **`/now` page** | Signals participation in the IndieWeb / personal-site movement (2300+ on nownownow.com); peers recognize the pattern instantly. Also disciplines Wesley to update it — surfaces current focus to inbound | LOW | Update quarterly; submit listing to nownownow.com |
| **`/uses` page** | Tribal flag for technical audiences; documents the deGoogled phone, Linux setup, sovereign-stack tooling — auto-credentials Wesley with the freedom-tech crowd | LOW | One markdown page; refresh annually |
| **`/colophon` page** | "Here's how this site is built, why these choices, what's NOT here (no GA, no pixels, no fonts-as-tracking)" — turns the privacy stance into a visible artifact | LOW | One page; doubles as a worldview proof-point without preaching |
| **IndieWeb microformats (h-card, h-entry, h-feed)** | Costs ~5 minutes per template; makes the site machine-readable to the IndieWeb ecosystem and webmention parsers. Aligns with sovereign-stack worldview at zero UX cost | LOW | Add classes to existing markup; verify at indiewebify.me |
| **Webmention support (receive)** | Replaces traditional comments with cross-site replies from anyone with a URL. Extremely on-brand for opt-out-of-walled-gardens worldview. Use webmention.io as the receiver to skip self-hosting | LOW–MED | Webmention.io handles inbound; render verified mentions on essay pages. No moderation queue needed if filtered to verified senders |
| **Nostr identity link (npub) + cross-post** | The BTC/freedom-tech audience is on Nostr; surfacing npub on the site (and ideally cross-posting essays via Habla.news or Highlighter) is a direct credibility signal | LOW | Add `nostr:npub…` link to header / footer; cross-post via long-form Nostr clients |
| **Dynamic OG images (per-essay)** | Per-post link previews look professional and shareable; satori/`@vercel/og` is a one-time setup. Makes essays Twitter/Telegram-share-attractive | MED | `next/og` if Next; `satori` + Astro endpoint for Astro. Template once, generate per-post |
| **Client-side full-text search (Pagefind)** | Self-hosted, zero-tracking, ~$0/mo. Loads index chunks on demand. For a writing-hub site, search is the primary navigation tool past 20 essays | LOW–MED | Pagefind. Index chunking handles 500+ pages cleanly. Integrates with any static framework |
| **llms.txt** | Low-cost hedge on AI-search visibility. Current adoption ~10%, vendor support unconfirmed — but generation cost is negligible (auto-generate from sitemap) | LOW | Mark as "experimental" — no traffic guarantee but cheap to ship |
| **Newsletter signup (Buttondown, with archive on-site)** | Owned channel for inbound; Buttondown is markdown-native, dev-friendly, $9/mo at hobby tier, 100 free subs. Substack carries cultural baggage and the `substack.com` URL undermines the owned-channel point | LOW | Buttondown form embed; auto-import past issues to site as `/newsletter/` archive |
| **Booking embed for consulting CTA (Motion)** | Preserve the working primitive; embed inline on `/consulting` so booking happens without leaving site (slashes drop-off) | LOW | iframe Motion link; ensure mobile-friendly |
| **Code embeds w/ syntax highlighting + copy button** | If essays touch infra/dev/Bitcoin-tooling (likely), readable code blocks + copy button are baseline polish | LOW | Shiki (build-time, zero JS) or Starry Night |
| **Image lightbox (lightweight, no library bloat)** | If photography ends up on site (per Gigi-style precedent), a click-to-expand pattern is expected | LOW | Vanilla `<dialog>` element + CSS; avoid heavy libraries |
| **PGP key + verifiable identity (`/pgp` or `.well-known/`)** | Signals "I take crypto seriously" without saying so. Useful for the FBBA peer group; ignored by SMB clients (which is fine) | LOW | Static page; key fingerprint + ASCII-armored block |
| **Self-hosted fonts (no Google Fonts CDN)** | Current site loads Google Fonts → leaks visitor IPs to Google. Self-hosting is a 1-hour fix that aligns the site with the worldview | LOW | Download Playfair + Inter, serve from `/fonts/`, set `font-display: swap` |
| **Cloudflare Turnstile on contact form (no Google reCAPTCHA)** | Privacy-respecting CAPTCHA alternative; reCAPTCHA would be a worldview violation | LOW | Free; ~10 lines of integration |
| **Per-essay reading time + word count** | Helps readers triage long-form; Lyn-Alden-tier essays often 3000+ words. Cheap to compute at build time | LOW | Build-time computation; display in essay header |
| **"Subscribe" banner that offers RSS *first*, then newsletter** | Subverts the default "give us your email" pattern; RSS-first signals respect for reader autonomy | LOW | Order matters: RSS link, then newsletter signup |
| **Content licensing visible (CC-BY or similar)** | Per Gigi precedent in the freedom-tech writing space; signals the work is meant to be shared and discussed | LOW | Footer note + per-essay license badge |
| **Press/podcasts kit (`/press` or `/media`)** | Direct support for the inbound goal: bio variants (50/100/200 words), high-res headshot, talking points, prior interview list. Removes friction for podcast bookers | LOW | One page; updates per podcast / interview |

### Anti-Features (Deliberately NOT Building — Worldview & Audience Misalignment)

This section is opinionated by design. Wesley wants the worldview reflected in choices, not just essays. These are features the standard "personal portfolio" template will try to pull in — reject them with cause.

| Anti-Feature | Why Requested | Why Problematic | Alternative |
|--------------|---------------|-----------------|-------------|
| **Google Analytics 4 (or any pixel-tracking)** | "How else will you measure?" | Worldview violation; surveils visitors; opens GDPR/privacy attack surface; signals to peers Wesley doesn't actually care about what he writes about | Plausible or self-hosted Umami — measures inbound without identifying visitors |
| **Disqus comments** | "How else do readers engage?" | 1.5MB of JS, heavy ad-tracking, hostile to anonymous readers, requires Facebook/Google login. Total worldview violation | Webmentions for cross-site replies; "discuss on Nostr / X" link per essay. No native comments. |
| **Google reCAPTCHA** | "Stops spam" | Surveils form submitters; trains Google ML; worldview violation | Cloudflare Turnstile (privacy-respecting) or honeypot field for low-traffic baseline |
| **Embedded YouTube (default)** | "Shows the talk" | youtube.com embed loads ~1MB of tracking even if user doesn't play. Leaks visitor data to Google | `youtube-nocookie.com` embed, or static thumbnail-link to `inv.tube` / `redirect.invidious.io` / direct video |
| **Engagement-bait popups (newsletter modal, "wait! before you go!")** | "Boosts conversions" | Treats readers as conversion targets; signals desperation; the wrong-shape inbound | Inline RSS+newsletter offers in essay footers; let the reader decide |
| **Social-login for any feature** | "Reduces friction" | Hands every visitor's identity to Meta/Google; nothing on this site needs identity | If anything ever needs auth, do magic-link email or Nostr NIP-07 |
| **Comments requiring registration** | "Stops spam" | Filters out exactly the readers most worth hearing from (one-off thoughtful responders) | Webmentions + email — open inbox is the inbound channel |
| **"As seen on" logo wall (for personal section)** | "Builds credibility" | On the personal/portfolio surface this reads as marketing posture; misaligned with worldview-led tone | OK on `/consulting` subsection where it serves SMB-client signal; KEEP OFF homepage |
| **Lifestream / daily log / public journal** | "Authenticity!" | Explicitly out-of-scope per PROJECT.md; feeds-as-content burns time without inbound payoff | Notes feed is curated short posts, not a daily diary |
| **"Trusted by 100+ Bitcoin companies" testimonial wall on homepage** | "Social proof" | If true, fine on `/consulting`. On the personal homepage it dilutes worldview signal and looks needy | Reserve testimonials/logos for the consulting subsection where they earn their keep |
| **Live-chat widget (Intercom, Drift, etc.)** | "Capture leads instantly" | Heavy JS; loads tracking pixels; aesthetically mismatched with worldview; expensive | Visible email + booking link; chat is not the right modality for inbound here |
| **Push notifications for new posts** | "Re-engagement!" | Notification fatigue; permission grant feels intrusive; RSS already solves this | RSS + newsletter — opt-in, async, reader-controlled |
| **Webrings (in 2026 form)** | "IndieWeb energy!" | The aesthetic is right but webrings now mostly link to inactive sites; signal-to-noise is poor | A curated `/links` or `/blogroll` page with hand-picked sites is the modern equivalent — same energy, useful payload |
| **"Built with [framework]" badge in footer** | Vendor tradition | Mildly tacky on a personal site; the colophon page already covers this with depth | Colophon page: yes. Footer badge: no |
| **Cookies banner / consent modal (because no tracking)** | "GDPR, surely?" | If you set zero cookies and run no third-party tracking, the banner is not required and adds noise | Don't set cookies. Don't load trackers. No banner needed. (Verify with colophon page.) |
| **AI-generated stock imagery** | "Fills the visual space" | Generic; reads as low-effort to the audience; misaligned with the craft tone of the writing | Real photos (Wesley, Tampa Bay scenes, project artifacts), custom illustration, or restraint |
| **Infinite scroll on essay index** | "Keep them on the page" | Breaks pagination, deep-linking, and Cmd+F. Hostile to focused readers | Pagination or a long static index — let readers control their session |

---

## Feature Dependencies

```
Markdown content collection (build pipeline)
    ├──requires──> Framework with content-collection support (Astro / Next / 11ty)
    └──enables──> Essays index
                  Notes feed
                  RSS/Atom feed
                  Search (Pagefind needs built HTML to index)
                  Per-post OG images (Satori reads frontmatter)
                  JSON-LD per-post (reads frontmatter)
                  llms.txt (auto-generate from sitemap)

JSON-LD Person + Organization schema
    └──enhances──> Article/BlogPosting JSON-LD (linked via author/publisher)

Microformats (h-entry, h-card)
    ├──enables──> Webmention parsing by webmention.io
    └──enhances──> RSS feed (semantic markup for richer rendering)

Webmentions
    └──requires──> Microformats markup
    └──requires──> webmention.io receiver endpoint
    └──conflicts──> Native comment system (don't ship both)

Newsletter (Buttondown)
    ├──enables──> Newsletter archive page (Buttondown exposes archive feed)
    └──enhances──> RSS feed (cross-link)

Pagefind search
    └──requires──> Static HTML output (any SSG works)
    └──enhances──> Notes feed (notes get findable)

Dynamic OG images
    └──requires──> Edge function or build-time generation (Vercel-compatible)
    └──enhances──> Every essay/note share

Dark mode
    ├──requires──> CSS custom properties for theming
    └──enhances──> Accessibility (some users need it)
    └──conflicts──> Hard-coded colors in inline styles (current site has 1100 lines of these)

Consulting subsection
    ├──requires──> Routing strategy (subpath /consulting OR subdomain consulting.crossthebridge.io)
    └──requires──> Motion booking embed
    └──enhances──> Press kit (consulting clients verify credibility same way podcasters do)
```

### Dependency Notes

- **Framework choice cascades widely:** Almost every differentiator (search, OG images, microformats injection, RSS) depends on choosing a framework with strong content-collection support. The stack research will close this. Astro is the strongest fit for this profile (content-first, Vercel-native, Pagefind/Satori integrations are well-trodden).
- **Webmentions vs. comments is mutually exclusive:** Don't ship both. Webmentions IS the comment story — they're just decentralized.
- **Microformats are the cheapest force-multiplier:** Adding `class="h-entry"` etc. to existing markup costs ~5 min per template and unlocks both webmention rendering and IndieWeb-ecosystem participation.
- **Consulting subsection should be architecturally separable:** Whether subpath or subdomain, it should be possible to retire/spin out without rewriting the personal site. This argues for content/route isolation in the framework.

---

## MVP Definition

### Launch With (v1) — "Site exists, inbound is possible"

The minimum to replace the current single-page site without regression and unlock the inbound channel.

**Identity & Navigation:**
- [ ] Homepage (worldview tone front-and-center but distilled, primary CTA, intro to four project areas)
- [ ] Working mobile nav (hamburger or equivalent — fixes the current scar)
- [ ] About page (sourced from About Me + Polaris)
- [ ] 404 page that recovers gracefully
- [ ] Footer with: RSS link, newsletter link, contact, Nostr npub, social handles

**Project Showcase:**
- [ ] Bitcoin Bay page
- [ ] FBBA page
- [ ] Freedom Tech Consulting page (umbrella positioning)
- [ ] AI / Petros / Hermes page
- [ ] Each project page: what / why / how to engage (not exhaustive case studies in v1)

**Consulting Subsection:**
- [ ] `/consulting` (or `consulting.crossthebridge.io`) preserving current $499 / $1500+$250 / $3000+$500 offer structure
- [ ] Motion booking embed inline
- [ ] Brief credibility surface (testimonials/logos OK here)

**Writing:**
- [ ] Essays index + 2-3 seed essays at launch (don't ship empty)
- [ ] Notes feed surface (can be empty at launch but the route exists)
- [ ] RSS/Atom feed (full content, absolute URLs)

**SEO / Discovery / AI-search:**
- [ ] Per-route meta description, canonical, OG, Twitter Card
- [ ] sitemap.xml (auto-generated)
- [ ] robots.txt
- [ ] llms.txt (experimental, auto-generated)
- [ ] JSON-LD: Person on About, WebSite on root, BlogPosting on essays
- [ ] Static OG fallback image (dynamic per-essay can come post-launch)

**Contact:**
- [ ] Visible email address
- [ ] Contact form (Formspree or Basin) with Cloudflare Turnstile
- [ ] Booking link prominent on `/consulting`

**Privacy & Tone:**
- [ ] Plausible OR self-hosted Umami (decide once)
- [ ] Self-hosted fonts (no Google Fonts CDN)
- [ ] Zero cookies / zero third-party trackers — verifiable via colophon

**Accessibility & Performance:**
- [ ] Skip-to-main link
- [ ] Keyboard navigation works end-to-end
- [ ] Alt text on all images, ARIA on interactive elements
- [ ] WebP/AVIF + responsive `srcset` + lazy-loading
- [ ] Dark mode respecting `prefers-color-scheme` (manual toggle optional in v1)

**Worldview-aligned IndieWeb minimums:**
- [ ] Microformats (h-card on About, h-entry on essays/notes, h-feed on indexes) — cheapest credibility win available
- [ ] `/colophon` page documenting tech choices and the no-tracking stance

### Add After Validation (v1.x) — "Inbound is flowing, now amplify"

Add once v1 is shipped and we see whether anyone actually shows up.

- [ ] **Newsletter (Buttondown)** — add when there's a 3rd or 4th essay live and a reason to send something. Empty newsletters with no archive look worse than no newsletter.
- [ ] **`/now` page** — once Wesley has something current to put on it; submit to nownownow.com directory.
- [ ] **`/uses` page** — easy lift; defer to v1.x only because it's easy to drop in.
- [ ] **`/press` (media kit)** — trigger: first podcast inbound. Build it the day after the first interview request lands.
- [ ] **Dynamic OG images per essay** — trigger: 5+ essays live and shareable (`@vercel/og` or Satori/Astro endpoint).
- [ ] **Pagefind search** — trigger: 10+ essays/notes total. Below that, manual scan works.
- [ ] **Webmention receiver (webmention.io + render on pages)** — trigger: first inbound webmention OR first essay reaches >1000 reads on a peer's site.
- [ ] **Code copy buttons + Shiki syntax highlighting** — trigger: first essay with non-trivial code blocks.
- [ ] **PGP key page** — trigger: first peer asks for a way to verifiably contact Wesley off-platform.

### Future Consideration (v2+)

- [ ] **Nostr cross-posting workflow** — long-form posts mirrored via Habla.news or Highlighter on publish (CI step).
- [ ] **Image lightbox / photography section** — only if photography becomes part of the writing voice.
- [ ] **Audio essays / podcast feed** — only if Wesley wants to add a podcast SKU.
- [ ] **Webmention sending (outbound)** — fully bi-directional IndieWeb; receiver alone is 80% of the value.
- [ ] **Per-essay reading-time and word-count badges** — polish; ship when essays index gets dense.
- [ ] **Curated `/links` blogroll** — modern webring substitute; ship once Wesley has a stable list of peer sites worth surfacing.
- [ ] **Subscription tiers / paid newsletter** — only if Wesley wants to monetize writing directly. Substack-pattern, but keep on Buttondown to retain owned-channel.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Working mobile nav | HIGH | LOW | P1 |
| Homepage + worldview-toned hero | HIGH | LOW | P1 |
| Project showcase pages (4 areas) | HIGH | MED | P1 |
| Consulting subsection w/ Motion embed | HIGH | LOW | P1 |
| Essays index + 2-3 seed essays | HIGH | MED | P1 |
| RSS/Atom feed (full content) | HIGH (peers) | LOW | P1 |
| SEO basics (meta, sitemap, robots, JSON-LD) | HIGH | LOW | P1 |
| Contact form w/ Turnstile | HIGH | LOW | P1 |
| Privacy-respecting analytics (Plausible/Umami) | HIGH (Wesley) | LOW | P1 |
| Self-hosted fonts (no Google Fonts) | MED | LOW | P1 |
| Microformats (h-card, h-entry, h-feed) | HIGH (peers) | LOW | P1 |
| `/colophon` page | MED | LOW | P1 |
| Dark mode (system-respecting) | MED | LOW | P1 |
| Accessibility baseline (WCAG 2.2 AA) | HIGH | MED | P1 |
| Notes feed surface | MED | MED | P1 |
| llms.txt | LOW | LOW | P1 (cheap hedge) |
| About page | HIGH | LOW | P1 |
| Newsletter (Buttondown) | MED | LOW | P2 |
| `/now` page | MED | LOW | P2 |
| `/uses` page | MED | LOW | P2 |
| `/press` media kit | HIGH (when triggered) | LOW | P2 (trigger-driven) |
| Dynamic per-essay OG images | MED | MED | P2 |
| Pagefind search | MED | LOW–MED | P2 |
| Webmention receiver | HIGH (peers) | MED | P2 |
| Code syntax highlighting + copy | MED | LOW | P2 |
| PGP key page | LOW (broad) / HIGH (FBBA) | LOW | P2 |
| Nostr cross-posting | MED | MED | P3 |
| Image lightbox | LOW | LOW | P3 |
| Audio / podcast feed | LOW | MED | P3 |
| Webmention sending (outbound) | LOW | MED | P3 |
| Curated `/links` blogroll | LOW | LOW | P3 |

**Priority key:**
- P1: Must have for v1 launch
- P2: Add post-launch when triggered
- P3: Future / contingent on direction

---

## Competitor / Reference Site Analysis

| Pattern | sive.rs (Derek Sivers) | lynalden.com | dergigi.com | Our Approach |
|---------|------------------------|--------------|-------------|--------------|
| Homepage tone | Plain text, opinionated | Professional, research-led | Essay-first, photography secondary | Worldview-toned but distilled (per Wesley's brief) |
| Writing surface | Long essays + directory of pages | Newsletter archive + member area | Essays + Bitcoin projects + photo | Essays + notes (two-tier), all on-site |
| Newsletter | "Subscribe" simple form | First-class — newsletter IS the product | Zaps / sponsorship via GitHub | Buttondown, RSS-first, newsletter as v1.x |
| Comments | None | None | None | None — webmentions for v1.x |
| `/now` page | Yes (originated the pattern) | No | No (but has projects pages) | Yes — v1.x |
| `/uses` | No | No | No | Yes — v1.x |
| Search | None visible | No (newsletter archive only) | None | Pagefind v1.x |
| Analytics | Self-hosted (Sivers is a privacy hawk) | Unclear | Unclear | Plausible or self-hosted Umami |
| Hosting writing | On-site | On-site | On-site (GitHub Pages) | On-site (decision locked in PROJECT.md) |
| Project showcase | Single "Projects" page | Investing newsletter is the product | Projects page w/ Bitcoin tooling | Four full project areas |
| Consulting / commerce | Books for sale | Premium newsletter members area | Sponsorship | `/consulting` subpath/subdomain w/ Motion booking |

**Lessons applied:**
- **Sivers:** Plain, fast, opinionated, no third-party junk. Prove the worldview by what's NOT loaded.
- **Alden:** Newsletter is treated as a first-class artifact, with archive and structure. Even if newsletter is v1.x, build the site so it slots in cleanly later.
- **Gigi:** Hosting under your own domain, projects as discrete artifacts with their own value, CC-licensed writing. Keep ownership obvious.

---

## Sources

### IndieWeb / Personal-site patterns
- [microformats - IndieWeb](https://indieweb.org/microformats)
- [h-entry - IndieWeb](https://indieweb.org/h-entry)
- [h-card - IndieWeb](https://indieweb.org/h-card)
- [Webmention - IndieWeb](https://indieweb.org/Webmention)
- [IndieWebify.Me — getting on the IndieWeb](https://indiewebify.me/)
- [Indie Web: Reclaiming Digital Independence (2025)](https://www.glukhov.org/post/2025/10/indie-web-overview/)
- [How and why to make a /now page on your site — Derek Sivers](https://sive.rs/now2)
- [nownownow.com — directory of /now pages](https://nownownow.com/)

### Privacy-respecting analytics
- [Plausible vs Umami vs Fathom Analytics 2026 — APIScout](https://apiscout.dev/blog/plausible-vs-umami-vs-fathom-analytics-2026)
- [Umami vs Plausible vs Matomo for Self-Hosted Analytics](https://aaronjbecker.com/posts/umami-vs-plausible-vs-matomo-self-hosted-analytics/)
- [Best Privacy-First Analytics Compared — Nuxt Scripts](https://scripts.nuxt.com/learn/privacy-first-analytics-compared)

### llms.txt
- [The /llms.txt file — llmstxt.org](https://llmstxt.org/)
- [Meet llms.txt, a proposed standard for AI website content crawling — Search Engine Land](https://searchengineland.com/llms-txt-proposed-standard-453676)

### Schema / SEO
- [Schema Markup for SEO & AI Visibility (2026) — Rankeo](https://rankeo.io/blog/schema-markup-complete-guide)
- [JSON-LD for SEO: Complete Schema Markup Guide (2026) — Foglift](https://foglift.io/blog/json-ld-seo-guide)

### Newsletter platforms
- [Buttondown vs. Substack](https://buttondown.com/comparisons/substack)
- [21 Best Email Tools for Developer Newsletters (2026) — Sequenzy](https://www.sequenzy.com/blog/best-email-tools-for-developer-newsletters)

### Search
- [Moving Away from Google Site Search: Implementing Pagefind for Static Sites](https://dev.to/tumf/moving-away-from-google-site-search-implementing-pagefind-for-static-sites-ij1)
- [A Brief and Incomplete Catalog of Static Site Search Options](https://assert.cc/posts/static-blog-search-options/)

### OG image generation
- [Vercel: Open Graph (OG) Image Generation](https://vercel.com/docs/og-image-generation)
- [Next.js: Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Dynamic Open Graph Images with Satori and Astro](https://knaap.dev/posts/dynamic-og-images-with-any-static-site-generator/)

### Comments / Webmentions
- [giscus](https://giscus.app/) — for reference; we're choosing webmentions instead
- [Comment systems for static websites — Dan MacKinlay](https://danmackinlay.name/notebook/static_site_comments.html)

### Contact form / spam protection
- [Cloudflare Turnstile — CAPTCHA Replacement](https://www.cloudflare.com/application-services/products/turnstile/)
- [Top Formspree Alternatives in 2026](https://slashdot.org/software/p/Formspree/alternatives)

### Dark mode
- [prefers-color-scheme — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Dark Mode & Theming — Ensuring Accessibility — Accesify](https://www.accesify.io/blog/dark-mode-theming-accessibility-color-schemes/)

### Accessibility
- [Web Accessibility Checklist 2026: WCAG 2.2 — Line25](https://line25.com/articles/web-accessibility-checklist-2026/)
- [WCAG 2.2 — W3C](https://www.w3.org/TR/WCAG22/)

### RSS/Atom
- [RSS Feed Best Practices — Kevin Cox](https://kevincox.ca/2022/05/06/rss-feed-best-practices/)
- [Atom vs RSS: Key Differences (2026) — RSSValidator](https://rssvalidator.app/atom-vs-rss)

### Reference sites in the BTC / freedom-tech writing space
- [Lyn Alden — Investment Strategy](https://www.lynalden.com/)
- [Pete Rizzo](https://peterizzo.com/)
- [dergigi.com](https://dergigi.com/)
- [Derek Sivers — sive.rs](https://sive.rs/)

### Booking / consultant CTA
- [Booking Landing Page Examples in 2026 — Unicorn Platform](https://unicornplatform.com/blog/best-booking-landing-page-examples-in-2026/)
- [Best CTA Placement Strategies For 2026 Landing Pages](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages)

---
*Feature research for: personal portfolio + worldview-driven writing hub w/ consulting subsection*
*Researched: 2026-04-25*
