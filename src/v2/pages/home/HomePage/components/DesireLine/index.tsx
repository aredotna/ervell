import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { height, width, space } from 'styled-system'

import constants from 'v2/styles/constants'
import { preset } from 'v2/styles/functions'
import Box from 'v2/components/UI/Box'

const Container = styled(Box).attrs({
  pt: 6,
  my: 10,
})`
  display: flex;
  align-items: center;
  justify-content: ${({ length }: { length: number }) =>
    length === 1 ? 'center' : 'space-between'};
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
`

const Block = styled(Link)`
  box-sizing: border-box;
  position: relative;
  display: block;
  text-decoration: none;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.gray.light};
  user-select: none;
  ${preset(width, { width: constants.blockPreviewWidth })}
  ${preset(height, { height: constants.blockPreviewWidth })}
  ${preset(space, { mb: 8 })}
`

export const DesireLine: React.FC = () => {
  const fakeBlocks = [1, 2, 3, 4, 5]

  return (
    <Container>
      {fakeBlocks.map(index => {
        return <Block key={index} />
      })}
    </Container>
  )
}
