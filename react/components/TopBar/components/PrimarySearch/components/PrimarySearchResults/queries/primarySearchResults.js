import gql from 'graphql-tag';

import primarySearchResultFragment from 'react/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult/fragments/primarySearchResult';

export default gql`
  query QuickSearch($query: String!) {
    searches {
      results: quick(query: $query, limit: 6) {
        ...PrimarySearchResult
      }
    }
  }
  ${primarySearchResultFragment}
`;
