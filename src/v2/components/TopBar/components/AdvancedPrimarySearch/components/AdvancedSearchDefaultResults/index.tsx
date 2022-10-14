import React, { useEffect } from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import { ICON_OFFSET } from 'v2/components/UI/SearchInput'

import {
  generateUrlFromVariables,
  stringifyVariables,
} from 'v2/util/tokenizeAdvancedSearch'

import Text from 'v2/components/UI/Text'
import useRecentSearches, {
  isFullSearch,
  MAX_RECENT_SEARCHES,
} from 'v2/hooks/useRecentSearches'
import useSearchKeyboardNavigation from '../../hooks/useSearchKeyboardNavigation'

import AdvancedSearchResult from '../AdvancedSearchResult'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import { isEmpty, omit } from 'lodash'
import { State } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import AdvancedSearchResultsTotal from '../AdvancedSearchResultsTotal'
import { AdvancedQuickSearchResult } from '__generated__/AdvancedQuickSearchResult'
import { useLocation } from 'react-router'

const Label = styled(Text).attrs({
  f: [0],
  color: 'gray.medium',
})`
  text-transform: uppercase;
`

const ResultContainer = styled(Box)`
  padding-left: ${ICON_OFFSET};
`

const Term = styled(Text).attrs({
  f: [4],
  color: 'gray.bold',
  pr: 3,
})`
  display: inline-block;
`

const Variables = styled(Term).attrs({
  color: 'gray.medium',
})``

const LabelContainer = styled(Box).attrs({
  pr: 6,
  py: 6,
  bg: 'gray.light',
  borderTop: '1px solid',
  borderColor: 'gray.semiLight',
})`
  display: flex;
  text-decoration: none;
  flex-direction: row;
  align-items: center;
`

const FullSearchResult: React.FC<{
  result: AdvancedSearchVariables
  selected: boolean
}> = ({ result, selected }) => {
  const term = result.term?.facet || '(All results)'
  const variables = stringifyVariables(omit(result, 'term'))

  return (
    <AdvancedSearchResult
      to={generateUrlFromVariables(result)}
      selected={selected}
    >
      <ResultContainer>
        <Term>{term}</Term>
        <Variables>{variables}</Variables>
      </ResultContainer>
    </AdvancedSearchResult>
  )
}

interface AdvancedSearchDefaultResultsProps {
  searchInputRef?: React.RefObject<HTMLInputElement>
  onAnyResultHighlighted?: React.Dispatch<React.SetStateAction<boolean>>
  anyResultHighlighted?: boolean
  state: State
  onResultClick: (
    e: AnimationPlaybackEventInit,
    result?: AdvancedQuickSearchResult
  ) => void
}

export const AdvancedSearchDefaultResults: React.FC<AdvancedSearchDefaultResultsProps> = ({
  searchInputRef,
  onAnyResultHighlighted,
  anyResultHighlighted,
  state,
  onResultClick,
}) => {
  const { recentSearches } = useRecentSearches()
  const location = useLocation()
  const { pathname } = location

  const { index, interactive } = useSearchKeyboardNavigation({
    searchInputRef,
    results: recentSearches || [],
  })

  useEffect(() => {
    if (onAnyResultHighlighted) {
      onAnyResultHighlighted(interactive)
    }
  }, [interactive])

  const showSeeAllResults =
    state?.variables?.where && state?.variables?.where[0]?.id

  if (recentSearches?.length > 0) {
    return (
      <>
        <LabelContainer hideHover>
          <ResultContainer>
            <Label>Recent Searches</Label>
          </ResultContainer>
        </LabelContainer>

        {recentSearches &&
          recentSearches
            .filter(x => !isEmpty(x))
            .map((search, _idx) => {
              const selected = index === _idx

              if (isFullSearch(search)) {
                return <FullSearchResult selected={selected} result={search} />
              }

              const typedResult = search as any

              return (
                <AdvancedSearchResult
                  key={`result_${search.__typename}_${typedResult.id}`}
                  result={typedResult}
                  selected={selected}
                />
              )
            })}

        {showSeeAllResults && (
          <AdvancedSearchResultsTotal
            index={index}
            maxResults={MAX_RECENT_SEARCHES}
            pathname={pathname}
            selected={index == MAX_RECENT_SEARCHES - 1}
            onClick={onResultClick}
            anyResultHighlighted={anyResultHighlighted}
          />
        )}
      </>
    )
  }
  return (
    <>
      {showSeeAllResults && (
        <AdvancedSearchResultsTotal
          index={index}
          maxResults={MAX_RECENT_SEARCHES}
          pathname={pathname}
          selected={index == MAX_RECENT_SEARCHES - 1}
          onClick={onResultClick}
          anyResultHighlighted={anyResultHighlighted}
        />
      )}
    </>
  )
}
