import { gql } from '@apollo/client'

export default gql`
  query PrimarySearchChannelCount($id: ID!) {
    channel(id: $id) {
      __typename
      id
      counts {
        blocks
      }
    }
  }
`
