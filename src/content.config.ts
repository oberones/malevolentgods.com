import { defineCollection, z } from 'astro:content';

const art = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    medium: z.string().optional(),
    featured: z.boolean().default(false),
    coverImage: z.string(),
    gallery: z.array(
      z.object({
        src: z.string(),
        caption: z.string().optional()
      })
    ).default([])
  })
});

const site = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    footerText: z.string(),
    homepageHero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      summary: z.string(),
      primaryCtaLabel: z.string().optional(),
      primaryCtaHref: z.string().optional(),
      secondaryCtaLabel: z.string().optional(),
      secondaryCtaHref: z.string().optional()
    }),
    socialLinks: z.array(
      z.object({
        label: z.string(),
        href: z.string()
      })
    ).default([])
  })
});

const navigation = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().optional(),
    items: z.array(
      z.object({
        label: z.string(),
        href: z.string()
      })
    )
  })
});

const artists = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    shortBio: z.string(),
    featured: z.boolean().default(false),
    portrait: z.string().default(''),
    heroImage: z.string().default(''),
    links: z.array(
      z.object({
        label: z.string(),
        href: z.string()
      })
    ).default([])
  })
});

const music = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    releaseType: z.string().optional(),
    featured: z.boolean().default(true),
    artistSlugs: z.array(z.string()).default([]),
    artistNames: z.array(z.string()).default([]),
    credits: z.array(z.string()).default([]),
    links: z.array(
      z.object({
        label: z.string(),
        href: z.string()
      })
    ).default([]),
    coverImage: z.string().default(''),
    embed: z.object({
      provider: z.enum(['Bandcamp', 'Spotify', 'SoundCloud', 'YouTube', 'Other']).optional(),
      title: z.string().optional(),
      url: z.string(),
      aspectRatio: z.string().optional()
    }).optional()
  })
});

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['draft', 'published']).default('draft'),
    format: z.enum(['essay', 'note', 'fragment', 'poem', 'manifesto']),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    heroImage: z.string().optional()
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['active', 'archived', 'prototype', 'planned']).default('prototype'),
    projectType: z.enum(['software', 'tool', 'web', 'system', 'experiment', 'infrastructure']),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    links: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
        kind: z.enum(['service', 'repo', 'docs', 'dashboard', 'other']).default('other')
      })
    ).default([]),
    heroImage: z.string().optional(),
    repository: z.string().optional(),
    demoUrl: z.string().optional()
  })
});

export const collections = {
  art,
  site,
  navigation,
  artists,
  music,
  writing,
  projects
};
