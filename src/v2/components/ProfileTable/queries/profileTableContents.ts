import { gql } from '@apollo/client'

import profileContentsFragment from 'v2/components/ProfileContents/fragments/profileContents'

export default gql`
  query ProfileTableContents(
    $id: ID!
    $type: ConnectableTypeEnum
    $page: Int
    $per: Int
    $sort: SearchSorts
    $q: String
    $seed: Int
  ) {
    identity(id: $id) {
      identifiable {
        __typename
        ...ProfileContents
      }
    }
  }
  ${profileContentsFragment}
`
