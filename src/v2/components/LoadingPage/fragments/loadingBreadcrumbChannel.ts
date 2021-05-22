import { gql } from '@apollo/client'

export default gql`
  fragment LoadingBreadcrumbChannel on Channel {
    __typename
    id
    label: title
    owner {
      ... on User {
        __typename
        id
        name
      }
      ... on Group {
        __typename
        id
        name
      }
    }
  }
`
