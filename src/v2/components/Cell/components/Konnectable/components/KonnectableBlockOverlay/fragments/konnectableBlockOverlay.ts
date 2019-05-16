import gql from 'graphql-tag'

export default gql`
  fragment KonnectableBlockOverlay on Konnectable {
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
