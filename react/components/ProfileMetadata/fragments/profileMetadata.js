import gql from 'graphql-tag';

import profileAvatarFragment from 'react/components/ProfileMetadata/components/ProfileAvatar/fragments/profileAvatar';
import profileBreadcrumbFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/fragments/profileBreadcrumb';
import profileMetadataActionsFragment from 'react/components/ProfileMetadata/components/ProfileMetadataActions/fragments/profileMetadataActions';
import profileMetadataInfoFragment from 'react/components/ProfileMetadata/components/ProfileMetadataInfo/fragments/profileMetadataInfo';
import profileGroupUserListFragment from 'react/components/ProfileMetadata/components/ProfileGroupUserList/fragments/profileGroupUserList';
import profileMetadataViewFragment from 'react/components/ProfileMetadata/components/ProfileMetadataView/fragments/profileMetadataView';
import profileMetadataFilterFragment from 'react/components/ProfileMetadata/components/ProfileMetadataFilter/fragments/profileMetadataFilter';

export default gql`
  fragment ProfileMetadata on Identifiable {
    ... ProfileAvatar
    ... ProfileBreadcrumb
    ... ProfileMetadataActions
    ... ProfileMetadataInfo
    ... ProfileGroupUserList
    ... ProfileMetadataView
    ... ProfileMetadataFilter
  }

  ${profileAvatarFragment}
  ${profileBreadcrumbFragment}
  ${profileMetadataActionsFragment}
  ${profileMetadataInfoFragment}
  ${profileGroupUserListFragment}
  ${profileMetadataViewFragment}
  ${profileMetadataFilterFragment}
`;
