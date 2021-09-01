import { gql } from '@apollo/client'

import { addBlockFragment } from 'v2/components/AddBlock/fragments/addBlock'
import { connectableContextMenuChannelFragment } from 'v2/components/ConnectableContextMenu/fragments/connectableContextMenu'

export default gql`
  fragment ChannelContents on Channel {
    __typename
    id
    can {
      add_to
      reorder_connections: update
    }
    counts {
      contents
    }
    ...AddBlock
    ...ConnectableContextMenuChannel
  }
  ${addBlockFragment}
  ${connectableContextMenuChannelFragment}
`
