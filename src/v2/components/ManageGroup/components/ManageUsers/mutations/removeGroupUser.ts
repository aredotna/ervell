import { gql } from '@apollo/client'

import manageGroupFragment from 'v2/components/ManageGroup/fragments/manageGroup'

export default gql`
  mutation removeGroupUser($id: ID!, $user_id: ID!) {
    remove_group_users(input: { id: $id, user_ids: [$user_id] }) {
      group {
        ...ManageGroup
      }
    }
  }
  ${manageGroupFragment}
`
