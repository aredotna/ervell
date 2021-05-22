import { gql } from '@apollo/client'

import userAvatarFragment from 'v2/components/UserAvatar/fragments/userAvatar'

export default gql`
  fragment PendingGroupUser on User {
    id
    name
    href
    hidden_email
    ...UserAvatar
  }
  ${userAvatarFragment}
`
