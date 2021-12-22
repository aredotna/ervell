import { gql } from '@apollo/client'
import { channelTableContentsConnectableFragment } from '../fragments/TableConnectableBlokk'
import { connectableContextMenuChannelFragment } from 'v2/components/ConnectableContextMenu/fragments/connectableContextMenu'

export default gql`
  query ChannelTableContentsSet(
    $id: ID!
    $page: Int!
    $per: Int!
    $sort: Sorts
    $direction: SortDirection
    $type: ConnectableTypeEnum
    $user_id: ID
  ) {
    channel(id: $id) {
      __typename
      id
      counts {
        contents(type: $type, user_id: $user_id)
        blocks
        channels
      }
      ...ConnectableContextMenuChannel
      blokks(
        page: $page
        per: $per
        sort_by: $sort
        direction: $direction
        type: $type
        user_id: $user_id
      ) {
        ...ChannelTableContentsConnectable
      }
    }
  }
  ${channelTableContentsConnectableFragment}
  ${connectableContextMenuChannelFragment}
`
