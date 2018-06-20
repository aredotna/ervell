import gql from 'graphql-tag';

import userSearchResultFragment from 'react/components/UI/SearchResults/User/fragments/userSearchResult';

export default gql`
  query TransferChannelSearchResultsQuery($query: String!) {
    results: searches {
      users: collaborators(query: $query, limit: 4, types: USER) {
        ... on User {
          ...UserSearchResult
        }
      }
    }
  }
  ${userSearchResultFragment}
`;
