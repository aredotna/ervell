import gql from 'graphql-tag';

import managedCollaboratorFragment from 'react/components/ManageCollaborators/components/ManagedCollaborator/fragments/managedCollaborator';

export default gql`
  fragment ManageCollaborators on Channel {
    id
    counts {
      collaborators
    }
    collaborators {
      ...ManagedCollaborator
    }
  }
  ${managedCollaboratorFragment}
`;
