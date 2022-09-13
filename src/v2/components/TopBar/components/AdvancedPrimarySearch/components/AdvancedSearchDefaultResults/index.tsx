import React, { useEffect } from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import { ICON_OFFSET } from 'v2/components/UI/SearchInput'

import {
  generateUrlFromVariables,
  stringifyVariables,
} from 'v2/util/tokenizeAdvancedSearch'

import Text from 'v2/components/UI/Text'
import useRecentSearches, { isFullSearch } from 'v2/hooks/useRecentSearches'
import useSearchKeyboardNavigation from '../../hooks/useSearchKeyboardNavigation'

import AdvancedSearchResult from '../AdvancedSearchResult'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import { omit } from 'lodash'

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
}

export const AdvancedSearchDefaultResults: React.FC<AdvancedSearchDefaultResultsProps> = ({
  searchInputRef,
  onAnyResultHighlighted,
}) => {
  const { recentSearches } = useRecentSearches()

  const { index, interactive } = useSearchKeyboardNavigation({
    searchInputRef,
    results: recentSearches || [],
  })

  useEffect(() => {
    if (onAnyResultHighlighted) {
      onAnyResultHighlighted(interactive)
    }
  }, [interactive])

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
            .filter(x => x)
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
      </>
    )
  }
  return null
}
