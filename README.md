# new-malevolentgods.com

This directory contains the current Astro/Tailwind rebuild of the Malevolent Gods website.

The site is now fully driven by **local Astro content collections** and local assets. There is no external CMS, SaaS backend, or database required to populate the current sections.

## Current stack

- **Astro** for routing and static site generation
- **Tailwind CSS 4** via the Vite plugin
- **Astro content collections** for all current site content
- **Local files in the repo** for content, structure, and public assets

## Content architecture

The site currently uses local collections for:

- site settings
- navigation
- art projects
- artists
- music releases
- writing
- projects

Content lives under:

```text
src/content/
```

Public assets live under:

```text
public/
```

## Current top-level sections

- `Home`
- `Art`
- `Music`
- `Writing`
- `Projects`

## Project status

The site has moved past initial scaffolding and now has working first-pass slices for:

- Art
- Music
- Writing
- Projects

The next major work is mostly editorial and UX-focused rather than architectural:

- replace placeholder content with real content
- continue visual polish and mobile QA
- refine homepage/site copy
- optimize assets where needed
- document authoring workflow more clearly over time

## How to run locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build the site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Content editing guide

For detailed instructions on how to add or edit content in each section, see:

- [`CONTENT-GUIDE.md`](./CONTENT-GUIDE.md)

That guide covers:

- where each section’s files live
- required and optional frontmatter fields
- image placement conventions
- slug/URL behavior
- writing draft behavior
- how Projects should model reverse-proxied service links

## Directory guide

### Content

```text
src/content/site/
src/content/navigation/
src/content/art/
src/content/artists/
src/content/music/
src/content/writing/
src/content/projects/
```

### Public assets

```text
public/art/
```

Additional public asset folders can be added as needed for future sections.

## Authoring model

This project is intentionally **local-first**.

That means:
- content is versioned in git
- site structure and content evolve together
- links to internal tools/services can be modeled directly
- no external publishing platform is required

This is especially important for the Projects section, where many links may point to:
- reverse-proxied internal services
- dashboards
- docs surfaces
- repos

## Notes

- Writing only renders entries marked `status: published`
- Most URLs are derived from content filenames
- Root-relative asset paths like `/art/enoch/img/photo-3.jpg` assume the file exists under `public/`
- If content appears missing, check both the collection entry and the referenced asset paths

## Recommended next maintenance steps

Over time, this repo would benefit from:

- replacing placeholder entries with real content
- adding responsive/mobile QA notes
- optimizing larger images for the Art section
- tightening section-specific copy and hierarchy
- expanding docs as the authoring workflow becomes more mature
