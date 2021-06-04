import { gql } from '@apollo/client'

export default gql`
  query ToolsPage {
    me {
      __typename
      id
      post_address
    }
  }
`
