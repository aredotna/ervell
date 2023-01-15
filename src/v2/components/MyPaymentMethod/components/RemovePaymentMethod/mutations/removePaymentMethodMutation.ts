import { gql } from '@apollo/client'
import customerPaymentMethodsFragment from 'v2/components/MyPaymentMethod/fragments/customerPaymentMethodsFragment'

export default gql`
  mutation RemovePaymentMethod($id: String!) {
    remove_credit_card(input: { id: $id }) {
      customer {
        ...CustomerPaymentMethodsFragment
      }
    }
  }
  ${customerPaymentMethodsFragment}
`
