import gql from 'graphql-tag';

import channelShareButtonFragment from 'react/components/ChannelMetadata/components/ChannelMetadataInfo/components/ChannelShareButton/fragments/channelShareButton';

export default gql`
  mutation shareChannelMutation($id: ID!, $enable: Boolean!) {
    share_channel(input: { id: $id, enable: $enable }) {
      channel {
        ...ChannelShareButton
      }
    }
  }
  ${channelShareButtonFragment}
`;
