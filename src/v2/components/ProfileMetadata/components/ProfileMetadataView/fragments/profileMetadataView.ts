import { gql } from '@apollo/client'

export default gql`
  fragment ProfileMetadataView on Identifiable {
    ... on User {
      href
    }
    ... on Group {
      href
    }
  }
`
