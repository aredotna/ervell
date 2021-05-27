import { gql } from '@apollo/client'

export default gql`
  fragment BlockLightboxImage on Konnectable {
    ... on Image {
      id
      title
      thumb_url: image_url(size: THUMB)
      image_url(size: LARGE)
      original_image_url: image_url(size: ORIGINAL)
    }
  }
`
