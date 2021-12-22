import { gql } from '@apollo/client'

import channelMetadataFragment from 'v2/components/ChannelMetadata/fragments/channelMetadata'
import { channelPageMetaTagsFragment } from 'v2/pages/channel/components/ChannelPageMetaTags/fragments/channelPageMetaTags'
import { channelEmptyMessageFragment } from 'v2/components/ChannelEmptyMessage/fragments/channelEmptyMessage'
import { connectableContextMenuChannelFragment } from 'v2/components/ConnectableContextMenu/fragments/connectableContextMenu'

export default gql`
  query ChannelTablePage($id: ID!) {
    channel(id: $id) {
      ...ChannelMetadata
      ...ChannelPageMetaTags
      ...ChannelEmptyMessage
      ...ConnectableContextMenuChannel
    }
  }
  ${channelMetadataFragment}
  ${channelPageMetaTagsFragment}
  ${channelEmptyMessageFragment}
  ${connectableContextMenuChannelFragment}
`
