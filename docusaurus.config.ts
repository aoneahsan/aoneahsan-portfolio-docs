import type {Config} from '@docusaurus/types';

const siteUrl = 'https://docs.aoneahsan.com';

const config: Config = {
  headTags: [
    {tagName: 'meta', attributes: {name: 'yandex-verification', content: 'bfb02722189028cf'}},
  ],
  title: 'Ahsan Mahmood',
  tagline: 'Full-stack developer. I finish things, and finished means it runs without me.',
  favicon: 'img/favicon.ico',
  url: siteUrl,
  baseUrl: '/',
  organizationName: 'aoneahsan',
  projectName: 'aoneahsan-portfolio-docs',
  trailingSlash: true,
  future: {v4: true, faster: true},
  onBrokenLinks: 'throw',
  markdown: {mermaid: true, format: 'detect', hooks: {onBrokenMarkdownLinks: 'throw'}},
  i18n: {defaultLocale: 'en', locales: ['en'], localeConfigs: {en: {htmlLang: 'en-GB'}}},
  themes: [
    '@docusaurus/theme-mermaid',
    [require.resolve('@easyops-cn/docusaurus-search-local'), {
      hashed: true,
      indexDocs: true,
      indexBlog: false,
      indexPages: true,
      docsRouteBasePath: '/',
      language: ['en'],
      highlightSearchTermsOnTargetPage: true,
      searchResultLimits: 12,
      searchResultContextMaxLength: 60,
      explicitSearchResultPath: true,
    }],
  ],
  plugins: [require.resolve('./plugins/feed')],
  presets: [
    ['classic', {
      docs: {routeBasePath: '/', sidebarPath: './sidebars.ts', showLastUpdateTime: true, showLastUpdateAuthor: true},
      blog: false,
      sitemap: {lastmod: 'date', changefreq: null, priority: null, ignorePatterns: ['**/search/**', '**/tags/**']},
      theme: {customCss: './src/css/custom.css'},
    }],
  ],
  themeConfig: {
    image: 'img/og.png',
    colorMode: {defaultMode: 'dark', disableSwitch: false, respectPrefersColorScheme: true},
    navbar: {
      title: '',
      logo: {alt: 'Ahsan Mahmood', src: 'img/logo-horizontal.svg', srcDark: 'img/logo-horizontal-reversed.svg'},
      items: [
        {to: '/compare', label: 'Compare', position: 'left'},
        {href: 'https://aoneahsan.com/projects', label: 'Projects', position: 'right'},
        {href: 'https://aoneahsan.com/contact', label: 'Contact', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {title: 'Guide', items: [{label: 'Compare', to: '/compare'}, {label: 'Sitemap', to: '/sitemap'}, {label: 'Feed', to: '/feed'}]},
        {title: 'Ahsan Mahmood', items: [{label: 'Projects', href: 'https://aoneahsan.com/projects'}, {label: 'Contact', href: 'https://aoneahsan.com/contact'}]},
      ],
      copyright: 'Ahsan Mahmood',
    },
  },
};

export default config;
