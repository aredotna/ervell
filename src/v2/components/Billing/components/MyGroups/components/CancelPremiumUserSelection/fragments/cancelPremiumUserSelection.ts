import { gql } from '@apollo/client'

import cancelPremiumUserSelectorFragment from 'v2/components/Billing/components/MyGroups/components/CancelPremiumUserSelection/components/CancelPremiumUserSelector/fragments/cancelPremiumUserSelector'

export default gql`
  fragment CancelPremiumUserSelection on Group {
    __typename
    id
    name
    user {
      ...CancelPremiumUserSelector
    }
    users {
      ...CancelPremiumUserSelector
    }
  }
  ${cancelPremiumUserSelectorFragment}
`
