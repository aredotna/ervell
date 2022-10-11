import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import { ICON_OFFSET } from 'v2/components/UI/SearchInput'
import AdvancedFilter from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import FilterMenuToggle from '../AdvancedFilterMenuToggle'
import {
  Copy,
  Message,
  QuestionMarkOverlay,
} from 'v2/components/UI/QuestionMarkOverlay'
import { FilterLabel } from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter/components/FilterOption'

const Container = styled(Box)<{ open: boolean }>`
  background-color: ${p => p.theme.colors.gray.light};
  padding: ${p => p.theme.space[3]} ${p => p.theme.space[6]}
    ${p => (p.open ? p.theme.space[8] : p.theme.space[6])} ${ICON_OFFSET};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ControlContainer = styled(Box).attrs({
  mt: 5,
})`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
`

interface AdvancedSearchFilterProps {
  toggleOpen: () => void
}

const Label: React.FC = () => {
  return (
    <FilterLabel ml={3} color="gray.medium">
      Cheat sheet
    </FilterLabel>
  )
}

export const AdvancedSearchFilter: React.FC<AdvancedSearchFilterProps> = ({
  toggleOpen,
}) => {
  return (
    <Container>
      <AdvancedFilter />
      <ControlContainer>
        <FilterMenuToggle open={true} onClick={toggleOpen} />
        <QuestionMarkOverlay iconColor="gray.medium" label={<Label />}>
          <Message>
            <Copy>Hello now</Copy>
          </Message>
        </QuestionMarkOverlay>
      </ControlContainer>
    </Container>
  )
}
