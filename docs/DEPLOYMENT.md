# Deployment and Infrastructure Notes

This document describes the intended deployment shape of the site and how it relates to reverse-proxied internal services.

The important architectural idea is:

- the website itself is an **Astro-built static site**
- some project links may point to **other local services** running in separate containers
- those services may be exposed through the same domain via **Nginx reverse proxy routes**

This file is a guide for keeping that arrangement coherent.

---

## Deployment model

## Site layer

The website is a static Astro site.

Typical flow:

1. build with Astro
2. produce static output
3. serve the output behind Nginx

The site itself does not require:
- a CMS backend
- a database
- a Node app server in production for content rendering

All page content comes from local files in the repo.

---

## Service layer

Some entries in the **Projects** section may link to internal or self-hosted services such as:

- `/services/<name>/`
- `/dashboards/<name>/`
- `/docs/<name>/`
- other path-based service mounts

These are expected to be handled by Nginx and forwarded to other containers.

That means the site and the service surfaces can share one domain while still being separate applications.

---

# Recommended topology

A typical shape might be:

- one container or host process serving the built Astro site
- one Nginx instance acting as the public edge
- multiple service containers behind Nginx

Conceptually:

```text
internet/user
  ↓
nginx
  ├─ /                → static Astro site
  ├─ /services/foo/   → foo container
  ├─ /dashboards/bar/ → bar container
  └─ /docs/baz/       → baz docs/container
```

This lets the website work as the editorial/public-facing layer while project entries can point to internal tools without inventing fake external URLs.

---

# Project link conventions

The Projects section is designed around this setup.

## Preferred route styles

Use root-relative internal routes when the destination is served through the same Nginx boundary.

Examples:

```text
/services/ritual-indexer/
/dashboards/signal-loom/
/docs/ghostlight-ui/
```

These map well to the current project link model.

## Why root-relative paths are preferred

They are:
- environment-agnostic
- portable across local/staging/prod when the same route structure is preserved
- easier to manage than hardcoding full hostnames everywhere

Avoid hardcoding full URLs unless the destination truly lives elsewhere.

---

# Nginx considerations

## 1. Keep route ownership clear

Decide which routes belong to:
- the static site
- service proxies
- docs surfaces
- dashboards

Avoid ambiguous overlaps.

For example, if `/projects/...` is owned by Astro, do not also proxy something dynamic under the same path family.

### Good separation

```text
/                     → site
/art/                 → site
/music/               → site
/writing/             → site
/projects/            → site
/apps/                → site landing page
/apps/local-dope-wars-js/  → hosted app
/apps/malevolent-crawler/  → hosted app
/apps/soundbox/            → hosted app
/services/...         → proxied service
/dashboards/...       → proxied dashboard
/docs/...             → docs service or static docs
```

If you use `/apps` this way, keep the landing page and each mounted app subpath explicitly mapped. Do not rely on a catch-all that makes it unclear whether Astro or the hosted app owns a given URL.

---

## 2. Trailing slash behavior

If project content links to paths like:

```text
/services/foo/
```

then Nginx and the upstream service should behave consistently with trailing slashes.

Inconsistent slash handling is a common source of:
- broken relative asset paths
- redirect loops
- weird subpath behavior

### Recommendation

Pick a convention and stick to it.
This repo currently leans toward trailing-slash style routes in project content.

---

## 3. Subpath-aware services

If a service is mounted under a subpath like:

```text
/services/foo/
```

make sure the service can actually run under that subpath.

Some apps assume they are hosted at `/` and will break unless configured for a base path.

Common symptoms:
- CSS/JS 404s
- broken internal links
- wrong redirect targets
- websocket paths failing

### Recommendation

Before linking a service from the site, verify that it is:
- subpath-safe
- or properly rewritten/proxied to appear subpath-safe

---

## 4. Authentication boundaries

Not every proxied service should necessarily be public.

If a project entry links to an internal tool or dashboard, decide whether it should be:
- public
- LAN-only
- authenticated
- VPN/tailnet-only

The website can describe a service even if the service itself is protected.

### Recommendation

Treat the project page and the service surface as separate security decisions.

Do not assume:
> “if it’s linked from the site, it should be public.”

---

## 5. Static site caching vs service caching

The Astro site and proxied services may want very different caching behavior.

### Static site
Usually safe to cache aggressively for:
- hashed assets
- stable build output

### Proxied services
May need more careful handling for:
- API responses
- dashboards
- auth redirects
- websocket upgrades

### Recommendation

Keep caching policy explicit per route family instead of trying to treat the whole domain uniformly.

---

# Deployment workflow

## Recommended content/site deploy flow

1. edit content or code in the repo
2. run local checks:

```bash
npm run dev
npm run build
```

3. deploy the built Astro site
4. separately deploy or restart service containers as needed
5. verify both:
   - site routes
   - proxied service routes

The site and the service fleet should be treated as related, but not identical, deploy units.

---

# Operational checks

When deploying changes, verify at least:

## Site routes
- `/`
- `/art`
- `/music`
- `/writing`
- `/projects`
- `/apps`

## Content-detail routes
- one art detail page
- one music release page
- one writing page
- one project page

## Service routes
- one `/services/...` path
- one `/dashboards/...` path if applicable
- one `/docs/...` path if applicable

This catches the most common boundary mistakes between static site routing and proxy routing.

---

# Asset and path assumptions

## Static site assets
Public assets are referenced with root-relative paths like:

```text
/art/enoch/img/photo-3.jpg
```

These need to resolve from the static site itself.

## Proxied services
Service links should usually also be root-relative, for example:

```text
/services/ritual-indexer/
```

This makes environment transitions simpler as long as your reverse-proxy route map stays stable.

---

# Reverse-proxied project authoring notes

When adding project entries to `src/content/projects/`, prefer links that reflect real deployment structure.

### Good examples

```yaml
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
```

### Avoid if not necessary

```yaml
links:
  - label: Demo
    href: https://random-subdomain.example.com:4317/
```

unless that is actually the correct durable public location.

The point of the current model is to describe the infrastructure honestly, not to mimic startup/demo-site conventions.

---

# Build and release notes

## Static build
Use:

```bash
npm run build
```

The generated output should be what Nginx serves for the website portion.

## Content changes
Because content is repo-local:
- content updates require a rebuild/redeploy of the site
- there is no runtime CMS update path at the moment

That is a tradeoff of the local-first model.

The upside is:
- simpler infrastructure
- easier backups/versioning
- no external content platform

---

# Future improvements worth considering

## 1. Staging environment
If the site and service ecosystem grows, consider a staging setup with the same route structure, such as:

```text
staging.example.com/
staging.example.com/services/foo/
```

The content model will work better if route conventions stay consistent across environments.

## 2. Health checks for service routes
If many project links point to local services, it may be worth tracking:
- whether the service route exists
- whether the upstream is healthy
- whether auth barriers changed

## 3. Deployment notes per service
As the number of services grows, consider per-project or per-service docs that record:
- upstream container name
- internal port
- reverse-proxy mount path
- auth assumptions
- restart/update procedure

This repo-level doc is the overview, not the full service registry.

---

# Practical summary

The intended production model is:

- Astro builds the public/static site
- Nginx serves that site and reverse-proxies internal services
- project pages can link directly to those proxied service routes
- the site remains local-first and file-driven
- the service layer remains separate and operationally distinct

That separation is a feature, not a problem.

It keeps the public/editorial site simple while still allowing the domain to act as a front door for a wider self-hosted ecosystem.
