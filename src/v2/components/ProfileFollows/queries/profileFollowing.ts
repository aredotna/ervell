import { gql } from '@apollo/client'

import profileFollowingFragment from 'v2/components/ProfileFollows/fragments/profileFollowing'

export default gql`
  query ProfileFollowing(
    $id: ID!
    $page: Int
    $per: Int
    $type: FollowingTypeEnum
  ) {
    identity(id: $id) {
      identifiable {
        ...ProfileFollowing
      }
    }
  }
  ${profileFollowingFragment}
`
