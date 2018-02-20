import gql from 'graphql-tag';

import manageCollaboratorsFragment from 'react/components/ManageCollaborators/fragments/manageCollaborators';

export default gql`
  mutation addCollaborator($user_id: ID!, $channel_id: ID!){
    add_collaborators(input: { user_ids: [$user_id], channel_id: $channel_id }) {
      channel {
        ...ManageCollaborators
      }
    }
  }
  ${manageCollaboratorsFragment}
`;
