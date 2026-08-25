export const site = {
  name: 'Malevolent Gods',
  title: 'Malevolent Gods',
  description:
    'Art, music, writing, games, and other signals from an Atlanta collective operating slightly outside consensus reality.',
  footerText: '© 2026 Malevolent Gods. All rights to your mother reserved.',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Art', href: '/art' },
    { label: 'Music', href: '/music' },
    { label: 'Writing', href: '/writing' },
    { label: 'Projects', href: '/projects' },
    { label: 'Apps', href: '/apps' }
  ],
  homepageHero: {
    eyebrow: 'Malevolent Gods',
    title: 'Art, music, writing, and software from slightly outside consensus reality.',
    summary:
      'Malevolent Gods makes records, images, games, tools, and whatever refuses to fit the category.',
    primaryCtaLabel: 'Hear the music',
    primaryCtaHref: '/music',
    secondaryCtaLabel: 'See the art',
    secondaryCtaHref: '/art'
  },
  social: []
};

export type SiteConfig = typeof site;
