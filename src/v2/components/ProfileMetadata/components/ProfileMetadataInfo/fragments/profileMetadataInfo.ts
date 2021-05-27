import { gql } from '@apollo/client'

export default gql`
  fragment ProfileMetadataInfo on Identifiable {
    __typename
    ... on User {
      href
      about: bio(format: HTML)
      counts {
        followers
        following
        groups
      }
    }
    ... on Group {
      href
      about: description(format: HTML)
      user {
        name
        href
      }
      counts {
        followers
      }
    }
  }
`
