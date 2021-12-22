import styled from 'styled-components'

import Box from 'v2/components/UI/Box'

export const ContextToggle = styled(Box).attrs({
  role: 'button',
  tabIndex: 0,
})`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  &:hover svg {
    fill: ${props => props.theme.colors.gray.bold};
  }
`
