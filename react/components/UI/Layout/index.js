// NOTE: Do not use any components here,
// as they won't be wrapped in the required providers.

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet-async';

const Layout = ({
  bundleName,
  helmet,
  content,
  state,
  styles,
  asset,
  sharify,
}) => (
  <html lang="en-US">
    <head>
      {helmet.title.toComponent()}

      {styles}
    </head>

    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />

      <script src={asset('/assets/vendor.js')} />
      <script src={asset('/assets/common.js')} />

      {/* TODO: Various global set up, if any (analytics, etc)? */}
      {/* <script src={asset('/assets/layout.js')} /> */}

      <script
        dangerouslySetInnerHTML={{
          __html: `window.__sharifyData=${JSON.stringify(sharify).replace(/</g, '\\u003c')};`,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
        }}
      />

      <script src={asset(`/assets/${bundleName}.js`)} />
      <script src={asset('/assets/runtime.js')} />
    </body>
  </html>
);

Layout.propTypes = {
  bundleName: PropTypes.string.isRequired,
  asset: PropTypes.func.isRequired,

  helmet: PropTypes.shape(Helmet.propTypes).isRequired,
  styles: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,

  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sharify: PropTypes.object.isRequired,
};

Layout.defaultProps = {
};

export default Layout;
