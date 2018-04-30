import gql from 'graphql-tag';

import manageChannelFragment from 'react/components/ManageChannel/fragments/manageChannel';

export default gql`
  mutation updateChannelMutation($id: ID!, $title: String!, $description: String!, $visibility: ChannelVisibility) {
    update_channel(input: { id: $id, title: $title, description: $description, visibility: $visibility }) {
      channel {
        ...ManageChannel
      }
    }
  }
  ${manageChannelFragment}
`;
