import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

import { FieldsEnum, WhatEnum, WhereEnum } from '__generated__/globalTypes'
import { AdvancedSearchContext } from '../../AdvancedSearchContext'
import { FieldsFilter } from './components/FieldsFilter'
import { Orders } from './components/Orders'
import { WhatFilter } from './components/WhatFilter'
import { WhereFilter } from './components/WhereFilter'

const FiltersContainer = styled(Box).attrs({
  display: 'flex',
  flexDirection: 'row',
})``

export const FilterContainer = styled(Box).attrs({
  mt: 5,
  pr: 5,
})`
  width: 10em;
`

export const CategoryLabel = styled(Text).attrs({
  f: 0,
  color: 'gray.medium',
  mb: 4,
})`
  text-transform: uppercase;
`

export interface FilterProps {
  currentFilters?: WhereEnum[] | WhatEnum[] | FieldsEnum[]
  toggleFilter: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    field: 'what' | 'where' | 'fields'
  ) => void
  clearAndSetAll: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    field: 'what' | 'where' | 'fields'
  ) => void
}

export const AdvancedSearchFilter: React.FC = () => {
  const { state, addFilter, removeFilter, setAllFilter } = useContext(
    AdvancedSearchContext
  )

  const toggleFilter = useCallback(
    (
      filter: WhereEnum | WhatEnum | FieldsEnum,
      field: 'what' | 'where' | 'fields'
    ) => {
      const currentFilter = (state.variables[field]?.facets as any) || null
      currentFilter == filter
        ? removeFilter(field, filter)
        : addFilter(field, filter)
    },
    [state, state.variables, addFilter, removeFilter]
  )

  const clearAndSetAll = useCallback(
    (
      _filter: WhereEnum | WhatEnum | FieldsEnum,
      field: 'what' | 'where' | 'fields'
    ) => {
      setAllFilter(field)
    },
    [state, state.variables, addFilter, removeFilter]
  )

  return (
    <FiltersContainer>
      <WhereFilter
        clearAndSetAll={clearAndSetAll}
        toggleFilter={toggleFilter}
        currentFilters={state.variables?.where?.facets}
      />
      <WhatFilter
        clearAndSetAll={clearAndSetAll}
        toggleFilter={toggleFilter}
        currentFilters={state.variables?.what?.facets}
      />
      <FieldsFilter
        clearAndSetAll={clearAndSetAll}
        toggleFilter={toggleFilter}
        currentFilters={state.variables?.fields?.facets}
      />
      <Orders />
    </FiltersContainer>
  )
}

export default AdvancedSearchFilter
