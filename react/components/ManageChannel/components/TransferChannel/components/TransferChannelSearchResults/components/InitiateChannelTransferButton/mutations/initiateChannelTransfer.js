import gql from 'graphql-tag';

import transferChannelFragment from 'react/components/ManageChannel/components/TransferChannel/fragments/transferChannelFragment';

export default gql`
  mutation initiateChannelTransferMutation($channel_id: ID!, $owner_id: ID!, $owner_type: ChannelOwnerTypeEnum!){
    initiate_channel_transfer(input: { id: $channel_id, owner_id: $owner_id, owner_type: $owner_type }) {
      channel_transfer_request {
        channel {
          ...TransferChannel
        }
      }
    }
  }
  ${transferChannelFragment}
`;
