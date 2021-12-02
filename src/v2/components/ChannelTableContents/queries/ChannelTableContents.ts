import { gql } from '@apollo/client'
import { channelTableContentsConnectableFragment } from '../fragments/TableConnectableBlokk'

export default gql`
  query ChannelTableContentsSet(
    $id: ID!
    $page: Int!
    $per: Int!
    $sort: Sorts
    $direction: SortDirection
  ) {
    channel(id: $id) {
      __typename
      id
      counts {
        contents
        blocks
        channels
      }
      blokks(page: $page, per: $per, sort_by: $sort, direction: $direction) {
        ...ChannelTableContentsConnectable
      }
    }
  }
  ${channelTableContentsConnectableFragment}
`
