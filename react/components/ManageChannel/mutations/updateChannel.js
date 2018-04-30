import gql from 'graphql-tag';

import manageChannelFragment from 'react/components/ManageChannel/fragments/manageChannel';

export default gql`
  mutation updateChannelMutation($id: ID!, $title: String!) {
    update_channel(input: { id: $id, title: $title }) {
      channel {
        ...ManageChannel
      }
    }
  }
  ${manageChannelFragment}
`;
