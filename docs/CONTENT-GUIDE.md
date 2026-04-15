# Content Creation Guide

This site is populated entirely through **local Astro content collections**.

There is no external CMS, SaaS backend, or database required to add or edit content.
Everything lives in this repo as Markdown or JSON files.

## Basic workflow

1. Add or edit content files under `src/content/`
2. Add any needed images under `public/`
3. Run the site locally:

```bash
npm run dev
```

4. Review the relevant page in the browser
5. Commit the content and asset changes together

---

# Content map

## Site settings

**File:** `src/content/site/settings.json`

Controls:
- site title
- site description
- footer text
- homepage hero copy
- homepage CTAs
- social links

### Example fields

```json
{
  "title": "Malevolent Gods",
  "description": "A collective of artists, musicians, writers, and makers building strange and beautiful things.",
  "footerText": "© 2026 Malevolent Gods.",
  "homepageHero": {
    "eyebrow": "Malevolent Gods",
    "title": "Art, music, writing, and software from a collective that likes it a little haunted.",
    "summary": "A home for the collective’s music, art, writing, and experimental software...",
    "primaryCtaLabel": "Explore music",
    "primaryCtaHref": "/music",
    "secondaryCtaLabel": "View art",
    "secondaryCtaHref": "/art"
  },
  "socialLinks": []
}
```

### Notes
- Keep homepage copy concise.
- Prefer stable internal links like `/music` or `/art` for CTAs.
- `socialLinks` can be left empty until needed.

---

## Navigation

**File:** `src/content/navigation/main.json`

Controls the top-level site navigation.

### Example

```json
{
  "title": "Primary navigation",
  "items": [
    { "label": "Home", "href": "/" },
    { "label": "Art", "href": "/art" },
    { "label": "Music", "href": "/music" },
    { "label": "Writing", "href": "/writing" },
    { "label": "Projects", "href": "/projects" },
    { "label": "Apps", "href": "/apps" }
  ]
}
```

### Notes
- `href` values should usually be root-relative paths.
- Keep nav labels short.

---

# Art section

**Folder:** `src/content/art/`

Each file in this folder is one art project / gallery.

## File format
Use Markdown files:

```text
src/content/art/my-project.md
```

## Required fields
- `title`
- `summary`
- `coverImage`
- `gallery`

## Optional fields
- `medium`
- `featured`

## Example

```md
---
title: Enoch Root Art
summary: A collection of generative, digital, and hand-drawn art.
medium: Generative / digital / hand-drawn
featured: true
coverImage: /art/enoch/img/photo-3.jpg
gallery:
  - src: /art/enoch/img/photo-1.jpg
    caption: Stable Diffusion with Control Net
  - src: /art/enoch/img/photo-2.png
    caption: StableDiffusion
---

This project gathers Enoch Root’s first migrated body of visual work from the legacy site.
```

## Image placement
Art image files should live under `public/art/...`

Examples:

```text
public/art/enoch/img/photo-1.jpg
public/art/enoch/img/photo-2.png
public/art/ignus/img/photo-2.jpg
```

### Rules
- Use root-relative URLs in content files, like `/art/enoch/img/photo-1.jpg`
- Make sure the filenames and extensions match exactly
- Keep captions short and useful
- Use `coverImage` as the main image for cards and hero areas

## Best practices
- Treat each file as one coherent gallery/project
- Use the body content for project framing, not image-by-image caption dumping
- Keep `summary` short enough to work on cards and landing pages

---

# Music section

Music content is split into two collections:

- `src/content/artists/`
- `src/content/music/`

## Artists

Each file in `src/content/artists/` is one artist profile.

### Required fields
- `name`
- `shortBio`

### Optional fields
- `featured`
- `portrait`
- `heroImage`
- `links`

### Example

```md
---
name: Enoch Root
shortBio: Artist profile migrated from the legacy SoundCloud-heavy music page.
featured: true
portrait: ''
heroImage: ''
links:
  - label: SoundCloud
    href: https://soundcloud.com/enoch-root-music
---

Enoch Root’s legacy page behaves more like a curated set of mixes and tracks than a conventional artist bio page.
```

### Notes
- `portrait` and `heroImage` can be empty strings if not used yet
- `links` are external platform links for the artist profile
- The file slug becomes the artist URL, e.g. `enoch-root.md` → `/artists/enoch-root`

---

## Music releases

Each file in `src/content/music/` is one release, single, mix, or other listening entry.

