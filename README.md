# malevolentgods.com

[malevolentgods.com](https://malevolentgods.com/) is the static home of the
Malevolent Gods collective: art, music, writing, software, and other work made
under questionable celestial supervision.

The site is built with Astro 5 and Tailwind CSS 4. Content is stored in local
Markdown and JSON collections, assets live in the repository, and production is
served by Nginx from a small multi-stage Docker image. There is no runtime CMS,
database, or Node.js application server.

## Quickstart

You need Node.js 20 and npm. Docker and Docker Compose are optional unless you
are testing the production image or deployment configuration.

Install the locked dependencies and start Astro's development server:

```bash
npm ci
npm run dev
```

Open the URL printed by Astro (normally
[`http://localhost:4321`](http://localhost:4321)). No environment variables are
required for local development.

Build and preview the static production output:

```bash
npm run build
npm run preview
```

The build is written to `dist/`. `npm run build` also validates the content
collections and is the minimum required check for every change.

## Content and project layout

The site is local-first: publishing a content change means committing it and
rebuilding the site.

| Path | Purpose |
| --- | --- |
| `src/pages/` | File-based Astro routes |
| `src/components/` | Reusable Astro UI |
| `src/layouts/` | Shared page layouts |
| `src/lib/` | Content loaders and shared helpers |
| `src/content/` | Markdown and JSON content collections |
| `src/content.config.ts` | Collection schemas and validation |
| `src/styles/` | Global CSS and Tailwind setup |
| `public/` | Images and other directly served assets |
| `docker/` | Nginx runtime configuration |
| `deploy/` | Production Docker Compose configuration |
| `docs/` | Authoring and operations guides |

The main collections cover site settings, navigation, art, artists, music,
writing, apps, and projects. A few important publishing rules:

- Keep global copy in `src/content/site/settings.json` synchronized with its
  fallback in `src/lib/site.ts`.
- Put public assets under `public/` and reference them with root-relative paths.
- Writing entries with `status: draft` are deliberately omitted from indexes and
  generated detail routes.
- Project and app links may point to real services mounted under the same domain;
  verify that those services support their configured subpaths.

See the [quick authoring guide](docs/QUICKSTART.md) for common content tasks and
the [complete content guide](docs/CONTENT-GUIDE.md) for collection fields,
examples, slugs, images, and embeds.

## Verification

Before opening a pull request, run:

```bash
npm run build
git diff --check
```

Manually inspect every affected route, including responsive layouts, links,
embeds, and asset paths. Confirm that draft writing remains hidden.

For deployment-related changes, also validate the Compose file and build the
same image shape used in CI:

```bash
docker compose --file deploy/compose.production.yml config --quiet
docker build --tag malevolentgods-com:local .
```

## Run the production container locally

The Dockerfile builds the Astro site with Node.js, then copies only `dist/` into
an Nginx runtime image:

```bash
make docker-build
make docker-run HOST_PORT=8080
```

Open [`http://localhost:8080`](http://localhost:8080). Stop the named container
from another terminal with:

```bash
make docker-stop
```

## Production image publishing

GitHub Actions verifies and publishes the production image through
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Pull requests to `main` run `npm ci`, build the site, validate the production
   Compose file, and build the Docker image without publishing it.
2. A push to `main` runs the same verification, then publishes both a
   `sha-<commit>` image tag and the moving `latest` tag to
   `ghcr.io/oberones/malevolentgods.com`.

The **Verify and publish** workflow ends after publishing to GHCR. Deployment to
Hera is managed separately; the workflow does not connect to or update the server.

See the [image publishing guide](docs/AUTOMATED-DEPLOYMENT.md) for workflow and
permission details. The broader [infrastructure notes](docs/DEPLOYMENT.md)
describe hosting and reverse-proxied apps and services.

## Useful commands

| Command | Action |
| --- | --- |
| `npm ci` | Install the exact locked dependency set |
| `npm run dev` | Start the local Astro development server |
| `npm run build` | Validate content and generate `dist/` |
| `npm run preview` | Serve the generated build locally |
| `make docker-build` | Build the Nginx production image |
| `make docker-run HOST_PORT=8080` | Run the image on a local host port |
| `make docker-stop` | Stop the locally named container |
| `make help` | List the available Make targets |
