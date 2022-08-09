import React, { useCallback } from 'react'
import { AnyFilter } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import {
  FilterContainer,
  CategoryLabel,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import {
  FilterLabel,
  FilterContainer as FilterLabelContainer,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter/components/FilterOption'
import { TypedEnumLabelMap } from 'v2/components/AdvancedSearch/utils/labels'
import { FieldsEnum, WhatEnum, WhereEnum } from '__generated__/globalTypes'
interface WhereFilterOptionProps {
  field: 'where' | 'what' | 'fields'
  filter: WhereEnum
  currentFilter?: WhereEnum
  currentDisabledFilters?: AnyFilter[]
  toggleFilter: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    field: 'where' | 'what' | 'fields'
  ) => void
  active?: boolean
}

export const WhereFilterOption: React.FC<WhereFilterOptionProps> = ({
  field,
  filter,
  currentFilter = [],
  currentDisabledFilters,
  toggleFilter,
  active,
  ...rest
}) => {
  const isDisabled = currentDisabledFilters?.includes(filter)
  const isSelected = active || (filter && currentFilter === filter)

  const onClick = useCallback(() => {
    if (!isDisabled) {
      toggleFilter(filter, field)
    }
  }, [toggleFilter, currentDisabledFilters])

  return (
    <FilterLabelContainer
      disabled={isDisabled}
      active={isSelected}
      onClick={onClick}
      {...rest}
    >
      <FilterLabel disabled={isDisabled} active={isSelected}>
        {TypedEnumLabelMap[field][filter]}
      </FilterLabel>
    </FilterLabelContainer>
  )
}

interface WhereFilterProps {
  currentFilter: WhereEnum
  currentDisabledFilters?: AnyFilter[]
  id?: number
  toggleFilter: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    field: 'what' | 'where' | 'fields'
  ) => void
  clearAndSetAll: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    field: 'what' | 'where' | 'fields'
  ) => void
}

export const WhereFilter: React.FC<WhereFilterProps> = ({
  currentFilter,
  toggleFilter,
  clearAndSetAll,
  currentDisabledFilters,
  id,
}) => {
  const updateProps = {
    field: 'where' as any,
    toggleFilter,
    currentDisabledFilters,
  }

  const typedCurrentFilter = currentFilter as WhereEnum
  const defaultSelected =
    !typedCurrentFilter || typedCurrentFilter === WhereEnum.ALL

  return (
    <FilterContainer>
      <CategoryLabel>Where</CategoryLabel>
      <WhereFilterOption
        currentFilter={currentFilter}
        filter={WhereEnum.ALL}
        {...updateProps}
        toggleFilter={clearAndSetAll}
        active={defaultSelected}
      />
      <WhereFilterOption
        currentFilter={currentFilter}
        filter={WhereEnum.MY}
        {...updateProps}
      />
      <WhereFilterOption
        currentFilter={currentFilter}
        filter={WhereEnum.FOLLOWING}
        {...updateProps}
      />
      {id && (
        <WhereFilterOption
          currentFilter={currentFilter}
          filter={WhereEnum.USER}
          {...updateProps}
        />
      )}
    </FilterContainer>
  )
}
