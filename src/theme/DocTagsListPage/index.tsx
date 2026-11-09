import React from 'react';
import Head from '@docusaurus/Head';
import DocTagsListPage from '@theme-original/DocTagsListPage';

export default function DocTagsListPageWithRobots(
  props: React.ComponentProps<typeof DocTagsListPage>,
): React.JSX.Element {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <DocTagsListPage {...props} />
    </>
  );
}
