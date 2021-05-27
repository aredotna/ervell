import { gql } from '@apollo/client'

import myGroupCheckoutFragment from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout/fragments/myGroupCheckout'
import groupFragment from 'v2/components/Billing/components/MyGroups/components/MyGroup/fragments/myGroup'

export default gql`
  fragment MyGroups on Me {
    ...MyGroupCheckout
    groups(page: 1, per: 50, type: OWNER) {
      __typename
      id
      counts {
        users
      }
      ...MyGroup
    }
  }
  ${myGroupCheckoutFragment}
  ${groupFragment}
`
