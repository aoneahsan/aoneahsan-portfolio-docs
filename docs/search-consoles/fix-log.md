# Search-console fix log: docs.aoneahsan.com

Newest first. One section per filed issue or verified defect. `live-verified` is ours; `indexed` belongs to Google. Not published:
`docusaurus.config.ts` excludes `search-consoles/**`. Procedure: skill `aoneahsan-cccs-search-issue-remediation`.

## Ecosystem and developer pages published · 2026-11-28 · `main@3762417`, `gh-pages@810c9db`

The approved English ecosystem collection, 23 product details and developer page are live. `yarn typecheck`
and `yarn build` passed; the post-build SEO contract checked 44 pages, 35 sitemap URLs and seven redirects.
The live `/ecosystem/` initial HTML matches the local build SHA-256
`fb68a463cc92e7a5aeb0c21979d4ab455520b2e78d0e39ee96036b68d5c8ccde`.
Chrome for Testing rendered the local and live home at 1440 and `/ecosystem/` at 390 with visible content and
no uncaught errors. The new URLs have not been observed in Search Console, Bing or Yandex; the portfolio
root's `SEARCH-ENGINE-DESKTOP-HANDOFF.md` names those checks. This publication does not close issue #1.

The 2026-11-28 live sitemap crawl probe read all 35 docs URLs at no more than one request per 300 ms. All 35 returned HTTP 200 with a matching self-canonical, a nonempty title and exactly one H1. The first probe's quoted-attribute-only canonical parser misread Docusaurus's valid unquoted `rel=canonical href=...` tags; the corrected parser rechecked all 35 and found no failure. This is HTTP/HTML evidence, not an indexing observation.

## Duplicate home and comparison descriptions · 2026-11-27 · `main@9068620`, `gh-pages@0f632dd`

The ten indexable docs sitemap pages had one duplicated meta description: `/` and `/compare/` used the same
introductory text. The `/compare/` description now uses the approved `compare.html` dummy's own wording,
while the home description stays as it was. `plugins/seo-contract.mts` checks title and description
uniqueness across sitemap URLs; `yarn seo:contract` failed on the duplicate before the edit and passed
afterwards. `yarn typecheck` and `yarn build` passed. The deployed `/compare/` HTML hash
`60e508ea902f35c16d4e1074336b72e789e8e2c90f59618512cdda936b52f46e` matched the local build;
Chrome rendered it at 1440 and 390 with no uncaught errors or horizontal overflow. IndexNow accepted the
changed URL (HTTP 200). Console index state remains unobserved.

## aoneahsan-portfolio-docs#1: [SEO][URGENT][PENDING] URL-level indexing + AEO fix list (audit 2026-11-27) · 2026-11-27 · commit `02864e7`

Status: **live-verified for code and HTTP behaviour**. `main` commit `02864e7` built and published on
`gh-pages` as `09776a3`. The live `/compare/agency/` HTML has the same SHA-256 as the local build:
`ebcc7a2c1ff0fdffe19e09804374e649fc8fa83ea213a87423250752747fbe55`.
IndexNow accepted the deployed docs sitemap (HTTP 200). Google indexing remains pending the signed-in desktop
handoff in the portfolio root's `SEARCH-ENGINE-DESKTOP-HANDOFF.md`.

Hosting: GitHub Pages, `trailingSlash: true` (every page is `<route>/index.html`, so `/x` 301s to `/x/`).

| Box | SA | What was wrong (evidence, live 2026-11-27) | Root fix (file:line) | Contract test | Live proof |
|---|---|---|---|---|---|
| 1. Feeds / sitemap in "crawled - not indexed" | SA-P33 | `feed.xml`, `sitemap.xml` (expected for machine files). There are no `.md` mirrors on this host. The feed linked every page slashless, a 301 hop each. | Feed links in the slashed form: `plugins/feed.ts:21-29`, `plugins/feed.ts:52`. Machine files are left crawlable and unindexed. | `plugins/seo-contract.mts` (feed and `llms.txt` URLs slashed) | live-verified 2026-11-27 (R1) |
| 2. `/apps/` "discovered - not indexed" | SA-P32 | Linked only as "All places" (navbar, footer, home) and missing from the human sitemap. | Two descriptive in-content links: `docs/index.md:9` ("every place my work is published"), `docs/sitemap.md:11`. | sitemap test (served, canonical) | **google-pending** |
| 3. AEO: no Person/Organization publisher entity | SA-P20, P30 | No JSON-LD entity on any page (`curl -s https://docs.aoneahsan.com/ \| grep -c 'aoneahsan.com/#person'` → 0). | One `@graph` on every page: Person `https://aoneahsan.com/#person`, Organization `https://zaions.com/#organization`, WebSite with `publisher` and `author` → the Person. From `projects-finalization-record/ecosystem/owner-profile.json`. `docusaurus.config.ts:13-61`. | "no Person … publisher entity" / "no Organization" per page | live-verified 2026-11-27 (R2) |
| 4. AEO: no `sameAs` | SA-P20 | As box 3. | The Person carries the owner-profile `sameAs` list (aoneahsan.com, zaions.com, GitHub, LinkedIn, npm, Upwork, ORCID) plus this site's repository and the portfolio app's Play listing: `docusaurus.config.ts:28-38`. | "the Person has no full sameAs list" | live-verified 2026-11-27 (R2) |
| Excluded by noindex (7 `/tags/*`) | SA-P28, P32 | `src/theme/DocTagDocListPage` and `src/theme/DocTagsListPage` set `noindex, follow` on seven boilerplate tag pages. | Tags removed from all front matter (`docs/**/*.md`), both noindex overrides deleted, and each old tag URL now leads to the page its label was about: `plugins/seo-redirects.mts:18-23` via `@docusaurus/plugin-client-redirects` (`docusaurus.config.ts:92-96`). Sitemap ignores `/tags` and `/search` in both slash forms (`docusaurus.config.ts:109`). | "a tag page was built" (fails unless it is a redirect page); "redirect … was not written" | live-verified 2026-11-27 (R3) |

