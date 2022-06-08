import React from 'react'

import AdvancedSearchFilter from './components/AdvancedSearchFilter'
import AdvancedSearchInput from './components/AdvancedSearchInput'

export const AdvancedSearch: React.FC = () => {
  return (
    <>
      <AdvancedSearchInput />
      <AdvancedSearchFilter />
    </>
  )
}

export default AdvancedSearch
