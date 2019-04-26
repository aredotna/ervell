import gql from 'graphql-tag'

import myGroupsFragment from 'v2/components/Billing/components/MyGroups/fragments/myGroups'

export default gql`
  fragment GroupBilling on Me {
    __typename
    id
    ...MyGroups
  }
  ${myGroupsFragment}
`
