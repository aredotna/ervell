import { gql } from '@apollo/client'

import deleteGroupFragment from 'v2/components/ManageGroup/components/DeleteGroup/fragments/deleteGroup'
import manageUsersFragment from 'v2/components/ManageGroup/components/ManageUsers/fragments/manageUsers'

export default gql`
  fragment ManageGroup on Group {
    id
    name
    href
    description(format: MARKDOWN)
    invite {
      code
      href(absolute: true)
    }
    can {
      manage
      manage_users
    }
    ...DeleteGroup
    ...ManageUsers
  }
  ${deleteGroupFragment}
  ${manageUsersFragment}
`
