import gql from 'graphql-tag'

import konnectableSimpleDisplayFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableSimpleDisplay/fragments/konnectableSimpleDisplay'

export const embeddedChannelContentsFragment = gql`
  fragment EmbeddedChannelContents on Channel {
    __typename
    id
    href(absolute: true)
    counts {
      contents
    }
    contents: blokks(per: $per, page: 1) {
      ...KonnectableSimpleDisplay
      ... on ConnectableInterface {
        title
        href(absolute: true)
      }
    }
  }
  ${konnectableSimpleDisplayFragment}
`
