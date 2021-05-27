import { gql } from '@apollo/client'

export default gql`
  fragment DefaultCreditCard on CreditCard {
    __typename
    id
    brand
    last4
    exp_year
    exp_month
  }
`
