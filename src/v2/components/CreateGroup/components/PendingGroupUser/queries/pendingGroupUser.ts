import gql from 'graphql-tag';

import pendingGroupUserFragment from 'v2/components/CreateGroup/components/PendingGroupUser/fragments/pendingGroupUser';

export default gql`
  query pendingGroupUser($id: ID!) {
    user(id: $id) {
      ...PendingGroupUser
    }
  }
  ${pendingGroupUserFragment}
`;
