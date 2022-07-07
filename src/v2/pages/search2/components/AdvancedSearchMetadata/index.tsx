import React, { useContext } from 'react'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import AdvancedSearchFilter from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import AdvancedSearchMetadataBreadcrumb from '../AdvancedSearchMetadataBreadcrumb'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'

const AdvancedSearchMetadata: React.FC = () => {
  const { state } = useContext(AdvancedSearchContext)
  const term = state.variables.term.facet

  return (
    <HeaderMetadataContainer
      breadcrumb={<AdvancedSearchMetadataBreadcrumb term={term} />}
    >
      <AdvancedSearchFilter />
    </HeaderMetadataContainer>
  )
}

export default AdvancedSearchMetadata
