import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'

const Container = styled(Box).attrs({
  border: '1px solid',
  borderColor: 'gray.regular',
  bg: 'white',
})`
  border-radius: ${props => props.theme.radii.regular};
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.25);
  overflow: hidden;
`

interface Props {
  onClose: (e: React.MouseEvent) => any
  children: React.ReactNode
}

export const ContextMenuOptions: React.FC<Props> = ({
  onClose,
  children,
  ...rest
}) => (
  <Container onClick={e => e.stopPropagation()} {...rest}>
    {children}
  </Container>
)
