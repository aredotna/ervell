import { gql } from '@apollo/client'

export default gql`
  fragment KonnectableEmbed on Embed {
    id
    title
    href
    src: image_url(size: DISPLAY)
    src_1x: resized_image_url(width: 315, height: 315, quality: 85)
    src_2x: resized_image_url(width: 630, height: 630)
    src_3x: resized_image_url(width: 945, height: 945)
  }
`
