import { gql } from '@apollo/client'

export const tableRowFragment = gql`
  fragment TableRowFragment on Konnectable {
    __typename

    ... on Model {
      id

      created_at(relative: true)
      updated_at(relative: true)
    }

    ... on PendingBlock {
      href
    }

    ... on Block {
      counts {
        public_channels
      }
      can {
        remove: manage
        manage
        mute
      }
    }

    ... on Channel {
      visibility
      title
      href
      counts {
        connected_to_channels
        contents
      }
      can {
        update: manage
        manage
        mute
      }
    }

    ... on Attachment {
      file_url
      image_url(size: THUMB)
      file_url
      href
      source {
        url
        provider_url
      }
    }

    ... on Embed {
      embed_html
      image_url(size: THUMB)
      href
      source {
        url
        provider_url
      }
    }

    ... on Link {
      image_url(size: THUMB)
      href
      source {
        url
        provider_url
      }
    }

    ... on Image {
      image_url(size: THUMB)
      href
      find_original_url
      source {
        url
        provider_url
      }
    }

    ... on Text {
      content(format: MARKDOWN)
      html: content(format: HTML)
      find_original_url
      href
      source {
        url
      }
    }

    ... on ConnectableInterface {
      title
      user {
        name
      }

      connection @include(if: $includeConnection) {
        __typename
        id
        created_at(relative: true)
        selected
        can {
          manage
          remove: manage
          destroy
        }
      }
    }
  }
`
