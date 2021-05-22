import { gql } from '@apollo/client'

export const connectableContextMenuChannelFragment = gql`
  fragment ConnectableContextMenuChannel on Channel {
    __typename
    id
    can {
      remove_connections: update
      reorder_connections: update
    }
  }
`

export const connectableContextMenuConnectableFragment = gql`
  fragment ConnectableContextMenuConnectable on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on Block {
      can {
        mute
        remove: manage
      }
    }

    ... on ConnectableInterface {
      href
      connection {
        can {
          destroy
        }
      }
    }

    ... on Channel {
      can {
        mute
      }
    }
    ... on Text {
      source {
        url
      }
    }
    ... on Image {
      source {
        url
      }
      find_original_url
    }
    ... on Embed {
      source {
        url
      }
    }
    ... on Link {
      source {
        url
      }
    }
    ... on Attachment {
      source {
        url
      }
    }
  }
`
