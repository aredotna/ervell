import { gql } from '@apollo/client'

import transferChannelFragment from 'v2/components/ManageChannel/components/TransferChannel/fragments/transferChannelFragment'

export default gql`
  mutation cancelChannelTransferMutation($channel_id: ID!) {
    cancel_channel_transfer(input: { id: $channel_id }) {
      channel {
        ...TransferChannel
      }
    }
  }
  ${transferChannelFragment}
`
