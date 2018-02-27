import gql from 'graphql-tag';

import managedMemberFragment from 'react/components/ManagedMembers/components/ManagedMember/fragments/managedMember';

export default gql`
  fragment ManageGroup on Group {
    id
    name
    user {
      ...ManagedMember
    }
    users {
      ...ManagedMember
    }
  }
  ${managedMemberFragment}
`;
