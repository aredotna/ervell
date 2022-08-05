import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import { ICON_OFFSET } from 'v2/components/UI/SearchInput'
import AdvancedFilter from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import FilterMenuToggle from '../AdvancedFilterMenuToggle'

const Container = styled(Box)<{ open: boolean }>`
  background-color: ${p => p.theme.colors.gray.light};
  padding: ${p => (p.open ? p.theme.space[3] : p.theme.space[3])} ${ICON_OFFSET}
    ${p => (p.open ? p.theme.space[8] : p.theme.space[6])};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

interface AdvancedSearchFilterProps {
  toggleOpen: () => void
}

export const AdvancedSearchFilter: React.FC<AdvancedSearchFilterProps> = ({
  toggleOpen,
}) => {
  return (
    <Container>
      <AdvancedFilter />
      <Box mt={6}>
        <FilterMenuToggle open={true} onClick={toggleOpen} />
      </Box>
    </Container>
  )
}
