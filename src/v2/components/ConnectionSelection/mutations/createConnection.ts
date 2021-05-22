import { gql } from '@apollo/client'

import selectableChannelFragment from 'v2/components/ConnectionSelectionList/components/SelectableChannel/fragments/selectableChannel'

export default gql`
  mutation createConnectionMutation(
    $channel_ids: [ID]!
    $connectable_id: ID!
    $connectable_type: BaseConnectableTypeEnum!
  ) {
    __typename
    create_connection(
      input: {
        channel_ids: $channel_ids
        connectable_type: $connectable_type
        connectable_id: $connectable_id
      }
    ) {
      __typename
      konnectable {
        ...SelectableChannel
      }
    }
  }
  ${selectableChannelFragment}
`
