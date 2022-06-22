import React from 'react'
import {
  FilterContainer,
  FilterProps,
  CategoryLabel,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import { FilterOption } from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter/components/FilterOption'
import { WhereEnum } from '__generated__/globalTypes'

export const WhereFilter: React.FC<FilterProps> = ({
  currentFilters,
  toggleFilter,
  clearAndSetAll,
  currentDisabledFilters,
}) => {
  const updateProps = {
    field: 'where' as any,
    toggleFilter,
    currentDisabledFilters,
  }
  return (
    <FilterContainer>
      <CategoryLabel>Where</CategoryLabel>
      <FilterOption
        currentFilters={currentFilters}
        filter={WhereEnum.ALL}
        {...updateProps}
        toggleFilter={clearAndSetAll}
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
    </FilterContainer>
  )
}
