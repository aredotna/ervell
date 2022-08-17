import { gql } from '@apollo/client'

import konnectableChannelFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableChannel/fragments/konnectableChannel'

export default gql`
  fragment ProfileChannels on Identifiable {
    ... on Group {
      __typename
      id
      name
      channels(page: $page, per: $per) {
        ...KonnectableChannel
      }
      counts {
        channels
      }
    }
    ... on User {
      __typename
      id
      name
      counts {
        channels
      }
      channels(page: $page, per: $per, sort_by: $sort) {
        ...KonnectableChannel
      }
    }
  }
  ${konnectableChannelFragment}
`
