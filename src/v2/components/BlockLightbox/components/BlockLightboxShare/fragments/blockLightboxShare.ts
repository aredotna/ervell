import { gql } from '@apollo/client'

export default gql`
  fragment BlockLightboxShare on Konnectable {
    ... on ConnectableInterface {
      shareable_href: href
      shareable_title: title(truncate: 40)
    }
  }
`
