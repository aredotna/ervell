import { gql } from '@apollo/client'

export default gql`
  fragment ProfileMetadataActions on Identifiable {
    __typename
    ... on User {
      id
      name
      can {
        follow
        manage
        message
      }
    }
    ... on Group {
      id
      is_upgradeable
      can {
        follow
        manage
        manage_users
      }
    }
  }
`
