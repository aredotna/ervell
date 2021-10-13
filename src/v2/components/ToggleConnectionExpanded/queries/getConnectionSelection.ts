import { gql } from '@apollo/client'

export default gql`
  query GetConnectionSelection($id: ID!) {
    connection(id: $id) {
      __typename
      id
      selected
    }
  }
`
