/* eslint-disable @typescript-eslint/no-unused-vars */ //tvler: remove this
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

import possibleTypes from 'v2/apollo/possibleTypes.json'

import extensionData from 'extension/src/apollo/extensionData'

const httpLink = new BatchHttpLink({ uri: process.env.GRAPHQL_ENDPOINT })

export const initApolloClient = ({
  token: X_AUTH_TOKEN = '',
  // @ts-ignore
  isLoggedIn = false, // tvler: remove this
} = {}) => {
  const cache = new InMemoryCache({
    possibleTypes: possibleTypes,
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
