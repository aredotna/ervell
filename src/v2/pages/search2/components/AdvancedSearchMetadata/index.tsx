import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import AdvancedSearchFilter from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import AdvancedSearchMetadataBreadcrumb from '../AdvancedSearchMetadataBreadcrumb'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import { generateUrlFromVariables } from 'v2/util/tokenizeAdvancedSearch'
import Box from 'v2/components/UI/Box'

const AdvancedSearchMetadata: React.FC = () => {
  const { state } = useContext(AdvancedSearchContext)
  const term = state.variables.term?.facet
  const total = state.total
  const navigate = useNavigate()

  useEffect(() => {
    navigate(generateUrlFromVariables(state.variables), { replace: true })
  }, [
    state.variables.where?.facet,
    state.variables.what?.facets,
    state.variables.fields?.facets,
    state.variables.order?.facet,
    state.variables.order?.dir,
  ])

  return (
    <Box mb={9}>
      <HeaderMetadataContainer
        breadcrumb={
          <AdvancedSearchMetadataBreadcrumb term={term} total={total} />
        }
      >
        <AdvancedSearchFilter />
      </HeaderMetadataContainer>
    </Box>
  )
}

export default AdvancedSearchMetadata
