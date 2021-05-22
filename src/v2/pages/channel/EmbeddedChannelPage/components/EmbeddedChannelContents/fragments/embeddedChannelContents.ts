import { gql } from '@apollo/client'

import konnectableSimpleDisplayFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableSimpleDisplay/fragments/konnectableSimpleDisplay'

export const embeddedChannelContentsFragment = gql`
  fragment EmbeddedChannelContents on Channel {
    __typename
    id
    href(absolute: true)
    counts {
      contents
    }
    contents: blokks(per: $per, page: 1, sort_by: POSITION, direction: DESC) {
      ...KonnectableSimpleDisplay
      ... on ConnectableInterface {
        title
        href(absolute: true)
      }
    }
  }
  ${konnectableSimpleDisplayFragment}
`
