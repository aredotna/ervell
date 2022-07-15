import { useLazyQuery } from '@apollo/client'
import React, { useCallback, useContext, useEffect } from 'react'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'

import PrimarySearchResult from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult'
import { ICON_OFFSET } from 'v2/components/UI/SearchInput'
import Text from 'v2/components/UI/Text'
import {
  AdvancedQuickSearch,
  AdvancedQuickSearchVariables,
} from '__generated__/AdvancedQuickSearch'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import { WhatEnum } from '__generated__/globalTypes'
import PrimarySearchResults from '../../../PrimarySearch/components/PrimarySearchResults'
import advancedSearchResultsQuery from './queries/advancedSearchResultsQuery'

interface AdvancedSearchResultsContainerProps {
  includeOriginalResults?: boolean
}

const INVALID_TYPES = [
  'Attachment',
  'Embed',
  'Image',
  'Link',
  'PendingBlock',
  'Text',
]

export const AdvancedSearchResultsContainer: React.FC<AdvancedSearchResultsContainerProps> = ({
  includeOriginalResults = true,
}) => {
  const { state, generateUrl } = useContext(AdvancedSearchContext)

  const term = state.variables.term?.facet

  const searchLabel = term ? `See all results for "${term}"` : 'See all results'

  return (
    <>
      {includeOriginalResults && term && (
        <PrimarySearchResults
          query={term}
          debouncedQuery={term}
          cursor={null}
          onSelection={() => {}}
          onClick={() => {}}
          showAllResultsLink={false}
        />
      )}
      {!includeOriginalResults && term && (
        <AdvancedSearchResults variables={state.variables} />
      )}
      {
        <PrimarySearchResult
          to={generateUrl()}
          selected={true}
          bg="gray.semiLight"
          pl={ICON_OFFSET}
        >
          <Text fontWeight="bold">{searchLabel}</Text>
        </PrimarySearchResult>
      }
    </>
  )
}

interface AdvancedSearchResultsProps {
  variables: AdvancedSearchVariables
}

export const AdvancedSearchResults: React.FC<AdvancedSearchResultsProps> = ({
  variables,
}) => {
  const { resetAll } = useContext(AdvancedSearchContext)

  const [performSearch, { called, loading, error, data }] = useLazyQuery<
    AdvancedQuickSearch,
    AdvancedQuickSearchVariables
  >(advancedSearchResultsQuery)

  const handleResultClick = useCallback(() => {
    resetAll()
  }, [])

  useEffect(() => {
    performSearch({
      variables: {
        ...variables,
        per: 6,
        what: { facets: [WhatEnum.CHANNEL, WhatEnum.GROUP, WhatEnum.USER] },
      },
    })
  }, [variables, variables.term.facet])

  if (called && loading) {
    return (
      <PrimarySearchResult pl={ICON_OFFSET}>
        <Text fontWeight="bold">Searching...</Text>
      </PrimarySearchResult>
    )
  }

  if (called && error) {
    return (
      <PrimarySearchResult pl={ICON_OFFSET}>
        <Text fontWeight="bold" color="state.alert">
          {error.message}
        </Text>
      </PrimarySearchResult>
    )
  }

  const results = called && data.searches.advanced.results

  return (
    <>
      {results.length > 0 &&
        results.map((result, _idx) => {
          if (INVALID_TYPES.includes(result.__typename)) {
            return null
          }

          const typedResult = result as any

          return (
            <PrimarySearchResult
              key={`result_${result.__typename}_${typedResult.id}`}
              result={typedResult}
              selected={false}
              onClick={handleResultClick}
            />
          )
        })}
    </>
  )
}
