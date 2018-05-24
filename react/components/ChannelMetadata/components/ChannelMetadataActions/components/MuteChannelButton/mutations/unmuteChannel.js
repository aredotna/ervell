import gql from 'graphql-tag';

import muteChannelButtonFragment from 'react/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton/fragments/muteChannelButton';

export default gql`
  mutation unmuteChannelMutation($id: ID!) {
    __typename
    unmute_channel(input: { id: $id }) {
      __typename
      channel {
        __typename
        ...MuteChannelButton
      }
    }
  }
  ${muteChannelButtonFragment}
`;