Also in this pass (owner decision 2026-11-27, mirroring aoneahsan.com `/compare`): each of the five
`docs/compare/<case>.md` pages gains **What it costs** (US Bureau of Labor Statistics May 2025 wages for in-house and
inexperienced developer, as a `nofollow` link checked 2026-11-27; dated provider prices and fees from Clutch, Bolt, Lovable, Replit and Freelancer.com for the other three) and a
**Who should pick which** table, in the app catalogue's words.

Also in this pass: `static/robots.txt` names every search, user-fetch and AI crawler with `Allow: /` (owner policy
2026-10-27; the host has no private route) and lists both sitemaps.

Overruled by owner law: none of the boxes asked for a `noindex`; the seven tag pages that carried one no longer exist as
pages. GitHub Pages cannot send a server 301 for a path that once held a page, so the old tag URLs answer the plugin's
redirect page (meta refresh plus `rel=canonical` to the target), the fleet's Docusaurus pattern.

### Contract

`yarn build` ends with `yarn seo:contract` (`plugins/seo-contract.mts`, a separate step because `postBuild` hooks run
concurrently): `trailingSlash: true` and `onBrokenLinks: 'throw'`; every page `<route>/index.html` with one title, one
description, one slashed self-canonical, no `noindex` (except `404.html` and the search shell), parseable JSON-LD, the
Person and Organization entities, no SearchAction; sitemap URLs slashed, served, never a redirect, tag or search page;
every redirect written and landing on a page; feed and `llms.txt` slashed. Watched failing on the previous build
(75 problems: no publisher entity on any page), and on a planted `noindex` (1 problem), then passing:
`seo-contract: 19 pages, 10 sitemap URLs, 7 redirects pass`.

Gates (2026-11-27, re-run after the sourced compare pages): `yarn typecheck` pass · `yarn build` pass, no warnings · contract pass (19 pages, 10 sitemap URLs, 7 redirects).

### Remaining search-engine evidence

The desktop handoff asks the owner's logged-in session to inspect `/apps/` in Google Search Console, Bing and
Yandex and return dated property, canonical and index-state evidence. The code and hosting checks below do not
prove that a search engine indexed the page.

### Live verification (2026-11-27)

- R1: feed links use slash canonical URLs; `feed.xml` and `sitemap.xml` remain crawlable machine files.
- R2: the Person and Organization graph, including `sameAs`, appears in the initial HTML of all ten sitemap
  URLs; the live `/compare/agency/` page renders at 1440 and 390 without horizontal overflow.
- R3: all seven old tag URLs serve redirect pages with destinations; no tag URL appears in the sitemap.
  The live sitemap's ten pages have no `noindex`.
- The source and published HTML match byte for byte on `/compare/agency/`.

### Retest

```bash
D=https://docs.aoneahsan.com
# R1 feed links slashed
curl -s $D/feed.xml | grep -o '<link>[^<]*' | grep -vc '/$'            # 0
# R2 publisher entity in the initial HTML of every sitemap URL
for u in $(curl -s $D/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//'); do printf '%s ' "$u"; curl -s "$u" | grep -c '"@id":"https://aoneahsan.com/#person"'; sleep 0.3; done   # 1 each
# R3 old tag URLs lead to real pages, no noindex anywhere
for t in '' comparison navigation portfolio services updates work; do printf '/tags/%s ' "$t"; curl -s "$D/tags/$t/" | grep -o 'url=[^"]*'; done
curl -s $D/sitemap.xml | grep -c '/tags/'                               # 0
for u in $(curl -s $D/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//'); do curl -s "$u" | grep -c 'noindex'; done | sort | uniq -c   # all 0
```
