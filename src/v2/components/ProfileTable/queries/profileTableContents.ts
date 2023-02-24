import { gql } from '@apollo/client'

import { tableRowFragment } from 'v2/components/Table/fragments/tableRow'

export default gql`
  query ProfileTable(
    $term: Term
    $where: [Where!]
    $what: What
    $fields: Fields
    $order: Order
    $extensions: [ExtensionsEnum!]
    $page: Int
    $per: Int
    $before: String
    $after: String
    $includeConnection: Boolean!
  ) {
    searches {
      advanced(
        term: $term
        where: $where
        what: $what
        fields: $fields
        order: $order
        extensions: $extensions
        per: $per
        page: $page
        before: $before
        after: $after
      ) {
        total
        results {
          ...TableRowFragment
        }
      }
    }
  }
  ${tableRowFragment}
`
