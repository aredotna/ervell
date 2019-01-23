// NOTE: Do not use any components here,
// as they won't be wrapped in the required providers.

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet-async';

const GOOGLE_ANALYTICS_TRACKING_TAG = `
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
`;

const Page = ({
  bundleName,
  helmet,
  content,
  state,
  styles,
  asset,
  sharifyData,
}) => (
  <html lang="en-US">
    <head>
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}

      {styles}
    </head>

    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />

      <script src={asset('/assets/vendor.js')} />
      <script src={asset('/assets/common.js')} />

      <script
        dangerouslySetInnerHTML={{
          __html: `window.__sharifyData=${JSON.stringify(sharifyData).replace(/</g, '\\u003c')};`,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
        }}
      />

      <script src={asset(`/assets/${bundleName}.js`)} />
      <script src={asset('/assets/runtime.js')} />

      {!sharifyData.DO_NOT_TRACK &&
        <script dangerouslySetInnerHTML={{ __html: GOOGLE_ANALYTICS_TRACKING_TAG }} />
      }
    </body>
  </html>
);

Page.propTypes = {
  bundleName: PropTypes.string.isRequired,
  asset: PropTypes.func.isRequired,

  helmet: PropTypes.shape(Helmet.propTypes).isRequired,
  styles: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,

  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.object.isRequired,

  // eslint-disable-next-line react/forbid-prop-types
  sharifyData: PropTypes.object.isRequired,
};

export default Page;
