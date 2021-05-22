import { gql } from '@apollo/client'

import selectableChannelFragment from 'v2/components/ConnectionSelectionList/components/SelectableChannel/fragments/selectableChannel'

export default gql`
  query SearchedChannelsQuery($query: String!, $includeOpenChannels: Boolean!) {
    me {
      __typename
      id
      searched_channels: connection_search(
        q: $query
        per: 5
        include_open_channels: $includeOpenChannels
      ) {
        ...SelectableChannel
      }
    }
  }
  ${selectableChannelFragment}
`
