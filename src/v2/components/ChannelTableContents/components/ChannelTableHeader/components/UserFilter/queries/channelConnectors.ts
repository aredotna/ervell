import { gql } from '@apollo/client'

export default gql`
  query ChannelTableConnectors($id: ID!, $q: String) {
    channel(id: $id) {
      __typename
      id
      connectors(q: $q, per: 6) {
        id
        name
      }
    }
  }
`
