import React from 'react'

import Badge from 'v2/components/UI/Badge'
import Link from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/components/CollaboratorsListItem/components/Link'

import { CollaboratorsList_collaborators_Group as Group } from '__generated__/CollaboratorsList'
import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'

interface CollaboratorsListItemGroupProps {
  group: Group
}

export const CollaboratorsListItemGroup: React.FC<CollaboratorsListItemGroupProps> = ({
  group,
}) => {
  const toParams = {
    pathname: group.href,
    state: getBreadcrumbPath(group),
  }
  return (
    <strong>
      <Link to={toParams} length={group.name.length} title={group.description}>
        {group.name}
        &nbsp;
        <Badge
          f={0}
          color="gray.medium"
          icon={{ private: 'Lock' }[group.visibility]}
        >
          Group
        </Badge>
      </Link>
    </strong>
  )
}
