import { gql } from '@apollo/client'
import customerPaymentMethodsFragment from '../fragments/customerPaymentMethodsFragment'

export default gql`
  query CustomerPaymentMethods {
    me {
      __typename
      id
      customer {
        ...CustomerPaymentMethodsFragment
      }
    }
  }
  ${customerPaymentMethodsFragment}
`
