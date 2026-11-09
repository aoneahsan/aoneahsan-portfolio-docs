import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import type {Plugin} from '@docusaurus/types';

const siteUrl = 'https://docs.aoneahsan.com';
const pages = [
  ['compare/index.md', '/compare'],
  ['compare/agency.md', '/compare/agency'],
  ['compare/inexperienced-developer.md', '/compare/inexperienced-developer'],
  ['compare/vibe-coder.md', '/compare/vibe-coder'],
  ['compare/freelancer-marketplace.md', '/compare/freelancer-marketplace'],
  ['compare/in-house.md', '/compare/in-house'],
] as const;

function escapeXml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

export default function feedPlugin(): Plugin {
  return {
    name: 'portfolio-comparison-feed',
    async postBuild({outDir}) {
      const items = await Promise.all(pages.map(async ([filename, permalink]) => {
        const source = await readFile(path.join(process.cwd(), 'docs', filename), 'utf8');
        const title = source.match(/^title: "([^"]+)"/m)?.[1];
        const description = source.match(/^description: "([^"]+)"/m)?.[1];
        const checked = source.match(/^Last checked (\d{1,2} [A-Za-z]+ \d{4})$/m)?.[1];
        if (!title || !description || !checked) throw new Error(`Incomplete feed metadata: ${filename}`);
        const date = new Date(`${checked} 00:00:00 GMT`);
        if (Number.isNaN(date.valueOf())) throw new Error(`Invalid feed date: ${filename}`);
        const url = `${siteUrl}${permalink}`;
        return `<item><title>${escapeXml(title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(description)}</description><pubDate>${date.toUTCString()}</pubDate><category>Comparison</category></item>`;
      }));
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Ahsan Mahmood — comparison guide</title><link>${siteUrl}/compare</link><description>Five routes to building software, checked against Ahsan Mahmood's work.</description><atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>${items.join('')}</channel></rss>`;
      await writeFile(path.join(outDir, 'feed.xml'), xml);
    },
  };
}
