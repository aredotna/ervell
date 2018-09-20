import gql from 'graphql-tag';

import manageGroupFragment from 'react/components/ManageGroup/fragments/manageGroup';

export default gql`
  mutation inviteGroupUser($id: ID!, $email: String!) {
    invite_group_users(input: { id: $id, emails: [$email] }) {
      group {
        ...ManageGroup
      }
    }
  }
  ${manageGroupFragment}
`;
