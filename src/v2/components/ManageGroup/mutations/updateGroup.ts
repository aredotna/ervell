import { gql } from '@apollo/client'

import manageGroupFragment from 'v2/components/ManageGroup/fragments/manageGroup'

export default gql`
  mutation updateGroupMutation($id: ID!, $name: String, $description: String) {
    update_group(input: { id: $id, name: $name, description: $description }) {
      group {
        ...ManageGroup
      }
    }
  }
  ${manageGroupFragment}
`
