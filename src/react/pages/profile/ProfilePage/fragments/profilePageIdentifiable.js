import gql from 'graphql-tag';

import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';
import emptyOrTipsFragment from 'react/pages/profile/ProfilePage/components/EmptyMessageOrComponent/fragments/emptyOrTips';
import profileMetaTagsFragment from 'react/pages/profile/ProfilePage/components/ProfileMetaTags/fragments/profileMetaTags';

export default gql`
  fragment ProfilePageIdentifiable on Identifiable {
    __typename
    ...ProfileMetadata
    ...EmptyOrTips
    ...ProfileMetaTags
    ... on User {
      counts {
        channels
        blocks
      }
    }
    ... on Group {
      counts {
        channels
      }
    }
  }
  ${profileMetadataFragment}
  ${emptyOrTipsFragment}
  ${profileMetaTagsFragment}
`;
