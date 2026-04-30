---
title: "Why I chose Astro over Next.js"
description: "A framework that defaults to no JavaScript fits a worldview that defaults to no surveillance. Picking the right tool for a values-aligned personal site."
published: "2026-04-28"
tags:
  - astro
  - freedom-tech
  - tooling
related: []
draft: false
featured: false
status: budding
---

This site runs on Astro. Not Next.js, not a hand-rolled HTML stack, not a headless CMS feeding React. The decision wasn't about benchmarks. It was about defaults.

Next.js is the answer when you have a SaaS app — auth, dashboards, per-user state, server-rendered React tied tightly to dynamic data. It's a good answer for that shape of problem. It is not the answer for a personal site that hosts essays, project pages, and the occasional note. For that shape, Next.js ships a React runtime to every visitor whether they need it or not. You spend the rest of your time fighting the framework's defaults to keep that runtime small.

Astro inverts the contract. Zero JavaScript by default. A page is HTML and CSS unless you explicitly mark a component as interactive. The framework's posture matches the posture I want the site to have toward visitors: respect their bandwidth, their batteries, their attention, and — most importantly — don't ship code that watches them.

That last part is the values-aligned read. A framework that defaults to *no scripts* is a framework that defaults to *no fingerprinting, no tag managers, no third-party tracking pixels you forgot you wired in three years ago*. You can still add those things in Astro if you want them. You just have to do it on purpose. The defaults are on the side of the visitor.

There's a tooling read too. Astro's content collections give me typed Markdown — frontmatter validated by Zod schemas at build time — and that means essays and notes are just files in a folder I can edit in any tool I want. The same `.md` files that live in my Obsidian vault flow into the repo with no transformation. No CMS lock-in, no proprietary export format, no SaaS that holds my writing hostage.

The third read is sovereignty-by-default. Static output deploys anywhere — Vercel today, a VPS or a Cloudflare worker or a Pi at home tomorrow. The `dist/` directory is just files. There's no runtime dependency I have to keep paying for to keep the site online.

I picked the framework whose defaults match my values. The fact that the site is faster and cheaper to host is a bonus, not the point.
