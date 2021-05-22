import { gql } from '@apollo/client'

import manageCollaboratorsFragment from 'v2/components/ManageCollaborators/fragments/manageCollaborators'

export default gql`
  query ManageCollaboratorsQuery($channel_id: ID!) {
    channel(id: $channel_id) {
      ...ManageCollaborators
    }
  }
  ${manageCollaboratorsFragment}
`
