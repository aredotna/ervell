import { useQuery } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import PrimarySearchResult from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult'
import Text from 'v2/components/UI/Text'
import {
  AdvancedQuickSearchTotal,
  AdvancedQuickSearchTotalVariables,
} from '__generated__/AdvancedQuickSearchTotal'
import { ICON_OFFSET } from '../AdvancedSearchInput'
import advancedSearchResultsTotalQuery from './queries/advancedSearchResultsTotalQuery'

interface AdvancedQuickSearchResultProps {
  index: number
  maxResults: number
  pathname: string
}

export const AdvancedSearchResultsTotal: React.FC<AdvancedQuickSearchResultProps> = ({
  index,
  maxResults,
  pathname,
}) => {
  const { generateUrl, state } = useContext(AdvancedSearchContext)
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

  if (loading) {
    const loadingLabel = term
      ? `See all results for ${term}`
      : 'See all results'
    return (
      <PrimarySearchResult
        key={`see_all_results_${index === maxResults - 1}`}
        to={generateUrl(false, pathname)}
        pl={ICON_OFFSET}
      >
        <Text fontWeight="bold">{loadingLabel}</Text>
      </PrimarySearchResult>
    )
  }

  const searchLabel = term
    ? `See all ${data?.searches?.advanced.total} results for ${term}`
    : 'See all results'

  return (
    <PrimarySearchResult
      key={`see_all_results_${index === maxResults - 1}`}
      to={generateUrl(false, pathname)}
      pl={ICON_OFFSET}
    >
      <Text fontWeight="bold">{searchLabel}</Text>
    </PrimarySearchResult>
  )
}

export default AdvancedSearchResultsTotal
