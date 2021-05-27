import { gql } from '@apollo/client'

export default gql`
  mutation moveConnectableMutation(
    $channel_id: ID!
    $connectable: ConnectableInput!
    $action: Movements
    $insert_at: Int
  ) {
    move_connectable_mutation(
      input: {
        channel_id: $channel_id
        connectable: $connectable
        action: $action
        insert_at: $insert_at
      }
    ) {
      channel {
        __typename
        id
      }
    }
  }
`
