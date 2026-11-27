import type {ReactNode} from 'react';
import FooterOriginal from '@theme-original/Footer';
import EcosystemShowcase from '@site/src/components/EcosystemShowcase';

/** The docs site's single showcase sits immediately before its shared footer. */
export default function Footer(): ReactNode {
  return <><EcosystemShowcase /><FooterOriginal /></>;
}
