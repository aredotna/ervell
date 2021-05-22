import { gql } from '@apollo/client'

import channelMetadataFragment from 'v2/components/ChannelMetadata/fragments/channelMetadata'
import channelContentsFragment from 'v2/components/ChannelContents/fragments/channelContents'
import { channelPageMetaTagsFragment } from 'v2/pages/channel/components/ChannelPageMetaTags/fragments/channelPageMetaTags'

export default gql`
  query SharedChannelPage($token: String!) {
    channel: shared_channel(token: $token) {
      ...ChannelMetadata
      ...ChannelContents
      ...ChannelPageMetaTags
    }
  }
  ${channelMetadataFragment}
  ${channelContentsFragment}
  ${channelPageMetaTagsFragment}
`
