---
status: partial
phase: 02-writing-surface
source: [02-VERIFICATION.md]
started: 2026-04-30T19:50:00Z
updated: 2026-04-30T19:50:00Z
---

## Current Test

[awaiting human testing — gated on first Vercel deploy of staging.wesleyschlemmer.com]

## Tests

### 1. W3C Feed Validation
expected: All three RSS feeds validate clean (or with non-blocking warnings only) at https://validator.w3.org/feed/
- /rss.xml (combined feed, 7 items)
- /essays/rss.xml (2 items)
- /notes/rss.xml (5 items)
result: [pending]

### 2. Feed reader render
expected: Subscribing to /rss.xml in NetNewsWire (macOS) or Reeder shows all 7 entries with full article bodies (HTML rendered, not just title+description)
result: [pending]

### 3. IndieWebify.me microformat validation
expected: https://indiewebify.me reports valid h-entry on at least one essay URL and one note URL, valid h-feed on /essays/, /notes/, /writing/, /topics/[tag], and valid h-card on /about
result: [pending]

## Summary

total: 3
passed: 0
issues: 0
pending: 3
skipped: 0
blocked: 0

## Gaps
