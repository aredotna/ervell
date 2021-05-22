import { gql } from '@apollo/client'

import profileChannelSearchFragment from 'v2/components/ProfileChannels/fragments/profileChannelSearch'

export default gql`
  query ProfileChannelsSearch(
    $id: ID!
    $page: Int
    $per: Int
    $sort: SearchSorts
    $q: String
    $seed: Int
  ) {
    identity(id: $id) {
      identifiable {
        __typename
        ...ProfileChannelSearch
      }
    }
  }
  ${profileChannelSearchFragment}
`
