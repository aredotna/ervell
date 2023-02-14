import { gql } from '@apollo/client'

export default gql`
  query AdvancedQuickSearchTotal(
    $term: Term
    $where: [Where!]
    $what: What
    $fields: Fields
    $extensions: [ExtensionsEnum!]
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
        extensions: $extensions
        order: $order
        per: $per
        page: $page
      ) {
        total
      }
    }
  }
`
