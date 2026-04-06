# Malevolent Gods — Astro + Tailwind + Sanity Migration Plan

## Progress Snapshot (updated 2026-04-05)

### Completed / substantially done
- [x] Phase 0 discovery and first-pass audit
- [x] Phase 1 platform foundation
- [x] Phase 2 global shell and homepage v1
- [x] Initial Music vertical slice foundation
- [x] Astro build verification
- [x] Docker/nginx test deployment verification
- [x] Initial Sanity seeding pass

### In progress
- [x] Richer artist pages
- [x] Better release pages
- [x] Cover image / body / credits support
- [x] More editorial polish now that real content is flowing
- [x] Rich text rendering upgrade (first pass)

### Not started yet
- [ ] Writing vertical slice
- [ ] Software/projects vertical slice
- [ ] Broader publishing/editorial workflow refinement beyond Music and early Art
- [ ] Final launch hardening / SEO / QA

## Goal

Migrate `malevolentgods.com` from a hand-authored static HTML/Bootstrap/jQuery site to a modern, maintainable stack based on:

- **Astro** for site generation and routing
- **Tailwind CSS** for design system and responsive styling
- **Sanity** for structured content editing

The goals of the migration are:

- preserve what already works in the current site
- improve polish and mobile experience
- make it much easier to add new content
- reduce repeated markup and manual page maintenance
- create a clean foundation for art, music, writing, and software/project content

---

## Current State Summary

The current site appears to be:

- a static HTML site with folder-based sections
- Bootstrap-based layout/styling
- jQuery + Bootstrap JS for behavior
- repeated navbar/footer/page-shell markup across pages
- content organized as separate HTML pages, especially under sections like `music/`
- media-heavy, using embedded Bandcamp, Spotify, and SoundCloud players

This makes **Astro** a strong migration target because the site is content-first, mostly static, and structured around pages rather than app logic.

---

## Migration Strategy

Use a **phased migration** with **vertical slices**.

That means:
- each phase has a clear goal
- each slice delivers an end-to-end usable piece of the new site
- avoid doing all content modeling first and all frontend later
- prioritize shipping one polished section at a time

Recommended order:
1. Foundation + design system
2. Global site shell + homepage
3. Music vertical slice
4. Art vertical slice *(now in progress)*
5. Writing vertical slice
6. Software/projects vertical slice
7. Publishing workflows + editor UX improvements
8. Performance, SEO, analytics, QA, launch

---

# Phase 0 — Discovery, audit, and migration prep

## Goal
Create a reliable inventory of what exists and decide what gets migrated, rewritten, merged, or dropped.

## Tasks

### Content inventory
Create a full inventory of:
- pages
- artists
- music releases / embeds
- images/assets
- writing pages
- software/project pages
- outbound links / embeds
- nav items
- footer content

### Design audit
Document:
- existing colors
- typography patterns
- spacing/layout patterns
- reusable content blocks
- existing imagery and logos
- what visual identity should be preserved vs refreshed

### Technical audit
Identify:
- every HTML page
- every shared CSS file
- every JS dependency
- all embedded providers (Bandcamp, Spotify, SoundCloud, etc.)
- any forms, analytics, or third-party scripts
- broken/outdated dependencies to remove

### Content modeling workshop
Define the content types needed in Sanity.

Proposed initial content types:
- **Site Settings**
- **Navigation**
- **Artist**
- **Music Project / Release**
- **Track / Embed Item** (optional depending on how granular you want to go)
- **Artwork / Art Project**
- **Writing Piece**
- **Software Project**
- **Page** (for flexible editorial pages like About, Contact, etc.)
- **Event** (optional, if useful)

## Deliverables
- [x] migration inventory document
- [x] content model draft
- [ ] design direction notes
- [x] list of pages/assets to migrate
- [x] list of old code/dependencies to retire

## Exit criteria
- [x] no major unknowns remain about site scope
- [x] content types are agreed
- [x] migration order is agreed

---

# Phase 1 — Platform foundation

## Goal
Stand up the new technical base without trying to migrate all content yet.

## Tasks

### Create Astro project
Set up:
- Astro
- TypeScript
- Tailwind CSS
- ESLint/Prettier if desired
- basic project structure

