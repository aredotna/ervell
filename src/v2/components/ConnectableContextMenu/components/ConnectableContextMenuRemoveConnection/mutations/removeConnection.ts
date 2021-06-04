import { gql } from '@apollo/client'

export const removeConnectionMutation = gql`
  mutation RemoveConnectionMutation(
    $channelId: ID!
    $connectableId: ID!
    $connectableType: BaseConnectableTypeEnum!
  ) {
    remove_connection(
      input: {
        channel_id: $channelId
        connectable_id: $connectableId
        connectable_type: $connectableType
      }
    ) {
      clientMutationId
      status
    }
  }
`
