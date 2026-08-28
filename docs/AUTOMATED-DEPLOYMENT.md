# Automated Production Deployment

The production workflow builds the static Astro site in GitHub Actions, publishes
the Nginx runtime image to GitHub Container Registry (GHCR), and deploys the exact
Git commit to the target server with Docker Compose.

The target server does not need a Git checkout, Node.js, npm, or an image build
toolchain. It only needs Docker Engine, Docker Compose v2, SSH access, and access
to the existing `ai-backend` Docker network.

## Deployment flow

Pull requests targeting `main` run the verification job only:

1. install locked npm dependencies with `npm ci`
2. build the Astro site
3. validate the production Compose file
4. build the production Docker image without publishing it

Pushes to `main` run verification and then:

1. publish `ghcr.io/oberones/malevolentgods.com:sha-<commit>`
2. update `ghcr.io/oberones/malevolentgods.com:latest`
3. copy the validated production Compose file to the server
4. pull and recreate only the `mg-website` service
5. wait for the container health check
6. verify `https://malevolentgods.com/`

The workflow is defined in `.github/workflows/deploy.yml`. Production runs are
serialized so two deployments cannot modify the container concurrently.

## One-time server setup

These examples assume a dedicated deployment account named `deploy`. Substitute
the account that should own and operate the existing website container.

### 1. Prepare the deployment directory

Run this once with an account that has `sudo` access:

```bash
sudo install -d -o deploy -g deploy /opt/malevolentgods.com
```

The deployment user must be able to run `docker` without an interactive password.
Membership in the Docker group is effectively root-level access; use a dedicated
account and SSH key, or rootless Docker, as appropriate for the server.

Confirm that current Docker Compose supports `--wait`:

```bash
docker compose version
```

### 2. Confirm the shared Docker network

The public edge Nginx and the site container must share the existing external
network:

```bash
docker network inspect ai-backend
```

If the network does not exist, create it once:

```bash
docker network create ai-backend
```

The edge Nginx upstream should continue to target `mg-website:80`. The production
Compose file intentionally does not publish the site container on a host port.

Before enabling the workflow, stop the existing manually managed `mg-website`
container using the same Compose file and command that created it. This one-time
cutover prevents the old Compose project from retaining the fixed `mg-website`
container name. Do not stop the separate edge Nginx container.

### 3. Give the deployment account GHCR pull access

New GHCR packages are private by default. Before the first automated deployment,
create a GitHub personal access token (classic) with only `read:packages`, then log
in as the same deployment account that will run Docker Compose:

```bash
read -rsp "GHCR token: " GHCR_TOKEN
printf '\n'
printf '%s' "$GHCR_TOKEN" | docker login ghcr.io -u oberones --password-stdin
unset GHCR_TOKEN
```

If the package is later made public, the server can pull it anonymously and the
stored registry credential can be removed with:

```bash
docker logout ghcr.io
```

### 4. Install a dedicated SSH key

Generate a deployment-only Ed25519 key on a trusted workstation. Add its public
key to the deployment account's `~/.ssh/authorized_keys`. Store the private
key only in the GitHub `production` environment secret described below.

Verify the server's SSH host-key fingerprint through a trusted channel before
creating the `known_hosts` entry. Do not disable strict host-key checking.

## GitHub environment configuration

In the GitHub repository, open **Settings → Environments** and create an
environment named `production`.

Add these environment secrets:

| Secret | Value |
| --- | --- |
| `DEPLOY_HOST` | SSH hostname or IP address of the target server |
| `DEPLOY_PORT` | SSH port, such as `22666` |
| `DEPLOY_USER` | Server deployment account, such as `deploy` |
| `DEPLOY_SSH_KEY` | Complete private deployment key, including header and footer |
| `DEPLOY_KNOWN_HOSTS` | Verified OpenSSH `known_hosts` entry for `DEPLOY_HOST` and `DEPLOY_PORT` |

Optionally restrict the environment to `main` and require reviewer approval. A
required reviewer creates a deliberate production gate; without one, a successful
merge to `main` deploys automatically.

Protect `main` so the `Verify` job must pass before a pull request can merge. The
workflow never exposes deployment secrets to pull-request jobs.

## Normal release workflow

1. Work on a feature branch.
2. Push the branch and open a pull request to `main`.
3. Wait for the `Verify` check to pass.
4. Merge the pull request.
5. Watch the `Verify, publish, and deploy` workflow complete.
6. Confirm the deployment reports the expected commit image tag.

No Git pull or Docker build is required on the target server.

## Rollback

Find the last known-good Git commit SHA in GitHub Actions or GHCR, then run on the
target server:

```bash
cd /opt/malevolentgods.com
IMAGE_TAG=sha-<previous-commit-sha> docker compose pull mg-website
IMAGE_TAG=sha-<previous-commit-sha> docker compose up \
  --detach \
  --no-deps \
  --wait \
  --wait-timeout 60 \
  mg-website
```

The immutable `sha-...` tag is the rollback source of truth. Do not use `latest`
when performing a rollback.

## Troubleshooting

### The first deployment cannot pull the image

Run `docker login ghcr.io` as the deployment user and confirm the token has
`read:packages`. GitHub Actions uses its repository-scoped `GITHUB_TOKEN` to
publish; that credential is not copied to the target server.

### SSH or SCP fails

Confirm the environment secrets contain the correct username, private key, and
verified host entry. The deployment account must be able to write to
`/opt/malevolentgods.com`.

### Compose reports that `--wait` is unknown

Update the Docker Compose v2 plugin on the target server. The workflow relies on `--wait` to
avoid reporting success before the Nginx health check passes.

### The container is healthy but the public check fails

Check the edge Nginx upstream and confirm it can resolve `mg-website` on the
`ai-backend` network. Also confirm TLS and DNS for `malevolentgods.com` are
valid from outside the server.
