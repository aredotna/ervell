import React from 'react'
import styled from 'styled-components'

import { FilterLabel } from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter/components/FilterOption'
import Box from 'v2/components/UI/Box'
import Icons from 'v2/components/UI/Icons'
import constants from 'v2/styles/constants'

interface FilterMenuToggleProps {
  open: boolean
  onClick: () => void
}

const Caret = styled(Icons).attrs({
  name: 'Dropdown',
  size: 6,
  color: 'gray.medium',
  mr: 2,
  mb: 1,
})`
  position: relative;
  vertical-align: middle;

  ${p => !p.open && `transform: rotate(180deg);`}

  ${constants.media.small`
    display: none;
  `}
`

const Container = styled(Box)`
  width: 100px;
  &:hover ${FilterLabel} {
    color: ${p => p.theme.colors.gray.bold};
  }

  &:hover ${Caret} path {
    fill: ${p => p.theme.colors.gray.bold};
  }
`

export const FilterMenuToggle: React.FC<FilterMenuToggleProps> = ({
  open,
  onClick,
}) => {
  const label = open ? 'Hide filters' : 'Show filters'

  return (
    <Container>
      <FilterLabel color="gray.medium" onClick={onClick}>
        <Caret open={open} /> {label}
      </FilterLabel>
    </Container>
  )
}

export default FilterMenuToggle
