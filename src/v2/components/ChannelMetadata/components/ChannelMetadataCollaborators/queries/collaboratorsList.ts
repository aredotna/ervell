import { gql } from '@apollo/client'

import collaboratorsListFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/fragments/collaboratorsList'

export default gql`
  query ChannelCollaboratorsQuery($channel_id: ID!) {
    channel(id: $channel_id) {
      ...CollaboratorsList
    }
  }
  ${collaboratorsListFragment}
`
