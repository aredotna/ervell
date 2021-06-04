import { gql } from '@apollo/client'

export default gql`
  fragment KonnectableImage on Image {
    id
    title
    href
    src: image_url(size: DISPLAY)
    src_1x: resized_image_url(
      width: 315
      height: 315
      quality: 85
      fallback_format: PNG
    )
    src_2x: resized_image_url(width: 630, height: 630, fallback_format: PNG)
    src_3x: resized_image_url(width: 945, height: 945, fallback_format: PNG)
    original_dimensions {
      width
      height
    }
  }
`
