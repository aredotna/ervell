import { gql } from '@apollo/client'

export default gql`
  query PrimarySearchGroupCount($id: ID!) {
    group(id: $id) {
      __typename
      id
      counts {
        channels
        users
      }
    }
  }
`
