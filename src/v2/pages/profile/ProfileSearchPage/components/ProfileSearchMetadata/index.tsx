import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import AdvancedSearchFilter from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import Box from 'v2/components/UI/Box'

import { generateUrlFromVariables } from 'v2/util/tokenizeAdvancedSearch'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import { ProfileSearchPageQuery_identity_identifiable } from '__generated__/ProfileSearchPageQuery'
import ProfileSearchBreadcrumb from '../ProfileSearchBreadcrumb'
interface ProfileMetadataProps {
  identifiable: ProfileSearchPageQuery_identity_identifiable
  view?: 'grid' | 'table'
}

export const ProfileSearchMetadata: React.FC<ProfileMetadataProps> = ({
  identifiable,
  view,
  ...rest
}) => {
  const navigate = useNavigate()
  const { state } = useContext(AdvancedSearchContext)

  useEffect(() => {
    navigate(generateUrlFromVariables(state.variables), { replace: true })
  }, [state.query])

  return (
    <Box mb={9}>
      <HeaderMetadataContainer
        breadcrumb={<ProfileSearchBreadcrumb identifiable={identifiable} />}
        {...rest}
      >
        <AdvancedSearchFilter />
      </HeaderMetadataContainer>
    </Box>
  )
}

export default ProfileSearchMetadata
