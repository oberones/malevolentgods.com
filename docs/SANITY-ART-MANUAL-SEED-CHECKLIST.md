# Sanity Art Manual Seed Checklist

Use this checklist to seed the first real Art content for the rebuilt site.

This is the Art-slice equivalent of the music checklist: optimized for **speed, clarity, and feedback** rather than perfect archival completeness.

---

## Recommended order

Seed art content in this order:

1. confirm the `artProject` schema update is visible in Studio
2. create `Enoch Root Art`
3. create `Ignus VanMule Art`
4. verify `/art`
5. verify `/art/[slug]`
6. decide whether to defer or add Reverend Phu later

---

# 1. Studio schema sanity check

Before entering content, confirm that the `artProject` document now supports:
- title
- slug
- artists
- summary
- body
- cover image
- gallery
- medium
- featured

And most importantly, confirm that each gallery entry supports:
- image
- caption / process note

If not, restart/reload the Studio so the schema update is picked up.

---

# 2. Create `Enoch Root Art`

## Document type
- `artProject`

## Fields

### Title
- `Enoch Root Art`

### Slug
- `enoch-root-art`

### Artists
If an `Enoch Root` artist document exists already, link it.
If not, you can leave this empty temporarily or create the artist later.

### Summary
- `A collection of generative, digital, and hand-drawn art.`

### Body
Use something like:
- `This project gathers Enoch Root’s first migrated body of visual work from the legacy site.`
- `It includes a mix of generative, digital, and hand-drawn experiments with process notes preserved where possible.`

### Medium
- `Generative / digital / hand-drawn`

### Featured
- `true`

### Cover image
Use:
- `/art/enoch/img/photo-3.jpg`

If uploading manually, use the local equivalent from the legacy asset set.

## Gallery entries
Create these gallery items:

1. image: `photo-1.jpg`
   - caption: `Stable Diffusion with Control Net`
2. image: `photo-2.png`
   - caption: `StableDiffusion`
3. image: `photo-3.jpg`
   - caption: `MidJourney (custom)`
4. image: `photo-4.png`
   - caption: `Stable Diffusion`
5. image: `photo-5.png`
   - caption: `StableDiffusion (custom)`
6. image: `photo-6.jpg`
   - caption: `MidJourney`
7. image: `photo-7.jpg`
   - caption: `MidJourney`
8. image: `photo-8.png`
   - caption: `MidJourney`
9. image: `photo-9.png`
   - caption: `MidJourney`
10. image: `photo-10.png`
    - caption: `MidJourney`
11. image: `photo-11.png`
    - caption: `MidJourney`
12. image: `photo-12.jpg`
    - caption: `MidJourney`

---

# 3. Create `Ignus VanMule Art`

## Document type
- `artProject`

## Fields

### Title
- `Ignus VanMule Art`

### Slug
- `ignus-vanmule-art`

### Artists
If an `Ignus VanMule` artist document exists already, link it.
If not, you can leave this empty temporarily or create the artist later.

### Summary
Use either:
- `Legacy gallery page for Ignus VanMule’s visual work.`

Or, if you want slightly less throwaway editorial copy:
- `A selection of digital and AI-assisted visual work by Ignus VanMule.`

### Body
Use something like:
- `This first-pass art project preserves the visual work currently surfaced through the old Ignus gallery page.`
- `The rebuild gives the work a cleaner gallery context and a stronger editorial frame.`

### Medium
- `Digital / illustration / AI-assisted`

### Featured
- `true`

### Cover image
Use:
- `/art/ignus/img/photo-2.jpg`

## Gallery entries
Create these gallery items:

1. image: `photo-2.jpg`
   - caption: `Photoshop and Illustrator`
2. image: `photo-4.jpg`
   - caption: `Photoshop`
3. image: `photo-5.jpg`
   - caption: `Photoshop and Illustrator`
4. image: `photo-8.jpg`
   - caption: `MidJourney`

---

# 4. Verify frontend behavior

After saving these documents, verify:

## Listing page
- [ ] `/art` shows the seeded projects
- [ ] cover images render correctly
- [ ] spotlight block works
- [ ] cards link correctly to detail routes

## Detail pages
- [ ] `/art/enoch-root-art`
- [ ] `/art/ignus-vanmule-art`

Check:
- [ ] title renders correctly
- [ ] summary renders correctly
- [ ] body renders correctly
- [ ] cover image renders
- [ ] gallery images render
- [ ] per-image captions render
- [ ] stats render sensibly

---

# 5. Reverend Phu decision

Do not let Reverend Phu block the first Art seed pass.

## Current situation
We have:
- some image files
- a listing entry on the old art landing page
- no `art/phu/index.html` detail page in the copied legacy site

## Recommendation
Choose one:

### Option A — defer
Best default.
Wait until more descriptive material exists.

### Option B — add as a lightweight placeholder art project
Only if you want the artist visible immediately.
In that case:
- use a simple summary
- upload the available images
- leave body minimal

---

# What not to block on

Do not stop progress because of:
- missing Reverend Phu detail page
- unknown dates
- incomplete artist associations
- missing deeper project statements
- uncertainty about whether every image deserves its own artwork page later

Get the first galleries live first.
Then refine.

---

# Suggested first checkpoint

The first strong checkpoint for Art is:
- `/art` populated from Sanity
- `Enoch Root Art` page rendering correctly
- `Ignus VanMule Art` page rendering correctly
- gallery captions/process notes visible in the rebuilt site

Once that works, the Art slice is officially real.
