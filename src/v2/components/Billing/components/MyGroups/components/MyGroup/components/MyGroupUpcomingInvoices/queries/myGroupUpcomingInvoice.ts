import { gql } from '@apollo/client'

export default gql`
  query MyGroupUpcomingInvoice($id: ID!) {
    group(id: $id) {
      __typename
      id
      upcoming_invoice {
        __typename
        subtotal
        total
        next_payment_attempt_at(format: "%B %-d, %Y")
      }

      subscription {
        __typename
        id
        plan_id
        is_canceled
      }
    }

    me {
      __typename
      id
      customer {
        __typename
        id
        address {
          __typename
          line1
          line2
          country
          city
          state
          postal_code
        }

        default_payment_method {
          __typename
          id
          card {
            __typename
            last4
            brand
            exp_month
            exp_year
          }
        }
      }
    }
  }
`
