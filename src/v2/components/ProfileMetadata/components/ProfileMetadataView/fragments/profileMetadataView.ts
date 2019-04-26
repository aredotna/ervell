import gql from 'graphql-tag'

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