Suggested high-level structure:

```text
src/
  components/
  layouts/
  pages/
  styles/
  lib/
  content/
```

### Integrate Sanity
Set up:
- Sanity project/dataset
- Astro Sanity integration
- environment variables
- preview strategy if desired

### Establish routing conventions
Plan URL structure that maps cleanly to long-term content.

Suggested routes:
- `/`
- `/art`
- `/music`
- `/writing`
- `/projects`
- `/artists/[slug]`
- `/music/[slug]`
- `/writing/[slug]`
- `/projects/[slug]`
- optional `/about`, `/contact`, `/events`

### Set up base design system in Tailwind
Define:
- color palette
- type scale
- spacing scale
- container widths
- border radius/shadow rules
- button styles
- card styles
- embed wrappers
- image treatment rules

### Build site-wide primitives
Create reusable components for:
- `Container`
- `Section`
- `Button`
- `Card`
- `RichText`
- `EmbedFrame`
- `Tag`
- `Hero`
- `Grid`

## Deliverables
- [x] working Astro project
- [x] Tailwind config/theme tokens
- [x] Sanity connected
- [x] core component primitives
- [x] route plan

## Exit criteria
- [x] project boots locally
- [x] Sanity content can be queried
- [x] shared primitives exist
- [x] no Bootstrap/jQuery dependencies are needed in new code

---

# Phase 2 — Global shell and brand layer

## Goal
Replace repeated legacy page chrome with a reusable modern shell.

## Tasks

### Build global layout
Implement:
- site layout wrapper
- responsive header/nav
- mobile nav behavior
- footer
- metadata/head management

### Create site settings content in Sanity
Store:
- site title
- description
- social links
- footer text
- default SEO fields
- navigation groups

### Rebuild homepage shell
Do not attempt every content section yet. Focus on:
- hero
- intro/value proposition
- featured links to key sections
- featured images or latest work teasers

### Define reusable section patterns
Examples:
- featured artist strip
- featured release card row
- latest writing row
- project highlights row
- media/gallery strip

## Deliverables
- [x] reusable page layout
- [x] responsive header/nav/footer
- [x] homepage v1
- [x] site settings in Sanity

## Exit criteria
- [x] one polished modern homepage exists
- [x] navigation/footer are data-driven or centrally configured
- [x] mobile nav works well

---

# Phase 3 — Music vertical slice

## Goal
Migrate the music section end-to-end as the first full content vertical.

This is the best first vertical slice because the existing site already has rich music content and embed patterns.

## Scope
- music landing page
- artist music profiles
- release/project pages
- embeds (Bandcamp, Spotify, SoundCloud)
- featured/recent music relationships

## Sanity content models
Recommended:

### Artist
Fields:
- name
- slug
- short bio
- full bio
- hero image
- avatar/photo
- links
- tags/roles
- featured flag

### Music Release or Music Project
Fields:
- title
- slug
- associated artist(s)
- cover image
- summary
- release date
- embed provider
- embed URL / embed code reference
- tracklist (optional)
- credits
- external links
- featured flag

### Optional Embed Object
Fields:
- provider
- url
- title
- display mode
- aspect ratio

## Frontend tasks
Build:
- `/music` landing page
- artist/release cards
- artist detail page(s)
- release/project detail page(s)
- reusable embed components
- featured/recent sections

## Migration tasks
- extract data from current `music/*.html`
- normalize artist names/slugs
- move embed URLs into structured content
- migrate bios and descriptions
- migrate cover images/assets

## Deliverables
- full music section live in new stack
- Sanity editor workflow proven for music publishing
- reusable embed handling tested

## Exit criteria
- the music section can fully replace the legacy music section
- adding a new artist/release no longer requires editing HTML

---

# Phase 4 — Art vertical slice

## Goal
Migrate art/gallery content with a structure suited for visual presentation and mobile browsing.

## Scope
- art landing page
- artwork/project pages
- image galleries
- artist associations
- featured collections or series

## Sanity content models
### Artwork / Art Project
Fields:
- title
- slug
- artist(s)
- summary
- description / body
- cover image
- gallery images
- medium / format
- year
- dimensions (optional)
- series / collection
- external links
- featured flag

