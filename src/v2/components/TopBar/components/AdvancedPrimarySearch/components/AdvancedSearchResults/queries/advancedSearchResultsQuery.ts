import { gql } from '@apollo/client'
import advancedSearchResultFragment from '../../AdvancedSearchResult/fragment/advancedSearchResultFragment'

export default gql`
  query AdvancedQuickSearch(
    $term: Term
    $where: [Where!]
    $what: What
    $fields: Fields
    $order: Order
    $page: Int
    $per: Int
    $before: String
    $after: String
  ) {
    searches {
      advanced(
        term: $term
        where: $where
        what: $what
        fields: $fields
        order: $order
        per: $per
        page: $page
        before: $before
        after: $after
      ) {
        total
        filters {
          what
          where
          fields
          order
        }
        results {
          ...AdvancedQuickSearchResult
        }
      }
    }
  }
  ${advancedSearchResultFragment}
`
