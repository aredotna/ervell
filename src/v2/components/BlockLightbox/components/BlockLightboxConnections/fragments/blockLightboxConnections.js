import gql from 'graphql-tag';

import compactChannelFragment from 'v2/components/CompactChannel/fragments/compactChannel';
import blockLightboxChannelsAlsoInFragment from 'v2/components/BlockLightbox/components/BlockLightboxChannelsAlsoIn/fragments/blockLightboxChannelsAlsoIn';

export default gql`
  fragment BlockLightboxConnections on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on Block {
      counts {
        public_channels
        private_channels: private_accessible_channels
      }
    }
    ... on ConnectableInterface {
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
`;
