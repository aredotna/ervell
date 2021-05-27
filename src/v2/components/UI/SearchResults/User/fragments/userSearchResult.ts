import { gql } from '@apollo/client'

import memberAvatarFragment from 'v2/components/MemberAvatar/fragments/memberAvatar'

export default gql`
  fragment UserSearchResult on User {
    __typename
    id
    name
    href
    hidden_email
    ...MemberAvatar
  }
  ${memberAvatarFragment}
`
