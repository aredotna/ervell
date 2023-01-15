import { gql } from '@apollo/client'
import customerPaymentMethodsFragment from '../fragments/customerPaymentMethodsFragment'

export default gql`
  mutation ChangeDefaultPaymentMethod($default_payment_method_id: String!) {
    update_customer(
      input: { default_payment_method_id: $default_payment_method_id }
    ) {
      customer {
        __typename
        id
        ...CustomerPaymentMethodsFragment
      }
    }
  }
  ${customerPaymentMethodsFragment}
`
