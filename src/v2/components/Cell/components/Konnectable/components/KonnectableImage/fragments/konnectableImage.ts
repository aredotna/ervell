import gql from 'graphql-tag'

export default gql`
  fragment KonnectableImage on Image {
    id
    title
    href
    src: image_url(size: DISPLAY)
  }
`
