import { gql } from '@apollo/client'

export default gql`
  fragment KonnectableSimpleDisplay on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on Text {
      preview_content: content(format: HTML)
    }
    ... on Image {
      preview_image_url: image_url(size: THUMB)
    }
    ... on Link {
      preview_image_url: image_url(size: THUMB)
    }
    ... on Attachment {
      preview_image_url: image_url(size: THUMB)
      file_extension
    }
    ... on Embed {
      preview_image_url: image_url(size: THUMB)
    }
    ... on Channel {
      preview_title: title(truncate: 25)
      visibility
      owner {
        __typename
        ... on User {
          id
          name
        }
        ... on Group {
          id
          name
        }
      }
    }
  }
`
