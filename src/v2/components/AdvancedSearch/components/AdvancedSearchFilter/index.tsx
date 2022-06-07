import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

import { FieldsEnum, WhatEnum, WhereEnum } from '__generated__/globalTypes'
import { AdvancedSearchContext } from '../../AdvancedSearchContext'
import { FilterOption } from './components/FilterOption'

const FiltersContainer = styled(Box).attrs({
  display: 'flex',
  flexDirection: 'row',
})``

const Container = styled(Box).attrs({
  mt: 5,
  pr: 5,
})`
  width: 10em;
`

const CategoryLabel = styled(Text).attrs({
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
}

const WhereFilter: React.FC<FilterProps> = ({
  currentFilters,
  toggleFilter,
}) => {
  const updateProps = {
    field: 'where' as any,
    toggleFilter,
  }
  return (
    <Container>
      <CategoryLabel>Where</CategoryLabel>
      <FilterOption
        currentFilters={currentFilters}
        filter={WhereEnum.ALL}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={WhereEnum.MY}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={WhereEnum.FOLLOWING}
        {...updateProps}
      />
    </Container>
  )
}

const WhatFilter: React.FC<FilterProps> = ({
  currentFilters,
  toggleFilter,
}) => {
  const updateProps = {
    field: 'what' as any,
    toggleFilter,
  }
  return (
    <Container>
      <CategoryLabel>What</CategoryLabel>
      <FilterOption
        currentFilters={currentFilters}
        filter={WhatEnum.ALL}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={WhatEnum.BLOCK}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={WhatEnum.CHANNEL}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={WhatEnum.USER}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={WhatEnum.GROUP}
        {...updateProps}
      />
    </Container>
  )
}

export const AdvancedSearchFilter: React.FC = () => {
  const { state, addFilter, removeFilter } = useContext(AdvancedSearchContext)

  const toggleFilter = useCallback(
    (
      filter: WhereEnum | WhatEnum | FieldsEnum,
      field: 'what' | 'where' | 'fields'
    ) => {
      const currentFilters = (state.variables[field]?.facets as any) || []
      console.log({ state, 'state.variables': state.variables })

      console.log({
        currentFilters,
        filter,
        field,
        'currentFilters.includes(filter)': currentFilters.includes(filter),
        'variables[field]': state.variables[field],
      })

      currentFilters.includes(filter)
        ? removeFilter(field, filter)
        : addFilter(field, filter)
    },
    [state, state.variables, addFilter, removeFilter]
  )

  return (
    <FiltersContainer>
      <WhereFilter
        toggleFilter={toggleFilter}
        currentFilters={state.variables?.where?.facets}
      />
      <WhatFilter
        toggleFilter={toggleFilter}
        currentFilters={state.variables?.what?.facets}
      />
    </FiltersContainer>
  )
}

export default AdvancedSearchFilter
