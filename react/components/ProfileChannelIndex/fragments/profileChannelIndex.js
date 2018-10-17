import gql from 'graphql-tag';

import compactChannelFragment from 'react/components/CompactChannel/fragments/compactChannel';

export default gql`
  fragment ProfileChannelIndex on User {
    channels_index {
      key
      channels {
        ... CompactChannel
      }
    }
  }
  ${compactChannelFragment}
`;
