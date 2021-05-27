import { gql } from '@apollo/client'

import identifiableCellFragment from 'v2/components/Cell/components/Identifiable/fragments/identifiableCell'

export const channelFollowersQuery = gql`
  query ChannelFollowers($id: ID!, $page: Int, $per: Int) {
    channel(id: $id) {
      id
      __typename
      followers(page: $page, per: $per) {
        __typename
        ...IdentifiableCell
      }
    }
  }
  ${identifiableCellFragment}
`
