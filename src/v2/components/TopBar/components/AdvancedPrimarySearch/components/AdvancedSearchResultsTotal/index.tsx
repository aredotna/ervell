import { useQuery } from '@apollo/client'
import React, { useCallback, useContext, useEffect } from 'react'
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

interface AdvancedQuickSearchResultProps {
  index: number
  maxResults: number
  pathname: string
  selected: boolean
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
    return (
      <AdvancedSearchResult
        key={`no_results_${index === maxResults - 1}`}
        pl={ICON_OFFSET}
        bg="background"
      >
        <Text fontWeight="bold">No results</Text>
      </AdvancedSearchResult>
    )
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
