# Ahsan Mahmood's portfolio guide

The source for the public guide at [docs.aoneahsan.com](https://docs.aoneahsan.com). It compares five ways to build software and links to the dated work behind Ahsan Mahmood's own approach.

## Local build

Use Node 26, Yarn 4 and `yarn install --immutable`. Run `yarn typecheck` and `yarn build`; `yarn serve` previews the exact static output on port 5994.

## Publishing

The `main` branch holds source. The generated `build/` tree is published manually to `gh-pages` with a normal fast-forward push. GitHub Actions are disabled. The parent portfolio is [aoneahsan.com](https://aoneahsan.com).

## Contributing and support

Open a [GitHub issue](https://github.com/aoneahsan/aoneahsan-portfolio-docs/issues) for an error or suggestion. Read [CONTRIBUTING.md](./CONTRIBUTING.md) before changing source. The guide's words and artwork are not licensed for reuse. [Support Ahsan's work](https://aoneahsan.com/payment).
