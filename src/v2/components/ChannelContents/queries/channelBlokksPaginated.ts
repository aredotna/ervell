import { gql } from '@apollo/client'

import { channelContentsConnectableFragment } from 'v2/components/ChannelContents/fragments/channelContentsConnectable'

export const channelBlokksPaginatedPerPage = 8

export default gql`
  query ChannelBlokksPaginated($id: ID!, $page: Int!, $per: Int!) {
    channel(id: $id) {
      __typename
      id
      blokks(page: $page, per: $per, sort_by: POSITION, direction: DESC) {
        __typename
        ...ChannelContentsConnectable
      }
      counts {
        contents
      }
    }
  }
  ${channelContentsConnectableFragment}
`
