import { gql } from '@apollo/client'

import muteChannelButtonFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton/fragments/muteChannelButton'

export default gql`
  mutation unmuteChannelMutation($id: ID!) {
    __typename

    # FIXME: Deprecated field
    unmute_channel(input: { id: $id }) {
      __typename
      channel {
        __typename
        ...MuteChannelButton
      }
    }
  }
  ${muteChannelButtonFragment}
`
