import { gql } from '@apollo/client'

import memberAvatarFragment from 'v2/components/MemberAvatar/fragments/memberAvatar'

export default gql`
  fragment GroupSearchResult on Group {
    __typename
    id
    name
    user {
      __typename
      id
      name
    }
    ...MemberAvatar
  }
  ${memberAvatarFragment}
`
