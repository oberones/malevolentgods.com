# Production Image Publishing

GitHub Actions builds the static Astro site and publishes the Nginx runtime
image to GitHub Container Registry (GHCR). Automatic deployment to Hera has been
removed. Server updates are managed separately.

## Workflow

The **Verify and publish** workflow is defined in
[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).

Pull requests targeting `main` and pushes to `main` run verification only:

1. Install locked npm dependencies with `npm ci`.
2. Build the Astro site.
3. Validate the production Compose file.
4. Build the production Docker image without publishing it.

Pushing a version tag in `X.Y.Z` or `vX.Y.Z` format (numeric major, minor, and
patch components) runs the same verification, then publishes these image tags:

- `ghcr.io/oberones/malevolentgods.com:<version-tag>` (for example, `0.3.0` or `v0.3.0`)
- `ghcr.io/oberones/malevolentgods.com:sha-<commit>`
- `ghcr.io/oberones/malevolentgods.com:latest`

The version image tag preserves the Git tag exactly, including an optional `v`
prefix. Other tags, including prerelease tags such as `0.3.0-rc.1`, do not
trigger publishing. Publishing requires verification to pass first.

The workflow ends after publishing. It does not copy Compose files, run SSH
commands, restart containers, or check the public site.

## GitHub permissions

Verification uses `contents: read`. The publish job additionally uses
`packages: write` and authenticates to GHCR with the repository's `GITHUB_TOKEN`.
No production environment or `DEPLOY_*` secrets are required by this workflow.
Existing deployment secrets are no longer referenced; this repository change
does not delete them from GitHub.

## Normal release workflow

1. Open a pull request to `main`.
2. Wait for the **Verify** check to pass.
3. Merge the pull request and wait for verification on `main` to pass.
4. Tag the release commit and push that tag. For example, from an up-to-date
   `main` checkout, using an unused version:

   ```bash
   git tag -a 0.3.0 -m "Release 0.3.0"
   git push origin 0.3.0
   ```

5. Wait for **Verify and publish** to complete for the tag push.
6. Confirm the expected version and `sha-<commit>` tags are available in GHCR.

Publishing an image does not update the running website. Use the version or
commit image tag when selecting a specific image for a separately managed
deployment or rollback.
The production Compose file remains at `deploy/compose.production.yml`.

## Container runtime user

The production image and Compose service both select `nginx:nginx` (UID/GID
101 in the pinned runtime image). The Nginx master and worker processes run as
this unprivileged account. The image places the PID file in `/tmp/nginx.pid`
and gives this account ownership of `/var/cache/nginx`; site files and
configuration remain owned by root.

Compose drops all Linux capabilities and enables `no-new-privileges`. The
container-local `net.ipv4.ip_unprivileged_port_start=0` setting allows Nginx to
keep listening on port 80 without a bind capability, preserving the existing
reverse proxy and health check configuration. The production example uses the
same settings.

Deploy this Compose change together with an image rebuilt from the updated
Dockerfile. Older images lack the writable PID/cache setup and will not start
with the enforced non-root user. Publishing alone does not apply either change
to the running server.
