import gql from 'graphql-tag';

import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';

export default gql`
  mutation createChannelMutation($title: String!, $visibility: ChannelVisibility = PRIVATE) {
    create_channel(input: { title: $title, visibility: $visibility }) {
      channel {
        ...ChannelMetadata
      }
    }
  }

  ${channelMetadataFragment}
`;
