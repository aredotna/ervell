import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Layout from 'react/components/UI/Layout';

export default ({
  bundleName,
  apolloRes,
  res,
}) => {
  const html = (
    <Layout
      bundleName={bundleName}
      asset={res.locals.asset}
      sharify={res.locals.sharify.data}
      content={apolloRes.html}
      helmet={apolloRes.helmet}
      styles={apolloRes.styles}
      state={apolloRes.state}
    />
  );

  res.status(200);
  res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
  res.end();
};
