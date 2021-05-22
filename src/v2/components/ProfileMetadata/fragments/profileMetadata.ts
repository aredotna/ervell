import { gql } from '@apollo/client'

import profileAvatarFragment from 'v2/components/ProfileMetadata/components/ProfileAvatar/fragments/profileAvatar'
import profileBreadcrumbFragment from 'v2/components/ProfileMetadata/components/ProfileBreadcrumb/fragments/profileBreadcrumb'
import profileMetadataActionsFragment from 'v2/components/ProfileMetadata/components/ProfileMetadataActions/fragments/profileMetadataActions'
import profileMetadataInfoFragment from 'v2/components/ProfileMetadata/components/ProfileMetadataInfo/fragments/profileMetadataInfo'
import profileGroupUserListFragment from 'v2/components/ProfileMetadata/components/ProfileGroupUserList/fragments/profileGroupUserList'
import profileMetadataViewFragment from 'v2/components/ProfileMetadata/components/ProfileMetadataView/fragments/profileMetadataView'
import profileMetadataFilterFragment from 'v2/components/ProfileMetadata/components/ProfileMetadataFilter/fragments/profileMetadataFilter'
import profileMetadataFollowingTypeFragment from 'v2/components/ProfileMetadata/components/ProfileMetadataFollowingType/fragments/profileMetadataFollowingType'

export default gql`
  fragment ProfileMetadata on Identifiable {
    ...ProfileAvatar
    ...ProfileBreadcrumb
    ...ProfileMetadataActions
    ...ProfileMetadataInfo
    ...ProfileGroupUserList
    ...ProfileMetadataView
    ...ProfileMetadataFilter
    ...ProfileMetadataFollowingType
  }

  ${profileAvatarFragment}
  ${profileBreadcrumbFragment}
  ${profileMetadataActionsFragment}
  ${profileMetadataInfoFragment}
  ${profileGroupUserListFragment}
  ${profileMetadataViewFragment}
  ${profileMetadataFilterFragment}
  ${profileMetadataFollowingTypeFragment}
`
