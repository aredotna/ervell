import { gql } from '@apollo/client'

export const expandedBlockRowFragment = gql`
  fragment ExpandedBlockRow on Konnectable {
    __typename

    ... on Model {
      id
    }

    ... on Block {
      counts {
        public_channels
      }
    }

    ... on Model {
      created_at(relative: true)
      updated_at(relative: true)
    }

    ... on Attachment {
      file_url
      image_url(size: THUMB)
      source {
        url
        provider_url
      }
    }

    ... on Embed {
      embed_html
      image_url(size: THUMB)
      source {
        url
        provider_url
      }
    }

    ... on Link {
      image_url(size: THUMB)
      content
      source {
        url
        provider_url
      }
    }

    ... on Image {
      image_url(size: THUMB)
      source {
        url
        provider_url
      }
    }

    ... on Text {
      content(format: MARKDOWN)
      html: content(format: HTML)
    }

    ... on ConnectableInterface {
      title
      user {
        name
      }
    }
  }
`
