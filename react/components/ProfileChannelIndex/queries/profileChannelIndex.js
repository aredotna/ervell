import gql from 'graphql-tag';

import compactChannelFragment from 'react/components/CompactChannel/fragments/compactChannel';

export default gql`
  query ProfileChannelIndex($id: ID!) {
    user(id: $id) {
      contents: kontents(type: CHANNEL, per: 1000) {
        __typename
        ... CompactChannel
      }
    }
  }
  ${compactChannelFragment}
`;
