import { gql } from '@apollo/client'

export const EssaysCommunityQuery = gql`
  query EssaysCommunity {
    blogPostCollection(limit: 4, order: sys_firstPublishedAt_DESC) {
      items {
        slug
        category
        title
        image {
          url(transform: { width: 170, height: 106, resizeStrategy: FILL })
        }
      }
    }
    walkthroughCollection(limit: 1) {
      limit
      items {
        nextEvent
        details {
          json
        }
      }
    }
  }
`
