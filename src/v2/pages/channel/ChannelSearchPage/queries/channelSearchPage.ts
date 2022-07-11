import { gql } from '@apollo/client'
import channelBreadcrumbFragment from 'v2/components/ChannelMetadata/components/ChannelBreadcrumb/fragments/channelBreadcrumb'

export default gql`
  query ChannelSearchPage($id: ID!) {
    channel(id: $id) {
      id
      title
      slug
      ...ChannelBreadcrumb
    }
  }
  ${channelBreadcrumbFragment}
`
