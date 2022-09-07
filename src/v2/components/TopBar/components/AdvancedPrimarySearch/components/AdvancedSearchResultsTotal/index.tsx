import { useQuery } from '@apollo/client'
import React, { useCallback, useContext, useEffect } from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import Text from 'v2/components/UI/Text'
import useRecentSearches from 'v2/hooks/useRecentSearches'
import {
  AdvancedQuickSearchTotal,
  AdvancedQuickSearchTotalVariables,
} from '__generated__/AdvancedQuickSearchTotal'
import { ICON_OFFSET } from '../AdvancedSearchInput'
import AdvancedSearchResult from '../AdvancedSearchResult'
import advancedSearchResultsTotalQuery from './queries/advancedSearchResultsTotalQuery'
import Box from 'v2/components/UI/Box'
import { AdvancedQuickSearchResult } from '__generated__/AdvancedQuickSearchResult'

interface AdvancedQuickSearchResultProps {
  index: number
  maxResults: number
  pathname: string
  selected: boolean
  onClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    result?: AdvancedQuickSearchResult
  ) => void
}

const Container = styled(Box).attrs({
  pr: 6,
  py: 6,
  bg: 'gray.light',
  borderTop: '1px solid',
  borderColor: 'gray.semiLight',
})<{ hideHover?: boolean }>`
  display: flex;
  text-decoration: none;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`

const AdvancedNoResults: React.FC = () => {
  return (
    <Container key={`no_results_0`} pl={ICON_OFFSET} bg="gray.light">
      <Text fontWeight="bold">No results</Text>
    </Container>
  )
}

export const AdvancedSearchResultsTotal: React.FC<AdvancedQuickSearchResultProps> = ({
  index,
  maxResults,
  pathname,
  selected,
}) => {
  const { generateUrl, state } = useContext(AdvancedSearchContext)
  const navigate = useNavigate()
  const { addRecentSearch } = useRecentSearches()
  const { data, loading, refetch } = useQuery<
    AdvancedQuickSearchTotal,
    AdvancedQuickSearchTotalVariables
  >(advancedSearchResultsTotalQuery, {
    variables: state.variables,
  })

  useEffect(() => {
    refetch(state.variables)
  }, [state.variables])

  const term = state.variables.term?.facet

  const handleClick = useCallback(() => {
    addRecentSearch(state.variables)
    return navigate(generateUrl(false, pathname))
  }, [state, addRecentSearch])

  if (loading) {
    const loadingLabel = term
      ? `See all results for '${term}'`
      : 'See all results'
    return (
      <AdvancedSearchResult
        key={`see_all_results_${index === maxResults - 1}`}
        to={generateUrl(false, pathname)}
        pl={ICON_OFFSET}
        selected={selected}
      >
        <Text fontWeight="bold">{loadingLabel}</Text>
      </AdvancedSearchResult>
    )
  }

  const total = data?.searches?.advanced.total

  if (total === 0) {
    return <AdvancedNoResults />
  }

  const searchLabel =
    term && total > 0
      ? `See all ${total} results for '${term}'`
      : 'See all results'

  return (
    <AdvancedSearchResult
      key={`see_all_results_${index === maxResults - 1}`}
      pl={ICON_OFFSET}
      selected={selected}
      onClick={handleClick}
    >
      <Text fontWeight="bold">{searchLabel}</Text>
    </AdvancedSearchResult>
  )
}

export default AdvancedSearchResultsTotal
