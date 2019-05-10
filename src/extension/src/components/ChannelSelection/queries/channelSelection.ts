import gql from 'graphql-tag'

// FIXME: This file doesn't exist
// import selectedChannelFragment from 'extension/src/components/Blocks/components/SelectedChannel/fragments/selectedChannel'

export default gql`
  query SelectedChannelQuery {
    me {
      __typename
      # id
      # recent_channels: recent_connections(per: 10) {
      #   ...SelectedChannel
      # }
      # all_channels: recent_connections(per: 200) {
      #   ...SelectedChannel
      # }
    }
  }
`
