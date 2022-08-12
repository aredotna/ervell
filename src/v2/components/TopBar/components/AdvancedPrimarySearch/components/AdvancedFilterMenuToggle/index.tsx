import React from 'react'
import styled from 'styled-components'

import { FilterLabel } from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter/components/FilterOption'
import Box from 'v2/components/UI/Box'
import Icons from 'v2/components/UI/Icons'

interface FilterMenuToggleProps {
  open: boolean
  onClick: () => void
}

const Caret = styled(Icons).attrs({
  name: 'Caret',
  size: 6,
  color: 'gray.medium',
  mr: 2,
  mb: 1,
})`
  position: relative;
  vertical-align: middle;

  ${p => !p.open && `transform: rotate(180deg);`}
`

export const FilterMenuToggle: React.FC<FilterMenuToggleProps> = ({
  open,
  onClick,
}) => {
  const label = open ? 'Hide filters' : 'Show filters'

  return (
    <Box>
      <FilterLabel color="gray.medium" onClick={onClick}>
        <Caret open={open} /> {label}
      </FilterLabel>
    </Box>
  )
}

export default FilterMenuToggle
