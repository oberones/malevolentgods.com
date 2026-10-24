import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const art = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/art' }),
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
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/site' }),
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
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/navigation' }),
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
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/artists' }),
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
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/music' }),
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
      provider: z.enum(['Bandcamp', 'Spotify', 'SoundCloud', 'MixCloud', 'YouTube', 'Other']).optional(),
      title: z.string().optional(),
      url: z.string(),
      aspectRatio: z.string().optional()
    }).optional()
  })
});

const writing = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/writing' }),
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

const apps = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/apps' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    featured: z.boolean().default(false),
    sortOrder: z.number().default(100),
    status: z.enum(['live', 'beta', 'planned']).default('live'),
    appType: z.string(),
    launchPath: z.string(),
    tags: z.array(z.string()).default([])
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
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
  apps,
  projects
};
