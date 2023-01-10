import { gql } from '@apollo/client'

export default gql`
  fragment UpcomingInvoice on Customer {
    upcoming_invoice {
      __typename
      subtotal
      total
      next_payment_attempt_at(format: "%D")
    }

    default_payment_method {
      __typename
      id
      card {
        __typename
        last4
        brand
      }
    }
  }
`
