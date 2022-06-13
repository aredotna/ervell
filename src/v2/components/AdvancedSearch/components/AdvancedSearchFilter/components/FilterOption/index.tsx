import React, { useCallback } from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { EnumLabelMap } from 'v2/components/AdvancedSearch/utils/labels'
import { FieldsEnum, WhatEnum, WhereEnum } from '__generated__/globalTypes'

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
`

interface FilterOptionProps {
  field: 'where' | 'what' | 'fields'
  filter: WhereEnum | WhatEnum | FieldsEnum
  currentFilters?: WhereEnum[] | WhatEnum[] | FieldsEnum[]
  toggleFilter: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    field: 'where' | 'what' | 'fields'
  ) => void
}

export const FilterOption: React.FC<FilterOptionProps> = ({
  field,
  filter,
  currentFilters = [],
  toggleFilter,
  ...rest
}) => {
  const typedCurrentFilter: any[] = currentFilters ? currentFilters : []
  const isSelected = filter && typedCurrentFilter?.includes(filter)
  const onClick = useCallback(() => {
    toggleFilter(filter, field)
  }, [toggleFilter])
  return (
    <FilterContainer active={isSelected} onClick={onClick} {...rest}>
      <FilterLabel active={isSelected}>{EnumLabelMap[filter]}</FilterLabel>
    </FilterContainer>
  )
}
