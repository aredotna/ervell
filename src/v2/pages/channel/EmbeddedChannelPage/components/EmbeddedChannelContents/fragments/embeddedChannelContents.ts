import gql from 'graphql-tag'

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

export const embeddedChannelContentsFragment = gql`
  fragment EmbeddedChannelContents on Channel {
    __typename
    id
    contents: blokks(per: 8, page: 1) {
      ...KonnectableCell
    }
  }
  ${konnectableCellFragment}
`
