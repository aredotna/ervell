import React from 'react'

import { CollaboratorsListItem } from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/components/CollaboratorsListItem'
import { CollaboratorsList_collaborators as Collaborators } from '__generated__/CollaboratorsList'

interface CollaboratorsListProps {
  collaborators: Collaborators[]
  channel_id: string | number
}

export const CollaboratorsList: React.FC<CollaboratorsListProps> = ({
  collaborators,
  channel_id,
  ...rest
}) => {
  if (!collaborators) return null

  return (
    <div {...rest}>
      {collaborators.map((collaborator, i) => (
        <span key={collaborator.id}>
          <CollaboratorsListItem
            collaborator={collaborator}
            channel_id={channel_id}
          />

          {i !== collaborators.length - 1 && ', '}
          {i === collaborators.length - 2 && 'and '}
        </span>
      ))}
    </div>
  )
}
