import gql from 'graphql-tag'

export default gql`
  fragment ChannelMetadataConnections on Channel {
    __typename
    id

    can {
      connect
    }

    connected_to_channels {
      __typename
      id
      label: title
      href
    }
  }
`
