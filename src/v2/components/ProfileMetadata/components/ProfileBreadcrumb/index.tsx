import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'
import ProfileBadge from 'v2/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge'
import Badge from 'v2/components/UI/Badge'
import Icons from 'v2/components/UI/Icons'

import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'
import { unescape } from 'lodash'
import { ProfileMetadata as ProfileMetadataType } from '__generated__/ProfileMetadata'
import useIsAdmin from 'v2/hooks/useIsAdmin'

const ProfileLink = styled(Link)`
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ProfileBreadcrumbProps {
  identifiable: ProfileMetadataType
}

export const ProfileBreadcrumb: React.FC<ProfileBreadcrumbProps> = ({
  identifiable,
}) => {
  const location = useLocation()
  const pathname = location.pathname
  const isAdmin = useIsAdmin()

  const showBadge =
    !/follow(ers|ing)$/.test(pathname) && !/groups$/.test(pathname)

  return (
    <StickyBreadcrumbPath>
      <StickyBreadcrumbPath.Crumb>
        <ProfileLink
          to={identifiable.href}
          state={getBreadcrumbPath(identifiable)}
        >
          {unescape(identifiable.name)}
          {showBadge && identifiable.__typename === 'Group' && (
            <Badge
              f={0}
              ml={4}
              color="gray.medium"
              icon={{ private: 'Lock' }[identifiable.visibility]}
            >
              Group
            </Badge>
          )}
          {showBadge && identifiable.__typename === 'User' && (
            <ProfileBadge user={identifiable} />
          )}

          {isAdmin && (
            <Link to={`${identifiable.href}/search`}>
              <Icons
                width="0.5em"
                height="1em"
                color="gray.medium"
                name={'MagnifyingGlass'}
              />
            </Link>
          )}
        </ProfileLink>
      </StickyBreadcrumbPath.Crumb>

      {/following$/.test(pathname) && (
        <StickyBreadcrumbPath.Crumb>Following</StickyBreadcrumbPath.Crumb>
      )}

      {/followers$/.test(pathname) && (
        <StickyBreadcrumbPath.Crumb>Followers</StickyBreadcrumbPath.Crumb>
      )}

      {/groups$/.test(pathname) && (
        <StickyBreadcrumbPath.Crumb>Groups</StickyBreadcrumbPath.Crumb>
      )}
    </StickyBreadcrumbPath>
  )
}

export default ProfileBreadcrumb
