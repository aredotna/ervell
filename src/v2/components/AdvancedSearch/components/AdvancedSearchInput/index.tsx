import React, { useContext } from 'react'

import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import SearchInput from 'v2/components/UI/SearchInput'

export const AdvancedSearchInput: React.FC = () => {
  const { state, updateQuery } = useContext(AdvancedSearchContext)
  return (
    <>
      <SearchInput query={state.query} onDebouncedQueryChange={updateQuery} />
    </>
  )
}

export default AdvancedSearchInput
