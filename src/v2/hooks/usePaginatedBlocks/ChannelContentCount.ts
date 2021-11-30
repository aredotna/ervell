import { gql } from '@apollo/client'

export const CHANNEL_CONTENT_COUNT = gql`
  query ChannelContentCount($id: ID!) {
    channel(id: $id) {
      id
      counts {
        contents
      }
    }
  }
`
