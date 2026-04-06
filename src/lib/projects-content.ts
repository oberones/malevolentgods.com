import { getCollection } from 'astro:content';

export async function getProjects() {
  const entries = await getCollection('projects');

  return entries
    .map((entry) => ({
      ...entry.data,
      slug: entry.slug,
      href: `/projects/${entry.slug}`
    }))
    .sort((a, b) => {
      const featuredDelta = Number(b.featured ?? false) - Number(a.featured ?? false);
      if (featuredDelta !== 0) return featuredDelta;
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    });
}

export async function getFeaturedProjects(limit?: number) {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.featured);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) || null;
}
