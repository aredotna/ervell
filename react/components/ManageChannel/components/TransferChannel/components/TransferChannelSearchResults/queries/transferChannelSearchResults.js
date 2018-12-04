import gql from 'graphql-tag';

import userSearchResultFragment from 'react/components/UI/SearchResults/User/fragments/userSearchResult';
import groupSearchResultFragment from 'react/components/UI/SearchResults/Group/fragments/groupSearchResult';

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
`;
