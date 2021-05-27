import { gql } from '@apollo/client'

import avatarFragment from 'v2/components/UserAvatar/fragments/userAvatar'

export default gql`
  fragment Contact on UserInterface {
    ... on User {
      __typename
      id
    }
    name
    ...UserAvatar
  }
  ${avatarFragment}
`
