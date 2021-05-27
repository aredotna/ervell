import { gql } from '@apollo/client'

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
              small: url(transform: { width: 670 })
              medium: url(transform: { width: 1340 })
              large: url(transform: { width: 2010 })
              description
            }
          }
        }
      }
    }
  }
`
