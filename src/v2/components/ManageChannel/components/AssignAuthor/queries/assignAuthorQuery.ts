import { gql } from '@apollo/client'

import avatarFragment from 'v2/components/UserAvatar/fragments/userAvatar'
import memberAvatarFragment from 'v2/components/MemberAvatar/fragments/memberAvatar'

export default gql`
  query AssignAuthorQuery {
    me {
      __typename
      id
      name
      ...UserAvatar
      groups(page: 1, per: 25) {
        __typename
        id
        name
        visibility
        ...MemberAvatar
      }
    }
  }
  ${memberAvatarFragment}
  ${avatarFragment}
`
