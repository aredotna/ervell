import React from 'react'

import Link from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/components/CollaboratorsListItem/components/Link'

import { CollaboratorsList_collaborators_User as User } from '__generated__/CollaboratorsList'
import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'

interface CollaboratorsListItemUserProps {
  user: User
}

export const CollaboratorsListItemUser: React.FC<CollaboratorsListItemUserProps> = ({
  user: { href, name },
  user,
}) => {
  const toParams = {
    pathname: href,
    state: getBreadcrumbPath(user),
  }
  return (
    <strong>
      <Link to={toParams} length={name.length}>
        {name}
      </Link>
    </strong>
  )
}
