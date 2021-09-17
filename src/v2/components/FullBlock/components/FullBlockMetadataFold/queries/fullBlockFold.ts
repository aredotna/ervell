import { gql } from '@apollo/client'

export default gql`
  query FullBlockFold($id: ID!) {
    block: blokk(id: $id) {
      __typename
      ... on Model {
        id
      }
      ... on Block {
        counts {
          __typename
          public_channels
          private_channels: private_accessible_channels
          comments
        }

        can {
          manage
          comment
        }
      }
    }
  }
`
