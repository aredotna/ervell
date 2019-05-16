import gql from 'graphql-tag'

import channelMetadataFragment from 'v2/components/ChannelMetadata/fragments/channelMetadata'
import channelContentsFragment from 'v2/components/ChannelContents/fragments/channelContents'

export default gql`
  query SharedChannelPage($token: String!) {
    channel: shared_channel(token: $token) {
      ...ChannelMetadata
      ...ChannelContents
    }
  }
  ${channelMetadataFragment}
  ${channelContentsFragment}
`
