import { gql } from '@apollo/client'

export default gql`
  fragment ProfileAvatar on Identifiable {
    ... on Group {
      __typename
      id
      avatar(size: UNCROPPED)
      can {
        update
      }
    }
  }
`
