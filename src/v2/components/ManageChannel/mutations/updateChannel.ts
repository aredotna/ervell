import { gql } from '@apollo/client'

import manageChannelFragment from 'v2/components/ManageChannel/fragments/manageChannel'

export default gql`
  mutation updateChannelMutation(
    $id: ID!
    $title: String
    $description: String
    $visibility: ChannelVisibility
    $content_flag: ContentFlag
    $owner: ChannelMemberInput
  ) {
    update_channel(
      input: {
        id: $id
        title: $title
        description: $description
        visibility: $visibility
        content_flag: $content_flag
        owner: $owner
      }
    ) {
      channel {
        ...ManageChannel
      }
    }
  }
  ${manageChannelFragment}
`
