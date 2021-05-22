import { gql } from '@apollo/client'

import selectableChannelFragment from 'v2/components/ConnectionSelectionList/components/SelectableChannel/fragments/selectableChannel'

export default gql`
  query RecentChannelsQuery {
    me {
      __typename
      id
      recent_channels: recent_connections(per: 6) {
        ...SelectableChannel
      }
    }
  }
  ${selectableChannelFragment}
`
