import { gql } from '@apollo/client'

import { channelContentsConnectableFragment } from 'v2/components/ChannelContents/fragments/channelContentsConnectable'

export default gql`
  query ChannelContentsSet($id: ID!, $connectables: [ConnectableInput]!) {
    channel(id: $id) {
      __typename
      id
      contents(connectables: $connectables) {
        ...ChannelContentsConnectable
      }
    }
  }
  ${channelContentsConnectableFragment}
`
