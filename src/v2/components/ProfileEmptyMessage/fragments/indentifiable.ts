import { gql } from '@apollo/client'

export default gql`
  fragment EmptyProfile on Identifiable {
    ... on Group {
      __typename
      id
    }

    ... on User {
      __typename
      id
    }
  }
`
