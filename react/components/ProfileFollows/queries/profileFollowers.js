import gql from 'graphql-tag';

import profileFollowersFragment from 'react/components/ProfileFollows/fragments/profileFollowers';

export default gql`
  query ProfileFollowers($id: ID!, $page: Int, $per: Int) {
    identity(id: $id) {
      identifiable {
        ... ProfileFollowers
      }
    }
  }
  ${profileFollowersFragment}
`;
