import { gql } from '@apollo/client'

import compactChannelFragment from 'v2/components/CompactChannel/fragments/compactChannel'

export default gql`
  query FullChannelMetadataFold($id: ID!) {
    channel(id: $id) {
      __typename
      id
      counts {
        __typename
        connected_to_channels
      }
      connected_to_channels {
        id
        ...CompactChannel
      }
    }
  }
  ${compactChannelFragment}
`
