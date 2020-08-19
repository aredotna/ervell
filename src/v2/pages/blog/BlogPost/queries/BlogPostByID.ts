import gql from 'graphql-tag'

export default gql`
  query BlogPostAssetsQuery($id: String!) {
    blogPost(id: $id) {
      body {
        links {
          assets {
            block {
              sys {
                id
              }
              url
              description
            }
          }
        }
      }
    }
  }
`
