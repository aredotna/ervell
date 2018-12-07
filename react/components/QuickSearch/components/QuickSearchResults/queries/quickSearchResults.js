import gql from 'graphql-tag';

import quickSearchResultsFragment from 'react/components/QuickSearch/components/QuickSearchResults/fragments/quickSearchResults';

export default gql`
  query QuickSearchQuery($query: String!) {
    results: searches {
      ...QuickSearchResults
    }
  }
  ${quickSearchResultsFragment}
`;