## Frontend tasks
Build:
- `/art` landing page
- art cards / masonry or grid layout
- artwork/project detail pages
- image gallery/lightbox strategy
- mobile-optimized browsing patterns

## Migration tasks
- organize image assets
- define image sizes/crops
- migrate existing art pages/content
- improve alt text and metadata

## Deliverables
- modern art browsing experience
- reusable gallery components
- structured art content in Sanity

## Exit criteria
- art content is easier to publish and browse than in the old site
- mobile image browsing feels first-class

---

# Phase 5 — Writing vertical slice

## Goal
Introduce a clean editorial system for essays, updates, notes, or collective writing.

## Scope
- writing landing page
- individual writing pages
- optional categories/tags/series

## Sanity content models
### Writing Piece
Fields:
- title
- slug
- author(s)
- excerpt
- body (portable text)
- cover image (optional)
- published date
- tags
- series
- featured flag

## Frontend tasks
Build:
- `/writing`
- writing cards/index
- writing detail template
- typography system for long-form content
- reading-time/date/tag display if desired

## Deliverables
- polished editorial templates
- structured writing workflow

## Exit criteria
- publishing a new written piece is straightforward in Sanity
- reading experience is clearly better than static HTML pages

---

# Phase 6 — Software/projects vertical slice

## Goal
Represent software and interactive projects in a way that feels coherent with the rest of the site.

## Scope
- projects landing page
- individual software/project pages
- links to repos, demos, downloads, docs

## Sanity content models
### Software Project
Fields:
- title
- slug
- summary
- description/body
- contributors
- screenshots
- repo URL
- live URL
- platform/stack
- status
- release/version info (optional)
- tags
- featured flag

## Frontend tasks
Build:
- `/projects`
- project cards
- project detail pages
- screenshot/gallery support
- link blocks for repo/demo/download

## Deliverables
- unified project presentation system
- better showcase for software work

## Exit criteria
- software/projects fit naturally beside art/music/writing
- new project pages can be created without hand-building static HTML

---

# Phase 7 — Cross-cutting publishing UX and editorial tooling

## Goal
Make the system pleasant for ongoing content creation.

## Tasks

### Improve Sanity editor experience
Add:
- previews
- field grouping
- validation
- slug generation
- reference pickers
- helpful descriptions
- reusable content blocks

### Add homepage curation controls
Allow editors to choose:
- featured artists
- featured releases
- featured writing
- featured projects
- homepage hero content

### Add taxonomies and relationships
Possible additions:
- tags
- genres
- mediums
- roles
- series
- collaborations

### Add drafts/workflow support
If useful:
- draft/published workflow
- preview mode
- scheduled publishing

## Deliverables
- editor-friendly Sanity studio
- homepage and section curation tools
- fewer chances to break content accidentally

## Exit criteria
- content publishing is meaningfully easier than editing raw site files

---

# Phase 8 — SEO, performance, quality, and launch

## Goal
Make the new site production-ready.

## Tasks

### SEO
Implement:
- per-page titles/descriptions
- Open Graph/Twitter metadata
- canonical URLs
- sitemap
- robots
- structured data where useful

### Performance
Optimize:
- image sizes and formats
- lazy loading
- font loading
- iframe/embed loading strategy
- bundle size
- CLS/LCP issues

### Accessibility
Audit:
- semantic landmarks
- heading structure
- nav and keyboard support
- contrast
- alt text
- focus states
- iframe titles

### Analytics / observability
Add if desired:
- privacy-friendly analytics
- error monitoring
- simple event tracking for outbound links or plays

### QA / content verification
Check:
- all migrated pages/routes
- link integrity
- image integrity
- embeds
- mobile breakpoints
- browser sanity check

### Launch plan
- deploy staging
- review with stakeholders
- content freeze window if needed
- production cutover
- redirect strategy for legacy URLs

## Deliverables
- production-ready site
- redirects for legacy URLs
- launch checklist

## Exit criteria
- site is stable, fast, and polished enough to replace the old one fully

---

# Suggested Vertical Slice Order

If you want the highest-value order:

