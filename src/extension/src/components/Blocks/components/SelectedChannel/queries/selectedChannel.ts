import gql from 'graphql-tag'

import selectableChannelFragment from 'extension/src/components/SelectableChannel/fragments/selectableChannel'

export default gql`
  query SelectedChannelQuery {
    me {
      __typename
      id
      recent_channels: recent_connections(per: 1) {
        ...SelectableChannel
      }
    }
  }
  ${selectableChannelFragment}
`
