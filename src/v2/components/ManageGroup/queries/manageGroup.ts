import { gql } from '@apollo/client'

import manageGroupFragment from 'v2/components/ManageGroup/fragments/manageGroup'

export default gql`
  query ManageGroupQuery($id: ID!) {
    group(id: $id) {
      ...ManageGroup
    }
  }
  ${manageGroupFragment}
`
