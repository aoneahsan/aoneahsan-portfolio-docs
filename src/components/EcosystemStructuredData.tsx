import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import {ECOSYSTEM_PRODUCTS} from '@site/src/data/ecosystem';
import owner from '@site/src/data/owner-profile.json';

const origin = 'https://docs.aoneahsan.com';

/** Route-specific schema follows the same visible roster and owner record as these pages. */
export default function EcosystemStructuredData({id}: {readonly id?: string}): ReactNode {
  const product = id ? ECOSYSTEM_PRODUCTS.find((row) => row.id === id) : undefined;
  if (id && !product) throw new Error(`Unknown docs ecosystem product: ${id}`);
  const schema = product ? {
    '@context': 'https://schema.org',
    '@graph': [
      {'@type': 'SoftwareApplication', '@id': `${origin}/ecosystem/${product.id}/#product`, name: product.name, url: product.liveUrl, description: product.card, publisher: {'@id': 'https://zaions.com/#organization'}},
      {'@type': 'BreadcrumbList', itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Released Zaions products', item: `${origin}/ecosystem/`},
        {'@type': 'ListItem', position: 2, name: product.name, item: `${origin}/ecosystem/${product.id}/`},
      ]},
    ],
  } : {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Released Zaions products',
    itemListElement: ECOSYSTEM_PRODUCTS.map((row, index) => ({'@type': 'ListItem', position: index + 1, name: row.name, url: `${origin}/ecosystem/${row.id}/`})),
  };
  return <Head><script type="application/ld+json">{JSON.stringify(schema)}</script></Head>;
}

/** This page is the owner's portfolio record, so the Person uses the central profile. */
export function AboutDeveloperStructuredData(): ReactNode {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {'@type': 'AboutPage', '@id': `${origin}/about-developer/#page`, name: 'About the developer — Ahsan Mahmood', url: `${origin}/about-developer/`, about: {'@id': 'https://aoneahsan.com/#person'}},
      {'@type': 'Person', '@id': 'https://aoneahsan.com/#person', name: owner.person.name, alternateName: owner.person.alternateName, url: owner.person.url, jobTitle: owner.person.jobTitle, sameAs: owner.person.sameAs, worksFor: {'@id': 'https://zaions.com/#organization'}},
      {'@type': 'BreadcrumbList', itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Portfolio guide', item: `${origin}/`},
        {'@type': 'ListItem', position: 2, name: 'About the developer', item: `${origin}/about-developer/`},
      ]},
    ],
  };
  return <Head><script type="application/ld+json">{JSON.stringify(schema)}</script></Head>;
}
