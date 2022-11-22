import { gql } from '@apollo/client'

export const CommunityAPIQuery = gql`
  query CommunityAPIContents {
    channel(id: "selected-community-api-projects") {
      __typename
      id
      added_to_at(relative: true)
      href
      blokks(per: 4, sort_by: POSITION, direction: DESC) {
        __typename
        ... on Model {
          id
        }
        ... on Link {
          title
          image_url(size: LARGE)
          description(format: HTML)
          source_url
        }
      }
    }
  }
`
