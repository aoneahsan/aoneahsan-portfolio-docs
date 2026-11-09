import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  guide: [
    'index',
    {
      type: 'category',
      label: 'Compare the ways to build',
      link: {type: 'doc', id: 'compare/index'},
      items: [
        'compare/agency',
        'compare/inexperienced-developer',
        'compare/vibe-coder',
        'compare/freelancer-marketplace',
        'compare/in-house',
      ],
    },
    'sitemap',
    'feed',
  ],
};

export default sidebars;
