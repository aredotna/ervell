import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import primarySearchResultsQuery from 'react/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/queries/primarySearchResults';

import Text from 'react/components/UI/Text';
import PrimarySearchResult from 'react/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult';

export default class PrimarySearchResults extends PureComponent {
  static propTypes = {
    query: PropTypes.string.isRequired,
  }

  state = {
    selectedIdx: 0,
  }

  render() {
    const { selectedIdx } = this.state;
    const { query } = this.props;

    return (
      <Query query={primarySearchResultsQuery} variables={{ query }}>
        {({ data, loading, error }) => {
          if (loading) {
            return (
              <PrimarySearchResult>
                <Text fontWeight="bold">
                  Searching...
                </Text>
              </PrimarySearchResult>
            );
          }

          if (error) {
            return (
              <PrimarySearchResult>
                <Text fontWeight="bold" color="state.alert">
                  {error.message}
                </Text>
              </PrimarySearchResult>
            );
          }

          const { searches: { results } } = data;

          return (
            <React.Fragment>
              {results.map((result, idx) => (
                <PrimarySearchResult
                  key={`result_${result.__typename}_${result.id}`}
                  result={result}
                  bg={selectedIdx === idx ? 'white' : undefined}
                />
              ))}

              {results.length > 0 &&
                <PrimarySearchResult
                  href={`/search/${encodeURIComponent(query)}`}
                  bg="gray.semiLight"
                >
                  <Text fontWeight="bold">
                    See all results for ‘{query}’
                  </Text>
                </PrimarySearchResult>
              }
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
