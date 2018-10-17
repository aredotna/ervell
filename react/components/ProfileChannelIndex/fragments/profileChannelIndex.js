import gql from 'graphql-tag';

import compactChannelFragment from 'react/components/CompactChannel/fragments/compactChannel';

export default gql`
  fragment ProfileChannelIndex on Identifiable {
    ... on User {
      __typename
      id: slug
      channels_index(type: $type) {
        key
        channels {
          ... CompactChannel
        }
      }
    }
    ... on Group {
      __typename
      id: slug
      channels_index(type: $type) {
        key
        channels {
          ... CompactChannel
        }
      }
    }
  }
  ${compactChannelFragment}
`;
