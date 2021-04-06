import 'isomorphic-fetch'
import sharify from 'sharify'
import React from 'react'
import Cookies from 'cookies-js'
import gql from 'graphql-tag'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { HelmetProvider } from 'react-helmet-async'

import mount from 'v2/util/mount'

import { Themed } from 'v2/styles/theme'

import introspectionQueryResultData from 'v2/apollo/fragmentTypes.json'

import clientData from 'v2/apollo/localState/clientData'

const isClientSide = typeof window !== 'undefined'

const { airbrake } = isClientSide ? { airbrake: null } : require('lib/airbrake')

const {
  data: {
    GRAPHQL_ENDPOINT,
    CLIENT_GRAPHQL_ENDPOINT,
    CLIENT_CONTENTFUL_GRAPHQL_ENDPOINT,
  },
} = sharify

const clientHttpLink = new BatchHttpLink({ uri: CLIENT_GRAPHQL_ENDPOINT })
const serverHttpLink = new BatchHttpLink({ uri: GRAPHQL_ENDPOINT })
const contentfulHttpLink = createHttpLink({
  uri: CLIENT_CONTENTFUL_GRAPHQL_ENDPOINT,
})

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

export const initApolloClient = ({
  token: X_AUTH_TOKEN,
  currentRoute,
  isLoggedIn,
  cookies,
  serializedMe,
  sharifyData,
}: any = {}) => {
  if (isClientSide && window.__APOLLO_CLIENT__) {
    return window.__APOLLO_CLIENT__
  }

  const cache = new InMemoryCache({ fragmentMatcher })

  if (isClientSide && window.__APOLLO_STATE__) {
    cache.restore(window.__APOLLO_STATE__)
  }

  const { X_APP_TOKEN, X_SHARE_TOKEN } = sharifyData

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(X_AUTH_TOKEN && { 'X-AUTH-TOKEN': X_AUTH_TOKEN }),
      ...(X_APP_TOKEN && { 'X-APP-TOKEN': X_APP_TOKEN }),
      ...(X_SHARE_TOKEN && { 'X-SHARE-TOKEN': X_SHARE_TOKEN }),
    },
  }))

  const httpLink = isClientSide ? clientHttpLink : serverHttpLink

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, response }) => {
      const isUnAuthOrNotFound = graphQLErrors?.every(
        err =>
          err.extensions?.code === 'UNAUTHORIZED' ||
          err.extensions?.code === 'NOT_FOUND'
      )

      if (graphQLErrors && !isUnAuthOrNotFound) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
          const loggedError = `[GraphQL error]: ${
            extensions?.code ? `Code: ${extensions.code}` : ''
          } Message: ${message}, Location: ${locations}, Path: ${path}`

          console.error(loggedError)

          if (!isClientSide)
            airbrake?.notify({
              error: loggedError,
              params: { operation, response },
            })
        })
      }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`, { networkError })
        if (!isClientSide)
          airbrake?.notify({
            error: networkError?.message,
            params: {
              operation,
              responseBody: (networkError as any)?.bodyText,
              responseUrl: (networkError as any)?.response?.url,
              responseStatus: (networkError as any)?.response?.status,
              networkError,
            },
          })
      }
    }
  )

  const link = ApolloLink.from([errorLink, authLink, httpLink])

  const typeDefs = `
    extend type Query {
      cookies: {
        get(name: String!): Boolean | null
      }
      sharify: {
        get(name: String!): Boolean | null
      }
    }
  `

  const resolvers = {
    Query: {
      cookies: () => ({
        __typename: 'Cookies',
      }),
      sharify: () => ({
        __typename: 'Sharify',
      }),
      serializedMe: () => ({
        __typename: 'SerializedMe',
      }),
    },
    Cookies: {
      get: (_obj, args) => {
        return isClientSide
          ? Cookies.get(args.name)
          : cookies[args.name] || null
      },
    },
    Sharify: {
      get: (_obj, args) => {
        const value = sharifyData[args.name]
        return value ? value : null
      },
    },
  }

  const client = new ApolloClient({
    ssrMode: !isClientSide,
    link: ApolloLink.split(
      operation => {
        return operation.getContext().clientName === 'contentful'
      },
      contentfulHttpLink,
      link
    ),
    cache,
    resolvers,
    typeDefs,
  })

  const data = {
    currentRoute: {
      __typename: 'CurrentRoute',
      ...currentRoute,
    },
    loginStatus: {
      __typename: 'LoginStatus',
      isLoggedIn,
    },
    cookies: {
      __typename: 'Cookies',
    },
    serializedMe: {
      __typename: 'ClientSerializedMe',
      ...{
        id: null,
        name: null,
        initials: null,
        avatar: null,
        authentication_token: null,
        is_premium: null,
        is_lifetime_premium: null,
        is_supporter: null,
        slug: null,
        hide_notification_count: false,
        ...serializedMe,
      },
    },
    sharify: {
      __typename: 'Sharify',
      ...{ ...sharifyData, CURRENT_USER: null },
    },
  }

  cache.writeData({
    data,
  })

  if (isClientSide) {
    window.__APOLLO_CLIENT__ = client
  }

  return client
}

export const initClientSideApolloClient = () => initApolloClient(clientData())

if (isClientSide) {
  initClientSideApolloClient()
}

export const wrapWithProviders = (
  client = isClientSide && window.__APOLLO_CLIENT__,
  helmetContext = {}
) => (Component, props = {}) => {
  const results = client.readQuery({
    query: gql`
      query ThemeQuery {
        sharify @client {
          theme: THEME
        }
      }
    `,
  })

  const theme = results.sharify && results.sharify.theme

  return (
    <HelmetProvider context={helmetContext}>
      <ApolloProvider client={client}>
        <Themed theme={theme || 'default'}>
          <Component {...props} />
        </Themed>
      </ApolloProvider>
    </HelmetProvider>
  )
}

export const mountWithApolloProvider = (Component, props = {}, mountNode) => {
  if (!mountNode) return null

  const client = initClientSideApolloClient()
  const WrappedComponent = wrapWithProviders(client)(Component, props)

  return mount(WrappedComponent, mountNode)
}
