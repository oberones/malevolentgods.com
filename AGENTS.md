# AGENTS.md — new-malevolentgods.com

This file is for future AI agents working inside the `new-malevolentgods.com` project.

## What this project is

This is the in-progress rebuild of the `malevolentgods.com` website.

### Legacy site
The old site is a hand-authored static HTML/Bootstrap/jQuery site in:
- `/home/node/.openclaw/workspace/malevolentgods.com`

It has known bugs, missing pages, old cruft, and inconsistent structure.
Do **not** treat the legacy site as a canonical source of truth for architecture quality.
Use it as a **content/reference source**, not as a design or implementation standard.

### New site
The rebuild lives in:
- `/home/node/.openclaw/workspace/new-malevolentgods.com`

Target stack:
- **Astro**
- **Tailwind CSS**
- **Sanity**
- static deployment via **nginx**/**Docker** for testing

---

## Project goals

The rebuild is meant to:
- modernize the site structure
- improve mobile experience
- reduce hand-maintained repeated HTML
- support easier publishing of new art/music/writing/software content
- migrate gradually by vertical slices

The first major vertical slice is:
- **Music**

---

## Current status

At time of writing, the project already includes:
- Astro scaffold
- Tailwind configuration and theme tokens
- shared layout and UI primitives
- starter Sanity integration
- initial Sanity schema set
- sample seed content
- first-pass music routes and components
- Docker/nginx test deployment files
- Makefile

Important docs in the project root:
- `malevolentgods.com-astro-migration-plan.md`
- `PHASE-1-NOTES.md`
- `MUSIC-SLICE-PLAN.md`
- `MUSIC-MIGRATION-CHECKLIST.md`
- `MUSIC-MIGRATION-WORKSHEET.md`
- `MUSIC-SLICE-STATUS.md`
- `SANITY-SEEDING-PLAN.md`
- `DEPLOY-TESTING.md`

Read those before making major structural changes.

---

## How the project is organized

### App code
- `src/layouts/` — page shells
- `src/components/` — reusable UI components
- `src/pages/` — Astro routes
- `src/lib/` — shared data loaders, queries, sample data, config
- `src/styles/` — global styles

### Sanity
- `sanity/schemaTypes/` — document/object schemas
- `sanity/seed/` — sample seed JSON and notes
- `sanity.config.ts` — Studio config

### Deployment/testing
- `Dockerfile`
- `docker/nginx/default.conf`
- `Makefile`
- `DEPLOY-TESTING.md`

---

## Source-of-truth rules

### For structure and implementation
Prefer the **new project code** and root planning docs.

### For content migration
Use the legacy site only as a reference source.
If a legacy page is missing, broken, contradictory, or obviously sloppy, assume that is legacy cruft unless there is evidence it encodes important content.

### For music migration
The best current references are:
- `MUSIC-MIGRATION-WORKSHEET.md`
- `MUSIC-MIGRATION-CHECKLIST.md`
- `src/lib/music-sample.ts`
- `sanity/seed/music-artists.sample.json`
- `sanity/seed/music-releases.sample.json`

---

## Important architectural intent

### 1. Prefer Sanity-backed content, but do not block on it
The codebase is intentionally set up to:
- use **Sanity content when available**
- fall back to **local sample data** when not

Do not remove fallback behavior casually unless the project is clearly ready to make Sanity mandatory.

### 2. Keep migration incremental
Do not try to redesign every section at once.
Preferred sequence:
1. stabilize shared foundation
2. complete Music slice
3. move to next vertical slices

### 3. Do not preserve old bugs for authenticity
If the old site had:
- missing pages
- broken links
- typo-ridden labels
- weird embed usage
- inconsistent markup

…that is not sacred. Clean it up.

### 4. Keep the site mostly static unless requirements change
The current deployment shape assumes a static Astro build served by nginx.
Do not introduce SSR complexity unless there is a clear need.

---

## How to work safely in this repo

### Before large changes
Read:
- `README.md`
- `PHASE-1-NOTES.md`
- the relevant slice/status docs

### When adding new content models
Prefer extending the current schema set rather than inventing a parallel system.
Keep schemas practical. Avoid premature over-modeling.

### When changing routes
Be mindful of current route conventions:
- `/music`
- `/music/[slug]`
- `/artists/[slug]`
- `/art`
- `/writing`
- `/projects`

### When changing embeds
Use the reusable embed components instead of page-specific iframe hacks.
Current embed foundation:
- `src/components/EmbedFrame.astro`
- `src/components/MusicCard.astro`

### When improving music pages
Prefer improvements that help migration momentum:
- richer release pages
- better artist pages
- featured sections
- better mobile layout
- credits/body/cover support

---

## Things future agents should probably do next

High-value next actions likely include:
1. runtime verification (`npm install`, build, preview, Docker test)
2. seed initial Sanity content
3. improve artist/release templates with richer metadata
4. connect more sections to real Sanity content
5. continue migration beyond Music once Music is solid

---

## Anti-patterns to avoid

- blindly copying legacy HTML into Astro pages
- preserving legacy navigation/path bugs just because they existed
- adding framework complexity without a clear need
- overengineering schemas before content actually demands it
- removing fallback sample data too early
- treating missing old pages as blockers

---

## Practical commands

Preferred convenience entry points:
- `make help`
- `make install`
- `make dev`
- `make build`
- `make preview`
- `make studio`
- `make docker-build`
- `make docker-run`

---

## Working philosophy for this project

Be pragmatic.

This rebuild is not about perfectly memorializing a buggy old site.
It is about extracting the useful creative content and giving it a better home.

When in doubt:
- preserve the content
- improve the structure
- simplify the workflow
- make the result feel intentional