1. **Foundation + shell**
2. **Music**
3. **Art**
4. **Writing**
5. **Software/projects**
6. **Editorial polish / homepage curation / launch work**

This order works because:
- music already seems like the richest current section
- art is likely next-highest visibility
- writing and software can build on the same base patterns later

---

# URL and Content Mapping Recommendations

## Suggested URL shape

```text
/
/art
/art/[slug]          (optional if you want artworks as first-class routes)
/music
/music/[slug]
/artists/[slug]
/writing
/writing/[slug]
/projects
/projects/[slug]
/about
/contact
```

## Notes
- Prefer stable slugs and clean URLs.
- Decide early whether music detail pages are artist pages, release pages, or both.
- Do not let content type ambiguity leak into URLs if avoidable.

A likely good structure:
- `/artists/[slug]` for people/groups
- `/music/[slug]` for albums/releases/projects

---

# Proposed Sanity Schema Set (Initial)

## Core documents
- `siteSettings`
- `navigation`
- `page`
- `artist`
- `musicRelease`
- `artProject`
- `writingPiece`
- `softwareProject`

## Shared objects
- `seo`
- `linkItem`
- `embed`
- `cta`
- `heroBlock`
- `mediaBlock`
- `richContent`

## Optional support docs
- `tag`
- `series`
- `event`

---

# Design System Recommendations

## Keep
- dark, moody, atmospheric tone if that reflects the collective brand
- strong media-forward homepage sections
- artist/project distinction
- embedded music platform support

## Improve
- typography hierarchy
- consistency of spacing
- image presentation
- mobile navigation
- homepage storytelling
- section identity and visual rhythm
- footer polish

## Avoid repeating old patterns
- Bootstrap utility sprawl
- repeated page markup
- hardcoded nav on every page
- presentational hacks for layout
- unnecessary jQuery behavior

---

# Risks and Mitigations

## Risk: content modeling gets too abstract too early
**Mitigation:** start with simple schemas that match the current site, then refine later.

## Risk: redesign scope balloons during migration
**Mitigation:** preserve information architecture first; improve aesthetics in controlled passes.

## Risk: embeds cause layout/performance issues
**Mitigation:** build one reusable embed component with strict aspect ratios and lazy loading.

## Risk: migration stalls because all content must be perfect before launch
**Mitigation:** ship by vertical slices and allow content cleanup after structure is live.

## Risk: Sanity adds overhead if only one technical maintainer updates the site
**Mitigation:** validate whether editor UX is truly needed; if not, Astro content collections remain a fallback option.

---

# Recommended MVP Cut

If you want a realistic first launch on the new stack, the MVP should be:

- homepage
- global nav/footer
- music section
- art section
- artists pages
- basic SEO/meta
- responsive/mobile polish
- redirects from legacy URLs

Then add:
- writing
- software/projects
- richer homepage curation
- taxonomy/refinement

---

# Rough Implementation Sequence

## Slice 1 — New shell
- Astro app setup
- Tailwind theme
- Sanity setup
- layout/header/footer
- homepage v1

## Slice 2 — Music
- artist schema
- music release schema
- embed object
- music listing page
- artist detail page
- release detail page
- migrate current music content

## Slice 3 — Art
- art schema
- gallery components
- art landing page
- detail page(s)
- asset migration

## Slice 4 — Writing
- writing schema
- index/detail templates
- typography refinement

## Slice 5 — Projects
- software project schema
- listing/detail templates
- screenshots/link blocks

## Slice 6 — Launch hardening
- SEO
- redirects
- analytics
- accessibility/performance QA
- production deploy

---

# Recommendation Summary

For the current `malevolentgods.com` codebase, the strongest path is:

> **Rebuild into Astro + Tailwind + Sanity using phased vertical slices, starting with the shared shell and the music section first.**

That gives you:
- a cleaner migration from static HTML
- less complexity than Next.js
- a much better publishing workflow
- a modern responsive design foundation
- a site architecture that can grow with the collective

---

# Optional Next Steps

Potential follow-up docs/tasks:
- detailed Sanity schema proposal
- page/component architecture for Astro
- content migration spreadsheet template
- URL redirect map from current HTML pages
- MVP launch checklist
