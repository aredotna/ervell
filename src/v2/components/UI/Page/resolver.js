import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Page from 'v2/components/UI/Page';

export default ({ bundleName, apolloRes, res }) => {
  const html = (
    <Page
      bundleName={bundleName}
      asset={res.locals.asset}
      sharifyData={res.locals.sharify.data}
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
