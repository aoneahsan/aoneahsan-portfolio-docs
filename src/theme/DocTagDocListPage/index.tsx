import React from 'react';
import Head from '@docusaurus/Head';
import DocTagDocListPage from '@theme-original/DocTagDocListPage';

export default function DocTagDocListPageWithRobots(
  props: React.ComponentProps<typeof DocTagDocListPage>,
): React.JSX.Element {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <DocTagDocListPage {...props} />
    </>
  );
}
