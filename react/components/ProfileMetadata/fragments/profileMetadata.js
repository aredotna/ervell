import gql from 'graphql-tag';

import profileBreadcrumbFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/fragments/profileBreadcrumb';
import profileMetadataActionsFragment from 'react/components/ProfileMetadata/components/ProfileMetadataActions/fragments/profileMetadataActions';
import profileMetadataAboutFragment from 'react/components/ProfileMetadata/components/ProfileMetadataAbout/fragments/profileMetadataAbout';
import profileMetadataInfoFragment from 'react/components/ProfileMetadata/components/ProfileMetadataInfo/fragments/profileMetadataInfo';
import profileMetadataViewFragment from 'react/components/ProfileMetadata/components/ProfileMetadataView/fragments/profileMetadataView';
import profileMetadataSortFragment from 'react/components/ProfileMetadata/components/ProfileMetadataSort/fragments/profileMetadataSort';

export default gql`
  fragment ProfileMetadata on User {
    ...ProfileBreadcrumb
    ...ProfileMetadataActions
    ...ProfileMetadataAbout
    ...ProfileMetadataInfo
    ...ProfileMetadataView
    ...ProfileMetadataSort
  }

  ${profileBreadcrumbFragment}
  ${profileMetadataActionsFragment}
  ${profileMetadataAboutFragment}
  ${profileMetadataInfoFragment}
  ${profileMetadataViewFragment}
  ${profileMetadataSortFragment}
`;
