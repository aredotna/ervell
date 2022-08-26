import React, { useContext, useEffect } from 'react'
import { ApolloError, useQuery } from '@apollo/client'
import { merge } from 'merge-anything'
import { useLocation } from 'react-router'
import { isEmpty } from 'lodash'

import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import PrimarySearchResult from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult'
import { ICON_OFFSET } from 'v2/components/UI/SearchInput'
import Text from 'v2/components/UI/Text'
import {
  AdvancedQuickSearch,
  AdvancedQuickSearchVariables,
} from '__generated__/AdvancedQuickSearch'
import { AdvancedQuickSearchResult } from '__generated__/AdvancedQuickSearchResult'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import { WhatEnum } from '__generated__/globalTypes'
import advancedSearchResultsQuery from './queries/advancedSearchResultsQuery'
import AdvancedSearchResultsTotal from '../AdvancedSearchResultsTotal'
import { AdvancedSearchDefaultResults } from '../AdvancedSearchDefaultResults'
import AdvancedSearchResult from '../AdvancedSearchResult'
import useSearchKeyboardNavigation from '../../hooks/useSearchKeyboardNavigation'

interface AdvancedSearchResultsContainerProps {
  searchInputRef?: React.RefObject<HTMLInputElement>
  onAnyResultHighlighted?: React.Dispatch<React.SetStateAction<boolean>>
  onResultClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    result?: AdvancedQuickSearchResult
  ) => void
}

const INVALID_TYPES = ['PendingBlock']

export const AdvancedSearchResultsContainer: React.FC<AdvancedSearchResultsContainerProps> = ({
  searchInputRef,
  onAnyResultHighlighted,
  onResultClick,
}) => {
  const { state } = useContext(AdvancedSearchContext)

  const showRecentSearches = state.variables.term?.facet === undefined

  if (showRecentSearches) {
    return (
      <AdvancedSearchDefaultResults
        onAnyResultHighlighted={onAnyResultHighlighted}
      />
    )
  }

  return (
    <>
      <AdvancedSearchResultsQuery
        variables={state.variables}
        searchInputRef={searchInputRef}
        onAnyResultHighlighted={onAnyResultHighlighted}
        onResultClick={onResultClick}
      />
    </>
  )
}

interface AdvancedSearchResultsQueryProps {
  variables: AdvancedSearchVariables
  searchInputRef?: React.RefObject<HTMLInputElement>
  onAnyResultHighlighted?: React.Dispatch<React.SetStateAction<boolean>>
  onResultClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    result?: AdvancedQuickSearchResult
  ) => void
}

const DEFAULTS = (hasId: boolean): AdvancedSearchVariables => ({
  page: 1,
  per: 6,
  what: {
    facets: hasId
      ? [WhatEnum.ALL]
      : [WhatEnum.CHANNEL, WhatEnum.GROUP, WhatEnum.USER],
  },
})

export const AdvancedSearchResultsQuery: React.FC<AdvancedSearchResultsQueryProps> = ({
  variables,
  searchInputRef,
  onAnyResultHighlighted,
  onResultClick,
}) => {
  const skipQuery = isEmpty(variables.term?.facet)

  const { refetch, loading, error, data } = useQuery<
    AdvancedQuickSearch,
    AdvancedQuickSearchVariables
  >(advancedSearchResultsQuery, { variables, skip: skipQuery })

  useEffect(() => {
    const mergedVariables = merge(DEFAULTS(!!variables?.where?.id), variables, {
      per: 10,
      page: 1,
    }) as any
    if (mergedVariables.term?.facet && !isEmpty(mergedVariables.term?.facet)) {
      refetch(mergedVariables)
    }
  }, [variables, variables?.where])

  if (loading) {
    return (
      <PrimarySearchResult pl={ICON_OFFSET}>
        <Text fontWeight="bold">Searching...</Text>
      </PrimarySearchResult>
    )
  }

  if (error) {
    return (
      <PrimarySearchResult pl={ICON_OFFSET}>
        <Text fontWeight="bold" color="state.alert">
          {error.message}
        </Text>
      </PrimarySearchResult>
    )
  }

  return (
    <AdvancedSearchResults
      data={data}
      term={variables.term?.facet}
      loading={loading}
      error={error}
      searchInputRef={searchInputRef}
      onAnyResultHighlighted={onAnyResultHighlighted}
      onResultClick={onResultClick}
    />
  )
}

interface AdvancedSearchResultsProps {
  data: AdvancedQuickSearch | null
  term?: string
  loading: boolean
  error: ApolloError | null
  searchInputRef?: React.RefObject<HTMLInputElement>
  onResultClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    result?: AdvancedQuickSearchResult
  ) => void
  onAnyResultHighlighted?: React.Dispatch<React.SetStateAction<boolean>>
}

const AdvancedSearchResults: React.FC<AdvancedSearchResultsProps> = ({
  data,
  term,
  loading,
  error,
  searchInputRef,
  onResultClick,
  onAnyResultHighlighted,
}) => {
  const { state } = useContext(AdvancedSearchContext)
  const location = useLocation()
  const { pathname } = location

  const results =
    !error && !loading && data ? [...data?.searches.advanced.results, null] : []

  const { index, interactive } = useSearchKeyboardNavigation({
    searchInputRef,
    results,
  })

  useEffect(() => {
    if (onAnyResultHighlighted) {
      onAnyResultHighlighted(interactive)
    }
  }, [interactive])

  const maxResults = results.length

  return (
    <>
      {error && (
        <PrimarySearchResult pl={ICON_OFFSET}>
          <Text fontWeight="bold" color="state.alert">
            {error.message}
          </Text>
        </PrimarySearchResult>
      )}

      {loading && (
        <PrimarySearchResult pl={ICON_OFFSET}>
          <Text fontWeight="bold">Searching...</Text>
        </PrimarySearchResult>
      )}

      {term &&
        data?.searches.advanced.results &&
        data?.searches.advanced.results.length > 0 &&
        data?.searches.advanced.results.map((result, _idx) => {
          if (INVALID_TYPES.includes(result.__typename)) {
            return null
          }

          return (
            <AdvancedSearchResult
              key={`result_${result.__typename}_${result.id}`}
              result={result}
              selected={_idx === index}
              onClick={onResultClick}
            />
          )
        })}

      {(term || state?.variables?.where?.id) && (
        <AdvancedSearchResultsTotal
          index={index}
          maxResults={maxResults}
          pathname={pathname}
          selected={index == maxResults - 1}
        />
      )}
    </>
  )
}
