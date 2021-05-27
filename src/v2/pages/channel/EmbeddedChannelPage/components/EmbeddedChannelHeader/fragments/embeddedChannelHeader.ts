import { gql } from '@apollo/client'

export const embeddedChannelHeaderFragment = gql`
  fragment EmbeddedChannelHeader on Channel {
    __typename
    id
    title
    truncatedTitle: title(truncate: 35)
    href(absolute: true)
    visibility
    owner {
      __typename
      ... on User {
        id
        name
        href(absolute: true)
      }
      ... on Group {
        id
        name
        href(absolute: true)
      }
    }
  }
`
