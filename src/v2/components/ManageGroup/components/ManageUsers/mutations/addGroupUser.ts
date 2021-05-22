import { gql } from '@apollo/client'

import manageGroupFragment from 'v2/components/ManageGroup/fragments/manageGroup'

export default gql`
  mutation addGroupUser($id: ID!, $user_id: ID!) {
    add_group_users(input: { id: $id, user_ids: [$user_id] }) {
      group {
        ...ManageGroup
      }
    }
  }
  ${manageGroupFragment}
`
