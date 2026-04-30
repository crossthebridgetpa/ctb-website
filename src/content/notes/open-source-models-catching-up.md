---
title: Open Source Agents are Catching Up
description: The era of walled gardens is ending
published: 2026-04-28
tags:
  - ai
  - open-source
  - freedom-tech
related: []
draft: false
featured: false
status: seedling
---

Hermes Agent, the open source agent framework from Nous Research, hit 100,000 stars on GitHub in April '26. 53,000 of those stars landed in a single week. The repo is the number one trending repository on the platform.

Two years ago, an "AI agent" meant calling OpenAI's API in a loop with some glue code. The infrastructure was closed. The models were closed. The only open piece was the loop itself, and even that was usually sitting inside someone's proprietary product. If you wanted to build with agents, you were building on rented land.

What I'm seeing now is different. Hermes Agent is model agnostic by design. That's their explicit philosophy *"everyone should have access to AI. We don't dictate the rules of use for your agent, YOU do."* The framework supports Ollama for local models, AWS Bedrock for enterprise, every major closed API as a swappable backend, and a growing skill ecosystem. 300+ models are now reachable through one open subscription via the Tool Gateway.

The pattern is open source agent frameworks pulling closed APIs into their orbit instead of being held inside them.

For people building on freedom-tech stacks, this matters. It means the agent layer is not going to be a permanently rented concession. It means a selfhostable orchestration layer can sit on top of whatever models you trust, local Llamas, Mistrals, Qwens, whatever lands next quarter, without you having to rewrite your stack when a vendor changes terms. It means the moat for closed source agent platforms is shrinking from "we have the orchestration AND the models" to "we have the models, for now."

I don't know whether the 100k-stars compounds or plateaus. Open source momentum is famously lumpy. But the structural piece - agents going open, model layer going pluggable, infrastructure becoming self hostable - feels durable. That's the trend I'm tracking.

If you're building anything that depends on long running agentic capability, building on the open layer is starting to look less like a values choice and more like a survival choice.
