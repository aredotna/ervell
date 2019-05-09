import gql from 'graphql-tag'

import selectableChannelFragment from 'extension/src/components/SelectableChannel/fragments/selectableChannel'

export default gql`
  query ConnectionSearchChannelsQuery($query: String!) {
    me {
      __typename
      id
      searched_channels: connection_search(
        q: $query
        per: 20
        include_open_channels: false
      ) {
        ...SelectableChannel
      }
    }
  }
  ${selectableChannelFragment}
`
