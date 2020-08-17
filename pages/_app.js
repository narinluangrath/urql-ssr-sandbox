import React from 'react';
import { withUrqlClient } from 'next-urql';

// https://nextjs.org/docs/advanced-features/custom-app

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

const url = 'https://graphql.anilist.co';

// https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs
export default withUrqlClient((_ssrExchange, ctx) => ({
  // ...add your Client options here
  url
}))(MyApp);
