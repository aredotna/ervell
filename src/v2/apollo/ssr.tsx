import { renderToStringWithData } from '@apollo/client/react/ssr'
import { ServerStyleSheet } from 'styled-components'

import { wrapWithProviders } from 'v2/apollo'

export const renderInlineComponent = ({ client, Component, props = {} }) => {
  const sheet = new ServerStyleSheet()
  const WrappedComponent = wrapWithProviders(client)(Component, props)

  return renderToStringWithData(sheet.collectStyles(WrappedComponent)).then(
    html => ({
      client,
      html,
      state: client.extract(),
      styles: sheet.getStyleTags(),
    })
  )
}

// What's different if we're rendering a full page?
// - Uses `getStyleElement` to get a React component instead of static style markup.
// - Passes in `helmetContext`; returns a `helmet` prop.
//
// TODO: We should be able to do away with inline rendering entirely once Jade
// is no longer needed.
export const renderPageComponent = ({ client, Component, props = {} }) => {
  const sheet = new ServerStyleSheet()
  const helmetContext: any = {}
  const WrappedComponent = wrapWithProviders(client, helmetContext)(
    Component,
    props
  )

  return renderToStringWithData(sheet.collectStyles(WrappedComponent)).then(
    html => ({
      client,
      html,
      state: client.extract(),
      styles: sheet.getStyleElement(),
      helmet: helmetContext.helmet,
    })
  )
}

export default client => (Component, props = {}, options: any = {}) => {
  if (options.mode === 'page') {
    return renderPageComponent({ client, Component, props })
  }

  return renderInlineComponent({ client, Component, props })
}
