import { gql } from '@apollo/client'

import billingFormFragment from 'v2/components/Billing/components/BillingForm/fragments/billingForm'
import myHeaderFragment from 'v2/components/Billing/components/MyHeader/fragments/myHeader'

export default gql`
  fragment Billing on Me {
    __typename
    id
    ...BillingForm
    ...MyHeader
  }
  ${billingFormFragment}
  ${myHeaderFragment}
`
