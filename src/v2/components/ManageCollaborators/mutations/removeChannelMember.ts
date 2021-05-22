import { gql } from '@apollo/client'

import manageCollaboratorsFragment from 'v2/components/ManageCollaborators/fragments/manageCollaborators'

export default gql`
  mutation removeChannelMember(
    $member_id: ID!
    $member_type: MemberTypes
    $channel_id: ID!
  ) {
    remove_channel_members(
      input: {
        id: $channel_id
        members: [{ id: $member_id, type: $member_type }]
      }
    ) {
      channel {
        ...ManageCollaborators
      }
    }
  }
  ${manageCollaboratorsFragment}
`
