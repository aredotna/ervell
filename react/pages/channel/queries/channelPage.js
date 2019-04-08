import gql from 'graphql-tag';

import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';
import channelContentsFragment from 'react/components/ChannelContents/fragments/channelContents';

export default gql`
  query ChannelPage($id: ID!) {
    channel(id: $id) {
      ...ChannelMetadata
      ...ChannelContents
    }
  }
  ${channelMetadataFragment}
  ${channelContentsFragment}
`;
