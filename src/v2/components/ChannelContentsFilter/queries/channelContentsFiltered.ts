import { gql } from '@apollo/client'

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

export const channelContentsFilteredQuery = gql`
  query ChannelContentsFiltered($channelId: ID!, $query: String!) {
    channel(id: $channelId) {
      __typename
      id
      filtered_contents: filter(q: $query, page: 1, per: 24) {
        ...KonnectableCell
      }
    }
  }
  ${konnectableCellFragment}
`
