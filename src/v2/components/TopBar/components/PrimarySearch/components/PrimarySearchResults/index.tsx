import React, { PureComponent } from 'react'
import { Query } from '@apollo/client/react/components'

import mod from 'v2/util/mod'

import primarySearchResultsQuery from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/queries/primarySearchResults'

import Text from 'v2/components/UI/Text'
import PrimarySearchResult from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult'

interface PrimarySearchResultsProps {
  query: string
  debouncedQuery: string
  cursor: number
  onSelection: (href) => void
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default class PrimarySearchResults extends PureComponent<
  PrimarySearchResultsProps
> {
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
    const { query, cursor, debouncedQuery, onClick } = this.props

    return (
      <Query
        query={primarySearchResultsQuery}
        variables={{ query: debouncedQuery }}
      >
        {response => {
          const { data, loading, error } = response

          if (loading) {
            return (
              <PrimarySearchResult>
                <Text fontWeight="bold">Searching...</Text>
              </PrimarySearchResult>
            )
          }

          if (error) {
            return (
              <PrimarySearchResult>
                <Text fontWeight="bold" color="state.alert">
                  {error.message}
                </Text>
              </PrimarySearchResult>
            )
          }

          const {
            searches: { results },
          } = data
          const selected = cursor && mod(cursor, results.length + 1)

          this.selectResult(results[selected])

          return (
            <React.Fragment>
              {results.map((result, idx) => (
                <PrimarySearchResult
                  key={`result_${result.__typename}_${result.id}`}
                  result={result}
                  selected={selected === idx}
                  onClick={onClick}
                />
              ))}

              {results.length > 0 && (
                <PrimarySearchResult
                  to={`/search/${encodeURIComponent(query)}`}
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
