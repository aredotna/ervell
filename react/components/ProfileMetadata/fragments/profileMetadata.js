import gql from 'graphql-tag';

import profileBreadcrumbFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/fragments/profileBreadcrumb';
import profileMetadataActionsFragment from 'react/components/ProfileMetadata/components/ProfileMetadataActions/fragments/profileMetadataActions';
import profileMetadataInfoFragment from 'react/components/ProfileMetadata/components/ProfileMetadataInfo/fragments/profileMetadataInfo';
import profileMetadataViewFragment from 'react/components/ProfileMetadata/components/ProfileMetadataView/fragments/profileMetadataView';

export default gql`
  fragment ProfileMetadata on Identifiable {
    ...ProfileBreadcrumb
    ...ProfileMetadataActions
    ...ProfileMetadataInfo
    ...ProfileMetadataView
  }

  ${profileBreadcrumbFragment}
  ${profileMetadataActionsFragment}
  ${profileMetadataInfoFragment}
  ${profileMetadataViewFragment}
`;
