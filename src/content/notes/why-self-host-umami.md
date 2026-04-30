---
title: "Why I self-host Umami"
description: "The difference between analytics-as-surveillance and analytics-as-information. Why I run Umami on my own VPS instead of Plausible Cloud or — obviously — GA4."
published: "2026-04-28"
tags:
  - privacy
  - analytics
  - self-hosting
related:
  - thesis
  - why-astro-over-next
draft: false
featured: false
status: budding
---

Most sites in 2026 still run Google Analytics. The wiring is automatic — your CMS template ships with the snippet, your marketing person assumes you want it, your hosting provider may even add it for you "to help you grow." It's the surveillance default. Visitors get tagged, fingerprinted, and joined against the rest of Google's ad-graph. Nobody asked them.

Plausible is the popular escape hatch. It's good. It's open-source under AGPL. The hosted version sits in the EU, no cookies, no consent banner. For most people, paying $9 a month to Plausible is a strict upgrade over GA4.

I run Umami instead, and I run it on my own VPS — `umami.crossthebridge.io`, behind nginx, in a Docker container I can pull the plug on whenever I want. Three reasons.

**One: data location matters.** When I'm thinking about a visitor — what page they read, what referrer brought them in, how long they stayed — that data is mine to look at. It's not Plausible's, not Cloudflare's, not Vercel's. The data lives on a VPS I rent, behind a domain I own, in a database I can dump and inspect. If the analytics vendor disappears tomorrow, I still have history. If they pivot, raise prices, or get acquired, I'm not migrating.

**Two: the difference between analytics and surveillance is whether the visitor is the product.** Umami doesn't fingerprint. It doesn't set cookies. It doesn't hash IPs and sell aggregates back. It counts pageviews and referrers and gives me a chart. That's information. Surveillance is what happens when "analytics" tries to identify a person across sessions, sites, and devices to optimize an ad against them. Umami isn't trying to do that. GA4 is.

**Three: the bar for what I run on my site should match the bar I write about.** I write about freedom tech, sovereignty, opting out of legacy systems. If I were piping visitor IPs into Google's ad graph in the same breath, the writing would be theater. Self-hosted analytics is a small thing. But the small things stack up to whether the site is *legibly* aligned with what it claims to value.

Plausible Cloud would've been fine. Self-hosted Umami is more aligned. I'd rather pay the maintenance tax than the alignment tax.
