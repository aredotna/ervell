import { gql } from '@apollo/client'

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
