import { gql } from '@apollo/client'

import billingFormFragment from 'v2/components/Billing/components/BillingForm/fragments/billingForm'

export default gql`
  mutation DowngradeToLifetime {
    downgrade_to_lifetime(input: {}) {
      me {
        ...BillingForm
      }
    }
  }
  ${billingFormFragment}
`
