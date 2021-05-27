import { gql } from '@apollo/client'

import userProfileFollowersFragment from 'v2/components/ProfileFollows/fragments/userProfileFollowers'
import groupProfileFollowersFragment from 'v2/components/ProfileFollows/fragments/groupProfileFollowers'

export default gql`
  query ProfileFollowers($id: ID!, $page: Int, $per: Int) {
    identity(id: $id) {
      identifiable {
        ... on User {
          ...UserProfileFollowers
        }
        ... on Group {
          ...GroupProfileFollowers
        }
      }
    }
  }
  ${userProfileFollowersFragment}
  ${groupProfileFollowersFragment}
`
