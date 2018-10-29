import gql from 'graphql-tag';

import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';
import profileEmptyMessageFragment from 'react/components/ProfileEmptyMessage/fragments/profileEmptyMessage';

export default gql`
  query ProfilePage($id: ID!) {
    identity(id: $id) {
      __typename
      identifiable {
        __typename
        ... ProfileMetadata
        ... ProfileEmptyMessage
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
    }
  }
  ${profileMetadataFragment}
  ${profileEmptyMessageFragment}
`;
