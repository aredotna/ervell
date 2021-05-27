import { gql } from '@apollo/client'

import konnectableSimpleDisplayFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableSimpleDisplay/fragments/konnectableSimpleDisplay'

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
        ...KonnectableSimpleDisplay
      }
    }
  }
  ${konnectableSimpleDisplayFragment}
`
