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

// This is for rendering a component without
// any of HTML wrapping or stylesheets
//
// This is used primarily for XML / RSS rendering
export const renderBareComponent = ({ client, Component, props = {} }) => {
  const helmetContext: any = {}
  const WrappedComponent = wrapWithProviders(client, helmetContext)(
    Component,
    props
  )

  return renderToStringWithData(WrappedComponent).then(html => ({
    client,
    html,
    state: client.extract(),
  }))
}

export default client => (Component, props = {}, options: any = {}) => {
  if (options.mode === 'page') {
    return renderPageComponent({ client, Component, props })
  }

  if (options.mode === 'bare') {
    return renderBareComponent({ client, Component, props })
  }

  return renderInlineComponent({ client, Component, props })
}
