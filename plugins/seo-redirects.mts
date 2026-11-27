/**
 * Redirects for addresses search engines still ask for, in one list the build-output contract re-checks
 * (`plugins/seo-contract.mts`).
 *
 * The guide used to generate a page per tag under `/tags/*`. Each one listed pages a reader already reaches from the
 * sidebar or `/sitemap/`, they carried `noindex`, and Search Console reported all seven as excluded (SA-P32,
 * aoneahsan-portfolio-docs#1, 2026-11-27). The tags are gone from the front matter, so no tag page is built, and
 * every old address leads to the page its label was about. Never a noindex page (owner, 2026-11-27).
 */

/** One redirect, in the shape `@docusaurus/plugin-client-redirects` takes. */
export interface Redirect {
  readonly to: string;
  readonly from: string[];
}

/** Every redirect the site owns. Targets are routes the docs build writes. */
export const SEO_REDIRECTS: readonly Redirect[] = [
  {to: '/sitemap/', from: ['/tags/', '/tags/navigation/']},
  {to: '/compare/', from: ['/tags/comparison/', '/tags/services/']},
  {to: '/', from: ['/tags/portfolio/', '/tags/work/']},
  {to: '/feed/', from: ['/tags/updates/']},
];
