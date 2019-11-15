import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import mod from 'v2/util/mod'

import primarySearchResultsQuery from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/queries/primarySearchResults'

import Text from 'v2/components/UI/Text'
import PrimarySearchResult from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult'

export default class PrimarySearchResults extends PureComponent {
  static propTypes = {
    query: PropTypes.string.isRequired,
    cursor: PropTypes.number,
    onSelection: PropTypes.func,
  }

  static defaultProps = {
    cursor: null,
    onSelection: () => {},
  }

  selectResult = result => {
    const { query, onSelection } = this.props

    if (result) return onSelection(result.href)

    return onSelection(`/search/${encodeURIComponent(query)}`)
  }

  render() {
    const { query, cursor, debouncedQuery } = this.props

    return (
      <Query
        query={primarySearchResultsQuery}
        variables={{ query: debouncedQuery }}
      >
        {({ data, loading, error }) => {
          const { searches } = data

          if (loading && !searches) {
            this.selectResult()

            return (
              <PrimarySearchResult>
                <Text fontWeight="bold">Searching...</Text>
              </PrimarySearchResult>
            )
          }

          if (error) {
            this.selectResult()

            return (
              <PrimarySearchResult>
                <Text fontWeight="bold" color="state.alert">
                  {error.message}
                </Text>
              </PrimarySearchResult>
            )
          }

          const { results } = searches
          const selected = cursor && mod(cursor, results.length + 1)

          this.selectResult(results[selected])

          return (
            <React.Fragment>
              {results.map((result, idx) => (
                <PrimarySearchResult
                  key={`result_${result.__typename}_${result.id}`}
                  result={result}
                  selected={selected === idx}
                />
              ))}

              {results.length > 0 && (
                <PrimarySearchResult
                  href={`/search/${encodeURIComponent(query)}`}
                  selected={selected === results.length}
                  bg="gray.semiLight"
                >
                  <Text fontWeight="bold">See all results for ‘{query}’</Text>
                </PrimarySearchResult>
              )}
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}
