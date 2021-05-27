import { gql } from '@apollo/client'

export default gql`
  fragment Followable on FollowableType {
    __typename
    ... on User {
      id
      is_followed
      counts {
        followers
      }
    }
    ... on Channel {
      id
      is_followed
      counts {
        followers
      }
    }

    ... on Group {
      id
      is_followed
      counts {
        followers
      }
    }
  }
`
