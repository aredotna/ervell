import { gql } from '@apollo/client'

export default gql`
  fragment SelectableChannel on Channel {
    __typename
    id
    title
    visibility
    owner {
      __typename
      ... on Group {
        id
        name
        visibility
      }
      ... on User {
        id
        name
      }
    }
  }
`
