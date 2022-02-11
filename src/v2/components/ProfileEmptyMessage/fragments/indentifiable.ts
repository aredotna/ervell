import { gql } from '@apollo/client'

export default gql`
  fragment EmptyProfile on Identifiable {
    ... on Group {
      __typename
      id
      name
    }

    ... on User {
      __typename
      id
      name
    }
  }
`
