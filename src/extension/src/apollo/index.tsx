import React from 'react'
import { ApolloClient, ApolloLink, ApolloProvider } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { setContext } from '@apollo/client/link/context'

import mount from 'v2/util/mount'

import { Themed } from 'v2/styles/theme'

import { getCache } from 'v2/apollo/cache'

import { InitialExtensionDataFragment } from '__generated__/InitialExtensionDataFragment'

import extensionData from 'extension/src/apollo/extensionData'
import INITIAL_DATA from 'extension/src/apollo/fragments/initialData'

const httpLink = new BatchHttpLink({ uri: process.env.GRAPHQL_ENDPOINT })

export const initApolloClient = ({
  token: X_AUTH_TOKEN = '',
  isLoggedIn = false,
} = {}) => {
  const cache = getCache()

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

  client.writeFragment<InitialExtensionDataFragment>({
    fragment: INITIAL_DATA,
    data: {
      __typename: 'Query',
      loginStatus: {
        __typename: 'ClientLoginStatus',
        isLoggedIn: isLoggedIn,
      },
    },
  })

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
