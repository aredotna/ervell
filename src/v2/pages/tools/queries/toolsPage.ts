import gql from 'graphql-tag'

export default gql`
  query ToolsPage {
    me {
      __typename
      id
      post_address
    }
  }
`
