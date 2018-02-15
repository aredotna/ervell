import gql from 'graphql-tag';

import collaboratorLinkFragment from 'react/components/CollaboratorsList/fragments/collaboratorLink';

export default gql`
  query ChannelCollaboratorsQuery($channel_id: ID!) {
    channel(id: $channel_id) {
      id
      can {
        manage_collaborators
      }
      collaborators {
        ...CollaboratorLink
      }
    }
  }
  ${collaboratorLinkFragment}
`;
