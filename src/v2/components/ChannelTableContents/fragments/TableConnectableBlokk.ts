import { gql } from '@apollo/client'
import { connectableContextMenuConnectableFragment } from 'v2/components/ConnectableContextMenu/fragments/connectableContextMenu'

export const channelTableContentsConnectableFragment = gql`
  fragment ChannelTableContentsConnectable on Konnectable {
    __typename

    ...ConnectableContextMenuConnectable

    ... on Model {
      id
    }

    ... on Block {
      counts {
        public_channels
      }
    }

    ... on Channel {
      visibility
      title
      counts {
        connected_to_channels
        contents
      }
    }

    ... on Model {
      created_at(relative: true)
      updated_at(relative: true)
    }

    ... on Attachment {
      file_url
      image_url(size: THUMB)
      created_at
      file_url
      image_url
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
      source {
        url
      }
    }

    ... on ConnectableInterface {
      title
      user {
        name
      }
      connection {
        __typename
        position
        selected
        id
        created_at(relative: true)
        can {
          manage
        }
        user {
          name
        }
      }
    }
  }
  ${connectableContextMenuConnectableFragment}
`
