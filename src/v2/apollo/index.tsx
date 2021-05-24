import 'isomorphic-fetch'
import sharify from 'sharify'
import React from 'react'
import { gql } from '@apollo/client'
import url from 'url'

import { ApolloClient, ApolloLink, ApolloProvider } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { createHttpLink } from '@apollo/client/link/http'
import { setContext } from '@apollo/client/link/context'
import { HelmetProvider } from 'react-helmet-async'

import mount from 'v2/util/mount'

import { Themed } from 'v2/styles/theme'

import { InitialAppDataFragment } from '__generated__/InitialAppDataFragment'

import clientData from 'v2/apollo/localState/clientData'
import serializedMeFn from 'v2/apollo/localState/serializedMe'
import INITIAL_DATA from 'v2/apollo/fragments/initialData'
import { getCache } from 'v2/apollo//cache'

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

export const initApolloClient = ({
  token: X_AUTH_TOKEN,
  currentRoute,
  isLoggedIn,
  cookies,
  serializedMe,
  sharifyData,
}: {
  token?: any
  currentRoute?: url.UrlWithStringQuery
  isLoggedIn?: boolean
  cookies?: Record<string, any>
  serializedMe?: ReturnType<typeof serializedMeFn>
  sharifyData?: Record<string, any>
} = {}) => {
  if (isClientSide && window.__APOLLO_CLIENT__) {
    return window.__APOLLO_CLIENT__
  }

  const cache = getCache({ cookies, sharifyData })

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
  })

  cache.writeFragment<InitialAppDataFragment>({
    fragment: INITIAL_DATA,
    data: {
      __typename: 'Query',
      currentRoute: {
        __typename: 'ClientCurrentRoute',
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: null,
        query: null,
        pathname: null,
        path: null,
        href: null,
        ...currentRoute,
      },
      loginStatus: {
        __typename: 'ClientLoginStatus',
        isLoggedIn: isLoggedIn,
      },
      cookies: {
        __typename: 'ClientCookies',
        get: null,
      },
      serializedMe: {
        __typename: 'ClientSerializedMe',
        id: null,
        initials: null,
        name: null,
        avatar: null,
        authentication_token: null,
        is_premium: null,
        is_lifetime_premium: null,
        is_supporter: null,
        slug: null,
        hide_notification_count: null,
        ...serializedMe,
      },
      sharify: {
        __typename: 'ClientSharify',
        get: null,
        IS_SPIDER: null,
        IS_OUTSIDE_MAIN_ROUTER: null,
        THEME: null,
        ...{ ...sharifyData, CURRENT_USER: null },
      },
    },
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
