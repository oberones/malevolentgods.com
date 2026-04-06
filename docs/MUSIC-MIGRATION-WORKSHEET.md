# Music Migration Worksheet

This worksheet captures the first-pass audit of the legacy music pages and maps them into the new Astro + Sanity model.

## Audit summary

Legacy pages reviewed:
- `music/index.html`
- `music/doeslittle.html`
- `music/enoch.html`
- `music/ignus.html`
- `music/kerberos.html`

Not found:
- `music/group.html` (linked from `music/index.html`, but missing from the copied legacy site)

## High-level findings

1. The current music section is mostly a collection of **embed landing pages**, not rich editorial pages.
2. Artist pages currently contain **very little written metadata**.
3. Most of the useful migratable data is:
   - artist identity
   - release/track titles
   - provider type
   - embed URL
   - outbound profile/release links
4. The old pages often mix **artist profile embeds** and **specific release/track embeds** on the same page.
5. `Enoch Root` currently behaves less like a single-release page and more like a **track collection / profile page** built from SoundCloud embeds.

---

# Proposed migration model decisions

## Artist vs release strategy

### Artists to create
Create these `artist` documents:
- Malevolent Gods (group/collective)
- Dr. Doeslittle
- Enoch Root
- Ignus VanMule
- Kerberos

### Releases to create
Create `musicRelease` documents for named releases/tracks where the legacy site clearly identifies them.

### Group profile decision
Even though `music/group.html` is missing, the group should still likely exist as an `artist` document because:
- the music landing page presents Malevolent Gods as a musical entity
- the release `Orbit` is associated with the collective itself

---

# Legacy page audit

## 1. `music/index.html`

### What it contains
A music landing page with six featured boxes:
- Malevolent Gods
- Dr. Doeslittle
- Ignus VanMule
- Enoch Root
- Kerberos
- one empty/unused slot

### Extracted items

#### Malevolent Gods
- label/title: `Malevolent Gods`
- embed provider: Bandcamp
- embed URL: `https://bandcamp.com/EmbeddedPlayer/album=930782333/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/`
- inferred release title: `Orbit`
- more link target: `/music/group.html`
- mapping note: `group.html` is missing, so the landing page is currently the strongest source for the group music release

#### Dr. Doeslittle
- label/title: `Dr. Doeslittle`
- embed provider: Bandcamp
- embed URL: `https://bandcamp.com/EmbeddedPlayer/album=789442930/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/`
- inferred release title: `The Letter H`
- detail page: `/music/doeslittle.html`

#### Ignus VanMule
- label/title: `Ignus VanMule`
- embed provider: Spotify
- embed URL: `https://open.spotify.com/embed/artist/690FVbm5LHh244D2bo5m9g?utm_source=generator`
- detail page: `/music/ignus.html`
- mapping note: this is an artist profile embed, not a release

#### Enoch Root
- label/title: `Enoch Root`
- embed provider: SoundCloud
- embed URL: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1339104103&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
- inferred featured track: `A Wizard's Coven (Remix)` based on `enoch.html`
- detail page: `/music/enoch.html`

#### Kerberos
- label/title: `Kerberos`
- embed provider: Bandcamp
- embed URL: `https://bandcamp.com/EmbeddedPlayer/album=1613136498/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/`
- inferred release title: `Peaches and Cream`
- detail page: `/music/kerberos.html`

### Recommended migration
- create a new `/music` page from structured content
- feature artists and/or releases instead of hardcoding embeds directly into the landing page
- use this page mainly as a curation source, not as the canonical data source for release details

---

## 2. `music/doeslittle.html`

### What it contains
Three columns:
- Spotify artist embed
- Bandcamp album embed
- SoundCloud track/profile embed

### Artist data
- artist name: `Dr. Doeslittle`
- page title: `Malevolent Gods - Dr. Doeslittle`
- outbound links:
  - Spotify artist page: `https://open.spotify.com/artist/76vPJ9XqFfO9XpZweJVNvG?si=KXmZP1C5SUKQLRh5ArmCgQ`
  - Bandcamp profile: `https://drdoeslittle.bandcamp.com/`
  - SoundCloud profile: `https://soundcloud.com/dr-doeslittle`

### Embedded content

#### Spotify artist profile
- provider: Spotify
- embed URL: `https://open.spotify.com/embed/artist/76vPJ9XqFfO9XpZweJVNvG?utm_source=generator`
- type: artist profile embed

#### Bandcamp release
- provider: Bandcamp
- release title: `The Letter H`
- embed URL: `https://bandcamp.com/EmbeddedPlayer/album=789442930/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/`
- anchor link target in iframe fallback: `https://drdoeslittle.bandcamp.com/album/the-letter-h`
- type: release

#### SoundCloud embed
- provider: SoundCloud
- embed URL: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1503107674&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
- type: likely single track or featured track
- unresolved: track title not visible in page copy

### Recommended migration
Create:
- `artist`: `Dr. Doeslittle`
- `musicRelease`: `The Letter H`
- optional additional `musicRelease` or embedded feature item for the SoundCloud track once title is identified

### Missing data to fill later
- bio text
- portrait/hero image
- title of SoundCloud track 1503107674
- release date(s)
- credits

---

## 3. `music/enoch.html`

### What it contains
A multi-track SoundCloud page with four embeds.

### Artist data
- artist name: `Enoch Root`
- page title: `Malevolent Gods - Enoch Root Music`
- outbound link repeated across embeds: `https://soundcloud.com/enoch-root-music`

### Embedded tracks/releases

