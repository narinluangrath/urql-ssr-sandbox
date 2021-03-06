import React from 'react';
import { withUrqlClient } from 'next-urql';

// https://nextjs.org/docs/advanced-features/custom-app

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

const url = 'http://localhost:4001/graphql';

// https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs
export default withUrqlClient((_ssrExchange, ctx) => ({
  // ...add your Client options here
  url
}), { ssr: true })(MyApp);
