import React, { ReactNode } from 'react'
import styled from 'styled-components'

import constants from 'v2/styles/constants'
import { multiply } from 'v2/styles/functions'

const { blockGutter, blockWidth } = constants

const Container = styled.div`
  position: relative;
  width: ${blockWidth};

  ${props => `
    margin: 0 ${blockGutter} ${multiply(
    blockGutter,
    props.gutterSpacing
  )} ${blockGutter};
    ${!props.variableHeight && `height: ${blockWidth};`}
  `}
`

const GridItem = ({
  children,
  gutterSpacing = 4,
  onDrag = () => {},
  ...rest
}: {
  children: ReactNode
  gutterSpacing?: number
  onDrag?: Function
}) => (
  <Container
    gutterSpacing={gutterSpacing}
    onDrag={onDrag}
    variableHeight
    {...rest}
  >
    {children}
  </Container>
)

export default GridItem
