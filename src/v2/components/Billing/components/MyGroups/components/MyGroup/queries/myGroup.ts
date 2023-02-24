import { gql } from '@apollo/client'

import MyGroupFragment from 'v2/components/Billing/components/MyGroups/components/MyGroup/fragments/myGroup'

export default gql`
  query MyGroup($id: ID!) {
    group(id: $id) {
      __typename
      id
      ...MyGroupFragment
    }
  }
  ${MyGroupFragment}
`
