import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link, useSearchParams } from 'react-router-dom'

import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'

import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'
import { unescape } from 'lodash'
import { ProfileMetadata as ProfileMetadataType } from '__generated__/ProfileMetadata'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
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

export const ProfileSearchBreadcrumb: React.FC<ProfileBreadcrumbProps> = ({
  identifiable,
}) => {
  const { state } = useContext(AdvancedSearchContext)
  const [params] = useSearchParams()

  const term = state.variables.term?.facet
  const total = state.total
  const searchLabel = term
    ? `${total ? `${total} search` : 'Search'} results for '${term}'`
    : 'All'

  const parsedVariables = parse(params.toString(), {
    ignoreQueryPrefix: true,
    parseArrays: true,
  }) as AdvancedSearchVariables

  const hasSecondary = parsedVariables.where?.length > 1
  const where = parsedVariables?.where && parsedVariables?.where.slice(1)
  const secondary = hasSecondary ? <SecondaryBreadcrumbs where={where} /> : null

  return (
    <StickyBreadcrumbPath secondary={secondary}>
      <StickyBreadcrumbPath.Crumb>
        <ProfileLink
          to={identifiable.href}
          state={getBreadcrumbPath(identifiable)}
        >
          {unescape(identifiable.name)}
        </ProfileLink>
      </StickyBreadcrumbPath.Crumb>

      <StickyBreadcrumbPath.Crumb>{searchLabel}</StickyBreadcrumbPath.Crumb>
    </StickyBreadcrumbPath>
  )
}

export default ProfileSearchBreadcrumb
