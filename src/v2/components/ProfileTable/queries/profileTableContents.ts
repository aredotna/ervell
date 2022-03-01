import { gql } from '@apollo/client'

import profileTableContentsFragment from 'v2/components/ProfileTable/fragments/profileTableContents'

export default gql`
  query ProfileTableContents(
    $id: ID!
    $type: ConnectableTypeEnum
    $page: Int
    $per: Int
    $sort: SearchSorts
    $direction: SortDirection
    $q: String
    $seed: Int
    $includeConnection: Boolean!
  ) {
    user(id: $id) {
      __typename
      ...ProfileTableContentsFragment
    }
  }
  ${profileTableContentsFragment}
`
