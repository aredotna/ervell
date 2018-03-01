import gql from 'graphql-tag';

import managedMemberFragment from 'react/components/ManagedMembers/components/ManagedMember/fragments/managedMember';
import collaboratorsListFragment from 'react/components/CollaboratorsList/fragments/collaboratorsList';

export default gql`
  fragment ManageCollaborators on Channel {
    __typename
    id
    counts {
      collaborators
    }
    collaborators: members {
      ...ManagedMember
    }
    ...CollaboratorsList
  }
  ${managedMemberFragment}
  ${collaboratorsListFragment}
`;
