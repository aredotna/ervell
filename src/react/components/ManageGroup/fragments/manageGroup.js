import gql from 'graphql-tag';

import deleteGroupFragment from 'react/components/ManageGroup/components/DeleteGroup/fragments/deleteGroup';
import manageUsersFragment from 'react/components/ManageGroup/components/ManageUsers/fragments/manageUsers';

export default gql`
  fragment ManageGroup on Group {
    id
    name
    href
    description(format: MARKDOWN)
    can {
      manage
      manage_users
    }
    ...DeleteGroup
    ...ManageUsers
  }
  ${deleteGroupFragment}
  ${manageUsersFragment}
`;
