import { omit } from 'lodash'
import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router'
import {
  AnyFilter,
  AdvancedSearchContext,
} from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import {
  FilterContainer,
  CategoryLabel,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import {
  FilterLabel,
  FilterContainer as FilterLabelContainer,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter/components/FilterOption'
import { TypedEnumLabelMap } from 'v2/components/AdvancedSearch/utils/labels'
import { generateUrlFromVariables } from 'v2/util/tokenizeAdvancedSearch'
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
  id?: string
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
      {!id && (
        <>
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
        </>
      )}
      {id && (
        <>
          <WhereFilterRemoveScope />
          <WhereFilterOption
            currentFilter={currentFilter}
            filter={currentFilter}
            {...updateProps}
          />
        </>
      )}
    </FilterContainer>
  )
}

const WhereFilterRemoveScope: React.FC = () => {
  const { state } = useContext(AdvancedSearchContext)
  const navigate = useNavigate()

  const onClick = useCallback(() => {
    const variables = omit(state.variables, 'where')
    const url = generateUrlFromVariables(variables)
    navigate(`${url}`)
  }, [navigate, state.variables])

  return (
    <FilterLabelContainer onClick={onClick}>
      <FilterLabel>All Are.na</FilterLabel>
    </FilterLabelContainer>
  )
}
