import gql from 'graphql-tag'

export default gql`
  fragment BlockLightboxShare on Konnectable {
    ... on ConnectableInterface {
      shareable_href: href
      shareable_title: title(truncate: 40)
    }
  }
`
