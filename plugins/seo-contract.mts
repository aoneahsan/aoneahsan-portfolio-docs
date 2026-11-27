/**
 * The build-output SEO contract for docs.aoneahsan.com (SA-P24, P26, P29, P30, P31, P32): the build fails instead of
 * a search console finding it a month later. `yarn build` runs it last (`yarn seo:contract`), on the files GitHub
 * Pages will serve. A separate step, because Docusaurus runs plugins' `postBuild` hooks concurrently and the redirect
 * pages may not exist yet inside one. `.mts`, so Node runs it as a module with no package.json in plugins/.
 *
 * - `trailingSlash: true` and `onBrokenLinks: 'throw'` in the config; every page is `<route>/index.html`, so GitHub
 *   Pages 301s `/x` to `/x/` and never 404s the slashed form (SA-P26).
 * - Every page: one `<title>`, one description, one self-canonical in the slashed form, no `noindex` except the 404
 *   page and the search-results shell; every JSON-LD block parses; the publisher graph names the owner's Person
 *   `https://aoneahsan.com/#person` with `sameAs`, and the Zaions Organization (aoneahsan-portfolio-docs#1 boxes 3, 4).
 * - Every `sitemap.xml` URL is slashed, served, and no redirect or search page.
 * - No `/tags/` page is built except the redirects that replace them, and every redirect lands on a served page (SA-P31, P32).
 * - The feed and `llms.txt` link the slashed form.
 */
import {existsSync, readdirSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {SEO_REDIRECTS} from './seo-redirects.mts';

const SITE_URL = 'https://docs.aoneahsan.com';
const PERSON_ID = 'https://aoneahsan.com/#person';
const ORG_ID = 'https://zaions.com/#organization';
const PAGE_EXCEPTIONS = new Set(['404.html', 'search/index.html']);

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = path.join(siteDir, 'build');

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [path.relative(buildDir, full).split(path.sep).join('/')] : [];
  });
}

