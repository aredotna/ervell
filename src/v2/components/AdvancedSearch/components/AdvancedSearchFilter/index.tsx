import React, { useCallback } from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'
import { FieldsEnum, WhatEnum, WhereEnum } from '__generated__/globalTypes'
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
  onUpdateFilter: (
    field: 'where' | 'what' | 'fields',
    filter: WhereEnum | WhatEnum | FieldsEnum
  ) => void
}

const WhereFilter: React.FC<FilterProps> = ({
  currentFilters,
  onUpdateFilter,
}) => {
  const updateProps = {
    field: 'where' as any,
    onUpdateFilter,
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
  onUpdateFilter,
}) => {
  const updateProps = {
    field: 'what' as any,
    onUpdateFilter,
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

interface AdvancedSearchFilterProps {
  onChange?: (state: AdvancedSearchVariables) => void
  searchState: AdvancedSearchVariables
}

export const AdvancedSearchFilter: React.FC<AdvancedSearchFilterProps> = ({
  onChange,
  searchState,
}) => {
  const onUpdateFilter = useCallback(
    (
      field: 'where' | 'what' | 'fields',
      filter: WhereEnum | WhatEnum | FieldsEnum
    ) => {
      console.log({ searchState })
      const typedFilter: any = filter ? filter : null
      const existingFacets = searchState[field]?.facets || []
      const existingObject = searchState[field] || {}
      const newValue = {
        ...existingObject,
        facets: [...existingFacets, typedFilter as WhereEnum],
      }
      console.log({
        newValue,
        existingFacets,
        existingObject,
        searchState,
        'searchState[field]': searchState[field],
      })
      const newState = {
        ...searchState,
        [field]: newValue,
      }
      console.log({ newState })
      onChange && onChange(newState)
    },
    [searchState, onChange]
  )

  return (
    <FiltersContainer>
      <WhereFilter
        onUpdateFilter={onUpdateFilter}
        currentFilters={searchState?.where?.facets}
      />
      <WhatFilter
        onUpdateFilter={onUpdateFilter}
        currentFilters={searchState?.what?.facets}
      />
    </FiltersContainer>
  )
}

export default AdvancedSearchFilter
