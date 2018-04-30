import gql from 'graphql-tag';

import manageChannelFragment from 'react/components/ManageChannel/fragments/manageChannel';

export default gql`
  mutation updateChannelMutation($id: ID!, $title: String!, $description: String!) {
    update_channel(input: { id: $id, title: $title, description: $description }) {
      channel {
        ...ManageChannel
      }
    }
  }
  ${manageChannelFragment}
`;
