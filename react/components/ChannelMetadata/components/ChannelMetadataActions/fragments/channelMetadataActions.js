import gql from 'graphql-tag';

import muteChannelButtonFragment from 'react/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton/fragments/muteChannelButton';

export default gql`
  fragment ChannelMetadataActions on Channel {
    __typename
    id
    can {
      follow
      update
      destroy
      mute
    }
    visibility
    ...MuteChannelButton
  }
  ${muteChannelButtonFragment}
`;
