import { gql } from '@apollo/client'

import managedMemberFragment from 'v2/components/ManagedMembers/components/ManagedMember/fragments/managedMember'
import collaboratorsListFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/fragments/collaboratorsList'

export default gql`
  fragment ManageCollaborators on Channel {
    __typename
    id
    counts {
      collaborators
    }

    collaborators: members {
      ...ManagedMember
    }

    memberships {
      id
      member {
        ...ManagedMember
      }
      can {
        manage
      }
    }

    ...CollaboratorsList
  }
  ${managedMemberFragment}
  ${collaboratorsListFragment}
`
