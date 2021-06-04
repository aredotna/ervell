import { gql } from '@apollo/client'

export default gql`
  fragment ProfileMetadataFilter on Identifiable {
    __typename
    ... on User {
      id
      name
    }
    ... on Group {
      id
      name
    }
  }
`
