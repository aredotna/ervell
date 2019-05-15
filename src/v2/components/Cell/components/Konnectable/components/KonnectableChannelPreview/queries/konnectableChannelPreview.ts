import gql from 'graphql-tag'

import konnectableChannelPreviewBlockFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableChannelPreviewBlocks/fragments/konnectableChannelPreviewBlock'

export default gql`
  query KonnectableChannelPreview($id: ID!, $amount: Int!) {
    channel(id: $id) {
      __typename
      id
      blocks: blokks(per: $amount, sort_by: CREATED_AT, direction: DESC) {
        ...KonnectableChannelPreviewBlock
      }
    }
  }
  ${konnectableChannelPreviewBlockFragment}
`
