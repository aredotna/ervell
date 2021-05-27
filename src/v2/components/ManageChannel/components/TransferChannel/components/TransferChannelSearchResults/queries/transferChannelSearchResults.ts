import { gql } from '@apollo/client'

import userSearchResultFragment from 'v2/components/UI/SearchResults/User/fragments/userSearchResult'
import groupSearchResultFragment from 'v2/components/UI/SearchResults/Group/fragments/groupSearchResult'

export default gql`
  query TransferChannelSearchResultsQuery($query: String!) {
    results: searches {
      members: collaborators(query: $query, limit: 4, types: [USER, GROUP]) {
        ... on User {
          ...UserSearchResult
        }
        ... on Group {
          ...GroupSearchResult
        }
      }
    }
  }
  ${userSearchResultFragment}
  ${groupSearchResultFragment}
`
