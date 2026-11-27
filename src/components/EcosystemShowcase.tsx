import {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {ECOSYSTEM_PRODUCTS} from '@site/src/data/ecosystem';
import styles from './EcosystemShowcase.module.css';

/** One contrast band before the shared footer on every public docs page. */
export default function EcosystemShowcase(): ReactNode {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = (): void => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || interacting || reducedMotion) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % ECOSYSTEM_PRODUCTS.length), 10_000);
    return () => window.clearInterval(timer);
  }, [paused, interacting, reducedMotion]);

  useEffect(() => {
    const container = track.current;
    const target = container?.children.item(index);
    if (container && target instanceof HTMLElement) container.scrollTo({left: target.offsetLeft - container.offsetLeft, behavior: reducedMotion ? 'instant' : 'smooth'});
  }, [index, reducedMotion]);

  return <section className={styles.band} aria-label="More from Zaions" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
    <div className="container">
      <div className={styles.heading}><div><p className={styles.eyebrow}>Released work</p><h2>More from Zaions</h2><p>Products you can open, each with its own story.</p></div>
        <div className={styles.controls}><button type="button" aria-label="Previous product" onClick={() => setIndex((current) => (current - 1 + ECOSYSTEM_PRODUCTS.length) % ECOSYSTEM_PRODUCTS.length)}>←</button><button type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? 'Play' : 'Pause'}</button><button type="button" aria-label="Next product" onClick={() => setIndex((current) => (current + 1) % ECOSYSTEM_PRODUCTS.length)}>→</button></div>
      </div>
      <div className={styles.track} ref={track}>
        {ECOSYSTEM_PRODUCTS.map((product) => <article className={styles.card} key={product.id}><div className={styles.cardHead}><img src={product.logo} width="48" height="48" alt="" loading="lazy" /><h3>{product.name}</h3></div><p>{product.card}</p><div className={styles.actions}><Link to={`/ecosystem/${product.id}/`}>Details</Link><a href={product.liveUrl} target="_blank" rel="noopener">Visit {product.name}</a></div></article>)}
      </div>
      <Link className={styles.all} to="/ecosystem/">See all products from Zaions →</Link>
    </div>
  </section>;
}
