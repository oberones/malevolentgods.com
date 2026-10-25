import { getFeaturedArtists, getFeaturedMusic } from './music-content';
import { getFeaturedApps } from './apps-content';

export async function getHomepageContent() {
  const [featuredArtists, featuredMusic, featuredApps] = await Promise.all([
    getFeaturedArtists(3),
    getFeaturedMusic(3),
    getFeaturedApps(3)
  ]);

  return {
    featuredArtists,
    featuredMusic,
    featuredApps,
    spotlightRelease: featuredMusic[0] || null
  };
}