const count = (html: string, pattern: RegExp): number => html.match(pattern)?.length ?? 0;
const isRedirectPage = (html: string): boolean => /http-equiv=["']?refresh/i.test(html);
const routeOf = (file: string): string => `/${file.replace(/index\.html$/, '')}`;
const served = (route: string): string => path.join(buildDir, route.replace(/^\/|\/$/g, ''), 'index.html');

/**
 * Checks one built page against the contract.
 *
 * @param html - the page's HTML
 * @param file - its path relative to `build/`
 * @returns the problems found, empty when the page passes
 */
export function pageProblems(html: string, file: string): string[] {
  if (PAGE_EXCEPTIONS.has(file) || isRedirectPage(html)) return [];
  const problems: string[] = [];
  const titles = count(html, /<title[\s>]/g);
  const descriptions = count(html, /<meta[^>]+name=["']?description["']?[\s>/]/g);
  const canonicals = [...html.matchAll(/<link[^>]+rel=["']?canonical["']?[^>]*>/g)];
  if (titles !== 1) problems.push(`${titles} <title> tags`);
  if (descriptions !== 1) problems.push(`${descriptions} meta descriptions`);
  if (canonicals.length !== 1) problems.push(`${canonicals.length} canonicals`);
  const href = /href=["']?([^"'\s>]+)/.exec(canonicals[0]?.[0] ?? '')?.[1] ?? '';
  if (canonicals.length === 1 && href !== `${SITE_URL}${routeOf(file)}`) problems.push(`canonical ${href} is not this page's slashed URL`);
  if (/<meta[^>]+(name|property)=["']?robots["']?[^>]+noindex/i.test(html)) problems.push('noindex on a public page');
  if (file.startsWith('tags/')) problems.push('a tag page was built; tags are retired (SA-P32)');
  const graphs: unknown[] = [];
  for (const [, json] of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      graphs.push(JSON.parse(json ?? ''));
    } catch {
      problems.push('a JSON-LD block does not parse');
    }
  }
  const nodes = graphs.flatMap((g) => ((g as {'@graph'?: unknown[]})['@graph'] ?? [g]) as Record<string, unknown>[]);
  const person = nodes.find((n) => n['@id'] === PERSON_ID && n['@type'] === 'Person');
  const sameAs = (person?.sameAs ?? []) as string[];
  if (!person) problems.push(`no Person ${PERSON_ID} publisher entity`);
  else if (!sameAs.includes('https://github.com/aoneahsan') || !sameAs.includes('https://orcid.org/0009-0006-2311-8687')) problems.push('the Person has no full sameAs list');
  if (!nodes.some((n) => n['@id'] === ORG_ID && n['@type'] === 'Organization')) problems.push(`no Organization ${ORG_ID}`);
  if (JSON.stringify(graphs).includes('SearchAction')) problems.push('a SearchAction (no search URL is promised)');
  return problems.map((problem) => `${file}: ${problem}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const problems: string[] = [];
  const config = readFileSync(path.join(siteDir, 'docusaurus.config.ts'), 'utf8');
  if (!/^\s*trailingSlash: true,/m.test(config)) problems.push('trailingSlash must be true: GitHub Pages 404s the slashed form otherwise');
  if (!/^\s*onBrokenLinks: 'throw',/m.test(config)) problems.push("onBrokenLinks must be 'throw'");
  const files = htmlFiles(buildDir);
  for (const file of files) {
    if (!file.endsWith('index.html') && !PAGE_EXCEPTIONS.has(file)) problems.push(`${file}: a page outside <route>/index.html is a 404 for its slashed address`);
    problems.push(...pageProblems(readFileSync(path.join(buildDir, file), 'utf8'), file));
  }
  const redirectSources = new Set(SEO_REDIRECTS.flatMap((r) => r.from));
  const sitemap = [...readFileSync(path.join(buildDir, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] ?? '');
  if (sitemap.length < 5) problems.push(`sitemap.xml lists ${sitemap.length} URLs; the contract would pass vacuously`);
  for (const loc of sitemap) {
    if (!loc.startsWith(`${SITE_URL}/`)) problems.push(`sitemap: ${loc} is on another host`);
    if (!loc.endsWith('/')) problems.push(`sitemap: ${loc} is not in the slashed form`);
    const route = loc.slice(SITE_URL.length);
    if (!existsSync(served(route))) problems.push(`sitemap: ${loc} has no page in the output`);
    if (redirectSources.has(route) || route.startsWith('/search') || route.startsWith('/tags')) problems.push(`sitemap: ${loc} is not an indexable page`);
  }
  for (const {to, from} of SEO_REDIRECTS) {
    if (!existsSync(served(to)) || isRedirectPage(readFileSync(served(to), 'utf8'))) problems.push(`redirect target ${to} has no page`);
    for (const source of from) {
      if (!existsSync(served(source)) || !isRedirectPage(readFileSync(served(source), 'utf8'))) problems.push(`redirect ${source} → ${to} was not written`);
    }
  }
  for (const machine of ['feed.xml', 'llms.txt']) {
    const text = readFileSync(path.join(buildDir, machine), 'utf8');
    for (const [, url = ''] of text.matchAll(/(https:\/\/docs\.aoneahsan\.com\/[^\s<)"]*)/g)) {
      if (!url.endsWith('/') && !/\.[a-z]+$/.test(url)) problems.push(`${machine}: ${url} is not in the slashed form`);
    }
  }
  if (problems.length > 0) {
    process.stderr.write(`seo-contract: ${problems.length} problem(s)\n${problems.slice(0, 60).join('\n')}\n`);
    process.exit(1);
  }
  process.stdout.write(`seo-contract: ${files.length} pages, ${sitemap.length} sitemap URLs, ${redirectSources.size} redirects pass\n`);
}
