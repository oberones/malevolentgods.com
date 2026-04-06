# Art Slice Plan

This document defines the next vertical slice after Music: **Art**.

## Why Art next

Art is the next strongest candidate because:
- it is already a top-level section in the legacy site
- it appears to feature multiple artists
- the content is media-first and highly visible
- the new site already has reusable patterns that can be adapted for art cards, artist profiles, and gallery/project pages

---

## High-level goal

Build a first-pass art section in the new stack that:
- replaces the legacy art landing page
- presents artists more cleanly
- preserves galleries and image captions/process notes
- supports a more editorial presentation than the current gallery dump pages

---

## Recommended first-pass route structure

### Routes
- `/art`
- `/art/[slug]`

### Notes
For the first pass, treat each artist gallery page as an `artProject`-style page or art profile page under `/art/[slug]`.

This is good enough to migrate the current site quickly.
Later, if needed, the model can split into:
- artist profile pages
- individual artworks
- series/collections

---

## First-pass content model recommendation

Use the existing `artProject` schema as the starting point.

For the first migration pass, each current legacy artist gallery can map to one `artProject` document with:
- title
- slug
- associated artist(s)
- summary
- body
- cover image
- gallery
- medium
- year (optional)
- featured flag

Potential later refinement:
- separate `artwork` documents
- series/collection support
- per-image captions embedded as richer gallery objects

For now: do not over-model.

---

## Proposed implementation slices inside Art

### Slice A1 — Audit and mapping
- inventory legacy art pages and image assets
- identify artist/gallery pages
- record descriptions and per-image captions
- identify broken or missing pages

### Slice A2 — Art landing page
Build `/art` with:
- section intro
- artist/project cards
- cover image previews
- cleaner hierarchy than the legacy three-box layout

### Slice A3 — Art detail template
Build `/art/[slug]` with:
- title
- summary/body
- hero/cover image
- responsive gallery grid
- optional per-image captions/process notes

### Slice A4 — Initial migration
Start with the currently visible legacy entries:
- Enoch Root Art
- Ignus VanMule Art
- Reverend Phu art entry (if enough source material exists)

---

## Immediate recommendation

Start the Art slice by creating:
1. the migration worksheet
2. sample seed content for the first art entries
3. the `/art` listing page
4. the `/art/[slug]` template

That sequence matches what worked for Music.
