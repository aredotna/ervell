import React, { useContext } from 'react'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'

import PrimarySearchResult from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult'
import { ICON_OFFSET } from 'v2/components/UI/SearchInput'
import Text from 'v2/components/UI/Text'

export const AdvancedSearchResults: React.FC<{}> = () => {
  const { state, generateUrl } = useContext(AdvancedSearchContext)

  const searchLabel = state.variables.term?.facet
    ? `See all results for "${state.variables.term.facet}"`
    : 'See all results'

  return (
    <>
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
