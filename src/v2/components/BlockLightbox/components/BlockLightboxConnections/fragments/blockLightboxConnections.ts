import { gql } from '@apollo/client'

import compactChannelFragment from 'v2/components/CompactChannel/fragments/compactChannel'
import blockLightboxChannelsAlsoInFragment from 'v2/components/BlockLightbox/components/BlockLightboxChannelsAlsoIn/fragments/blockLightboxChannelsAlsoIn'

export default gql`
  fragment BlockLightboxConnections on Konnectable {
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
      current_user_channels {
        __typename
        id
        ...CompactChannel
      }
      public_channels(page: $page, per: $per) {
        __typename
        id
        ...CompactChannel
      }
      private_channels: private_accessible_channels(page: $page, per: $per) {
        __typename
        id
        ...CompactChannel
      }
      source {
        url
      }
    }
    ...BlockLightboxChannelsAlsoIn
  }
  ${compactChannelFragment}
  ${blockLightboxChannelsAlsoInFragment}
`