### Required fields
- `title`
- `summary`
- `featured`
- `artistSlugs`
- `artistNames`
- `credits`

### Optional fields
- `releaseType`
- `links`
- `coverImage`
- `embed`

### Example

```md
---
title: Orbit
summary: Bandcamp release associated with the Malevolent Gods collective profile.
releaseType: Album
featured: true
artistSlugs:
  - malevolent-gods
artistNames:
  - Malevolent Gods
credits:
  - Malevolent Gods
links: []
coverImage: ''
embed:
  provider: Bandcamp
  title: Orbit by Malevolent Gods
  url: https://bandcamp.com/EmbeddedPlayer/album=930782333/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/
  aspectRatio: 1 / 1
---

First-pass migrated release page for the Malevolent Gods collective identity.
```

### Notes
- `artistSlugs` should match filenames in `src/content/artists/`
- `artistNames` should match the human-readable artist names
- `credits` is currently a simple list of strings
- `embed.provider` should be one of:
  - `Bandcamp`
  - `Spotify`
  - `SoundCloud`
  - `YouTube`
  - `Other`

### Best practices
- Keep `summary` short enough for list cards
- Use the Markdown body for context, editorial framing, or release notes
- If a release has no cover art yet, leave `coverImage: ''`

---

# Writing section

**Folder:** `src/content/writing/`

Each file in this folder is one piece of writing.

## File format
Use Markdown files:

```text
src/content/writing/my-piece.md
```

## Required fields
- `title`
- `summary`
- `publishedAt`
- `status`
- `format`

## Optional fields
- `updatedAt`
- `featured`
- `tags`
- `series`
- `seriesOrder`
- `heroImage`

## Allowed `status` values
- `draft`
- `published`

Only `published` entries appear on the site.

## Allowed `format` values
- `essay`
- `note`
- `fragment`
- `poem`
- `manifesto`

## Example

```md
---
title: Note on Friction and Tools
summary: A short note on the difference between productive friction and pointless technical drag.
publishedAt: 2026-04-04
featured: false
status: published
format: note
tags:
  - tooling
  - process
  - notes
---

Some friction is useful.
```

## Notes
- Use `status: draft` for pieces that should stay hidden
- `publishedAt` should use `YYYY-MM-DD`
- `series` and `seriesOrder` are optional, but useful for recurring writing threads
- Keep `summary` strong; it does a lot of work on the index page

### Best practices
- Let Writing stay more editorial and typographic than the other sections
- Avoid overstuffing frontmatter with unnecessary metadata
- If a piece does not need tags, leave them empty

---

# Projects section

**Folder:** `src/content/projects/`

Each file in this folder is one project, service, interface, experiment, or system.

This section is designed to support projects that may actually be:
- reverse-proxied internal services
- dashboards
- docs surfaces
- repos
- local tools exposed through the same domain

## Required fields
- `title`
- `summary`
- `publishedAt`
- `status`
- `projectType`

## Optional fields
- `updatedAt`
- `featured`
- `tags`
- `stack`
- `links`
- `heroImage`
- `repository`
- `demoUrl`

## Allowed `status` values
- `active`
- `archived`
- `prototype`
- `planned`

## Allowed `projectType` values
- `software`
- `tool`
- `web`
- `system`
- `experiment`
- `infrastructure`

## Link kinds
Each project link can include a `kind`:
- `service`
- `repo`
- `docs`
- `dashboard`
- `other`

## Example

```md
---
title: Ritual Indexer
summary: A local indexing and retrieval service for keeping project notes searchable without handing that memory to a hosted platform.
publishedAt: 2026-04-06
featured: true
status: active
projectType: system
tags:
  - search
  - local-first
stack:
  - TypeScript
  - Postgres
  - Docker
  - Nginx
links:
  - label: Service
    href: /services/ritual-indexer/
    kind: service
  - label: Dashboard
    href: /dashboards/ritual-indexer/
    kind: dashboard
  - label: Docs
    href: /docs/ritual-indexer/
    kind: docs
heroImage: ''
---

Ritual Indexer is conceived as a local-first retrieval layer...
```

## Notes
- Root-relative internal routes like `/services/foo/` are encouraged when the project is reverse-proxied by Nginx
- `stack` should be short and readable
- `summary` should explain what the project is in one breath
- Use the body to explain why the project exists, how it fits into the stack, and what kind of interface or service surface it exposes

### Best practices
- Avoid generic portfolio language
- Describe real function, real routes, and real system role
- Prefer honest project status over aspirational fluff

