import gql from 'graphql-tag';

import collaboratorLinkFragment from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators/fragments/collaboratorLink';

export default gql`
  fragment CollaboratorsList on Channel {
    __typename
    id
    can {
      manage_collaborators
    }
    collaborators: members {
      ...CollaboratorLink
    }
  }
  ${collaboratorLinkFragment}
`;
