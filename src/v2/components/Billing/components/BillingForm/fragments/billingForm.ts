import { gql } from '@apollo/client'

import planSelectionFragment from 'v2/components/Billing/components/PlanSelection/fragments/planSelection'
import billingFormCustomerFragment from 'v2/components/Billing/components/BillingForm/fragments/billingFormCustomer'

export default gql`
  fragment BillingForm on Me {
    __typename
    id
    ...PlanSelection
    customer {
      ...BillingFormCustomer
    }
  }
  ${planSelectionFragment}
  ${billingFormCustomerFragment}
`
