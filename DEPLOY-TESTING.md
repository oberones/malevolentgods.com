# Deploy / Testing Notes

## Docker test build

Build the container:

```bash
docker build -t new-malevolentgods-com .
```

Run it locally:

```bash
docker run --rm -p 8080:80 new-malevolentgods-com
```

Then open:

```text
http://localhost:8080
```

## What this container does

- builds the Astro site in a Node stage
- copies the generated static `dist/` output into nginx
- serves the built site on port `80`

## Notes

- this is intended for static site testing/deployment
- if you later add server-side rendering, this Dockerfile will need to change
- nginx config is intentionally minimal for first-pass testing

## Before testing Sanity-backed content

Make sure the environment values used at build time are set:
- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_SANITY_API_VERSION`

If they are not set, the site will continue using fallback data where applicable.
