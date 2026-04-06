# Sanity Seeding Plan

This document describes the next practical step for shifting the music slice from fallback sample content toward real Sanity-backed content.

## Goal

Seed enough Sanity content to make the Music slice function against real CMS data for testing.

## First documents to create

### Global documents
1. `siteSettings`
2. `navigation`

Use the sample files under:
- `sanity/seed/siteSettings.sample.json`
- `sanity/seed/navigation.sample.json`

### Artist documents
Create these first:
1. Malevolent Gods
2. Dr. Doeslittle
3. Enoch Root
4. Ignus VanMule
5. Kerberos

Use:
- `sanity/seed/music-artists.sample.json`

### Music release documents
Create these first:
1. Orbit
2. The Letter H
3. A Wizard's Coven (Remix)
4. Opening the Portal
5. Polish Ambassador Deep Cuts
6. Ignus VanMule's The Illusion of Self
7. Get Juked
8. Que Hacemos Sera
9. Peaches and Cream

Use:
- `sanity/seed/music-releases.sample.json`

## Important note on references

The sample JSON files are intentionally lightweight and not yet a fully import-ready relational dataset.

Before importing releases with artist references, choose one of these approaches:

### Option A — manual Studio entry for first pass
Best for quick testing.
- create artists first in Studio
- create releases second in Studio
- attach artist references manually

### Option B — import-ready JSON generation
Best if you want repeatable seeded environments.
- assign deterministic `_id` values to artists
- convert release artist slugs into Sanity references
- generate an import-ready NDJSON file

## Recommended approach

For immediate testing:
> use Studio manually for the first pass.

It is simpler, and the content set is still small.

If this becomes a repeated deployment flow, then create an import script.

## Suggested validation order

1. seed `siteSettings`
2. seed `navigation`
3. verify homepage + nav/footer pull from Sanity
4. seed artists
5. seed releases
6. verify `/music`
7. verify `/music/[slug]`
8. verify `/artists/[slug]`

## What to ignore for now

Do not block on:
- missing old-site pages
- missing bios
- missing hero images
- unknown release dates
- unknown credits

Those can be backfilled later.

The current goal is proving the CMS-backed slice works.
