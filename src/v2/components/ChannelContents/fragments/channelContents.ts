import gql from 'graphql-tag'

import { connectableContextMenuChannelFragment } from 'v2/components/ConnectableContextMenu/fragments/connectableContextMenu'

export default gql`
  fragment ChannelContents on Channel {
    __typename
    id
    skeleton {
      id
      type
    }
    can {
      add_to
      reorder_connections: update
    }
    ...ConnectableContextMenuChannel
  }
  ${connectableContextMenuChannelFragment}
`
