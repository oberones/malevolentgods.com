import { getCollection } from 'astro:content';
import type { RichTextNode } from './rich-text';

function markdownBodyToNodes(body: string): RichTextNode[] {
  return body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => ({ type: 'paragraph' as const, text: chunk.replace(/\n+/g, ' ') }));
}

function sortFeaturedThenName<T extends { featured?: boolean; title?: string; name?: string }>(items: T[]) {
  return items.sort((a, b) => {
    const featuredDelta = Number(b.featured ?? false) - Number(a.featured ?? false);
    if (featuredDelta !== 0) return featuredDelta;
    return (a.title || a.name || '').localeCompare(b.title || b.name || '');
  });
}

export async function getMusicReleases() {
  const entries = await getCollection('music');

  return sortFeaturedThenName(
    entries.map((entry) => ({
      ...entry.data,
      slug: entry.slug,
      body: markdownBodyToNodes(entry.body),
      credits: (entry.data.credits || []).map((item) => ({ type: 'paragraph' as const, text: item })),
      href: `/music/${entry.slug}`
    }))
  );
}

export async function getFeaturedMusic(limit?: number) {
  const releases = await getMusicReleases();
  const featured = releases.filter((item) => item.featured !== false);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

export async function getMusicReleaseBySlug(slug: string) {
  const releases = await getMusicReleases();
  return releases.find((item) => item.slug === slug) || null;
}

export async function getArtists() {
  const entries = await getCollection('artists');

  return sortFeaturedThenName(
    entries.map((entry) => ({
      ...entry.data,
      slug: entry.slug,
      bio: markdownBodyToNodes(entry.body),
      href: `/artists/${entry.slug}`
    }))
  );
}

export async function getFeaturedArtists(limit?: number) {
  const artists = await getArtists();
  const featured = artists.filter((item) => item.featured !== false);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

export async function getArtistBySlug(slug: string) {
  const artists = await getArtists();
  return artists.find((item) => item.slug === slug) || null;
}

export async function getReleasesForArtist(slug: string) {
  const releases = await getMusicReleases();
  return releases.filter((item) => item.artistSlugs?.includes(slug));
}
