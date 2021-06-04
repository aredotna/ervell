import { gql } from '@apollo/client'

import myCreditCardFragment from 'v2/components/MyCreditCard/fragments/myCreditCard'

export default gql`
  mutation AddCreditCard($token: String!) {
    add_credit_card(input: { token: $token, default_source: true }) {
      customer {
        __typename
        id
        ...MyCreditCard
      }
    }
  }
  ${myCreditCardFragment}
`
