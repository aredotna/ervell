import React, { useCallback } from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { TypedEnumLabelMap } from 'v2/components/AdvancedSearch/utils/labels'
import { FieldsEnum, WhatEnum, WhereEnum } from '__generated__/globalTypes'
import constants from 'v2/styles/constants'
import {
  currentFilterIsDisabled,
  DisabledFilters,
} from 'v2/components/AdvancedSearch/utils/filters'

export const FilterLabel = styled(Text).attrs({
  f: 1,
  lineHeight: 1.5,
  fontWeight: 'bold',
})`
  cursor: pointer;

  ${props =>
    props.active &&
    `
    color: ${props.theme.colors.gray.bold};
  `}

  ${props =>
    props.disabled &&
    `
    pointer-events: none;
    color: ${props.theme.colors.gray.regular};
  `}
`

export const FilterContainer = styled(Box).attrs({
  p: 1,
})`
  cursor: pointer;
  border-radius: ${constants.radii.subtle};

  &:hover {
    background-color: ${props => props.theme.colors.gray.cell};
  }

  ${props =>
    props.active &&
    `
    background-color: ${props.theme.colors.gray.hint};
  `}

  ${props =>
    !props.disabled &&
    `
    &:hover ${FilterLabel} { 
      color: ${props.theme.colors.gray.bold}; 
    }`}

  ${props =>
    props.disabled &&
    `
    cursor: default;
    pointer-events: none;

    &:hover {
      background-color: transparent;
    }
  `}
`

interface FilterOptionProps {
  field: 'where' | 'what' | 'fields'
  filter: WhereEnum | WhatEnum | FieldsEnum
  currentFilters?: WhereEnum[] | WhatEnum[] | FieldsEnum[]
  currentDisabledFilters?: DisabledFilters
  toggleFilter: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    field: 'where' | 'what' | 'fields'
  ) => void
  active?: boolean
}

export const FilterOption: React.FC<FilterOptionProps> = ({
  field,
  filter,
  currentFilters = [],
  currentDisabledFilters,
  toggleFilter,
  active,
  ...rest
}) => {
  const typedCurrentFilter: any[] = currentFilters ? currentFilters : []
  const isDisabled = currentFilterIsDisabled(
    field,
    filter,
    currentDisabledFilters
  )
  const isSelected = active || (filter && typedCurrentFilter?.includes(filter))

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
