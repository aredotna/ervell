import { gql } from '@apollo/client'

import myPaymentMethodFragment from 'v2/components/MyPaymentMethod/fragments/customerPaymentMethodsFragment'

export default gql`
  fragment MyGroupCheckout on Me {
    __typename
    id
    customer {
      __typename
      id
      ...CustomerPaymentMethodsFragment
    }
  }
  ${myPaymentMethodFragment}
`
