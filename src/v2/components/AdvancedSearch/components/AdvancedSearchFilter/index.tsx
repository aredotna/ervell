import React from 'react'
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
}

const WhereFilter: React.FC<FilterProps> = ({ currentFilters }) => {
  return (
    <Container>
      <CategoryLabel>Where</CategoryLabel>
      <FilterOption currentFilters={currentFilters} filter={WhereEnum.ALL} />
      <FilterOption currentFilters={currentFilters} filter={WhereEnum.MY} />
      <FilterOption
        currentFilters={currentFilters}
        filter={WhereEnum.FOLLOWING}
      />
    </Container>
  )
}

const WhatFilter: React.FC<FilterProps> = ({ currentFilters }) => {
  return (
    <Container>
      <CategoryLabel>What</CategoryLabel>
      <FilterOption currentFilters={currentFilters} filter={WhatEnum.ALL} />
      <FilterOption currentFilters={currentFilters} filter={WhatEnum.BLOCK} />
      <FilterOption currentFilters={currentFilters} filter={WhatEnum.CHANNEL} />
      <FilterOption currentFilters={currentFilters} filter={WhatEnum.USER} />
      <FilterOption currentFilters={currentFilters} filter={WhatEnum.GROUP} />
    </Container>
  )
}

interface AdvancedSearchFilterProps {
  onChange?: (state: AdvancedSearchVariables) => void
  searchState: AdvancedSearchVariables
}

export const AdvancedSearchFilter: React.FC<AdvancedSearchFilterProps> = ({
  // onChange,dumbledore
  searchState,
}) => {
  return (
    <FiltersContainer>
      <WhereFilter currentFilters={searchState?.where?.facets} />
      <WhatFilter currentFilters={searchState?.what?.facets} />
    </FiltersContainer>
  )
}

export default AdvancedSearchFilter
