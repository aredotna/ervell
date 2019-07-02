import gql from 'graphql-tag'

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
