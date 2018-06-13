import gql from 'graphql-tag';

import transferChannelFragment from 'react/components/ManageChannel/components/TransferChannel/fragments/transferChannelFragment';

export default gql`
  mutation initiateChannelTransferMutation($channel_id: ID!, $user_id: ID!){
    initiate_channel_transfer(input: { id: $channel_id, user_id: $user_id }) {
      channel_transfer_request {
        channel {
          ...TransferChannel
        }
      }
    }
  }
  ${transferChannelFragment}
`;
