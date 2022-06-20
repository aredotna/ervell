import { gql } from '@apollo/client'

import identifiableCellFragment from 'v2/components/Cell/components/Identifiable/fragments/identifiableCell'
import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

export default gql`
  query AdvancedSearch(
    $term: Term
    $where: Where
    $what: What
    $fields: Fields
    $order: Order
    $page: Int
    $per: Int
  ) {
    searches {
      advanced(
        term: $term
        where: $where
        what: $what
        fields: $fields
        order: $order
        per_page: $per
        page: $page
      ) {
        total
        filters {
          what
          where
          fields
          order
        }
        results {
          ...KonnectableCell
          ...IdentifiableCell
        }
      }
    }
  }
  ${konnectableCellFragment}
  ${identifiableCellFragment}
`
