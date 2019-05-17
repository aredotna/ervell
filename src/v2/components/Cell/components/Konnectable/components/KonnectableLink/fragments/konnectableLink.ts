import gql from 'graphql-tag'

export default gql`
  fragment KonnectableLink on Link {
    href
    title
    src: image_url(size: DISPLAY)
    external_url: source_url
  }
`
