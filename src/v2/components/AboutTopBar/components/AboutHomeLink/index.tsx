import React from 'react'
import styled from 'styled-components'

import Icons from 'v2/components/UI/Icons'

const Container = styled.a`
  box-sizing: border-box;
  display: block;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  svg {
    fill: ${props => props.theme.colors.gray.base};
  }

  &:hover {
    svg {
      fill: ${props => props.theme.colors.gray.bold};
    }
  }

  strong {
    color: ${props => props.theme.colors.gray.base};
    margin-left: ${props => props.theme.space[3]};
  }
`

export default props => (
  <Container href="/" {...props}>
    <Icons name="ArenaMark" width="2rem" />
    <strong>Are.na</strong>
  </Container>
)
