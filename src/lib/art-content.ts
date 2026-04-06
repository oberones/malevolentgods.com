import { getCollection } from 'astro:content';
import type { RichTextNode } from './rich-text';

export interface ArtGalleryItem {
  src: string;
  caption?: string;
}

export interface ArtProject {
  title: string;
  slug: string;
  summary: string;
  body: string | RichTextNode[];
  medium?: string;
  featured?: boolean;
  coverImage: string;
  href: string;
  gallery: ArtGalleryItem[];
}

function markdownBodyToNodes(body: string): RichTextNode[] {
  return body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => ({ type: 'paragraph' as const, text: chunk.replace(/\n+/g, ' ') }));
}

function mapArtEntry(entry: Awaited<ReturnType<typeof getCollection>>[number]): ArtProject {
  return {
    title: entry.data.title,
    slug: entry.slug,
    summary: entry.data.summary,
    body: markdownBodyToNodes(entry.body),
    medium: entry.data.medium,
    featured: entry.data.featured,
    coverImage: entry.data.coverImage,
    href: `/art/${entry.slug}`,
    gallery: entry.data.gallery || []
  };
}

export async function getArtProjects() {
  const entries = await getCollection('art');
  const projects = entries.map(mapArtEntry);

  return projects.sort((a, b) => {
    const featuredDelta = Number(b.featured ?? false) - Number(a.featured ?? false);
    if (featuredDelta !== 0) return featuredDelta;
    return a.title.localeCompare(b.title);
  });
}

export async function getFeaturedArtProjects(limit?: number) {
  const projects = await getArtProjects();
  const featured = projects.filter((item) => item.featured !== false);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

export async function getArtProjectBySlug(slug: string) {
  const projects = await getArtProjects();
  return projects.find((item) => item.slug === slug) || null;
}
