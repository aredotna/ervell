import { gql } from '@apollo/client'

import channelContentsFragment from 'v2/components/ChannelContents/fragments/channelContents'

export const channelContentsWithDataQuery = gql`
  query ChannelContentsWithData($id: ID!) {
    channel(id: $id) {
      __typename
      id
      ...ChannelContents
    }
  }
  ${channelContentsFragment}
`
