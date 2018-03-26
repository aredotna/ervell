import gql from 'graphql-tag';

import collaboratorLinkFragment from 'react/components/CollaboratorsList/fragments/collaboratorLink';

export default gql`
  fragment CollaboratorsList on Channel {
    __typename
    id: slug
    can {
      manage_collaborators
    }
    collaborators: members {
      ...CollaboratorLink
    }
  }
  ${collaboratorLinkFragment}
`;
