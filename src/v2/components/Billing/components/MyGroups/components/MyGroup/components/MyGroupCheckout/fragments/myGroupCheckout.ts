import { gql } from '@apollo/client'

import myCreditCardFragment from 'v2/components/MyCreditCard/fragments/myCreditCard'

export default gql`
  fragment MyGroupCheckout on Me {
    __typename
    id
    customer {
      __typename
      id
      ...MyCreditCard
    }
  }
  ${myCreditCardFragment}
`
