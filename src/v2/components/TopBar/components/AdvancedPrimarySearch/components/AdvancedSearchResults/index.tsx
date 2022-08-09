import { ApolloError, useLazyQuery } from '@apollo/client'
import { merge } from 'merge-anything'
import React, { useCallback, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'
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
import PrimarySearchResults from '../../../PrimarySearch/components/PrimarySearchResults'
import advancedSearchResultsQuery from './queries/advancedSearchResultsQuery'
import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'
import { isEmpty } from 'lodash'

interface AdvancedSearchResultsContainerProps {
  includeOriginalResults?: boolean
  searchInputRef?: React.RefObject<HTMLInputElement>
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
  searchInputRef,
}) => {
  const { state } = useContext(AdvancedSearchContext)

  const term = state.variables.term?.facet

  return (
    <>
      {includeOriginalResults && term && (
        <>
          <PrimarySearchResults
            query={term}
            debouncedQuery={term}
            cursor={null}
            onSelection={() => {}}
            onClick={() => {}}
            showAllResultsLink={false}
          />
        </>
      )}
      {!includeOriginalResults && (
        <AdvancedSearchResultsQuery
          variables={state.variables}
          searchInputRef={searchInputRef}
        />
      )}
    </>
  )
}

interface AdvancedSearchResultsQueryProps {
  variables: AdvancedSearchVariables
  searchInputRef?: React.RefObject<HTMLInputElement>
}

const DEFAULTS: AdvancedSearchVariables = {
  page: 1,
  per: 6,
  what: { facets: [WhatEnum.CHANNEL, WhatEnum.GROUP, WhatEnum.USER] },
}

export const AdvancedSearchResultsQuery: React.FC<AdvancedSearchResultsQueryProps> = ({
  variables,
  searchInputRef,
}) => {
  const [performSearch, { called, loading, error, data }] = useLazyQuery<
    AdvancedQuickSearch,
    AdvancedQuickSearchVariables
  >(advancedSearchResultsQuery)

  useDeepCompareEffect(() => {
    const mergedVariables = merge(DEFAULTS, variables, {
      per: 10,
      page: 1,
    }) as any
    if (mergedVariables.term?.facet && !isEmpty(mergedVariables.term?.facet)) {
      performSearch({ variables: mergedVariables })
    }
  }, [variables, variables?.where?.facet])

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

  return (
    <AdvancedSearchResults
      data={data}
      term={variables.term?.facet}
      called={called}
      loading={loading}
      error={error}
      searchInputRef={searchInputRef}
    />
  )
}

interface AdvancedSearchResultsProps {
  data: AdvancedQuickSearch | null
  term?: string
  loading: boolean
  error: ApolloError | null
  called: boolean
  searchInputRef?: React.RefObject<HTMLInputElement>
}

const AdvancedSearchResults: React.FC<AdvancedSearchResultsProps> = ({
  data,
  term,
  loading,
  error,
  called,
  searchInputRef,
}) => {
  const { resetAll, generateUrl } = useContext(AdvancedSearchContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const searchLabel = term ? `See all results for "${term}"` : 'See everything'

  const handleResultClick = useCallback(() => {
    resetAll()
  }, [])

  const onEnter = useCallback(
    ({
      element,
    }: {
      index: number
      element: AdvancedQuickSearchResult | null
    }) => {
      if (
        element &&
        (element.__typename === 'User' ||
          element.__typename === 'Group' ||
          element.__typename === 'Channel')
      ) {
        return navigate(element.href, { state: getBreadcrumbPath(element) })
      }
      searchInputRef?.current?.blur()
      return navigate(generateUrl(false, pathname))
    },
    [searchInputRef, generateUrl, pathname]
  )

  const results =
    !error && !loading && data ? [...data?.searches.advanced.results, null] : []

  const { index } = useKeyboardListNavigation({
    ref: searchInputRef,
    list: results,
    waitForInteractive: true,
    onEnter,
  })

  const maxResults = results.length

  return (
    <>
      {called && error && (
        <PrimarySearchResult pl={ICON_OFFSET}>
          <Text fontWeight="bold" color="state.alert">
            {error.message}
          </Text>
        </PrimarySearchResult>
      )}

      {called && loading && (
        <PrimarySearchResult pl={ICON_OFFSET}>
          <Text fontWeight="bold">Searching...</Text>
        </PrimarySearchResult>
      )}

      {called &&
        term &&
        data?.searches.advanced.results &&
        data?.searches.advanced.results.length > 0 &&
        data?.searches.advanced.results.map((result, _idx) => {
          if (INVALID_TYPES.includes(result.__typename)) {
            return null
          }

          const typedResult = result as any

          return (
            <PrimarySearchResult
              key={`result_${result.__typename}_${typedResult.id}`}
              result={typedResult}
              selected={_idx === index}
              onClick={handleResultClick}
            />
          )
        })}

      <PrimarySearchResult
        key={`see_all_results_${index === maxResults - 1}`}
        to={generateUrl(false, pathname)}
        pl={ICON_OFFSET}
      >
        <Text fontWeight="bold">{searchLabel}</Text>
      </PrimarySearchResult>
    </>
  )
}
