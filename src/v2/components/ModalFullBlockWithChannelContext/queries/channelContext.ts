import { gql } from '@apollo/client'

export default gql`
  query ChannelContext($id: ID!) {
    channel(id: $id) {
      __typename
      id
      skeleton(type: BLOCK) {
        __typename
        id
        type
      }
    }
  }
`
