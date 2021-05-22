import { gql } from '@apollo/client'

export default gql`
  fragment BlockPageMetaTags on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      meta_title: title
      meta_description: description(format: MARKDOWN)
      canonical: href(absolute: true)
    }
    ... on Block {
      is_nsfw
    }
    ... on Image {
      meta_image: image_url(size: DISPLAY)
    }
    ... on Link {
      meta_image: image_url(size: DISPLAY)
    }
    ... on Embed {
      meta_image: image_url(size: DISPLAY)
    }
    ... on Attachment {
      meta_image: image_url(size: DISPLAY)
    }
  }
`
