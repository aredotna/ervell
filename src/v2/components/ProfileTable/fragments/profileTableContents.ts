import { gql } from '@apollo/client'
import { tableRowFragment } from 'v2/components/Table/fragments/tableRow'

export default gql`
  fragment ProfileTableContentsFragment on User {
    __typename
    id
    name
    contents: kontents(
      type: $type
      per: $per
      page: $page
      direction: $direction
      sort_by: $sort
      q: $q
      seed: $seed
    ) {
      ...TableRowFragment
    }
  }
  ${tableRowFragment}
`
