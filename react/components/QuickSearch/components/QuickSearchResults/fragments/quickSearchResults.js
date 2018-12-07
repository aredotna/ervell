import gql from 'graphql-tag';

import quickSearchResultFragment from 'react/components/QuickSearch/components/QuickSearchResult/fragments/quickSearchResult';

export default gql`
  fragment QuickSearchResults on Searches {
    quick(query: $query, limit: 5) {
      ...QuickSearchResult
    }
  }
  ${quickSearchResultFragment}
`;
