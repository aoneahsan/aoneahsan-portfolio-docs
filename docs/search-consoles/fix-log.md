# Search-console fix log: docs.aoneahsan.com

Newest first. One section per filed issue. `live-verified` is ours; `indexed` belongs to Google. Not published:
`docusaurus.config.ts` excludes `search-consoles/**`. Procedure: skill `aoneahsan-cccs-search-issue-remediation`.

## aoneahsan-portfolio-docs#1: [SEO][URGENT][PENDING] URL-level indexing + AEO fix list (audit 2026-11-27) · 2026-11-27 · commit `<pending>`

Status: **partly done**: fixed, built and contract-checked locally; not yet published to `gh-pages` (the fix session
may not deploy).

Hosting: GitHub Pages, `trailingSlash: true` (every page is `<route>/index.html`, so `/x` 301s to `/x/`).

| Box | SA | What was wrong (evidence, live 2026-11-27) | Root fix (file:line) | Contract test | Live proof |
|---|---|---|---|---|---|
| 1. Feeds / sitemap in "crawled - not indexed" | SA-P33 | `feed.xml`, `sitemap.xml` (expected for machine files). There are no `.md` mirrors on this host. The feed linked every page slashless, a 301 hop each. | Feed links in the slashed form: `plugins/feed.ts:21-29`, `plugins/feed.ts:52`. Machine files are left crawlable and unindexed. | `plugins/seo-contract.mts` (feed and `llms.txt` URLs slashed) | pending deploy (R1) |
| 2. `/apps/` "discovered - not indexed" | SA-P32 | Linked only as "All places" (navbar, footer, home) and missing from the human sitemap. | Two descriptive in-content links: `docs/index.md:9` ("every place my work is published"), `docs/sitemap.md:11`. | sitemap test (served, canonical) | **google-pending** |
| 3. AEO: no Person/Organization publisher entity | SA-P20, P30 | No JSON-LD entity on any page (`curl -s https://docs.aoneahsan.com/ \| grep -c 'aoneahsan.com/#person'` → 0). | One `@graph` on every page: Person `https://aoneahsan.com/#person`, Organization `https://zaions.com/#organization`, WebSite with `publisher` and `author` → the Person. From `projects-finalization-record/ecosystem/owner-profile.json`. `docusaurus.config.ts:13-61`. | "no Person … publisher entity" / "no Organization" per page | pending deploy (R2) |
| 4. AEO: no `sameAs` | SA-P20 | As box 3. | The Person carries the owner-profile `sameAs` list (aoneahsan.com, zaions.com, GitHub, LinkedIn, npm, Upwork, ORCID) plus this site's repository and the portfolio app's Play listing: `docusaurus.config.ts:28-38`. | "the Person has no full sameAs list" | pending deploy (R2) |
| Excluded by noindex (7 `/tags/*`) | SA-P28, P32 | `src/theme/DocTagDocListPage` and `src/theme/DocTagsListPage` set `noindex, follow` on seven boilerplate tag pages. | Tags removed from all front matter (`docs/**/*.md`), both noindex overrides deleted, and each old tag URL now leads to the page its label was about: `plugins/seo-redirects.mts:18-23` via `@docusaurus/plugin-client-redirects` (`docusaurus.config.ts:92-96`). Sitemap ignores `/tags` and `/search` in both slash forms (`docusaurus.config.ts:109`). | "a tag page was built" (fails unless it is a redirect page); "redirect … was not written" | pending deploy (R3) |

Also in this pass (owner decision 2026-11-27, mirroring aoneahsan.com `/compare`): each of the five
`docs/compare/<case>.md` pages gains **What it costs** (US Bureau of Labor Statistics May 2025 wages for in-house and
inexperienced developer, as a `nofollow` link checked 2026-11-27; a plain note of no figure for the other three) and a
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

Gates (2026-11-27, re-run after the compare pages): `yarn typecheck` pass · `yarn build` pass, no warnings · contract pass (19 pages, 10 sitemap URLs, 7 redirects).

### Pending

| Box | Why not done | Who | Next action |
|---|---|---|---|
| Publish | The fix session may not deploy. | main session | Publish `build/` to `gh-pages` (`git fetch o gh-pages:refs/remotes/o/gh-pages` first, worktree in the workspace `temp/`), then Retest R1-R3 with cache off, then IndexNow. |
| Box 2 | Google decides. | Google / daily audit | Request indexing for `/apps/` after the deploy. |
| Box 4 cross-check | The portfolio app's home `Person` has no `@id` yet (it is deep-equal to its click dummy). | agent with the dummy in scope | See the app repo's fix-log Pending row. |

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
