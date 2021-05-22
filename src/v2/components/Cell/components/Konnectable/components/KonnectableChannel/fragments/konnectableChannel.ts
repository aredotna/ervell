import { gql } from '@apollo/client'

import konnectableChannelOverlayFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableChannelOverlay/fragments/konnectableChannelOverlay'
import loadingBreadcrumbChannelFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbChannel'

export default gql`
  fragment KonnectableChannel on Channel {
    id
    href
    truncatedTitle: title(truncate: 80)
    visibility
    updated_at(relative: true)
    counts {
      __typename
      contents
    }
    owner {
      __typename
      ... on Group {
        id
        name
        visibility
      }
      ... on User {
        id
        name
      }
    }
    ...KonnectableChannelOverlay
    ...LoadingBreadcrumbChannel
  }
  ${konnectableChannelOverlayFragment}
  ${loadingBreadcrumbChannelFragment}
`