---

# Apps section

**Folder:** `src/content/apps/`

Each file in this folder is one hosted app entry for the `/apps` landing page.

Unlike Projects, these entries do not currently have Astro detail pages. They exist to describe and launch apps that already live at mounted subpaths such as `/apps/local-dope-wars-js/`.

## Required fields
- `title`
- `summary`
- `status`
- `appType`
- `launchPath`

## Optional fields
- `featured`
- `sortOrder`
- `tags`

## Allowed `status` values
- `live`
- `beta`
- `planned`

## Example

```md
---
title: Local Dope Wars
summary: A modern remake of the classic Dope Wars loop with added mechanics and real-world locales.
featured: true
sortOrder: 1
status: live
appType: Game
launchPath: /apps/local-dope-wars-js/
tags:
  - strategy
  - atlanta
---

Local Dope Wars reimagines the classic game with a more local sense of place.
```

## Notes
- `launchPath` should be the real mounted app path, usually with a trailing slash
- The `/apps` page is site-owned, but the mounted app subpaths are their own runtime surfaces
- Use the body to explain what the app does now and what future changes are planned
- Keep summaries short enough to work on cards

### Best practices
- Describe the live app honestly
- Avoid pretending a hosted upstream project is already heavily customized if it is not
- Call out future plans separately from present functionality

---

# Slugs and URLs

For content collections, the filename usually becomes the URL slug.

Examples:
- `src/content/writing/note-on-friction-and-tools.md` → `/writing/note-on-friction-and-tools`
- `src/content/projects/ritual-indexer.md` → `/projects/ritual-indexer`
- `src/content/art/enoch-root-art.md` → `/art/enoch-root-art`
- `src/content/apps/local-dope-wars.md` → entry shown on `/apps`

## Rules
- Use lowercase filenames
- Use hyphens instead of spaces
- Avoid changing filenames casually after links are live

---

# Image conventions

## Current convention
- Put public-facing assets under `public/`
- Reference them with root-relative URLs in content files

Examples:
- `/art/enoch/img/photo-3.jpg`
- `/art/ignus/img/photo-2.jpg`

## Recommendations
- Keep folder structure stable
- Keep filenames predictable
- Prefer web-friendly sizes when practical
- Commit image changes alongside the content files that reference them

---

# Drafts and publishing

## Writing drafts
Use:

```yaml
status: draft
```

Draft writing entries stay out of the rendered site.

## Other sections
Art, Music, and Projects do not currently use a full draft/publish system the same way Writing does.
If you want hidden content there, keep the files out of the repo or add a similar status field later.

Apps also currently render directly from repo content without a separate draft/publish workflow.

---

# Common mistakes to avoid

- Referencing images that do not exist in `public/`
- Using the wrong file extension in image paths
- Forgetting that Writing only shows `status: published`
- Mismatching `artistSlugs` with actual artist filenames
- Using long summaries that collapse poorly on cards
- Treating Projects like generic portfolio items when they are really local services or internal tools
- Pointing an App entry at a path that is not actually mounted under `/apps/...`

---

# Suggested workflow for new content

## New art project
1. Add images under `public/art/...`
2. Create `src/content/art/my-project.md`
3. Add `coverImage` and `gallery` entries
4. Add project description body text
5. Review `/art` and `/art/my-project`

## New artist
1. Create `src/content/artists/my-artist.md`
2. Add bio and links
3. Review `/artists/my-artist`

## New music release
1. Create `src/content/music/my-release.md`
2. Connect it to artists via `artistSlugs`
3. Add embed info if available
4. Review `/music` and `/music/my-release`

## New writing piece
1. Create `src/content/writing/my-piece.md`
2. Set `status: draft` or `published`
3. Add body text
4. Review `/writing` and the detail page

## New project
1. Create `src/content/projects/my-project.md`
2. Add type, status, stack, and links
3. Use reverse-proxied internal routes where appropriate
4. Review `/projects` and the detail page

## New app entry
1. Create `src/content/apps/my-app.md`
2. Add `title`, `summary`, `status`, `appType`, and `launchPath`
3. Point `launchPath` at the real hosted route, such as `/apps/my-app/`
4. Add short body text explaining what is live now and what may evolve later
5. Review `/apps`

---

# Final note

This site now works best when content and structure are treated as part of the same system.

Keep entries:
- clear
- honest
- locally owned
- easy to revise

The goal is not to simulate a giant CMS. The goal is to make publishing simple without making the site feel cheap.
