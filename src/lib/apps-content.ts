import { getCollection } from 'astro:content';
import type { RichTextNode } from './rich-text';

function markdownBodyToNodes(body: string): RichTextNode[] {
  return body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => ({ type: 'paragraph' as const, text: chunk.replace(/\n+/g, ' ') }));
}

export async function getApps() {
  const entries = await getCollection('apps');

  return entries
    .map((entry) => ({
      ...entry.data,
      slug: entry.slug,
      body: markdownBodyToNodes(entry.body),
      href: entry.data.launchPath
    }))
    .sort((a, b) => {
      const featuredDelta = Number(b.featured ?? false) - Number(a.featured ?? false);
      if (featuredDelta !== 0) return featuredDelta;

      const sortOrderDelta = (a.sortOrder ?? 100) - (b.sortOrder ?? 100);
      if (sortOrderDelta !== 0) return sortOrderDelta;

      return a.title.localeCompare(b.title);
    });
}
