import gql from 'graphql-tag'

export default gql`
  fragment BlockLightboxLink on Konnectable {
    __typename
    ... on Link {
      id
      title
      source_url
      image_url(size: ORIGINAL)
      image_updated_at(format: "%m/%d/%y")
      image_updated_at_unix_time: image_updated_at(format: "%s")
      source {
        title
        url
        provider_name
        provider_url
      }
    }
  }
`
