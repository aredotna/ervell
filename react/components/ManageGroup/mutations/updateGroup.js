import gql from 'graphql-tag';

import manageGroupFragment from 'react/components/ManageGroup/fragments/manageGroup';

export default gql`
  mutation updateGroupMutation($id: ID!, $name: String, $description: String) {
    update_group(input: { id: $id, name: $name, description: $description }) {
      group {
        ...ManageGroup
      }
    }
  }
  ${manageGroupFragment}
`;
