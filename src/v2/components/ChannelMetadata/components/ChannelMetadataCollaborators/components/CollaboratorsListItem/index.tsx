import React from 'react'

import { CollaboratorsListItemUser } from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/components/CollaboratorsListItem/components/CollaboratorsListItemUser'
import { CollaboratorsListItemGroup } from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/components/CollaboratorsListItem/components/CollaboratorsListItemGroup'

import { CollaboratorsList_collaborators as Collaborator } from '__generated__/CollaboratorsList'

interface CollaboratorsListItemProps {
  collaborator: Collaborator
  channel_id: number | string
}

export const CollaboratorsListItem: React.FC<CollaboratorsListItemProps> = ({
  collaborator,
}) => {
  switch (collaborator.__typename) {
    case 'Group':
      return <CollaboratorsListItemGroup group={collaborator} />
    case 'User':
      return <CollaboratorsListItemUser user={collaborator} />
    default:
      return <div />
  }
}
