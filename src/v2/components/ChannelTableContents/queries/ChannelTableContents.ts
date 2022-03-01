import { gql } from '@apollo/client'
import { connectableContextMenuChannelFragment } from 'v2/components/ConnectableContextMenu/fragments/connectableContextMenu'
import { tableRowFragment } from 'v2/components/Table/fragments/tableRow'

export default gql`
  query ChannelTableContentsSet(
    $id: ID!
    $page: Int!
    $per: Int!
    $sort: Sorts
    $direction: SortDirection
    $type: ConnectableTypeEnum
    $user_id: ID
    $includeConnection: Boolean!
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
        ...TableRowFragment
      }
    }
  }
  ${tableRowFragment}
  ${connectableContextMenuChannelFragment}
`
