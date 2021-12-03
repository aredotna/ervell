import { gql } from '@apollo/client'

import { channelTableContentsConnectableFragment } from '../fragments/TableConnectableBlokk'

export default gql`
  query ConnectableTableBlokk($id: ID!) {
    blokk(id: $id) {
      __typename
      ...ChannelTableContentsConnectable
    }
  }
  ${channelTableContentsConnectableFragment}
`
