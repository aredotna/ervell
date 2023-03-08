import { gql } from '@apollo/client'

import { connectableContextMenuConnectableFragment } from 'v2/components/ConnectableContextMenu/fragments/connectableContextMenu'

export const channelContextMenu = gql`
  query ChannelContextMenu($id: ID!) {
    channel(id: $id) {
      __typename
      ...ConnectableContextMenuConnectable
    }
  }
  ${connectableContextMenuConnectableFragment}
`
