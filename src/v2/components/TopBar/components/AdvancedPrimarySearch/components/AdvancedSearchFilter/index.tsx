import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import { ICON_OFFSET } from 'v2/components/UI/SearchInput'
import AdvancedFilter from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'

const Container = styled(Box)`
  background-color: ${p => p.theme.colors.gray.light};
  padding: ${p => p.theme.space[3]} ${ICON_OFFSET} ${p => p.theme.space[8]};
`

export const AdvancedSearchFilter: React.FC = () => {
  return (
    <Container>
      <AdvancedFilter />
    </Container>
  )
}
