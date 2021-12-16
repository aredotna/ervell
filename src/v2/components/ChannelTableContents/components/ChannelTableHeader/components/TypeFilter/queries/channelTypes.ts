import { gql } from '@apollo/client'

export default gql`
  query ChannelTableTypes($id: ID!) {
    channel(id: $id) {
      __typename
      id
      types
    }
  }
`
