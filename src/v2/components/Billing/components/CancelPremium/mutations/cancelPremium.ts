import { gql } from '@apollo/client'

import billingFormFragment from 'v2/components/Billing/components/BillingForm/fragments/billingForm'

export default gql`
  mutation CancelPremium {
    cancel_premium_subscription(input: {}) {
      me {
        ...BillingForm
      }
    }
  }
  ${billingFormFragment}
`
