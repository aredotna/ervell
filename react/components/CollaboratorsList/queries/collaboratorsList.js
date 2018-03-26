import gql from 'graphql-tag';

import collaboratorsListFragment from 'react/components/CollaboratorsList/fragments/collaboratorsList';

export default gql`
  query ChannelCollaboratorsQuery($channel_id: ID!) {
    channel(id: $channel_id) {
      ...CollaboratorsList
    }
  }
  ${collaboratorsListFragment}
`;
