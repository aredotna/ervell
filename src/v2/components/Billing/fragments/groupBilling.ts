import { gql } from '@apollo/client'

import myGroupsFragment from 'v2/components/Billing/components/MyGroups/fragments/myGroups'

export default gql`
  fragment GroupBilling on Me {
    __typename
    id
    ...MyGroups
  }
  ${myGroupsFragment}
`
