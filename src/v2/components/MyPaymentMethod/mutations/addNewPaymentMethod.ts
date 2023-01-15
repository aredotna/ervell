import { gql } from '@apollo/client'
import customerPaymentMethodsFragment from '../fragments/customerPaymentMethodsFragment'

export default gql`
  mutation AddPaymentMethod($token: String!) {
    add_payment_method(input: { token: $token, default_source: true }) {
      customer {
        __typename
        id
        ...CustomerPaymentMethodsFragment
      }
    }
  }
  ${customerPaymentMethodsFragment}
`
