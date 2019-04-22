import gql from 'graphql-tag';

import manageGroupFragment from 'react/components/ManageGroup/fragments/manageGroup';

export default gql`
  mutation addGroupUser($id: ID!, $user_id: ID!) {
    add_group_users(input: { id: $id, user_ids: [$user_id] }) {
      group {
        ...ManageGroup
      }
    }
  }
  ${manageGroupFragment}
`;
