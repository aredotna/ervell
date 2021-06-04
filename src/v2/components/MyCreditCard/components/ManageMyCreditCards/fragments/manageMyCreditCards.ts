import { gql } from '@apollo/client'

export default gql`
  fragment ManageMyCreditCards on Customer {
    __typename
    id
    default_credit_card {
      __typename
      id
    }
    credit_cards {
      __typename
      id
      brand
      last4
      exp_year
      exp_month
    }
  }
`
