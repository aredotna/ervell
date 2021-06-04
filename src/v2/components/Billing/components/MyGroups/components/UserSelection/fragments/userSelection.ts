import { gql } from '@apollo/client'

import groupOwnerFragment from 'v2/components/Billing/components/MyGroups/components/UserSelection/components/GroupOwner/fragments/groupOwner'
import userSelectorFragment from 'v2/components/Billing/components/MyGroups/components/UserSelection/components/UserSelector/fragments/userSelector'

export default gql`
  fragment UserSelection on Group {
    name
    owner: user {
      ...GroupOwner
    }
    users {
      ...UserSelector
    }
    subscription {
      __typename
      id
      users(status: ACTIVE) {
        __typename
        id
      }
    }
  }
  ${groupOwnerFragment}
  ${userSelectorFragment}
`
