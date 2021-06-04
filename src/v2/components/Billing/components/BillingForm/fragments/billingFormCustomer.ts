import { gql } from '@apollo/client'

import myCreditCardFragment from 'v2/components/MyCreditCard/fragments/myCreditCard'
import cancellationNoticeFragment from 'v2/components/Billing/components/CancellationNotice/fragments/cancellationNotice'

export default gql`
  fragment BillingFormCustomer on Customer {
    __typename
    id
    updated_at
    is_lifetime
    plan {
      __typename
      id
      term
    }
    default_credit_card {
      __typename
      id
    }

    is_canceled
    is_beneficiary
    patron {
      __typename
      id
      name
      hidden_email
    }
    current_period_end_at(format: "%D")

    ...MyCreditCard
    ...CancellationNotice
  }
  ${myCreditCardFragment}
  ${cancellationNoticeFragment}
`
