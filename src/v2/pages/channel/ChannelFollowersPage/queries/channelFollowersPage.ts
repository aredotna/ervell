import { gql } from '@apollo/client'

import channelMetadataFragment from 'v2/components/ChannelMetadata/fragments/channelMetadata'
import { channelPageMetaTagsFragment } from 'v2/pages/channel/components/ChannelPageMetaTags/fragments/channelPageMetaTags'

export const channelFollowersPageQuery = gql`
  query ChannelFollowersPage($id: ID!) {
    channel(id: $id) {
      ...ChannelMetadata
      ...ChannelPageMetaTags
    }
  }
  ${channelMetadataFragment}
  ${channelPageMetaTagsFragment}
`
