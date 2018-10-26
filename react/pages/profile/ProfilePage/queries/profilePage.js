import gql from 'graphql-tag';

import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';

export default gql`
  query ProfilePage($id: ID!) {
    identity(id: $id) {
      __typename
      identifiable {
        __typename
        ... ProfileMetadata
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
`;
