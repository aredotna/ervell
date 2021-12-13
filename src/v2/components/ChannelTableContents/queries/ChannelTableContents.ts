import { gql } from '@apollo/client'
import { channelTableContentsConnectableFragment } from '../fragments/TableConnectableBlokk'

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
`
