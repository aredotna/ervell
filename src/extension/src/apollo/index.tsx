import React from 'react'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { setContext } from '@apollo/client/link/context'

import mount from 'v2/util/mount'

import { Themed } from 'v2/styles/theme'

// import introspectionQueryResultData from 'v2/apollo/fragmentTypes.json' tvler: remove this

import extensionData from 'extension/src/apollo/extensionData'

const httpLink = new BatchHttpLink({ uri: process.env.GRAPHQL_ENDPOINT })

// tvler: add this back
// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData,
// })

export const initApolloClient = ({
  token: X_AUTH_TOKEN = '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isLoggedIn = false, // tvler: remove this
} = {}) => {
  const cache = new InMemoryCache({
    // fragmentMatcher tvler: add this back
  })

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      'X-AUTH-TOKEN': X_AUTH_TOKEN,
      'X-APP-TOKEN': process.env.X_APP_TOKEN,
    },
  }))

  const link = ApolloLink.from([authLink, httpLink])

  const client = new ApolloClient({
    ssrMode: false,
    link,
    cache,
  })

  // const data = {
  //   loginStatus: {
  //     __typename: 'LoginStatus',
  //     isLoggedIn,
  //   },
  // }
  // cache.writeData({ data }) tvler: add this back

  window.__APOLLO_CLIENT__ = client

  return client
}

export const initClientSideApolloClient = async () => {
  const clientData = await extensionData()
  initApolloClient(clientData)
}

export const wrapWithProviders = (client = window.__APOLLO_CLIENT__) => (
  Component,
  props = {}
) => (
  <ApolloProvider client={client}>
    <Themed theme="default">
      <Component {...props} />
    </Themed>
  </ApolloProvider>
)

export const mountWithApolloProvider = async (
  Component,
  props = {},
  mountNode
) => {
  if (!mountNode) return null

  const client = await initClientSideApolloClient()
  const WrappedComponent = wrapWithProviders(client)(Component, props)

  return mount(WrappedComponent, mountNode)
}
