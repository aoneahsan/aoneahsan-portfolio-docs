# Portfolio docs guide

**Last Updated:** 2026-11-28

<!-- fleet:node-26-13-1 v1 --> Node 26.13.1 LTS (.nvmrc), packages latest — 2026-11-16

This public Docusaurus repository is the docs and comparison surface of the portfolio at `https://aoneahsan.com`. The app's approved Comparison Hub wording in `../aoneahsan-portfolio/src/i18n/locales/en.json` and its Story Bible govern the case pages. Verify facts and checked dates before revising them.

Source is on `main`; the static build is published manually to `gh-pages` on GitHub Pages. No GitHub Actions, Firebase hosting or force pushes. `docs.aoneahsan.com` has verified DNS, HTTPS and live pages; verify the published output again after each deployment.

Use Node 26.13.1 LTS (`.nvmrc`), Yarn 4, `yarn install --immutable`, `yarn typecheck` and warning-free `yarn build`. The site has local search and both light and dark themes. Keep all public pages, their descriptions, the sitemap, feed and `llms.txt` aligned. Do not commit secrets, `.env`, `node_modules`, `.docusaurus`, or `build/` to `main`. Root guidance and public source files live in their fixed paths. The owner works on `main` directly; other contributors use pull requests.

## Context optimization record

| Field | Value |
|---|---|
| Last optimized | 2026-11-28 |
| Next routine optimization eligible | 2026-12-28 |
| Guide bytes | 1,643 B |
| Covered subtree | This docs repository; the app and parent kit have separate stamps |
| Method | Verified the guide pair, current live domain and bounded startup routing |
| Fleet record | `/home/ahsan/Documents/01-code/docs/tracking/project-context-budget-tracker.json` |
