import React from 'react'
import styled from 'styled-components'
import { Link, useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'
import ProfileBadge from 'v2/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge'
import Badge from 'v2/components/UI/Badge'

import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'
import { unescape } from 'lodash'
import { ProfileMetadata as ProfileMetadataType } from '__generated__/ProfileMetadata'
import { parse } from 'qs'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import { SecondaryBreadcrumbs } from 'v2/components/AdvancedSearch/components/AdvancedSearchSecondaryBreadcrumb'

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
  const [params] = useSearchParams()
  const pathname = location.pathname

  const showBadge =
    !/follow(ers|ing)$/.test(pathname) &&
    !/groups$/.test(pathname) &&
    !/search$/.test(pathname)

  const searchTerm = params.get('term[facet]')
  const searchLabel = searchTerm
    ? `Search results for '${searchTerm}'`
    : 'All results'

  const parsedVariables = parse(params.toString(), {
    ignoreQueryPrefix: true,
    parseArrays: true,
  }) as AdvancedSearchVariables

  const hasSecondary = parsedVariables.where?.length > 1
  const where = parsedVariables?.where && parsedVariables?.where.slice(1)
  const context = parsedVariables?.where && parsedVariables?.where[0]
  const secondary = hasSecondary ? (
    <SecondaryBreadcrumbs where={where} context={context} />
  ) : null

  return (
    <StickyBreadcrumbPath secondary={secondary}>
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

      {/\/search$/.test(pathname) && (
        <StickyBreadcrumbPath.Crumb>{searchLabel}</StickyBreadcrumbPath.Crumb>
      )}
    </StickyBreadcrumbPath>
  )
}

export default ProfileBreadcrumb
