import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'

import { setContext } from 'apollo-link-context'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'

import mount from 'v2/util/mount'

import { Themed } from 'v2/styles/theme'

import introspectionQueryResultData from 'v2/apollo/fragmentTypes.json'

import extensionData from 'extension/src/apollo/extensionData'

const httpLink = new BatchHttpLink({ uri: process.env.GRAPHQL_ENDPOINT })

console.log(
  'process.env.GRAPHQL_ENDPOINT',
  process.env.GRAPHQL_ENDPOINT,
  'process.env',
  process.env
)

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

export const initApolloClient = ({
  token: X_AUTH_TOKEN = '',
  isLoggedIn = false,
} = {}) => {
  const cache = new InMemoryCache({ fragmentMatcher })

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

  const data = {
    loginStatus: {
      __typename: 'LoginStatus',
      isLoggedIn,
    },
  }

  cache.writeData({ data })

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
    <Themed>
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
