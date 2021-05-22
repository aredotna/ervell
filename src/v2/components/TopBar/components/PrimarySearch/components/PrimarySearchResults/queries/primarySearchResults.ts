import { gql } from '@apollo/client'

import primarySearchResultFragment from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult/fragments/primarySearchResult'

export default gql`
  query QuickSearch($query: String!) {
    searches {
      results: quick(query: $query, limit: 6) {
        ...PrimarySearchResult
      }
    }
  }
  ${primarySearchResultFragment}
`
