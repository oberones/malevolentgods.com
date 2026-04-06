# Music Slice Plan

This document bridges Phase 1 into the first real migration vertical slice: **Music**.

## Why Music first

The legacy site already has substantial music content, including:
- a music landing page
- individual artist pages
- embedded Bandcamp releases
- embedded Spotify artist content
- embedded SoundCloud content

That makes music the highest-value first slice because it already exercises:
- structured artist content
- release/project content
- embed handling
- image/media presentation
- cross-linking between artists and releases

---

## Goals for the music slice

Build a complete music section in the new stack that can replace the legacy music section.

That includes:
- `/music` landing page
- artist profiles
- music release/project pages
- reusable embeds
- better mobile presentation
- easier content entry through Sanity

---

## Legacy content identified so far

From the old site, the following music pages were observed:
- `music/index.html`
- `music/doeslittle.html`
- `music/enoch.html`
- `music/ignus.html`
- `music/kerberos.html`
- likely `music/group.html`

These should be audited carefully for:
- artist bios and blurbs
- release titles
- embed providers and URLs
- cover art or artist imagery
- external profile links

---

## Music data model (current first pass)

### Artist
Use for:
- Dr. Doeslittle
- Enoch Root
- Ignus VanMule
- Kerberos
- Malevolent Gods (if treated as a group profile)

Current fields include:
- name
- slug
- shortBio
- bio
- heroImage
- portrait
- roles
- links
- featured
- seo

### Music Release
Use for:
- albums
- EPs
- singles
- compilations
- other release-like music pages

Current fields include:
- title
- slug
- artists
- releaseType
- summary
- body
- coverImage
- releaseDate
- embed
- links
- credits
- trackCount
- featured
- seo

---

## Proposed implementation slices inside Music

### Slice M1 — Content extraction and mapping
Create a migration mapping from old pages into new content types.

For each legacy music page, capture:
- page path
- target content type (`artist` or `musicRelease`)
- title/name
- summary text
- embed provider
- embed URL
- external links
- imagery needed
- notes/issues

### Slice M2 — Music listing page
Build `/music` using structured content.

Needs:
- hero/intro section
- featured artists/releases
- card grid
- clean mobile layout

### Slice M3 — Artist detail template
Build a reusable artist page route.

Needs:
- hero block
- bio
- links
- related releases
- optional embeds

### Slice M4 — Release detail template
Build a reusable music release page route.

Needs:
- cover image
- release metadata
- embed block
- body/credits
- artist references
- external listening links

### Slice M5 — Embed system
Create a reusable embed component that supports:
- Bandcamp
- Spotify
- SoundCloud
- fallback generic iframe

Key requirements:
- lazy loading
- ratio handling
- good mobile behavior
- required iframe titles

---

## Content migration checklist

### Group / collective profile
- [ ] confirm whether `Malevolent Gods` should exist as an `artist` document, a `page`, or both
- [ ] extract collective bio/summary
- [ ] capture collective links

### Individual artists
- [ ] Dr. Doeslittle
- [ ] Enoch Root
- [ ] Ignus VanMule
- [ ] Kerberos
- [ ] identify whether any additional artists exist in old content

For each artist:
- [ ] name
- [ ] slug
- [ ] short bio
- [ ] long bio
- [ ] portrait/hero image
- [ ] outbound links
- [ ] featured status

### Releases / embeds
For each release or embedded profile:
- [ ] title
- [ ] associated artist(s)
- [ ] release type
- [ ] summary/body
- [ ] embed provider
- [ ] embed URL
- [ ] cover image
- [ ] credits
- [ ] external links

---

## Open decisions

### 1. Should the collective itself be an artist?
Probably yes, if the group has releases and identity separate from individuals.

### 2. Should artist pages and release pages both live under `/music`?
My recommendation:
- artist pages under `/artists/[slug]`
- release pages under `/music/[slug]`

That keeps the model cleaner.

### 3. Do we need separate track-level content yet?
Probably not.
Start with release-level content and add track-level modeling later only if it becomes useful.

---

## Recommended next implementation step

The immediate next step should be:

1. audit the legacy `music/*.html` pages in detail
2. create a migration worksheet from those pages
3. build the reusable embed component
4. build the `/music` listing page from structured placeholders/sample content

That sequence gets the first true end-to-end vertical moving without trying to model everything at once.
