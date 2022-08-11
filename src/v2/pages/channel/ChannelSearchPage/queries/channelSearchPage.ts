import { gql } from '@apollo/client'
import channelBreadcrumbFragment from 'v2/components/ChannelMetadata/components/ChannelBreadcrumb/fragments/channelBreadcrumb'
import { channelPageMetaTagsFragment } from 'v2/pages/channel/components/ChannelPageMetaTags/fragments/channelPageMetaTags'

export default gql`
  query ChannelSearchPage($id: ID!) {
    channel(id: $id) {
      id
      title
      slug
      ...ChannelBreadcrumb
      ...ChannelPageMetaTags
    }
  }
  ${channelBreadcrumbFragment}
  ${channelPageMetaTagsFragment}
`
