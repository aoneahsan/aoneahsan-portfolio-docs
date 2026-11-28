import type {Config} from '@docusaurus/types';
import feedPlugin from './plugins/feed';
import {OTHER_PLATFORMS} from './src/data/platforms';
import {SEO_REDIRECTS} from './plugins/seo-redirects.mts';
import ownerProfile from './src/data/owner-profile.json';

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
            name: ownerProfile.person.name,
            alternateName: ownerProfile.person.alternateName,
            url: ownerProfile.person.url,
            jobTitle: ownerProfile.person.jobTitle,
            worksFor: {'@id': 'https://zaions.com/#organization'},
            sameAs: ownerProfile.person.sameAs,
          },
          {
            '@type': 'Organization',
            '@id': 'https://zaions.com/#organization',
            name: ownerProfile.organization.name,
            alternateName: ownerProfile.organization.alternateName,
            url: ownerProfile.organization.url,
            logo: ownerProfile.organization.logo,
            founder: {'@id': 'https://aoneahsan.com/#person'},
            sameAs: ownerProfile.organization.sameAs,
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
        {to: '/ecosystem/', label: 'Zaions products', position: 'left'},
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
        {title: 'Guide', items: [{label: 'Compare', to: '/compare'}, {label: 'Zaions products', to: '/ecosystem/'}, {label: 'Sitemap', to: '/sitemap'}, {label: 'Feed', to: '/feed'}]},
        {title: 'Ahsan Mahmood', items: [{label: 'About the developer', to: '/about-developer/'}, {label: 'Projects', href: 'https://aoneahsan.com/projects'}, {label: 'Contact', href: 'https://aoneahsan.com/contact'}]},
      ],
      copyright: 'Ahsan Mahmood — developed with love by the Zaions team',
    },
  },
};

export default config;
