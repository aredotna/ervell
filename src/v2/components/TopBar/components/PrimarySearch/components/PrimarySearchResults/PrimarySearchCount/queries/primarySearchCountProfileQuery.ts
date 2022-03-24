import { gql } from '@apollo/client'

export default gql`
  query PrimarySearchProfileCount($id: ID!) {
    user(id: $id) {
      __typename
      id
      counts {
        channels
        blocks
      }
    }
  }
`
