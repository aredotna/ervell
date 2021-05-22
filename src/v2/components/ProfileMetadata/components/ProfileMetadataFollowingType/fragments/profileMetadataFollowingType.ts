import { gql } from '@apollo/client'

export default gql`
  fragment ProfileMetadataFollowingType on Identifiable {
    __typename
    ... on User {
      counts {
        following_channels
        following_users
        following_groups
      }
    }
  }
`
