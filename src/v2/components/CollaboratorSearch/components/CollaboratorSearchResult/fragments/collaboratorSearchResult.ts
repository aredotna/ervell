import { gql } from '@apollo/client'

import memberAvatarFragment from 'v2/components/MemberAvatar/fragments/memberAvatar'

export default gql`
  fragment CollaboratorSearchResult on Member {
    __typename
    ... on User {
      id
      name
      href
      hidden_email
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