#### Item 1
- title: `Ignus VanMule's The Illusion of Self (DJ Mix)`
- provider: SoundCloud
- embed URL: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1856506179&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
- note: title suggests a cross-artist relationship with Ignus VanMule

#### Item 2
- title: `A Wizard's Coven (Remix)`
- provider: SoundCloud
- embed URL: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1339104103&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`

#### Item 3
- title: `Opening the Portal (Single)`
- provider: SoundCloud
- embed URL: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1354901281&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`

#### Item 4
- title: `Polish Ambassador Deep Cuts (DJ Mix)`
- provider: SoundCloud
- embed URL: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1835574948&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`

### Recommended migration
Create:
- `artist`: `Enoch Root`
- multiple `musicRelease` documents, likely one per named track/mix:
  - `Ignus VanMule's The Illusion of Self (DJ Mix)`
  - `A Wizard's Coven (Remix)`
  - `Opening the Portal`
  - `Polish Ambassador Deep Cuts (DJ Mix)`

### Modeling note
This page strongly suggests the music model may eventually want:
- a lighter-weight `track` type, or
- the willingness to use `musicRelease` for singles/mixes/tracks in the first pass

For speed, I recommend using `musicRelease` for all named music items in the first migration.

### Missing data to fill later
- bio text
- artwork
- release dates
- credits
- whether any of these belong to EPs/albums rather than standalone tracks

---

## 4. `music/ignus.html`

### What it contains
Three columns:
- Spotify artist profile embed
- SoundCloud single `Get Juked`
- SoundCloud single `Que Hacemos Sera`

### Artist data
- artist name: `Ignus VanMule`
- page title: `Malevolent Gods - Ignus Music`
- outbound links:
  - Spotify artist page: `https://open.spotify.com/artist/690FVbm5LHh244D2bo5m9g?si=efDXeh9bSz6pqxnsZSMdQA`
  - SoundCloud profile: `https://soundcloud.com/steven-a-strength`

### Embedded content

#### Spotify artist profile
- provider: Spotify
- embed URL: `https://open.spotify.com/embed/artist/690FVbm5LHh244D2bo5m9g?utm_source=generator`
- note: page label has a typo: `Spotify Artist PAge`

#### SoundCloud single 1
- title: `Get Juked (Single)`
- provider: SoundCloud
- embed URL: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1877084127&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`

#### SoundCloud single 2
- title: `Que Hacemos Sera (Single)`
- provider: SoundCloud
- embed URL: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1871334924&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`

### Recommended migration
Create:
- `artist`: `Ignus VanMule`
- `musicRelease`: `Get Juked`
- `musicRelease`: `Que Hacemos Sera`

### Missing data to fill later
- bio text
- artwork
- release dates
- credits
- verify exact spelling/capitalization for `Que Hacemos Sera`

---

## 5. `music/kerberos.html`

### What it contains
Three columns:
- Bandcamp album embed
- Spotify artist embed
- SoundCloud embed

### Artist data
- artist name: `Kerberos`
- page title: `Malevolent Gods - Kerberos Music`
- outbound links:
  - Bandcamp profile: `https://kerberos-music.bandcamp.com/`
  - Spotify artist page: `https://open.spotify.com/artist/4G9U51JAktDxSH5nRNAhxN?si=QISl9rWkTMWIc-bMOCER8A`
  - SoundCloud profile: `https://soundcloud.com/kerberos_makes_music`

### Embedded content

#### Bandcamp release
- provider: Bandcamp
- release title: `Peaches and Cream`
- embed URL: `https://bandcamp.com/EmbeddedPlayer/album=1613136498/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/`
- fallback link target: `https://kerberos-music.bandcamp.com/album/peaches-and-cream`

#### Spotify artist profile
- provider: Spotify
- embed URL: `https://open.spotify.com/embed/artist/4G9U51JAktDxSH5nRNAhxN?utm_source=generator`

#### SoundCloud embed
- provider: SoundCloud
- embed URL: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1830655695&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
- unresolved: track title not visible in page copy

### Recommended migration
Create:
- `artist`: `Kerberos`
- `musicRelease`: `Peaches and Cream`
- optional additional release/item for SoundCloud track 1830655695 once title is identified

### Missing data to fill later
- bio text
- imagery
- SoundCloud track title
- release date
- credits

---

# First-pass content creation plan

## Artist documents to create first
1. Malevolent Gods
2. Dr. Doeslittle
3. Enoch Root
4. Ignus VanMule
5. Kerberos

## Music release documents to create first
1. Orbit
2. The Letter H
3. A Wizard's Coven (Remix)
4. Opening the Portal
5. Polish Ambassador Deep Cuts
6. Ignus VanMule's The Illusion of Self (DJ Mix)
7. Get Juked
8. Que Hacemos Sera
9. Peaches and Cream

## Music items requiring follow-up identification
1. Dr. Doeslittle SoundCloud track `1503107674`
2. Kerberos SoundCloud track `1830655695`

---

# Schema and implementation notes

## Good news
The current schema shape is already good enough to start migration.

## Likely near-term additions
Potential additions later if needed:
- a dedicated `musicEmbed` or `musicItem` subtype
- a `featuredTracks` array on `artist`
- release/provider-specific metadata

## For now
Do not overcomplicate it.
Use:
- `artist` for people/groups
- `musicRelease` for named tracks, singles, mixes, and albums

That is good enough to ship the first slice.

---

# Immediate next recommended steps

1. Create sample `artist` and `musicRelease` seed documents for the first few music items.
2. Build a reusable embed component for Spotify, SoundCloud, and Bandcamp.
3. Build the `/music` page from sample structured data.
4. Build artist and release detail routes.
5. Fill missing metadata later rather than blocking the migration now.
