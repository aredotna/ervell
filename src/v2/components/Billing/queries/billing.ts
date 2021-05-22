import { gql } from '@apollo/client'

import billingFragment from 'v2/components/Billing/fragments/billing'

export default gql`
  query Billing {
    me {
      __typename
      id
      ...Billing
    }
  }
  ${billingFragment}
`
