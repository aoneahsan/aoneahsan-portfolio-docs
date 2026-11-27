import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {ECOSYSTEM_PRODUCTS, type EcosystemProduct} from '@site/src/data/ecosystem';
import EcosystemStructuredData from '@site/src/components/EcosystemStructuredData';
import styles from './index.module.css';

type View = 'grid' | 'list' | 'table';
const views: readonly View[] = ['grid', 'list', 'table'];
const readView = (): View => {
  if (typeof window === 'undefined') return 'grid';
  const value = new URL(window.location.href).searchParams.get('view');
  return views.includes(value as View) ? value as View : 'grid';
};

function Actions({product}: {readonly product: EcosystemProduct}): ReactNode {
  return <div className={styles.actions}>
    <Link to={`/ecosystem/${product.id}/`}>Details</Link>
    <a href={product.liveUrl} target="_blank" rel="noopener">Visit {product.name}</a>
  </div>;
}

/** Released work through three views; the URL keeps the chosen view on reload. */
export default function Ecosystem(): ReactNode {
  const [view, setView] = useState<View>('grid');
  const [query, setQuery] = useState('');
  useEffect(() => setView(readView()), []);
  const filtered = ECOSYSTEM_PRODUCTS.filter((product) =>
    `${product.name} ${product.card} ${product.question} ${product.category}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  const changeView = (next: View): void => {
    setView(next);
    const url = new URL(window.location.href);
    if (next === 'grid') url.searchParams.delete('view');
    else url.searchParams.set('view', next);
    window.history.replaceState(window.history.state, '', url);
  };

  return <Layout title="Released Zaions products" description="Released Zaions products Ahsan Mahmood has worked on, with a direct link and a portfolio note for each one.">
    <EcosystemStructuredData />
    <main className={`container margin-vert--xl ${styles.page}`}>
      <p className={styles.eyebrow}>Ahsan Mahmood · Zaions</p>
      <Heading as="h1">Work you can open</Heading>
      <p className={styles.lead}>These are released products I have worked on with Zaions. Open the product itself, or read the choice behind it. The list comes from the release record, so a private or unfinished project is not here.</p>
      <Link to="/about-developer/">How I build and check the work</Link>
      <div className={styles.toolbar}>
        <label>Find a product <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <div className={styles.views} role="group" aria-label="Display products">
          {views.map((option) => <button type="button" key={option} aria-pressed={view === option} onClick={() => changeView(option)}>{option}</button>)}
        </div>
      </div>
      <p aria-live="polite">{filtered.length} of {ECOSYSTEM_PRODUCTS.length} releases</p>
      {view === 'table' ? <div className={styles.tableWrap}><table className={styles.table}><caption>Released Zaions products</caption><thead><tr><th scope="col">Product</th><th scope="col">Question</th><th scope="col">Open</th></tr></thead><tbody>
        {filtered.map((product) => <tr key={product.id}><th scope="row">{product.name}</th><td>{product.question}</td><td><Actions product={product} /></td></tr>)}
      </tbody></table></div> : <div className={`${styles.collection} ${view === 'list' ? styles.list : ''}`}>
        {filtered.map((product) => <article key={product.id} className={styles.card}><div className={styles.cardHead}><img src={product.logo} width="48" height="48" alt="" loading="lazy" /><Heading as="h2">{product.name}</Heading></div><p>{product.card}</p><Actions product={product} /></article>)}
      </div>}
      {filtered.length === 0 && <p>No products match that search. Clear the field to see all releases.</p>}
      <p className={styles.attribution}>The release record names these products. <a href="https://zaions.com" target="_blank" rel="noopener">Visit Zaions</a> to see the team behind them.</p>
    </main>
  </Layout>;
}
