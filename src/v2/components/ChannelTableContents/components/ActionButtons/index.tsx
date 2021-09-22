import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Icon from 'v2/components/UI/Icons'

const Container = styled(Box)``

const Button = styled(Box)`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.gray.hint};
  border-left: 1px solid ${x => x.theme.colors.gray.regular};
  border-bottom: 1px solid ${x => x.theme.colors.gray.regular};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

interface ActionButtonsProps {
  isExpanded: boolean
  canDelete: boolean
  onMinimize: () => void
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isExpanded,
  onMinimize,
}) => {
  return (
    <Container>
      <Button onClick={onMinimize}>
        {isExpanded && <Icon name="Minimize" color="gray.regular" />}
      </Button>
    </Container>
  )
}
