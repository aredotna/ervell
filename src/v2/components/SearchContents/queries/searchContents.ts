import { gql } from '@apollo/client'

import identifiableCellFragment from 'v2/components/Cell/components/Identifiable/fragments/identifiableCell'
import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

export default gql`
  query SearchContents(
    $type: [SsearchType]
    $page: Int
    $per: Int
    $q: String!
    $block_filter: BlockFilterEnum
  ) {
    contents: ssearch(
      q: $q
      per: $per
      page: $page
      type: $type
      block_filter: $block_filter
    ) {
      ...KonnectableCell
      ...IdentifiableCell
    }
  }
  ${konnectableCellFragment}
  ${identifiableCellFragment}
`
