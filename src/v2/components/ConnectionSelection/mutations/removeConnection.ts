import { gql } from '@apollo/client'

export default gql`
  mutation removeConnectionMutation(
    $channel_id: ID!
    $connectable_id: ID!
    $connectable_type: BaseConnectableTypeEnum!
  ) {
    remove_connection(
      input: {
        channel_id: $channel_id
        connectable_type: $connectable_type
        connectable_id: $connectable_id
      }
    ) {
      clientMutationId
      status
    }
  }
`
