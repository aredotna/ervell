import gql from 'graphql-tag';

import channelMetadataFragment from 'v2/components/ChannelMetadata/fragments/channelMetadata';
import channelContentsFragment from 'v2/components/ChannelContents/fragments/channelContents';

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
