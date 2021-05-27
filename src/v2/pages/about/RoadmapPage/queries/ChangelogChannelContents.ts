import { gql } from '@apollo/client'

export const ChangelogChannelContents = gql`
  query ChangelogChannelContents($id: ID!) {
    channel(id: $id) {
      __typename
      id
      added_to_at(format: "%B %d, %Y")
      href
      blokks(per: 4, sort_by: POSITION, direction: DESC) {
        __typename
        ... on Model {
          id
          created_at(format: "%B %d, %Y")
        }
        ... on ConnectableInterface {
          href
          title
        }
        ... on Text {
          content(format: HTML)
        }
      }
    }
  }
`
