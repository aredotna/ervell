import { gql } from '@apollo/client'

import manageGroupFragment from 'v2/components/ManageGroup/fragments/manageGroup'

export default gql`
  mutation inviteGroupUser($id: ID!, $email: String!) {
    invite_group_users(input: { id: $id, emails: [$email] }) {
      group {
        ...ManageGroup
      }
    }
  }
  ${manageGroupFragment}
`
