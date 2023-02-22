import { gql } from '@apollo/client'

import myGroupCheckoutFragment from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout/fragments/myGroupCheckout'

export default gql`
  query GroupBilling {
    me {
      __typename
      id
      ...MyGroupCheckout
      groups(page: 1, per: 50, type: OWNER) {
        __typename
        id
      }
    }
  }
  ${myGroupCheckoutFragment}
`
