import { gql } from '@apollo/client'

export const CHANNEL_CONTENT_COUNT = gql`
  query ChannelContentCount(
    $id: ID!
    $type: ConnectableTypeEnum
    $user_id: ID
  ) {
    channel(id: $id) {
      id
      counts {
        contents(type: $type, user_id: $user_id)
      }
    }
  }
`
