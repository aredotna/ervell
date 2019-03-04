import gql from 'graphql-tag';

import compactChannelFragment from 'react/components/CompactChannel/fragments/compactChannel';

export default gql`
  query BlockLightboxConnections($id: ID!) {
    block: blokk(id: $id) {
      __typename
      ... on Model {
        id
      }
      ... on Block {
        counts {
          channels
        }
      }
      ... on ConnectableInterface {
        channels {
          __typename
          id
          ...CompactChannel
        }
      }
    }
  }
  ${compactChannelFragment}
`;
