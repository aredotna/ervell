import { gql } from '@apollo/client'

import totalBlocksMeterFragment from 'v2/components/TotalBlocksMeter/fragments/totalBlocksMeter'

export default gql`
  fragment PlanSelection on Me {
    non_premium_private_connections_limit
    non_premium_connections_limit
    customer {
      __typename
      id
      is_canceled
      is_lifetime
      can_select_lifetime
      is_beneficiary
      plan {
        __typename
        id
      }
    }
    ...TotalBlocksMeter
  }
  ${totalBlocksMeterFragment}
`
