import { gql } from '@apollo/client'

import muteChannelButtonFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton/fragments/muteChannelButton'

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
    ...MuteChannelButton
  }
  ${muteChannelButtonFragment}
`
