import { gql } from '@apollo/client'

import manageCollaboratorsFragment from 'v2/components/ManageCollaborators/fragments/manageCollaborators'

export default gql`
  mutation inviteCollaborator($email: String!, $channel_id: ID!) {
    # FIXME: Deprecated field
    invite_collaborator(input: { email: $email, channel_id: $channel_id }) {
      channel {
        ...ManageCollaborators
      }
    }
  }
  ${manageCollaboratorsFragment}
`
