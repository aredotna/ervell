import gql from 'graphql-tag';

import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';

export default gql`
  query Profile($id: ID!) {
    user(id: $id) {
      ...ProfileMetadata
    }
  }

  ${profileMetadataFragment}
`;
