import gql from 'graphql-tag';

import managedCollaboratorFragment from 'react/components/ManageCollaborators/components/ManagedCollaborator/fragments/managedCollaborator';
import collaboratorsListFragment from 'react/components/CollaboratorsList/fragments/collaboratorsList';

export default gql`
  fragment ManageCollaborators on Channel {
    id
    counts {
      collaborators
    }
    collaborators: members {
      ...ManagedCollaborator
    }
    ...CollaboratorsList
  }
  ${managedCollaboratorFragment}
  ${collaboratorsListFragment}
`;
