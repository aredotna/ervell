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
import { withClientState } from 'apollo-link-state'

import mount from 'v2/util/mount'

import { Themed } from 'v2/styles/theme'

import introspectionQueryResultData from 'v2/apollo/fragmentTypes.json'

import extensionData from 'extension/src/apollo/extensionData'

const httpLink = new BatchHttpLink({ uri: process.env.GRAPHQL_ENDPOINT })

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

export const initApolloClient = ({
  token: X_AUTH_TOKEN = '',
  isLoggedIn = false,
} = {}) => {
  const cache = new InMemoryCache({ fragmentMatcher })

  const stateLink = withClientState({
    cache,
    defaults: {
      loginStatus: {
        __typename: 'LoginStatus',
        isLoggedIn,
      },
    },
    resolvers: {},
  })

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      'X-AUTH-TOKEN': X_AUTH_TOKEN,
      'X-APP-TOKEN': process.env.X_APP_TOKEN,
    },
  }))

  const link = ApolloLink.from([authLink, stateLink, httpLink])

  const client = new ApolloClient({
    ssrMode: false,
    link,
    cache,
  })

  window.__APOLLO_CLIENT__ = client

  return client
}

export const initClientSideApolloClient = () =>
  initApolloClient(extensionData())

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

export const mountWithApolloProvider = (Component, props = {}, mountNode) => {
  if (!mountNode) return null

  const client = initClientSideApolloClient()
  const WrappedComponent = wrapWithProviders(client)(Component, props)

  return mount(WrappedComponent, mountNode)
}
