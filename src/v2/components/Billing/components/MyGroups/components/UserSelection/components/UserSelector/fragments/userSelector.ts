import { gql } from '@apollo/client'

import userAvatarFragment from 'v2/components/UserAvatar/fragments/userAvatar'

export default gql`
  fragment UserSelector on User {
    __typename
    id
    name
    hidden_email
    is_premium
    is_canceled
    is_upgradeable
    is_approaching_either_connections_limit
    is_exceeding_either_connections_limit
    can {
      cancel_premium
    }
    ...UserAvatar
  }
  ${userAvatarFragment}
`
