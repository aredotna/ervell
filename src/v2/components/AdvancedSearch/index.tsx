import React, { useContext } from 'react'

import SearchInput from 'v2/components/UI/SearchInput'
import { AdvancedSearchContext } from './AdvancedSearchContext'
import AdvancedSearchFilter from './components/AdvancedSearchFilter'

export const AdvancedSearch: React.FC = () => {
  const { state, updateQuery } = useContext(AdvancedSearchContext)
  return (
    <>
      <SearchInput query={state.query} onDebouncedQueryChange={updateQuery} />
      <AdvancedSearchFilter />
    </>
  )
}

export default AdvancedSearch
