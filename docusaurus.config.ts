import type {Config} from '@docusaurus/types';
import feedPlugin from './plugins/feed';
import {OTHER_PLATFORMS} from './src/data/platforms';
import {SEO_REDIRECTS} from './plugins/seo-redirects.mts';

const siteUrl = 'https://docs.aoneahsan.com';

const config: Config = {
  headTags: [
    {tagName: 'meta', attributes: {name: 'yandex-verification', content: 'bfb02722189028cf'}},
    // The publisher entity on every page (aoneahsan-portfolio-docs#1, owner 2026-11-27): the owner's Person under the
    // one @id every site of his uses, and the Zaions Organization, both from
    // projects-finalization-record/ecosystem/owner-profile.json. plugins/seo-contract.mts fails the build without it.
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': 'https://aoneahsan.com/#person',
            name: 'Ahsan Mahmood',
            alternateName: ['Ahsan', 'aoneahsan', 'a1ahsan', 'A1 Ahsan', 'AOne Ahsan'],
            url: 'https://aoneahsan.com',
            jobTitle: 'Founder and developer, Zaions',
            worksFor: {'@id': 'https://zaions.com/#organization'},
            sameAs: [
              'https://aoneahsan.com',
              'https://zaions.com',
              'https://github.com/aoneahsan',
              'https://www.linkedin.com/in/aoneahsan',
              'https://www.npmjs.com/~aoneahsan',
              'https://www.upwork.com/freelancers/aoneahsan',
              'https://orcid.org/0009-0006-2311-8687',
              'https://github.com/aoneahsan/aoneahsan-portfolio-docs',
              'https://play.google.com/store/apps/details?id=com.aoneahsan.app',
            ],
          },
          {
            '@type': 'Organization',
            '@id': 'https://zaions.com/#organization',
            name: 'Zaions',
            alternateName: ['Zaions products', 'Zaions projects'],
            url: 'https://zaions.com',
            logo: 'https://zaions.com/assets/logos/zaions-mark.png',
            founder: {'@id': 'https://aoneahsan.com/#person'},
            sameAs: ['https://zaions.com', 'https://github.com/aoneahsan'],
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            name: 'Ahsan Mahmood — portfolio guide',
            url: `${siteUrl}/`,
            inLanguage: 'en-GB',
            publisher: {'@id': 'https://aoneahsan.com/#person'},
            author: {'@id': 'https://aoneahsan.com/#person'},
          },
        ],
      }),
    },
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
    // Named by package and imported plugins, never require.resolve(): Docusaurus ships the site config to the
    // browser, and a resolved path would publish this machine's folders (plugins/feed.ts fails the build if it does).
    ['@easyops-cn/docusaurus-search-local', {
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
  plugins: [
    feedPlugin,
    // Retired tag pages lead to real pages; plugins/seo-contract.mts re-checks every one after the build.
    ['@docusaurus/plugin-client-redirects', {redirects: SEO_REDIRECTS.map(({to, from}) => ({to, from: [...from]}))}],
  ],
  presets: [
    ['classic', {
      docs: {
        routeBasePath: '/',
        sidebarPath: './sidebars.ts',
        // docs/PACKAGES.md and docs/search-consoles/ are fleet fixed-path records, never published pages.
        // `exclude` replaces the defaults, so they are restated.
        exclude: ['**/_*.{js,jsx,ts,tsx,md,mdx}', '**/_*/**', '**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**', 'PACKAGES.md', 'search-consoles/**'],
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
      },
      blog: false,
      sitemap: {lastmod: 'date', changefreq: null, priority: null, ignorePatterns: ['/search', '/search/', '/search/**', '/tags', '/tags/', '/tags/**']},
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
        {
          type: 'dropdown',
          label: 'Get Ahsan Mahmood',
          position: 'right',
          items: [
            ...OTHER_PLATFORMS.map((platform) => ({label: platform.name, href: platform.href})),
            {label: 'All places', to: '/apps/'},
          ],
        },
        {href: 'https://aoneahsan.com/projects', label: 'Projects', position: 'right'},
        {href: 'https://aoneahsan.com/contact', label: 'Contact', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {title: 'Get Ahsan Mahmood', items: [...OTHER_PLATFORMS.map((platform) => ({label: platform.name, href: platform.href})), {label: 'All places', to: '/apps/'}]},
        {title: 'Guide', items: [{label: 'Compare', to: '/compare'}, {label: 'Sitemap', to: '/sitemap'}, {label: 'Feed', to: '/feed'}]},
        {title: 'Ahsan Mahmood', items: [{label: 'Projects', href: 'https://aoneahsan.com/projects'}, {label: 'Contact', href: 'https://aoneahsan.com/contact'}]},
      ],
      copyright: 'Ahsan Mahmood',
    },
  },
};

export default config;
