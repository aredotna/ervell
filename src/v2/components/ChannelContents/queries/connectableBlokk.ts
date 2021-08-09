import { gql } from '@apollo/client'

import { channelContentsConnectableFragment } from 'v2/components/ChannelContents/fragments/channelContentsConnectable'

export default gql`
  query ConnectableBlokk($id: ID!) {
    blokk(id: $id) {
      __typename
      ...ChannelContentsConnectable
    }
  }
  ${channelContentsConnectableFragment}
`
