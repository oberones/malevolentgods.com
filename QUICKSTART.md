# Quickstart

This is the fastest path to being productive in this repo.

If you only need the essentials — run the site, find the content, make a change, verify it, commit it — start here.

---

## 1. Install and run

From the project root:

```bash
npm install
npm run dev
```

Then open the local Astro dev server in your browser.

---

## 2. Know where content lives

All site content is local and repo-backed.

### Main content folders

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
public/
```

If a page is missing an image, check `public/` first.

---

## 3. Know what controls what

### Homepage / global site settings
Edit:

```text
src/content/site/settings.json
```

### Top navigation
Edit:

```text
src/content/navigation/main.json
```

### Art galleries
Add or edit files in:

```text
src/content/art/
```

### Artist profiles
Add or edit files in:

```text
src/content/artists/
```

### Music releases
Add or edit files in:

```text
src/content/music/
```

### Writing
Add or edit files in:

```text
src/content/writing/
```

### Projects
Add or edit files in:

```text
src/content/projects/
```

---

## 4. Common content tasks

## Add a new writing piece
1. Create a new Markdown file in `src/content/writing/`
2. Add frontmatter
3. Set `status: published` if it should appear on the site
4. Write the body
5. Review `/writing` and the detail page

Minimal example:

```md
---
title: My New Piece
summary: A short summary for the index page.
publishedAt: 2026-04-06
status: published
format: essay
featured: false
tags:
  - example
---

Body text goes here.
```

### Important
Writing entries with:

```yaml
status: draft
```

will **not** appear on the site.

---

## Add a new project
1. Create a new Markdown file in `src/content/projects/`
2. Add metadata like status, type, stack, and links
3. Use root-relative internal routes for reverse-proxied services when appropriate
4. Review `/projects` and the detail page

Minimal example:

```md
---
title: My Project
summary: Short explanation of what this thing actually does.
publishedAt: 2026-04-06
status: active
projectType: system
featured: false
tags:
  - local-first
stack:
  - Docker
  - Nginx
links:
  - label: Service
    href: /services/my-project/
    kind: service
---

Project body text goes here.
```

---

## Add a new art project
1. Put images under `public/art/...`
2. Create a Markdown file in `src/content/art/`
3. Set `coverImage`
4. Add `gallery` items with `src` and optional `caption`
5. Review `/art` and the project detail page

Example image path:

```text
public/art/my-project/img/photo-1.jpg
```

Example content reference:

```yaml
coverImage: /art/my-project/img/photo-1.jpg
```

---

## Add a new music release
1. Create or confirm the related artist file in `src/content/artists/`
2. Create a release file in `src/content/music/`
3. Make sure `artistSlugs` matches the artist filename slug
4. Add embed metadata if the release should render an embedded player
5. Review `/music` and the release detail page

---

## 5. Things that commonly break

### Missing images
Usually means:
- the file is not in `public/`
- the extension is wrong (`.jpg` vs `.png`)
- the path in the content file does not match reality

### Writing piece not showing up
Usually means:
- `status` is set to `draft`
- the filename/slug is not what you expect
- frontmatter is malformed

### Artist/release relationship not working
Usually means:
- `artistSlugs` in a music file does not match an actual artist filename slug

### Project link feels wrong
Remember: Projects can point to reverse-proxied local/internal routes like:

```text
/services/foo/
/dashboards/foo/
/docs/foo/
```

They do not need to pretend to be public SaaS demos.

---

## 6. Sanity checks before committing

Before committing content changes:

1. Run the site locally
2. Open the affected page(s)
3. Check the images
4. Check for obvious layout issues
5. Commit content files and assets together

---

## 7. Build check

Before pushing bigger changes:

```bash
npm run build
```

If the build fails, check:
- content frontmatter
- missing required fields
- missing images
- bad collection values

---

## 8. When you need more detail

For the full authoring guide, see:

- [`CONTENT-GUIDE.md`](./CONTENT-GUIDE.md)

For the broader project overview, see:

- [`README.md`](./README.md)

---

## Short version

- Run: `npm install && npm run dev`
- Content lives in: `src/content/`
- Assets live in: `public/`
- Writing only shows when `status: published`
- Projects can link to reverse-proxied internal services
- Check the page locally before committing
