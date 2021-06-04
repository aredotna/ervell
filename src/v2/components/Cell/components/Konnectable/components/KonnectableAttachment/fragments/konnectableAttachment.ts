import { gql } from '@apollo/client'

export default gql`
  fragment KonnectableAttachment on Attachment {
    id
    title
    href
    src: image_url(size: DISPLAY)
    # scale up the non-retina src to avoid blurry text
    src_1x: resized_image_url(
      width: 415
      height: 415
      quality: 90
      fallback_format: PNG
    )
    src_2x: resized_image_url(width: 630, height: 630, fallback_format: PNG)
    src_3x: resized_image_url(width: 945, height: 945, fallback_format: PNG)
    file_extension
  }
`
