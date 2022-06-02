import React from 'react'
import { useQuery } from '@apollo/client'

import mod from 'v2/util/mod'

import primarySearchResultsQuery from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/queries/primarySearchResults'

import Text from 'v2/components/UI/Text'
import PrimarySearchResult from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult'
import { QuickSearch } from '__generated__/QuickSearch'
import { ICON_OFFSET } from 'v2/components/UI/SearchInput'

interface PrimarySearchResultsProps {
  query: string
  debouncedQuery: string
  cursor: number
  onSelection: (href) => void
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const PrimarySearchResults: React.FC<PrimarySearchResultsProps> = ({
  query,
  debouncedQuery,
  cursor = null,
  onSelection = () => {},
  onClick,
}) => {
  const selectResult = result => {
    if (result) return onSelection(result.href)

    return onSelection(`/search/${encodeURIComponent(query)}`)
  }

  const { data, loading, error } = useQuery<QuickSearch>(
    primarySearchResultsQuery,
    { variables: { query: debouncedQuery } }
  )

  if (loading) {
    return (
      <PrimarySearchResult pl={ICON_OFFSET}>
        <Text fontWeight="bold">Searching...</Text>
      </PrimarySearchResult>
    )
  }

  if (error) {
    console.log({ error })
    return (
      <PrimarySearchResult pl={ICON_OFFSET}>
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

  selectResult(results[selected])

  return (
    <>
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
          pl={ICON_OFFSET}
        >
          <Text fontWeight="bold">See all results for ‘{query}’</Text>
        </PrimarySearchResult>
      )}
    </>
  )
}

export default PrimarySearchResults
