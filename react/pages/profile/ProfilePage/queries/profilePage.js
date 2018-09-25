import gql from 'graphql-tag';

import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';

export default gql`
  query ProfilePage($id: ID!) {
    identity(id: $id) {
      identifiable {
        __typename
        ...ProfileMetadata
      }
    }
  }
  ${profileMetadataFragment}
`;
