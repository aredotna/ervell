import React from 'react'
import { gql } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'

import { getCache } from 'v2/apollo/cache'
import clientTypeDefs from 'v2/apollo/localState/clientSchema.graphql'
import INITIAL_DATA from 'v2/apollo/fragments/initialData'
import { Themed } from 'v2/styles/theme'

const typeDefs = gql`
  ${clientTypeDefs}
`

const cache = getCache({})

cache.writeFragment({
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
    },
    loginStatus: {
      __typename: 'ClientLoginStatus',
      isLoggedIn: false,
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
    },
    sharify: {
      __typename: 'ClientSharify',
      get: null,
      IS_SPIDER: null,
      IS_OUTSIDE_MAIN_ROUTER: null,
      THEME: null,
      ...{ CURRENT_USER: null },
    },
  },
})

export const decorators = [
  Story => (
    <Themed theme="default">
      <Story />
    </Themed>
  ),
]

export const parameters = {
  apolloClient: {
    MockedProvider,
    typeDefs,
    cache,
  },
}
