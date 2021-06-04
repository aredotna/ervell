import { gql } from '@apollo/client'

import userAvatarFragment from 'v2/components/UserAvatar/fragments/userAvatar'

export default gql`
  fragment CancelPremiumUserSelector on User {
    __typename
    id
    name
    hidden_email
    is_premium
    is_canceled
    can {
      cancel_premium
    }
    ...UserAvatar
  }
  ${userAvatarFragment}
`
