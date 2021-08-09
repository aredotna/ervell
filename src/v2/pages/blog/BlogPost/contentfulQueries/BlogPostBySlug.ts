import { gql } from '@apollo/client'

export default gql`
  query BlogPostBySlugQuery($slug: String!) {
    blogPostCollection(where: { slug: $slug }) {
      items {
        __typename
        sys {
          id
        }
        slug
        title
        category
        blocksCollection {
          items {
            sys {
              id
            }
            blockUrl
            text {
              json
            }
          }
        }
        image {
          small: url(transform: { width: 250 })
          medium: url(transform: { width: 500 })
          large: url(transform: { width: 750 })
        }
        previewText
        displayDate
        author {
          name
          bio {
            json
          }
        }

        body {
          json
        }

        footnotes {
          json
        }

        epilogue {
          json
        }
      }
    }
  }
`
