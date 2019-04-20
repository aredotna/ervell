import gql from 'graphql-tag';

import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';

export default gql`
  query ChannelMetadata($id: ID!) {
    channel(id: $id) {
      ...ChannelMetadata
    }
  }

  ${channelMetadataFragment}
`;
