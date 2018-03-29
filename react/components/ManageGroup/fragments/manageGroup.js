import gql from 'graphql-tag';

import managedMemberFragment from 'react/components/ManagedMembers/components/ManagedMember/fragments/managedMember';

export default gql`
  fragment ManageGroup on Group {
    id
    name
    owner: user {
      ...ManagedMember
    }
    memberships {
      id
      member: user {
        ...ManagedMember
      }
      can {
        manage
      }
    }
    can {
      manage
      manage_users
    }
  }
  ${managedMemberFragment}
`;
