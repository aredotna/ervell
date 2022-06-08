import React from 'react'
import {
  FilterContainer,
  FilterProps,
  CategoryLabel,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import { FilterOption } from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter/components/FilterOption'
import { FieldsEnum } from '__generated__/globalTypes'

export const FieldsFilter: React.FC<FilterProps> = ({
  currentFilters,
  toggleFilter,
  clearAndSetAll,
}) => {
  const updateProps = {
    field: 'fields' as any,
    toggleFilter,
  }
  return (
    <FilterContainer>
      <CategoryLabel>Field</CategoryLabel>
      <FilterOption
        currentFilters={currentFilters}
        filter={FieldsEnum.ALL}
        {...updateProps}
        toggleFilter={clearAndSetAll}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={FieldsEnum.NAME}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={FieldsEnum.DESCRIPTION}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={FieldsEnum.DOMAIN}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={FieldsEnum.URL}
        {...updateProps}
      />
    </FilterContainer>
  )
}
