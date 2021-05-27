import { gql } from '@apollo/client'

import memberAvatarFragment from 'v2/components/MemberAvatar/fragments/memberAvatar'
import cancelPremiumUserSelectionFragment from 'v2/components/Billing/components/MyGroups/components/CancelPremiumUserSelection/fragments/cancelPremiumUserSelection'

export default gql`
  fragment MyGroupHeader on Group {
    __typename
    id
    name
    ...MemberAvatar
    ...CancelPremiumUserSelection
  }
  ${memberAvatarFragment}
  ${cancelPremiumUserSelectionFragment}
`
