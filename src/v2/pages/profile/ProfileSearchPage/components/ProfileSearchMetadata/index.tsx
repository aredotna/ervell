import React from 'react'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import AdvancedSearchFilter from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import ProfileBreadcrumb from 'v2/components/ProfileMetadata/components/ProfileBreadcrumb'
import { ProfileSearchPageQuery_identity_identifiable } from '__generated__/ProfileSearchPageQuery'

interface ProfileMetadataProps {
  identifiable: ProfileSearchPageQuery_identity_identifiable
  view?: 'grid' | 'table'
}

export const ProfileSearchMetadata: React.FC<ProfileMetadataProps> = ({
  identifiable,
  view,
  ...rest
}) => {
  return (
    <HeaderMetadataContainer
      breadcrumb={<ProfileBreadcrumb identifiable={identifiable} />}
      {...rest}
    >
      <AdvancedSearchFilter />
    </HeaderMetadataContainer>
  )
}

export default ProfileSearchMetadata
