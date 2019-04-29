import gql from 'graphql-tag'

export default gql`
  fragment BlokkOverlay on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      source {
        url
      }
    }
  }
`
