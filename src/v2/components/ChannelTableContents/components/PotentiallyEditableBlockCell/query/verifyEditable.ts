import { gql } from '@apollo/client'

export default gql`
  query VerifyEditableBlock($id: ID!) {
    blokk(id: $id) {
      __typename
      ... on Model {
        id
      }
      ... on Block {
        can {
          manage
        }
      }
    }
  }
`
