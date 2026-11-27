import roster from './ecosystem.json';

export interface EcosystemProduct {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly liveUrl: string;
  readonly docsUrl: string | null;
  readonly card: string;
  readonly question: string;
  readonly intro: string;
  readonly sections: readonly {readonly heading: string; readonly body: string}[];
  readonly logo: string;
}

export const ECOSYSTEM_SOURCE_COMMIT = roster.sourceCommit;
export const ECOSYSTEM_PRODUCTS: readonly EcosystemProduct[] = roster.products.filter(
  (product) => product.id !== roster.currentProductId && Boolean(product.liveUrl),
);

if (ECOSYSTEM_PRODUCTS.length !== roster.products.length) {
  throw new Error('The docs ecosystem source includes the current product or a product without a live URL.');
}
