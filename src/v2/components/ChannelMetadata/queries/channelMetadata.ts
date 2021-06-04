import { gql } from '@apollo/client'

import channelMetadataFragment from 'v2/components/ChannelMetadata/fragments/channelMetadata'

export default gql`
  query ChannelMetadata($id: ID!) {
    channel(id: $id) {
      ...ChannelMetadata
    }
  }

  ${channelMetadataFragment}
`
