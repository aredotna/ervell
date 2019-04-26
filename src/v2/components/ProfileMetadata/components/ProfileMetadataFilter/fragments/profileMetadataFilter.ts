import gql from 'graphql-tag'

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
