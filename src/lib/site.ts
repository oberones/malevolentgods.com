export const site = {
  name: 'Malevolent Gods',
  title: 'Malevolent Gods',
  description:
    'A collective of artists, musicians, writers, and makers building strange and beautiful things.',
  footerText: '© 2026 Malevolent Gods.',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Art', href: '/art' },
    { label: 'Music', href: '/music' },
    { label: 'Writing', href: '/writing' },
    { label: 'Projects', href: '/projects' }
  ],
  homepageHero: {
    eyebrow: 'Malevolent Gods',
    title: 'Art, music, writing, and software from a collective that likes it a little haunted.',
    summary:
      'A home for the collective’s music, art, writing, and experimental software, with room for releases, galleries, notes, and other strange things to live together.',
    primaryCtaLabel: 'Explore music',
    primaryCtaHref: '/music',
    secondaryCtaLabel: 'View art',
    secondaryCtaHref: '/art'
  },
  social: []
};

export type SiteConfig = typeof site;
