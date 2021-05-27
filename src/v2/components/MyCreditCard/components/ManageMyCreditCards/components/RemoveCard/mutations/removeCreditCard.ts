import { gql } from '@apollo/client'

import myCreditCardFragment from 'v2/components/MyCreditCard/fragments/myCreditCard'

export default gql`
  mutation RemoveCreditCard($id: String!) {
    remove_credit_card(input: { id: $id }) {
      customer {
        ...MyCreditCard
      }
    }
  }
  ${myCreditCardFragment}
`
