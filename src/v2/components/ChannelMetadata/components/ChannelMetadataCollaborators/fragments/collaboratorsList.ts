import { gql } from '@apollo/client'

import collaboratorLinkFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/fragments/collaboratorLink'

export default gql`
  fragment CollaboratorsList on Channel {
    __typename
    id
    can {
      manage_collaborators
    }
    collaborators: members {
      ...CollaboratorLink
    }
  }
  ${collaboratorLinkFragment}
`
