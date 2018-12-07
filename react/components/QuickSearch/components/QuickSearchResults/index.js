import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import quickSearchResultsQuery from 'react/components/QuickSearch/components/QuickSearchResults/queries/quickSearchResults';
import quickSearchResultsFragment from 'react/components/QuickSearch/components/QuickSearchResults/fragments/quickSearchResults';

import SearchResult from 'react/components/QuickSearch/components/SearchResult';
import QuickSearchResult from 'react/components/QuickSearch/components/QuickSearchResult';

const Status = styled(SearchResult)`
  justify-content: center;
  padding: 1.75em 1em;
`;

class QuickSearchResults extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      results: propType(quickSearchResultsFragment),
    }).isRequired,
  }

  render() {
    const {
      data: { loading },
    } = this.props;

    if (loading) {
      return (
        <Status>
          Searching...
        </Status>
      );
    }

    const { data: { results: { quick: searchResults } } } = this.props;

    console.log('searchResults', searchResults);

    if (searchResults.length === 0) {
      return (
        <Status>
          Nothing found.
        </Status>
      );
    }

    return (
      <div>
        {searchResults.map(result => (
          <QuickSearchResult
            key={`${result.__typename}-${result.id}`}
            result={result}
          />
        ))}
      </div>
    );
  }
}

export default graphql(quickSearchResultsQuery)(QuickSearchResults);
