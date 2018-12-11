import gql from 'graphql-tag';

import profileGroupsFragment from 'react/components/ProfileGroups/fragments/profileGroups';

export default gql`
  query ProfileGroups($id: ID!, $page: Int, $per: Int) {
    identity(id: $id) {
      identifiable {
        ... ProfileGroups
      }
    }
  }
  ${profileGroupsFragment}
`;
