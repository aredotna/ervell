import gql from 'graphql-tag';

import userProfileFollowersFragment from 'react/components/ProfileFollows/fragments/userProfileFollowers';
import groupProfileFollowersFragment from 'react/components/ProfileFollows/fragments/groupProfileFollowers';


export default gql`
  query ProfileFollowers($id: ID!, $page: Int, $per: Int) {
    identity(id: $id) {
      identifiable {
        ...on User {
          ...UserProfileFollowers
        }
        ...on Group {
          ...GroupProfileFollowers
        }
      }
    }
  }
  ${userProfileFollowersFragment}
  ${groupProfileFollowersFragment}
`;
