import { gql } from '@apollo/client'

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

export default gql`
  query ExploreContents(
    $type: SearchType
    $page: Int
    $per: Int
    $sort: SearchSorts
    $seed: Int
    $block_filter: BlockFilterEnum
    $timestamp: DateTime
  ) {
    contents: exxplore(
      type: $type
      page: $page
      per: $per
      sort_by: $sort
      seed: $seed
      block_filter: $block_filter
      timestamp: $timestamp
    ) {
      ...KonnectableCell
    }
  }
  ${konnectableCellFragment}
`
