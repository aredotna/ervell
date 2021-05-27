import { gql } from '@apollo/client'

import loadingBreadcrumbChannelFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbChannel'

export default gql`
  fragment ChannelMetadataConnections on Channel {
    __typename
    id

    can {
      connect
    }

    connected_to_channels {
      __typename
      id
      label: title
      href
      ...LoadingBreadcrumbChannel
    }
  }
  ${loadingBreadcrumbChannelFragment}
`
