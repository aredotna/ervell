import gql from 'graphql-tag';

import muteChannelButtonFragment from 'react/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton/fragments/muteChannelButton';

export default gql`
  mutation muteChannelMutation($id: ID!) {
    __typename
    mute_channel(input: { id: $id }) {
      __typename
      channel {
        __typename
        ...MuteChannelButton
      }
    }
  }
  ${muteChannelButtonFragment}
`;
