import gql from 'graphql-tag'

import memberAvatarFragment from 'v2/components/MemberAvatar/fragments/memberAvatar'

export default gql`
  fragment MyGroupLink on Group {
    __typename
    id
    name
    href
    visibility
    ...MemberAvatar
  }
  ${memberAvatarFragment}
`
