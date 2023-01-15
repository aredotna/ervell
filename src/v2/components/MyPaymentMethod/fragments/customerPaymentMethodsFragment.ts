import { gql } from '@apollo/client'

export default gql`
  fragment CustomerPaymentMethodsFragment on Customer {
    __typename
    id
    default_payment_method {
      __typename
      id
    }
    payment_methods {
      __typename
      id
      card {
        id
        brand
        last4
        exp_year
        exp_month
      }
    }
  }
`
