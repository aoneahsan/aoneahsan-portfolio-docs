# Portfolio docs guide

**Last Updated:** 2026-11-09

This public Docusaurus repository is the docs and comparison surface of the portfolio at `https://aoneahsan.com`. The app's approved Comparison Hub wording in `../aoneahsan-portfolio/src/i18n/locales/en.json` and its Story Bible govern the case pages. Verify facts and checked dates before revising them.

Source is on `main`; the static build is published manually to `gh-pages` on GitHub Pages. No GitHub Actions, Firebase hosting or force pushes. The intended custom domain is `docs.aoneahsan.com`; its DNS and GitHub Pages domain attachment must be verified live before claiming it serves traffic.

Use Node 26, Yarn 4, `yarn install --immutable`, `yarn typecheck` and warning-free `yarn build`. The site has local search and both light and dark themes. Keep all public pages, their descriptions, the sitemap, feed and `llms.txt` aligned. Do not commit secrets, `.env`, `node_modules`, `.docusaurus`, or `build/` to `main`. Root guidance and public source files live in their fixed paths. The owner works on `main` directly; other contributors use pull requests.
