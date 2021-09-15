import { gql } from '@apollo/client'

export default gql`
  fragment RssBlock on Konnectable {
    __typename
    ... on Model {
      id
      updated_at
    }

    ... on ConnectableInterface {
      title
      href(absolute: true)
      source {
        url
      }
    }

    ... on Image {
      image_url: resized_image_url(width: 1000, height: 1000)
    }

    ... on Embed {
      embed_html
    }

    ... on Attachment {
      file_url
    }

    ... on Link {
      description(format: HTML)
      source {
        url
      }
      image_url: resized_image_url(width: 1000, height: 1000)
    }

    ... on Text {
      content(format: HTML)
    }
  }
`
