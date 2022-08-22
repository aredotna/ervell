import React, { useCallback, useContext, useEffect } from 'react'
import { ApolloError, useQuery } from '@apollo/client'
import { merge } from 'merge-anything'
import { useLocation, useNavigate } from 'react-router'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'
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
import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'
import AdvancedSearchResultsTotal from '../AdvancedSearchResultsTotal'
import { AdvancedSearchResultBlock } from '../AdvancedSearchResultBlock'

interface AdvancedSearchResultsContainerProps {
  searchInputRef?: React.RefObject<HTMLInputElement>
  onAnyResultHighlighted?: React.Dispatch<React.SetStateAction<boolean>>
  onResultClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const INVALID_TYPES = ['PendingBlock']

export const AdvancedSearchResultsContainer: React.FC<AdvancedSearchResultsContainerProps> = ({
  searchInputRef,
  onAnyResultHighlighted,
  onResultClick,
}) => {
  const { state } = useContext(AdvancedSearchContext)
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
  onResultClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
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
  onResultClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
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
  const { resetAll, generateUrl, state } = useContext(AdvancedSearchContext)
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname } = location

  const onEnter = useCallback(
    ({
      element,
      state,
    }: {
      index: number
      element: AdvancedQuickSearchResult | null
      state: any
    }) => {
      if (
        element &&
        state.interactive &&
        (element.__typename === 'User' ||
          element.__typename === 'Group' ||
          element.__typename === 'Channel')
      ) {
        resetAll()
        searchInputRef?.current?.blur()
        return navigate(element.href, { state: getBreadcrumbPath(element) })
      }

      if (
        element &&
        state.interactive &&
        (element.__typename === 'Attachment' ||
          element.__typename === 'Embed' ||
          element.__typename === 'Text' ||
          element.__typename == 'Image' ||
          element.__typename === 'Link')
      ) {
        const state = location && {
          background: JSON.stringify(location),
          context: [],
        }
        searchInputRef?.current?.blur()
        return navigate(element.href, { state })
      }

      searchInputRef?.current?.blur()
      return navigate(generateUrl(false, pathname))
    },
    [searchInputRef, generateUrl, pathname, resetAll]
  )

  const results =
    !error && !loading && data ? [...data?.searches.advanced.results, null] : []

  const { index, interactive } = useKeyboardListNavigation({
    ref: searchInputRef,
    list: results,
    waitForInteractive: true,
    defaultValue: null,
    onEnter,
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

          if (
            result.__typename === 'Attachment' ||
            result.__typename === 'Embed' ||
            result.__typename === 'Image' ||
            result.__typename === 'Link' ||
            result.__typename === 'Text'
          ) {
            return (
              <AdvancedSearchResultBlock
                selected={_idx === index}
                result={result}
                onClick={onResultClick}
              />
            )
          }

          const typedResult = result as any

          return (
            <PrimarySearchResult
              key={`result_${result.__typename}_${typedResult.id}`}
              result={typedResult}
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
        />
      )}
    </>
  )
}
