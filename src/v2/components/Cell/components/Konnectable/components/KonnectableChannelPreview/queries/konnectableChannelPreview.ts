import gql from 'graphql-tag'

import konnectableChannelPreviewConnectableFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableSimpleDisplay/fragments/konnectableChannelPreviewConnectable'

export default gql`
  query KonnectableChannelPreview($id: ID!, $amount: Int!) {
    channel(id: $id) {
      __typename
      id
      preview_connectables: blokks(
        per: $amount
        sort_by: CREATED_AT
        direction: DESC
      ) {
        ...KonnectableChannelPreviewConnectable
      }
    }
  }
  ${konnectableChannelPreviewConnectableFragment}
`
