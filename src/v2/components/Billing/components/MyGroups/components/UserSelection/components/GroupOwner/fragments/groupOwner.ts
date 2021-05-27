import { gql } from '@apollo/client'

import userAvatarFragment from 'v2/components/UserAvatar/fragments/userAvatar'

export default gql`
  fragment GroupOwner on User {
    __typename
    id
    name
    hidden_email
    is_premium
    ...UserAvatar
  }
  ${userAvatarFragment}
`
