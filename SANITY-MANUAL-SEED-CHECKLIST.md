# Sanity Manual Seed Checklist

Use this checklist to seed the first real Sanity content for the rebuilt Malevolent Gods site.

This is optimized for **speed and feedback**, not perfect data modeling.
The point is to get the CMS-backed site working end-to-end and refine later.

---

## Recommended order

Seed content in this order:

1. `siteSettings`
2. `navigation`
3. `artist` documents
4. `musicRelease` documents
5. verify frontend behavior

Do **not** start with releases before artists, because releases want artist references.

---

# 1. Create `siteSettings`

## Create one document
Type:
- `siteSettings`

## Fill these fields

### Site title
- `Malevolent Gods`

### Site description
- `A collective of artists, musicians, writers, and makers building strange and beautiful things.`

### Footer text
- `© 2026 Malevolent Gods.`

### Homepage hero
Use:
- eyebrow: `Malevolent Gods`
- title: `Art, music, writing, and software from a collective that likes it a little haunted.`
- summary: `This is the new foundation for the collective’s site: faster, cleaner, mobile-first, and built to grow without turning content updates into a chore.`
- primary CTA label: `Explore music`
- primary CTA href: `/music`
- secondary CTA label: `View art`
- secondary CTA href: `/art`

### Social links
Optional for first pass.
If adding one, start with:
- label: `Bandcamp`
- href: `https://malevolentgods.bandcamp.com`

### SEO
Optional for first pass.
Can be added later.

## After save
Verify:
- homepage title/description still render correctly
- homepage hero should now come from Sanity instead of fallback content

---

# 2. Create `navigation`

## Create one document
Type:
- `navigation`

## Fill these fields

### Title
- `Primary navigation`

### Items
Create these items in order:
1. `Home` → `/`
2. `Art` → `/art`
3. `Music` → `/music`
4. `Writing` → `/writing`
5. `Projects` → `/projects`

## After save
Verify:
- header nav still renders correctly
- links match expected routes

---

# 3. Create artists

Create these artist documents first.

---

## Artist 1 — Malevolent Gods

### Fields
- name: `Malevolent Gods`
- slug: `malevolent-gods`
- short bio: `Collective profile for the Malevolent Gods music identity.`
- roles: `Collective`, `Music`
- featured: `true`

### Optional for later
- full bio
- hero image
- portrait
- links
- SEO

---

## Artist 2 — Dr. Doeslittle

### Fields
- name: `Dr. Doeslittle`
- slug: `dr-doeslittle`
- short bio: `Artist profile migrated from the legacy music section.`
- roles: `Music`
- featured: `true`

### Links
- `Spotify` → `https://open.spotify.com/artist/76vPJ9XqFfO9XpZweJVNvG?si=KXmZP1C5SUKQLRh5ArmCgQ`
- `Bandcamp` → `https://drdoeslittle.bandcamp.com/`
- `SoundCloud` → `https://soundcloud.com/dr-doeslittle`

---

## Artist 3 — Enoch Root

### Fields
- name: `Enoch Root`
- slug: `enoch-root`
- short bio: `Artist profile migrated from the legacy SoundCloud-heavy music page.`
- roles: `Music`, `DJ`
- featured: `true`

### Links
- `SoundCloud` → `https://soundcloud.com/enoch-root-music`

---

## Artist 4 — Ignus VanMule

### Fields
- name: `Ignus VanMule`
- slug: `ignus-vanmule`
- short bio: `Artist profile migrated from the legacy Ignus music page.`
- roles: `Music`
- featured: `true`

### Links
- `Spotify` → `https://open.spotify.com/artist/690FVbm5LHh244D2bo5m9g?si=efDXeh9bSz6pqxnsZSMdQA`
- `SoundCloud` → `https://soundcloud.com/steven-a-strength`

---

## Artist 5 — Kerberos

### Fields
- name: `Kerberos`
- slug: `kerberos`
- short bio: `Artist profile migrated from the legacy Kerberos music page.`
- roles: `Music`
- featured: `true`

### Links
- `Bandcamp` → `https://kerberos-music.bandcamp.com/`
- `Spotify` → `https://open.spotify.com/artist/4G9U51JAktDxSH5nRNAhxN?si=QISl9rWkTMWIc-bMOCER8A`
- `SoundCloud` → `https://soundcloud.com/kerberos_makes_music`

## After saving artists
Verify:
- `/artists/[slug]` pages should be able to resolve when the rest of the content exists
- no slug typos

---

# 4. Create music releases

Start with these release documents.

---

## Release 1 — Orbit

### Fields
- title: `Orbit`
- slug: `orbit`
- artists: `Malevolent Gods`
- release type: `Album`
- summary: `Bandcamp release associated with the Malevolent Gods collective profile.`
- featured: `true`

### Embed
- provider: `Bandcamp`
- title: `Orbit by Malevolent Gods`
- url: `https://bandcamp.com/EmbeddedPlayer/album=930782333/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/`
- aspect ratio: `1 / 1`

---

## Release 2 — The Letter H

### Fields
- title: `The Letter H`
- slug: `the-letter-h`
- artists: `Dr. Doeslittle`
- release type: `Album`
- summary: `Dr. Doeslittle release carried over from the legacy Bandcamp embed.`
- featured: `true`

### Links
- `Bandcamp` → `https://drdoeslittle.bandcamp.com/album/the-letter-h`

