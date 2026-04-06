import { getCollection } from 'astro:content';

export async function getWritingEntries() {
  const entries = await getCollection('writing');

  return entries
    .filter((entry) => entry.data.status === 'published')
    .map((entry) => ({
      ...entry.data,
      slug: entry.slug,
      href: `/writing/${entry.slug}`
    }))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export async function getFeaturedWriting(limit?: number) {
  const entries = await getWritingEntries();
  const featured = entries.filter((entry) => entry.featured);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

export async function getWritingEntryBySlug(slug: string) {
  const entries = await getWritingEntries();
  return entries.find((entry) => entry.slug === slug) || null;
}
