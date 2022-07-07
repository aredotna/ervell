import React, { useCallback } from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { TypedEnumLabelMap } from 'v2/components/AdvancedSearch/utils/labels'
import { FieldsEnum, WhatEnum, WhereEnum } from '__generated__/globalTypes'
import { AnyFilter } from 'v2/components/AdvancedSearch/AdvancedSearchContext'

export const FilterContainer = styled(Box).attrs({
  p: 1,
})`
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.gray.semiLight};
  }
  ${props =>
    props.active &&
    `
    background-color: ${props.theme.colors.gray.light};
  `}

  ${props =>
    props.disabled &&
    `
    cursor: default;

    &:hover {
      background-color: transparent;
    }
  `}
`

export const FilterLabel = styled(Text).attrs({
  f: 1,
  lineHeight: 1.5,
  fontWeight: 'bold',
})`
  ${props =>
    props.active &&
    `
    color: ${props.theme.colors.gray.bold};
  `}

  ${props =>
    props.disabled &&
    `
    color: ${props.theme.colors.gray.semiLight};
  `}
`

interface FilterOptionProps {
  field: 'where' | 'what' | 'fields'
  filter: WhereEnum | WhatEnum | FieldsEnum
  currentFilters?: WhereEnum[] | WhatEnum[] | FieldsEnum[]
  currentDisabledFilters?: AnyFilter[]
  toggleFilter: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    field: 'where' | 'what' | 'fields'
  ) => void
}

export const FilterOption: React.FC<FilterOptionProps> = ({
  field,
  filter,
  currentFilters = [],
  currentDisabledFilters,
  toggleFilter,
  ...rest
}) => {
  const typedCurrentFilter: any[] = currentFilters ? currentFilters : []
  const isDisabled = currentDisabledFilters?.includes(filter)
  const isSelected = filter && typedCurrentFilter?.includes(filter)
  const onClick = useCallback(() => {
    if (!isDisabled) {
      toggleFilter(filter, field)
    }
  }, [toggleFilter, currentDisabledFilters])
  return (
    <FilterContainer
      disabled={isDisabled}
      active={isSelected}
      onClick={onClick}
      {...rest}
    >
      <FilterLabel disabled={isDisabled} active={isSelected}>
        {TypedEnumLabelMap[field][filter]}
      </FilterLabel>
    </FilterContainer>
  )
}
