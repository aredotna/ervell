import gql from 'graphql-tag'

export const connectableContextMenuChannelFragment = gql`
  fragment ConnectableContextMenuChannel on Channel {
    can {
      remove_connections: update
      reorder_connections: update
    }
  }
`

export const connectableContextMenuConnectableFragment = gql`
  fragment ConnectableContextMenuConnectable on Konnectable {
    ... on Block {
      can {
        mute
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
