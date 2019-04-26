import gql from 'graphql-tag'

export default gql`
  fragment ChannelPreviewBlock on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on Text {
      preview_content: content(format: HTML)
    }
    ... on Image {
      preview_image_url: image_url(size: SQUARE)
    }
    ... on Link {
      preview_image_url: image_url(size: SQUARE)
    }
    ... on Attachment {
      preview_image_url: image_url(size: SQUARE)
      file_extension
    }
    ... on Embed {
      preview_image_url: image_url(size: SQUARE)
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
