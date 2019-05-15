// NOTE: Do not use any components here,
// as they won't be wrapped in the required providers.
//
// This component also does NOT render on the client-side.

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Page extends PureComponent {
  static propTypes = {
    bundleName: PropTypes.string.isRequired,
    asset: PropTypes.func.isRequired,

    helmet: PropTypes.shape({
      title: PropTypes.shape({
        toComponent: PropTypes.func.isRequired,
      }),
      meta: PropTypes.shape({
        toComponent: PropTypes.func.isRequired,
      }),
      link: PropTypes.shape({
        toComponent: PropTypes.func.isRequired,
      }),
    }).isRequired,
    styles: PropTypes.arrayOf(PropTypes.node).isRequired,
    content: PropTypes.node.isRequired,

    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object.isRequired,

    // eslint-disable-next-line react/forbid-prop-types
    sharifyData: PropTypes.object.isRequired,
  }

  render() {
    const {
      bundleName,
      helmet,
      content,
      state,
      styles,
      asset,
      sharifyData,
    } = this.props

    return (
      <html lang="en-US" data-theme={sharifyData.THEME}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}

          <meta
            name="google-site-verification"
            content="yEDzyeh9dYsQoRw7VJA6X5aVthUCYVTNK6nOUQU1eEE"
          />
          <meta
            name="google-site-verification"
            content="YlzaBIQnBQhN5JFfKeoinJXrTlfdmdtFZ6s8Ez_O8vc"
          />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimal-ui"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          <link
            rel="apple-touch-icon"
            href={`${sharifyData.IMAGE_PATH}touch-icon-iphone.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={`${sharifyData.IMAGE_PATH}touch-icon-ipad.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href={`${sharifyData.IMAGE_PATH}touch-icon-iphone-retina.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={`${sharifyData.IMAGE_PATH}touch-icon-ipad-retina.png`}
          />

          <meta name="apple-itunes-app" content="app-id=1299153149" />
          <link
            rel="mask-icon"
            href={`${sharifyData.IMAGE_PATH}arena-mark.svg`}
            color="black"
          />

          <meta name="twitter:site" content="@aredotna" />

          {/* Temporarily include legacy styles */}
          <link
            type="text/css"
            rel="stylesheet"
            href={asset('/assets/all.css')}
          />

          {styles}
        </head>

        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />

          <script src={asset('/assets/vendor.js')} />
          <script src={asset('/assets/common.js')} />

          <script
            dangerouslySetInnerHTML={{
              __html: `window.__sharifyData=${JSON.stringify(
                sharifyData
              ).replace(/</g, '\\u003c')};`,
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
                /</g,
                '\\u003c'
              )};`,
            }}
          />

          <script src={asset(`/assets/${bundleName}.js`)} />

          {!sharifyData.DO_NOT_TRACK && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

                  ga('create', '${sharifyData.GOOGLE_ANALYTICS_ID}', 'auto');
                `,
              }}
            />
          )}

          <script src={asset('/assets/runtime.js')} />
          <script
            src="//instant.page/1.2.2"
            type="module"
            integrity="sha384-2xV8M5griQmzyiY3CDqh1dn4z3llDVqZDqzjzcY+jCBCk/a5fXJmuZ/40JJAPeoU"
          />
        </body>
      </html>
    )
  }
}
