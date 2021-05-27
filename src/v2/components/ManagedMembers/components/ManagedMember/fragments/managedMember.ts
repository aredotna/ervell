import { gql } from '@apollo/client'

import memberAvatarFragment from 'v2/components/MemberAvatar/fragments/memberAvatar'

export default gql`
  fragment ManagedMember on Member {
    __typename
    ... on User {
      id
      name
      href
      ...MemberAvatar
    }
    ... on Group {
      id
      name
      ...MemberAvatar
      visibility
      user {
        __typename
        id
        name
      }
    }
  }
  ${memberAvatarFragment}
`
