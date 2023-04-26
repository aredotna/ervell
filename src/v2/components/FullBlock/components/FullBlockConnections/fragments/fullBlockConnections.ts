import { gql } from '@apollo/client'

import compactChannelFragment from 'v2/components/CompactChannel/fragments/compactChannel'
import fullBlockChannelsAlsoIn from 'v2/components/FullBlock/components/FullBlockChannelsAlsoIn/fragments/fullBlockChannelsAlsoIn'

export default gql`
  fragment FullBlockConnections on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on Block {
      counts {
        public_channels
        current_user_channels: channels_by_current_user
        private_channels: private_accessible_channels
      }
    }
    ... on ConnectableInterface {
      current_user_channels: connections(filter: OWN) {
        __typename
        id
        created_at(format: "%B %Y")
        channel {
          ...CompactChannel
        }
      }
      public_channels: connections(
        page: $page
        per: $per
        direction: ASC
        filter: EXCLUDE_OWN
      ) {
        __typename
        id
        created_at(format: "%B %Y")
        channel {
          ...CompactChannel
        }
      }
      source {
        url
      }
      ...FullBlockChannelsAlsoIn
    }
  }
  ${compactChannelFragment}
  ${fullBlockChannelsAlsoIn}
`
