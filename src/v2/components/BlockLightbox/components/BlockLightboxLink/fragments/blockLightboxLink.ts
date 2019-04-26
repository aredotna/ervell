import gql from 'graphql-tag'

export default gql`
  fragment BlockLightboxLink on Konnectable {
    __typename
    ... on Link {
      id
      title
      source_url
      image_url(size: ORIGINAL)
      source {
        title
        url
        provider_name
        provider_url
      }
    }
  }
`
