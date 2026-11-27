# Packages — aoneahsan.com docs

Last Updated: 2026-11-27

Node 26.13.1 LTS (`.nvmrc`, `engines.node >=26.13.1`), Yarn 4.18.1 (`packageManager`), `node-modules` linker,
`npmMinimalAgeGate: 0`. Upgraded with `npx -y npm-check-updates -u`, latest stable. This file is excluded from the
published site (`docusaurus.config.ts` → docs `exclude`).

| Package | Range | Kind | Purpose |
|---|---|---|---|
| `@docusaurus/core`, `faster`, `plugin-content-docs`, `preset-classic`, `theme-common`, `theme-mermaid` | 3.10.2 | runtime | The site generator, Rspack build, docs, theme and Mermaid diagrams |
| `@docusaurus/plugin-client-redirects` | 3.10.2 | runtime | 301-equivalent pages for the retired `/tags/*` addresses (`plugins/seo-redirects.mts`, aoneahsan-portfolio-docs#1) |
| `@easyops-cn/docusaurus-search-local` | 0.55.3 | runtime | Offline search, no third-party service |
| `@mdx-js/react` | ^3.1.1 | runtime | MDX rendering |
| `prism-react-renderer` | ^2.4.1 | runtime | Code highlighting |
| `react` / `react-dom` | ^19.3.1 | runtime | The UI runtime |
| `@docusaurus/module-type-aliases`, `theme-classic`, `tsconfig`, `types` | 3.10.2 | dev | Types and the base tsconfig for `yarn typecheck` |
| `@types/node` | ^26.6.6 | dev | Node types for the config and the feed plugin |
| `@types/react` | ^19.3.0 | dev | React types |
| `typescript` | ~6.0.3 | dev | `yarn typecheck` (`tsc -b`) |

## Pins and workarounds

- `typescript ~6.0.3`: the fleet holds TypeScript 6 (ledger `~/.claude/rules-detail/package-version-known-issues.md`).
- `build` runs with `NODE_OPTIONS=--no-experimental-webstorage`: Docusaurus' SSG touches Node 26's disabled
  `localStorage` and prints an ExperimentalWarning. Upstream has no option; re-check on each Docusaurus minor and
  remove the flag when a build without it prints nothing.

## History

- 2026-11-27 — `@docusaurus/plugin-client-redirects` 3.10.2 added (same release as core) for the retired tag pages; `build` now ends with `yarn seo:contract`.
- 2026-11-16 — Node 26.13.1 LTS pass: `.nvmrc` created at 26.13.1, `engines.node` `>=22` → `>=26.13.1`,
  `@types/node` ^24.10.0 → ^26.6.6. Every other package was already on its latest stable.
