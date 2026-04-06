# Art Migration Worksheet

This worksheet captures the first-pass audit of the legacy art section and maps it into the new Astro + Sanity model.

## Audit summary

Legacy section reviewed:
- `art/index.html`
- `art/enoch/index.html`
- `art/ignus/index.html`

Assets observed:
- `art/enoch/img/photo-1.jpg` through `photo-12.*`
- `art/ignus/img/photo-2.jpg`, `photo-4.jpg`, `photo-5.jpg`, `photo-8.jpg`
- `art/phu/img/photo-9.jpg`, `photo-13.jpg`, `photo-14.jpg`

Broken/missing legacy detail page:
- `art/phu/index.html` is linked from `art/index.html` but was not present in the copied legacy content

## High-level findings

1. The art landing page is very simple and functions mainly as a directory of artist galleries.
2. The artist gallery pages are stronger than the landing page and contain:
   - title
   - short description
   - a masonry/card-style image gallery
   - per-image technique/process notes
3. The art content is better suited to an editorial gallery layout than the old Bootstrap card-columns implementation.
4. The missing `Reverend Phu` page is another example of legacy site inconsistency and should not block the rebuild.

---

# Legacy page audit

## 1. `art/index.html`

### What it contains
Three featured artist boxes:
- Enoch Root
- Ignus VanMule
- Reverend Phu

### Extracted entries

#### Enoch Root
- title: `Enoch Root`
- preview image: `/art/enoch/img/photo-3.jpg`
- detail page: `/art/enoch/index.html`

#### Ignus VanMule
- title: `Ignus VanMule`
- preview image: `/art/ignus/img/photo-2.jpg`
- detail page: `/art/ignus/index.html`

#### Reverend Phu
- title: `Reverend Phu`
- preview image: `/art/phu/img/photo-9.jpg`
- detail page: `/art/phu/index.html`
- issue: linked detail page missing from copied legacy content

### Recommended migration
Use this page mainly as the source for:
- top-level art roster
- representative cover images
- initial featured order

---

## 2. `art/enoch/index.html`

### Title
- `Enoch Root Art`

### Description
- `A collection of generative, digital, and hand-drawn art.`

### Gallery items identified

1. `/art/enoch/img/photo-1.jpg`
   - caption/process note: `Stable Diffusion with Control Net`
2. `/art/enoch/img/photo-2.png`
   - caption/process note: `StableDiffusion`
3. `/art/enoch/img/photo-3.jpg`
   - caption/process note: `MidJourney (custom)`
4. `/art/enoch/img/photo-4.png`
   - caption/process note: `Stable Diffusion`
5. `/art/enoch/img/photo-5.png`
   - caption/process note: `StableDiffusion (custom)`
6. `/art/enoch/img/photo-6.jpg`
   - caption/process note: `MidJourney`
7. `/art/enoch/img/photo-7.jpg`
   - caption/process note: `MidJourney`
8. `/art/enoch/img/photo-8.png`
   - caption/process note: `MidJourney`
9. `/art/enoch/img/photo-9.png`
   - caption/process note: `MidJourney`
10. `/art/enoch/img/photo-10.png`
    - caption/process note: `MidJourney`
11. `/art/enoch/img/photo-11.png`
    - caption/process note: `MidJourney`
12. `/art/enoch/img/photo-12.jpg`
    - caption/process note: `MidJourney`

### Recommended mapping
Create one first-pass `artProject`:
- title: `Enoch Root Art`
- slug: `enoch-root-art`
- artist: `Enoch Root`
- summary/body: use the description above
- cover image: `/art/enoch/img/photo-3.jpg` (strong existing preview choice)
- gallery: all listed images
- body/caption note: preserve per-image technique/process notes where possible

### Modeling note
Enoch’s page is a strong case for eventually supporting per-image captions in the art schema.

---

## 3. `art/ignus/index.html`

### Title
- `Ignus VanMule Art`

### Description
- `Stuff this in your face hole.`

### Gallery items identified

1. `/art/ignus/img/photo-2.jpg`
   - caption/process note: `Photoshop and Illustrator`
2. `/art/ignus/img/photo-4.jpg`
   - caption/process note: `Photoshop`
3. `/art/ignus/img/photo-5.jpg`
   - caption/process note: `Photoshop and Illustrator`
4. `/art/ignus/img/photo-8.jpg`
   - caption/process note: `MidJourney`

### Recommended mapping
Create one first-pass `artProject`:
- title: `Ignus VanMule Art`
- slug: `ignus-vanmule-art`
- artist: `Ignus VanMule`
- summary/body: use the existing description for now, but probably rewrite later because the current copy is very throwaway
- cover image: `/art/ignus/img/photo-2.jpg`
- gallery: all listed images
- preserve process notes per image if possible

### Editorial note
This page probably deserves a copy rewrite during migration, because the existing summary is funny but weak as durable site copy.

---

## 4. Reverend Phu / `art/phu`

### What exists
Observed images:
- `/art/phu/img/photo-9.jpg`
- `/art/phu/img/photo-13.jpg`
- `/art/phu/img/photo-14.jpg`

### What is missing
- linked detail page `/art/phu/index.html`

### Recommended handling
Do not block on the missing page.

Create a placeholder/follow-up task:
- identify whether Reverend Phu should be migrated now using only available images
- or defer until more descriptive source material exists

### First-pass recommendation
Represent `Reverend Phu` in the art slice only if:
- J wants the entry visible immediately, and
- the image assets alone are enough for a first pass

Otherwise, defer.

---

# Proposed first-pass art documents

## Artists already relevant
These may already exist or soon exist through the broader site model:
- Enoch Root
- Ignus VanMule
- Reverend Phu (optional / may need creation)

## Art projects to create first
1. `Enoch Root Art`
2. `Ignus VanMule Art`
3. optional later: `Reverend Phu Art`

---

# Schema / implementation notes

## Current schema fit
The existing `artProject` schema is close enough to begin.

However, the legacy art content suggests a likely next refinement:
- gallery should eventually support image + caption/process note per entry, not just plain images

## First-pass compromise
For speed, use:
- cover image
- gallery image array
- summary/body text

If per-image notes are important soon, add a richer gallery object later.

---

# Immediate next recommended steps

1. create first sample art seed content for Enoch Root Art and Ignus VanMule Art
2. build `/art` listing page from sample/fallback data
3. build `/art/[slug]` detail route
4. decide whether Reverend Phu gets a placeholder entry or is deferred

---

# Suggested quality bar for the Art slice

Compared to the legacy art section, the new slice should improve:
- mobile presentation
- image hierarchy
- caption/process note readability
- artist/project framing
- consistency of cover images and gallery layout

Do not waste time recreating the old masonry card-columns feel exactly.
Use a cleaner modern layout instead.
