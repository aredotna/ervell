import { gql } from '@apollo/client'

import billingFormFragment from 'v2/components/Billing/components/BillingForm/fragments/billingForm'

export default gql`
  mutation CancelPremiumSubscription {
    cancel_premium_subscription(input: {}) {
      me {
        ...BillingForm
      }
    }
  }
  ${billingFormFragment}
`
