import { gql } from '@apollo/client'

export default gql`
  query AdvancedSearchChannelCount($id: ID!) {
    channel(id: $id) {
      __typename
      id
      counts {
        blocks
      }
    }
  }
`
