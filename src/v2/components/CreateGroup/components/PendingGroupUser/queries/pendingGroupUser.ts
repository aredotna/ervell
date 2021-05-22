import { gql } from '@apollo/client'

import pendingGroupUserFragment from 'v2/components/CreateGroup/components/PendingGroupUser/fragments/pendingGroupUser'

export default gql`
  query pendingGroupUser($id: ID!) {
    user(id: $id) {
      ...PendingGroupUser
    }
  }
  ${pendingGroupUserFragment}
`
