import { getFeaturedArtists, getFeaturedMusic } from './music-content';

export async function getHomepageContent() {
  const [featuredArtists, featuredMusic] = await Promise.all([
    getFeaturedArtists(3),
    getFeaturedMusic(3)
  ]);

  return {
    featuredArtists,
    featuredMusic,
    spotlightRelease: featuredMusic[0] || null
  };
}
