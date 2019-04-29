import gql from 'graphql-tag'

import privateBlocksMeterFragment from 'v2/components/PrivateBlocksMeter/fragments/privateBlocksMeter'

export default gql`
  fragment PlanSelection on Me {
    non_premium_private_connections_limit
    customer {
      __typename
      id
      is_canceled
      is_lifetime
      is_beneficiary
      plan {
        __typename
        id
      }
    }
    ...PrivateBlocksMeter
  }
  ${privateBlocksMeterFragment}
`