### Embed
- provider: `Bandcamp`
- title: `The Letter H by Dr. Doeslittle`
- url: `https://bandcamp.com/EmbeddedPlayer/album=789442930/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/`
- aspect ratio: `1 / 1`

---

## Release 3 — A Wizard's Coven (Remix)

### Fields
- title: `A Wizard's Coven (Remix)`
- slug: `a-wizards-coven-remix`
- artists: `Enoch Root`
- release type: `Single`
- summary: `SoundCloud item featured on the Enoch Root page and landing page.`
- featured: `true`

### Links
- `SoundCloud` → `https://soundcloud.com/enoch-root-music`

### Embed
- provider: `SoundCloud`
- title: `A Wizard's Coven (Remix)`
- url: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1339104103&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
- aspect ratio: `1 / 1`

---

## Release 4 — Opening the Portal

### Fields
- title: `Opening the Portal`
- slug: `opening-the-portal`
- artists: `Enoch Root`
- release type: `Single`
- summary: `Single featured on the legacy Enoch Root music page.`
- featured: `true`

### Links
- `SoundCloud` → `https://soundcloud.com/enoch-root-music`

### Embed
- provider: `SoundCloud`
- title: `Opening the Portal (Single)`
- url: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1354901281&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
- aspect ratio: `1 / 1`

---

## Release 5 — Polish Ambassador Deep Cuts

### Fields
- title: `Polish Ambassador Deep Cuts`
- slug: `polish-ambassador-deep-cuts`
- artists: `Enoch Root`
- release type: `Other` or `DJ Mix`
- summary: `DJ mix featured on the legacy Enoch Root page.`
- featured: `true`

### Links
- `SoundCloud` → `https://soundcloud.com/enoch-root-music`

### Embed
- provider: `SoundCloud`
- title: `Polish Ambassador Deep Cuts (DJ Mix)`
- url: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1835574948&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
- aspect ratio: `1 / 1`

---

## Release 6 — Ignus VanMule's The Illusion of Self

### Fields
- title: `Ignus VanMule's The Illusion of Self`
- slug: `ignus-vanmules-the-illusion-of-self`
- artists: `Enoch Root`, `Ignus VanMule`
- release type: `Other` or `DJ Mix`
- summary: `DJ mix surfaced on the Enoch Root legacy page and tied to Ignus VanMule in the title.`
- featured: `true`

### Links
- `SoundCloud` → `https://soundcloud.com/enoch-root-music`

### Embed
- provider: `SoundCloud`
- title: `Ignus VanMule's The Illusion of Self (DJ Mix)`
- url: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1856506179&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
- aspect ratio: `1 / 1`

---

## Release 7 — Get Juked

### Fields
- title: `Get Juked`
- slug: `get-juked`
- artists: `Ignus VanMule`
- release type: `Single`
- summary: `Ignus VanMule single from the legacy SoundCloud page.`
- featured: `true`

### Links
- `SoundCloud` → `https://soundcloud.com/steven-a-strength`

### Embed
- provider: `SoundCloud`
- title: `Get Juked`
- url: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1877084127&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
- aspect ratio: `1 / 1`

---

## Release 8 — Que Hacemos Sera

### Fields
- title: `Que Hacemos Sera`
- slug: `que-hacemos-sera`
- artists: `Ignus VanMule`
- release type: `Single`
- summary: `Single featured on the Ignus VanMule legacy page.`
- featured: `true`

### Links
- `SoundCloud` → `https://soundcloud.com/steven-a-strength`

### Embed
- provider: `SoundCloud`
- title: `Que Hacemos Sera (Single)`
- url: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1871334924&color=%232a2122&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
- aspect ratio: `1 / 1`

---

## Release 9 — Peaches and Cream

### Fields
- title: `Peaches and Cream`
- slug: `peaches-and-cream`
- artists: `Kerberos`
- release type: `Album`
- summary: `Kerberos release featured in the legacy music section.`
- featured: `true`

### Links
- `Bandcamp` → `https://kerberos-music.bandcamp.com/album/peaches-and-cream`

### Embed
- provider: `Bandcamp`
- title: `Peaches and Cream by Kerberos`
- url: `https://bandcamp.com/EmbeddedPlayer/album=1613136498/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/`
- aspect ratio: `1 / 1`

---

# 5. Verification checklist

After entering content, verify these pages:

## Global
- [ ] homepage loads with Sanity hero content
- [ ] nav renders from Sanity
- [ ] footer text renders from Sanity

## Music
- [ ] `/music` shows featured artists
- [ ] `/music` shows featured releases
- [ ] `/music/orbit`
- [ ] `/music/the-letter-h`
- [ ] `/music/get-juked`
- [ ] `/artists/dr-doeslittle`
- [ ] `/artists/enoch-root`
- [ ] `/artists/ignus-vanmule`
- [ ] `/artists/kerberos`

## Relationships
- [ ] release pages link to artist pages
- [ ] artist pages show related releases
- [ ] related listening appears on release pages where expected

---

# What not to block on

Do not stop the seeding pass because of:
- missing legacy pages
- unknown bios
- missing images
- missing credits
- unknown release dates
- imperfect release typing (`Single` vs `DJ Mix` vs `Other`)

Get the content loop working first.
Then refine.

---

# Suggested first checkpoint

The first strong checkpoint is:
- homepage pulling from Sanity
- `/music` pulling from Sanity
- at least 3 artists seeded
- at least 3 releases seeded

Once that works, the rest is just completion work.
