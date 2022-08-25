import { gql } from '@apollo/client'

export default gql`
  query AdvancedSearchGroupCount($id: ID!) {
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
