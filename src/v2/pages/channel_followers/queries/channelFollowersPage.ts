import gql from 'graphql-tag'

import channelMetadataFragment from 'v2/components/ChannelMetadata/fragments/channelMetadata'

export const channelFollowersPageQuery = gql`
  query ChannelFollowersPage($id: ID!) {
    channel(id: $id) {
      ...ChannelMetadata
    }
  }
  ${channelMetadataFragment}
`
