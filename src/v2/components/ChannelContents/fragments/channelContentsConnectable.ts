import { gql } from '@apollo/client'

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'
import { connectableContextMenuConnectableFragment } from 'v2/components/ConnectableContextMenu/fragments/connectableContextMenu'

export const channelContentsConnectableFragment = gql`
  fragment ChannelContentsConnectable on Konnectable {
    ...KonnectableCell
    ...ConnectableContextMenuConnectable
  }
  ${konnectableCellFragment}
  ${connectableContextMenuConnectableFragment}
`
