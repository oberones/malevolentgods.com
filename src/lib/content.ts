import { getEntry } from 'astro:content';
import { site as fallbackSite } from './site';

export async function getSiteSettings() {
  const entry = await getEntry('site', 'settings');
  return entry?.data || null;
}

export async function getNavigation() {
  const entry = await getEntry('navigation', 'main');
  return entry?.data || null;
}

export async function getGlobalSiteData() {
  const [settings, navigation] = await Promise.all([getSiteSettings(), getNavigation()]);

  return {
    settings,
    navigation,
    fallbackSite
  };
}
