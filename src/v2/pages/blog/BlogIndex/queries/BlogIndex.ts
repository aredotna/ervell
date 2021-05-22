import { gql } from '@apollo/client'

export default gql`
  query BlogIndexQuery {
    blogPostCollection(order: displayDate_DESC) {
      __typename
      total
      items {
        __typename
        slug
        title
        category
        image {
          small: url(transform: { width: 250 })
          medium: url(transform: { width: 500 })
          large: url(transform: { width: 750 })
        }
        previewText
        displayDate
        author {
          name
        }
      }
    }
  }
`
