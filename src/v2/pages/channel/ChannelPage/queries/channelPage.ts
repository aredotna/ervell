import { gql } from '@apollo/client'

import channelMetadataFragment from 'v2/components/ChannelMetadata/fragments/channelMetadata'
import { channelPageMetaTagsFragment } from 'v2/pages/channel/components/ChannelPageMetaTags/fragments/channelPageMetaTags'
import { channelEmptyMessageFragment } from 'v2/components/ChannelEmptyMessage/fragments/channelEmptyMessage'
import { channelContentsFilterFragment } from 'v2/components/ChannelContentsFilter/fragments/channelContentsFilter'

export default gql`
  query ChannelPage($id: ID!) {
    channel(id: $id) {
      ...ChannelMetadata
      ...ChannelPageMetaTags
      ...ChannelEmptyMessage
      ...ChannelContentsFilter
    }
  }
  ${channelMetadataFragment}
  ${channelPageMetaTagsFragment}
  ${channelEmptyMessageFragment}
  ${channelContentsFilterFragment}
`
